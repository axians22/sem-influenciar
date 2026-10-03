/* Tipos dos dados. Campos extras são tolerados (índice aberto) porque os dados
   foram coletados à mão e nem toda ficha tem os mesmos campos. */

export interface Fonte { t: string; u: string }

export interface Meta {
  turno1: string; turno2: string; coletadoEm: string; fonteCalendario: string;
}

export interface Processo {
  caso: string; status: string; statusTexto: string; detalhe: string;
  fonte?: string | null;
}

export interface Candidato {
  num: number | null;
  nome: string;
  urna?: string;
  partido: string;
  vice?: string;
  suplentes?: string;
  coligacao?: string;
  situacao?: string;
  idade?: number | null;
  destaque?: string;
  trajetoria?: string;
  contexto?: string;
  alerta?: string;
  alertaFonte?: string;
  receita?: number | null;
  receitaNota?: string;
  plano?: string;
  propostas?: Record<string, string> | string | null;
  propostasNota?: string;
  processos?: Processo[];
  processosNota?: string;
  fontes?: Fonte[];
  [k: string]: unknown;
}

export interface StatusInfo { rotulo: string; desc: string }

export interface SerieCandidato { k: string; label: string; slot: number }
export interface Pesquisa {
  inst: string; campo: string;
  n: number | null; me: number | null; reg: string | null;
  discrepante?: boolean; notaLinha?: string;
  [k: string]: string | number | boolean | null | undefined;
}
export interface SeriePesquisas {
  unidade: string; nota?: string; alerta?: string;
  candidatos: SerieCandidato[];
  pesquisas: Pesquisa[];
  fontes?: Fonte[]; fonte?: string;
}

export interface DatafolhaFinal {
  inst: string; reg: string; n: number; me: number; confianca: number;
  campo: string; municipios: number; divulgacao: string; contratante: string;
  fonte: string; notaDatas: string;
  totais: { nome: string; v: number; ant?: number | null; tipo?: string }[];
  validos: { nome: string; v: number }[];
  rejeicao: { nome: string; v: number }[];
  decididos: number;
  [k: string]: unknown;
}

export interface Cenario {
  inst: string; reg: string | null; campo: string;
  a: string; av: number; b: string; bv: number;
  brancoNulo?: number | null; indeciso?: number | null;
  empate?: boolean; validos?: boolean;
}
export interface SegundoTurno { nota: string; cenarios: Cenario[] }

export interface PesqValidos {
  nota: string;
  linhas: { inst: string; campo: string; n: number; me: number; reg: string | null;
    lula: number | null; flavio: number; [k: string]: unknown }[];
}

export interface TopCargo {
  id: string; rotulo: string; inst: string; reg: string | null; campo: string;
  me: number; n: number | null; base: string; fonte: string;
  nota?: string; limitacao?: string; espontanea?: boolean;
  lista: { nome: string; partido: string; nr: string; v: number }[];
}
export interface TopPesquisas { aviso: string; cargos: TopCargo[] }

export interface Bancada {
  titulo: string; subtitulo: string; total: number; fonte: string;
  nota?: string; notaEspectro?: string; fonteEspectro?: string; fonteNota?: string;
  linhas: { sigla: string; v: number; nome?: string; espectro?: string;
    federacao?: boolean; nota?: string }[];
}
export interface Federacoes {
  titulo: string; nota: string; fonte: string;
  linhas: { nome: string; partidos: string; deferimento: string }[];
}

export interface Financiamento {
  titulo: string; unidade: string; nota: string;
  linhas: { nome: string; v: number; slot: number }[];
}
export interface Doador {
  nome: string; doc: string; tipo: string; v: number; cnae?: string | null;
  [k: string]: unknown;
}
export interface PrestacaoCand {
  cand: string; partido: string; cargo: string; nr: string;
  tot: number; ndoad: number;
  origens: Record<string, number>;
  doadores: Doador[];
}
export interface Doacoes {
  fonte: string; fonteUrl: string; geradoEm: string; nota: string;
  presidente: PrestacaoCand[];
  goias: Record<string, PrestacaoCand[]>;
  cruzados: { nome: string; doc: string; tipo: string; tot: number;
    para: { cand: string; partido: string; cargo: string; v: number }[] }[];
}

export interface CargoUrna {
  id: string; rotulo: string; digitos: number; dica: string | null; livre?: boolean;
}
export interface CandUrna { nr: string; urna: string; partido: string; alerta?: string | null }
export interface Urna {
  fonte: string; fonteUrl: string;
  presidente: CandUrna[]; governador: CandUrna[]; senador: CandUrna[];
  depfederal: CandUrna[];
}
export interface DepEstaduais {
  total: number; vagas: number; fonte: string; fonteUrl: string;
  porPartido: (string | number)[][];
  lista: CandUrna[];
}
