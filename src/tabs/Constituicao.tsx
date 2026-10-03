import { Fragment, useRef, useState, type ReactNode } from 'react';
import { CAMINHO_LEI, CAMINHO_VOTO, CARGOS, CARGOS_2026, CENARIOS, COBRAR, DEPUTADOS, DOIS_JEITOS,
  FONTES, FONTES_HISTORIA, IDEIAS, MARCAS, NIVEIS, PARTIDO_FATOS, PERGUNTAS, PODERES, QUIZ, QUORUNS, SITUACOES,
  type Cargo, type Passo } from '../data/constituicao';
import { Badge, Card, DataTable, Note, PageHead, Seg, Sources } from '../components/ui';
import { Desenho } from '../components/Desenho';
import { HistoriaLei } from '../components/HistoriaLei';

/* a referência ao artigo fica no texto, mas em letra menor, para não pesar na leitura */
const Txt = ({ children }: { children: string }) => (
  <>{children.split(/(\((?:arts?\.|Lei|Emenda)[^)]*\))/).map((p, i) =>
    i % 2 ? <span key={i} className="whitespace-nowrap text-[.85em] text-ink-3">{p}</span> : p)}</>
);

const H4 = ({ children }: { children: ReactNode }) =>
  <h4 className="mt-6 mb-1 text-[1rem] font-semibold">{children}</h4>;

/* cargo com a marca de "está na urna agora" ou "só em 2028": ícone + rótulo, nunca só cor */
const SeloCargo = ({ cargo }: { cargo: Cargo }) => {
  const c = CARGOS[cargo];
  return c.naUrna ? <Badge tom="ok" icon="ok">{c.rotulo}</Badge>
    : <Badge tom="neutral" icon="info">{c.rotulo} · 2028</Badge>;
};

const Seta = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.2}
    strokeLinecap="round" strokeLinejoin="round"
    className="size-6 flex-none rotate-90 self-center text-ink-3 md:rotate-0"><path d="M4 12h16M14 6l6 6-6 6" /></svg>
);

