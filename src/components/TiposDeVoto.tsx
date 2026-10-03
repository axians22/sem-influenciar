import type { ReactNode } from 'react';
import { Badge, Sources } from './ui';

const Tecla = ({ cor, children }: { cor: string; children: ReactNode }) => (
  <kbd className={'inline-block rounded border border-black/20 px-1.5 py-px font-sans text-[.68rem] font-bold tracking-wide ' + cor}>{children}</kbd>
);
/* as três teclas da urna, nas cores reais */
const BRANCO = <Tecla cor="bg-white text-black">BRANCO</Tecla>;
const CORRIGE = <Tecla cor="bg-[#f28c28] text-black">CORRIGE</Tecla>;
const CONFIRMA = <Tecla cor="bg-[#2e9e4f] text-white">CONFIRMA</Tecla>;

const TIPOS: { nome: string; valido: boolean; como: ReactNode; efeito: string }[] = [
  { nome: 'Voto nominal', valido: true,
    como: <>Digite o número do candidato, confira nome e foto na tela e aperte {CONFIRMA}.</>,
    efeito: 'Conta para o candidato. Para deputado, conta também para o partido ou federação dele na divisão das vagas.' },
  { nome: 'Voto de legenda', valido: true,
    como: <>Só existe para deputado federal e estadual. Digite apenas os 2 dígitos do partido e aperte {CONFIRMA}.</>,
    efeito: 'Conta para o partido ou federação, sem escolher um nome. Ajuda a legenda a conquistar vagas, que vão para os mais votados dela.' },
  { nome: 'Voto em branco', valido: false,
    como: <>Aperte {BRANCO} e depois {CONFIRMA}.</>,
    efeito: 'Não vai para ninguém. Fica registrado só como estatística.' },
  { nome: 'Voto nulo', valido: false,
    como: <>Digite um número que não é de nenhum candidato nem partido (por exemplo, 00) e aperte {CONFIRMA}.</>,
    efeito: 'Não vai para ninguém. Na prática, tem o mesmo efeito do voto em branco.' },
];

const MITOS = [
  ['“Voto em branco vai para quem está ganhando.”',
    'Falso. Desde 1997 o voto em branco não é contado para nenhum candidato.'],
  ['“Se mais da metade votar nulo, a eleição é anulada.”',
    'Falso. Brancos e nulos são descartados e o resultado sai só dos votos válidos, sejam quantos forem.'],
  ['“Branco e nulo não mudam nada.”',
    'Não favorecem ninguém diretamente, mas reduzem o total de votos válidos. Com isso, cada voto válido passa a pesar mais.'],
];

