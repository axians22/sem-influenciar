/* Dados das Eleições 2026 — coletados em 03/10/2026.
   Toda informação aqui tem fonte rastreável; ver /dados/*.md no repositório.
   Fontes primárias: CSV oficial do TSE (dadosabertos.tse.jus.br), camara.leg.br,
   senado.leg.br, tse.jus.br, datafolha.folha.uol.com.br, poder360.com.br,
   agenciabrasil.ebc.com.br. */

import type { SeriePesquisas, DatafolhaFinal, SegundoTurno, PesqValidos, TopPesquisas } from "./types";

/* ---------- PESQUISAS: PRESIDENTE, 1º turno, VOTOS TOTAIS ----------
   Série exclusivamente de votos totais (inclui brancos, nulos e indecisos).
   Pesquisas em votos válidos NÃO entram aqui — são séries diferentes e
   misturá-las produziria um gráfico falso. */
export const PESQ_PRESIDENTE: SeriePesquisas = {
  unidade: "Intenção de voto, votos totais (%)",
  nota: "Apenas pesquisas divulgadas em votos totais. Pesquisas em votos válidos (AtlasIntel, Veritá) estão listadas separadamente, pois não são comparáveis.",
  candidatos: [
    { k: "lula",    label: "Lula (PT)",              slot: 1 },
    { k: "flavio",  label: "Flávio Bolsonaro (PL)",  slot: 2 },
    { k: "cury",    label: "Augusto Cury (Avante)",  slot: 3 },
    { k: "caiado",  label: "Ronaldo Caiado (PSD)",   slot: 4 },
    { k: "renan",   label: "Renan Santos (Missão)",  slot: 5 },
    { k: "zema",    label: "Romeu Zema (Novo)",      slot: 6 }
  ],
  pesquisas: [
    { inst: "Datafolha", campo: "22–24/set", data: "2026-09-24", n: null, me: null, reg: null,
      lula: 40, flavio: 36, cury: 5, caiado: 4, renan: 3, zema: 1 },
    { inst: "Real Time Big Data", campo: "~22/set", data: "2026-09-24", n: null, me: null, reg: null,
      lula: 43, flavio: 39, cury: null, caiado: null, renan: null, zema: null },
    { inst: "Quaest", campo: "24–27/set", data: "2026-09-28", n: 2004, me: 2, reg: "BR-06520/2026",
      lula: null, flavio: null, cury: 4, caiado: 4, renan: 3, zema: 1,
      notaLinha: "Os percentuais de Lula (39%) e Flávio (34%) nesta pesquisa foram divulgados em votos válidos e por isso não constam na série de totais." },
    { inst: "BTG/Nexus", campo: "~27/set", data: "2026-09-28", n: null, me: null, reg: null,
      lula: 42, flavio: 37, cury: null, caiado: null, renan: null, zema: null },
    { inst: "Datafolha", campo: "29/set–1/out", data: "2026-10-01", n: 2506, me: 2, reg: "BR-08039/2026",
      lula: 42, flavio: 38, cury: 4, caiado: 3, renan: 3, zema: 1 },
    { inst: "PoderData/Aya", campo: "30/set–2/out", data: "2026-10-03", n: 3000, me: 1.5, reg: null,
      lula: 42, flavio: 41, cury: null, caiado: null, renan: null, zema: null }
  ],
  fontes: [
    { t: "Datafolha · relatório do instituto", u: "https://datafolha.folha.uol.com.br/eleicoes/2026/10/no-1o-turno-lula-pt-lidera-com-45-dos-validos-e-flavio-bolsonaro-pl-tem-40.shtml" },
    { t: "Datafolha · PDF do levantamento completo", u: "https://media.folha.uol.com.br/datafolha/2026/10/02/pmzl5pv3clpqn4qxot1ykftnjvnus9a8bqs-4zxigfg.pdf" }
  ]
};

