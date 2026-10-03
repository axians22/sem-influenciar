/* Dados das Eleições 2026 — coletados em 03/10/2026.
   Toda informação aqui tem fonte rastreável; ver /dados/*.md no repositório.
   Fontes primárias: CSV oficial do TSE (dadosabertos.tse.jus.br), camara.leg.br,
   senado.leg.br, tse.jus.br, datafolha.folha.uol.com.br, poder360.com.br,
   agenciabrasil.ebc.com.br. */

import type { Meta, Candidato, StatusInfo } from "./types";

export const META: Meta = {
  turno1: "2026-10-04",
  turno2: "2026-10-25",
  coletadoEm: "03/10/2026",
  fonteCalendario: "https://www.tse.jus.br/comunicacao/noticias/2026/Marco/eleicoes-2026-confira-as-principais-datas-do-calendario-eleitoral"
};

/* ---------- PRESIDENTE: 13 chapas (CSV oficial do TSE) ---------- */
export const PRESIDENTE: Candidato[] = [
  {
    num: 13, urna: "LULA", nome: "Luiz Inácio Lula da Silva", partido: "PT",
    vice: "Geraldo Alckmin (PSB)",
    coligacao: "Brasil Pronto pra Mais (PSB · PDT · Fed. Brasil da Esperança · Fed. PSOL-Rede)",
    situacao: "Deferida", nasc: "06/10/1945", idade: 80,
    trajetoria: "Torneiro mecânico e líder sindical no ABC paulista. Fundador do PT (1980). Presidente da República 2003–2010 e desde 2023.",
    receita: 87427671,
    receitaNota: "Dos quais R$ 85,15 mi vieram do próprio PT, equivalente a 97,4% do total. Maior doação de pessoa física: Erasmo Carlos Battistella, R$ 500 mil. Valor do arquivo oficial de prestação de contas do TSE, gerado em 03/10/2026, parcial.",
    plano: "Diretrizes para o Programa de Transformação do Brasil (84 págs.)",
    propostas: {
      economia: "Crescimento com redução de desigualdades e responsabilidade fiscal. Isenção de Imposto de Renda até R$ 5 mil, compensada por taxação de super-ricos.",
      seguranca: "Criação do Ministério da Segurança Pública via PEC, fortalecimento do SUSP e asfixia financeira do crime organizado.",
      saude: "Ampliação do Farmácia Popular e criação de rede nacional de combate ao câncer.",
      educacao: "Ensino integral, expansão dos institutos federais e continuidade do Pé-de-Meia.",
      ambiente: "Desmatamento líquido zero até 2030. Classificado como o programa mais ambientalmente ambicioso entre os favoritos pelo Observatório do Clima.",
      externa: "Multilateralismo, fortalecimento dos BRICS e do Mercosul, defesa da reforma da ONU."
    },
    fontes: [
      { t: "Plano de governo registrado no TSE", u: "https://www.congressoemfoco.com.br/noticia/121121/pt-registra-novo-plano-de-governo-de-lula-no-tse-veja-a-integra" },
      { t: "Doações de campanha (Poder360)", u: "https://www.poder360.com.br/poder-eleicoes-2026/campanha-de-lula-recebe-r-773-milhoes-em-doacoes-antes-do-1o-turno/" }
    ],
    processos: [
      {
        caso: "Triplex do Guarujá e sítio de Atibaia (Operação Lava Jato)",
        status: "anulado",
        statusTexto: "Anulado pelo STF",
        detalhe: "Condenado em 1ª e 2ª instância (TRF-4) e preso entre 2018 e 2019. Em 2021 o STF anulou as condenações por incompetência do juízo de Curitiba — os fatos não tinham relação com a Petrobras — decisão do ministro Fachin confirmada por 8 a 3 no Plenário. Em julgamento posterior o STF declarou a suspeição do então juiz Sergio Moro. A anulação é processual, não absolvição de mérito. A elegibilidade foi restabelecida.",
        fonte: "https://www.migalhas.com.br/quentes/343754/stf-derruba-condenacoes-de-lula-na-lava-jato"
      }
    ],
    processosNota: "Nenhum processo ativo identificado para o ciclo eleitoral de 2026."
  },
  {
    num: 22, urna: "FLAVIO BOLSONARO", nome: "Flávio Nantes Bolsonaro", partido: "PL",
    vice: "Alfredo Gaspar de Mendonça Neto (PL)", coligacao: "Sem coligação",
    situacao: "Deferida", nasc: "30/04/1981", idade: 45,
    trajetoria: "Filho mais velho de Jair Bolsonaro. Deputado estadual no Rio de Janeiro de 2003 a 2018 (4 mandatos), candidato a prefeito do Rio em 2016 (4º lugar) e senador pelo RJ desde 2019, quando foi o mais votado da história do estado.",
    receita: 62046950,
    receitaNota: "Dos quais R$ 55,2 mi vieram do PL, equivalente a 89% do total. Maior doação de pessoa física: Luiz da Rocha Salles Filho, R$ 1 mi. Valor do arquivo oficial de prestação de contas do TSE, gerado em 03/10/2026, parcial.",
    plano: "Para o Brasil Vencer o Atraso (76 págs.)",
    propostas: {
      economia: "Corte de 10 ministérios, redução de impostos sobre energia e combustíveis, revisão da reforma tributária.",
      seguranca: "Classificar facções como narcoterroristas, reduzir a maioridade penal de 18 para 14 anos em crimes graves, castração química para crimes sexuais.",
      saude: "Prontuário eletrônico único vinculado ao CPF.",
      educacao: "Método fônico na alfabetização, escolas cívico-militares, voucher para creches privadas.",
      ambiente: "Meta de zerar apenas o desmatamento ilegal até 2029. O Observatório do Clima classifica a maioria das propostas como antiambientais.",
      externa: "Alinhamento com os Estados Unidos, estuda saída dos BRICS e defende 'livrar-se das amarras do Mercosul'."
    },
    fontes: [
      { t: "Propostas (Agência Brasil)", u: "https://agenciabrasil.ebc.com.br/politica/noticia/2026-09/flavio-bolsonaro-propoe-enxugar-estado-e-endurecer-acoes-de-seguranca" },
      { t: "Doações de campanha (Poder360)", u: "https://www.poder360.com.br/poder-eleicoes-2026/campanha-de-flavio-recebe-r-62-milhoes-em-doacoes-antes-do-1o-turno/" }
    ],
    processos: [
      {
        caso: "Caso das 'rachadinhas' na Alerj",
        status: "arquivado",
        statusTexto: "Arquivado por nulidade das provas",
        detalhe: "Investigação sobre suposto desvio de salários de assessores quando era deputado estadual, com suspeita de lavagem de dinheiro. Em 2020 o MP-RJ denunciou Flávio, Fabrício Queiroz e mais 15 pessoas. Em 2021 o STJ anulou as decisões da 1ª instância por questão de foro; em seguida o Órgão Especial do TJ-RJ rejeitou a denúncia. A 2ª Turma do STF anulou 4 dos 5 relatórios do Coaf que embasavam a acusação — o relator Gilmar Mendes falou em 'investigação disfarçada', com Fachin vencido. Em setembro de 2025 o TJ-RJ rejeitou novo pedido de quebra de sigilo e em fevereiro de 2026 Gilmar Mendes negou os recursos do MP para reabrir o caso. Não houve denúncia aceita nem condenação.",
        fonte: "https://noticias.stf.jus.br/postsnoticias/2a-turma-decide-que-provas-contra-flavio-bolsonaro-no-caso-das-chamadas-rachadinhas-sao-ilegais/"
      },
      {
        caso: "Ação de investigação judicial eleitoral no TSE",
        status: "tramitacao",
        statusTexto: "Em tramitação",
        detalhe: "Em setembro de 2026 a coligação de Lula acionou o TSE contra Flávio e Eduardo Bolsonaro, alegando uso indevido dos meios de comunicação e abuso de poder por suposto apoio do governo dos Estados Unidos à candidatura. É uma ação movida por adversário político e não há julgamento.",
        fonte: "https://conjur.com.br/2026-set-24/lula-imputa-a-flavio-abusos-que-renderam-condenacoes-paradigmaticas-no-tse/"
      }
    ],
    contexto: "Seu pai, Jair Bolsonaro, cumpre pena de 27 anos e 3 meses por tentativa de golpe de Estado e está inelegível."
  },
  {
    num: 55, urna: "RONALDO CAIADO", nome: "Ronaldo Ramos Caiado", partido: "PSD",
    vice: "Gilberto Kassab (PSD)", coligacao: "Sem coligação",
    situacao: "Deferida (validada em 04/09/2026)", nasc: "25/09/1949", idade: 77,
    trajetoria: "Médico ortopedista e fundador da UDR nos anos 1980. Deputado federal, senador e governador de Goiás (eleito em 2018, reeleito em 2022). Migrou para o PSD em 2026 e renunciou ao governo de Goiás em 31/03/2026 para disputar a Presidência.",
    receita: 13190971,
    receitaNota: "Receita declarada ao TSE. Valor do arquivo oficial de prestação de contas do TSE, gerado em 03/10/2026, parcial.",
    plano: "Sou Ronaldo Caiado (26 temas, 100 págs.)",
    propostas: {
      economia: "'Orçamento da Verdade' e elevação do investimento público de 17% para 25% do PIB.",
      seguranca: "Criação do Ministério da Segurança e classificação de PCC e Comando Vermelho como terrorismo doméstico em certas condições.",
      saude: "SUS com prontuário interoperável e hospitais remunerados por resultado.",
      educacao: "Alfabetização na idade certa e expansão do ensino técnico.",
      ambiente: "Não localizado detalhamento no material consultado.",
      externa: "Não localizado detalhamento no material consultado."
    },
    fontes: [
      { t: "Íntegra do plano de governo (Poder360)", u: "https://www.poder360.com.br/poder-eleicoes-2026/leia-a-integra-do-plano-de-governo-de-ronaldo-caiado/" }
    ],
    processos: [
      {
        caso: "Abuso de poder político no uso do Palácio das Esmeraldas",
        status: "condenado2",
        statusTexto: "Condenado em 2ª instância — cabe recurso",
        detalhe: "Condenado em 1ª e 2ª instância pelo TRE-GO por usar o Palácio das Esmeraldas na campanha de um aliado em 2024. Em abril de 2025 o TRE-GO manteve a condenação mas afastou a pena de inelegibilidade, preservando apenas a multa de R$ 60 mil. Há recurso do PL pendente no TSE para restabelecer a inelegibilidade. Não é decisão final.",
        fonte: "https://agenciabrasil.ebc.com.br/justica/noticia/2025-04/tre-go-afasta-inelegibilidade-de-governador-ronaldo-caiado"
      },
      {
        caso: "Ação de improbidade pelo uso de 51 policiais militares",
        status: "tramitacao",
        statusTexto: "Em tramitação",
        detalhe: "O MP-GO acionou Ronaldo e Gracinha Caiado por improbidade administrativa pelo emprego de 51 policiais militares na segurança pessoal da família, pedindo ressarcimento de R$ 1.290.856,55. Sem julgamento final.",
        fonte: "https://www.goias246.com.br/noticia/33469/politica/mp-aciona-caiado-e-gracinha-por-improbidade-administrativa-em-caso-de-seguranca-pessoal-com-51-pms.html"
      },
      {
        caso: "Operação Ilicitantes — fraude em licitação do Fundeb",
        status: "investigacao",
        statusTexto: "Sob investigação — sem indiciamento dele",
        detalhe: "Investigação sobre fraude em licitação na Secretaria de Educação de Goiás. Não foi identificado indiciamento contra Caiado pessoalmente.",
        fonte: "https://www.jornalopcao.com.br/ultimas-noticias/servidor-terceirizado-e-investigado-pela-policia-federal-por-fraude-em-licitacao-da-secretaria-de-educacao-732325/"
      },
      {
        caso: "Movimentação de R$ 1,36 bi na fintech BK Bank",
        status: "investigacao",
        statusTexto: "Pedido de investigação — sem inquérito confirmado",
        detalhe: "O governo de Goiás movimentou R$ 1,36 bilhão por meio de fintech sob suspeita de ligação com o PCC. Houve pedido de investigação formulado por parlamentar, sem confirmação de inquérito formal contra Caiado.",
        fonte: "https://revistaoeste.com/politica/governo-de-goias-movimentou-r-136-bilhao-em-fintech-suspeita-de-ligacao-com-o-pcc/"
      }
    ]
  },
  {
    num: 14, urna: "RENAN SANTOS", nome: "Renan Santos", partido: "MISSÃO",
    vice: "Coronel Medina (Missão)", coligacao: "Sem coligação",
    situacao: "Deferida", nasc: null, idade: null,
    trajetoria: "Empresário, com superior incompleto. Foi um dos fundadores do Movimento Brasil Livre. Não tem histórico eleitoral anterior, segundo o TSE.",
    receita: 2690130,
    receitaNota: "Quase 89% via financiamento coletivo pela plataforma Queroapoiar, o maior percentual de arrecadação popular entre os presidenciáveis. Patrimônio declarado de R$ 795.089,00. Valor do arquivo oficial de prestação de contas do TSE, gerado em 03/10/2026, parcial.",
    plano: "Livro Amarelo",
    propostas: {
      economia: "Ajuste fiscal com desindexação de despesas via PEC do Equilíbrio Fiscal, desvinculação dos pisos de saúde, educação e Fundeb, reforma do funcionalismo e combate a supersalários. Propõe as Frentes Cidadãs, substituindo o Bolsa Família por trabalho remunerado em prol da comunidade.",
      seguranca: "Adota o Direito Penal do Inimigo como marco jurídico e decreta a Guerra ao Crime. Inclui inversão do ônus da prova e confisco de bens de faccionados, superpresídios de segurança máxima em regiões remotas no modelo CECOT, uso de GLO e Estado de Defesa para retomada territorial e tecnologia preditiva com drones e reconhecimento facial.",
      saude: "Prontuário Eletrônico Nacional Interoperável e telessaúde com inteligência artificial, Escala Nacional de Estratificação de Risco para organizar filas por gravidade, modelo hub-and-spoke para centralizar casos complexos e Fundo Nacional de Modernização do Acesso com repasses condicionados.",
      educacao: "Alfabetização universal pelo método fônico, código de conduta disciplinar estudantil com ranking de disciplina, escolas cívico-militares em áreas de alta criminalidade e reforma do ensino superior com foco em STEM, substituindo cotas por bolsas de mérito.",
      ambiente: "Zonas Econômicas Especiais para terras raras, transição verde e semicondutores. Soberania em fertilizantes com licenciamento acelerado para minerais estratégicos.",
      externa: "Atuação como árbitro do Sul Global, pragmatismo institucional com distanciamento de alinhamentos ideológicos, Pacto Interamericano contra o narcotráfico, autonomia do ciclo de combustível nuclear e expansão do SISFRON nas fronteiras."
    },
    fontes: [
      { t: "TSE · propostas de governo registradas", u: "https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/renan-santos-propostas-de-governo" },
      { t: "TSE · prestação de contas eleitorais 2026", u: "https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026" }
    ],
    processos: [],
    processosNota: "Não foi feita busca dedicada ao histórico judicial deste candidato, portanto a ausência de registros aqui é menos conclusiva que nos demais.",
    destaque: "Plano com propostas detalhadas em 8 eixos no TSE"
  },
  {
    num: 30, urna: "ZEMA", nome: "Romeu Zema Neto", partido: "NOVO",
    vice: "Eduardo Girão (NOVO)", coligacao: "Sem coligação",
    situacao: "Deferida (validada em 04/09/2026)", nasc: "28/10/1964", idade: 61,
    trajetoria: "Empresário do Grupo Zema. Governador de Minas Gerais eleito em 2018 e reeleito em 2022. Renunciou em 22/03/2026 para concorrer à Presidência.",
    receita: 5446579,
    receitaNota: "Receita declarada ao TSE. Valor do arquivo oficial de prestação de contas do TSE, gerado em 03/10/2026, parcial.",
    plano: "Plano Implacável (81 págs.)",
    propostas: {
      economia: "Privatização de todas as estatais federais, nova reforma da Previdência e fim dos supersalários.",
      seguranca: "Classificação de facções como terroristas, maior integração entre Forças Armadas e polícias, redução da maioridade penal para 16 anos.",
      saude: "Uso da capacidade ociosa da rede privada para zerar filas do SUS.",
      educacao: "Revisão da BNCC e regulamentação do ensino domiciliar.",
      ambiente: "Detalhamento ambiental limitado no plano registrado.",
      externa: "Defende a proposta mais radical de saída dos BRICS entre os candidatos favoritos."
    },
    fontes: [
      { t: "Propostas (Estado de Minas)", u: "https://www.em.com.br/politica/2026/08/7475589-plano-implacavel-veja-as-propostas-de-zema-na-disputa-pela-presidencia.html" }
    ],
    processos: [
      {
        caso: "Declarações sobre flexibilizar trabalho infantil",
        status: "investigacao",
        statusTexto: "Notícia de fato — fase preliminar",
        detalhe: "O Ministério Público do Trabalho apura declarações dadas em podcast em maio de 2026 sobre flexibilizar o trabalho infantil. Está em fase preliminar, sem denúncia.",
        fonte: "https://www.poder360.com.br/poder-justica/mpt-investiga-fala-de-zema-sobre-trabalho-infantil/"
      },
      {
        caso: "Representação no TCE-MG sobre empresas ligadas a Daniel Vorcaro",
        status: "investigacao",
        statusTexto: "Análise técnica preliminar",
        detalhe: "Representação apresentada em 24/09/2026 por suposto favorecimento a empresas ligadas a Daniel Vorcaro, do Banco Master, na Serra do Curral. Em análise técnica preliminar, sem exame de mérito.",
        fonte: "https://www.otempo.com.br/politica/2026/9/24/governo-zema-e-denunciado-ao-tce-por-relacao-com-mineradora-de-vorcaro-na-serra-do-curral"
      },
      {
        caso: "Contas do governo de 2022 no TCE-MG",
        status: "tramitacao",
        statusTexto: "Julgamento suspenso",
        detalhe: "A análise das contas de 2022 foi suspensa por pedido de vista, sem decisão final localizada.",
        fonte: "https://www.tce.mg.gov.br/TCEMG-retoma-analise-das-contas-de-2022-do-governador-Zema-na-quarta-feira-04-09-.html/Noticia/1111627474"
      }
    ]
  },
  {
    num: 70, urna: "ESCRITOR AUGUSTO CURY", nome: "Augusto Jorge Cury", partido: "AVANTE",
    vice: "Julio Cesar Delgado (AVANTE)", coligacao: "Brasil dos Nossos Sonhos (AGIR · AVANTE)",
    situacao: "Deferida", nasc: null, idade: 67,
    trajetoria: "Escritor e psiquiatra, natural de Colina (SP), com mais de 40 milhões de livros vendidos. É sua primeira candidatura.",
    receita: 3556351,
    receitaNota: "Receita declarada ao TSE. Patrimônio pessoal declarado de R$ 242,3 mi. Valor do arquivo oficial de prestação de contas do TSE, gerado em 03/10/2026, parcial.",
    plano: "Plano próprio registrado no TSE",
    propostas: {
      economia: "Redução do Estado e fundo de até R$ 50 bi para empreendedores. Defende o semipresidencialismo.",
      seguranca: "Integração policial com uso de inteligência artificial e drones.",
      saude: "Telemedicina nacional, rede de prevenção ao câncer e programa de saúde mental.",
      educacao: "Escola integral como 'clube de desenvolvimento humano' e gestão emocional no currículo.",
      ambiente: "Não localizado detalhamento no material consultado.",
      externa: "Não localizado detalhamento no material consultado."
    },
    fontes: [
      { t: "Plano de governo (Terra)", u: "https://www.terra.com.br/noticias/eleicoes/eleicoes-2026-plano-de-augusto-cury-preve-semipresidencialismo-gestao-da-emocao-e-telemedicina,275f8d4dd7b40fb5b714d19aeb7b0f1c9tfiftut.html" }
    ],
    processos: [
      {
        caso: "Ação da Bradesco Saúde por inadimplência",
        status: "tramitacao",
        statusTexto: "Em andamento",
        detalhe: "Ação cível movida pela Bradesco Saúde por não pagamento de plano de saúde. Trata-se de litígio civil, sem natureza criminal.",
        fonte: "https://www.metropoles.com/colunas/demetrio-vecchioli/candidato-mais-rico-augusto-cury-e-processado-por-nao-pagar-plano-de-saude"
      }
    ],
    processosNota: "Nenhuma condenação criminal ou eleitoral localizada. Há controvérsia pública — não judicial — sobre titulação acadêmica e acusações de pseudociência."
  },
  {
    num: 35, urna: "VETERINÁRIO WILSON GRASSI", nome: "Wilson Grassi Junior", partido: "DEMOCRATA",
    vice: "Suêd Haidar Nogueira", coligacao: "Sem coligação",
    situacao: "Oficializada em convenção (02/08/2026)", nasc: null, idade: 56,
    trajetoria: "Veterinário. Disputou sem sucesso as eleições de deputado federal pelo PV em 2022 e de vereador em São Paulo pelo PRTB em 2024.",
    receita: 1050150,
    receitaNota: "Praticamente toda a arrecadação é de recursos próprios, pois não tem acesso ao Fundo Eleitoral. Patrimônio declarado de R$ 50 mi. Valor do arquivo oficial de prestação de contas do TSE, gerado em 03/10/2026, parcial.",
    plano: "Brasil em Primeiro Lugar (58 págs.)",
    propostas: {
      economia: "Instituição de um Imposto Único Federal.",
      seguranca: "Criação de sistema penitenciário federal de segurança máxima.",
      saude: "Conceito de 'Saúde Única', integrando saúde humana, animal e ambiental.",
      educacao: "PEC da Pesquisa, voltada a pesquisadores.",
      ambiente: "Contemplado pelo conceito de Saúde Única.",
      externa: "Não localizado detalhamento no material consultado."
    },
    fontes: [
      { t: "Propostas (Agência Brasil)", u: "https://agenciabrasil.ebc.com.br/politica/noticia/2026-09/wilson-grassi-defende-imposto-unico-e-mais-rigor-contra-faccoes" }
    ],
    processos: [
      {
        caso: "Improbidade na gestão do Hospital Veterinário Público de Taubaté",
        status: "tramitacao",
        statusTexto: "Ação civil em curso — bens bloqueados",
        detalhe: "Ação civil pública do Ministério Público por suposto sobrepreço e desvio de recursos em contrato com a Anclivepa. Os bens estão bloqueados desde dezembro de 2025. Não há condenação definitiva.",
        fonte: "https://t7news.com.br/noticia/candidato-a-presidencia-responde-a-acao-por-contrato-de-hospital-veterinario-em-taubate"
      }
    ]
  },
  {
    num: 27, urna: "CLARIANA BARÃO", nome: "Clariana Zacarkim Barão", partido: "DC",
    vice: "Fabiana Cristina Tavares Torquato (DC)", coligacao: "Sem coligação",
    situacao: "Deferida", nasc: "03/04/1987", idade: 39,
    trajetoria: "Advogada, natural de Cuiabá (MT), preside o DC no Mato Grosso. É a primeira candidata do partido desde 1998 que não é José Maria Eymael.",
    receita: 1513500,
    receitaNota: "Receita declarada ao TSE. Valor do arquivo oficial de prestação de contas do TSE, gerado em 03/10/2026, parcial.",
    plano: "Plano registrado no TSE",
    propostas: {
      economia: "Simplificação regulatória para negócios e fim da escala 6x1.",
      seguranca: "Não localizado detalhamento no material consultado.",
      saude: "Ênfase em medicina preventiva.",
      educacao: "Alfabetização na idade certa.",
      ambiente: "É a única candidatura sem propostas ambientais no plano registrado, segundo comparativo do Terra.",
      externa: "Cooperação internacional contra o tráfico e posição favorável ao acordo Mercosul-União Europeia."
    },
    fontes: [
      { t: "Propostas (Agência Brasil)", u: "https://agenciabrasil.ebc.com.br/politica/noticia/2026-09/clariana-barao-prioriza-propostas-de-protecao-mulher-e-infancia" }
    ],
    processos: [],
    processosNota: "Nenhum registro relevante. Consta em 5 processos eleitorais de natureza procedimental — 2 como ré em propaganda eleitoral e 3 como autora — sem condenação.",
    destaque: "Chapa 100% feminina"
  },
  {
    num: 21, urna: "EDMILSON COSTA", nome: "Edmilson Silva Costa", partido: "PCB",
    vice: "Cleusa dos Santos (PCB)", coligacao: "Sem coligação",
    situacao: "Deferida", nasc: null, idade: 76,
    trajetoria: "Natural de Pedreiras (MA). Secretário-geral do PCB desde 2016 e candidato a vice-presidente em 2010. É a primeira vez como cabeça de chapa.",
    receita: 27171,
    receitaNota: "Receita declarada ao TSE. Patrimônio de R$ 454.485,68. Valor do arquivo oficial de prestação de contas do TSE, gerado em 03/10/2026, parcial.",
    plano: "Plano registrado no TSE",
    propostas: {
      economia: "Nacionalização do sistema financeiro, salário mínimo calculado pelo Dieese (cerca de R$ 8 mil) e jornada de 30 horas.",
      seguranca: "Não localizado detalhamento no material consultado.",
      saude: "Saúde 100% estatal.",
      educacao: "Educação 100% estatal e fim do vestibular.",
      ambiente: "Não localizado detalhamento no material consultado.",
      externa: "Não localizado detalhamento no material consultado."
    },
    fontes: [
      { t: "Propostas (O Tempo)", u: "https://www.otempo.com.br/eleicoes/2026/presidentes/2026/10/4/saude-e-educacao-100-estatais-extincao-do-senado-e-fim-do-vestibular-o-que-propoe-edmilson-costa" }
    ],
    processos: [],
    processosNota: "Nenhum registro relevante encontrado.",
    destaque: "Defende a extinção do Senado"
  },
  {
    num: 16, urna: "HERTZ DIAS", nome: "Hertz da Conceição Dias", partido: "PSTU",
    vice: "Vanessa Portugal Barbosa (PSTU)", coligacao: "Sem coligação",
    situacao: "Deferida", nasc: "20/10/1970", idade: 55,
    trajetoria: "Professor e rapper, natural de São José de Ribamar (MA). Já disputou eleições em 2010, 2018, 2020 e 2022.",
    receita: 1143790,
    receitaNota: "Receita declarada ao TSE. É o único presidenciável sem bens declarados. Valor do arquivo oficial de prestação de contas do TSE, gerado em 03/10/2026, parcial.",
    plano: "Plano registrado no TSE",
    propostas: {
      economia: "Fim da escala 6x1, jornada de 36 horas, dobrar o salário mínimo e estatizar grandes empresas.",
      seguranca: "Desmilitarização da Polícia Militar.",
      saude: "Descriminalização do aborto.",
      educacao: "Não localizado detalhamento no material consultado.",
      ambiente: "Oposição à exploração de petróleo na Margem Equatorial.",
      externa: "Não localizado detalhamento no material consultado."
    },
    fontes: [
      { t: "Propostas (Metrópoles)", u: "https://www.metropoles.com/brasil/em-plano-presidenciavel-do-pstu-propoe-enfrentar-o-imperialismo" }
    ],
    processos: [],
    processosNota: "Nenhum registro relevante encontrado."
  },
  {
    num: 29, urna: "RUI COSTA PIMENTA", nome: "Rui Costa Pimenta", partido: "PCO",
    vice: "Antônio Carlos Silva (PCO)", coligacao: "Sem coligação",
    situacao: "Deferida", nasc: "25/06/1957", idade: 69,
    trajetoria: "Jornalista, cofundador do PT em 1980 e presidente nacional do PCO desde 1995. Esta é sua quinta candidatura presidencial, após 2002, 2006, 2010 e 2014.",
    receita: 8496,
    receitaNota: "Arrecadação integralmente por financiamento coletivo. Declarou não possuir bens. Valor do arquivo oficial de prestação de contas do TSE, gerado em 03/10/2026, parcial.",
    plano: "Plano registrado no TSE",
    propostas: {
      economia: "Reestatização da Eletrobras e da Vale, nacionalização do petróleo, aumento de 50% nos salários e jornada de 35 horas.",
      seguranca: "Dissolução da Polícia Militar.",
      saude: "Não localizado detalhamento no material consultado.",
      educacao: "Não localizado detalhamento no material consultado.",
      ambiente: "Não localizado detalhamento no material consultado.",
      externa: "Não localizado detalhamento no material consultado."
    },
    fontes: [
      { t: "Propostas (O Tempo)", u: "https://www.otempo.com.br/eleicoes/2026/presidentes/2026/10/4/fechamento-do-stf-dissolucao-da-pm-e-salario-minimo-a-r-7-5-mil-o-que-defende-rui-costa-pimenta" }
    ],
    processos: [
      {
        caso: "Calúnia e difamação contra o deputado Kim Kataguiri",
        status: "condenado2",
        statusTexto: "Condenado em 2ª instância",
        detalhe: "Condenação confirmada pelo TJDFT em 11/07/2025 por associar o deputado ao nazismo. Pena de R$ 10 mil por danos morais.",
        fonte: "https://www.cartacapital.com.br/justica/justica-confirma-condenacao-a-rui-costa-pimenta-por-associar-kim-kataguiri-ao-nazismo/"
      },
      {
        caso: "Antissemitismo (Lei 7.716/89)",
        status: "denunciado",
        statusTexto: "Denúncia aceita — réu",
        detalhe: "A Justiça Federal aceitou em 18/05/2026 denúncia por antissemitismo contra ele e o secretário do PCO. O processo está em andamento, sem condenação.",
        fonte: "https://www.cnnbrasil.com.br/politica/justica-federal-aceita-denuncia-contra-presidente-do-pco-por-antissemitismo/"
      },
      {
        caso: "Suspeita de desvio de fundo partidário e eleitoral do PCO",
        status: "investigacao",
        statusTexto: "Sob investigação",
        detalhe: "A Polícia Federal cumpriu busca e apreensão em 11/08/2026, com bloqueio de até R$ 4 mi dos investigados. Não havia denúncia formal até a data da reportagem.",
        fonte: "https://jornaldebrasilia.com.br/noticias/politica-e-poder/pf-mira-presidente-do-pco-em-operacao-sobre-suspeita-de-desvio-de-fundo-partidario-e-eleitoral/"
      }
    ]
  },
  {
    num: 80, urna: "SAMARA MARTINS", nome: "Samara Martins da Silva Feitosa", partido: "UP",
    vice: "Raquel Nonato de Brício (UP)", coligacao: "Sem coligação",
    situacao: "Deferida", nasc: "31/08/1987", idade: 39,
    trajetoria: "Odontóloga, natural de Belo Horizonte, vice-presidente nacional da Unidade Popular. Foi candidata a vice-presidente em 2022 na chapa de Léo Péricles.",
    receita: 443922,
    receitaNota: "Receita declarada ao TSE. Patrimônio declarado de R$ 33 mil. Valor do arquivo oficial de prestação de contas do TSE, gerado em 03/10/2026, parcial.",
    plano: "Plano registrado no TSE",
    propostas: {
      economia: "Dobrar o salário mínimo, escala 4x3 e nacionalização do sistema bancário.",
      seguranca: "Fim da Polícia Militar.",
      saude: "Descriminalização do aborto.",
      educacao: "Não localizado detalhamento no material consultado.",
      ambiente: "Reforma Agrária Popular.",
      externa: "Não localizado detalhamento no material consultado."
    },
    fontes: [
      { t: "Propostas (Agência Brasil)", u: "https://agenciabrasil.ebc.com.br/politica/noticia/2026-09/samara-martins-propoe-dobrar-salario-minimo-e-instituir-escala-4x3" }
    ],
    processos: [],
    processosNota: "Nenhum registro relevante. Consta em 3 processos eleitorais procedimentais como autora.",
    destaque: "Chapa 100% feminina · única mulher cabeça de chapa"
  },
  {
    num: 28, urna: "LEONARDO AVALANCHE", nome: "Leonardo Alves de Araújo", partido: "PRTB",
    vice: "Silvia Hellen da Silva Pereira", coligacao: "Sem coligação",
    situacao: "Desistiu em 30/09/2026 — nome permanece na urna", nasc: "23/10/1977", idade: 48,
    trajetoria: "Empresário, presidente nacional do PRTB desde 2024. Assumiu a cabeça de chapa em 14/09/2026 como substituto de Pablo Marçal.",
    receita: null,
    receitaNota: "Não localizado.",
    plano: "Não localizado",
    propostas: null,
    fontes: [
      { t: "Desistência (O Tempo)", u: "https://www.otempo.com.br/eleicoes/2026/presidentes/2026/9/30/sem-marcal-leonardo-avalanche-desiste-de-candidatura-a-quatro-dias-da-eleicao-e-manda-recado" }
    ],
    processos: [
      {
        caso: "Fraude em filiações partidárias no PRTB",
        status: "denunciado",
        statusTexto: "Réu — denúncia aceita",
        detalhe: "O MP Eleitoral de São Paulo teve denúncia aceita contra ele por associação criminosa, fraude eleitoral, inserção de dados falsos e violência política de gênero, como suposto mentor de um esquema de filiações fraudulentas que o elegeu presidente do PRTB em 2024. Não há condenação.",
        fonte: "https://revistaoeste.com/politica/prtb-justica-de-sp-torna-reu-dirigente-por-fraude-e-ameaca/"
      }
    ],
    alerta: "Situação anômala. Pablo Marçal, candidato original do PRTB, teve o registro indeferido por unanimidade pelo TSE em 11/09/2026 — inelegível até 2032 por condenação nas eleições municipais de São Paulo de 2024 e por falta de filiação regular. Seu substituto, Leonardo Avalanche, desistiu em 30/09/2026, quatro dias antes do 1º turno. Como o prazo legal de substituição havia passado, o nome segue na urna sob o número 28. Votos podem ser anulados caso a desistência seja homologada; não houve confirmação de homologação até 03/10/2026.",
    alertaFonte: "https://agenciabrasil.ebc.com.br/politica/noticia/2026-09/tse-rejeita-por-unanimidade-o-registro-de-candidatura-de-pablo-marcal"
  }
];