/* Explica os tipos de voto antes de o eleitor montar a colinha. */
export function TiposDeVoto(){
  return (
    <details open className="group mb-4 rounded-xl border border-line bg-surface-1 px-4 sm:px-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4">
        <span>
          <span className="block text-[1.05rem] font-semibold">Antes de escolher: os tipos de voto</span>
          <span className="block text-[.85rem] text-ink-2">O que é voto nominal, de legenda, em branco e nulo, e o que cada um faz na apuração.</span>
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"
          className="size-[18px] flex-none text-ink-3 transition-transform group-open:rotate-180"><path d="m6 9 6 6 6-6" /></svg>
      </summary>

      <div className="pb-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {TIPOS.map(t => (
            <div key={t.nome} className="rounded-lg border border-line bg-surface-2 p-3.5">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <b className="text-[.95rem]">{t.nome}</b>
                {t.valido ? <Badge tom="ok" icon="ok">Voto válido</Badge>
                  : <Badge tom="neutral" icon="info">Não é voto válido</Badge>}
              </div>
              <p className="text-[.86rem]"><span className="text-ink-3">Como fazer: </span>{t.como}</p>
              <p className="mt-1.5 text-[.86rem]"><span className="text-ink-3">O que acontece: </span>{t.efeito}</p>
            </div>
          ))}
        </div>

        <h4 className="mt-5 mb-2 text-[.78rem] font-semibold uppercase tracking-wider text-ink-3">O que são votos válidos</h4>
        <p className="max-w-[75ch] text-[.88rem] text-ink-2">
          Só os votos nominais e de legenda são válidos, e só eles definem o resultado. Presidente e
          governador precisam de mais da metade dos votos válidos; se ninguém alcançar, os dois mais
          votados disputam o 2º turno em 25 de outubro. Para o Senado, ganham os dois mais votados,
          sem 2º turno. Para deputado, as vagas são divididas entre partidos e federações conforme
          o total de votos válidos de cada um.
        </p>

        <h4 className="mt-5 mb-2 text-[.78rem] font-semibold uppercase tracking-wider text-ink-3">Mitos comuns</h4>
        <dl className="grid gap-2.5">
          {MITOS.map(([m, r]) => (
            <div key={m}>
              <dt className="text-[.88rem] font-medium">{m}</dt>
              <dd className="text-[.86rem] text-ink-2">{r}</dd>
            </div>
          ))}
        </dl>

        <h4 className="mt-5 mb-2 text-[.78rem] font-semibold uppercase tracking-wider text-ink-3">
          Se branco e nulo não favorecem ninguém, por que existem os dois?</h4>
        <div className="grid max-w-[75ch] gap-2 text-[.88rem] text-ink-2">
          <p><b className="text-ink-1">Porque já foram diferentes.</b> Até 1997, o voto em branco
            era considerado válido e entrava na conta do resultado, enquanto o nulo sempre foi
            descartado. Por isso o branco era visto como um voto de conformismo, de quem aceitava
            qualquer vencedor, e o nulo como um voto de protesto. A Lei das Eleições (Lei nº
            9.504/1997) tirou o voto em branco dos votos válidos, e desde então os dois têm o
            mesmo efeito.</p>
          <p><b className="text-ink-1">Hoje a diferença é só a forma de invalidar o voto.</b> O
            branco é uma escolha declarada: tem tecla própria e registra que o eleitor não quis
            preferir nenhum candidato. O nulo é o que acontece quando o número digitado não existe,
            de propósito ou por engano, e por isso precisa continuar existindo: a urna tem de
            fazer alguma coisa com um número inválido.</p>
          <p>O TSE conta e divulga os dois separadamente, mas apenas como estatística.</p>
        </div>

        <h4 className="mt-5 mb-2 text-[.78rem] font-semibold uppercase tracking-wider text-ink-3">Para não errar na urna</h4>
        <ul className="grid max-w-[75ch] list-disc gap-1.5 pl-5 text-[.88rem] text-ink-2">
          <li>Errou o número? Aperte {CORRIGE} e digite de novo. Depois do {CONFIRMA}, não dá para voltar.</li>
          <li>Confira sempre o nome e a foto que aparecem na tela antes de confirmar.</li>
          <li>Para deputado, se os 2 primeiros dígitos forem de um partido e o restante não for de
            nenhum candidato, a urna avisa e o voto vai para a legenda, não é anulado.</li>
          <li>No Senado são dois votos. Repetir o mesmo candidato na segunda vaga anula o segundo voto.</li>
          <li>São 6 votos, e cada um é independente: votar em branco ou nulo em um cargo não afeta os outros.</li>
        </ul>

        <Sources fontes={[
          { t: 'TSE · Glossário eleitoral, termos com a letra V', u: 'https://www.tse.jus.br/servicos-eleitorais/glossario/termos-iniciados-com-a-letra-v' },
          { t: 'TSE · Voto branco x voto nulo: saiba a diferença', u: 'https://www.tse.jus.br/comunicacao/noticias/2026/Julho/voto-branco-x-voto-nulo-saiba-a-diferenca-de-acordo-com-o-glossario-eleitoral' },
          { t: 'TSE · Brancos e nulos não são transferidos para o vencedor nem cancelam uma eleição', u: 'https://www.tse.jus.br/comunicacao/noticias/2022/Outubro/votos-em-branco-ou-nulos-nao-sao-transferidos-para-o-vencedor-nem-cancelam-uma-eleicao' },
        ]} />
      </div>
    </details>
  );
}
