/* API de Dados Abertos da Câmara dos Deputados (dadosabertos.camara.leg.br).
   Aberta, sem chave e com CORS liberado: o navegador consulta direto, no clique.
   Nada é guardado no site; só há cache em memória durante a visita. */
const API = 'https://dadosabertos.camara.leg.br/api/v2';
const PLENARIO = 180;

export interface DeputadoCamara { id: number; nome: string; siglaPartido: string; siglaUf: string; urlFoto: string }
export interface Votacao { id: string; data: string; descricao: string; aprovacao: number | null;
  sim: number; nao: number }
export interface Voto { id: number; nome: string; partido: string; uf: string; voto: string }
export interface DetalheVotacao { votos: Voto[]; orientacoes: Map<string, string> }
export interface Proposicao { id: number; siglaTipo: string; numero: number; ano: number;
  ementa: string; dataApresentacao: string }

/* A API recusa rajadas: no máximo 4 chamadas ao mesmo tempo, e cada uma tenta de
   novo (com espera crescente) se for recusada. */
const MAX = 4;
let ativos = 0;
const fila: (() => void)[] = [];
const vez = () => new Promise<void>(ok => { if (ativos < MAX) { ativos++; ok(); } else fila.push(ok); });
const libera = () => { const prox = fila.shift(); if (prox) prox(); else ativos--; };
const espera = (ms: number) => new Promise(ok => setTimeout(ok, ms));

async function busca<T>(caminho: string): Promise<{ dados: T; total: number | null }> {
  await vez();
  try {
    for (let tentativa = 0; ; tentativa++) {
      try {
        const r = await fetch(API + caminho, { headers: { Accept: 'application/json' } });
        if (!r.ok) throw new Error('A Câmara respondeu ' + r.status);
        const t = r.headers.get('X-Total-Count');
        return { dados: (await r.json()).dados as T, total: t ? Number(t) : null };
      } catch (e) {
        if (tentativa >= 3) throw e instanceof TypeError ? new Error('A Câmara não respondeu') : e;
        await espera(900 * (tentativa + 1));
      }
    }
  } finally { libera(); }
}

const memo = new Map<string, Promise<unknown>>();
function get<T>(caminho: string): Promise<{ dados: T; total: number | null }> {
  if (!memo.has(caminho)) {
    const p = busca<T>(caminho);
    p.catch(() => memo.delete(caminho));
    memo.set(caminho, p);
  }
  return memo.get(caminho) as Promise<{ dados: T; total: number | null }>;
}

const iso = (d: Date) => d.toISOString().slice(0, 10);
const PLACAR = /Sim:\s*(\d+);\s*N[ãa]o:\s*(\d+)/i;

/* Últimas votações nominais do Plenário. A API só aceita janelas de 3 meses e mistura
   votações simbólicas (sem voto individual); as nominais são as que trazem placar. */
export async function votacoesNominais(quantas = 20): Promise<Votacao[]> {
  const out: Votacao[] = [];
  const fim = new Date();
  for (let janela = 0; janela < 8 && out.length < quantas; janela++) {
    const ini = new Date(fim); ini.setDate(ini.getDate() - 88);
    for (let pag = 1; pag <= 6 && out.length < quantas; pag++) {
      const { dados } = await get<{ id: string; data: string; descricao: string; aprovacao: number | null }[]>(
        `/votacoes?idOrgao=${PLENARIO}&dataInicio=${iso(ini)}&dataFim=${iso(fim)}&ordem=DESC&ordenarPor=dataHoraRegistro&itens=100&pagina=${pag}`);
      for (const v of dados) {
        const m = PLACAR.exec(v.descricao || '');
        if (m && !out.some(o => o.id === v.id)) out.push({ ...v, sim: +m[1], nao: +m[2] });
      }
      if (dados.length < 100) break;
    }
    fim.setTime(ini.getTime() - 86_400_000);
  }
  return out.slice(0, quantas);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function detalheVotacao(id: string): Promise<DetalheVotacao> {
  const [v, o] = await Promise.all([get<any[]>(`/votacoes/${id}/votos`), get<any[]>(`/votacoes/${id}/orientacoes`)]);
  return {
    votos: v.dados.map(x => ({ id: x.deputado_.id, nome: x.deputado_.nome,
      partido: x.deputado_.siglaPartido, uf: x.deputado_.siglaUf, voto: x.tipoVoto })),
    /* só a orientação do próprio partido; blocos e lideranças de governo ficam de fora
       porque a API não diz quais partidos cada bloco reúne */
    orientacoes: new Map(o.dados.filter(x => x.codTipoLideranca === 'P')
      .map(x => [String(x.siglaPartidoBloco).toUpperCase(), String(x.orientacaoVoto || '')])),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const bancada = (uf: string) =>
  get<DeputadoCamara[]>(`/deputados?siglaUf=${uf.toUpperCase()}&ordem=ASC&ordenarPor=nome&itens=100`).then(r => r.dados);

/* projetos de lei, de lei complementar e PECs de autoria do deputado, dos mais recentes */
export const proposicoes = (id: number) =>
  get<Proposicao[]>(`/proposicoes?idDeputadoAutor=${id}&siglaTipo=PL&siglaTipo=PLP&siglaTipo=PEC&ordem=DESC&ordenarPor=id&itens=15`);