/* ---------- GOIÁS: GOVERNADOR (6 candidatos) ---------- */
export const GOV_GOIAS: Candidato[] = [
  {
    num: 15, nome: "Daniel Vilela", nomeCompleto: "Daniel Elias Carvalho Vilela", partido: "MDB",
    vice: "Luiz do Carmo (PSD)", idade: 42, situacao: "Candidato à reeleição",
    trajetoria: "Advogado, filho de Maguito Vilela. Vereador de Goiânia em 2008, deputado estadual em 2010, deputado federal em 2014 e vice-governador de 2023 a 2026. Assumiu o governo em 31/03/2026 após a renúncia de Ronaldo Caiado.",
    receita: 9374500, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Movimento Democratico Brasileiro - Brasil - Br - Nacional (16 doadores no total).",
    propostas: {
      economia: "Modernização do programa Pro Goiás, apoio ao agronegócio e aos pequenos negócios, industrialização de minerais críticos.",
      saude: "Expansão da regionalização com hospitais, policlínicas e UTIs, fortalecimento da Rede Nascer e programa 'Saúde Inteligente' com inteligência artificial.",
      educacao: "Expansão das escolas em tempo integral, integração entre ensino médio e educação profissional, alfabetização na idade certa.",
      seguranca: "Não localizado detalhamento no material consultado.",
      infraestrutura: "Não localizado detalhamento no material consultado."
    },
    processos: [
      {
        caso: "Operação Miqueias",
        status: "citado",
        statusTexto: "Citado em investigação — não é réu",
        detalhe: "Investigação sobre lavagem de dinheiro ligada a fundos previdenciários municipais. Seu nome foi citado em ligações e reuniões investigadas, sem denúncia formal contra ele. Nega envolvimento.",
        fonte: "https://portal.al.go.leg.br/noticias/59536/em-entrevista-coletiva-daniel-vilela-nega-envolvimento-com-grupo-criminoso"
      },
      {
        caso: "Prisão da sogra por travessia ilegal de imigrantes",
        status: "terceiro",
        statusTexto: "Processo de terceiro — não é parte",
        detalhe: "A Polícia Federal determinou a prisão de sua sogra por suposto esquema de travessia ilegal de imigrantes para os Estados Unidos. Ele não é parte no processo e tratou o caso como assunto pessoal dela.",
        fonte: "https://diariodopoder.com.br/brasil-e-regioes/pf-manda-prender-sogra-daniel-vilela-por-esquema-de-travessia-ilegal"
      }
    ]
  },
  {
    num: 22, nome: "Wilder Morais", nomeCompleto: "Wilder Pedro de Morais", partido: "PL",
    vice: "Ana Paula Rezende", idade: 58, situacao: "Senador, candidato ao governo",
    coligacao: "Goiás Que Cresce (PL · NOVO)",
    trajetoria: "Senador por Goiás. Sua vice, Ana Paula Rezende, é filha de Iris Rezende.",
    receita: 11275000, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Partido Liberal (Pl) (6 doadores no total).",
    propostas: {
      economia: "Geração de renda e compromisso de não criar novos impostos.",
      saude: "Fila zero regulada e criação de uma 'Tabela SUS Goiás'.",
      educacao: "Não localizado detalhamento no material consultado.",
      seguranca: "Plataforma de segurança 'sem retrocesso'.",
      infraestrutura: "Descentralização administrativa em 10 núcleos regionais e investimento em infraestrutura."
    },
    processos: [
      {
        caso: "Desvio de emendas parlamentares",
        status: "investigacao",
        statusTexto: "Sob investigação",
        detalhe: "A Polícia Federal investiga suposto desvio de emendas parlamentares, por determinação do ministro Flávio Dino, do STF, no contexto do chamado orçamento secreto paralelo no Ministério da Saúde. Sem denúncia formal nas fontes consultadas.",
        fonte: "https://www.jornalopcao.com.br/ultimas-noticias/wilder-morais-e-investigado-pela-pf-por-suposto-desvio-de-emendas-apos-decisao-de-ministro-do-stf-739012/"
      },
      {
        caso: "Irregularidades em gastos de campanha de 2022",
        status: "tramitacao",
        statusTexto: "Ação em tramitação no TRE-GO",
        detalhe: "Ação movida pelo PP aponta uso de helicóptero não declarado e aluguel de sede abaixo do valor de mercado. Pode levar à cassação do diploma. Sem decisão final.",
        fonte: "https://www.jornalopcao.com.br/justica/wilder-morais-sofre-nova-acao-por-irregularidades-em-gastos-de-campanha-e-pode-ter-diploma-cassado-454546/"
      }
    ]
  },
  {
    num: 45, nome: "Marconi Perillo", nomeCompleto: "Marconi Ferreira Perillo Júnior", partido: "PSDB",
    vice: "Jacqueline Zaiden", idade: 63, situacao: "Ex-governador",
    trajetoria: "Governador de Goiás de 1999 a 2006 e de 2011 a 2018. Ex-senador e presidente nacional do PSDB entre 2023 e 2025.",
    receita: 10448341, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Partido Da Social Democracia Brasileira (17 doadores no total).",
    propostas: {
      economia: "Não localizado detalhamento no material consultado.",
      saude: "'Vapt Vupt da Saúde', com meta de zerar a fila de cirurgias eletivas em 4 meses, e 'Saúde no Tempo Certo', com central de regulação 24h e teleconsultas.",
      educacao: "Modernização pedagógica e tecnológica da rede.",
      seguranca: "Uso de inteligência contra organizações criminosas e modernização da Polícia Civil e Científica.",
      infraestrutura: "Não localizado detalhamento no material consultado."
    },
    processos: [
      {
        caso: "Corrupção passiva no caso da empreiteira Delta",
        status: "reu",
        statusTexto: "Réu",
        detalhe: "A Justiça de Goiás o tornou réu em 2018 por corrupção passiva, sob acusação de pedir à empreiteira Delta o pagamento de dívida de campanha em troca de aditivos contratuais. A ação penal foi baixada à 1ª instância em Goiás.",
        fonte: "https://www.conjur.com.br/2018-set-03/justica-goias-torna-marco-perillo-reu-corrupcao-passiva/"
      },
      {
        caso: "Operação Panaceia — desvio de recursos do SUS",
        status: "investigacao",
        statusTexto: "Sob investigação",
        detalhe: "Investigação da Polícia Federal iniciada em 2019 sobre desvio de cerca de R$ 900 milhões do SUS entre 2012 e 2018, apurando peculato, corrupção, organização criminosa e lavagem de dinheiro.",
        fonte: "https://jovempan.com.br/noticias/politica/marconi-perillo-ex-governador-de-goias-e-investigado-por-desvio-da-saude.html"
      },
      {
        caso: "Suposto recebimento de R$ 12 mi em propina",
        status: "arquivado",
        statusTexto: "Arquivada",
        detalhe: "Investigação eleitoral sobre suposto recebimento de propina de empreiteiras para as campanhas de 2010 e 2014. Arquivada pela Justiça Eleitoral por excesso de prazo.",
        fonte: "https://www.cartacapital.com.br/justica/justica-ve-excesso-de-prazo-e-arquiva-investigacao-contra-marconi-perillo/"
      }
    ],
    processosNota: "Não há registro de condenação com trânsito em julgado nas fontes consultadas."
  },
  {
    num: 13, nome: "Luis Cesar Bueno", nomeCompleto: "Luis Cesar Bueno e Freitas", partido: "PT",
    vice: "Carlos Mundim (PDT)", idade: 66, situacao: "Candidato",
    coligacao: "Frente de esquerda (PT · PCdoB · PV · PDT · PSB · PSOL · Rede)",
    trajetoria: "Professor de História e Estudos Sociais, pós-graduado em Políticas Públicas. Vereador de Goiânia por dois mandatos e deputado estadual por quatro mandatos consecutivos, de 2003 a 2019, quando liderou o PT na Assembleia.",
    receita: 3505817, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Partido Dos Trabalhadores - Brasil - Br - Nacional (4 doadores no total).",
    propostas: null,
    propostasNota: "Não foi localizado detalhamento temático. Recomenda-se consultar o plano de governo registrado no TSE.",
    processos: [],
    processosNota: "Nenhum registro relevante. O Jusbrasil lista 22 processos em seu nome, majoritariamente no TRE-GO e TJGO; os dois processos eleitorais de 2026 o têm como autor, não como parte processada."
  },
  {
    num: 80, nome: "Luciana Amorim", nomeCompleto: null, partido: "UP",
    vice: "Caymmi Henrique (UP)", idade: 54, situacao: "Candidata",
    trajetoria: "Servidora pública federal, analista judiciária na Justiça Federal de Goiás, formada em Direito. Natural de Anápolis. Disputou a vice-governadoria em 2022 e a vice-prefeitura de Goiânia em 2024, sem ser eleita.",
    receita: 13500, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Unidade Popular (1 doadores no total).",
    propostas: null,
    propostasNota: "Não foi localizado detalhamento temático no material consultado.",
    processos: [],
    processosNota: "Nenhum registro relevante encontrado."
  },
  {
    num: 29, nome: "Danilo Pinheiro", nomeCompleto: "Danilo Pinheiro Evangelista da Silva", partido: "PCO",
    vice: "Maria Joana Ribeiro da Silva (PCO)", idade: 43, situacao: "Candidato",
    trajetoria: "Técnico em eletrotécnica, eletrônica e telecomunicações, natural de São Luís (MA). É sua primeira candidatura a cargo eletivo.",
    receita: 0, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: #Nulo (1 doadores no total).",
    propostas: null,
    propostasNota: "Não foi localizado detalhamento temático no material consultado.",
    processos: [],
    processosNota: "Nenhum registro relevante encontrado."
  }
];

