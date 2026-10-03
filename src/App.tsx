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
    <div className="mt-4 inline-flex flex-wrap items-baseline gap-x-2 rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 tabular-nums">
      {diff > 0 ? <>
        <span>Primeiro turno em</span>
        <b className="text-[1.1rem]">{Math.floor(diff / 3.6e6)}h {String(Math.floor(diff / 6e4) % 60).padStart(2, '0')}min</b>
        <span>· domingo, 4 de outubro, 8h às 17h</span>
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
  /* a aba do estado leva o nome do estado escolhido */
  const itens = ABAS.map(a => a.id === 'goias' ? { id: a.id, label: uf.nome } : { id: a.id, label: a.label });
  const Aba = ABAS.find(a => a.id === tab)!.C;

  return (
    <>
      <header className="border-b border-line bg-surface-1 pt-7 pb-5 print:hidden">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-[clamp(1.6rem,4.5vw,2.4rem)] font-semibold tracking-tight">Comparador Eleições 2026</h1>
              <p className="mt-2 max-w-[62ch] text-ink-2">
                Presidente, governador, senador e deputados em todos os estados: colinha com foto,
                apuração oficial e ficha de cada candidatura com dados do TSE. Propostas, pesquisas e
                histórico judicial com fonte para a Presidência e para Goiás.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-[.85rem] text-ink-2">
                <span>Seu estado</span>
                <select value={uf.sigla} onChange={e => setUf(e.target.value)}
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
