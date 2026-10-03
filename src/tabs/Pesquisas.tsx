import { useState } from 'react';
import { DATAFOLHA_FINAL as D, PESQ_PRESIDENTE as P, PESQ_VALIDOS, SEGUNDO_TURNO, TOP_PESQUISAS }
  from '../data/pesquisas';
import type { SeriePesquisas, TopCargo } from '../data/types';
import { col, fmt, int } from '../lib/format';
import { BarChart, PollChart } from '../components/Chart';
import { Badge, Card, DataTable, Kpi, KpiRow, Legend, Meter, Note, PageHead, Seg, Sources, Tag, tip }
  from '../components/ui';

/* série de pesquisas: gráfico de linhas + tabela com todos os números */
export function SerieCard({ P, titulo, subtitulo, yMax, fontes }: {
  P: SeriePesquisas; titulo: string; subtitulo: string; yMax: number;
  fontes?: { t: string; u: string }[] }){
  const series = P.candidatos;
  return (
    <Card title={titulo} subtitle={subtitulo}>
      <Legend items={series.map(s => ({ color: col(s.slot), label: s.label }))} />
      <PollChart series={series} pesquisas={P.pesquisas} yMax={yMax} alt={titulo} />
      {P.alerta && <Note label="Divergência.">{P.alerta}</Note>}
      <DataTable label="Ver todos os números em tabela"
        headers={['Instituto', 'Campo', { t: 'Amostra', n: true }, { t: 'Margem', n: true },
          'Registro TSE', ...series.map(s => ({ t: s.label, n: true }))]}
        rows={P.pesquisas.map(p => [p.inst, p.campo, p.n ? int(p.n) : '—',
          p.me ? '± ' + fmt(p.me) : '—', p.reg || '—',
          ...series.map(s => p[s.k] == null ? '—' : fmt(p[s.k] as number) + '%')])} />
      <Sources fontes={fontes} />
    </Card>
  );
}

function Duelos(){
  return (
    <Card title="Simulações de 2º turno"
      subtitle="Cenários hipotéticos medidos pelos institutos. Não são previsões.">
      <Legend rect items={[
        { color: col(1), label: 'Primeiro nome do confronto' },
        { color: col(2), label: 'Segundo nome' },
        { color: 'var(--axis)', label: 'Branco, nulo ou nenhum' }]} />
      {SEGUNDO_TURNO.cenarios.map((c, i) => {
        const resto = 100 - c.av - c.bv - (c.brancoNulo || 0);
        return (
          <div key={i} className="border-b border-grid py-3.5">
            <div className="mb-2 flex flex-wrap justify-between gap-3 text-[.85rem]">
              <span className="text-ink-2">{c.inst} · {c.campo}{c.reg ? ' · ' + c.reg : ''}{c.validos ? ' · votos válidos' : ''}</span>
              {c.empate && <Badge tom="neutral">Empate técnico</Badge>}
            </div>
            <div className="flex h-[26px] gap-0.5 overflow-hidden rounded-[5px] bg-surface-2">
              {([[c.a, c.av, col(1)], [c.b, c.bv, col(2)]] as const).map(([nm, v, cc]) => (
                <div key={nm} style={{ width: v + '%', background: cc }}
                  className="grid place-items-center text-[.78rem] font-semibold text-white"
                  {...tip(nm, [{ color: cc, label: 'Intenção de voto', value: fmt(v) + '%' }],
                    c.inst + ' · campo ' + c.campo)}>
                  {v > 12 ? fmt(v) + '%' : ''}
                </div>
              ))}
              {!!c.brancoNulo && (
                <div style={{ width: c.brancoNulo + '%' }} className="bg-axis"
                  {...tip('Branco, nulo ou nenhum',
                    [{ color: 'var(--axis)', label: 'Parcela', value: fmt(c.brancoNulo) + '%' }])} />
              )}
              {resto > 0.5 && (
                <div style={{ width: resto + '%' }}
                  {...tip(c.indeciso ? 'Indecisos' : 'Não informado',
                    [{ label: 'Parcela', value: fmt(+resto.toFixed(1)) + '%' }],
                    c.indeciso ? null : 'O instituto não divulgou a distribuição restante.')} />
              )}
            </div>
            <div className="mt-1.5 flex justify-between gap-3 text-[.84rem]">
              <span>{c.a} · {fmt(c.av)}%</span><span>{c.b} · {fmt(c.bv)}%</span>
            </div>
          </div>
        );
      })}
      <Note>{SEGUNDO_TURNO.nota}</Note>
      <DataTable label="Ver cenários em tabela"
        headers={['Instituto', 'Campo', 'Cenário', 'Resultado', 'Registro TSE']}
        rows={SEGUNDO_TURNO.cenarios.map(c => [c.inst, c.campo, c.a + ' x ' + c.b,
          fmt(c.av) + '% a ' + fmt(c.bv) + '%' + (c.empate ? ' (empate técnico)' : ''), c.reg || '—'])} />
    </Card>
  );
}

