import { useSyncExternalStore, type PointerEvent, type ReactNode } from 'react';
import type { Fonte } from '../data/types';

/* ---------- tooltip dos elementos HTML (barras, linhas de ranking) ---------- */
export interface TipRow { color?: string; label: string; value: string }
interface TipState { x: number; y: number; title: string; rows?: TipRow[]; note?: string | null }
let tipState: TipState | null = null;
const subs = new Set<() => void>();
const setTip = (s: TipState | null) => { tipState = s; subs.forEach(f => f()); };

/* props para espalhar no elemento que mostra o tooltip */
export function tip(title: string, rows?: TipRow[], note?: string | null){
  const show = (e: PointerEvent) => setTip({ x: e.clientX, y: e.clientY, title, rows, note });
  return { onPointerEnter: show, onPointerMove: show, onPointerLeave: () => setTip(null) };
}

export function TipLayer(){
  const s = useSyncExternalStore(
    f => { subs.add(f); return () => { subs.delete(f); }; }, () => tipState);
  if (!s) return null;
  const direita = s.x > window.innerWidth - 280;
  return (
    <div role="status"
      className="pointer-events-none fixed z-50 max-w-[260px] rounded-lg border border-line bg-surface-1 px-3 py-2 text-[.82rem] shadow-lg print:hidden"
      style={{ top: Math.max(8, Math.min(s.y - 10, window.innerHeight - 140)),
        ...(direita ? { right: window.innerWidth - s.x + 14 } : { left: s.x + 14 }) }}>
      <div className="mb-1 font-semibold">{s.title}</div>
      {s.rows?.map((r, i) => (
        <div key={i} className="mt-0.5 flex items-center gap-2 text-ink-2">
          {r.color && <i className="h-[3px] w-3 flex-none rounded-sm" style={{ background: r.color }} />}
          <span>{r.label}</span>
          <b className="ml-auto pl-2.5 tabular-nums text-ink-1">{r.value}</b>
        </div>
      ))}
      {s.note && <div className="mt-1.5 text-[.76rem] leading-snug text-ink-3">{s.note}</div>}
    </div>
  );
}

/* ---------- blocos ---------- */
export function Card({ title, subtitle, children, className = '' }:
  { title?: ReactNode; subtitle?: ReactNode; children: ReactNode; className?: string }){
  return (
    <section className={'mb-4 rounded-xl border border-line bg-surface-1 p-4 sm:p-5 ' + className}>
      {title && <h3 className="text-[1.05rem] font-semibold">{title}</h3>}
      {subtitle && <p className="mt-1 mb-4 text-[.9rem] text-ink-2">{subtitle}</p>}
      {children}
    </section>
  );
}

export function PageHead({ title, children }: { title: string; children?: ReactNode }){
  return (
    <div className="mb-6">
      <h2 className="text-[clamp(1.25rem,3vw,1.6rem)] font-semibold tracking-tight">{title}</h2>
      {children && <p className="mt-2.5 max-w-[70ch] text-ink-2">{children}</p>}
    </div>
  );
}

export function Note({ crit, label, children, className = '' }:
  { crit?: boolean; label?: string; children: ReactNode; className?: string }){
  return (
    <div className={'my-3.5 rounded-r-lg border-l-[3px] bg-surface-2 px-4 py-3 text-[.87rem] text-ink-2 '
      + (crit ? 'border-crit ' : 'border-s4 ') + className}>
      {label && <b className="text-ink-1">{label} </b>}{children}
    </div>
  );
}

export function Sources({ fontes }: { fontes?: Fonte[] }){
  if (!fontes?.length) return null;
  return (
    <div className="mt-3 grid gap-1 text-[.82rem]">
      {fontes.map(f => (
        <div key={f.u + f.t}>Fonte: <a href={f.u} target="_blank" rel="noopener">{f.t}</a></div>
      ))}
    </div>
  );
}