/* ---------- GOIÁS: SENADO (2 vagas, 11 candidatos) ---------- */
export const SENADO_GOIAS: Candidato[] = [
  {
    num: 444, nome: "Gracinha Caiado", nomeCompleto: "Maria das Graças Landim de Carvalho Caiado",
    partido: "União Brasil", idade: 67,
    suplentes: "Alexandre Baldy (PP) e Fião (União)",
    trajetoria: "Esposa de Ronaldo Caiado e ex-primeira-dama de Goiás. Coordenou o programa Goiás Social e o programa habitacional Pra Ter Onde Morar.",
    receita: 4291967, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Uniao Brasil (7 doadores no total).",
    propostas: "Endurecimento das leis de proteção à mulher e confisco de bens de condenados por violência contra a mulher. Defende a investigação de ministros do STF.",
    processos: [
      {
        caso: "Escândalo da Agehab — cerca de R$ 146 mi",
        status: "investigacao",
        statusTexto: "Sob investigação pelo MP-GO",
        detalhe: "Investigação sobre contratos do programa habitacional que ela coordenava, com suspeita de favorecimento a empreiteiras. Sem denúncia formal reportada.",
        fonte: "https://goias24horas.com.br/213561-gracinha-caiado-e-madrinha-de-obras-investigadas-em-esquema-de-r-146-milhoes-na-agehab-no-governo-caiado/"
      },
      {
        caso: "Improbidade pelo uso de 51 policiais militares",
        status: "tramitacao",
        statusTexto: "Em tramitação",
        detalhe: "Ação do MP-GO contra ela e Ronaldo Caiado pelo emprego de 51 policiais militares na segurança pessoal da família, com pedido de ressarcimento de R$ 1.290.856,55. Sem julgamento final.",
        fonte: "https://www.goias246.com.br/noticia/33469/politica/mp-aciona-caiado-e-gracinha-por-improbidade-administrativa-em-caso-de-seguranca-pessoal-com-51-pms.html"
      },
      {
        caso: "Operação do MP-GO contra o coordenador de sua campanha",
        status: "terceiro",
        statusTexto: "Operação contra terceiro",
        detalhe: "Em setembro de 2026 o coordenador de sua campanha foi alvo de operação do MP-GO. A medida não é dirigida a ela.",
        fonte: "https://obrasilianista.com.br/2026/09/02/justica/entenda-por-que-coordenador-da-campanha-de-gracinha-caiado-e-alvo-de-operacao-do-mpgo"
      }
    ]
  },
  {
    num: 222, nome: "Gustavo Gayer", nomeCompleto: null, partido: "PL", idade: null,
    suplentes: "Leonardo Rizzo e Emerson Lima (ambos PL)",
    trajetoria: "Deputado federal por Goiás. Exerce a liderança da Minoria na Câmara.",
    receita: 2086378, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Rodrigo Goncalves Dos Santos (601 doadores no total).",
    propostas: "Não foi localizado detalhamento temático no material consultado.",
    processos: [
      {
        caso: "Injúria qualificada contra o presidente Lula",
        status: "reu",
        statusTexto: "Réu no STF — instrução criminal",
        detalhe: "A 1ª Turma do STF aceitou por unanimidade, em 28/04/2026, denúncia da PGR no Inquérito 4974, por publicação em fevereiro de 2024 de imagem manipulada por inteligência artificial associando Lula a nazismo, antissemitismo e terrorismo. O STF entendeu que a imunidade parlamentar não protege montagens ofensivas feitas com IA. O processo está em fase de instrução.",
        fonte: "https://noticias.stf.jus.br/postsnoticias/stf-aceita-denuncia-da-pgr-contra-deputado-gustavo-gayer-por-injuria-a-presidente-lula/"
      },
      {
        caso: "Queixa-crime de Vanderlan Cardoso",
        status: "investigacao",
        statusTexto: "Em análise de recebimento",
        detalhe: "Queixa-crime por calúnia, injúria e difamação, após chamá-lo de vagabundo em vídeo. O STF analisa o recebimento.",
        fonte: "https://www.metropoles.com/brasil/stf-julga-se-recebe-queixa-crime-de-vanderlan-cardoso-contra-gayer"
      },
      {
        caso: "Queixa-crime de Gleisi Hoffmann",
        status: "investigacao",
        statusTexto: "Em análise de recebimento",
        detalhe: "Processo distinto do caso Lula. A PGR defende que o STF aceite a queixa. Não há confirmação de que tenha sido aceita.",
        fonte: "https://www.cnnbrasil.com.br/politica/pgr-stf-gleisi-hoffmann-gayer/"
      }
    ]
  },
  {
    num: 155, nome: "Dr. Zacharias Calil", nomeCompleto: null, partido: "MDB", idade: 72,
    suplentes: "Leonardo Reis e Conceição do Entorno (ambos MDB)",
    trajetoria: "Médico formado pela UFG, cirurgião pediátrico e geral.",
    receita: 3188200, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Movimento Democratico Brasileiro - Brasil - Br - Nacional (50 doadores no total).",
    propostas: "Programa 'Fila Zero' para ampliar o acesso infantil a cirurgias no SUS e reduzir o tempo de espera.",
    processos: [], processosNota: "Nenhum registro relevante encontrado."
  },
  {
    num: 555, nome: "Vanderlan Cardoso", nomeCompleto: null, partido: "PSD", idade: 63,
    suplentes: "Pedro Chaves e Samir Hajjar (ambos PSD)",
    trajetoria: "Senador desde 2019, filiado ao PSD desde 2020. Empresário natural de Iporá e ex-prefeito de Senador Canedo entre 2005 e 2010. Esta é sua oitava eleição disputada e busca a reeleição.",
    receita: 2886262, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Partido Social Democratico - Psd Diretorio Nacional (9 doadores no total).",
    propostas: "Não foi localizado detalhamento temático no material consultado.",
    processos: [],
    processosNota: "Nenhum registro relevante contra ele. É autor de queixa-crime contra Gustavo Gayer no STF, na condição de parte ofendida. Em 2020 defendeu publicamente o ex-senador Chico Rodrigues, flagrado pela PF escondendo dinheiro na cueca — posicionamento político, não processo contra ele."
  },
  {
    num: 251, nome: "Gustavo Mendanha", nomeCompleto: null, partido: "PRD", idade: 44,
    suplentes: "Carlos Filho (PRD) e Coronel Cardoso (Solidariedade)",
    trajetoria: "Nascido em Goiânia em 07/10/1982. Prefeito de Aparecida de Goiânia por dois mandatos, de 2017 a 2022.",
    receita: 3090000, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Partido Renovacao Democratica - Brasil - Br - Nacional (4 doadores no total).",
    propostas: "Não foi localizado detalhamento temático no material consultado.",
    processos: [
      {
        caso: "Operação Dose Dupla — obra da Câmara de Aparecida de Goiânia",
        status: "anulado",
        statusTexto: "Investigação anulada pelo STF",
        detalhe: "Investigação sobre irregularidades na licitação e execução da nova sede da Câmara Municipal, na qual ele e mais 14 pessoas foram alvos de busca e apreensão (inquérito 10/2022). O STF anulou a investigação por violação de prerrogativa de foro, declarando nulas as provas e diligências do inquérito.",
        fonte: "https://jurinews.com.br/destaques-ultimas/stf-anula-investigacao-contra-prefeito-e-ex-prefeito-de-aparecida-de-goiania"
      }
    ]
  },
  {
    num: 400, nome: "Isaura Lemos", nomeCompleto: null, partido: "PSB", idade: 72,
    suplentes: "Victor Dutra (PV) e Patrick de Noronha (Rede) — fontes divergem sobre a ordem",
    trajetoria: "Técnica de enfermagem com cinco mandatos como deputada estadual em Goiás e trajetória em movimentos sociais de luta por moradia.",
    receita: null, receitaNota: "Não localizado.",
    propostas: "Não foi localizado detalhamento temático no material consultado.",
    processos: [], processosNota: "Nenhum registro relevante encontrado."
  },
  {
    num: 500, nome: "Cintia Dias", nomeCompleto: null, partido: "PSOL", idade: 49,
    suplentes: "Fernando Isaac (PDT) e Paulo Rochifild (PV) — fontes divergem sobre a ordem",
    trajetoria: "Cientista social e assistente social, de Goiânia.",
    receita: 171780, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Partido Socialismo E Liberdade (P-Sol) (3 doadores no total).",
    propostas: "Não foi localizado detalhamento temático no material consultado.",
    processos: [], processosNota: "Nenhum registro relevante encontrado."
  },
  {
    num: 227, nome: "Oséias Varão", nomeCompleto: "Oseias Mendes Pereira Varão", partido: "PL", idade: null,
    suplentes: "Não localizado",
    trajetoria: "Advogado e vereador de Goiânia entre 2017 e 2020 e novamente desde 2025.",
    receita: 594250, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Partido Liberal (Pl) (4 doadores no total).",
    propostas: "Não foi localizado detalhamento temático no material consultado.",
    processos: [], processosNota: "Nenhum registro relevante encontrado. A busca não foi aprofundada."
  },
  {
    num: 456, nome: "Ernesto Roller", nomeCompleto: null, partido: "PSDB", idade: 56,
    suplentes: "Não localizado",
    trajetoria: "Nascido em Formosa (GO) em 11/11/1969. Advogado, foi deputado estadual, prefeito e secretário estadual de Segurança Pública e de Relações Institucionais.",
    receita: 530100, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Partido Da Social Democracia Brasileira (5 doadores no total).",
    propostas: "Não foi localizado detalhamento temático no material consultado.",
    processos: [], processosNota: "Nenhum registro relevante encontrado. A busca não foi aprofundada."
  },
  {
    num: 234, nome: "Iure Castro", nomeCompleto: null, partido: "Cidadania", idade: 42,
    suplentes: "Darlene Azevedo e Luiz Otávio (ambos PSDB)",
    coligacao: "Goiás De Verdade (Federação PSDB-Cidadania)",
    trajetoria: "Nascido em Goiânia em 21/04/1984. Advogado, ex-procurador da Assembleia Legislativa de Goiás e presidente estadual do Cidadania.",
    receita: 47000, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: Iure De Castro Silva (11 doadores no total).",
    propostas: "Não foi localizado detalhamento temático no material consultado.",
    processos: [], processosNota: "Nenhum registro relevante encontrado."
  },
  {
    num: 800, nome: "Guilherme Darques", nomeCompleto: null, partido: "UP", idade: null,
    suplentes: "Não localizado",
    trajetoria: "Não foram localizados dados biográficos além do número de urna.",
    receita: 0, receitaNota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valor parcial. Maior doador: #Nulo (1 doadores no total).",
    propostas: "Não foi localizado detalhamento temático no material consultado.",
    processos: [], processosNota: "Nenhum registro relevante encontrado."
  }
];

