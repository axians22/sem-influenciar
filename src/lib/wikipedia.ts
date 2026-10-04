/* Pesquisas estaduais: não há API oficial. O compilado mais completo e comum a todos
   os estados é o da Wikipédia, que o navegador consulta direto (CORS liberado).
   Pegamos só a tabela mais recente de governador e a de Senado, sem reescrever nada:
   o site mostra o que está na fonte, com link para conferir. */
import type { Uf } from './uf';
import type { Pesquisa, SerieCandidato } from '../data/types';

const API = 'https://pt.wikipedia.org/w/api.php';
export interface Celula { t: string; th: boolean; colSpan: number; rowSpan: number }
export interface TabelaWiki { titulo: string; linhas: Celula[][] }
export interface PesquisasWiki { pagina: string; url: string; governador: TabelaWiki | null; senador: TabelaWiki | null }

const chama = async (q: Record<string, string>) => {
  const r = await fetch(API + '?' + new URLSearchParams({ ...q, format: 'json', formatversion: '2', origin: '*', redirects: '1' }));
  if (!r.ok) throw new Error('A Wikipédia respondeu ' + r.status);
  return r.json();
};

const limpa = (el: Element) => {
  const c = el.cloneNode(true) as Element;
  c.querySelectorAll('sup, style, script, .reference, .noprint').forEach(x => x.remove());
  c.querySelectorAll('br').forEach(x => x.replaceWith(' '));
  return (c.textContent || '').replace(/\s+/g, ' ').trim();
};

/* primeira tabela da seção, convertida em texto puro (sem HTML da fonte) */
function tabela(html: string, titulo: string): TabelaWiki | null {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const t = doc.querySelector('table.wikitable');
  if (!t) return null;
  const linhas = [...t.querySelectorAll('tr')].map(tr => [...tr.children]
    .filter(c => c.tagName === 'TH' || c.tagName === 'TD')
    .map(c => ({ t: limpa(c), th: c.tagName === 'TH',
      colSpan: Number(c.getAttribute('colspan')) || 1, rowSpan: Number(c.getAttribute('rowspan')) || 1 })))
    .filter(l => l.length);
  /* só interessa tabela de pesquisa: o cabeçalho precisa citar o instituto e a amostra
     ou a margem de erro (páginas de alguns estados têm tabelas de candidatos e de resultado) */
  const cab = linhas.slice(0, 3).flat().filter(c => c.th).map(c => c.t).join(' ');
  if (!/pesquisa|instituto|contratante/i.test(cab) || !/amostra|margem/i.test(cab)) return null;
  /* a primeira linha do cabeçalho costuma ser de fotos dos candidatos: sai, e as células
     de texto dela (que ocupam várias linhas) descem para a linha seguinte, cada uma do
     seu lado, para as colunas continuarem alinhadas com os dados */
  if (linhas.length > 2 && linhas[0].some(c => !c.t) && linhas[0].every(c => !c.t || c.rowSpan > 1)) {
    const fotos = linhas[0];
    const a = fotos.findIndex(c => !c.t), z = fotos.length - [...fotos].reverse().findIndex(c => !c.t);
    const desce = (cs: Celula[]) => cs.map(c => ({ ...c, rowSpan: c.rowSpan - 1 }));
    linhas.splice(0, 2, [...desce(fotos.slice(0, a)), ...linhas[1], ...desce(fotos.slice(z))]);
  }
  return linhas.length > 1 ? { titulo, linhas } : null;
}

