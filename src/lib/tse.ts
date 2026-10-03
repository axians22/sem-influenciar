/* Resultados oficiais do TSE.

   São os mesmos arquivos JSON que alimentam resultados.tse.jus.br. O servidor
   libera CORS e renova o cache a cada ~60 s, então o navegador consulta direto,
   sem servidor intermediário. Antes do início da apuração os arquivos já trazem a
   lista de candidatos da totalização, com votos zerados.

   Não é uma API documentada: os códigos de eleição abaixo saem de
   https://resultados.tse.jus.br/oficial/comum/config/ele-c.json */
import { useCallback, useEffect, useRef, useState } from 'react';

const BASE = 'https://resultados.tse.jus.br/oficial/ele2026';

/* eleição 6257 = federal (presidente); 6259 = estadual (demais cargos, por UF) */
const CODIGO = { presidente: '1', governador: '3', senador: '5', depfed: '6', depest: '7' } as const;
const cfg = (k: CargoTse, uf: string) => k === 'presidente'
  ? { ele: '6257', uf: 'br', cargo: '1' }
  /* no DF, deputado distrital (cargo 8) ocupa o lugar de deputado estadual */
  : { ele: '6259', uf, cargo: k === 'depest' && uf === 'df' ? '8' : CODIGO[k] };
export type CargoTse = keyof typeof CODIGO;

/* foto oficial do candidato, a mesma da urna; `sq` é o sequencial da candidatura */
export const fotoTse = (k: CargoTse, sq: string, uf: string) => {
  const c = cfg(k, uf);
  return `${BASE}/${c.ele}/fotos/${c.uf}/${sq}.jpeg`;
};

export interface TseCand {
  n: string; sq: string; nome: string; urna: string; partido: string; vice?: string;
  foto: string;              // foto oficial, a mesma que aparece na urna
  votos: number; pct: number; pctTxt: string;
  eleito: boolean; situacao: string; seq: number;
}
export interface TseResultado {
  cargo: CargoTse; vagas: number;
  geradoEm: string;          // quando o TSE gerou o arquivo
  totalizadoEm: string;      // última totalização de votos; vazio antes da apuração
  iniciada: boolean; final: boolean;
  secoes: { total: number; totalizadas: number; pct: string };
  eleitores: { total: number; comparecimento: number; pctComp: string;
    abstencao: number; pctAbst: string };
  votos: { total: number; validos: number; pctValidos: string;
    brancos: number; pctBrancos: string; nulos: number; pctNulos: string };
  cands: TseCand[];
}

const num = (s: unknown) => Number(String(s ?? '0').replace(/\./g, '').replace(',', '.')) || 0;

/* eslint-disable @typescript-eslint/no-explicit-any */
function parse(cargo: CargoTse, uf: string, j: any): TseResultado {
  const c = j.carg[0];
  const cands: TseCand[] = [];
  for (const agr of c.agr) for (const par of agr.par) for (const x of par.cand){
    const vice = (x.vs || []).find((v: any) => v.tp === 'v');
    cands.push({
      n: String(x.n), sq: String(x.sqcand), nome: x.nm, urna: x.nmu, partido: par.sg,
      vice: vice ? vice.nmu : undefined,
      foto: fotoTse(cargo, String(x.sqcand), uf),
      votos: num(x.vap), pct: num(x.pvap), pctTxt: String(x.pvap ?? '0,00'),
      eleito: x.e === 's', situacao: String(x.st || ''), seq: num(x.seq),
    });
  }
  cands.sort((a, b) => b.votos - a.votos || a.urna.localeCompare(b.urna, 'pt-BR'));
  const s = j.s || {}, e = j.e || {}, v = j.v || {};
  return {
    cargo, vagas: num(c.nv),
    geradoEm: [j.dg, j.hg].filter(Boolean).join(' às '),
    totalizadoEm: [j.dt, j.ht].filter(Boolean).join(' às '),
    iniciada: num(s.st) > 0 || num(v.tv) > 0,
    final: j.tf === 's',
    secoes: { total: num(s.ts), totalizadas: num(s.st), pct: String(s.pst ?? '0,00') },
    eleitores: { total: num(e.te), comparecimento: num(e.c), pctComp: String(e.pc ?? '0,00'),
      abstencao: num(e.a), pctAbst: String(e.pa ?? '0,00') },
    votos: { total: num(v.tv), validos: num(v.vv), pctValidos: String(v.pvv ?? '0,00'),
      brancos: num(v.vb), pctBrancos: String(v.pvb ?? '0,00'),
      nulos: num(v.tvn), pctNulos: String(v.ptvn ?? '0,00') },
    cands,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const url = (k: CargoTse, uf: string) => {
  const c = cfg(k, uf);
  return `${BASE}/${c.ele}/dados/${c.uf}/${c.uf}-c${c.cargo.padStart(4, '0')}-e${c.ele.padStart(6, '0')}-u.json`;
};

/* cache em memória: trocar de aba e voltar não refaz a requisição dentro de 55 s */
const TTL = 55_000;
const cache = new Map<string, { em: number; p: Promise<TseResultado> }>();

export function buscaTse(k: CargoTse, uf: string, forcar = false): Promise<TseResultado> {
  const ch = k + '/' + (k === 'presidente' ? 'br' : uf);
  const c = cache.get(ch);
  if (c && !forcar && Date.now() - c.em < TTL) return c.p;
  const p = fetch(url(k, uf), { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error('TSE respondeu ' + r.status); return r.json(); })
    .then(j => parse(k, uf, j));
  cache.set(ch, { em: Date.now(), p });
  p.catch(() => { if (cache.get(ch)?.p === p) cache.delete(ch); });
  return p;
}

export interface EstadoTse {
  dados: TseResultado | null; erro: string | null; carregando: boolean;
  consultadoEm: Date | null; atualizar: () => void;
}

/* `intervalo` em ms liga a atualização automática, pausada com a aba oculta */
export function useTse(k: CargoTse, uf: string, intervalo?: number): EstadoTse {
  const [st, setSt] = useState<Omit<EstadoTse, 'atualizar'>>(
    { dados: null, erro: null, carregando: true, consultadoEm: null });
  const ch = k + '/' + uf;
  const atual = useRef(ch);
  atual.current = ch;

  const carrega = useCallback((forcar: boolean) => {
    setSt(s => ({ ...s, carregando: true }));
    buscaTse(k, uf, forcar).then(
      dados => { if (atual.current === ch)
        setSt({ dados, erro: null, carregando: false, consultadoEm: new Date() }); },
      (e: Error) => { if (atual.current === ch)
        setSt(s => ({ ...s, erro: e.message || 'falha de rede', carregando: false })); });
  }, [k, uf, ch]);

  useEffect(() => {
    setSt({ dados: null, erro: null, carregando: true, consultadoEm: null });
    carrega(false);
    if (!intervalo) return;
    const id = setInterval(() => { if (!document.hidden) carrega(true); }, intervalo);
    const vis = () => { if (!document.hidden) carrega(false); };
    document.addEventListener('visibilitychange', vis);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', vis); };
  }, [ch, intervalo, carrega]);

  return { ...st, atualizar: useCallback(() => carrega(true), [carrega]) };
}
