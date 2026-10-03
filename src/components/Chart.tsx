/* Gráficos em Chart.js, importando só o que é usado (linha e barra) para manter o
   bundle pequeno. Este módulo só entra nas abas que têm gráfico. */
import { useEffect, useRef } from 'react';
import {
  Chart, LineController, BarController, LineElement, PointElement, BarElement,
  CategoryScale, LinearScale, LogarithmicScale, Tooltip,
  type ChartConfiguration, type Plugin, type TooltipOptions,
} from 'chart.js';
import { cssColors, useTheme, type Colors } from '../lib/theme';
import { fmt } from '../lib/format';
import type { Pesquisa, SerieCandidato } from '../data/types';

Chart.register(LineController, BarController, LineElement, PointElement, BarElement,
  CategoryScale, LinearScale, LogarithmicScale, Tooltip);
Chart.defaults.font.family = 'system-ui, -apple-system, "Segoe UI", sans-serif';
Chart.defaults.font.size = 11;
Chart.defaults.animation = false;

type Cfg = ChartConfiguration<'line' | 'bar', (number | null)[], string | string[]>;

function Canvas({ build, height, alt }:
  { build: (c: Colors) => Cfg; height: number; alt: string }){
  const ref = useRef<HTMLCanvasElement>(null);
  const { rev } = useTheme();
  useEffect(() => {
    const chart = new Chart(ref.current!, build(cssColors()) as ChartConfiguration);
    return () => chart.destroy();
  }, [build, rev]);
  return (
    <div className="relative w-full" style={{ height }}>
      <canvas ref={ref} role="img" aria-label={alt} />
    </div>
  );
}

const tooltip = (c: Colors): Partial<TooltipOptions<'line' | 'bar'>> => ({
  backgroundColor: c.surface1, borderColor: c.axis, borderWidth: 1,
  titleColor: c.ink1, bodyColor: c.ink2, footerColor: c.ink3,
  titleFont: { weight: 600, size: 12.5 }, bodyFont: { size: 12.5 },
  footerFont: { weight: 'normal', size: 11.5 },
  padding: 10, cornerRadius: 8, boxPadding: 5, usePointStyle: true,
});

/* quebra o texto do rodapé do tooltip em linhas curtas */
function quebra(s: string, max = 44){
  const out: string[] = []; let cur = '';
  s.split(' ').forEach(w => {
    if ((cur + ' ' + w).trim().length > max){ out.push(cur); cur = w; }
    else cur = (cur + ' ' + w).trim();
  });
  if (cur) out.push(cur);
  return out;
}

/* ---------- série de pesquisas (linhas) ---------- */
export function PollChart({ series, pesquisas, yMax, alt }:
  { series: SerieCandidato[]; pesquisas: Pesquisa[]; yMax: number; alt: string }){
  const build = useRef((c: Colors): Cfg => {
    const val = (p: Pesquisa, k: string) => (p[k] as number | null | undefined) ?? null;

    /* linha vertical na pesquisa sob o cursor */
    const crosshair: Plugin = {
      id: 'crosshair',
      afterDatasetsDraw(ch){
        const a = ch.tooltip?.getActiveElements()[0];
        if (!a) return;
        const { ctx, chartArea } = ch;
        ctx.save(); ctx.strokeStyle = c.axis; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.element.x, chartArea.top);
        ctx.lineTo(a.element.x, chartArea.bottom); ctx.stroke(); ctx.restore();
      },
    };
    /* rótulo direto na ponta de cada linha, só onde não colide: quando as séries
       convergem, a legenda e o tooltip carregam a identificação */
    const pontas: Plugin = {
      id: 'pontas',
      afterDatasetsDraw(ch){
        const fins: { x: number; y: number; v: number }[] = [];
        ch.data.datasets.forEach((ds, di) => {
          let last = -1;
          ds.data.forEach((v, i) => { if (v != null) last = i; });
          if (last < 0) return;
          const el = ch.getDatasetMeta(di).data[last];
          fins.push({ x: el.x, y: el.y, v: ds.data[last] as number });
        });
        const porX = new Map<number, typeof fins>();
        fins.forEach(f => porX.set(f.x, [...(porX.get(f.x) || []), f]));
        const { ctx } = ch;
        ctx.save();
        ctx.font = '600 11.5px ' + Chart.defaults.font.family;
        ctx.fillStyle = c.ink1; ctx.textBaseline = 'middle';
        porX.forEach(g => {
          const vis: typeof fins = [];
          g.sort((a, b) => a.y - b.y).forEach(f => {
            if (!vis.some(o => Math.abs(o.y - f.y) < 13)) vis.push(f);
          });
          vis.forEach(f => ctx.fillText(fmt(f.v) + '%', f.x + 10, f.y));
        });
        ctx.restore();
      },
    };

    return {
      type: 'line',
      data: {
        labels: pesquisas.map(p => [
          p.campo.split('–').pop()!.replace('/set', '/9').replace('/out', '/10'),
          p.inst.split('/')[0]]),
        datasets: series.map(s => {
          const cor = c.s[(s.slot - 1) % 6];
          return {
            label: s.label, data: pesquisas.map(p => val(p, s.k)),
            borderColor: cor, backgroundColor: cor, borderWidth: 2,
            pointRadius: 4.5, pointHoverRadius: 6,
            pointBorderColor: c.surface1, pointBorderWidth: 2,
            pointBackgroundColor: cor, pointHoverBorderColor: c.surface1,
            borderJoinStyle: 'round' as const, borderCapStyle: 'round' as const,
          };
        }),
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        layout: { padding: { right: 46, top: 10 } },
        scales: {
          y: { min: 0, max: yMax, border: { display: false },
            grid: { color: c.grid }, ticks: { stepSize: 10, color: c.ink3,
              callback: v => v + '%' } },
          x: { offset: true, grid: { display: false }, border: { color: c.axis },
            ticks: { color: c.ink3, maxRotation: 0, autoSkip: false,
              /* em tela estreita só a data cabe; o instituto fica no tooltip e na tabela */
              callback(v){ const l = this.getLabelForValue(+v) as unknown as string[];
                return this.chart.width < 560 ? l[0] : l; } } },
        },
        plugins: {
          tooltip: {
            ...tooltip(c),
            itemSort: (a, b) => (b.parsed.y ?? 0) - (a.parsed.y ?? 0),
            callbacks: {
              title: items => { const p = pesquisas[items[0].dataIndex];
                return p.inst + ' · ' + p.campo; },
              label: it => ' ' + it.dataset.label + ': ' + fmt(it.parsed.y) + '%',
              footer: items => { const p = pesquisas[items[0].dataIndex];
                return quebra([
                  p.n ? 'Amostra de ' + p.n.toLocaleString('pt-BR') : null,
                  p.me ? 'Margem de ± ' + fmt(p.me) + ' pontos' : null,
                  p.reg ? 'Registro ' + p.reg : null,
                  p.discrepante ? 'Pesquisa discrepante das demais.' : null,
                  p.notaLinha || null].filter(Boolean).join(' · ')); },
            },
          },
        },
      },
      plugins: [crosshair, pontas],
    };
  }).current;
  return <Canvas build={build} height={340} alt={alt} />;
}

