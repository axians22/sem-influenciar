/* Conteúdo da aba "Constituição e voto", escrito para quem nunca leu a Constituição:
   frases curtas, palavras do dia a dia e o termo técnico só quando é inevitável.
   Tudo sai do texto da Constituição Federal de 1988, com o artigo entre parênteses
   (a página mostra essas referências em letra menor).
   Texto compilado: planalto.gov.br/ccivil_03/constituicao/constituicao.htm
   Os números de votos usam a composição atual do Congresso: 513 deputados (mantida
   para 2026 pelo STF) e 81 senadores. */

import type { Fonte } from './types';
import type { NomeDesenho } from '../components/Desenho';

export type Cargo = 'presidente' | 'senador' | 'depfed' | 'governador' | 'depest' | 'prefeito' | 'vereador';

export interface Passo { desenho: NomeDesenho; titulo: string; texto: string }

/* ---------- o caminho do voto ---------- */
export const CAMINHO_VOTO: Passo[] = [
  { desenho: 'urna', titulo: 'Você vota', texto: 'Escolhe quem vai decidir em seu nome.' },
  { desenho: 'pessoa', titulo: 'Os eleitos assumem', texto: 'Ficam no cargo por 4 anos. Senador fica 8.' },
  { desenho: 'documento', titulo: 'Eles decidem', texto: 'Fazem as leis e escolhem onde gastar o dinheiro dos impostos.' },
  { desenho: 'casa', titulo: 'Chega na sua vida', texto: 'No posto de saúde, na escola, na rua e nos preços.' },
];

/* ---------- o básico ---------- */
export const IDEIAS: (Passo & { art: string })[] = [
  { desenho: 'documento', titulo: 'É o livro de regras do Brasil', art: 'Aprovada em 5 de outubro de 1988',
    texto: 'A Constituição é a lei mais importante do país. Nenhuma outra lei e nenhum governante pode ir contra ela. A atual é de 1988, escrita quando o Brasil voltou à democracia depois de 21 anos de ditadura.' },
  { desenho: 'urna', titulo: 'Quem manda é o povo', art: 'Art. 1º, parágrafo único',
    texto: 'Ela diz que “todo o poder emana do povo”. Os políticos não são donos do poder: recebem esse poder emprestado de quem vota, por um tempo certo. Depois tem eleição de novo.' },
  { desenho: 'escudo', titulo: 'Você tem direitos garantidos', art: 'Arts. 5º e 6º',
    texto: 'Todos são iguais perante a lei. Você pode dizer o que pensa, ter a religião que quiser e se defender se for acusado. E tem direito a saúde, educação, trabalho, moradia, transporte e segurança.' },
  { desenho: 'cadeado', titulo: 'Seu voto é secreto e vale igual', art: 'Arts. 14 e 60, § 4º',
    texto: 'Ninguém pode saber em quem você votou, e o voto de cada pessoa vale o mesmo. Votar é obrigatório dos 18 aos 70 anos. Aos 16 e 17, depois dos 70 e para quem não sabe ler, vota quem quiser. Essa regra não pode ser derrubada nem mudando a Constituição.' },
];

export const PODERES: (Passo & { quem: string; eleito: boolean })[] = [
  { desenho: 'congresso', titulo: 'Legislativo', texto: 'Faz as leis e vigia o governo.',
    quem: 'Deputados, senadores e vereadores', eleito: true },
  { desenho: 'palacio', titulo: 'Executivo', texto: 'Governa: põe as leis em prática e cuida do dinheiro público.',
    quem: 'Presidente, governador e prefeito', eleito: true },
  { desenho: 'balanca', titulo: 'Judiciário', texto: 'Julga: decide quem tem razão quando há conflito ou crime.',
    quem: 'Juízes e tribunais', eleito: false },
];

export const NIVEIS: (Passo & { quem: string })[] = [
  { desenho: 'brasil', titulo: 'União', texto: 'O Brasil inteiro.',
    quem: 'Presidente, deputados federais e senadores' },
  { desenho: 'mapa', titulo: 'Estado', texto: 'Goiás.',
    quem: 'Governador e deputados estaduais' },
  { desenho: 'cidade', titulo: 'Município', texto: 'A sua cidade.',
    quem: 'Prefeito e vereadores (eleição só em 2028)' },
];

