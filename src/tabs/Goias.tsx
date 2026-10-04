/* Aba do estado escolhido. Goiás tem conteúdo pesquisado à mão (pesquisas e fichas de
   governador e senador); os demais estados mostram só dados oficiais do TSE. */
import { useMemo, useState } from 'react';
import { GOV_GOIAS, SENADO_GOIAS } from '../data/candidatos';
import { PESQ_GOV_GOIAS, PESQ_SEN_GOIAS, TOP_PESQUISAS } from '../data/pesquisas';
import { useTse, type CargoTse } from '../lib/tse';
import { rotuloCargo, useUf, type Uf } from '../lib/uf';
import { norm, titulo } from '../lib/format';
import { ListaCandidatos } from '../components/Candidatos';
import { FichaDeputado, useDeputados, type Deputado } from '../components/FichaDeputado';
import { PesquisasEstado } from '../components/PesquisasEstado';
import { Card, Kpi, KpiRow, Note, PageHead, Seg, Sources } from '../components/ui';
import { Ranking, SerieCard } from './Pesquisas';

type Cargo = Exclude<CargoTse, 'presidente'>;
const CARGOS: Cargo[] = ['governador', 'senador', 'depfed', 'depest'];

const CURADO = {
  governador: { P: PESQ_GOV_GOIAS, dados: GOV_GOIAS, cargoId: 'governador',
    grafico: 'Governo de Goiás · intenção de voto',
    lista: `Governo de Goiás · ${GOV_GOIAS.length} candidatos` },
  senador: { P: PESQ_SEN_GOIAS, dados: SENADO_GOIAS, cargoId: 'senador',
    grafico: 'Senado por Goiás · intenção de voto',
    lista: `Senado por Goiás · ${SENADO_GOIAS.length} candidatos para 2 vagas` },
};
const LIMITE = 60;

/* Lista oficial de candidaturas de um cargo, com busca, filtro por partido e ficha
   (perfil, trajetória eleitoral, financiamento, bens) ao clicar. */
