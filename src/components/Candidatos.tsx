import { useMemo, useState } from 'react';
import type { Candidato, Processo } from '../data/types';
import { TOP_PESQUISAS } from '../data/pesquisas';
import { brl, fmt, norm } from '../lib/format';
import { Note, Seg, Sources, StatusBadge } from './ui';

const TEMAS: Record<string, string> = {
  economia: 'Economia', seguranca: 'Segurança', saude: 'Saúde', educacao: 'Educação',
  ambiente: 'Meio ambiente', externa: 'Política externa', infraestrutura: 'Infraestrutura',
};

const H4 = ({ children }: { children: React.ReactNode }) =>
  <h4 className="mb-2 text-[.78rem] font-semibold uppercase tracking-wider text-ink-3">{children}</h4>;

function Proc({ p }: { p: Processo }){
  return (
    <div className="mb-2.5 rounded-lg border border-line bg-surface-2 px-4 py-3">
      <div className="mb-1.5 flex flex-wrap items-center gap-2">
        <span className="text-[.92rem] font-semibold">{p.caso}</span>
        <StatusBadge status={p.status} label={p.statusTexto} />
      </div>
      <div className="text-[.87rem] text-ink-2">{p.detalhe}</div>
      {p.fonte && <div className="mt-2 text-[.8rem]">
        <a href={p.fonte} target="_blank" rel="noopener">Ver fonte</a></div>}
    </div>
  );
}

function Ficha({ c }: { c: Candidato }){
  const [open, setOpen] = useState(false);
  const sub = [c.partido, c.vice ? 'Vice: ' + c.vice : null,
    c.suplentes ? 'Suplentes: ' + c.suplentes : null].filter(Boolean).join(' · ');
  const pills = [c.situacao, c.idade ? c.idade + ' anos' : null, c.coligacao, c.destaque,
    c.receita != null ? 'Receita: ' + brl(c.receita / 1e6) : null].filter(Boolean) as string[];
  const nProc = c.processos?.length || 0;

  return (
    <article className="mb-3.5 overflow-hidden rounded-xl border border-line bg-surface-1">
      <button type="button" aria-expanded={open} onClick={() => setOpen(o => !o)}
        className="flex w-full items-start gap-3.5 px-4 py-4 text-left hover:bg-surface-2 sm:px-5">
        <span className="grid size-[46px] flex-none place-items-center rounded-[9px] border border-line bg-surface-2 text-[1.05rem] font-bold tabular-nums">
          {c.num != null ? c.num : '—'}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[1.05rem] font-semibold">{c.nome || c.urna}</span>
          <span className="mt-0.5 block text-[.88rem] text-ink-2">{sub}</span>
          <span className="mt-1 block text-[.78rem] text-ink-3">
            {nProc ? nProc + (nProc === 1 ? ' registro judicial' : ' registros judiciais')
              : 'sem registro judicial localizado'}
            {c.alerta ? ' · há um alerta sobre esta candidatura' : ''}
          </span>
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"
          className={'mt-3 size-[18px] flex-none text-ink-3 transition-transform ' + (open ? 'rotate-180' : '')}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-grid px-4 pb-5 sm:px-5">
          {c.alerta && (
            <Note crit label="Atenção.">{c.alerta}
              {c.alertaFonte && <><br /><a href={c.alertaFonte} target="_blank" rel="noopener">Ver fonte</a></>}
            </Note>
          )}
          <div className="mt-3.5 flex flex-wrap gap-2.5">
            {pills.map(p => <span key={p} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-[.78rem] text-ink-2">{p}</span>)}
          </div>

          {c.trajetoria && <div className="mt-4"><H4>Trajetória</H4><p>{c.trajetoria}</p></div>}
          {c.contexto && <Note>{c.contexto}</Note>}
          {c.receitaNota && (
            <div className="mt-4"><H4>Financiamento</H4>
              <p className="text-[.9rem]">{c.receita != null ? brl(c.receita / 1e6) + '. ' : ''}{c.receitaNota}</p>
            </div>
          )}

          {c.propostas && typeof c.propostas === 'object' && (
            <div className="mt-4"><H4>Propostas{c.plano ? ' · ' + c.plano : ''}</H4>
              <dl className="grid gap-2.5">
                {Object.keys(TEMAS).map(k => {
                  const v = (c.propostas as Record<string, string>)[k];
                  return v ? (
                    <div key={k} className="grid gap-0.5">
                      <dt className="text-[.8rem] font-semibold text-ink-2">{TEMAS[k]}</dt>
                      <dd className="text-[.9rem]">{v}</dd>
                    </div>
                  ) : null;
                })}
              </dl>
            </div>
          )}
          {typeof c.propostas === 'string' && (
            <div className="mt-4"><H4>Propostas</H4><p className="text-[.9rem]">{c.propostas}</p></div>
          )}
          {c.propostasNota && <p className="mt-2 text-[.88rem] italic text-ink-2">{c.propostasNota}</p>}

          <div className="mt-4"><H4>Histórico judicial e escândalos</H4>
            {nProc ? c.processos!.map((p, i) => <Proc key={i} p={p} />)
              : <p className="text-[.88rem] italic text-ink-2">Nenhum registro relevante encontrado nas fontes consultadas.</p>}
            {c.processosNota && <p className="text-[.88rem] italic text-ink-2">{c.processosNota}</p>}
          </div>

          {!!c.fontes?.length && <div className="mt-4"><H4>Fontes</H4><Sources fontes={c.fontes} /></div>}
        </div>
      )}
    </article>
  );
}