/* Datafolha mais recente — detalhe completo (votos totais e válidos) */
export const DATAFOLHA_FINAL: DatafolhaFinal = {
  inst: "Datafolha", reg: "BR-08039/2026", n: 2506, me: 2, confianca: 95,
  campo: "29 de setembro a 1º de outubro de 2026", municipios: 152,
  divulgacao: "1º de outubro de 2026",
  contratante: "Globo e Folha de S.Paulo",
  fonte: "https://datafolha.folha.uol.com.br/eleicoes/2026/10/no-1o-turno-lula-pt-lidera-com-45-dos-validos-e-flavio-bolsonaro-pl-tem-40.shtml",
  notaDatas: "Campo entre 29/09 e 01/10, conforme o relatório do próprio instituto.",
  totais: [
    { nome: "Lula (PT)", v: 42, ant: 40 },
    { nome: "Flávio Bolsonaro (PL)", v: 38, ant: 36 },
    { nome: "Augusto Cury (Avante)", v: 4, ant: 5 },
    { nome: "Ronaldo Caiado (PSD)", v: 3, ant: 4 },
    { nome: "Renan Santos (Missão)", v: 3, ant: 3 },
    { nome: "Romeu Zema (Novo)", v: 1, ant: 1 },
    { nome: "Samara Martins (UP)", v: 1, ant: 1 },
    { nome: "Wilson Grassi (Democrata)", v: 1, ant: 0 },
    { nome: "Branco, nulo ou nenhum", v: 5, ant: 5, tipo: "outro" },
    { nome: "Indecisos", v: 2, ant: 2, tipo: "outro" }
  ],
  validos: [
    { nome: "Lula (PT)", v: 45 },
    { nome: "Flávio Bolsonaro (PL)", v: 40 },
    { nome: "Augusto Cury (Avante)", v: 4 },
    { nome: "Ronaldo Caiado (PSD)", v: 3 },
    { nome: "Renan Santos (Missão)", v: 3 },
    { nome: "Romeu Zema (Novo)", v: 1 },
    { nome: "Samara Martins (UP)", v: 1 },
    { nome: "Wilson Grassi (Democrata)", v: 1 }
  ],
  rejeicao: [
    { nome: "Lula (PT)", v: 45 }, { nome: "Flávio Bolsonaro (PL)", v: 45 },
    { nome: "Renan Santos (Missão)", v: 16 }, { nome: "Romeu Zema (Novo)", v: 15 },
    { nome: "Ronaldo Caiado (PSD)", v: 14 }, { nome: "Rui Costa Pimenta (PCO)", v: 11 },
    { nome: "Augusto Cury (Avante)", v: 11 }, { nome: "Edmilson Costa (PCB)", v: 9 },
    { nome: "Samara Martins (UP)", v: 9 }, { nome: "Hertz Dias (PSTU)", v: 7 },
    { nome: "Clariana Barão (DC)", v: 7 }, { nome: "Wilson Grassi (Democrata)", v: 7 }
  ],
  governo: { aprova: 48, desaprova: 49, naoSabe: 3, otimoBom: 35, regular: 23, ruimPessimo: 41 },
  decididos: 78
};

/* 2º turno — simulações, com divergência entre institutos preservada */
export const SEGUNDO_TURNO: SegundoTurno = {
  nota: "Institutos divergem na ordem do confronto Lula x Flávio, e todas as diferenças estão dentro das margens de erro. Os cenários abaixo são simulações, não previsões.",
  cenarios: [
    { inst: "Datafolha", reg: "BR-08039/2026", campo: "29/set–1/out", a: "Lula", av: 48, b: "Flávio Bolsonaro", bv: 45, brancoNulo: 6, indeciso: 1, empate: true },
    { inst: "PoderData/Aya", reg: null, campo: "30/set–2/out", a: "Lula", av: 46, b: "Flávio Bolsonaro", bv: 46, brancoNulo: null, indeciso: null, empate: true },
    { inst: "Quaest", reg: "BR-06520/2026", campo: "24–27/set", a: "Lula", av: 42, b: "Flávio Bolsonaro", bv: 42, brancoNulo: 13, indeciso: 3, empate: true },
    { inst: "AtlasIntel", reg: null, campo: "23–28/set", a: "Flávio Bolsonaro", av: 47.7, b: "Lula", bv: 47.6, brancoNulo: null, indeciso: null, empate: true, validos: true },
    { inst: "Datafolha", reg: "BR-08039/2026", campo: "29/set–1/out", a: "Lula", av: 48, b: "Ronaldo Caiado", bv: 42, brancoNulo: 9, indeciso: 1 },
    { inst: "Datafolha", reg: "BR-08039/2026", campo: "29/set–1/out", a: "Lula", av: 49, b: "Romeu Zema", bv: 40, brancoNulo: 9, indeciso: 2 },
    { inst: "Datafolha", reg: "BR-08039/2026", campo: "29/set–1/out", a: "Lula", av: 48, b: "Renan Santos", bv: 39, brancoNulo: 10, indeciso: 2 },
    { inst: "Datafolha", reg: "BR-08039/2026", campo: "29/set–1/out", a: "Lula", av: 47, b: "Augusto Cury", bv: 42, brancoNulo: 9, indeciso: 2 }
  ]
};

/* Pesquisas em VOTOS VÁLIDOS — série separada, não comparável com a de totais */
export const PESQ_VALIDOS: PesqValidos = {
  nota: "Pesquisas divulgadas em votos válidos, que excluem brancos, nulos e indecisos. Não devem ser comparadas diretamente com a série de votos totais.",
  linhas: [
    { inst: "AtlasIntel/Bloomberg", campo: "17–22/set", n: 5018, me: 1, reg: "BR-04739/2026", lula: 45.8, flavio: 43.4 },
    { inst: "AtlasIntel/Bloomberg", campo: "23–28/set", n: 5005, me: 1, reg: null, lula: 45.3, flavio: 42.2, renan: 5.2 },
    { inst: "Veritá", campo: "20–25/set", n: 40500, me: 1, reg: null, lula: null, flavio: 45.5,
      obs: "O percentual de Lula não constava no material consultado." },
    { inst: "Quaest", campo: "24–27/set", n: 2004, me: 2, reg: "BR-06520/2026", lula: 39, flavio: 34 },
    { inst: "Datafolha", campo: "29/set–1/out", n: 2506, me: 2, reg: "BR-08039/2026", lula: 45, flavio: 40 }
  ]
};