const POR_PAGINA = 10;
const VAGAS: Record<string, number | undefined> = { senador: 2, depfed: 17, depest: 41 };

export function Ranking({ c, onPick }: { c: TopCargo; onPick?: (nr: string) => void }){
  const maior = Math.max(...c.lista.map(x => x.v), 1);
  const vagas = VAGAS[c.id];
  /* listas longas (deputados) aparecem de 10 em 10 */
  const [pag, setPag] = useState(0);
  const paginas = Math.ceil(c.lista.length / POR_PAGINA);
  const ini = pag * POR_PAGINA;
  const visiveis = c.lista.slice(ini, ini + POR_PAGINA);
  return (
    <Card>
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-[1.05rem] font-semibold">{c.rotulo}</h3>
        <span className="text-[.8rem] text-ink-2">
          {[c.inst, c.campo, c.n ? int(c.n) + ' entrevistas' : null,
            c.me ? 'margem de ± ' + fmt(c.me) + ' pontos' : null,
            c.reg ? 'registro ' + c.reg : null].filter(Boolean).join(' · ')}
        </span>
      </div>
      <p className="mb-3.5 text-[.8rem] text-ink-2">
        Percentuais em {c.base}.
        {c.espontanea ? ' Pesquisa espontânea: o entrevistado cita de memória, sem lista de nomes.' : ''}
      </p>
      {visiveis.map((x, k) => {
        const i = ini + k;
        const ant = c.lista[i - 1];
        /* empate técnico com o anterior: diferença dentro de duas margens */
        const empate = ant && Math.abs(ant.v - x.v) <= c.me * 2;
        return (
          <div key={x.nome} className="flex items-center gap-3 border-b border-grid py-2.5"
            {...tip(x.nome, [{ color: col(1), label: 'Intenção de voto', value: fmt(x.v) + '%' },
              { label: 'Margem de erro', value: '± ' + fmt(c.me) + ' pontos' }], c.inst + ' · ' + c.campo)}>
            <span className="grid size-[26px] flex-none place-items-center rounded-full border border-line bg-surface-2 text-[.8rem] font-bold text-ink-2">{i + 1}</span>
            <div className="min-w-0 flex-1">
              <div className="text-[.95rem] font-medium">
                {onPick && x.nr !== '—' ? <button type="button" aria-haspopup="dialog" onClick={() => onPick(x.nr)}
                  className="text-left text-s1 underline-offset-2 hover:underline">{x.nome}</button> : x.nome}
                {empate && <span title={'A diferença com ' + ant.nome + ' é menor que a margem de erro: os números não permitem dizer quem está à frente.'}
                  className="ml-2 inline-block rounded-full border border-dashed border-serious px-2 py-px text-[.68rem] text-serious">empate técnico</span>}
              </div>
              <div className="text-[.78rem] text-ink-3">{x.nr && x.nr !== '—' ? x.partido + ' · número ' + x.nr : x.partido || 'não localizado entre as candidaturas na urna'}</div>
            </div>
            <div className="min-w-[70px] flex-[1.4]"><Meter pct={(x.v / maior) * 100} color={col(1)} /></div>
            <span className="min-w-[52px] flex-none text-right text-[.92rem] font-bold tabular-nums">{fmt(x.v)}%</span>
          </div>
        );
      })}
      {paginas > 1 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setPag(p => p - 1)} disabled={pag === 0}
            className="rounded-lg border border-line bg-surface-2 px-3.5 py-1.5 text-[.85rem] disabled:opacity-40">← 10 anteriores</button>
          <button type="button" onClick={() => setPag(p => p + 1)} disabled={pag >= paginas - 1}
            className="rounded-lg bg-s1 px-3.5 py-1.5 text-[.85rem] font-semibold text-white disabled:opacity-40">
            {pag >= paginas - 1 ? 'Fim da lista' : 'Próximos ' + Math.min(POR_PAGINA, c.lista.length - ini - POR_PAGINA) + ' →'}</button>
          <span className="text-[.8rem] text-ink-2" aria-live="polite">
            {ini + 1}º a {ini + visiveis.length}º de {c.lista.length} nomes citados</span>
          {pag > 0 && <button type="button" onClick={() => setPag(0)} className="text-[.8rem] text-s1 underline">voltar ao início</button>}
        </div>
      )}
      {vagas && (
        <div className="mt-3 rounded-lg bg-surface-2 px-3 py-2 text-[.82rem] text-ink-2">
          {vagas === 2
            ? 'Goiás elege 2 senadores. Os três primeiros estão em empate técnico entre si, então os números não dizem quais dois se elegem.'
            : 'Goiás elege ' + vagas + ' deputados ' + (c.id === 'depest' ? 'estaduais' : 'federais') +
              '. No voto proporcional, quem se elege depende também do total de votos do partido ou federação, que só se conhece na apuração.'}
        </div>
      )}
      {c.nota && <div className="mt-3 rounded-lg bg-surface-2 px-3 py-2 text-[.82rem] text-ink-2">{c.nota}</div>}
      {c.limitacao && <Note crit label="Limitação importante.">{c.limitacao}</Note>}
      <Sources fontes={[{ t: 'Fonte da pesquisa', u: c.fonte }]} />
    </Card>
  );
}