const memo = new Map<string, Promise<PesquisasWiki>>();
export function pesquisasEstado(uf: Uf): Promise<PesquisasWiki> {
  if (!memo.has(uf.sigla)) {
    const p = (async () => {
      const titulos = [`Pesquisas eleitorais para a eleição estadual de 2026 ${uf.em}`,
        `Pesquisas eleitorais para a eleição distrital de 2026 ${uf.em}`,
        `Eleições distritais ${uf.em} em 2026`, `Eleições estaduais ${uf.em} em 2026`];
      for (const page of titulos) {
        const j = await chama({ action: 'parse', page, prop: 'sections' });
        if (!j.parse) continue;
        const secs: { index: string; line: string }[] = j.parse.sections;
        const secao = async (re: RegExp, titulo: string) => {
          for (const s of secs.filter(x => re.test(x.line.replace(/<[^>]+>/g, '').trim()))) {
            const t = await chama({ action: 'parse', page, prop: 'text', section: s.index });
            const tab = t.parse ? tabela(t.parse.text, titulo) : null;
            if (tab) return tab;
          }
          return null;
        };
        const governador = await secao(/^(primeiro turno.*|governador(a)?|pesquisas? de opini.*)$/i, 'Governador · 1º turno');
        const senador = await secao(/^senad(o|or|ores)$/i, 'Senado');
        return { pagina: j.parse.title, url: 'https://pt.wikipedia.org/wiki/' + encodeURIComponent(j.parse.title.replace(/ /g, '_')), governador, senador };
      }
      throw new Error('Não há página de pesquisas para ' + uf.nome);
    })();
    p.catch(() => memo.delete(uf.sigla));
    memo.set(uf.sigla, p);
  }
  return memo.get(uf.sigla)!;
}

/* ---------- da tabela para o gráfico ----------
   As tabelas mudam de formato de um estado para outro (cenários em linhas extras,
   cabeçalho repetido quando um candidato troca de partido, linhas de aviso no meio).
   Daqui sai uma série só com o que dá para ler com segurança; se não der, o site
   mostra apenas a tabela. */
export interface SerieWiki { series: SerieCandidato[]; pesquisas: Pesquisa[]; yMax: number; total: number }

/* colunas que não são candidato */
const NAO_CAND = /outr|indecis|branc|nul|nenhum|n[ãa]o sab|ns\/?nr|abst|n[ãa]o resp|registro|fonte|link|modalidade|vantagem|diferen/i;
const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const num = (t: string) => { const v = parseFloat(t.replace(/[%±\s]/g, '').replace(',', '.')); return Number.isFinite(v) ? v : null; };

/* "28 de julho a 1º de agosto" -> rótulo curto "28/7–1/8" e uma chave para ordenar */
function periodo(t: string){
  /* sem ano no texto, novembro e dezembro só podem ser de 2025: a eleição é em outubro */
  const ano = Number(t.match(/\b20\d\d\b/g)?.pop()) || null;
  const partes = t.toLowerCase().replace(/[º°]/g, '').replace(/\b20\d\d\b/g, '')
    .split(/\s+a\s+|\s+e\s+|[–—-]/).map(x => x.trim()).filter(Boolean);
  const le = (x = '') => {
    const d = x.match(/\d{1,2}/)?.[0];
    const m = (x.match(/[a-zç]{3,}/g) || []).map(w => MESES.indexOf(w.slice(0, 3)) + 1).find(n => n > 0);
    return { d, m };
  };
  const a = le(partes[0]), b = le(partes[partes.length - 1]);
  if (!b.d) return { rotulo: t, chave: null };
  const mb = b.m ?? a.m, ma = a.m ?? mb;
  const fim = b.d + (mb ? '/' + mb : '');
  return {
    rotulo: partes.length > 1 && a.d ? a.d + (ma !== mb ? '/' + ma : '') + '–' + fim : fim,
    chave: mb ? (ano ?? (mb > 10 ? 2025 : 2026)) * 10000 + mb * 100 + Number(b.d) : null,
  };
}

/* `quantos` candidatos mais bem colocados na média das 3 pesquisas mais recentes,
   ao longo das últimas `limite` pesquisas */