/* ---------- PESQUISAS: GOIÁS ---------- */
export const PESQ_GOV_GOIAS: SeriePesquisas = {
  unidade: "Intenção de voto para governador de Goiás (%)",
  candidatos: [
    { k: "vilela",  label: "Daniel Vilela (MDB)",     slot: 1 },
    { k: "perillo", label: "Marconi Perillo (PSDB)",  slot: 2 },
    { k: "wilder",  label: "Wilder Morais (PL)",      slot: 3 },
    { k: "bueno",   label: "Luis Cesar Bueno (PT)",   slot: 4 }
  ],
  pesquisas: [
    { inst: "IGAPE", campo: "14–19/set", data: "2026-09-19", n: 2000, me: 2.2, reg: null,
      vilela: 40.3, perillo: 29.4, wilder: 17.7, bueno: 6.8 },
    { inst: "Real Time Big Data", campo: "17–21/set", data: "2026-09-22", n: 1600, me: 2, reg: "GO-04616/2026",
      vilela: 46, perillo: 18, wilder: 19, bueno: 8 },
    { inst: "Quaest", campo: "20–23/set", data: "2026-09-24", n: 804, me: 3, reg: "GO-01667/2026",
      vilela: 42, perillo: 19, wilder: 15, bueno: 5 },
    { inst: "Veritá", campo: "20–24/set", data: "2026-09-25", n: 1525, me: 2.5, reg: null,
      vilela: 41.4, perillo: 13.3, wilder: 29.7, bueno: 14.3, discrepante: true },
    { inst: "Goiás Pesquisas", campo: "24–25/set", data: "2026-09-26", n: 1250, me: 2.77, reg: null,
      vilela: 44.6, perillo: 13.8, wilder: 18.2, bueno: 5.7 },
    { inst: "Paraná Pesquisas", campo: "25–27/set", data: "2026-09-28", n: 1352, me: 2.7, reg: null,
      vilela: 45.6, perillo: 18.4, wilder: 18.5, bueno: 6.1 }
  ],
  alerta: "A pesquisa da Veritá é fortemente discrepante das demais, atribuindo a Wilder Morais 29,7% e a Luis Cesar Bueno 14,3%, contra cerca de 18% e 6% nos outros institutos.",
  fonte: "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_Goi%C3%A1s"
};

export const PESQ_SEN_GOIAS: SeriePesquisas = {
  unidade: "Intenção de voto para o Senado em Goiás (%)",
  nota: "Goiás elege 2 senadores, então cada eleitor vota em dois nomes e a soma dos percentuais passa de 100%.",
  candidatos: [
    { k: "gracinha",  label: "Gracinha Caiado (União)",  slot: 1 },
    { k: "gayer",     label: "Gustavo Gayer (PL)",       slot: 2 },
    { k: "calil",     label: "Zacharias Calil (MDB)",    slot: 3 },
    { k: "mendanha",  label: "Gustavo Mendanha (PRD)",   slot: 4 },
    { k: "vanderlan", label: "Vanderlan Cardoso (PSD)",  slot: 5 }
  ],
  pesquisas: [
    { inst: "IGAPE", campo: "14–19/set", data: "2026-09-19", n: 2000, me: 2.2, reg: null,
      gracinha: 24, gayer: 20.9, calil: 14.2, mendanha: 13.4, vanderlan: 8.1 },
    { inst: "Real Time Big Data", campo: "17–21/set", data: "2026-09-22", n: 1600, me: 2, reg: null,
      gracinha: 23, gayer: 20, calil: 13, mendanha: 8, vanderlan: 12 },
    { inst: "Quaest", campo: "20–23/set", data: "2026-09-24", n: 804, me: 3, reg: "GO-01667/2026",
      gracinha: 21, gayer: 13, calil: 12, mendanha: 8, vanderlan: 8 },
    { inst: "Veritá", campo: "20–24/set", data: "2026-09-25", n: 1525, me: 2.5, reg: null,
      gracinha: 38.6, gayer: 41.8, calil: 30.9, mendanha: 14.1, vanderlan: 10, discrepante: true },
    { inst: "Goiás Pesquisas", campo: "24–25/set", data: "2026-09-26", n: 1250, me: 2.77, reg: null,
      gracinha: 21.6, gayer: 21.1, calil: 18.2, mendanha: 8.4, vanderlan: 4.4 }
  ],
  alerta: "A pesquisa da Veritá apresenta patamar muito acima dos demais institutos para todos os candidatos.",
  fonte: "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_Goi%C3%A1s"
};

/* ---------- MAIS BEM COLOCADOS NAS PESQUISAS ----------
   NÃO é previsão de resultado. É o ranking da pesquisa mais recente e completa de
   cada cargo, com margem de erro e empates técnicos explícitos.
   Empate técnico = diferença menor que a margem de erro: nesse caso os números NÃO
   permitem dizer quem está na frente. */