type Sub = 'serie' | 'ultima' | 'turno2' | 'ranking';

export default function Pesquisas(){
  const [sub, setSub] = useState<Sub>('serie');
  const valido = (nome: string) => D.validos.find(x => x.nome.startsWith(nome))?.v;
  const lula = valido('Lula'), flavio = valido('Flávio');

  return (
    <>
      <PageHead title="Pesquisas de intenção de voto">
        Pesquisa não é previsão: mede intenção no momento da coleta e tem margem de erro. Quando a
        diferença entre dois candidatos é menor que a soma das margens, há empate técnico — os
        números não permitem dizer quem está na frente.
      </PageHead>

      <KpiRow>
        <Kpi k="Lula nos votos válidos" v={fmt(lula) + '%'} d={D.inst + ', ' + D.divulgacao.replace(' de 2026', '')} />
        <Kpi k="Flávio Bolsonaro nos válidos" v={fmt(flavio) + '%'}
          d={'Diferença de ' + fmt((lula ?? 0) - (flavio ?? 0)) + ' pontos'} />
        <Kpi k="Margem de erro" v={'± ' + fmt(D.me) + ' pts'} d={'Amostra de ' + int(D.n) + ' entrevistas'} />
        <Kpi k="Eleitores decididos" v={D.decididos + '%'} d="19% ainda podem mudar o voto" />
      </KpiRow>

      <Seg label="Seções de pesquisas" value={sub} onChange={setSub} options={[
        { id: 'serie', label: 'Evolução' }, { id: 'ultima', label: 'Última pesquisa' },
        { id: 'turno2', label: '2º turno' }, { id: 'ranking', label: 'Ranking por cargo' }]} />

      {sub === 'serie' && <>
        <SerieCard P={P} yMax={50} titulo="Presidente · 1º turno, votos totais"
          subtitulo="Pesquisas divulgadas em setembro e outubro de 2026. Inclui brancos, nulos e indecisos."
          fontes={P.fontes} />
        <Note>{P.nota}</Note>
        <Card title="Pesquisas em votos válidos" subtitle={PESQ_VALIDOS.nota}>
          <DataTable open label="Ver pesquisas em votos válidos"
            headers={['Instituto', 'Campo', { t: 'Amostra', n: true }, { t: 'Margem', n: true },
              'Registro TSE', { t: 'Lula', n: true }, { t: 'Flávio Bolsonaro', n: true }]}
            rows={PESQ_VALIDOS.linhas.map(l => [l.inst, l.campo, int(l.n), '± ' + fmt(l.me),
              l.reg || '—', l.lula == null ? '—' : fmt(l.lula) + '%', fmt(l.flavio) + '%'])} />
        </Card>
      </>}

      {sub === 'ultima' && <>
        <Card title="A pesquisa mais recente, em detalhe"
          subtitle={`${D.inst} divulgado em ${D.divulgacao}. Campo de ${D.campo}, ${int(D.n)} entrevistas em ${D.municipios} municípios, margem de ± ${D.me} pontos e ${D.confianca}% de confiança. Registro no TSE ${D.reg}. Contratada por ${D.contratante}.`}>
          <BarChart max={50} unidade="Intenção de voto"
            valFmt={v => fmt(v) + '%'} tickFmt={v => Math.round(v) + '%'}
            alt="Intenção de voto de cada candidato na pesquisa Datafolha de 1º de outubro."
            rows={D.totais.map(r => ({ label: r.nome, v: r.v,
              color: r.tipo === 'outro' ? 'neutro' : undefined,
              note: r.ant != null ? 'Na pesquisa anterior: ' + fmt(r.ant) + '%' : null }))} />
          <Note>{D.notaDatas}</Note>
          <DataTable label="Ver votos totais e válidos em tabela"
            headers={['Candidato', { t: 'Votos totais', n: true }, { t: 'Pesquisa anterior', n: true },
              { t: 'Votos válidos', n: true }]}
            rows={D.totais.map(r => { const vv = D.validos.find(x => x.nome === r.nome);
              return [r.nome, fmt(r.v) + '%', r.ant != null ? fmt(r.ant) + '%' : '—', vv ? fmt(vv.v) + '%' : '—']; })} />
          <Sources fontes={[{ t: 'Relatório do Datafolha', u: D.fonte }]} />
        </Card>
        <Card title="Rejeição"
          subtitle="Percentual que afirma não votar no candidato de jeito nenhum. Datafolha, 1º de outubro.">
          <BarChart max={50} unidade="Rejeição" valFmt={v => fmt(v) + '%'} tickFmt={v => Math.round(v) + '%'}
            alt="Índice de rejeição de cada candidato à Presidência."
            rows={D.rejeicao.map(r => ({ label: r.nome, v: r.v }))} />
          <DataTable label="Ver rejeição em tabela" headers={['Candidato', { t: 'Rejeição', n: true }]}
            rows={D.rejeicao.map(r => [r.nome, fmt(r.v) + '%'])} />
        </Card>
      </>}

      {sub === 'turno2' && <Duelos />}

      {sub === 'ranking' && <>
        <p className="mb-4 max-w-[70ch] text-[.92rem] text-ink-2">
          Os primeiros colocados de cada cargo (cinco, ou dez para deputados) na pesquisa mais completa, com a margem de erro e os empates
          técnicos marcados. <b className="text-ink-1">Isto não é previsão de resultado</b> — pesquisa
          mede intenção de voto no momento da coleta.
        </p>
        {TOP_PESQUISAS.cargos.map(c => <Ranking key={c.id} c={c} />)}
        <Note label="Como ler.">{TOP_PESQUISAS.aviso}</Note>
      </>}
    </>
  );
}