/* ---------- os cargos ---------- */
export interface InfoCargo {
  rotulo: string;
  desenho: NomeDesenho;
  naUrna: boolean;          /* está em disputa em 4 de outubro de 2026 */
  resumo: string;
  mandato: string;
  faz: string[];
  noDia: string;
}

export const CARGOS: Record<Cargo, InfoCargo> = {
  depfed: {
    rotulo: 'Deputado federal', desenho: 'congresso', naUrna: true,
    resumo: 'Faz as leis do país inteiro, em Brasília.',
    mandato: 'Fica 4 anos. São 513 no Brasil; Goiás elege 17.',
    faz: [
      'Vota as leis que valem para todo o Brasil: impostos, direitos do trabalhador, crimes e punições, aposentadoria (arts. 22 e 48).',
      'Decide como o governo federal vai gastar o dinheiro e pode mandar uma parte para a sua cidade. São as chamadas emendas, e metade delas tem de ir para a saúde (art. 166).',
      'Vigia o presidente e os ministros, e pode investigar o governo numa CPI (arts. 49, 50 e 58).',
      'Decide se o presidente pode ser processado. Para isso, dois terços dos deputados precisam concordar (art. 51, I).',
    ],
    noDia: 'O presidente não faz quase nada sozinho: o que ele promete só vale se os deputados aprovarem. E a ambulância ou a quadra que chegou “por emenda” foi um deputado ou senador que mandou.',
  },
  depest: {
    rotulo: 'Deputado estadual', desenho: 'mapa', naUrna: true,
    resumo: 'Faz as leis de Goiás, na Assembleia Legislativa, em Goiânia.',
    mandato: 'Fica 4 anos. Goiás elege 41 (art. 27).',
    faz: [
      'Vota as leis que valem só em Goiás.',
      'Aprova como o governador vai gastar o dinheiro do estado.',
      'Decide o valor dos impostos estaduais, como IPVA e ICMS. Imposto só sobe se os deputados aprovarem (arts. 150, I, e 155).',
      'Vigia o governador e confere as contas dele (art. 75).',
    ],
    noDia: 'O valor do IPVA e o salário de professores e policiais do estado passam pela Assembleia antes de valer.',
  },
  senador: {
    rotulo: 'Senador', desenho: 'congresso', naUrna: true,
    resumo: 'Também faz as leis do país, e ainda aprova ou barra escolhas importantes do presidente.',
    mandato: 'Fica 8 anos. Cada estado tem 3; nesta eleição você escolhe 2 (art. 46).',
    faz: [
      'Vota as mesmas leis que os deputados federais: uma lei precisa passar pelos dois grupos (art. 48).',
      'Aprova ou recusa quem o presidente escolhe para ministro do STF, o tribunal mais alto do país, e para o comando do Banco Central (art. 52, III).',
      'Julga o presidente e os ministros do STF se eles cometerem crime no cargo (art. 52, I e II).',
      'Autoriza estados e cidades a pegar dinheiro emprestado fora do país e limita o tamanho da dívida deles (art. 52, V a IX).',
    ],
    noDia: 'Um ministro do STF pode ficar décadas no cargo, e só chega lá se os senadores aprovarem. Todo estado tem 3 senadores: no Senado, Goiás pesa o mesmo que São Paulo.',
  },
  governador: {
    rotulo: 'Governador', desenho: 'palacio', naUrna: true,
    resumo: 'Governa Goiás.',
    mandato: 'Fica 4 anos e pode ser reeleito uma vez seguida (arts. 14, § 5º, e 28).',
    faz: [
      'Manda na Polícia Militar, na Polícia Civil e nos Bombeiros (art. 144, § 6º).',
      'Cuida das escolas estaduais, principalmente do ensino médio, e dos hospitais do estado (art. 211, § 3º).',
      'Cobra o ICMS, o IPVA e o imposto sobre herança (art. 155).',
      'Cuida das estradas estaduais, dos presídios e dos ônibus entre cidades (art. 25, § 1º).',
    ],
    noDia: 'Polícia na rua, delegacia aberta, escola de ensino médio, estrada estadual e o imposto que vem embutido na conta de luz e na gasolina.',
  },
  presidente: {
    rotulo: 'Presidente da República', desenho: 'brasil', naUrna: true,
    resumo: 'Governa o Brasil.',
    mandato: 'Fica 4 anos e pode ser reeleito uma vez seguida (arts. 14, § 5º, e 82).',
    faz: [
      'Assina as leis que o Congresso aprova, ou barra. Barrar uma lei se chama vetar (art. 84, IV e V).',
      'Monta o plano de gastos do país e manda para o Congresso votar: quanto vai para saúde, educação, obras e benefícios (arts. 84, XXIII, e 165).',
      'Em caso de urgência, pode criar uma regra que vale na hora, a medida provisória. Mas ela cai se o Congresso não aprovar em até 120 dias (art. 62).',
      'Escolhe os ministros e indica nomes para o STF e o Banco Central, que o Senado precisa aprovar (art. 84, I e XIV).',
    ],
    noDia: 'Aumento do salário mínimo, pagamento das aposentadorias do INSS, Bolsa Família, dinheiro para o SUS, universidades e estradas federais.',
  },
  prefeito: {
    rotulo: 'Prefeito', desenho: 'cidade', naUrna: false,
    resumo: 'Governa a cidade.', mandato: 'Próxima eleição em 2028.',
    faz: ['Cuida do posto de saúde, da creche, da escola até o 9º ano, do ônibus da cidade, do lixo e da iluminação (arts. 30 e 211, § 2º).'],
    noDia: '',
  },
  vereador: {
    rotulo: 'Vereador', desenho: 'cidade', naUrna: false,
    resumo: 'Faz as leis da cidade.', mandato: 'Próxima eleição em 2028.',
    faz: ['Faz as leis da cidade e vigia o prefeito (art. 31).'],
    noDia: '',
  },
};

