export const fmt = (n: number | string | null | undefined) =>
  n == null ? '—' : String(n).replace('.', ',');

export const int = (n: number) => n.toLocaleString('pt-BR');

/* valor em milhões de reais */
export const brl = (v: number | null | undefined) =>
  v == null ? 'não localizado'
  : v >= 1 ? 'R$ ' + v.toFixed(2).replace('.', ',').replace(/,00$/, '') + ' mi'
  : 'R$ ' + Math.round(v * 1000) + ' mil';

/* valor em reais, por extenso */
export const money = (v: number) =>
  'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* valor em reais, abreviado */
export const curto = (v: number) =>
  v >= 1e6 ? 'R$ ' + (v / 1e6).toFixed(2).replace('.', ',') + ' mi'
  : v >= 1e3 ? 'R$ ' + (v / 1e3).toFixed(0) + ' mil'
  : 'R$ ' + v.toFixed(2).replace('.', ',');

/* "LUIZ INACIO DA SILVA" -> "Luiz Inacio da Silva" */
export const titulo = (s: string) =>
  (s || '').split(' ').map(w =>
    w.length > 2 ? w.charAt(0) + w.slice(1).toLowerCase() : w.toLowerCase()).join(' ');

export const col = (slot: number) => `var(--s${((slot - 1) % 6) + 1})`;

/* busca sem acento e sem caixa */
export const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