export const TOP_PESQUISAS: TopPesquisas = {
  aviso: "Pesquisa mede intenção de voto no momento da coleta, não prevê resultado. Quando a diferença entre dois candidatos é menor que a margem de erro, há empate técnico e a ordem entre eles não é significativa.",
  cargos: [
    {
      id: 'presidente', rotulo: 'Presidente',
      inst: 'Datafolha', reg: 'BR-08039/2026', campo: '29/set a 1º/out', me: 2, n: 2506,
      base: 'votos válidos',
      fonte: 'https://datafolha.folha.uol.com.br/eleicoes/2026/10/no-1o-turno-lula-pt-lidera-com-45-dos-validos-e-flavio-bolsonaro-pl-tem-40.shtml',
      lista: [
        { nome: 'Lula', partido: 'PT', nr: '13', v: 45 },
        { nome: 'Flávio Bolsonaro', partido: 'PL', nr: '22', v: 40 },
        { nome: 'Escritor Augusto Cury', partido: 'Avante', nr: '70', v: 4 },
        { nome: 'Ronaldo Caiado', partido: 'PSD', nr: '55', v: 3 },
        { nome: 'Renan Santos', partido: 'Missão', nr: '14', v: 3 }
      ]
    },
    {
      id: 'governador', rotulo: 'Governador de Goiás',
      inst: 'Paraná Pesquisas', reg: null, campo: '25 a 27/set', me: 2.7, n: 1352,
      base: 'intenção de voto',
      fonte: 'https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_Goi%C3%A1s',
      lista: [
        { nome: 'Daniel Vilela', partido: 'MDB', nr: '15', v: 45.6 },
        { nome: 'Wilder Morais', partido: 'PL', nr: '22', v: 18.5 },
        { nome: 'Marconi Perillo', partido: 'PSDB', nr: '45', v: 18.4 },
        { nome: 'Luis Cesar Bueno', partido: 'PT', nr: '13', v: 6.1 },
        { nome: 'Luciana Amorim', partido: 'UP', nr: '80', v: 1.6 }
      ]
    },
    {
      id: 'senador', rotulo: 'Senado por Goiás',
      inst: 'Goiás Pesquisas', reg: null, campo: '24 a 25/set', me: 2.77, n: 1250,
      base: 'intenção de voto',
      nota: 'Goiás elege 2 senadores, então cada eleitor vota em dois nomes.',
      fonte: 'https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_Goi%C3%A1s',
      lista: [
        { nome: 'Gracinha Caiado', partido: 'União', nr: '444', v: 21.6 },
        { nome: 'Gustavo Gayer', partido: 'PL', nr: '222', v: 21.1 },
        { nome: 'Dr. Zacharias Calil', partido: 'MDB', nr: '155', v: 18.2 },
        { nome: 'Gustavo Mendanha', partido: 'PRD', nr: '251', v: 8.4 },
        { nome: 'Vanderlan Cardoso', partido: 'PSD', nr: '555', v: 4.4 }
      ]
    },
    {
      /* Fonte lida em 03/10/2026. Lista completa da matéria (67 nomes); o site mostra de 10 em 10.
         Número e partido vêm do registro do TSE, pelo nome de urna. A matéria não informa se a pergunta foi espontânea ou estimulada. */
      id: 'depfed', rotulo: 'Deputado federal por Goiás',
      inst: 'IGAPE', reg: 'GO-01814/2026', campo: '9 a 14/set',
      me: 2.2, n: 2000, base: 'menções, sobre o total de entrevistados',
      nota: 'Pesquisa estadual, em 86 municípios, contratada pela TV Atual/Record News. 24,7% não souberam ou não opinaram e 1,8% disseram branco ou nulo. Uma pesquisa mais recente, do Instituto Directa (GO-05903/2026, campo de 27 a 30/set), só teve três nomes divulgados, em votos válidos: Bruno Peixoto 5,3%, Flávia Morais 4,4% e Delegado Waldir 4,0%.',
      limitacao: 'Do 1º ao 10º a diferença é de 1,4 ponto, menor que a margem de erro de ± 2,2 pontos: os dez estão em empate técnico e a ordem entre eles não é significativa. Do 14º em diante, os percentuais ficam abaixo da própria margem de erro. Com 265 candidaturas e um quarto dos entrevistados sem resposta, esta lista não indica quem se elege.',
      fonte: 'https://www.conexaorecord.com.br/silvye-lidera-para-federal-em-goias-seguida-por-bruno-e-flavia-morais-aponta-igape/',
      lista: [
        { nome: "Silvye Alves", partido: "União", nr: "4444", v: 3.9 },
        { nome: "Bruno Peixoto", partido: "União", nr: "4455", v: 3.6 },
        { nome: "Flávia Morais", partido: "MDB", nr: "1515", v: 3.1 },
        { nome: "José Nelto", partido: "União", nr: "4415", v: 3 },
        { nome: "Professor Alcides", partido: "PSDB", nr: "4500", v: 3 },
        { nome: "Daniel Agrobom", partido: "PSD", nr: "5522", v: 2.9 },
        { nome: "Lucas do Vale", partido: "PSD", nr: "5544", v: 2.8 },
        { nome: "Adriano do Baldy", partido: "PP", nr: "1111", v: 2.7 },
        { nome: "Lucas Calil", partido: "PRD", nr: "2525", v: 2.6 },
        { nome: "Delegada Adriana Accorsi", partido: "PT", nr: "1331", v: 2.5 },
        { nome: "Delegado Waldir", partido: "União", nr: "4400", v: 2.5 },
        { nome: "Magda Mofatto", partido: "PL", nr: "2222", v: 2.3 },
        { nome: "Fred Rodrigues", partido: "PL", nr: "2220", v: 2.2 },
        { nome: "Célio Silveira", partido: "MDB", nr: "1599", v: 1.9 },
        { nome: "Ismael Alexandrino", partido: "PSD", nr: "5555", v: 1.7 },
        { nome: "Glaustin da Fokus", partido: "Podemos", nr: "2026", v: 1.7 },
        { nome: "Marussa Boldrin", partido: "Republicanos", nr: "1055", v: 1.7 },
        { nome: "Aava Santiago", partido: "PSB", nr: "4040", v: 1.6 },
        { nome: "Lêda Borges", partido: "Republicanos", nr: "1020", v: 1.6 },
        { nome: "Delegado Humberto Teófilo", partido: "Novo", nr: "3011", v: 1.5 },
        { nome: "Ricardo Quirino", partido: "Republicanos", nr: "1010", v: 1.5 },
        { nome: "Rubens Otoni", partido: "PT", nr: "1313", v: 1.5 },
        { nome: "Zeli", partido: "PSD", nr: "5566", v: 1.3 },
        { nome: "Lucas Vergílio", partido: "MDB", nr: "1510", v: 1.2 },
        { nome: "Maycon Tombini", partido: "PL", nr: "2207", v: 1.2 },
        { nome: "Professora Fátima Gavioli", partido: "PSD", nr: "5515", v: 1 },
        { nome: "Salma da Pestalozzi", partido: "União", nr: "4411", v: 1 },
        { nome: "Professor Edward", partido: "PT", nr: "1310", v: 0.9 },
        { nome: "Subtenente Sérgio", partido: "MDB", nr: "1522", v: 0.9 },
        { nome: "Camila Rosa", partido: "União", nr: "4450", v: 0.8 },
        { nome: "Yvelônia", partido: "PL", nr: "2277", v: 0.8 },
        { nome: "Fábio Sousa", partido: "PL", nr: "2200", v: 0.7 },
        { nome: "Denes Pereira", partido: "Solidariedade", nr: "7777", v: 0.5 },
        { nome: "Itamar Leão", partido: "PSDB", nr: "4551", v: 0.5 },
        { nome: "Samuel Santos", partido: "Podemos", nr: "2090", v: 0.5 },
        { nome: "Adair Henriques Vovô do Jeep", partido: "PSDB", nr: "4545", v: 0.4 },
        { nome: "Danilo Faria", partido: "Solidariedade", nr: "7722", v: 0.4 },
        { nome: "Delúbio Soares", partido: "PT", nr: "1390", v: 0.4 },
        { nome: "Antonio", partido: "Solidariedade", nr: "7799", v: 0.4 },
        { nome: "Eliel Junior", partido: "Solidariedade", nr: "7744", v: 0.4 },
        { nome: "Glaucia Melo", partido: "PSDB", nr: "4546", v: 0.4 },
        { nome: "Leozão", partido: "PSDB", nr: "4567", v: 0.4 },
        { nome: "Luciano Guimarães", partido: "Novo", nr: "3022", v: 0.4 },
        { nome: "Nailde Lima", partido: "MDB", nr: "1588", v: 0.4 },
        { nome: "Policial Federal Suender", partido: "PL", nr: "2233", v: 0.4 },
        { nome: "Capitão Rodolfo Souza", partido: "União", nr: "4422", v: 0.3 },
        { nome: "Reiller Lopes", partido: "Missão", nr: "1433", v: 0.3 },
        { nome: "Dr. Wagner Miranda Hosp. Cancer", partido: "PL", nr: "2223", v: 0.3 },
        { nome: "Henrique Vilela", partido: "PL", nr: "2255", v: 0.3 },
        { nome: "Igor Franco", partido: "Podemos", nr: "2022", v: 0.3 },
        { nome: "Jeferson Rodrigues", partido: "PSDB", nr: "4556", v: 0.3 },
        { nome: "João Campos", partido: "Podemos", nr: "2020", v: 0.3 },
        { nome: "João da Luz", partido: "Cidadania", nr: "2323", v: 0.3 },
        { nome: "João Noleto", partido: "Missão", nr: "1414", v: 0.3 },
        { nome: "Renato Ribeiro", partido: "PL", nr: "2230", v: 0.3 },
        { nome: "Tenente Rhainna", partido: "Solidariedade", nr: "7770", v: 0.3 },
        { nome: "Léo Machado Verdade", partido: "Podemos", nr: "2027", v: 0.2 },
        { nome: "Lorrayne Castro", partido: "União", nr: "4477", v: 0.2 },
        { nome: "Lucélia Rodrigues", partido: "PL", nr: "2210", v: 0.2 },
        { nome: "Moraes da Lanchonete", partido: "Republicanos", nr: "1001", v: 0.2 },
        { nome: "Nixon das Casinhas", partido: "PSB", nr: "4011", v: 0.2 },
        { nome: "Pedro Canedo", partido: "PRD", nr: "2522", v: 0.2 },
        { nome: "Raphael Barra", partido: "PL", nr: "2238", v: 0.2 },
        { nome: "Tales de Castro", partido: "PSB", nr: "4015", v: 0.2 },
        { nome: "Tatiely Sousa", partido: "Solidariedade", nr: "7712", v: 0.2 },
        { nome: "Valéria Pettersen", partido: "PP", nr: "1144", v: 0.2 },
        { nome: "Valério Luiz", partido: "PT", nr: "1312", v: 0.2 }
      ]
    },
    {
      /* Mesma pesquisa do IGAPE. O nome numericamente à frente na pesquisa, Amilton
         Filho (MDB, 2,0%), não entra na lista: o TSE registra a candidatura como
         encerrada por falecimento e o número 15100 passou a Carol do Amiltinho. */
      id: 'depest', rotulo: 'Deputado estadual por Goiás',
      inst: 'IGAPE', reg: 'GO-01814/2026', campo: '9 a 14/set',
      me: 2.2, n: 2000, base: 'menções, sobre o total de entrevistados',
      nota: 'Pesquisa estadual, em 86 municípios, contratada pela TV Atual/Record News. 23,7% não souberam ou não opinaram e 2,8% disseram branco ou nulo. O nome que aparecia numericamente à frente, Amilton Filho (MDB), com 2,0%, não está na lista: o TSE registra a candidatura como encerrada por falecimento, e o número 15100 passou a Carol do Amiltinho (MDB), que não foi medida. A lista abaixo traz os demais nomes citados, na ordem da pesquisa. Três deles (Baiano dos Cocos, Lucília do Recanto e Tenente-Coronel Nilson) não foram localizados entre as candidaturas que estão na urna e aparecem sem número.',
      limitacao: 'Nenhum candidato passa de 1,9%, abaixo da margem de erro de ± 2,2 pontos: todos os nomes da lista estão em empate técnico e a ordem entre eles não é significativa. Com 595 candidaturas para 41 vagas, esta lista não indica quem se elege.',
      fonte: 'https://www.conexaorecord.com.br/amilton-lidera-para-estadual-em-goias-seguido-por-cairo-salim-issy-quinan-e-paulo-do-vale-aponta-igape/',
      lista: [
        { nome: "Cairo Salim", partido: "MDB", nr: "15123", v: 1.9 },
        { nome: "Issy Quinan", partido: "MDB", nr: "15900", v: 1.9 },
        { nome: "Paulo do Vale", partido: "PSD", nr: "55244", v: 1.9 },
        { nome: "Wilde Cambão", partido: "União", nr: "44555", v: 1.7 },
        { nome: "Major Araújo", partido: "PL", nr: "22190", v: 1.6 },
        { nome: "Pábio Mossoró", partido: "MDB", nr: "15456", v: 1.5 },
        { nome: "Gugu Nader", partido: "PSDB", nr: "45999", v: 1.4 },
        { nome: "Amauri Ribeiro", partido: "PL", nr: "22000", v: 1.3 },
        { nome: "Dr. George Morais", partido: "MDB", nr: "15150", v: 1.3 },
        { nome: "Anderson Teodoro", partido: "PRD", nr: "25789", v: 1.2 },
        { nome: "Eduardo Prado", partido: "PL", nr: "22123", v: 1.2 },
        { nome: "GCM Romário Policarpo", partido: "Cidadania", nr: "23153", v: 1.1 },
        { nome: "Gustavo Sebba", partido: "PSDB", nr: "45222", v: 1.1 },
        { nome: "Rubens Marques", partido: "PSB", nr: "40555", v: 1.1 },
        { nome: "André do Premium", partido: "União", nr: "44333", v: 1 },
        { nome: "Charles Bento", partido: "MDB", nr: "15600", v: 1 },
        { nome: "Lineu Olimpio", partido: "MDB", nr: "15044", v: 1 },
        { nome: "Paulo Cezar Martins", partido: "MDB", nr: "15601", v: 1 },
        { nome: "Adib Elias", partido: "MDB", nr: "15111", v: 0.9 },
        { nome: "Júlio Pina", partido: "Solidariedade", nr: "77077", v: 0.9 },
        { nome: "Sargento Novandir", partido: "Democrata", nr: "35100", v: 0.9 },
        { nome: "Cardoso", partido: "Republicanos", nr: "10123", v: 0.8 },
        { nome: "Clécio Alves", partido: "PSDB", nr: "45111", v: 0.8 },
        { nome: "Delegado Cristiomário", partido: "Agir", nr: "36123", v: 0.8 },
        { nome: "Joscilene do Mangão", partido: "Agir", nr: "36222", v: 0.8 },
        { nome: "José Machado", partido: "PSDB", nr: "45678", v: 0.8 },
        { nome: "Brenda Gontijo", partido: "Novo", nr: "30500", v: 0.7 },
        { nome: "Jamil Calife", partido: "PP", nr: "11000", v: 0.7 },
        { nome: "Lincoln Tejota", partido: "União", nr: "44789", v: 0.7 },
        { nome: "Lucas Kitão", partido: "Mobiliza", nr: "33100", v: 0.7 },
        { nome: "Virmondes Cruvinel", partido: "União", nr: "44321", v: 0.7 },
        { nome: "Vivian Naves", partido: "Republicanos", nr: "10111", v: 0.7 },
        { nome: "Wagner Neto", partido: "Solidariedade", nr: "77123", v: 0.7 },
        { nome: "Antonio Gomide", partido: "PT", nr: "13456", v: 0.6 },
        { nome: "Felipe Cortez", partido: "Mobiliza", nr: "33900", v: 0.6 },
        { nome: "Felipe Mabel", partido: "Podemos", nr: "20700", v: 0.6 },
        { nome: "Henrique Cesar", partido: "Podemos", nr: "20100", v: 0.6 },
        { nome: "Rafael Marra", partido: "Podemos", nr: "20026", v: 0.6 },
        { nome: "Rosângela Rezende", partido: "Agir", nr: "36456", v: 0.6 },
        { nome: "Alessandro Moreira", partido: "PRD", nr: "25111", v: 0.5 },
        { nome: "Bia de Lima", partido: "PT", nr: "13123", v: 0.5 },
        { nome: "Carlão da Fox", partido: "MDB", nr: "15000", v: 0.5 },
        { nome: "Carlinhos Canzi", partido: "PL", nr: "22111", v: 0.5 },
        { nome: "Coronel Adailton", partido: "Solidariedade", nr: "77190", v: 0.5 },
        { nome: "Cristóvão", partido: "PRD", nr: "25333", v: 0.5 },
        { nome: "Dieyme Vasconcelos", partido: "PL", nr: "22220", v: 0.5 },
        { nome: "Dr. Helio de Sousa", partido: "PSDB", nr: "45789", v: 0.5 },
        { nome: "Fabricio Rosa", partido: "PT", nr: "13000", v: 0.5 },
        { nome: "Fred Vidigal", partido: "Mobiliza", nr: "33456", v: 0.5 },
        { nome: "Gil Tavares", partido: "Mobiliza", nr: "33010", v: 0.5 },
        { nome: "Graciele da Arte Trigo", partido: "Agir", nr: "36555", v: 0.5 },
        { nome: "Isaac Martins", partido: "Podemos", nr: "20456", v: 0.5 },
        { nome: "João Alberto Rodrigues", partido: "PRD", nr: "25123", v: 0.5 },
        { nome: "Keke da Vulkanic", partido: "Mobiliza", nr: "33777", v: 0.5 },
        { nome: "Lissauer Vieira", partido: "PL", nr: "22333", v: 0.5 },
        { nome: "Magal", partido: "PSDB", nr: "45000", v: 0.5 },
        { nome: "Major Eldecírio", partido: "Mobiliza", nr: "33000", v: 0.5 },
        { nome: "Mauro Rubem", partido: "PT", nr: "13789", v: 0.5 },
        { nome: "Misael", partido: "Novo", nr: "30030", v: 0.5 },
        { nome: "Talles Barreto", partido: "União", nr: "44123", v: 0.5 },
        { nome: "Veter Martins", partido: "PSB", nr: "40123", v: 0.5 },
        { nome: "Willian Panda", partido: "Podemos", nr: "20800", v: 0.5 },
        { nome: "Bessa", partido: "Mobiliza", nr: "33700", v: 0.4 },
        { nome: "Bia", partido: "PSD", nr: "55223", v: 0.4 },
        { nome: "Coronel Edson Raiado", partido: "PSD", nr: "55777", v: 0.4 },
        { nome: "Cristiano Galindo", partido: "Solidariedade", nr: "77099", v: 0.4 },
        { nome: "Débora Domingues", partido: "Podemos", nr: "20000", v: 0.4 },
        { nome: "Dr. Amarildo", partido: "Novo", nr: "30111", v: 0.4 },
        { nome: "Fabio Correa", partido: "Agir", nr: "36111", v: 0.4 },
        { nome: "Karlos Cabral", partido: "PSB", nr: "40456", v: 0.4 },
        { nome: "Katia Maria", partido: "Solidariedade", nr: "77600", v: 0.4 },
        { nome: "Magrão da Rádio", partido: "Podemos", nr: "20111", v: 0.4 },
        { nome: "Nárcia Kelly", partido: "PP", nr: "11111", v: 0.4 },
        { nome: "Paulin Vai Nele", partido: "PRD", nr: "25555", v: 0.4 },
        { nome: "Sandes Junior", partido: "Republicanos", nr: "10022", v: 0.4 },
        { nome: "Sergio Bravo", partido: "Mobiliza", nr: "33999", v: 0.4 },
        { nome: "Zé da Imperial", partido: "Mobiliza", nr: "33070", v: 0.4 },
        { nome: "Cabo Senna", partido: "Mobiliza", nr: "33190", v: 0.3 },
        { nome: "Coronel Urzeda", partido: "PL", nr: "22001", v: 0.3 },
        { nome: "Daniel Messac", partido: "Mobiliza", nr: "33500", v: 0.3 },
        { nome: "Dra. Fernanda Sarelli", partido: "Novo", nr: "30456", v: 0.3 },
        { nome: "Fábio Fayad", partido: "PSDB", nr: "45888", v: 0.3 },
        { nome: "Gustavo da Popular", partido: "Republicanos", nr: "10555", v: 0.3 },
        { nome: "Leandro Ribeiro", partido: "Mobiliza", nr: "33400", v: 0.3 },
        { nome: "Leandro Ventura", partido: "Novo", nr: "30333", v: 0.3 },
        { nome: "Léo Portilho", partido: "Podemos", nr: "20500", v: 0.3 },
        { nome: "Márcio Luís", partido: "Mobiliza", nr: "33123", v: 0.3 },
        { nome: "Nayara Barcelos", partido: "Novo", nr: "30022", v: 0.3 },
        { nome: "Neto Karfan", partido: "Novo", nr: "30000", v: 0.3 },
        { nome: "Samuel Almeida", partido: "PSD", nr: "55123", v: 0.3 },
        { nome: "Simeyzon", partido: "Mobiliza", nr: "33333", v: 0.3 },
        { nome: "Abimael Silva da TV", partido: "MDB", nr: "15200", v: 0.2 },
        { nome: "Álvaro Guimarães", partido: "Republicanos", nr: "10122", v: 0.2 },
        { nome: "Baiano dos Cocos", partido: "", nr: "—", v: 0.2 },
        { nome: "Carpegiane Silvestre", partido: "Mobiliza", nr: "33555", v: 0.2 },
        { nome: "Cassiana Tormin", partido: "PT", nr: "13333", v: 0.2 },
        { nome: "Coronel Hemerson", partido: "Democrata", nr: "35190", v: 0.2 },
        { nome: "Coronel Marreiros", partido: "Democrata", nr: "35800", v: 0.2 },
        { nome: "Denis Bento", partido: "Podemos", nr: "20020", v: 0.2 },
        { nome: "Dinair Dino Rodas", partido: "DC", nr: "27300", v: 0.2 },
        { nome: "Dr. Kassio Guimaraes", partido: "Agir", nr: "36000", v: 0.2 },
        { nome: "Eliane Nascimento", partido: "Democrata", nr: "35300", v: 0.2 },
        { nome: "Eneas Amaral", partido: "Podemos", nr: "20666", v: 0.2 },
        { nome: "Enio Brito", partido: "PSOL", nr: "50777", v: 0.2 },
        { nome: "Fernando Sales", partido: "MDB", nr: "15070", v: 0.2 },
        { nome: "George Maranhão", partido: "Democrata", nr: "35035", v: 0.2 },
        { nome: "Irineu", partido: "PRD", nr: "25321", v: 0.2 },
        { nome: "José de Lima", partido: "Novo", nr: "30640", v: 0.2 },
        { nome: "Kenia Vanusse", partido: "Agir", nr: "36600", v: 0.2 },
        { nome: "Kesley", partido: "Republicanos", nr: "10000", v: 0.2 },
        { nome: "Kleybe Morais", partido: "Democrata", nr: "35700", v: 0.2 },
        { nome: "Léo de Oliveira", partido: "PSD", nr: "55000", v: 0.2 },
        { nome: "Lívio Luciano", partido: "Democrata", nr: "35015", v: 0.2 },
        { nome: "Lucília do Recanto", partido: "", nr: "—", v: 0.2 },
        { nome: "Luís Costa", partido: "Republicanos", nr: "10777", v: 0.2 },
        { nome: "Malaquias", partido: "Mobiliza", nr: "33789", v: 0.2 },
        { nome: "Márcio Gordo", partido: "PSD", nr: "55800", v: 0.2 },
        { nome: "Marckennedy", partido: "Novo", nr: "30234", v: 0.2 },
        { nome: "Marco Aurélio", partido: "PSDB", nr: "45030", v: 0.2 },
        { nome: "Marina Morena", partido: "PSDB", nr: "45456", v: 0.2 },
        { nome: "Marquinho", partido: "PL", nr: "22221", v: 0.2 },
        { nome: "Meiranny Reis", partido: "PSDB", nr: "45633", v: 0.2 },
        { nome: "Michele Diniz", partido: "PRD", nr: "25145", v: 0.2 },
        { nome: "Motorista Dançarino", partido: "Mobiliza", nr: "33444", v: 0.2 },
        { nome: "Professor Antônio Ávila", partido: "Democrata", nr: "35333", v: 0.2 },
        { nome: "Professor Marcos Junior", partido: "Podemos", nr: "20321", v: 0.2 },
        { nome: "Professor Zenilton", partido: "PSDB", nr: "45123", v: 0.2 },
        { nome: "Rafael Vasconcelos", partido: "PL", nr: "22700", v: 0.2 },
        { nome: "Ricardo Fortunato", partido: "Democrata", nr: "35123", v: 0.2 },
        { nome: "Roni Ferreira", partido: "Republicanos", nr: "10010", v: 0.2 },
        { nome: "Tenente-Coronel Nilson", partido: "", nr: "—", v: 0.2 },
        { nome: "Tenente Rosy", partido: "MDB", nr: "15190", v: 0.2 },
        { nome: "Terezinha Amaral", partido: "MDB", nr: "15789", v: 0.2 },
        { nome: "Tite D Caprio", partido: "Republicanos", nr: "10789", v: 0.2 },
        { nome: "Vanilson Bueno", partido: "Podemos", nr: "20015", v: 0.2 },
        { nome: "Waltinho", partido: "Novo", nr: "30222", v: 0.2 },
        { nome: "Welton Lemos", partido: "Novo", nr: "30100", v: 0.2 }
      ]
    }
  ]
};