/* ---------- barras horizontais ---------- */
export interface BarRow { label: string; v: number; note?: string | null; color?: string }

export function BarChart({ rows, max, unidade, valFmt = fmt, tickFmt, log, alt }:
  { rows: BarRow[]; max?: number; unidade: string; alt: string;
    valFmt?: (v: number) => string; tickFmt?: (v: number) => string;
    /* escala logarítmica, com os limites em potências de 10 */
    log?: { min: number; max: number } }){
  const build = useRef((c: Colors): Cfg => {
    /* valor escrito na ponta de cada barra */
    const valores: Plugin = {
      id: 'valores',
      afterDatasetsDraw(ch){
        const { ctx } = ch;
        ctx.save();
        ctx.font = '600 11.5px ' + Chart.defaults.font.family;
        ctx.fillStyle = c.ink1; ctx.textBaseline = 'middle';
        ch.getDatasetMeta(0).data.forEach((el, i) =>
          ctx.fillText(valFmt(rows[i].v), el.x + 7, el.y));
        ctx.restore();
      },
    };
    const eixo = { grid: { color: c.grid }, border: { display: false } };
    return {
      type: 'bar',
      data: {
        labels: rows.map(r => r.label),
        datasets: [{
          label: unidade, data: rows.map(r => r.v),
          backgroundColor: rows.map(r => r.color === 'neutro' ? c.axis : c.s[0]),
          /* canto reto na base, arredondado na ponta do dado */
          borderRadius: { topRight: 4, bottomRight: 4, topLeft: 0, bottomLeft: 0 },
          borderSkipped: false, barThickness: 20,
        }],
      },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        layout: { padding: { right: 84 } },
        scales: {
          x: log
            ? { type: 'logarithmic', min: log.min, max: log.max, ...eixo,
                afterBuildTicks: ax => {
                  const t = []; for (let v = log.min; v <= log.max * 1.0001; v *= 10) t.push({ value: v });
                  ax.ticks = t; },
                ticks: { color: c.ink3, callback: v => tickFmt ? tickFmt(+v) : String(v) } }
            : { min: 0, max, ...eixo,
                ticks: { color: c.ink3, maxTicksLimit: 6,
                  callback: v => tickFmt ? tickFmt(+v) : String(v) } },
          y: { grid: { display: false }, border: { color: c.axis },
            ticks: { color: c.ink2, autoSkip: false } },
        },
        plugins: {
          tooltip: {
            ...tooltip(c),
            callbacks: {
              label: it => ' ' + unidade + ': ' + valFmt(rows[it.dataIndex].v),
              footer: items => { const n = rows[items[0].dataIndex].note;
                return n ? quebra(n) : []; },
            },
          },
        },
      },
      plugins: [valores],
    };
  }).current;
  return <Canvas build={build} height={rows.length * 30 + 34} alt={alt} />;
}