/* na ordem em que aparecem na urna */
export const CARGOS_2026: Cargo[] = ['depfed', 'depest', 'senador', 'governador', 'presidente'];

/* ---------- do dia a dia à urna ---------- */
export interface Nivel { nivel: 'União' | 'Estado' | 'Município'; desenho: NomeDesenho; cargos: Cargo[]; texto: string }
export interface Situacao {
  id: string; label: string; desenho: NomeDesenho;
  direito: string;          /* o que a Constituição garante */
  niveis: Nivel[];
  dica: string;             /* como usar isso na hora de escolher */
}

const uniao = (texto: string): Nivel => ({ nivel: 'União', desenho: 'brasil', cargos: ['presidente', 'depfed', 'senador'], texto });
const estado = (texto: string): Nivel => ({ nivel: 'Estado', desenho: 'mapa', cargos: ['governador', 'depest'], texto });
const municipio = (texto: string): Nivel => ({ nivel: 'Município', desenho: 'cidade', cargos: ['prefeito', 'vereador'], texto });

export const SITUACOES: Situacao[] = [
  { id: 'saude', label: 'Saúde', desenho: 'saude',
    direito: 'Saúde é direito de todos, e o governo é obrigado a oferecer (art. 196). O SUS é pago e cuidado pelos três níveis de governo juntos (art. 198).',
    niveis: [
      uniao('Paga boa parte da conta e faz as regras para o país todo, como as vacinas e a Farmácia Popular. Deputados e senadores decidem quanto dinheiro vai para a saúde.'),
      estado('Cuida dos hospitais maiores e da fila de exames e cirurgias. Tem de gastar com saúde pelo menos 12% dos impostos que recebe (Lei Complementar nº 141/2012).'),
      municipio('Cuida do posto de saúde, do agente de saúde e da UPA. Tem de gastar com saúde pelo menos 15% dos impostos.'),
    ],
    dica: 'Em geral, a fila da cirurgia é com o estado, a falta de médico no posto é com a prefeitura, e boa parte do dinheiro vem de Brasília. Veja qual dessas partes o candidato promete resolver.' },
  { id: 'educacao', label: 'Escola e creche', desenho: 'escola',
    direito: 'Educação é direito de todos (art. 205). Estados e prefeituras têm de gastar com ensino pelo menos 25% dos impostos; o governo federal, 18% (art. 212).',
    niveis: [
      uniao('Universidades e institutos federais, Enem, merenda e livros. Também manda dinheiro extra para as escolas das regiões mais pobres, pelo Fundeb (art. 212-A).'),
      estado('Ensino médio e parte do fundamental: contrata e paga os professores das escolas estaduais (art. 211, § 3º).'),
      municipio('Creche, pré-escola e ensino fundamental (art. 211, § 2º).'),
    ],
    dica: 'Falta de vaga em creche não se resolve nesta eleição: é com o prefeito. Escola de ensino médio é com o governador.' },
  { id: 'seguranca', label: 'Segurança', desenho: 'escudo',
    direito: 'Segurança é dever do governo e direito de todos (art. 144).',
    niveis: [
      uniao('Só o Congresso pode dizer o que é crime e qual é a punição (art. 22, I). O presidente comanda a Polícia Federal e a Polícia Rodoviária Federal.'),
      estado('A polícia que você vê na rua é do estado. PM, Polícia Civil e Bombeiros obedecem ao governador (art. 144, § 6º). Ele decide quantos policiais contratar e quanto pagar, e cuida dos presídios.'),
      municipio('Pode ter guarda municipal para proteger prédios e praças da cidade (art. 144, § 8º). Também cuida da iluminação das ruas.'),
    ],
    dica: 'Deputado federal que promete “mais polícia na rua” está prometendo uma coisa que é do governador. Governador que promete “punição mais dura” está prometendo uma coisa que é do Congresso.' },
  { id: 'transporte', label: 'Ônibus e estradas', desenho: 'onibus',
    direito: 'Transporte é um direito desde 2015 (art. 6º).',
    niveis: [
      uniao('Estradas federais (as BRs), ferrovias, aeroportos e ônibus de um estado para outro (art. 21, XII). O Congresso faz as leis de trânsito (art. 22, XI).'),
      estado('Estradas estaduais (as GOs), ônibus entre cidades, Detran e IPVA.'),
      municipio('Ônibus da cidade: linhas e preço da passagem (art. 30, V). Também asfalto, calçada e semáforo.'),
    ],
    dica: 'Buraco na pista? Veja de quem é: BR é do governo federal, GO é do estado, rua é da prefeitura.' },
  { id: 'bolso', label: 'Impostos e preços', desenho: 'moeda',
    direito: 'Nenhum imposto pode ser criado ou aumentado sem uma lei (art. 150, I). Quem vota essa lei são os deputados, senadores e vereadores que você elege.',
    niveis: [
      uniao('Imposto de Renda e imposto sobre produtos importados (art. 153). O presidente indica e o Senado aprova quem comanda o Banco Central, que decide os juros.'),
      estado('ICMS, que vem embutido em quase tudo o que você compra, na conta de luz e na gasolina. Também IPVA e imposto sobre herança (art. 155).'),
      municipio('IPTU, imposto sobre serviços (ISS) e imposto na compra de imóvel (art. 156).'),
    ],
    dica: 'Uma mudança grande nos impostos foi aprovada em 2023 (Emenda Constitucional nº 132) e entra aos poucos até 2033. Os detalhes serão decididos pelos deputados e senadores eleitos agora.' },
  { id: 'trabalho', label: 'Salário e aposentadoria', desenho: 'trabalho',
    direito: 'Você tem direito a salário mínimo, 13º, férias pagas com um terço a mais, FGTS, seguro-desemprego e jornada de até 44 horas por semana (art. 7º).',
    niveis: [
      uniao('Quase tudo aqui é decidido em Brasília. O salário mínimo é definido por lei votada no Congresso (art. 7º, IV). As regras de trabalho e do INSS valem para o país todo (arts. 22, I, e 201).'),
      estado('Decide o salário e a aposentadoria de quem trabalha para o estado: professores, policiais, profissionais de saúde.'),
      municipio('O mesmo, para quem trabalha para a prefeitura.'),
    ],
    dica: 'Mudança em direitos do trabalhador ou na aposentadoria é decidida por deputados federais e senadores.' },
];

