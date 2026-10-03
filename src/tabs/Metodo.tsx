import { META, STATUS_LEGENDA } from '../data/candidatos';
import { Card, Note, PageHead, Sources, StatusBadge } from '../components/ui';

const LIMITES = [
  'O portal DivulgaCandContas do TSE bloqueia acesso automatizado, então os valores de financiamento vêm de veículos que citam o TSE. Têm corte entre 24 de setembro e 1º de outubro e não são finais.',
  'A receita de Marconi Perillo foi omitida: a única fonte disponível traz despesas maiores que a receita, inconsistência provável de transcrição.',
  'Vários candidatos de menor expressão não tiveram propostas detalhadas localizadas. Onde isso ocorre, o site diz "não localizado" em vez de deixar o campo vazio.',
  'Para Oséias Varão e Ernesto Roller a busca por processos não foi aprofundada, portanto a ausência de registros é menos conclusiva que nos demais.',
  'A classificação ideológica dos partidos é interpretativa, não um dado oficial. A fonte acadêmica mais rigorosa disponível publica a tabela completa apenas como imagem, então usamos a classificação do UBS Brasil.',
  'As pesquisas de Goiás, com exceção de Quaest e Real Time Big Data, não tiveram número de registro no TSE localizado.',
];

const P = ({ children }: { children: React.ReactNode }) =>
  <p className="mt-2 text-[.92rem] text-ink-2">{children}</p>;

function StatusLegenda(){
  const vistos = new Set<string>();
  return (
    <div className="grid gap-2">
      {Object.entries(STATUS_LEGENDA).map(([k, s]) => {
        if (vistos.has(s.rotulo)) return null;
        vistos.add(s.rotulo);
        return (
          <div key={k} className="flex flex-wrap items-baseline gap-2.5">
            <StatusBadge status={k} label={s.rotulo} />
            <span className="text-[.86rem] text-ink-2">{s.desc}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Metodo(){
  return (
    <>
      <PageHead title="Método e fontes" />
      <Card>
        <h3 className="text-[1.05rem] font-semibold">Como este site foi feito</h3>
        <P>Os dados foram coletados em 3 de outubro de 2026 a partir de fontes primárias sempre que
          possível: o arquivo oficial de candidaturas do TSE, as páginas da Câmara dos Deputados e do
          Senado Federal, os relatórios publicados pelos próprios institutos de pesquisa e decisões do
          STF. Onde a fonte primária não era acessível, usamos veículos de grande circulação, sempre
          identificados.</P>

        <h3 className="mt-6 text-[1.05rem] font-semibold">O que vem do TSE em tempo real</h3>
        <P>A aba Apuração e a conferência de números da colinha consultam, direto do seu navegador,
          os arquivos de totalização que alimentam <a href="https://resultados.tse.jus.br"
          target="_blank" rel="noopener">resultados.tse.jus.br</a>. O TSE renova esses arquivos a
          cada minuto, aproximadamente. Nada passa por servidor nosso. Pesquisas, propostas,
          financiamento e histórico judicial não têm API pública e continuam sendo dados coletados
          na data acima.</P>

        <h3 className="mt-6 text-[1.05rem] font-semibold">Sobre o histórico judicial</h3>
        <P>Cada caso traz o estágio processual exato, porque a diferença entre eles é decisiva. Uma
          investigação não é acusação; uma acusação não é condenação; e uma condenação anulada não é
          condenação. Processos arquivados, anulados e absolvições aparecem marcados como tais, com o
          mesmo destaque das condenações. Rumores e acusações sem fonte verificável foram deixados de
          fora.</P>
        <div className="mt-3.5"><StatusLegenda /></div>

        <h3 className="mt-6 text-[1.05rem] font-semibold">Limitações que você deve conhecer</h3>
        <Note crit>
          <b className="text-ink-1">O que este site não conseguiu verificar</b>
          <ul className="mt-2 list-disc pl-5">
            {LIMITES.map(l => <li key={l} className="mb-1.5">{l}</li>)}
          </ul>
        </Note>
        <Sources fontes={[
          { t: 'TSE · resultados e totalização 2026', u: 'https://resultados.tse.jus.br' },
          { t: 'TSE · dados abertos de candidaturas 2026', u: 'https://dadosabertos.tse.jus.br/dataset/candidatos-2026' },
          { t: 'TSE · calendário eleitoral', u: META.fonteCalendario },
          { t: 'TSE · federações partidárias', u: 'https://www.tse.jus.br/partidos/federacoes-registradas-no-tse' },
          { t: 'Câmara dos Deputados · bancadas', u: 'https://www.camara.leg.br/Internet/Deputado/bancada.asp' },
          { t: 'Datafolha', u: 'https://datafolha.folha.uol.com.br/' },
          { t: 'TSE · prestação de contas eleitorais 2026', u: 'https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026' },
          { t: 'Agência Brasil · eleições 2026', u: 'https://agenciabrasil.ebc.com.br/politica' },
        ]} />
      </Card>
    </>
  );
}