/* lista de fichas com busca e filtro "mais bem colocados" (segundo TOP_PESQUISAS) */
export function ListaCandidatos({ dados, cargoId }: { dados: Candidato[]; cargoId: string }){
  const top = TOP_PESQUISAS.cargos.find(x => x.id === cargoId);
  const [filtro, setFiltro] = useState<'todos' | 'top'>('todos');
  const [q, setQ] = useState('');

  const vis = useMemo(() => {
    const nq = norm(q.trim());
    return dados.filter(c => {
      if (filtro === 'top' && top && !top.lista.some(x => x.nr === String(c.num))) return false;
      if (!nq) return true;
      return norm([c.nome, c.urna, c.partido, c.num, c.vice].filter(Boolean).join(' ')).includes(nq);
    });
  }, [dados, filtro, q, top]);

  return (
    <div>
      <div className="flex flex-wrap items-start gap-x-3">
        {top && (
          <Seg label="Filtrar candidatos" value={filtro} onChange={setFiltro}
            note={'segundo a pesquisa ' + top.inst}
            options={[{ id: 'todos', label: 'Todos (' + dados.length + ')' },
              { id: 'top', label: 'Mais bem colocados (' + top.lista.length + ')' }]} />
        )}
        <input type="search" value={q} onChange={e => setQ(e.target.value)}
          placeholder="Buscar por nome, partido ou número" aria-label="Buscar candidato"
          className="mb-4 w-full rounded-lg border-[1.5px] border-line bg-surface-2 px-3 py-1.5 text-[.88rem] outline-none focus:border-s1 sm:ml-auto sm:w-72" />
      </div>
      {vis.map(c => <Ficha key={c.num + c.nome} c={c} />)}
      {!vis.length && <p className="py-6 text-center text-[.9rem] text-ink-2">Nenhuma candidatura encontrada para essa busca.</p>}
      {filtro === 'top' && top && (
        <Note label="Filtro ativo.">
          Mostrando os mais bem colocados na pesquisa {top.inst}, de {dados.length} candidaturas.
          A margem de erro é de ± {fmt(top.me)} pontos, então a ordem entre candidatos próximos
          não é significativa. Pesquisa não prevê resultado.
        </Note>
      )}
    </div>
  );
}