export function Legend({ items, rect }: { items: { color: string; label: string }[]; rect?: boolean }){
  return (
    <div className="mb-3.5 flex flex-wrap gap-x-4 gap-y-1.5">
      {items.map(it => (
        <span key={it.label} className="inline-flex items-center gap-2 text-[.85rem] text-ink-2">
          <i className={'flex-none rounded-sm ' + (rect ? 'size-[11px]' : 'h-[3px] w-3.5')}
            style={{ background: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

export type Th = string | { t: string; n?: boolean };
export function DataTable({ label, headers, rows, open }:
  { label: string; headers: Th[]; rows: (string | number)[][]; open?: boolean }){
  const isNum = (i: number) => { const h = headers[i]; return typeof h === 'object' && !!h.n; };
  return (
    <details className="mt-3.5" open={open}>
      <summary className="cursor-pointer py-1 text-[.85rem] text-ink-2 hover:text-ink-1">{label}</summary>
      <Table headers={headers} rows={rows} isNum={isNum} />
    </details>
  );
}
export function Table({ headers, rows, isNum = () => false }:
  { headers: Th[]; rows: (string | number)[][]; isNum?: (i: number) => boolean }){
  return (
    <div className="overflow-x-auto">
      <table className="mt-2.5 w-full border-collapse text-[.84rem]">
        <thead><tr>
          {headers.map((h, i) => (
            <th key={i} className={'border-b border-grid px-2 py-1.5 text-[.78rem] font-semibold uppercase tracking-wide text-ink-2 '
              + (isNum(i) ? 'text-right' : 'text-left')}>{typeof h === 'object' ? h.t : h}</th>
          ))}
        </tr></thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, i) => (
                <td key={i} className={'border-b border-grid px-2 py-1.5 align-top '
                  + (isNum(i) ? 'text-right tabular-nums' : '')}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* seletor de sub-seção / filtro: uma linha de botões acima do conteúdo */
export function Seg<T extends string>({ options, value, onChange, note, label }:
  { options: { id: T; label: string }[]; value: T; onChange: (v: T) => void;
    note?: string; label: string }){
  return (
    <div role="group" aria-label={label} className="mb-4 flex flex-wrap items-center gap-2 print:hidden">
      {options.map(o => (
        <button key={o.id} type="button" aria-pressed={o.id === value}
          onClick={() => onChange(o.id)}
          className={'rounded-full border-[1.5px] px-3.5 py-1.5 text-[.84rem] '
            + (o.id === value ? 'border-s1 bg-s1 font-semibold text-white'
              : 'border-line bg-surface-2 text-ink-2 hover:text-ink-1')}>
          {o.label}
        </button>
      ))}
      {note && <span className="text-[.78rem] text-ink-3">{note}</span>}
    </div>
  );
}

export function Kpi({ k, v, d }: { k: string; v: ReactNode; d?: ReactNode }){
  return (
    <div className="rounded-[10px] border border-line bg-surface-1 px-4 py-3.5">
      <div className="mb-1 text-[.78rem] text-ink-2">{k}</div>
      <div className="text-2xl font-semibold tracking-tight tabular-nums">{v}</div>
      {d && <div className="mt-0.5 text-[.78rem] text-ink-3">{d}</div>}
    </div>
  );
}
export const KpiRow = ({ children }: { children: ReactNode }) =>
  <div className="mb-5 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">{children}</div>;

export const Tag = ({ children, title }: { children: ReactNode; title?: string }) =>
  <span title={title} className="ml-1.5 inline-block rounded-full border border-line px-1.5 py-px align-middle text-[.68rem] font-normal text-ink-3">{children}</span>;

/* barra de proporção com fundo (rankings, doadores) */
export function Meter({ pct, color, thin }: { pct: number; color: string; thin?: boolean }){
  return (
    <div className={'overflow-hidden rounded-full bg-surface-2 ' + (thin ? 'h-1' : 'h-[9px]')}>
      <i className="block h-full rounded-full" style={{ width: (pct > 0 ? Math.max(pct, 0.8) : 0) + '%', background: color }} />
    </div>
  );
}

/* ---------- status processual: sempre ícone + rótulo, nunca só cor ---------- */
const ICON = {
  ok: 'M20 6 9 17l-5-5',
  warn: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  info: 'M12 16v-4M12 8h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  crit: 'M12 8v4M12 16h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
};
const TOM = {
  ok: 'text-good border-good bg-good/10',
  neutral: 'text-ink-2 border-axis',
  warn: 'text-serious border-serious bg-serious/10',
  crit: 'text-crit border-crit bg-crit/10',
};
const STATUS: Record<string, [keyof typeof TOM, keyof typeof ICON]> = {
  anulado: ['ok', 'ok'], arquivado: ['ok', 'ok'], absolvido: ['ok', 'ok'],
  investigacao: ['neutral', 'info'], citado: ['neutral', 'info'],
  terceiro: ['neutral', 'info'], tramitacao: ['neutral', 'info'],
  denunciado: ['warn', 'warn'], reu: ['warn', 'warn'],
  condenado1: ['crit', 'crit'], condenado2: ['crit', 'crit'], transitado: ['crit', 'crit'],
};
export function Badge({ tom, icon, children }:
  { tom: keyof typeof TOM; icon?: keyof typeof ICON; children: ReactNode }){
  return (
    <span className={'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[.75rem] font-semibold ' + TOM[tom]}>
      {icon && (
        <svg viewBox="0 0 24 24" className="size-3 flex-none" fill="none" stroke="currentColor"
          strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={ICON[icon]} />
        </svg>
      )}
      {children}
    </span>
  );
}
export function StatusBadge({ status, label }: { status: string; label: string }){
  const [tom, icon] = STATUS[status] || ['neutral', 'info'];
  return <Badge tom={tom} icon={icon}>{label}</Badge>;
}