export const STATUS_LEGENDA: Record<string, StatusInfo> = {
  anulado:      { rotulo: "Anulado",      desc: "Decisão desconstituída pela Justiça. Não há condenação válida." },
  arquivado:    { rotulo: "Arquivado",    desc: "Processo encerrado sem condenação." },
  absolvido:    { rotulo: "Absolvido",    desc: "Julgado e considerado inocente." },
  investigacao: { rotulo: "Investigação", desc: "Apuração em curso. Não há acusação formal aceita." },
  denunciado:   { rotulo: "Réu",          desc: "Denúncia aceita pela Justiça. O julgamento ainda não ocorreu." },
  reu:          { rotulo: "Réu",          desc: "Denúncia aceita pela Justiça. O julgamento ainda não ocorreu." },
  condenado1:   { rotulo: "Condenado em 1ª instância", desc: "Cabe recurso. Não é decisão final." },
  condenado2:   { rotulo: "Condenado em 2ª instância", desc: "Cabe recurso. Não é decisão final." },
  transitado:   { rotulo: "Condenação definitiva", desc: "Esgotados os recursos." },
  tramitacao:   { rotulo: "Em tramitação", desc: "Processo em curso, sem decisão de mérito." },
  citado:       { rotulo: "Citado",        desc: "Mencionado em apuração, sem ser acusado formalmente." },
  terceiro:     { rotulo: "Caso de terceiro", desc: "O processo não é contra o candidato." }
};