function ListaOficial({ cargo, uf }: { cargo: Cargo; uf: Uf }){
  const { dados: tse } = useTse(cargo, uf.sigla);
  const { arquivo, erro: semFichas } = useDeputados(cargo, uf.sigla);
  const [q, setQ] = useState('');
  const [partido, setPartido] = useState('');
  const [todos, setTodos] = useState(false);
  const [aberta, setAberta] = useState<Deputado | null>(null);
  const rotulo = rotuloCargo(cargo, uf);

  /* com a totalização do TSE em mãos, vale a lista dela: sem números repetidos nem
     candidaturas que saíram da disputa. Sem rede, cai no arquivo de fichas. */
  const lista = useMemo(() => (tse
    ? tse.cands.map(x => ({ nr: x.n, sq: x.sq as string | null, urna: titulo(x.urna), partido: x.partido }))
    : (arquivo?.lista || []).filter(x => x.naUrna).map(x => ({ nr: x.nr, sq: x.sq as string | null, urna: x.urna, partido: x.partido }))
  ).sort((a, b) => a.urna.localeCompare(b.urna, 'pt-BR')), [tse, arquivo]);

  const partidos = useMemo(() => {
    const m = new Map<string, number>();
    lista.forEach(x => m.set(x.partido, (m.get(x.partido) || 0) + 1));
    return [...m].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [lista]);

  const filtrados = useMemo(() => {
    const nq = norm(q.trim());
    return lista.filter(x => (!partido || x.partido === partido)
      && (!nq || norm(x.urna + ' ' + x.partido + ' ' + x.nr).includes(nq)));
  }, [lista, q, partido]);
  const vis = todos || q || partido ? filtrados : filtrados.slice(0, LIMITE);

  /* ficha pelo sequencial do TSE; sem ele, pelo número, preferindo quem está na urna */
  const abre = (x: { nr: string; sq: string | null }) => {
    const l = arquivo?.lista || [];
    const d = (x.sq && l.find(y => y.sq === x.sq))
      || l.find(y => y.nr === x.nr && y.naUrna) || l.find(y => y.nr === x.nr);
    if (d) setAberta(d);
  };
  const pesquisa = uf.sigla === 'go' ? TOP_PESQUISAS.cargos.find(x => x.id === cargo) : undefined;
  const campo = 'rounded-lg border-[1.5px] border-line bg-surface-2 px-3 py-1.5 text-[.88rem] outline-none focus:border-s1';
  const vagas = tse?.vagas;

  if (!lista.length) return <p className="py-10 text-center text-ink-2">
    {semFichas ? 'Não foi possível carregar as candidaturas deste cargo.' : 'Carregando candidaturas…'}</p>;

  return (
    <>
      <KpiRow>
        <Kpi k="Candidaturas" v={lista.length} d={tse ? 'na totalização do TSE' : 'no registro de candidaturas'} />
        {vagas != null && <Kpi k="Vagas" v={vagas} d={uf.nome + ' elege ' + vagas} />}
        <Kpi k="Partidos e federações" v={partidos.length} d={'maior lista: ' + partidos[0][0] + ' (' + partidos[0][1] + ')'} />
        {vagas != null && vagas > 0 && <Kpi k="Candidatos por vaga" v={(lista.length / vagas).toFixed(1).replace('.', ',')} />}
      </KpiRow>

      {pesquisa && cargo.startsWith('dep') && <>
        <h3 className="mb-1 text-[1.05rem] font-semibold">Os mais bem colocados na pesquisa</h3>
        <p className="mb-3.5 max-w-[70ch] text-[.88rem] text-ink-2">Começa pelos 10 primeiros; use o botão abaixo da lista para ver os 10 seguintes, até o fim. Pesquisa não prevê resultado. Clique em um nome para abrir a ficha.</p>
        <Ranking c={pesquisa} onPick={arquivo ? nr => abre({ nr, sq: null }) : undefined} />
      </>}

      <Card title={`${rotulo} · ${uf.nome} · ${lista.length} candidaturas`}
        subtitle={semFichas ? 'Nome e número de urna de cada candidatura, em ordem alfabética. Não foi possível carregar as fichas.'
          : 'Em ordem alfabética. Clique em um nome para ver perfil, trajetória eleitoral, financiamento, bens e links para pesquisar processos.'}>
        {lista.length > 12 && (
          <div className="mb-3 flex flex-wrap gap-2">
            <input type="search" value={q} onChange={e => setQ(e.target.value)}
              placeholder="Buscar por nome ou número" aria-label={'Buscar candidato a ' + rotulo}
              className={campo + ' w-full sm:w-72'} />
            <select value={partido} onChange={e => setPartido(e.target.value)}
              aria-label="Filtrar por partido" className={campo}>
              <option value="">Todos os partidos</option>
              {partidos.map(([p, n]) => <option key={p} value={p}>{p} ({n})</option>)}
            </select>
            <span className="self-center text-[.8rem] text-ink-3">
              {filtrados.length === lista.length ? '' : filtrados.length + ' de ' + lista.length}
            </span>
          </div>
        )}
        <div className="grid gap-x-6 sm:grid-cols-2 xl:grid-cols-3">
          {vis.map(x => (
            <button key={x.nr + x.urna} type="button" onClick={() => abre(x)} disabled={!arquivo}
              aria-haspopup="dialog"
              className="flex items-baseline gap-3 border-b border-grid px-1 py-2 text-left hover:bg-surface-2 disabled:cursor-default">
              <b className="w-[52px] flex-none text-[.92rem] tabular-nums">{x.nr}</b>
              <span className="min-w-0 flex-1 text-[.9rem] text-s1 underline-offset-2 hover:underline">{x.urna}</span>
              <span className="flex-none text-[.78rem] text-ink-3">{x.partido}</span>
            </button>
          ))}
        </div>
        {!vis.length && <p className="py-6 text-center text-[.9rem] text-ink-2">Nenhuma candidatura encontrada.</p>}
        {!q && !partido && filtrados.length > LIMITE && (
          <button type="button" onClick={() => setTodos(t => !t)}
            className="mt-3 rounded-lg border border-line bg-surface-2 px-3.5 py-1.5 text-[.85rem]">
            {todos ? 'Mostrar só os ' + LIMITE + ' primeiros' : 'Mostrar todas as ' + filtrados.length + ' candidaturas'}
          </button>
        )}
        <Sources fontes={[tse
          ? { t: 'TSE · totalização das Eleições 2026 (arquivo de ' + tse.geradoEm + ')', u: 'https://resultados.tse.jus.br' }
          : { t: 'TSE · consulta de candidatos 2026', u: 'https://dadosabertos.tse.jus.br/dataset/candidatos-2026' }]} />
      </Card>

      {aberta && arquivo && <FichaDeputado d={aberta} cargo={cargo} uf={uf} arquivo={arquivo} onClose={() => setAberta(null)} />}

      <Note>
        Estas fichas trazem só dados oficiais do TSE; propostas e processos judiciais não foram
        levantados.{cargo.startsWith('dep') && ' No voto proporcional, as vagas são distribuídas pelo total de votos de cada partido ou federação, então o voto em um candidato também ajuda a eleger outros nomes da mesma lista.'}{' '}
        Para montar seu voto, use <a href="#/colinha">Minha colinha</a>; os votos apurados aparecem
        em <a href="#/apuracao">Apuração</a>.
      </Note>
    </>
  );
}

export default function Estado(){
  const { uf } = useUf();
  const [sub, setSub] = useState<Cargo>('governador');
  const go = uf.sigla === 'go';
  const m = go && (sub === 'governador' || sub === 'senador') ? CURADO[sub] : null;
  return (
    <>
      <PageHead title={uf.nome}>
        {go ? <>Goiás tem uma particularidade em 2026: Ronaldo Caiado renunciou ao governo em 31 de
          março para disputar a Presidência, e seu vice, Daniel Vilela, assumiu e concorre à reeleição.
          O estado elege <b className="text-ink-1">dois senadores</b>, 17 deputados federais e 41
          deputados estaduais.</>
          : <>Candidaturas a governador, senador e deputado em {uf.nome}, com os dados oficiais do
            TSE: perfil, candidaturas anteriores, financiamento e bens. Cada estado elege{' '}
            <b className="text-ink-1">dois senadores</b> em 2026. As pesquisas de governador e
            Senado vêm do compilado da Wikipédia. Propostas e histórico judicial só foram levantados
            para Goiás e para a Presidência.</>}
      </PageHead>
      <Seg label="Cargo" value={sub} onChange={setSub}
        options={CARGOS.map(c => ({ id: c, label: c === 'senador' ? 'Senado' : rotuloCargo(c, uf) }))} />

      {m ? <>
        <SerieCard key={sub} P={m.P} yMax={50} titulo={m.grafico}
          subtitulo={m.P.unidade + (m.P.nota ? ' ' + m.P.nota : '')}
          fontes={[{ t: 'Compilado de pesquisas de Goiás', u: m.P.fonte! }]} />
        <h3 className="mt-8 mb-3.5 text-[1.05rem] font-semibold">{m.lista}</h3>
        <ListaCandidatos key={sub + 'l'} dados={m.dados} cargoId={m.cargoId} />
      </> : <>
        {(sub === 'governador' || sub === 'senador') && <PesquisasEstado key={uf.sigla + sub + 'p'} uf={uf} so={sub} />}
        <ListaOficial key={uf.sigla + sub} cargo={sub} uf={uf} />
      </>}
    </>
  );
}
