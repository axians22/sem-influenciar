import type { ReactNode } from 'react';
import { HISTORIA_LEI, type Cena } from '../data/constituicao';

/* História em quadrinhos de uma lei de verdade. Cada cena é um desenho de traço
   numa grade de 200 × 110; a cor vem do tema, e o preenchimento claro é a mesma
   cor com pouca opacidade. */
const CLARO = { fill: 'currentColor', fillOpacity: 0.14 };
const TEXTO = { fill: 'currentColor', stroke: 'none', fontSize: 12, fontWeight: 700 } as const;

const Pessoa = ({ x, y, k = 1 }: { x: number; y: number; k?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}>
    <circle cx="0" cy="-16" r="7" {...CLARO} />
    <path d="M-12 12c0-10 5-16 12-16s12 6 12 16z" {...CLARO} />
  </g>
);

/* folha de papel com linhas de texto */
const Folha = ({ x, y, w, h, linhas }: { x: number; y: number; w: number; h: number; linhas: number }) => (
  <>
    <rect x={x} y={y} width={w} height={h} rx="3" {...CLARO} />
    {Array.from({ length: linhas }, (_, i) =>
      <path key={i} d={`M${x + 9} ${y + 14 + i * 11}h${w - 18}`} />)}
  </>
);

/* as duas torres, a cúpula do Senado e a cuia da Câmara */
const Congresso = ({ x }: { x: number }) => (
  <>
    <path d={`M${x} 92h92`} />
    <rect x={x + 39} y="24" width="6" height="68" {...CLARO} />
    <rect x={x + 48} y="24" width="6" height="68" {...CLARO} />
    <path d={`M${x + 4} 92a15 15 0 0 1 30 0z`} {...CLARO} />
    <path d={`M${x + 59} 77a15 15 0 0 0 30 0z`} {...CLARO} />
  </>
);

const CENAS: Record<Cena, ReactNode> = {
  /* eleitores assinando uma lista */
  assinaturas: <>
    <Pessoa x={30} y={84} /><Pessoa x={62} y={84} /><Pessoa x={94} y={84} />
    <rect x="122" y="14" width="60" height="84" rx="3" {...CLARO} />
    <path d="M131 32c4-7 6 7 10 0s6 7 10 0 6 5 9 0" />
    <path d="M131 50c5-7 7 7 12 0s7 7 12 0" />
    <path d="M131 68c4-7 6 7 10 0s6 7 10 0 6 5 9 0" />
    <path d="M131 86c5-7 7 7 12 0" />
    <path d="M176 70l8 8-20 20-10 2 2-10z" {...CLARO} />
  </>,
  /* caixas de assinaturas chegando ao Congresso */
  entrega: <>
    <rect x="10" y="70" width="26" height="22" rx="2" {...CLARO} />
    <rect x="38" y="70" width="26" height="22" rx="2" {...CLARO} />
    <rect x="24" y="46" width="26" height="22" rx="2" {...CLARO} />
    <path d="M18 78h10M46 78h10M32 54h10" />
    <path d="M72 80h22M86 72l8 8-8 8" />
    <Congresso x={102} />
  </>,
  /* painel de votação da Câmara, com a maioria no SIM */
  camara: <>
    <rect x="18" y="10" width="164" height="52" rx="5" {...CLARO} />
    <text x="28" y="31" {...TEXTO}>SIM</text>
    <rect x="62" y="20" width="108" height="13" rx="3" fill="currentColor" stroke="none" />
    <text x="28" y="52" {...TEXTO}>NÃO</text>
    <rect x="62" y="41" width="9" height="13" rx="3" fill="currentColor" stroke="none" />
    <Pessoa x={40} y={96} k={0.8} /><Pessoa x={70} y={96} k={0.8} /><Pessoa x={100} y={96} k={0.8} />
    <Pessoa x={130} y={96} k={0.8} /><Pessoa x={160} y={96} k={0.8} />
  </>,
  /* a cúpula do Senado com o sinal de aprovado */
  senado: <>
    <path d="M22 96h156" />
    <path d="M40 96a60 60 0 0 1 120 0z" {...CLARO} />
    <path d="M78 66l16 16 30-36" strokeWidth={5} />
  </>,
  /* a caneta assinando o projeto */
  assina: <>
    <Folha x={48} y={10} w={78} h={92} linhas={5} />
    <path d="M60 90c6-11 9 8 14-2s8 8 13 0 7 4 11 0" />
    <path d="M162 34l10 10-40 40-13 5 5-13z" {...CLARO} />
    <path d="M154 42l10 10" />
  </>,
  /* a lei pronta, valendo na eleição */
  lei: <>
    <rect x="20" y="10" width="72" height="92" rx="3" {...CLARO} />
    <text x="56" y="32" textAnchor="middle" {...TEXTO} fontSize={15}>LEI</text>
    <path d="M30 44h52M30 55h52M30 66h36" />
    <circle cx="78" cy="88" r="12" fill="currentColor" stroke="none" />
    <path d="M72 88l4 4 8-9" stroke="var(--surface-1)" />
    <path d="M102 62h16M110 54l8 8-8 8" />
    <rect x="128" y="56" width="58" height="42" rx="3" {...CLARO} />
    <path d="M144 56V28h26v28" />
    <path d="M150 42l5 5 9-11" />
  </>,
};

export function HistoriaLei(){
  return (
    <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {HISTORIA_LEI.map((q, i) => (
        <li key={q.cena} className="overflow-hidden rounded-lg border border-line bg-surface-2">
          <svg viewBox="0 0 200 110" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.5}
            strokeLinecap="round" strokeLinejoin="round"
            className="block w-full bg-s1/10 text-s1">{CENAS[q.cena]}</svg>
          <div className="p-3.5">
            <div className="flex items-baseline gap-2">
              <span className="grid size-[22px] flex-none place-items-center self-center rounded-full bg-s1 text-[.74rem] font-bold text-white">{i + 1}</span>
              <b className="text-[.95rem]">{q.titulo}</b>
            </div>
            <p className="mt-1 text-[.76rem] font-semibold uppercase tracking-wide text-ink-3">{q.quando}</p>
            <p className="mt-1 text-[.88rem] text-ink-2">{q.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
