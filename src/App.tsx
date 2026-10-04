import { lazy, Suspense, useEffect, useState } from 'react';
import { useHashTab } from './lib/useHashTab';
import { useTheme } from './lib/theme';
import { TipLayer } from './components/ui';
import { Sidebar } from './components/Sidebar';
import { UFS, useUf } from './lib/uf';

/* cada aba é um chunk próprio: dados e Chart.js só baixam quando a aba abre */
const ABAS = [
  { id: 'colinha', label: 'Minha colinha', C: lazy(() => import('./tabs/Colinha')) },
  { id: 'constituicao', label: 'Constituição e voto', C: lazy(() => import('./tabs/Constituicao')) },
  { id: 'apuracao', label: 'Apuração', C: lazy(() => import('./tabs/Apuracao')) },
  { id: 'pesquisas', label: 'Pesquisas', C: lazy(() => import('./tabs/Pesquisas')) },
  { id: 'presidente', label: 'Presidente', C: lazy(() => import('./tabs/Presidente')) },
  { id: 'goias', label: 'Estado', C: lazy(() => import('./tabs/Goias')) },
  { id: 'partidos', label: 'Partidos', C: lazy(() => import('./tabs/Partidos')) },
  { id: 'votacoes', label: 'Como votaram', C: lazy(() => import('./tabs/Votacoes')) },
  { id: 'financiamento', label: 'Financiamento', C: lazy(() => import('./tabs/Financiamento')) },
  { id: 'metodo', label: 'Método e fontes', C: lazy(() => import('./tabs/Metodo')) },
] as const;
type AbaId = typeof ABAS[number]['id'];
const IDS = ABAS.map(a => a.id);

function Contagem({ irApuracao }: { irApuracao: () => void }){
  const [agora, setAgora] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setAgora(Date.now()), 30_000); return () => clearInterval(id); }, []);
  const abre = Date.parse('2026-10-04T08:00:00-03:00'), fecha = Date.parse('2026-10-04T17:00:00-03:00');
  const diff = abre - agora;
  return (
    <div className="mt-5 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl border border-line bg-surface-2 px-4 py-3 tabular-nums">
      <span aria-hidden="true" className="size-2 flex-none animate-pulse rounded-full bg-s1" />
      {diff > 0 ? <>
        <span className="text-ink-2">Primeiro turno em</span>
        <b className="text-[1.35rem] leading-none">{Math.floor(diff / 3.6e6)}h {String(Math.floor(diff / 6e4) % 60).padStart(2, '0')}min</b>
        <span className="text-ink-2">· domingo, 4 de outubro, das 8h às 17h</span>
      </> : agora < fecha ? <span>Votação do 1º turno em andamento, até as 17h · 2º turno em 25 de outubro</span>
        : <span>Votação do 1º turno encerrada ·{' '}
            <button type="button" onClick={irApuracao} className="text-s1 underline">acompanhe a apuração</button>
            {' '}· 2º turno em 25 de outubro</span>}
    </div>
  );
}

export default function App(){
  const [tab, setTab] = useHashTab<AbaId>(IDS, 'colinha');
  const { toggle } = useTheme();
  const { uf, setUf } = useUf();
  /* seta piscando ao lado do seletor de estado nos primeiros 10 segundos, ou até a
     pessoa escolher */
  const [dica, setDica] = useState(true);
  useEffect(() => { const id = setTimeout(() => setDica(false), 10_000); return () => clearTimeout(id); }, []);
  /* a aba do estado leva o nome do estado escolhido */
  const itens = ABAS.map(a => a.id === 'goias' ? { id: a.id, label: uf.nome } : { id: a.id, label: a.label });
  const Aba = ABAS.find(a => a.id === tab)!.C;

  return (
    <>
      <header className="border-b border-line bg-surface-1 pt-7 pb-5 print:hidden">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span aria-hidden="true" className="grid size-9 flex-none place-items-center rounded-lg bg-s1 text-white">
                  <svg viewBox="0 0 48 48" className="size-6" fill="none" stroke="currentColor" strokeWidth={3}
                    strokeLinecap="round" strokeLinejoin="round"><path d="M8 20h32v20H8z M19 20V8h10v12 M21.5 13.5l2 2 3.5-4" /></svg>
                </span>
                <span className="text-[1rem] font-semibold tracking-wide">Sem Influenciar</span>
                <span className="text-[.82rem] text-ink-3">informação com fonte, sem indicar candidato</span>
              </div>
              <h1 className="mt-3.5 text-[clamp(2.1rem,6.5vw,3.2rem)] font-bold leading-none tracking-tight">
                Eleições <span className="text-s1">2026</span></h1>
              <p className="mt-3.5 max-w-[62ch] text-ink-2">
                Presidente, governador, senador e deputados em todos os estados: colinha com foto,
                apuração oficial e ficha de cada candidatura com dados do TSE. Propostas, pesquisas e
                histórico judicial com fonte para a Presidência e para Goiás.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-[.85rem] text-ink-2">
                {dica && (
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={3}
                    strokeLinecap="round" strokeLinejoin="round"
                    className="size-6 flex-none animate-[pisca_.9s_ease-in-out_infinite] text-s1 motion-reduce:animate-none"><path d="M3 12h17M13 5l7 7-7 7" /></svg>
                )}
                <span className={dica ? 'font-semibold text-ink-1' : ''}>{dica ? 'Escolha seu estado' : 'Seu estado'}</span>
                <select value={uf.sigla} onChange={e => { setUf(e.target.value); setDica(false); }}
                  className="rounded-lg border-[1.5px] border-s1 bg-surface-2 px-2.5 py-1.5 text-[.9rem] font-semibold text-ink-1">
                  {UFS.map(u => <option key={u.sigla} value={u.sigla}>{u.nome}</option>)}
                </select>
              </label>
              <button type="button" onClick={toggle} aria-label="Alternar tema claro e escuro"
                className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[.85rem] text-ink-2 hover:text-ink-1">Tema</button>
            </div>
          </div>
          <Contagem irApuracao={() => setTab('apuracao')} />
        </div>
      </header>

      <div className="mx-auto grid max-w-[1320px] gap-x-6 px-4 lg:grid-cols-[210px_minmax(0,1fr)] lg:pt-6 print:block print:p-0">
        <Sidebar itens={itens} ativo={tab} onChange={setTab} />
        <main id="painel" role="tabpanel" aria-labelledby={'tab-' + tab}
          className="min-h-[60vh] min-w-0 pt-8 pb-2 lg:pt-0 print:p-0">
          <Suspense fallback={<p className="py-16 text-center text-ink-2">Carregando…</p>}>
            <Aba />
          </Suspense>
        </main>
      </div>

      <footer className="mt-12 border-t border-line bg-surface-1 py-7 text-[.85rem] text-ink-2 print:hidden">
        <div className="mx-auto max-w-[1320px] px-4">
          <p><b>Este site não é oficial</b> e não tem vínculo com o TSE, com partidos ou com
            candidaturas. Em caso de divergência, vale sempre a informação oficial do Tribunal
            Superior Eleitoral.</p>
          <p className="mt-2.5">Dados coletados em 3 de outubro de 2026; apuração e conferência de
            números consultadas em tempo real no TSE. Informação oficial sobre candidaturas, locais
            de votação e resultados: <a href="https://www.tse.jus.br" target="_blank" rel="noopener">tse.jus.br</a>.</p>
        </div>
      </footer>
      <TipLayer />
    </>
  );
}
