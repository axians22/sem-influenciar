/* Pesquisas estaduais: não há API oficial. O compilado mais completo e comum a todos
   os estados é o da Wikipédia, que o navegador consulta direto (CORS liberado).
   Pegamos só a tabela mais recente de governador e a de Senado, sem reescrever nada:
   o site mostra o que está na fonte, com link para conferir. */
import type { Uf } from './uf';

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