export function serieWiki(t: TabelaWiki, quantos: number, limite = 8): SerieWiki | null {
  /* grade com as células que ocupam várias linhas ou colunas repetidas em cada posição */
  const g: (Celula | undefined)[][] = t.linhas.map(() => []);
  t.linhas.forEach((l, r) => {
    let c = 0;
    l.forEach(cel => {
      while (g[r][c]) c++;
      for (let i = 0; i < cel.rowSpan && r + i < g.length; i++)
        for (let j = 0; j < cel.colSpan; j++) g[r + i][c + j] = cel;
      c += cel.colSpan;
    });
  });
  const larg = Math.max(...g.map(l => l.length));

  let cab: string[] = [], emCab = false;
  const rotulos = new Map<string, string>();
  const vistos = new Set<string>();
  const pts: { inst: string; campo: string; chave: number | null; n: number | null; me: number | null; v: Record<string, number> }[] = [];
  t.linhas.forEach((l, r) => {
    /* linha de aviso ("fulano deixa o partido X"): uma célula atravessa a tabela */
    if (l.length <= 2 && l.some(c => c.colSpan >= Math.max(3, larg - 3))) return;
    if (l.every(c => c.th)) {
      if (!emCab) cab = [];
      emCab = true;
      for (let c = 0; c < larg; c++) { const x = g[r][c]; if (x?.t) cab[c] = x.t; }
      return;
    }
    emCab = false;
    const col = (re: RegExp) => cab.findIndex(h => h && re.test(h));
    const iData = col(/data|per[íi]odo|campo/i), iN = col(/amostra|entrevist/i), iMe = col(/margem/i), iCen = col(/^cen/i);
    const txt = (i: number) => (i >= 0 ? g[r][i]?.t ?? '' : '');
    /* de cada pesquisa fica só o primeiro cenário */
    if (iCen >= 0 && /^\d+$/.test(txt(iCen)) && txt(iCen) !== '1') return;
    const id = txt(0) + '|' + txt(iData);
    if (!txt(0) || vistos.has(id)) return;
    const v: Record<string, number> = {};
    cab.forEach((h, c) => {
      if (!h || c === 0 || c === iData || c === iN || c === iMe || c === iCen || NAO_CAND.test(h)) return;
      const x = num(txt(c));
      if (x == null || x > 100) return;
      const nome = h.replace(/\s*\([^)]*\)\s*$/, '').trim();
      if (!rotulos.has(nome)) rotulos.set(nome, h);
      v[nome] = x;
    });
    if (!Object.keys(v).length) return;
    vistos.add(id);
    const p = periodo(txt(iData));
    const n = num(txt(iN).replace(/\D/g, ''));
    pts.push({ inst: txt(0), campo: p.rotulo, chave: p.chave, n, me: num(txt(iMe)), v });
  });
  if (pts.length < 2) return null;
  /* mais recente primeiro; sem data legível em todas, vale a ordem da fonte */
  if (pts.every(p => p.chave != null)) pts.sort((a, b) => b.chave! - a.chave!);

  const recentes = pts.slice(0, 3);
  const media = (nome: string) => {
    const xs = recentes.map(p => p.v[nome]).filter(x => x != null);
    return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : -1;
  };
  /* quem está abaixo de 5% fica fora do gráfico (segue na tabela), mas nunca sobra menos de 2 */
  const nomes = [...rotulos.keys()].filter(n => media(n) >= 0).sort((a, b) => media(b) - media(a))
    .slice(0, quantos).filter((n, i) => i < 2 || media(n) >= 5);
  if (!nomes.length) return null;
  const usadas = pts.slice(0, limite).reverse();
  const pesquisas: Pesquisa[] = usadas.map(p => ({
    inst: p.inst, campo: p.campo, n: p.n, me: p.me, reg: null,
    ...Object.fromEntries(nomes.map((n, i) => ['c' + i, p.v[n] ?? null])),
  }));
  const max = Math.max(...usadas.flatMap(p => nomes.map(n => p.v[n] ?? 0)));
  return {
    series: nomes.map((n, i) => ({ k: 'c' + i, label: rotulos.get(n)!, slot: i + 1 })),
    pesquisas, yMax: Math.min(100, Math.ceil((max + 6) / 10) * 10), total: pts.length,
  };
}
