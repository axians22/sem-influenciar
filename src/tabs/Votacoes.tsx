import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { bancada, detalheVotacao, proposicoes, votacoesNominais,
  type DeputadoCamara, type DetalheVotacao, type Proposicao, type Votacao } from '../lib/camara';
import { useUf } from '../lib/uf';
import { col, norm } from '../lib/format';
import { Badge, Card, Kpi, KpiRow, Note, PageHead, Seg, Sources } from '../components/ui';

const QUANTAS = 20;

/* carrega algo assíncrono e guarda estado de carregando/erro */
function useAsync<T>(f: () => Promise<T>, deps: unknown[]){
  const [st, setSt] = useState<{ dados: T | null; erro: string | null }>({ dados: null, erro: null });
  useEffect(() => {
    let vivo = true;
    setSt({ dados: null, erro: null });
    f().then(d => { if (vivo) setSt({ dados: d, erro: null }); },
      (e: Error) => { if (vivo) setSt({ dados: null, erro: e.message || 'falha de rede' }); });
    return () => { vivo = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return st;
}

const dataBr = (s: string) => s.slice(0, 10).split('-').reverse().join('/');
const curta = (s: string) => { const t = s.replace(/\s*Sim:.*$/i, '').trim(); return t.length > 230 ? t.slice(0, 227) + '…' : t; };

const TOM: Record<string, 'ok' | 'crit' | 'neutral' | 'warn'> = { 'Sim': 'ok', 'Não': 'crit' };
const VotoBadge = ({ v }: { v: string | null }) => v
  ? <Badge tom={TOM[v] || 'neutral'}>{v}</Badge>
  : <Badge tom="warn">Não votou</Badge>;

const Carregando = ({ children }: { children: ReactNode }) => <p className="py-8 text-center text-ink-2">{children}</p>;
const Erro = ({ msg }: { msg: string }) => (
  <Note crit label="Não foi possível consultar a Câmara.">{msg}. Tente de novo em instantes ou veja em{' '}
    <a href="https://www.camara.leg.br/votacoes-plenario" target="_blank" rel="noopener">camara.leg.br</a>.</Note>
);

type Linha = { v: Votacao; d: DetalheVotacao };

/* ---------- por deputado: como votou, quando faltou e o que propôs ---------- */
function PorDeputado({ linhas }: { linhas: Linha[] }){
  const { uf } = useUf();
  const dep = useAsync(() => bancada(uf.sigla), [uf.sigla]);
  const [id, setId] = useState<number | null>(null);
  useEffect(() => setId(null), [uf.sigla]);
  const escolhido = dep.dados?.find(d => d.id === id) || null;

  if (dep.erro) return <Erro msg={dep.erro} />;
  if (!dep.dados) return <Carregando>Consultando a bancada de {uf.nome}…</Carregando>;

  return (
    <>
      <Card title={`Deputados federais de ${uf.nome} em exercício`}
        subtitle="Escolha um nome para ver como votou e o que propôs. Para outro estado, troque no topo da página.">
        <div className="flex flex-wrap gap-2">
          {dep.dados.map(d => (
            <button key={d.id} type="button" aria-pressed={d.id === id} onClick={() => setId(d.id)}
              className={'flex items-center gap-2 rounded-lg border-[1.5px] py-1 pr-3 pl-1 text-left text-[.85rem] '
                + (d.id === id ? 'border-s1 bg-s1/10' : 'border-line bg-surface-2 hover:border-ink-3')}>
              <img src={d.urlFoto} alt="" loading="lazy" className="h-9 w-7 rounded object-cover object-top" />
              <span>{d.nome} <span className="text-ink-3">· {d.siglaPartido}</span></span>
            </button>
          ))}
        </div>
      </Card>
      {escolhido && <Deputado key={escolhido.id} d={escolhido} linhas={linhas} />}
    </>
  );
}

function Deputado({ d, linhas }: { d: DeputadoCamara; linhas: Linha[] }){
  const prop = useAsync(() => proposicoes(d.id), [d.id]);
  const votos = linhas.map(({ v, d: det }) => {
    const meu = det.votos.find(x => x.id === d.id);
    const partido = meu?.partido || d.siglaPartido;
    return { v, voto: meu?.voto ?? null, partido, orient: det.orientacoes.get(partido.toUpperCase()) || '' };
  });
  const n = (t: string | null) => votos.filter(x => x.voto === t).length;
  const outros = votos.filter(x => x.voto && x.voto !== 'Sim' && x.voto !== 'Não').length;

  return (
    <>
      <Card>
        <div className="mb-4 flex items-center gap-3.5">
          <img src={d.urlFoto} alt={'Foto de ' + d.nome} className="h-[84px] w-[64px] rounded-lg border border-line object-cover object-top" />
          <div>
            <h3 className="text-[1.2rem] font-semibold">{d.nome}</h3>
            <p className="text-[.9rem] text-ink-2">{d.siglaPartido} · {d.siglaUf} · deputado federal em exercício</p>
            <a className="text-[.85rem]" href={'https://www.camara.leg.br/deputados/' + d.id} target="_blank" rel="noopener">Página na Câmara ↗</a>
          </div>
        </div>
        <KpiRow>
          <Kpi k="Votou Sim" v={n('Sim')} d={'nas últimas ' + votos.length + ' votações nominais'} />
          <Kpi k="Votou Não" v={n('Não')} />
          <Kpi k="Abstenção, obstrução e outros" v={outros} />
          <Kpi k="Não votou" v={n(null)} d="sem voto registrado" />
        </KpiRow>

        <h4 className="mb-1 text-[.78rem] font-semibold uppercase tracking-wider text-ink-3">Como votou</h4>
        {votos.map(({ v, voto, orient, partido }) => (
          <div key={v.id} className="flex flex-wrap items-start gap-x-3 gap-y-1.5 border-b border-grid py-2.5 sm:flex-nowrap">
            <span className="w-[76px] flex-none text-[.8rem] tabular-nums text-ink-3">{dataBr(v.data)}</span>
            <span className="min-w-0 flex-1 basis-full text-[.86rem] sm:basis-0">{curta(v.descricao)}
              <span className="block text-[.76rem] text-ink-3">
                Placar: {v.sim} sim, {v.nao} não
                {orient ? ` · orientação do ${partido}: ${orient.toLowerCase()}` : ` · ${partido} sem orientação própria registrada`}
              </span>
            </span>
            <span className="flex-none"><VotoBadge v={voto} /></span>
          </div>
        ))}
        <p className="mt-2 text-[.76rem] text-ink-3">
          “Não votou” significa que não há voto registrado: pode ser ausência, licença, missão oficial
          ou o deputado ainda não estar no mandato naquela data.
        </p>
      </Card>

      <Card title="O que propôs" subtitle="Projetos de lei, projetos de lei complementar e PECs de autoria ou coautoria, dos mais recentes para os mais antigos.">
        {prop.erro ? <Erro msg={prop.erro} />
          : !prop.dados ? <Carregando>Consultando as proposições…</Carregando>
          : !prop.dados.dados.length ? <p className="text-[.88rem] italic text-ink-2">Nenhum projeto de lei ou PEC de autoria registrado na Câmara.</p>
          : <>
            {prop.dados.dados.map((p: Proposicao) => (
              <div key={p.id} className="border-b border-grid py-2.5 last:border-b-0">
                <a className="text-[.9rem] font-semibold" target="_blank" rel="noopener"
                  href={'https://www.camara.leg.br/propostas-legislativas/' + p.id}>{p.siglaTipo} {p.numero}/{p.ano} ↗</a>
                <span className="ml-2 text-[.78rem] text-ink-3">apresentado em {dataBr(p.dataApresentacao)}</span>
                <p className="text-[.86rem] text-ink-2">{p.ementa}</p>
              </div>
            ))}
            {prop.dados.total != null && prop.dados.total > prop.dados.dados.length && (
              <p className="mt-2 text-[.8rem] text-ink-2">Mostrando os {prop.dados.dados.length} mais recentes de {prop.dados.total}.{' '}
                <a href={'https://www.camara.leg.br/deputados/' + d.id} target="_blank" rel="noopener">Ver todos na Câmara ↗</a></p>
            )}
          </>}
      </Card>
    </>
  );
}

/* ---------- por partido: orientação e como a bancada votou ---------- */
function PorPartido({ linhas }: { linhas: Linha[] }){
  const partidos = useMemo(() => {
    const m = new Map<string, number>();
    linhas[0]?.d.votos.forEach(x => m.set(x.partido, (m.get(x.partido) || 0) + 1));
    linhas.forEach(l => l.d.votos.forEach(x => { if (!m.has(x.partido)) m.set(x.partido, 0); }));
    return [...m].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(x => x[0]);
  }, [linhas]);
  const [p, setP] = useState(partidos[0] || '');

  const rows = linhas.map(({ v, d }) => {
    const b = d.votos.filter(x => x.partido === p);
    const sim = b.filter(x => x.voto === 'Sim').length, nao = b.filter(x => x.voto === 'Não').length;
    return { v, sim, nao, outros: b.length - sim - nao, orient: d.orientacoes.get(p.toUpperCase()) || '' };
  });
  /* fidelidade: dos que votaram sim ou não, quantos seguiram a orientação do partido */
  const comOrient = rows.filter(r => r.orient === 'Sim' || r.orient === 'Não');
  const seguiram = comOrient.reduce((s, r) => s + (r.orient === 'Sim' ? r.sim : r.nao), 0);
  const votaram = comOrient.reduce((s, r) => s + r.sim + r.nao, 0);

  return (
    <>
      <Seg label="Partido" value={p} onChange={setP} options={partidos.map(x => ({ id: x, label: x }))} />
      <KpiRow>
        <Kpi k="Votações com orientação do partido" v={comOrient.length} d={'de ' + rows.length + ' votações nominais'} />
        <Kpi k="Votos que seguiram a orientação" v={votaram ? Math.round((seguiram / votaram) * 100) + '%' : '—'}
          d={votaram ? seguiram + ' de ' + votaram + ' votos sim ou não' : 'sem orientação sim ou não no período'} />
      </KpiRow>
      <Card title={'Como a bancada do ' + p + ' votou'} subtitle="Em cada votação: a orientação dada pelo partido e a divisão dos votos dos seus deputados.">
        {rows.map(({ v, sim, nao, outros, orient }) => {
          const tot = sim + nao + outros || 1;
          return (
            <div key={v.id} className="border-b border-grid py-2.5 last:border-b-0">
              <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
                <span className="w-[76px] flex-none text-[.8rem] tabular-nums text-ink-3">{dataBr(v.data)}</span>
                <span className="min-w-0 flex-1 basis-[240px] text-[.86rem]">{curta(v.descricao)}</span>
                <span className="flex-none text-[.8rem] text-ink-2">Orientação: <b className="text-ink-1">{orient || 'não registrada'}</b></span>
              </div>
              <div className="mt-1.5 flex h-2 gap-0.5 overflow-hidden rounded sm:ml-[88px]" role="img"
                aria-label={`${sim} sim, ${nao} não, ${outros} outros`}>
                {sim > 0 && <div style={{ width: (sim / tot) * 100 + '%', background: col(1) }} />}
                {nao > 0 && <div style={{ width: (nao / tot) * 100 + '%', background: col(2) }} />}
                {outros > 0 && <div style={{ width: (outros / tot) * 100 + '%' }} className="bg-axis" />}
              </div>
              <div className="mt-1 text-[.78rem] tabular-nums text-ink-2 sm:ml-[88px]">
                {sim} sim · {nao} não{outros ? ` · ${outros} abstenção, obstrução ou outro` : ''}
                {!sim && !nao && !outros ? ' · nenhum deputado do partido registrou voto' : ''}
              </div>
            </div>
          );
        })}
      </Card>
    </>
  );
}

/* ---------- por votação: placar e voto de cada deputado do estado ---------- */
function PorVotacao({ linhas }: { linhas: Linha[] }){
  const { uf } = useUf();
  const [id, setId] = useState(linhas[0]?.v.id);
  const [q, setQ] = useState('');
  const l = linhas.find(x => x.v.id === id) || linhas[0];
  const doEstado = l.d.votos.filter(x => x.uf.toLowerCase() === uf.sigla)
    .filter(x => !q || norm(x.nome + ' ' + x.partido).includes(norm(q)))
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  return (
    <>
      <label className="mb-4 block text-[.85rem] text-ink-2">Votação
        <select value={id} onChange={e => setId(e.target.value)}
          className="mt-1 block w-full rounded-lg border-[1.5px] border-line bg-surface-2 px-3 py-2 text-[.88rem] text-ink-1">
          {linhas.map(x => <option key={x.v.id} value={x.v.id}>{dataBr(x.v.data)} — {curta(x.v.descricao).slice(0, 120)}</option>)}
        </select>
      </label>
      <Card title={dataBr(l.v.data)} subtitle={l.v.descricao}>
        <KpiRow>
          <Kpi k="Sim" v={l.v.sim} /><Kpi k="Não" v={l.v.nao} />
          <Kpi k="Resultado" v={l.v.aprovacao === 1 ? 'Aprovado' : l.v.aprovacao === 0 ? 'Rejeitado' : '—'} />
        </KpiRow>
        <h4 className="mb-2 text-[.78rem] font-semibold uppercase tracking-wider text-ink-3">Orientação dos partidos</h4>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {[...l.d.orientacoes].sort().map(([p, o]) => (
            <span key={p} className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-[.8rem]">
              {p}: <b>{o || 'sem orientação'}</b></span>
          ))}
        </div>
        <h4 className="mb-2 text-[.78rem] font-semibold uppercase tracking-wider text-ink-3">Deputados de {uf.nome} que registraram voto</h4>
        <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por nome ou partido"
          aria-label="Buscar deputado" className="mb-2 w-full rounded-lg border-[1.5px] border-line bg-surface-2 px-3 py-1.5 text-[.88rem] outline-none focus:border-s1 sm:w-72" />
        <div className="grid gap-x-6 sm:grid-cols-2">
          {doEstado.map(x => (
            <div key={x.id} className="flex items-center justify-between gap-3 border-b border-grid py-1.5 text-[.88rem]">
              <span>{x.nome} <span className="text-ink-3">· {x.partido}</span></span><VotoBadge v={x.voto} />
            </div>
          ))}
        </div>
        {!doEstado.length && <p className="text-[.88rem] italic text-ink-2">Nenhum deputado encontrado.</p>}
      </Card>
    </>
  );
}

export default function Votacoes(){
  const [sub, setSub] = useState<'dep' | 'partido' | 'votacao'>('dep');
  const [feitas, setFeitas] = useState(0);
  const dados = useAsync(async () => {
    const vs = await votacoesNominais(QUANTAS);
    return Promise.all(vs.map(v => detalheVotacao(v.id).then(d => { setFeitas(n => n + 1); return { v, d }; })));
  }, []);

  return (
    <>
      <PageHead title="Como votaram">
        O voto de cada deputado federal nas últimas {QUANTAS} votações nominais do Plenário da Câmara,
        a orientação dos partidos e os projetos que cada deputado apresentou. Os dados são buscados
        na Câmara dos Deputados na hora em que você abre esta aba.
      </PageHead>
      <Seg label="Ver por" value={sub} onChange={setSub} options={[
        { id: 'dep', label: 'Por deputado' }, { id: 'partido', label: 'Por partido' }, { id: 'votacao', label: 'Por votação' }]} />

      {dados.erro ? <Erro msg={dados.erro} />
        : !dados.dados ? <Carregando>Consultando a Câmara dos Deputados… {feitas ? `${feitas} de ${QUANTAS} votações carregadas` : ''}</Carregando>
        : !dados.dados.length ? <Note>Nenhuma votação nominal encontrada no período consultado.</Note>
        : sub === 'dep' ? <PorDeputado linhas={dados.dados} />
        : sub === 'partido' ? <PorPartido linhas={dados.dados} />
        : <PorVotacao linhas={dados.dados} />}

      <Note label="O que esta aba cobre.">
        Só deputados federais em exercício, e só votações nominais do Plenário (aquelas em que o voto
        de cada um fica registrado). Candidatos que não são deputados federais hoje não têm histórico
        aqui, e senadores e deputados estaduais não estão incluídos. Votar contra ou a favor de um
        texto não diz, sozinho, o que o deputado pensa do tema: muitas votações são sobre emendas,
        destaques ou requerimentos.
      </Note>
      <Sources fontes={[{ t: 'Câmara dos Deputados · Dados Abertos', u: 'https://dadosabertos.camara.leg.br' },
        { t: 'Câmara dos Deputados · votações do Plenário', u: 'https://www.camara.leg.br/votacoes-plenario' }]} />
    </>
  );
}