/* ---------- como uma ideia vira lei ---------- */
export const CAMINHO_LEI: Passo[] = [
  { desenho: 'lampada', titulo: 'Alguém propõe',
    texto: 'Um deputado, um senador, o presidente ou os próprios cidadãos, juntando assinaturas (art. 61).' },
  { desenho: 'congresso', titulo: 'Deputados votam',
    texto: 'Discutem e votam. Se a maioria disser não, a ideia para aqui. Se a ideia for de um senador, o Senado vota primeiro.' },
  { desenho: 'congresso', titulo: 'Senadores votam',
    texto: 'Fazem o mesmo. Se mudarem o texto, ele volta para os deputados (art. 65).' },
  { desenho: 'caneta', titulo: 'Presidente assina ou barra',
    texto: 'Tem 15 dias úteis para decidir. Barrar se chama vetar (art. 66).' },
  { desenho: 'documento', titulo: 'Vira lei',
    texto: 'Se o presidente barrou, o Congresso ainda pode derrubar o veto e fazer a lei valer (art. 66, § 4º).' },
];

/* ---------- um exemplo real, em quadrinhos ----------
   Lei da Ficha Limpa (Lei Complementar nº 135/2010), projeto de iniciativa popular.
   Fonte: Senado Notícias, "Lei da Ficha Limpa completa 15 anos" (02/06/2025), e a
   ficha de tramitação do PLP 518/2009 na Câmara. */