/* passos ligados por setas: lado a lado em tela larga, empilhados no celular */
function Fluxo({ passos }: { passos: Passo[] }){
  return (
    <ol className="flex flex-col gap-2 md:flex-row md:items-stretch">
      {passos.map((p, i) => (
        <Fragment key={p.titulo}>
          {i > 0 && <Seta />}
          <li className="flex flex-1 items-center gap-3 rounded-lg border border-line bg-surface-2 p-3.5 md:flex-col md:text-center">
            <Desenho nome={p.desenho} grande />
            <div>
              <b className="block text-[.95rem]">{i + 1}. {p.titulo}</b>
              <span className="text-[.86rem] text-ink-2"><Txt>{p.texto}</Txt></span>
            </div>
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

/* três blocos lado a lado com desenho: os Poderes e os níveis de governo */
function Trio({ itens }: { itens: (Passo & { quem: string; eleito?: boolean })[] }){
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-3">
      {itens.map(p => (
        <div key={p.titulo} className="flex flex-col items-center rounded-lg border border-line bg-surface-2 p-3.5 text-center">
          <Desenho nome={p.desenho} grande />
          <b className="mt-2 text-[.98rem]">{p.titulo}</b>
          <p className="text-[.88rem] text-ink-2">{p.texto}</p>
          <p className="mt-2 text-[.82rem]"><span className="text-ink-3">Quem é: </span>{p.quem}</p>
          {p.eleito !== undefined && (
            <div className="mt-2">{p.eleito ? <Badge tom="ok" icon="ok">Você elege</Badge>
              : <Badge tom="neutral" icon="info">Não são eleitos</Badge>}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* O eleitor escolhe um assunto do cotidiano e vê quem decide sobre ele em cada
   nível de governo, e quais desses cargos estão em disputa agora. */
function DiaADia(){
  const [id, setId] = useState(SITUACOES[0].id);
  const s = SITUACOES.find(x => x.id === id)!;
  return (
    <Card title="Quem cuida do quê na sua vida"
      subtitle="Toque em um assunto. Em verde aparecem os cargos em que você vota neste domingo.">
      <Seg label="Assunto" value={id} onChange={setId}
        options={SITUACOES.map(x => ({ id: x.id, label: x.label }))} />
      <div className="mb-3.5 flex items-center gap-3">
        <Desenho nome={s.desenho} grande />
        <p className="max-w-[65ch] text-[.92rem]"><Txt>{s.direito}</Txt></p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {s.niveis.map(n => (
          <div key={n.nivel} className="rounded-lg border border-line bg-surface-2 p-3.5">
            <div className="flex items-center gap-2.5">
              <Desenho nome={n.desenho} />
              <b className="text-[.98rem]">{n.nivel}</b>
            </div>
            <p className="mt-2.5 text-[.88rem] text-ink-2"><Txt>{n.texto}</Txt></p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {n.cargos.map(c => <SeloCargo key={c} cargo={c} />)}
            </div>
          </div>
        ))}
      </div>
      <Note className="mb-0" label="Na hora de escolher:"><Txt>{s.dica}</Txt></Note>
    </Card>
  );
}

/* Por que o partido do deputado e do senador importa. Não cita partido nem
   candidato: mostra a conta dos votos e os dois raciocínios possíveis. */
function Partido(){
  const [id, setId] = useState(CENARIOS[1].id);
  const c = CENARIOS.find(x => x.id === id)!;
  const pct = (n: number) => (n / DEPUTADOS) * 100 + '%';
  return (
    <Card title="Por que o partido do seu deputado e do seu senador importa"
      subtitle="Você não elege só uma pessoa: ajuda a montar um time dentro do Congresso. Esse time pode jogar a favor ou contra o presidente.">
      <div className="grid gap-3 lg:grid-cols-3">
        {PARTIDO_FATOS.map(f => (
          <div key={f.titulo} className="rounded-lg border border-line bg-surface-2 p-3.5">
            <Desenho nome={f.desenho} />
            <b className="mt-2 block text-[.95rem]">{f.titulo}</b>
            <p className="mt-1 text-[.88rem] text-ink-2"><Txt>{f.texto}</Txt></p>
          </div>
        ))}
      </div>

      <H4>Faça a conta: o presidente e os {DEPUTADOS} deputados</H4>
      <p className="mb-3 max-w-[70ch] text-[.9rem] text-ink-2">
        Veja o que muda conforme o número de deputados que apoiam o presidente. São números de
        exemplo, não uma previsão.
      </p>
      <Seg label="Tamanho do apoio" value={id} onChange={setId}
        options={CENARIOS.map(x => ({ id: x.id, label: x.label }))} />
      <div className="relative mt-9 mb-9 h-9 rounded-lg border border-line bg-surface-2" role="img"
        aria-label={`${c.apoiam} de ${DEPUTADOS} deputados apoiam o presidente`}>
        <i className="block h-full rounded-l-[7px] bg-s1 transition-[width] duration-300" style={{ width: pct(c.apoiam) }} />
        {MARCAS.map((m, i) => (
          <span key={m.n} className="absolute -top-2 -bottom-2 border-l-2 border-dashed border-ink-1" style={{ left: pct(m.n) }}>
            <span className={'absolute whitespace-nowrap text-[.74rem] font-semibold '
              + (i ? 'top-full right-1' : 'bottom-full left-1')}>{m.rotulo}</span>
          </span>
        ))}
      </div>
      <p className="text-[.92rem]">
        <b className="text-s1">{c.apoiam}</b> apoiam o presidente ·{' '}
        <b>{DEPUTADOS - c.apoiam}</b> não apoiam
      </p>
      <ul className="mt-2 grid max-w-[72ch] list-disc gap-1.5 pl-5 text-[.9rem] text-ink-2">
        {c.efeitos.map(e => <li key={e}>{e}</li>)}
      </ul>
      <p className="mt-2.5 text-[.82rem] text-ink-3">
        No Senado a conta é parecida, com 81 senadores. E vale igual para o governador e os
        deputados estaduais.
      </p>

      <H4>Dois jeitos de pensar, e os dois são válidos</H4>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {DOIS_JEITOS.map(j => (
          <div key={j.titulo} className="flex gap-3 rounded-lg border border-line bg-surface-2 p-3.5">
            <Desenho nome={j.desenho} />
            <div>
              <b className="text-[.98rem]">{j.titulo}</b>
              <p className="mt-1 text-[.88rem] text-ink-2">{j.texto}</p>
              <p className="mt-1.5 text-[.86rem]"><b>Cuidado: </b><span className="text-ink-2">{j.cuidado}</span></p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 max-w-[72ch] text-[.9rem] text-ink-2">
        Não existe resposta certa, e este site não indica nenhuma. O que não faz sentido é votar
        para deputado e senador sem saber de que lado eles vão ficar.
      </p>

      <H4>Perguntas para se fazer antes de votar</H4>
      <ol className="mt-2 grid max-w-[72ch] list-decimal gap-1.5 pl-5 text-[.9rem]">
        {PERGUNTAS.map(q => <li key={q}><Txt>{q}</Txt></li>)}
      </ol>
      <Note label="O nome do partido não diz tudo." className="mb-0">
        Há partidos que mudam de lado no meio do mandato e deputados que votam diferente do
        próprio partido. Olhe o que cada um já fez, não só o que promete. Para senador o voto vai
        direto para a pessoa, mas o partido conta do mesmo jeito, porque lá também se vota em
        grupo. A aba <a href="#/partidos">Partidos</a> mostra as federações e o tamanho de cada
        bancada, e o site da <a href="https://www.camara.leg.br/busca-portal/proposicoes/pesquisa-simplificada"
        target="_blank" rel="noopener">Câmara</a> mostra como cada um votou.
      </Note>
    </Card>
  );
}

function Quiz(){
  const [resp, setResp] = useState<Record<number, number>>({});
  const feitas = Object.keys(resp).length;
  const acertos = QUIZ.filter((q, i) => resp[i] === q.certa).length;
  return (
    <Card title="Teste rápido" subtitle="Cinco perguntas para ver o que ficou.">
      <ol className="grid gap-5">
        {QUIZ.map((q, i) => {
          const r = resp[i];
          return (
            <li key={q.p}>
              <p className="mb-2 text-[.95rem] font-medium">{i + 1}. {q.p}</p>
              <div className="flex flex-wrap gap-2">
                {q.ops.map((o, j) => (
                  <button key={o} type="button" aria-pressed={r === j} disabled={r !== undefined}
                    onClick={() => setResp(x => ({ ...x, [i]: j }))}
                    className={'rounded-lg border-[1.5px] px-3.5 py-2 text-left text-[.9rem] disabled:cursor-default '
                      + (r === undefined ? 'border-line bg-surface-2 hover:border-ink-3'
                        : j === q.certa ? 'border-good bg-good/10 font-semibold'
                        : r === j ? 'border-crit bg-crit/10' : 'border-line bg-surface-2 text-ink-3')}>
                    {o}
                  </button>
                ))}
              </div>
              {r !== undefined && (
                <p className="mt-2 text-[.88rem] text-ink-2" role="status">
                  <b className={r === q.certa ? 'text-good' : 'text-crit'}>
                    {r === q.certa ? '✓ Certo. ' : '✗ Não é isso. '}</b>
                  <Txt>{q.porque}</Txt>
                </p>
              )}
            </li>
          );
        })}
      </ol>
      {feitas === QUIZ.length && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <b>Você acertou {acertos} de {QUIZ.length}.</b>
          <button type="button" onClick={() => setResp({})}
            className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[.85rem]">Refazer</button>
        </div>
      )}
    </Card>
  );
}

/* a página é dividida em partes curtas, uma por vez, para não virar uma rolagem só */
const PARTES = [
  { id: 'basico', label: 'O básico' },
  { id: 'poderes', label: 'Quem manda' },
  { id: 'vida', label: 'Na sua vida' },
  { id: 'cargos', label: 'Os cargos' },
  { id: 'lei', label: 'Como nasce uma lei' },
  { id: 'partido', label: 'Partidos' },
  { id: 'depois', label: 'Depois do voto' },
  { id: 'teste', label: 'Teste rápido' },
] as const;
type Parte = typeof PARTES[number]['id'];

export default function Constituicao(){
  const [parte, setParte] = useState<Parte>('basico');
  const topo = useRef<HTMLDivElement>(null);
  const ir = (p: Parte) => { setParte(p); topo.current?.scrollIntoView({ block: 'start' }); };
  const i = PARTES.findIndex(p => p.id === parte);
  const proxima = PARTES[i + 1];
  return (
    <>
      <PageHead title="A Constituição e o seu voto">
        Entenda em poucos minutos o que é a Constituição, o que faz cada pessoa em quem você vota
        e como essa escolha mexe com a sua vida. Sem palavras difíceis.
      </PageHead>

      <div ref={topo} className="scroll-mt-16 lg:scroll-mt-4">
        <Seg label="Partes desta página" value={parte} onChange={ir}
          options={PARTES.map(p => ({ id: p.id, label: p.label }))} />
      </div>

      {parte === 'basico' && <>
      <Card title="O caminho do seu voto"
        subtitle="Votar não acaba na urna. É assim que a sua escolha volta para você:">
        <Fluxo passos={CAMINHO_VOTO} />
      </Card>

      <Card title="O que é a Constituição">
        <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
          {IDEIAS.map(d => (
            <div key={d.titulo} className="flex gap-3 rounded-lg border border-line bg-surface-2 p-3.5">
              <Desenho nome={d.desenho} />
              <div>
                <b className="text-[.98rem]">{d.titulo}</b>
                <p className="mt-1 text-[.88rem] text-ink-2">{d.texto}</p>
                <p className="mt-1.5 text-[.76rem] text-ink-3">{d.art}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      </>}

      {parte === 'poderes' && <>
      <Card title="O poder é dividido em três">
        <p className="max-w-[70ch] text-[.9rem] text-ink-2">
          Para ninguém mandar sozinho, a Constituição separa o poder em três partes. Uma vigia a
          outra. <Txt>(art. 2º)</Txt>
        </p>
        <Trio itens={PODERES} />
      </Card>
      <Card title="E o governo tem três tamanhos">
        <p className="max-w-[70ch] text-[.9rem] text-ink-2">
          Cada um tem suas tarefas e cobra seus próprios impostos. Saber quem cuida do quê ajuda a
          cobrar a pessoa certa. <Txt>(arts. 1º e 18)</Txt>
        </p>
        <Trio itens={NIVEIS} />
      </Card>
      </>}

      {parte === 'vida' && <DiaADia />}

      {parte === 'cargos' && (
      <Card title="O que faz cada pessoa em quem você vota"
        subtitle="Na mesma ordem da urna. São cinco cargos e seis votos, porque Goiás elege dois senadores.">
        <div className="grid gap-3 lg:grid-cols-2">
          {CARGOS_2026.map(k => {
            const c = CARGOS[k];
            return (
              <div key={k} className="rounded-lg border border-line bg-surface-2 p-3.5">
                <div className="flex items-center gap-3">
                  <Desenho nome={c.desenho} grande />
                  <div>
                    <b className="block text-[1.02rem]">{c.rotulo}</b>
                    <span className="block text-[.9rem]">{c.resumo}</span>
                    <span className="block text-[.8rem] text-ink-2"><Txt>{c.mandato}</Txt></span>
                  </div>
                </div>
                <ul className="mt-3 grid list-disc gap-1.5 pl-5 text-[.88rem] text-ink-2">
                  {c.faz.map(f => <li key={f}><Txt>{f}</Txt></li>)}
                </ul>
                <p className="mt-3 rounded-lg bg-surface-1 px-3 py-2 text-[.88rem]"><b>Na sua vida: </b>
                  <span className="text-ink-2">{c.noDia}</span></p>
              </div>
            );
          })}
        </div>
        <Note label="Quem não está na urna agora.">
          Prefeito e vereador: a próxima eleição é em 2028. <Txt>{CARGOS.prefeito.faz[0]}</Txt>{' '}
          <Txt>{CARGOS.vereador.faz[0]}</Txt> Juízes não são eleitos: os ministros do STF são
          escolhidos pelo presidente e aprovados pelo Senado <Txt>(art. 101)</Txt>.
        </Note>
      </Card>
      )}

      {parte === 'lei' && <>
      <Card title="Como uma ideia vira lei"
        subtitle="Ninguém decide sozinho. Por isso o voto para deputado e senador pesa tanto quanto o voto para presidente e governador.">
        <Fluxo passos={CAMINHO_LEI} />
        <DataTable label="Quantos votos cada decisão exige" headers={['Para', 'É preciso', 'Onde está']} rows={QUORUNS} />
      </Card>
      <Card title="Um exemplo de verdade: a Lei da Ficha Limpa"
        subtitle="Uma lei que nasceu das assinaturas de eleitores, contada em seis quadrinhos.">
        <HistoriaLei />
        <p className="mt-3.5 max-w-[72ch] text-[.9rem] text-ink-2">
          Esse caso andou depressa porque houve muita pressão popular. A maioria dos projetos leva
          anos, e muitos nunca chegam a ser votados.
        </p>
        <Sources fontes={FONTES_HISTORIA} />
      </Card>
      </>}

      {parte === 'partido' && <Partido />}

      {parte === 'depois' && (
      <Card title="Depois de votar: acompanhe e cobre"
        subtitle="O governo é obrigado a mostrar o que faz. Tudo isto é gratuito e aberto a qualquer pessoa.">
        <div className="grid gap-3 sm:grid-cols-2">
          {COBRAR.map(c => (
            <div key={c.titulo} className="flex gap-3 rounded-lg border border-line bg-surface-2 p-3.5">
              <Desenho nome="lupa" />
              <div>
                <b className="text-[.95rem]">{c.titulo}</b>
                <p className="mt-0.5 text-[.88rem] text-ink-2"><Txt>{c.texto}</Txt></p>
                <a href={c.link.u} target="_blank" rel="noopener" className="mt-1 inline-block text-[.86rem]">{c.link.t}</a>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3.5 max-w-[72ch] text-[.9rem] text-ink-2">
          Guarde o nome de quem você escolheu para deputado e senador. A <a href="#/colinha">colinha</a>{' '}
          serve para isso também: sem lembrar o nome, não dá para cobrar.
        </p>
      </Card>
      )}

      {parte === 'teste' && <Quiz />}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <span className="text-[.85rem] text-ink-3">Parte {i + 1} de {PARTES.length}</span>
        {proxima ? (
          <button type="button" onClick={() => ir(proxima.id)}
            className="rounded-lg bg-s1 px-4 py-2.5 text-[.9rem] font-semibold text-white hover:brightness-110">
            Próxima: {proxima.label} →</button>
        ) : (
          <button type="button" onClick={() => ir('basico')}
            className="rounded-lg border border-line bg-surface-2 px-4 py-2.5 text-[.9rem] font-semibold">
            Voltar ao começo</button>
        )}
      </div>

      <details className="mb-4 rounded-xl border border-line bg-surface-1 px-4 sm:px-5">
        <summary className="cursor-pointer py-3.5 text-[.9rem] text-ink-2 hover:text-ink-1">Sobre esta página e fontes</summary>
        <div className="pb-4">
          <Note className="mt-0" label="Sobre esta página.">
            É um resumo para quem está começando, e simplifica de propósito. A Constituição já foi
            alterada mais de 130 vezes desde 1988 e muitos pontos dependem de outras leis. Os
            números entre parênteses são os artigos, para quem quiser conferir no texto oficial.
          </Note>
          <Sources fontes={FONTES} />
        </div>
      </details>
    </>
  );
}
