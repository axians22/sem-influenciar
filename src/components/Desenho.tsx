/* Desenhos de traço simples que ilustram a aba "Constituição e voto".
   Cada um é um caminho SVG numa grade de 48 × 48; a cor vem do tema. */
const D = {
  urna: 'M8 20h32v20H8z M19 20V8h10v12 M21.5 13.5l2 2 3.5-4',
  pessoa: 'M18 14a6 6 0 1 0 12 0a6 6 0 1 0-12 0 M10 40c0-8 6-14 14-14s14 6 14 14',
  documento: 'M14 6h14l8 8v28H14z M28 6v8h8 M19 22h12 M19 28h12 M19 34h8',
  casa: 'M6 24L24 8l18 16 M12 20v20h24V20 M20 40V28h8v12',
  escudo: 'M24 6l14 5v11c0 9-6 16-14 20-8-4-14-11-14-20V11z M17 23l5 5 9-10',
  cadeado: 'M12 22h24v18H12z M17 22v-6a7 7 0 0 1 14 0v6 M24 29v4',
  /* as duas torres e as duas cúpulas do Congresso Nacional */
  congresso: 'M3 38h42 M20 38V8h3v30 M25 38V8h3v30 M5 38a7 7 0 0 1 14 0 M29 31a7 7 0 0 0 14 0',
  palacio: 'M6 38h36 M6 16h36 M12 16v22 M20 16v22 M28 16v22 M36 16v22 M24 16V6h7l-2 2.5 2 2.5h-7',
  balanca: 'M24 8v30 M16 38h16 M10 14h28 M10 14L5 24h10z M5 24a5 5 0 0 0 10 0 M38 14l-5 10h10z M33 24a5 5 0 0 0 10 0',
  brasil: 'M6 12h36v24H6z M24 15l14 9-14 9-14-9z M19.5 24a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0-9 0',
  mapa: 'M6 12l12-4 12 4 12-4v28l-12 4-12-4-12 4z M18 8v28 M30 12v28',
  cidade: 'M4 40h40 M6 40V22h10v18 M16 40V10h14v30 M30 40V26h12v14 M21 17h4 M21 24h4 M21 31h4',
  saude: 'M8 8h32v32H8z M24 16v16 M16 24h16',
  escola: 'M24 14c-4-3-10-3-16-2v24c6-1 12-1 16 2 4-3 10-3 16-2V12c-6-1-12-1-16 2z M24 14v24',
  onibus: 'M8 10h32v24H8z M8 22h32 M24 10v12 M13 37a3 3 0 1 0 6 0a3 3 0 1 0-6 0 M29 37a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  moeda: 'M8 24a16 16 0 1 0 32 0a16 16 0 1 0-32 0 M29 19c-1-2.5-9-3-9 1s9 2.500 9 6.500-8 4-10 1 M24 13v22',
  trabalho: 'M6 16h36v24H6z M18 16v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4 M6 26h36',
  lampada: 'M17 28a10 10 0 1 1 14 0c-1.5 1.500-2 3-2 5h-10c0-2-.5-3.500-2-5z M20 38h8 M21 42h6',
  caneta: 'M10 38l3-10 20-20 7 7-20 20z M29 12l7 7',
  lupa: 'M10 21a11 11 0 1 0 22 0a11 11 0 1 0-22 0 M29 29l11 11',
} as const;
export type NomeDesenho = keyof typeof D;

export function Desenho({ nome, grande }: { nome: NomeDesenho; grande?: boolean }){
  return (
    <span aria-hidden="true"
      className={'grid flex-none place-items-center rounded-xl bg-s1/10 text-s1 ' + (grande ? 'size-[4.5rem]' : 'size-12')}>
      <svg viewBox="0 0 48 48" className={grande ? 'size-14' : 'size-9'} fill="none" stroke="currentColor"
        strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d={D[nome]} /></svg>
    </span>
  );
}
