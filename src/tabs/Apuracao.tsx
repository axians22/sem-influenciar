import { useMemo, useState } from 'react';
import { useTse, type CargoTse } from '../lib/tse';
import { rotuloCargo, useUf } from '../lib/uf';
import { col, int, norm, titulo } from '../lib/format';
import { Badge, Card, Kpi, KpiRow, Meter, Note, PageHead, Seg } from '../components/ui';

const CARGOS: CargoTse[] = ['presidente', 'governador', 'senador', 'depfed', 'depest'];
const LIMITE = 30;

export default function Apuracao(){
  const [cargo, setCargo] = useState<CargoTse>('presidente');
  const { uf } = useUf();
  const { dados: d, erro, carregando, consultadoEm, atualizar } = useTse(cargo, uf.sigla, 60_000);
  const titulo_ = rotuloCargo(cargo, uf) + (cargo === 'presidente' ? '' : ' · ' + uf.nome);
  const [q, setQ] = useState('');
  const [todos, setTodos] = useState(false);

  const lista = useMemo(() => {
    if (!d) return [];
    const nq = norm(q.trim());
    const pos = d.cands.map((c, i) => ({ ...c, pos: i + 1 }));
    return nq ? pos.filter(c => norm(c.urna + ' ' + c.nome + ' ' + c.partido + ' ' + c.n).includes(nq)) : pos;
  }, [d, q]);
  const vis = todos || q ? lista : lista.slice(0, LIMITE);
  const maior = d ? Math.max(...d.cands.map(c => c.pct), 1) : 1;

  return (
    <>
      <PageHead title="Apuração oficial">
        Votos totalizados pelo TSE, consultados direto dos arquivos que alimentam o site oficial de
        resultados. Atualiza sozinha a cada minuto enquanto esta aba estiver aberta. Os cargos estaduais
        são os de {uf.nome}; troque o estado no topo da página.
      </PageHead>

      <Seg label="Cargo" value={cargo} onChange={c => { setCargo(c); setQ(''); setTodos(false); }}
        options={CARGOS.map(c => ({ id: c, label: c === 'senador' ? 'Senado' : rotuloCargo(c, uf) }))} />

      {erro && !d && (
        <Note crit label="Não foi possível consultar o TSE.">
          {erro}. Verifique sua conexão ou acompanhe em{' '}
          <a href="https://resultados.tse.jus.br" target="_blank" rel="noopener">resultados.tse.jus.br</a>.{' '}
          <button type="button" onClick={atualizar} className="underline">Tentar de novo</button>
        </Note>
      )}
      {!d && !erro && <p className="py-10 text-center text-ink-2">Consultando o TSE…</p>}

      {d && <>
        <KpiRow>
          <Kpi k="Seções totalizadas" v={d.secoes.pct + '%'}
            d={int(d.secoes.totalizadas) + ' de ' + int(d.secoes.total)} />
          <Kpi k="Comparecimento" v={d.iniciada ? d.eleitores.pctComp + '%' : '—'}
            d={int(d.eleitores.total) + ' eleitores aptos'} />
          <Kpi k="Brancos" v={d.iniciada ? d.votos.pctBrancos + '%' : '—'}
            d={d.iniciada ? int(d.votos.brancos) + ' votos' : 'aguardando apuração'} />
          <Kpi k="Nulos" v={d.iniciada ? d.votos.pctNulos + '%' : '—'}
            d={d.iniciada ? int(d.votos.nulos) + ' votos' : 'aguardando apuração'} />
        </KpiRow>

        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[.82rem] text-ink-2">
          {d.final ? <Badge tom="ok" icon="ok">Totalização concluída</Badge>
            : d.iniciada ? <Badge tom="warn" icon="info">Apuração em andamento</Badge>
            : <Badge tom="neutral" icon="info">Apuração não iniciada</Badge>}
          <span>
            {d.totalizadoEm ? 'Última totalização do TSE: ' + d.totalizadoEm : 'Arquivo gerado pelo TSE em ' + d.geradoEm}
            {consultadoEm ? ' · consultado às ' + consultadoEm.toLocaleTimeString('pt-BR') : ''}
            {erro ? ' · a última atualização falhou, mostrando os dados anteriores' : ''}
          </span>
          <button type="button" onClick={atualizar} disabled={carregando}
            className="rounded-lg border border-line bg-surface-2 px-3 py-1 text-ink-1 disabled:opacity-50">
            {carregando ? 'Atualizando…' : 'Atualizar agora'}
          </button>
        </div>

        {!d.iniciada && (
          <Note label="Ainda sem votos.">
            A apuração começa depois do encerramento da votação, às 17h (horário de Brasília) de 4 de
            outubro. Até lá, a lista abaixo mostra as {d.cands.length} candidaturas que constam na
            totalização oficial, em ordem alfabética e com votos zerados.
          </Note>
        )}

        <Card title={titulo_}
          subtitle={`${d.cands.length} candidaturas · ${d.vagas} ${d.vagas === 1 ? 'vaga' : 'vagas'} · percentuais sobre os votos válidos`}>
          {d.cands.length > LIMITE && (
            <input type="search" value={q} onChange={e => setQ(e.target.value)}
              placeholder="Buscar por nome, partido ou número" aria-label="Buscar candidato na apuração"
              className="mb-3 w-full rounded-lg border-[1.5px] border-line bg-surface-2 px-3 py-1.5 text-[.88rem] outline-none focus:border-s1 sm:w-80" />
          )}
          {vis.map(c => (
            <div key={c.n + c.urna} className="flex items-center gap-3 border-b border-grid py-2.5 last:border-b-0">
              <span className="grid size-[26px] flex-none place-items-center rounded-full border border-line bg-surface-2 text-[.75rem] font-bold text-ink-2">{c.pos}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[.95rem] font-medium">
                  {titulo(c.urna)}
                  {c.eleito ? <Badge tom="ok" icon="ok">{c.situacao || 'Eleito'}</Badge>
                    : c.situacao ? <Badge tom="neutral">{c.situacao}</Badge> : null}
                </div>
                <div className="text-[.78rem] text-ink-3">
                  {c.partido} · número {c.n}{c.vice ? ' · vice ' + titulo(c.vice) : ''}
                </div>
              </div>
              <div className="hidden min-w-[70px] flex-[1.2] sm:block"><Meter pct={(c.pct / maior) * 100} color={col(1)} /></div>
              <div className="min-w-[92px] flex-none text-right tabular-nums">
                <div className="text-[.92rem] font-bold">{c.pctTxt}%</div>
                <div className="text-[.76rem] text-ink-3">{int(c.votos)} votos</div>
              </div>
            </div>
          ))}
          {!vis.length && <p className="py-6 text-center text-[.9rem] text-ink-2">Nenhuma candidatura encontrada.</p>}
          {!q && lista.length > LIMITE && (
            <button type="button" onClick={() => setTodos(t => !t)}
              className="mt-3 rounded-lg border border-line bg-surface-2 px-3.5 py-1.5 text-[.85rem]">
              {todos ? 'Mostrar só os ' + LIMITE + ' primeiros' : 'Mostrar todas as ' + lista.length + ' candidaturas'}
            </button>
          )}
        </Card>

        {(cargo === 'depfed' || cargo === 'depest') && (
          <Note>No voto proporcional, a ordem de votação individual não define sozinha quem se elege:
            as vagas são distribuídas pelo total de votos de cada partido ou federação. Vale a
            marcação “Eleito” feita pelo próprio TSE.</Note>
        )}
        <p className="text-[.82rem] text-ink-2">
          Fonte: <a href="https://resultados.tse.jus.br" target="_blank" rel="noopener">TSE · resultados das Eleições 2026</a>.
          Em caso de divergência, vale o que o TSE publicar.
        </p>
      </>}
    </>
  );
}