export type Cena = 'assinaturas' | 'entrega' | 'camara' | 'senado' | 'assina' | 'lei';
export const HISTORIA_LEI: { cena: Cena; titulo: string; quando: string; texto: string }[] = [
  { cena: 'assinaturas', titulo: 'A ideia nasce na rua', quando: 'Até 2009',
    texto: 'Um grupo de entidades queria impedir que políticos condenados pela Justiça fossem candidatos. Como os cidadãos também podem propor leis, saíram recolhendo assinaturas pelo país. Conseguiram mais de 1,5 milhão.' },
  { cena: 'entrega', titulo: 'O projeto chega ao Congresso', quando: '2009',
    texto: 'As assinaturas foram entregues na Câmara dos Deputados. A ideia virou um projeto de lei, com nome e número: PLP 518/2009.' },
  { cena: 'camara', titulo: 'Os deputados votam', quando: 'Maio de 2010',
    texto: 'O projeto foi discutido e aprovado pela maioria dos deputados. Se a maioria tivesse dito não, a história acabaria aqui.' },
  { cena: 'senado', titulo: 'Os senadores votam', quando: '19 de maio de 2010',
    texto: 'Aprovado na Câmara, o projeto seguiu para o Senado, que aprovou por unanimidade: nenhum senador votou contra.' },
  { cena: 'assina', titulo: 'O presidente assina', quando: '4 de junho de 2010',
    texto: 'O presidente da República sancionou, isto é, assinou. Se tivesse barrado, o projeto voltaria ao Congresso, que poderia derrubar o veto.' },
  { cena: 'lei', titulo: 'Vira lei e passa a valer', quando: 'Lei Complementar nº 135/2010',
    texto: 'Nasceu a Lei da Ficha Limpa. Ela barra a candidatura de quem foi condenado por um grupo de juízes por crimes como corrupção, abuso de poder e compra de voto.' },
];
export const FONTES_HISTORIA: Fonte[] = [
  { t: 'Senado Notícias · Lei da Ficha Limpa completa 15 anos', u: 'https://www12.senado.leg.br/noticias/materias/2025/06/02/lei-da-ficha-limpa-completa-15-anos' },
  { t: 'Câmara dos Deputados · tramitação do PLP 518/2009', u: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=452953' },
];

/* 513 deputados e 81 senadores */
export const QUORUNS: string[][] = [
  ['Aprovar uma lei comum', 'Mais votos a favor do que contra', 'Art. 47'],
  ['Derrubar um veto do presidente', '257 dos 513 deputados e 41 dos 81 senadores', 'Art. 66, § 4º'],
  ['Mudar a Constituição', '308 deputados e 49 senadores, em duas votações de cada grupo', 'Art. 60, § 2º'],
  ['Autorizar processo contra o presidente', '342 deputados', 'Art. 51, I'],
];

/* ---------- por que o partido importa ----------
   Seção sem nomes de partidos nem de candidatos, de propósito: mostra a regra do
   jogo e deixa a escolha com o eleitor. */
export const PARTIDO_FATOS: Passo[] = [
  { desenho: 'congresso', titulo: 'No Congresso se vota em grupo',
    texto: 'Cada partido tem um líder, que orienta como o grupo deve votar. Na maioria das vezes os deputados e senadores seguem essa orientação. Por isso o partido diz muito sobre como a pessoa vai votar depois de eleita.' },
  { desenho: 'urna', titulo: 'Seu voto para deputado conta primeiro para o partido',
    texto: 'As vagas são divididas entre os partidos conforme o total de votos de cada um. Seu voto pode ajudar a eleger outra pessoa do mesmo partido, mesmo que o seu candidato não entre.' },
  { desenho: 'cadeado', titulo: 'Deputado não troca de partido quando quer',
    texto: 'Quem sai do partido sem um motivo aceito pela Justiça Eleitoral pode perder o cargo, porque a vaga é do partido. A regra vale para deputados e vereadores, não para senadores (Lei nº 9.096/1995, art. 22-A).' },
];

/* exemplos inventados para mostrar o efeito do tamanho do apoio; não são previsão */
export const DEPUTADOS = 513;
export const MARCAS = [
  { n: 257, rotulo: '257: aprova leis' },
  { n: 308, rotulo: '308: muda a Constituição' },
];
export const CENARIOS: { id: string; label: string; apoiam: number; efeitos: string[] }[] = [
  { id: 'muito', label: 'Muito apoio', apoiam: 330, efeitos: [
    'O presidente aprova leis e o plano de gastos com facilidade.',
    'Consegue até mudar a Constituição.',
    'O outro lado da moeda: com tanta gente a favor, o governo é menos vigiado e menos questionado.',
  ] },
  { id: 'apertado', label: 'Apoio apertado', apoiam: 270, efeitos: [
    'O presidente aprova leis comuns, mas por pouco: precisa negociar a cada votação.',
    'Não consegue mudar a Constituição sem convencer parte de quem é contra.',
    'O governo anda, mas tem de ceder em muita coisa.',
  ] },
  { id: 'pouco', label: 'Pouco apoio', apoiam: 180, efeitos: [
    'O presidente depende de quem é contra ele para aprovar qualquer lei.',
    'O Congresso pode derrubar os vetos dele e mudar o plano de gastos.',
    'O outro lado da moeda: o governo é muito vigiado, mas pode travar e não entregar o que prometeu.',
  ] },
];

export const DOIS_JEITOS: (Passo & { cuidado: string })[] = [
  { desenho: 'caneta', titulo: 'Dar apoio',
    texto: 'Votar em deputados e senadores do mesmo lado de quem você escolheu para presidente ou governador, para que ele consiga aprovar o que prometeu.',
    cuidado: 'Com apoio demais, sobra pouca gente para vigiar e dizer não.' },
  { desenho: 'lupa', titulo: 'Dar um freio',
    texto: 'Votar em deputados e senadores de outro lado, para que o governo tenha de negociar e seja vigiado de perto.',
    cuidado: 'Com apoio de menos, o governo pode travar, inclusive no que você queria que ele fizesse.' },
];

export const PERGUNTAS: string[] = [
  'O partido deste candidato apoia ou é contra o presidente (ou o governador) que eu escolhi? É isso mesmo que eu quero?',
  'Como esse partido votou nos assuntos que mais me importam?',
  'Se o meu voto ajudar a eleger outra pessoa desse mesmo partido, tudo bem para mim?',
  'O partido está numa federação? Partidos em federação agem como se fossem um só durante 4 anos (Lei nº 14.208/2021).',
];

/* ---------- depois do voto ---------- */
export const COBRAR: { titulo: string; texto: string; link: Fonte }[] = [
  { titulo: 'Veja como seu deputado votou',
    texto: 'Cada votação fica registrada, com o voto de cada um.',
    link: { t: 'camara.leg.br', u: 'https://www.camara.leg.br/deputados/quem-sao' } },
  { titulo: 'Dê sua opinião sobre as leis',
    texto: 'No site do Senado você vota a favor ou contra projetos e pode sugerir ideias.',
    link: { t: 'senado.leg.br/ecidadania', u: 'https://www12.senado.leg.br/ecidadania' } },
  { titulo: 'Veja para onde vai o dinheiro',
    texto: 'Gastos do governo federal e o dinheiro enviado para a sua cidade.',
    link: { t: 'portaldatransparencia.gov.br', u: 'https://portaldatransparencia.gov.br' } },
  { titulo: 'Pergunte ao governo',
    texto: 'Qualquer pessoa pode pedir informação a um órgão público, e ele é obrigado a responder em até 20 dias (art. 5º, XXXIII).',
    link: { t: 'falabr.cgu.gov.br', u: 'https://falabr.cgu.gov.br' } },
];

/* ---------- teste rápido ---------- */
export const QUIZ: { p: string; ops: string[]; certa: number; porque: string }[] = [
  { p: 'Quem manda na Polícia Militar?',
    ops: ['O presidente', 'O governador', 'O prefeito'], certa: 1,
    porque: 'A PM e a Polícia Civil obedecem ao governador (art. 144, § 6º).' },
  { p: 'O presidente pode criar uma lei sozinho?',
    ops: ['Sim, sempre', 'Não: precisa do Congresso'], certa: 1,
    porque: 'Até a medida provisória, que vale na hora, cai se o Congresso não aprovar em até 120 dias (art. 62).' },
  { p: 'Quem aprova o ministro do STF que o presidente escolhe?',
    ops: ['Os deputados', 'Os senadores', 'O próprio STF'], certa: 1,
    porque: 'Mais da metade dos senadores precisa aprovar: 41 dos 81 (arts. 52, III, e 101).' },
  { p: 'Falta vaga na creche do bairro. Quem resolve?',
    ops: ['O prefeito', 'O governador', 'O deputado federal'], certa: 0,
    porque: 'Creche é tarefa da prefeitura (art. 211, § 2º). Prefeitos e vereadores serão eleitos em 2028.' },
  { p: 'Alguém pode descobrir em quem você votou?',
    ops: ['Sim, o governo', 'Sim, o patrão', 'Não, ninguém'], certa: 2,
    porque: 'O voto é secreto, e essa regra não pode ser derrubada nem mudando a Constituição (arts. 14 e 60, § 4º).' },
];

export const FONTES: Fonte[] = [
  { t: 'Constituição da República Federativa do Brasil de 1988 · texto compilado (Planalto)', u: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm' },
  { t: 'Lei Complementar nº 141/2012 · mínimos de aplicação em saúde', u: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp141.htm' },
  { t: 'Lei nº 12.527/2011 · Lei de Acesso à Informação', u: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm' },
  { t: 'Lei nº 9.096/1995 · Lei dos Partidos Políticos', u: 'https://www.planalto.gov.br/ccivil_03/leis/l9096.htm' },
  { t: 'Lei nº 14.208/2021 · federações de partidos', u: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/L14208.htm' },
  { t: 'STF · Supremo mantém número de deputados federais para 2026', u: 'https://noticias.stf.jus.br/postsnoticias/supremo-mantem-numero-de-deputados-federais-para-2026/' },
];
