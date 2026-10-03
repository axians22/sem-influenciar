/* Dados das Eleições 2026 — coletados em 03/10/2026.
   Toda informação aqui tem fonte rastreável; ver /dados/*.md no repositório.
   Fontes primárias: CSV oficial do TSE (dadosabertos.tse.jus.br), camara.leg.br,
   senado.leg.br, tse.jus.br, datafolha.folha.uol.com.br, poder360.com.br,
   agenciabrasil.ebc.com.br. */

const META = {
  turno1: "2026-10-04",
  turno2: "2026-10-25",
  coletadoEm: "03/10/2026",
  fonteCalendario: "https://www.tse.jus.br/comunicacao/noticias/2026/Marco/eleicoes-2026-confira-as-principais-datas-do-calendario-eleitoral"
};

/* ---------- PRESIDENTE: 13 chapas (CSV oficial do TSE) ---------- */
const PRESIDENTE = [
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
const GOV_GOIAS = [
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
const SENADO_GOIAS = [
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

/* ---------- PESQUISAS: PRESIDENTE, 1º turno, VOTOS TOTAIS ----------
   Série exclusivamente de votos totais (inclui brancos, nulos e indecisos).
   Pesquisas em votos válidos NÃO entram aqui — são séries diferentes e
   misturá-las produziria um gráfico falso. */
const PESQ_PRESIDENTE = {
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
const DATAFOLHA_FINAL = {
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
const SEGUNDO_TURNO = {
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
const PESQ_VALIDOS = {
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
const PESQ_GOV_GOIAS = {
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

const PESQ_SEN_GOIAS = {
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

/* ---------- PARTIDOS ---------- */
const PARTIDOS_CAMARA = {
  titulo: "Bancada na Câmara dos Deputados",
  subtitulo: "Composição atual da 57ª legislatura, após a janela partidária de 2026",
  total: 513,
  fonte: "https://www.camara.leg.br/Internet/Deputado/bancada.asp",
  linhas: [
    { sigla: "PL", nome: "Partido Liberal", v: 98, espectro: "direita" },
    { sigla: "Fe Brasil", nome: "Federação Brasil da Esperança (PT 65 · PCdoB 11 · PV 6)", v: 82, espectro: "esquerda", federacao: true },
    { sigla: "UNIÃO", nome: "União Brasil", v: 52, espectro: "centro-direita" },
    { sigla: "PSD", nome: "Partido Social Democrático", v: 48, espectro: "centro-direita" },
    { sigla: "PP", nome: "Progressistas", v: 46, espectro: "centro-direita" },
    { sigla: "REPUBLICANOS", nome: "Republicanos", v: 42, espectro: "centro-direita" },
    { sigla: "MDB", nome: "Movimento Democrático Brasileiro", v: 38, espectro: "centro-direita" },
    { sigla: "PODE", nome: "Podemos", v: 27, espectro: "centro-direita" },
    { sigla: "PSB", nome: "Partido Socialista Brasileiro", v: 17, espectro: "centro-esquerda" },
    { sigla: "PSOL-REDE", nome: "Federação PSOL Rede (PSOL 13 · Rede 3)", v: 16, espectro: "esquerda", federacao: true },
    { sigla: "PDT", nome: "Partido Democrático Trabalhista", v: 10, espectro: "esquerda" },
    { sigla: "AVANTE", nome: "Avante", v: 5, espectro: "centro-direita" },
    { sigla: "NOVO", nome: "Partido Novo", v: 5, espectro: "direita" },
    { sigla: "SOLIDARIEDADE", nome: "Solidariedade", v: 4, espectro: "centro-direita" },
    { sigla: "PRD", nome: "Partido Renovação Democrática", v: 3, espectro: "centro-direita" },
    { sigla: "MISSÃO", nome: "Partido Missão", v: 1, espectro: "direita" }
  ],
  notaEspectro: "A classificação ideológica é interpretativa e segue o levantamento do UBS Brasil sobre a composição do Congresso. Não é um dado oficial do TSE.",
  fonteEspectro: "https://www.ubs.com/br/pt/wealthmanagement/insights/brazil-elections-2026/articles/national-congress-composition.html"
};

const PARTIDOS_SENADO = {
  titulo: "Bancada no Senado Federal",
  subtitulo: "81 cadeiras da 57ª legislatura, antes da apuração de 2026",
  total: 81,
  nota: "54 das 81 cadeiras estavam em disputa em 4 de outubro de 2026, de modo que esta composição muda após a apuração.",
  fonte: "https://pt.wikipedia.org/wiki/Lista_de_senadores_do_Brasil_da_57.%C2%AA_legislatura",
  fonteNota: "https://www12.senado.leg.br/noticias/materias/2026/09/10/eleicoes-2026-quem-fica-quem-sai-e-quem-concorre-ao-senado",
  linhas: [
    { sigla: "PL", v: 16 }, { sigla: "PSD", v: 12 }, { sigla: "PT", v: 11 },
    { sigla: "MDB", v: 9 }, { sigla: "PSB", v: 7 }, { sigla: "PP", v: 7 },
    { sigla: "REPUBLICANOS", v: 6 }, { sigla: "PODE", v: 3 }, { sigla: "PSDB", v: 3 },
    { sigla: "UNIÃO", v: 3 }, { sigla: "PDT", v: 2 }, { sigla: "NOVO", v: 1 },
    { sigla: "AVANTE", v: 1 }
  ]
};

const PARTIDOS_GOVERNADORES = {
  titulo: "Governadores em exercício",
  subtitulo: "27 unidades federativas, antes da eleição de 2026",
  total: 27,
  fonte: "https://pt.wikipedia.org/wiki/Lista_de_governadores_das_unidades_federativas_do_Brasil",
  linhas: [
    { sigla: "PSD", v: 6 }, { sigla: "MDB", v: 5 }, { sigla: "REPUBLICANOS", v: 4 },
    { sigla: "PP", v: 4 }, { sigla: "PT", v: 4 }, { sigla: "UNIÃO", v: 2 },
    { sigla: "PL", v: 1 }, { sigla: "Sem partido", v: 1, nota: "Rio de Janeiro, interino" }
  ]
};

const FEDERACOES = {
  titulo: "Federações partidárias registradas no TSE",
  nota: "Uma federação obriga os partidos a atuarem unidos por no mínimo quatro anos, como se fossem um só partido, inclusive nas eleições.",
  fonte: "https://www.tse.jus.br/partidos/federacoes-registradas-no-tse",
  linhas: [
    { nome: "Federação União Progressista", partidos: "União Brasil · Progressistas", deferimento: "26/03/2026" },
    { nome: "Federação Renovação Solidária", partidos: "PRD · Solidariedade", deferimento: "04/12/2025" },
    { nome: "Federação Brasil da Esperança", partidos: "PT · PCdoB · PV", deferimento: "24/05/2022" },
    { nome: "Federação PSDB Cidadania", partidos: "PSDB · Cidadania", deferimento: "26/05/2022" },
    { nome: "Federação PSOL Rede", partidos: "PSOL · Rede", deferimento: "26/05/2022" }
  ]
};

/* Financiamento de campanha — presidenciáveis com valor localizado */
const FINANCIAMENTO = {
  titulo: "Receita de campanha declarada",
  unidade: "Milhões de reais",
  nota: "Receita declarada ao TSE, do arquivo oficial de prestação de contas gerado em 03/10/2026. Valores parciais: a prestação final ocorre após a eleição. Pablo Marçal consta com R$ 9.621,53 mas teve o registro indeferido.",
  linhas: [
    { nome: "Lula (PT)", v: 87.4277, slot: 1 },
    { nome: "Flávio Bolsonaro (PL)", v: 62.047, slot: 2 },
    { nome: "Ronaldo Caiado (PSD)", v: 13.191, slot: 3 },
    { nome: "Romeu Zema (Novo)", v: 5.4466, slot: 4 },
    { nome: "Augusto Cury (Avante)", v: 3.5564, slot: 5 },
    { nome: "Renan Santos (Missão)", v: 2.6901, slot: 6 },
    { nome: "Clariana Barão (DC)", v: 1.5135, slot: 1 },
    { nome: "Hertz Dias (PSTU)", v: 1.1438, slot: 2 },
    { nome: "Wilson Grassi (Democrata)", v: 1.0501, slot: 3 },
    { nome: "Samara Martins (UP)", v: 0.4439, slot: 4 },
    { nome: "Edmilson Costa (PCB)", v: 0.0272, slot: 5 },
    { nome: "Rui Costa Pimenta (PCO)", v: 0.0085, slot: 6 }
  ]
};

const STATUS_LEGENDA = {
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

/* ---------- DOADORES — FONTE PRIMÁRIA OFICIAL ----------
   Origem: Portal de Dados Abertos do TSE, prestação de contas eleitorais 2026.
   Arquivo: prestacao_de_contas_eleitorais_candidatos_2026.zip
   https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026
   Dados gerados pelo TSE em 03/10/2026 e processados sem intermediários.
   Documentos parcialmente mascarados: CPF conforme boa prática de privacidade;
   CNPJ é público e aparece completo. */
const DOAD = {
  fonte: "Portal de Dados Abertos do TSE — prestação de contas eleitorais 2026",
  fonteUrl: "https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026",
  geradoEm: "03/10/2026",
  nota: "Valores parciais: a prestação de contas final é entregue após a eleição.",
  presidente: [{"cand": "LUIZ INACIO LULA DA SILVA", "partido": "PT", "cargo": "Presidente", "nr": "13", "tot": 87427671.36, "ndoad": 529, "origens": {"partido": 85150000.0, "pf": 1854782.68, "coletivo": 422888.68}, "doadores": [{"nome": "Partido Dos Trabalhadores - Brasil - Br - Nacional", "doc": "CNPJ 00.676.262/0001-70", "v": 85150000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Erasmo Carlos Battistella", "doc": "CPF 812.***.**0-15", "v": 500000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Um A Mais Servicos De Tecnologia E Consultoria Ltda", "doc": "CNPJ 16.832.957/0001-34", "v": 422888.68, "tipo": "coletivo", "cnae": "Suporte técnico, manutenção e outros serviços em tecnologia da informa"}, {"nome": "Pedro Pereira De Freitas", "doc": "CPF 002.***.**9-72", "v": 90000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Marco Aurelio De Carvalho", "doc": "CPF 266.***.**8-00", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Mayra Cristina Da Luz Padua Guimaraes", "doc": "CPF 074.***.**6-79", "v": 40000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Jones Alexandre Barros Soares", "doc": "CPF 346.***.**2-20", "v": 40000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Pedro Penido Duarte Guimaraes", "doc": "CPF 546.***.**7-49", "v": 30000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Kleber Lucas Costa", "doc": "CPF 886.***.**7-15", "v": 30000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Danilo Ferreira Da Silva", "doc": "CPF 294.***.**8-08", "v": 30000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "FLAVIO NANTES BOLSONARO", "partido": "PL", "cargo": "Presidente", "nr": "22", "tot": 62046950.07, "ndoad": 140, "origens": {"partido": 55202000.0, "pf": 6713720.28, "coletivo": 106698.72, "pj": 24530.07, "outro": 1.0}, "doadores": [{"nome": "Partido Liberal (Pl)", "doc": "CNPJ 08.517.423/0001-95", "v": 55200000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Luiz Da Rocha Salles Filho", "doc": "CPF 069.***.**5-04", "v": 1000000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Fernando De Castro Marques", "doc": "CPF 662.***.**8-91", "v": 500000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Erasmo Carlos Battistella", "doc": "CPF 812.***.**0-15", "v": 500000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Alexandre Ribeiro Chequer", "doc": "CPF 043.***.**7-75", "v": 300000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Walter Schlatter", "doc": "CPF 397.***.**9-34", "v": 300000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Peter Ferter", "doc": "CPF 797.***.**9-91", "v": 285100.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Ernst Ferter", "doc": "CPF 003.***.**9-34", "v": 285100.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Vitorio Sandro Azambuja Vedovato", "doc": "CPF 365.***.**1-87", "v": 280000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Jose Eduardo Matarazzo Kalil", "doc": "CPF 142.***.**8-24", "v": 200000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "RONALDO RAMOS CAIADO", "partido": "PSD", "cargo": "Presidente", "nr": "55", "tot": 13190970.74, "ndoad": 14, "origens": {"partido": 10657855.74, "pf": 2525000.0, "coletivo": 8115.0}, "doadores": [{"nome": "Partido Social Democratico - Psd Diretorio Nacional", "doc": "CNPJ 13.629.827/0001-00", "v": 10644855.74, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Carlos Eduardo Ferraz De Mattos Barroso", "doc": "CPF 090.***.**8-50", "v": 2300000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Cristiane Alkmin Junqueira Schmidt", "doc": "CPF 011.***.**7-57", "v": 25000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Arnaldo Calil Pereira Jardim", "doc": "CPF 041.***.**8-56", "v": 25000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Jose Aldo Rebelo Figueiredo", "doc": "CPF 164.***.**4-63", "v": 25000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Roberto Lucio Rocha Brant", "doc": "CPF 006.***.**6-20", "v": 25000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Hideo Augusto Dendini", "doc": "CPF 091.***.**8-62", "v": 25000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Carlos Koji Takahashi", "doc": "CPF 042.***.**8-31", "v": 20000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Samuel Claudio Da Silva", "doc": "CPF 255.***.**8-16", "v": 20000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Alexandre Gajardoni Neto", "doc": "CPF 223.***.**8-52", "v": 20000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "ROMEU ZEMA NETO", "partido": "NOVO", "cargo": "Presidente", "nr": "30", "tot": 5446578.61, "ndoad": 9, "origens": {"partido": 5136558.11, "pf": 310020.5}, "doadores": [{"nome": "Partido Novo", "doc": "CNPJ 13.405.866/0001-24", "v": 4900000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Partido Novo - Minas Gerais - Mg - Estadual", "doc": "CNPJ 26.561.313/0001-02", "v": 236558.11, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Renato Ribeiro Machado", "doc": "CPF 380.***.**6-34", "v": 200000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Salo Davi Seibel", "doc": "CPF 047.***.**7-34", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Helio Seibel", "doc": "CPF 533.***.**8-15", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Lucas De Vasconcelos Gonzalez", "doc": "CPF 095.***.**6-16", "v": 10000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rafael Santos Santana", "doc": "CPF 456.***.**8-96", "v": 10.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Felipe Antonio Granero Peixoto", "doc": "CPF 397.***.**8-90", "v": 9.5, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Raul Ghisleri Ramos", "doc": "CPF 094.***.**9-02", "v": 1.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "AUGUSTO JORGE CURY", "partido": "AVANTE", "cargo": "Presidente", "nr": "70", "tot": 3556350.86, "ndoad": 13, "origens": {"partido": 2780803.86, "proprio": 550000.0, "pf": 212062.0, "coletivo": 13485.0}, "doadores": [{"nome": "Avante Diretorio Nacional", "doc": "CNPJ 59.933.952/0001-00", "v": 2775803.86, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Augusto Jorge Cury", "doc": "CPF 021.***.**8-52", "v": 550000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Jose Janguie Bezerra Diniz", "doc": "CPF 368.***.**4-53", "v": 100000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Wilson De Matos Silva", "doc": "CPF 013.***.**9-72", "v": 60000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Sergio Adriano Soares Vita", "doc": "CPF 749.***.**6-87", "v": 35000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Noraldino Lucio Dias Junior", "doc": "CPF 009.***.**6-44", "v": 15000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Queroapoiar.Com.Br Ltda", "doc": "CNPJ 39.586.155/0001-97", "v": 13485.0, "tipo": "coletivo", "cnae": "Atividades profissionais, científicas e técnicas não especificadas ant"}, {"nome": "Avante - Rio De Janeiro - Rj - Estadual", "doc": "CNPJ 04.196.980/0001-09", "v": 5000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Alessandro Lara De Carvalho", "doc": "CPF 103.***.**6-83", "v": 2000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rodrigo Ferreira Vieira Medeiros De Aquino", "doc": "CPF 060.***.**4-50", "v": 50.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "RENAN ANTONIO FERREIRA DOS SANTOS", "partido": "MISSÃO", "cargo": "Presidente", "nr": "14", "tot": 2690130.31, "ndoad": 1502, "origens": {"coletivo": 2393662.38, "pf": 276467.93, "partido": 20000.0}, "doadores": [{"nome": "Queroapoiar.Com.Br Ltda", "doc": "CNPJ 39.586.155/0001-97", "v": 2393662.38, "tipo": "coletivo", "cnae": "Atividades profissionais, científicas e técnicas não especificadas ant"}, {"nome": "Jose Thomaz Israel Da Veiga Pereira", "doc": "CPF 402.***.**8-06", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Danilo Julio Gatto", "doc": "CPF 056.***.**6-81", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Jose Antonio Israel Da Veiga Pereira", "doc": "CPF 445.***.**8-77", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Partido Missao", "doc": "CNPJ 52.924.566/0001-03", "v": 20000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Romulo Couto Araujo", "doc": "CPF 001.***.**1-02", "v": 4014.14, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Carlos Teixeira Leite Neto", "doc": "CPF 340.***.**8-50", "v": 4000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Leonardo Schonhorst", "doc": "CPF 262.***.**8-82", "v": 4000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Claudio Roberto Alves Ferreira", "doc": "CPF 040.***.**8-52", "v": 2498.8, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Jun Sing Yoo", "doc": "CPF 414.***.**8-27", "v": 2000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "CLARIANA ZACARKIM BARAO", "partido": "DC", "cargo": "Presidente", "nr": "27", "tot": 1513500.0, "ndoad": 4, "origens": {"partido": 1500000.0, "pf": 8500.0, "proprio": 5000.0}, "doadores": [{"nome": "Democracia Crista - Brasil - Br - Nacional", "doc": "CNPJ 01.127.628/0001-15", "v": 1500000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Eudo Morais Freire Filho", "doc": "CPF 209.***.**4-49", "v": 6000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Clariana Zacarkim Barao", "doc": "CPF 015.***.**1-42", "v": 5000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Lara De Araujo Amorim", "doc": "CPF 740.***.**4-87", "v": 2500.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "HERTZ DA CONCEICAO DIAS", "partido": "PSTU", "cargo": "Presidente", "nr": "16", "tot": 1143790.16, "ndoad": 11, "origens": {"partido": 1074389.0, "pj": 52906.0, "pf": 11510.16, "coletivo": 4985.0}, "doadores": [{"nome": "Partido Socialista Dos Trabalhadores Unificado Pstu", "doc": "CNPJ 73.282.907/0001-64", "v": 1074389.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Eleicao 2026 Vera Lucia Pereira Da Silva Salgado Governador", "doc": "CNPJ 68.379.738/0001-45", "v": 51210.0, "tipo": "pj", "cnae": "Atividades de organizações políticas"}, {"nome": "Oraldo Soares Paiva", "doc": "CPF 610.***.**8-15", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Queroapoiar.Com.Br Ltda", "doc": "CNPJ 39.586.155/0001-97", "v": 4985.0, "tipo": "coletivo", "cnae": "Atividades profissionais, científicas e técnicas não especificadas ant"}, {"nome": "Jose Maria De Almeida", "doc": "CPF 033.***.**8-00", "v": 3000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Eleicao 2026 Regis Batista Ethur Senador", "doc": "CNPJ 68.499.910/0001-02", "v": 1696.0, "tipo": "pj", "cnae": "Atividades de organizações políticas"}, {"nome": "Emmanuel Oliveira Da Silva", "doc": "CPF 017.***.**8-05", "v": 1500.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Bruno Mendes Coelho Teixeira", "doc": "CPF 346.***.**8-55", "v": 1500.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Orlando Cariello Filho", "doc": "CPF 057.***.**1-91", "v": 500.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rafael Santos Santana", "doc": "CPF 456.***.**8-96", "v": 10.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "WILSON GRASSI JUNIOR", "partido": "DEMOCRATA", "cargo": "Presidente", "nr": "35", "tot": 1050150.0, "ndoad": 2, "origens": {"proprio": 1050000.0, "pf": 150.0}, "doadores": [{"nome": "Wilson Grassi Junior", "doc": "CPF 117.***.**8-86", "v": 1050000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Suely Nogueira Coelho", "doc": "CPF 158.***.**3-68", "v": 150.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "SAMARA MARTINS DA SILVA FEITOSA", "partido": "UP", "cargo": "Presidente", "nr": "80", "tot": 443921.94, "ndoad": 2, "origens": {"partido": 361701.94, "coletivo": 82220.0}, "doadores": [{"nome": "Unidade Popular", "doc": "CNPJ 26.235.522/0001-66", "v": 361701.94, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Queroapoiar.Com.Br Ltda", "doc": "CNPJ 39.586.155/0001-97", "v": 82220.0, "tipo": "coletivo", "cnae": "Atividades profissionais, científicas e técnicas não especificadas ant"}]}, {"cand": "EDMILSON SILVA COSTA", "partido": "PCB", "cargo": "Presidente", "nr": "21", "tot": 27171.0, "ndoad": 12, "origens": {"pf": 14000.0, "coletivo": 13171.0}, "doadores": [{"nome": "Queroapoiar.Com.Br Ltda", "doc": "CNPJ 39.586.155/0001-97", "v": 13171.0, "tipo": "coletivo", "cnae": "Atividades profissionais, científicas e técnicas não especificadas ant"}, {"nome": "Ricardo Da Gama Rosa Costa", "doc": "CPF 774.***.**7-53", "v": 5040.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Francisco Raimundo Malta De Araujo", "doc": "CPF 191.***.**3-44", "v": 2000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Eduardo Gustavo Viana Grandi", "doc": "CPF 037.***.**9-93", "v": 1680.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Jose Carlos Vasconcelos", "doc": "CPF 426.***.**3-72", "v": 1000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Maria Ines De Oliveira Santos", "doc": "CPF 637.***.**7-87", "v": 1000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Gabriel Remigio Ferreira", "doc": "CPF 089.***.**3-39", "v": 1000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Antonio Erlandes De Lima Junior", "doc": "CPF 037.***.**3-05", "v": 950.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Tatiane Prado Paulucci Ferraiol", "doc": "CPF 325.***.**8-99", "v": 770.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Atenagoras Oliveira Duarte", "doc": "CPF 765.***.**4-49", "v": 450.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "PABLO HENRIQUE COSTA MARCAL", "partido": "PRTB", "cargo": "Presidente", "nr": "28", "tot": 9621.53, "ndoad": 558, "origens": {"pf": 9621.53}, "doadores": [{"nome": "Carlos Eduardo Dos Santos Porfirio", "doc": "CPF 212.***.**8-00", "v": 500.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rafael Marcos De Souza", "doc": "CPF 061.***.**6-07", "v": 500.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Bruno Turtera Pierro", "doc": "CPF 427.***.**8-60", "v": 459.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Josivaldo Rodrigues Beserra", "doc": "CPF 227.***.**8-30", "v": 200.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Danilo Martins Barboza Da Silva", "doc": "CPF 390.***.**8-28", "v": 200.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Carlos Henrique Lopes Basoni", "doc": "CPF 103.***.**7-85", "v": 200.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Maicon Jose Inacio", "doc": "CPF 417.***.**8-00", "v": 200.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Igor Gentil Ramos Belchior", "doc": "CPF 647.***.**3-00", "v": 150.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rhanna Yumi Moreira Tamoti", "doc": "CPF 866.***.**5-00", "v": 128.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Maria Elisa Soares De Camargo", "doc": "CPF 043.***.**8-55", "v": 100.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "RUI COSTA PIMENTA", "partido": "PCO", "cargo": "Presidente", "nr": "29", "tot": 8496.0, "ndoad": 1, "origens": {"coletivo": 8496.0}, "doadores": [{"nome": "Queroapoiar.Com.Br Ltda", "doc": "CNPJ 39.586.155/0001-97", "v": 8496.0, "tipo": "coletivo", "cnae": "Atividades profissionais, científicas e técnicas não especificadas ant"}]}],
  goias: {"Governador": [{"cand": "WILDER PEDRO DE MORAIS", "partido": "PL", "cargo": "Governador", "nr": "22", "tot": 11275000.0, "ndoad": 6, "origens": {"partido": 11050000.0, "pf": 225000.0}, "doadores": [{"nome": "Partido Liberal (Pl)", "doc": "CNPJ 08.517.423/0001-95", "v": 11000000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Waldo Marcos Caetano Dos Anjos", "doc": "CPF 467.***.**1-20", "v": 100000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Luiz Carlos De Rezende Sampaio", "doc": "CPF 382.***.**1-00", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Elder Lopes De Oliveira", "doc": "CPF 315.***.**1-34", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Partido Liberal - Goias - Go - Estadual", "doc": "CNPJ 09.061.740/0001-02", "v": 50000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Jonas Keslley Goncalves Umbelino", "doc": "CPF 710.***.**1-72", "v": 25000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "MARCONI FERREIRA PERILLO JUNIOR", "partido": "PSDB", "cargo": "Governador", "nr": "45", "tot": 10448341.18, "ndoad": 17, "origens": {"partido": 10100000.0, "pf": 348250.8, "coletivo": 90.38}, "doadores": [{"nome": "Partido Da Social Democracia Brasileira", "doc": "CNPJ 03.653.474/0001-20", "v": 10100000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Jose Romualdo Maranhao Neto", "doc": "CPF 111.***.**4-91", "v": 125000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Carlos Alberto Lereia Da Silva", "doc": "CPF 492.***.**1-34", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Joel Soares Alves Da Silva", "doc": "CPF 377.***.**4-00", "v": 25000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Otavio Lage De Siqueira Filho", "doc": "CPF 229.***.**6-59", "v": 25000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Henrique Penna De Siqueira", "doc": "CPF 925.***.**1-20", "v": 25000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Vania Pires Perillo Cardoso", "doc": "CPF 472.***.**1-72", "v": 16000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Frederico De Morais Borges", "doc": "CPF 835.***.**1-87", "v": 12000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Wiliamar Ferreira Da Silva", "doc": "CPF 252.***.**1-15", "v": 10250.8, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Helio Umeno Junior", "doc": "CPF 492.***.**1-91", "v": 10000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "DANIEL ELIAS CARVALHO VILELA", "partido": "MDB", "cargo": "Governador", "nr": "15", "tot": 9374500.0, "ndoad": 16, "origens": {"partido": 7947500.0, "pf": 1427000.0}, "doadores": [{"nome": "Movimento Democratico Brasileiro - Brasil - Br - Nacional", "doc": "CNPJ 00.676.213/0001-38", "v": 7067500.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Partido Social Democratico", "doc": "CNPJ 15.397.777/0001-09", "v": 650000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Marcelo Henrique Limirio Goncalves", "doc": "CPF 077.***.**1-49", "v": 300000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Marcus Schalldach", "doc": "CPF 131.***.**8-18", "v": 250000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Roberto Tadeu", "doc": "CPF 703.***.**1-00", "v": 250000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Mdb - Movimento Democratico Brasileiro", "doc": "CNPJ 00.886.861/0001-19", "v": 230000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Rubens Sobrinho Rodrigues Prudente", "doc": "CPF 507.***.**1-34", "v": 200000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Cesar Helou", "doc": "CPF 034.***.**8-63", "v": 200000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Euripedes Jose Do Carmo", "doc": "CPF 122.***.**1-00", "v": 100000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Eduardo Define", "doc": "CPF 015.***.**8-68", "v": 30000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "LUIS CESAR BUENO E FREITAS", "partido": "PT", "cargo": "Governador", "nr": "13", "tot": 3505817.2, "ndoad": 4, "origens": {"partido": 3503817.2, "proprio": 2000.0}, "doadores": [{"nome": "Partido Dos Trabalhadores - Brasil - Br - Nacional", "doc": "CNPJ 00.676.262/0001-70", "v": 3468817.2, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Partido Dos Trabalhadores", "doc": "CNPJ 03.376.365/0001-03", "v": 25000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Partido Democratico Trabalhista", "doc": "CNPJ 24.809.451/0001-32", "v": 10000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Luis Cesar Bueno E Freitas", "doc": "CPF 218.***.**1-53", "v": 2000.0, "tipo": "proprio", "cnae": "#NULO"}]}, {"cand": "LUCIANA DE DEUS AMORIM", "partido": "UP", "cargo": "Governador", "nr": "80", "tot": 13500.0, "ndoad": 1, "origens": {"partido": 13500.0}, "doadores": [{"nome": "Unidade Popular", "doc": "CNPJ 26.235.522/0001-66", "v": 13500.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}]}, {"cand": "DANILO PINHEIRO EVANGELISTA DA SILVA", "partido": "PCO", "cargo": "Governador", "nr": "29", "tot": 0.0, "ndoad": 1, "origens": {"outro": 0.0}, "doadores": [{"nome": "#Nulo", "doc": "-1", "v": 0.0, "tipo": "outro", "cnae": "#NULO"}]}], "Senador": [{"cand": "MARIA DAS GRACAS LANDIM DE CARVALHO CAIADO", "partido": "UNIÃO", "cargo": "Senador", "nr": "444", "tot": 4291966.94, "ndoad": 7, "origens": {"partido": 3851966.94, "pf": 440000.0}, "doadores": [{"nome": "Uniao Brasil", "doc": "CNPJ 44.551.496/0001-67", "v": 3607466.94, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Progressistas - Brasil - Br - Nacional", "doc": "CNPJ 00.887.169/0001-05", "v": 244500.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Pedro De Godoy Bueno", "doc": "CPF 126.***.**7-22", "v": 150000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Ricardo Antonio Vicintin", "doc": "CPF 447.***.**8-91", "v": 100000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Walter Pedro Presotto", "doc": "CPF 075.***.**9-68", "v": 70000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rodrigo Emanuel Tahan", "doc": "CPF 557.***.**1-15", "v": 70000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Luiz Antonio Vessani", "doc": "CPF 182.***.**1-06", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "ZACARIAS CALIL HAMU", "partido": "MDB", "cargo": "Senador", "nr": "155", "tot": 3188200.0, "ndoad": 50, "origens": {"partido": 2850000.0, "pf": 328200.0, "proprio": 10000.0}, "doadores": [{"nome": "Movimento Democratico Brasileiro - Brasil - Br - Nacional", "doc": "CNPJ 00.676.213/0001-38", "v": 2850000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "George Alves De Brito", "doc": "CPF 624.***.**1-20", "v": 75000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Vilar De Faria Albernaz Junior", "doc": "CPF 851.***.**1-87", "v": 48900.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Fernando Henrique Abrao Alves Da Costa", "doc": "CPF 896.***.**1-53", "v": 20000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Hewdy Lobo Ribeiro", "doc": "CPF 859.***.**1-04", "v": 14300.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Luiz Henrique De Assis", "doc": "CPF 332.***.**1-91", "v": 13000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Julio Eduardo Ferro", "doc": "CPF 643.***.**1-30", "v": 10000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Vagner Ruiz Gil", "doc": "CPF 889.***.**6-53", "v": 10000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Michelly Cristina Mendes Freitas", "doc": "CPF 033.***.**1-12", "v": 10000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Sandra Ferreira De Souza Hamu", "doc": "CPF 167.***.**1-72", "v": 10000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "GUSTAVO MENDANHA MELO", "partido": "PRD", "cargo": "Senador", "nr": "251", "tot": 3090000.0, "ndoad": 4, "origens": {"partido": 3000000.0, "pf": 70000.0, "proprio": 20000.0}, "doadores": [{"nome": "Partido Renovacao Democratica - Brasil - Br - Nacional", "doc": "CNPJ 49.054.431/0001-20", "v": 3000000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Rubens Sobrinho Rodrigues Prudente", "doc": "CPF 507.***.**1-34", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Adryana Borges Silva Rodrigues", "doc": "CPF 018.***.**1-01", "v": 20000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Carlos Cardoso De Oliveira Filho", "doc": "CPF 006.***.**1-14", "v": 20000.0, "tipo": "proprio", "cnae": "#NULO"}]}, {"cand": "VANDERLAN VIEIRA CARDOSO", "partido": "PSD", "cargo": "Senador", "nr": "555", "tot": 2886262.35, "ndoad": 9, "origens": {"partido": 1500000.0, "pf": 950000.0, "proprio": 436262.35}, "doadores": [{"nome": "Partido Social Democratico - Psd Diretorio Nacional", "doc": "CNPJ 13.629.827/0001-00", "v": 1500000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Vanderlan Vieira Cardoso", "doc": "CPF 144.***.**2-91", "v": 436262.35, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Amandha Peres Cardoso Restrepo", "doc": "CPF 025.***.**1-40", "v": 370000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Victor Peres Cardoso", "doc": "CPF 014.***.**1-63", "v": 280000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Jose Roberto Garcia Amoroso", "doc": "CPF 957.***.**8-20", "v": 90000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Adonis Jesus Garcia Amoroso", "doc": "CPF 034.***.**8-54", "v": 90000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Cesar Helou", "doc": "CPF 034.***.**8-63", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Waldo Marcos Caetano Dos Anjos", "doc": "CPF 467.***.**1-20", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Edilza Terezinha Garcia Amoroso", "doc": "CPF 066.***.**8-80", "v": 20000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "GUSTAVO GAYER MACHADO DE ARAUJO", "partido": "PL", "cargo": "Senador", "nr": "222", "tot": 2086377.72, "ndoad": 601, "origens": {"pf": 1734573.42, "proprio": 251800.0, "coletivo": 100004.3}, "doadores": [{"nome": "Rodrigo Goncalves Dos Santos", "doc": "CPF 713.***.**1-68", "v": 417463.4, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Leonardo Cairo Rizzo", "doc": "CPF 133.***.**1-53", "v": 222000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Fausto De Andrade Ribeiro", "doc": "CPF 343.***.**1-72", "v": 149000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Vinicius Freitas De Castro", "doc": "CPF 889.***.**1-04", "v": 142000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Warnei Machado De Almeida", "doc": "CPF 003.***.**1-00", "v": 126935.5, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Dalton Egidio Batista De Carvalho", "doc": "CPF 391.***.**1-06", "v": 105000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Queroapoiar.Com.Br Ltda", "doc": "CNPJ 39.586.155/0001-97", "v": 100004.3, "tipo": "coletivo", "cnae": "Atividades profissionais, científicas e técnicas não especificadas ant"}, {"nome": "Nildomar Franco Amaral", "doc": "CPF 860.***.**1-53", "v": 100000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rogerio Cardoso De Matos Filho", "doc": "CPF 026.***.**1-62", "v": 100000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rondinelli Jose Ferreira Silva", "doc": "CPF 882.***.**1-00", "v": 80000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "OSEIAS MENDES PEREIRA VARAO", "partido": "PL", "cargo": "Senador", "nr": "227", "tot": 594250.0, "ndoad": 4, "origens": {"partido": 550000.0, "pj": 40000.0, "pf": 4250.0}, "doadores": [{"nome": "Partido Liberal (Pl)", "doc": "CNPJ 08.517.423/0001-95", "v": 550000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Eleicao 2026 Wellington De Urzeda Mota Deputado Estadual", "doc": "CNPJ 68.474.186/0001-54", "v": 40000.0, "tipo": "pj", "cnae": "Atividades de organizações políticas"}, {"nome": "Carmem Heloisa Rodrigues De Queiroz Gomes", "doc": "CPF 232.***.**1-68", "v": 4000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Carlos Germano De Queiroz Gomes", "doc": "CPF 035.***.**1-35", "v": 250.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "ERNESTO GUIMARAES ROLLER", "partido": "PSDB", "cargo": "Senador", "nr": "456", "tot": 530100.0, "ndoad": 5, "origens": {"partido": 500000.0, "pf": 19000.0, "proprio": 11100.0}, "doadores": [{"nome": "Partido Da Social Democracia Brasileira", "doc": "CNPJ 03.653.474/0001-20", "v": 500000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Carlos Eduardo De Sousa Oliveira", "doc": "CPF 977.***.**1-53", "v": 16000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Hermes Traldi Neto", "doc": "CPF 867.***.**8-49", "v": 10000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Marcos Antonio Andrade", "doc": "CPF 618.***.**1-15", "v": 3000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Ernesto Guimaraes Roller", "doc": "CPF 491.***.**1-15", "v": 1100.0, "tipo": "proprio", "cnae": "#NULO"}]}, {"cand": "CINTIA APARECIDA DIAS", "partido": "PSOL", "cargo": "Senador", "nr": "500", "tot": 171780.0, "ndoad": 3, "origens": {"partido": 160000.0, "coletivo": 6780.0, "proprio": 5000.0}, "doadores": [{"nome": "Partido Socialismo E Liberdade (P-Sol)", "doc": "CNPJ 06.954.942/0001-95", "v": 160000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Queroapoiar.Com.Br Ltda", "doc": "CNPJ 39.586.155/0001-97", "v": 6780.0, "tipo": "coletivo", "cnae": "Atividades profissionais, científicas e técnicas não especificadas ant"}, {"nome": "Paulo Henrique Rochifild Rodrigues Pereira", "doc": "CPF 029.***.**1-90", "v": 5000.0, "tipo": "proprio", "cnae": "#NULO"}]}, {"cand": "MARIA ISAURA LEMOS", "partido": "PSB", "cargo": "Senador", "nr": "400", "tot": 85584.36, "ndoad": 10, "origens": {"pj": 47500.0, "pf": 16064.36, "partido": 12000.0, "proprio": 10000.0, "coletivo": 20.0}, "doadores": [{"nome": "Eleicao 2026 Luis Cesar Bueno E Freitas Governador", "doc": "CNPJ 68.499.774/0001-42", "v": 47500.0, "tipo": "pj", "cnae": "Atividades de organizações políticas"}, {"nome": "Partido Socialista Brasileiro", "doc": "CNPJ 01.421.697/0001-37", "v": 12000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Maria Isaura Lemos", "doc": "CPF 355.***.**1-20", "v": 10000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Samuel Peres Dos Santos", "doc": "CPF 047.***.**1-08", "v": 3000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Maira Lemos Vieira Chadud", "doc": "CPF 910.***.**1-91", "v": 3000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Robert Dias Melo", "doc": "CPF 701.***.**1-80", "v": 2564.36, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Maria Eduarda Domingos Da Silva", "doc": "CPF 716.***.**1-60", "v": 2500.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Messias Sena De Vilhena", "doc": "CPF 705.***.**1-79", "v": 2500.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Euler Ivo Vieira", "doc": "CPF 320.***.**1-00", "v": 2500.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Queroapoiar.Com.Br Ltda", "doc": "CNPJ 39.586.155/0001-97", "v": 20.0, "tipo": "coletivo", "cnae": "Atividades profissionais, científicas e técnicas não especificadas ant"}]}, {"cand": "IURE DE CASTRO SILVA", "partido": "CIDADANIA", "cargo": "Senador", "nr": "234", "tot": 47000.0, "ndoad": 11, "origens": {"pf": 37000.0, "proprio": 10000.0}, "doadores": [{"nome": "Iure De Castro Silva", "doc": "CPF 005.***.**1-37", "v": 10000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Gabriel Ricardo Jardim Caixeta", "doc": "CPF 843.***.**1-68", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Eduardo Henrique Lolli", "doc": "CPF 010.***.**9-25", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Danilo Guimaraes Cunha", "doc": "CPF 718.***.**1-44", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Andreya Da Silva Matos Moura", "doc": "CPF 781.***.**1-04", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rafael Rodrigues Vasconcelos", "doc": "CPF 024.***.**1-16", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Cinthia Steffane Bento De Oliveira", "doc": "CPF 006.***.**1-85", "v": 3000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Carolina Monteiro Prado Fernandes", "doc": "CPF 717.***.**1-00", "v": 3000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Maira Luciene De Souza Melo", "doc": "CPF 777.***.**1-72", "v": 2000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Liliana Cunha Prudente", "doc": "CPF 031.***.**6-05", "v": 2000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "GUILHERME DARQUES ALVES DE PAULA", "partido": "UP", "cargo": "Senador", "nr": "800", "tot": 0.0, "ndoad": 1, "origens": {"outro": 0.0}, "doadores": [{"nome": "#Nulo", "doc": "-1", "v": 0.0, "tipo": "outro", "cnae": "#NULO"}]}], "Deputado Federal": [{"cand": "MAGDA MOFATTO HON", "partido": "PL", "cargo": "Deputado Federal", "nr": "2222", "tot": 3294000.0, "ndoad": 6, "origens": {"partido": 3030000.0, "proprio": 220000.0, "pf": 44000.0}, "doadores": [{"nome": "Partido Liberal (Pl)", "doc": "CNPJ 08.517.423/0001-95", "v": 3030000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Magda Mofatto Hon", "doc": "CPF 132.***.**1-15", "v": 220000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Flavio De Paula Canedo", "doc": "CPF 419.***.**1-20", "v": 14000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Amanda Martins Aquino", "doc": "CPF 014.***.**1-17", "v": 13000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Edmilson Marques Da Silva", "doc": "CPF 786.***.**1-97", "v": 10000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Caique Mota Ferrari", "doc": "CPF 045.***.**1-88", "v": 7000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "ADRIANO ANTONIO AVELAR", "partido": "PP", "cargo": "Deputado Federal", "nr": "1111", "tot": 3074400.0, "ndoad": 6, "origens": {"partido": 2800000.0, "pf": 149400.0, "proprio": 125000.0}, "doadores": [{"nome": "Progressistas - Brasil - Br - Nacional", "doc": "CNPJ 00.887.169/0001-05", "v": 2800000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Adriano Antonio Avelar", "doc": "CPF 507.***.**1-53", "v": 125000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Tiago Lobo Favoretto Pereira De Souza", "doc": "CPF 006.***.**1-93", "v": 124000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Joel De Sant Anna Braga Filho", "doc": "CPF 732.***.**7-87", "v": 20000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Charles Teles Machado", "doc": "CPF 467.***.**1-15", "v": 3000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Luemir Lisboa Santana", "doc": "CPF 379.***.**1-34", "v": 2400.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "LUCAS PINHEIRO BRANDAO CALIL", "partido": "PRD", "cargo": "Deputado Federal", "nr": "2525", "tot": 3006000.0, "ndoad": 2, "origens": {"partido": 3000000.0, "pf": 6000.0}, "doadores": [{"nome": "Partido Renovacao Democratica - Brasil - Br - Nacional", "doc": "CNPJ 49.054.431/0001-20", "v": 3000000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Victor Caiado Ferreira Pires", "doc": "CPF 012.***.**1-01", "v": 6000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "SILVYE ALVES DA SILVA", "partido": "UNIÃO", "cargo": "Deputado Federal", "nr": "4444", "tot": 3000000.0, "ndoad": 1, "origens": {"partido": 3000000.0}, "doadores": [{"nome": "Uniao Brasil", "doc": "CNPJ 44.551.496/0001-67", "v": 3000000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}]}, {"cand": "BRUNNO REGIANY PEIXOTO PIMENTA", "partido": "UNIÃO", "cargo": "Deputado Federal", "nr": "4455", "tot": 2930149.39, "ndoad": 20, "origens": {"partido": 2517649.39, "pf": 372500.0, "proprio": 40000.0}, "doadores": [{"nome": "Uniao Brasil", "doc": "CNPJ 44.551.496/0001-67", "v": 2217649.39, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Uniao Brasil Goias Go Estadual", "doc": "CNPJ 45.739.858/0001-00", "v": 300000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Luiz Fernando Barbosa", "doc": "CPF 239.***.**1-49", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Paulo De Freitas Barbosa", "doc": "CPF 336.***.**1-04", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Joao Carlos Silva Paiva", "doc": "CPF 276.***.**1-53", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Marcelo De Freitas Barbosa", "doc": "CPF 392.***.**1-49", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Brunno Regiany Peixoto Pimenta", "doc": "CPF 843.***.**1-20", "v": 40000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Danilo Guimaraes Cunha", "doc": "CPF 718.***.**1-44", "v": 15000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Liliana Cunha Prudente", "doc": "CPF 031.***.**6-05", "v": 15000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Andreya Da Silva Matos Moura", "doc": "CPF 781.***.**1-04", "v": 15000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "FLAVIA CARREIRO ALBUQUERQUE MORAIS", "partido": "MDB", "cargo": "Deputado Federal", "nr": "1515", "tot": 2866668.0, "ndoad": 3, "origens": {"partido": 2850000.0, "pf": 16668.0}, "doadores": [{"nome": "Movimento Democratico Brasileiro - Brasil - Br - Nacional", "doc": "CNPJ 00.676.213/0001-38", "v": 2850000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "George Morais Ferreira", "doc": "CPF 254.***.**1-68", "v": 10000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Tabata Cristina De Souza", "doc": "CPF 322.***.**8-08", "v": 6668.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "JOSE NELTO LAGARES DAS MERCEZ", "partido": "UNIÃO", "cargo": "Deputado Federal", "nr": "4415", "tot": 2855654.39, "ndoad": 13, "origens": {"partido": 2602629.39, "pf": 229200.0, "pj": 13525.0, "proprio": 10300.0}, "doadores": [{"nome": "Uniao Brasil", "doc": "CNPJ 44.551.496/0001-67", "v": 2507629.39, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Maria Jose Teixeira Gontijo", "doc": "CPF 428.***.**1-34", "v": 125000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Uniao Brasil Goias Go Estadual", "doc": "CNPJ 45.739.858/0001-00", "v": 95000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Francisco Queiroz Dourado", "doc": "CPF 023.***.**4-84", "v": 40000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Waldo Marcos Caetano Dos Anjos", "doc": "CPF 467.***.**1-20", "v": 20000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Julio Capobianco", "doc": "CPF 006.***.**8-34", "v": 15000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Eleicao 2026 Adib Elias Junior Deputado Estadual", "doc": "CNPJ 68.499.892/0001-50", "v": 13525.0, "tipo": "pj", "cnae": "Atividades de organizações políticas"}, {"nome": "Jose Nelto Lagares Das Mercez", "doc": "CPF 220.***.**1-59", "v": 10300.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Primo Nunes Lagares", "doc": "CPF 108.***.**6-00", "v": 9200.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Joao Carlos Silva Paiva", "doc": "CPF 276.***.**1-53", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "ADRIANA SAUTHIER ACCORSI", "partido": "PT", "cargo": "Deputado Federal", "nr": "1331", "tot": 2836178.13, "ndoad": 4, "origens": {"partido": 2830500.0, "coletivo": 4478.13, "pf": 1200.0}, "doadores": [{"nome": "Partido Dos Trabalhadores - Brasil - Br - Nacional", "doc": "CNPJ 00.676.262/0001-70", "v": 2830500.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Queroapoiar.Com.Br Ltda", "doc": "CNPJ 39.586.155/0001-97", "v": 4478.13, "tipo": "coletivo", "cnae": "Atividades profissionais, científicas e técnicas não especificadas ant"}, {"nome": "Valdi Camarcio Bezerra", "doc": "CPF 081.***.**1-59", "v": 1000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Nelson Goncalves Galvao", "doc": "CPF 280.***.**1-72", "v": 200.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "MARUSSA CASSIA FAVARO BOLDRIN", "partido": "REPUBLICANOS", "cargo": "Deputado Federal", "nr": "1055", "tot": 2754791.61, "ndoad": 14, "origens": {"partido": 2100000.0, "pf": 654791.61}, "doadores": [{"nome": "Republicanos - Brasil - Br - Nacional", "doc": "CNPJ 07.665.132/0001-81", "v": 1991250.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Julio Capobianco", "doc": "CPF 006.***.**8-34", "v": 200000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Marcos Fernando Garms", "doc": "CPF 055.***.**8-05", "v": 200000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Alberto Borges De Souza", "doc": "CPF 075.***.**9-04", "v": 126831.61, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Republicanos - Goias - Go - Estadual", "doc": "CNPJ 07.998.455/0001-97", "v": 108750.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Luiz Felipe Felix Curado", "doc": "CPF 046.***.**1-03", "v": 30000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Ademir Armando Boldrin", "doc": "CPF 428.***.**8-63", "v": 25000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Luiz Antonio Vessani", "doc": "CPF 182.***.**1-06", "v": 20000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Amanda Maria De Souza Calegari", "doc": "CPF 850.***.**1-15", "v": 15000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Decio De Sampaio Amaral", "doc": "CPF 081.***.**8-83", "v": 15000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "WALDIR SOARES DE OLIVEIRA", "partido": "UNIÃO", "cargo": "Deputado Federal", "nr": "4400", "tot": 2650079.35, "ndoad": 20, "origens": {"partido": 2600000.0, "pf": 40079.35, "proprio": 10000.0}, "doadores": [{"nome": "Uniao Brasil", "doc": "CNPJ 44.551.496/0001-67", "v": 1800000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Uniao Brasil Goias Go Estadual", "doc": "CNPJ 45.739.858/0001-00", "v": 800000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Waldir Soares De Oliveira", "doc": "CPF 462.***.**9-72", "v": 10000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Terezinha Silva Bandeira", "doc": "CPF 402.***.**1-87", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rosevaldo Pereira Da Silva", "doc": "CPF 890.***.**1-20", "v": 2800.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Michel Alves Franca Dos Santos", "doc": "CPF 105.***.**7-38", "v": 2800.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Izabel Noleto Dos Reis Silva", "doc": "CPF 030.***.**1-59", "v": 2800.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Agnaldo Candido Martins", "doc": "CPF 430.***.**1-72", "v": 2800.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Julio Omar Dos Santos", "doc": "CPF 282.***.**1-53", "v": 2800.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Eliane Germano De Oliveira Martins", "doc": "CPF 971.***.**1-68", "v": 2650.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "LUCAS DE CASTRO SANTOS", "partido": "MDB", "cargo": "Deputado Federal", "nr": "1510", "tot": 2521329.56, "ndoad": 106, "origens": {"partido": 1600000.0, "pf": 907520.87, "proprio": 13808.69}, "doadores": [{"nome": "Movimento Democratico Brasileiro - Brasil - Br - Nacional", "doc": "CNPJ 00.676.213/0001-38", "v": 1600000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Luiz Paulo Horta De Siqueira", "doc": "CPF 093.***.**8-00", "v": 200000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Claudio Marcio Romagnolo", "doc": "CPF 115.***.**8-05", "v": 100000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rafael Damasceno Generoso", "doc": "CPF 175.***.**8-86", "v": 100000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Nilton Molina", "doc": "CPF 007.***.**8-34", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Matheus Junqueira Tittoto", "doc": "CPF 040.***.**1-30", "v": 45000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Simone Rodrigues Queiroz", "doc": "CPF 530.***.**1-63", "v": 40000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rafaella Di Castro Lousa Rocha", "doc": "CPF 033.***.**1-11", "v": 30000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Marcos Eneas Jorge", "doc": "CPF 228.***.**1-44", "v": 25000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Claudio Simao", "doc": "CPF 309.***.**9-04", "v": 20000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "ISMAEL ALEXANDRINO JUNIOR", "partido": "PSD", "cargo": "Deputado Federal", "nr": "5555", "tot": 2453500.0, "ndoad": 17, "origens": {"partido": 2200000.0, "pf": 207000.0, "proprio": 46500.0}, "doadores": [{"nome": "Partido Social Democratico - Psd Diretorio Nacional", "doc": "CNPJ 13.629.827/0001-00", "v": 2200000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Pedro Ernesto Ferreira Miranda", "doc": "CPF 029.***.**1-48", "v": 100000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Daniel Chaves Rezek Ferreira", "doc": "CPF 001.***.**6-04", "v": 50000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Ismael Alexandrino Junior", "doc": "CPF 702.***.**1-82", "v": 46500.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Ezio Evelcioni Castro Panisi", "doc": "CPF 425.***.**1-15", "v": 18000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Romeu Cortes Domingues", "doc": "CPF 893.***.**7-49", "v": 10000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Renato Ricardo Alves", "doc": "CPF 267.***.**0-00", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rodrigo De Medeiros Rosas", "doc": "CPF 807.***.**1-20", "v": 3000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Rayane Amaral Gomes", "doc": "CPF 034.***.**1-63", "v": 2500.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Crystian Ribeiro Alencar", "doc": "CPF 712.***.**1-10", "v": 2500.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "ALCIDES RIBEIRO FILHO", "partido": "PSDB", "cargo": "Deputado Federal", "nr": "4500", "tot": 2405500.0, "ndoad": 10, "origens": {"partido": 2100000.0, "proprio": 260000.0, "pf": 45500.0}, "doadores": [{"nome": "Partido Da Social Democracia Brasileira", "doc": "CNPJ 03.653.474/0001-20", "v": 2100000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Alcides Ribeiro Filho", "doc": "CPF 092.***.**1-49", "v": 260000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Marcello De Oliveira Ferreira", "doc": "CPF 929.***.**1-20", "v": 9000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Leandro Julio Dos Santos Faria", "doc": "CPF 003.***.**1-93", "v": 8500.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Karoline Campos Justino Moreira", "doc": "CPF 032.***.**1-90", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Claudio Barbosa Maranhao", "doc": "CPF 494.***.**1-20", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Janicy Cristina Guimaraes Barbosa", "doc": "CPF 828.***.**1-15", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Ramon Candido Da Silva", "doc": "CPF 878.***.**1-68", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Erick Magalhaes De Oliveira Sousa", "doc": "CPF 020.***.**1-17", "v": 5000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Alexandre Dias Gomes", "doc": "CPF 029.***.**1-29", "v": 3000.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "CELIO ANTONIO DA SILVEIRA", "partido": "MDB", "cargo": "Deputado Federal", "nr": "1599", "tot": 2398100.0, "ndoad": 5, "origens": {"partido": 2100000.0, "pf": 199100.0, "proprio": 99000.0}, "doadores": [{"nome": "Movimento Democratico Brasileiro - Brasil - Br - Nacional", "doc": "CNPJ 00.676.213/0001-38", "v": 2100000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Guiomar Della Togna Nardini", "doc": "CPF 032.***.**8-34", "v": 150000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Celio Antonio Da Silveira", "doc": "CPF 244.***.**1-20", "v": 99000.0, "tipo": "proprio", "cnae": "#NULO"}, {"nome": "Matheus Junqueira Tittoto", "doc": "CPF 040.***.**1-30", "v": 45000.0, "tipo": "pf", "cnae": "#NULO"}, {"nome": "Matheus Antonio Mendonca Da Silveira", "doc": "CPF 700.***.**1-20", "v": 4100.0, "tipo": "pf", "cnae": "#NULO"}]}, {"cand": "GLAUSKSTON BATISTA RIOS", "partido": "PODE", "cargo": "Deputado Federal", "nr": "2026", "tot": 2310000.0, "ndoad": 3, "origens": {"partido": 2110000.0, "proprio": 200000.0}, "doadores": [{"nome": "Podemos", "doc": "CNPJ 01.248.362/0001-69", "v": 1410000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Podemos Orgao Provisorio Goias - Go - Estadual", "doc": "CNPJ 05.144.236/0001-15", "v": 700000.0, "tipo": "partido", "cnae": "Atividades de organizações políticas"}, {"nome": "Glauskston Batista Rios", "doc": "CPF 607.***.**1-91", "v": 200000.0, "tipo": "proprio", "cnae": "#NULO"}]}]},
  cruzados: [{"nome": "Erasmo Carlos Battistella", "doc": "CPF 812.***.**0-15", "tipo": "pf", "tot": 1000000.0, "para": [{"cand": "Flavio Nantes Bolsonaro", "partido": "PL", "cargo": "Presidente", "v": 500000.0}, {"cand": "Luiz Inacio Lula Da Silva", "partido": "PT", "cargo": "Presidente", "v": 500000.0}]}, {"nome": "Eleicao 2026 Aava Santiago Aguiar Deputado Federal", "doc": "CNPJ 68.518.748/0001-14", "tipo": "pj", "tot": 635000.0, "para": [{"cand": "Elenira Tatiana Lemos Vieira", "partido": "PSB", "cargo": "Deputado Federal", "v": 450000.0}, {"cand": "Carmem Lucia Costa De Oliveira Ferreira", "partido": "PSB", "cargo": "Deputado Federal", "v": 185000.0}]}, {"nome": "Eleicao 2026 Ana Paula De Araujo Rezende Machado Craveiro Vice-Governador", "doc": "CNPJ 68.594.685/0001-85", "tipo": "pj", "tot": 540000.0, "para": [{"cand": "Maria Yvelonia Dos Santos Araujo Barbosa", "partido": "PL", "cargo": "Deputado Federal", "v": 100000.0}, {"cand": "Alessandra Rose De Resende Jacob", "partido": "PL", "cargo": "Deputado Federal", "v": 100000.0}, {"cand": "Ana Carolina Carvalho Araujo Santos Molinari", "partido": "PL", "cargo": "Deputado Federal", "v": 90000.0}, {"cand": "Jordana Aparecida Sousa Ferreira Neves", "partido": "PL", "cargo": "Deputado Federal", "v": 90000.0}, {"cand": "Andressa Camila Buss Mondardo", "partido": "PL", "cargo": "Deputado Federal", "v": 90000.0}, {"cand": "Adilia Roriz Ornelas", "partido": "PL", "cargo": "Deputado Federal", "v": 70000.0}]}, {"nome": "Cesar Helou", "doc": "CPF 034.***.**8-63", "tipo": "pf", "tot": 275000.0, "para": [{"cand": "Daniel Elias Carvalho Vilela", "partido": "MDB", "cargo": "Governador", "v": 200000.0}, {"cand": "Vanderlan Vieira Cardoso", "partido": "PSD", "cargo": "Senador", "v": 50000.0}, {"cand": "Fabio Tokarski", "partido": "PCDOB", "cargo": "Deputado Federal", "v": 25000.0}]}, {"nome": "Rubens Sobrinho Rodrigues Prudente", "doc": "CPF 507.***.**1-34", "tipo": "pf", "tot": 250000.0, "para": [{"cand": "Daniel Elias Carvalho Vilela", "partido": "MDB", "cargo": "Governador", "v": 200000.0}, {"cand": "Gustavo Mendanha Melo", "partido": "PRD", "cargo": "Senador", "v": 50000.0}]}, {"nome": "Waldo Marcos Caetano Dos Anjos", "doc": "CPF 467.***.**1-20", "tipo": "pf", "tot": 220000.0, "para": [{"cand": "Wilder Pedro De Morais", "partido": "PL", "cargo": "Governador", "v": 100000.0}, {"cand": "Vanderlan Vieira Cardoso", "partido": "PSD", "cargo": "Senador", "v": 50000.0}, {"cand": "Delubio Soares De Castro", "partido": "PT", "cargo": "Deputado Federal", "v": 50000.0}, {"cand": "Jose Nelto Lagares Das Mercez", "partido": "UNIÃO", "cargo": "Deputado Federal", "v": 20000.0}]}, {"nome": "Julio Capobianco", "doc": "CPF 006.***.**8-34", "tipo": "pf", "tot": 215000.0, "para": [{"cand": "Marussa Cassia Favaro Boldrin", "partido": "REPUBLICANOS", "cargo": "Deputado Federal", "v": 200000.0}, {"cand": "Jose Nelto Lagares Das Mercez", "partido": "UNIÃO", "cargo": "Deputado Federal", "v": 15000.0}]}]
};

/* ---------- ORDEM DE VOTAÇÃO NA URNA (TSE) ----------
   Fonte: https://www.tse.jus.br/comunicacao/noticias/2026/Marco/eleicoes-2026-conheca-a-ordem-de-votacao-na-urna-eletronica
   Confirmado por: https://www12.senado.leg.br/noticias/materias/2026/09/16/eleicoes-2026-saiba-a-ordem-dos-votos-na-urna-eletronica
   São 6 votos em 2026, nesta ordem. Goiás elege 2 senadores, por isso há duas
   escolhas para o Senado — particularidade que se repete a cada 8 anos. */
const ORDEM_URNA = [
  { id: 'depfed',  rotulo: 'Deputado federal',  digitos: 4,
    dica: 'Goiás elege 17. Seu voto também ajuda o partido a eleger outros nomes.' },
  { id: 'depest',  rotulo: 'Deputado estadual', digitos: 5,
    dica: 'Goiás elege 41 entre 595 candidatos. Busque por nome ou número.' },
  { id: 'senador1', rotulo: 'Senador · 1ª vaga', digitos: 3,
    dica: 'Goiás elege 2 senadores. Esta é a primeira das duas escolhas.' },
  { id: 'senador2', rotulo: 'Senador · 2ª vaga', digitos: 3,
    dica: 'Precisa ser um candidato diferente do da 1ª vaga.' },
  { id: 'governador', rotulo: 'Governador', digitos: 2, dica: null },
  { id: 'presidente', rotulo: 'Presidente', digitos: 2, dica: null }
];

/* ---------- CANDIDATOS PARA A COLINHA — NÚMEROS OFICIAIS DO TSE ----------
   Origem: Portal de Dados Abertos do TSE, consulta de candidatos 2026.
   Arquivo: consulta_cand_2026.zip -> consulta_cand_2026_BR.csv e _GO.csv
   https://dadosabertos.tse.jus.br/dataset/candidatos-2026
   Número de urna e nome de urna exatamente como registrados no TSE.
   Pablo Marçal (28/PRTB) foi omitido: registro indeferido pelo TSE. */
const URNA = {
  fonte: "TSE · consulta de candidatos 2026",
  fonteUrl: "https://dadosabertos.tse.jus.br/dataset/candidatos-2026",
  presidente: [{"nr": "13", "urna": "Lula", "partido": "PT", "alerta": null}, {"nr": "14", "urna": "Renan Santos", "partido": "MISSÃO", "alerta": null}, {"nr": "16", "urna": "Hertz Dias", "partido": "PSTU", "alerta": null}, {"nr": "21", "urna": "Edmilson Costa", "partido": "PCB", "alerta": null}, {"nr": "22", "urna": "Flavio Bolsonaro", "partido": "PL", "alerta": null}, {"nr": "27", "urna": "Clariana Barao", "partido": "DC", "alerta": null}, {"nr": "28", "urna": "Leonardo Avalanche", "partido": "PRTB", "alerta": "Desistiu em 30/09/2026; nome permanece na urna"}, {"nr": "29", "urna": "Rui Costa Pimenta", "partido": "PCO", "alerta": null}, {"nr": "30", "urna": "Zema", "partido": "NOVO", "alerta": null}, {"nr": "35", "urna": "Veterinário Wilson Grassi", "partido": "DEMOCRATA", "alerta": null}, {"nr": "55", "urna": "Ronaldo Caiado", "partido": "PSD", "alerta": null}, {"nr": "70", "urna": "Escritor Augusto Cury", "partido": "AVANTE", "alerta": null}, {"nr": "80", "urna": "Samara", "partido": "UP", "alerta": null}],
  governador: [{"nr": "13", "urna": "Luis Cesar Bueno", "partido": "PT"}, {"nr": "15", "urna": "Daniel Vilela", "partido": "MDB"}, {"nr": "22", "urna": "Wilder Morais", "partido": "PL"}, {"nr": "29", "urna": "Danilo DA Silva", "partido": "PCO"}, {"nr": "45", "urna": "Marconi Perillo", "partido": "PSDB"}, {"nr": "80", "urna": "Luciana Amorim", "partido": "UP"}],
  senador: [{"nr": "155", "urna": "Dr. Zacharias Calil", "partido": "MDB"}, {"nr": "222", "urna": "Gustavo Gayer", "partido": "PL"}, {"nr": "227", "urna": "Oséias Varão", "partido": "PL"}, {"nr": "234", "urna": "Iure Castro", "partido": "CIDADANIA"}, {"nr": "251", "urna": "Gustavo Mendanha", "partido": "PRD"}, {"nr": "400", "urna": "Isaura Lemos", "partido": "PSB"}, {"nr": "444", "urna": "Gracinha Caiado", "partido": "UNIÃO"}, {"nr": "456", "urna": "Ernesto Roller", "partido": "PSDB"}, {"nr": "500", "urna": "Cintia Dias", "partido": "PSOL"}, {"nr": "555", "urna": "Vanderlan Cardoso", "partido": "PSD"}, {"nr": "800", "urna": "Guilherme Darques", "partido": "UP"}],
  depfederal: [{"nr": "4040", "urna": "Aava Santiago", "partido": "PSB"}, {"nr": "4545", "urna": "Adair Henriques Vovô DO Jeep", "partido": "PSDB"}, {"nr": "4026", "urna": "Adedy Santana", "partido": "PSB"}, {"nr": "2512", "urna": "Ademir Amador", "partido": "PRD"}, {"nr": "1201", "urna": "Adriano DA Casa DE Apoio", "partido": "PDT"}, {"nr": "1111", "urna": "Adriano DO Baldy", "partido": "PP"}, {"nr": "2280", "urna": "Adília Roriz", "partido": "PL"}, {"nr": "4077", "urna": "Alcilena Carmo", "partido": "PSB"}, {"nr": "1292", "urna": "Alessandra Carmo", "partido": "PDT"}, {"nr": "4522", "urna": "Alexandre Tocantins", "partido": "PSDB"}, {"nr": "1428", "urna": "Aline Lima", "partido": "MISSÃO"}, {"nr": "2772", "urna": "Alisson Borges", "partido": "DC"}, {"nr": "4515", "urna": "Ana Flávia Resende", "partido": "PSDB"}, {"nr": "1472", "urna": "Anastácia Almeida", "partido": "MISSÃO"}, {"nr": "1401", "urna": "Ander Alves", "partido": "MISSÃO"}, {"nr": "1248", "urna": "Andre Walker DA Rádio Garavelo", "partido": "PDT"}, {"nr": "2045", "urna": "Angelita Duarte", "partido": "PODE"}, {"nr": "5005", "urna": "Anna Claudia Dias", "partido": "PSOL"}, {"nr": "2345", "urna": "Ariana Fidelis", "partido": "CIDADANIA"}, {"nr": "2788", "urna": "Baiano DO Picolé", "partido": "DC"}, {"nr": "5024", "urna": "Barbara Bombom", "partido": "PSOL"}, {"nr": "5550", "urna": "Betinha DA Laranja", "partido": "PSD"}, {"nr": "2580", "urna": "Bill Guerra Mochilink", "partido": "PRD"}, {"nr": "1593", "urna": "Bombeira Louiza", "partido": "MDB"}, {"nr": "4455", "urna": "Bruno Peixoto", "partido": "UNIÃO"}, {"nr": "2590", "urna": "Cabo Lorrane", "partido": "PRD"}, {"nr": "2211", "urna": "Camila Mondardo", "partido": "PL"}, {"nr": "4450", "urna": "Camila Rosa", "partido": "UNIÃO"}, {"nr": "4422", "urna": "Capitão Rodolfo Souza", "partido": "UNIÃO"}, {"nr": "1040", "urna": "Carlin DA Oficina", "partido": "REPUBLICANOS"}, {"nr": "2791", "urna": "Carlos Brandao", "partido": "DC"}, {"nr": "1222", "urna": "Carlos Brasil", "partido": "PDT"}, {"nr": "1378", "urna": "Carlos Maranhão", "partido": "PT"}, {"nr": "4012", "urna": "Carmem Lucia", "partido": "PSB"}, {"nr": "2232", "urna": "Carol Molinari", "partido": "PL"}, {"nr": "2700", "urna": "Catalão-zim", "partido": "DC"}, {"nr": "1315", "urna": "Catarino Silva", "partido": "PT"}, {"nr": "4580", "urna": "Cepita", "partido": "PSDB"}, {"nr": "7755", "urna": "Christovam Machado", "partido": "SOLIDARIEDADE"}, {"nr": "6513", "urna": "Claudia Trajano", "partido": "PCDOB"}, {"nr": "4045", "urna": "Claudio Meirelles", "partido": "PSB"}, {"nr": "1536", "urna": "Coronel Braulio", "partido": "MDB"}, {"nr": "2000", "urna": "Coronel Maia", "partido": "PODE"}, {"nr": "1599", "urna": "Célio Silveira", "partido": "MDB"}, {"nr": "1818", "urna": "Damião DA Moradia", "partido": "REDE"}, {"nr": "5522", "urna": "Daniel Agrobom", "partido": "PSD"}, {"nr": "1300", "urna": "Daniel Caçapava", "partido": "PT"}, {"nr": "3045", "urna": "Daniel Shamah", "partido": "NOVO"}, {"nr": "1030", "urna": "Danielle Nava", "partido": "REPUBLICANOS"}, {"nr": "7722", "urna": "Danilo Faria", "partido": "SOLIDARIEDADE"}, {"nr": "1331", "urna": "Delegada Adriana Accorsi", "partido": "PT"}, {"nr": "3011", "urna": "Delegado Humberto Teófilo", "partido": "NOVO"}, {"nr": "4400", "urna": "Delegado Waldir", "partido": "UNIÃO"}, {"nr": "1390", "urna": "Delúbio", "partido": "PT"}, {"nr": "7777", "urna": "Denes Pereira", "partido": "SOLIDARIEDADE"}, {"nr": "4343", "urna": "Denise Santos", "partido": "PV"}, {"nr": "2745", "urna": "Dom Valdiley", "partido": "DC"}, {"nr": "1555", "urna": "Domingas DA Saúde", "partido": "MDB"}, {"nr": "2727", "urna": "DR Paulo Daher", "partido": "DC"}, {"nr": "1433", "urna": "DR Reiller Lopes", "partido": "MISSÃO"}, {"nr": "7799", "urna": "Dr. Antonio", "partido": "SOLIDARIEDADE"}, {"nr": "4030", "urna": "Dr. Ezizio Barbosa", "partido": "PSB"}, {"nr": "5555", "urna": "Dr. Ismael Alexandrino", "partido": "PSD"}, {"nr": "2055", "urna": "Dr. Ricardo Caiado", "partido": "PODE"}, {"nr": "1000", "urna": "Dr. Samuel Gemus", "partido": "REPUBLICANOS"}, {"nr": "2223", "urna": "Dr. Wagner Miranda Hosp.cancer", "partido": "PL"}, {"nr": "7710", "urna": "Dra Cristina", "partido": "SOLIDARIEDADE"}, {"nr": "2215", "urna": "Dra. Alessandra Jacob", "partido": "PL"}, {"nr": "1022", "urna": "Dra. Aline Lima", "partido": "REPUBLICANOS"}, {"nr": "2707", "urna": "Dra. Fabricia Sette", "partido": "DC"}, {"nr": "4004", "urna": "Dra. Ivane", "partido": "PSB"}, {"nr": "5566", "urna": "Dra. Zeli", "partido": "PSD"}, {"nr": "2710", "urna": "Edivania Silva", "partido": "DC"}, {"nr": "4333", "urna": "Edmotos", "partido": "PV"}, {"nr": "1212", "urna": "Edson Candido", "partido": "PDT"}, {"nr": "2002", "urna": "Elaine DA Flagyn", "partido": "PODE"}, {"nr": "7744", "urna": "Eliel Junior", "partido": "SOLIDARIEDADE"}, {"nr": "4577", "urna": "Eliete Paixão", "partido": "PSDB"}, {"nr": "1557", "urna": "Elisangela Araujo", "partido": "MDB"}, {"nr": "1203", "urna": "Eliseu Francisco", "partido": "PDT"}, {"nr": "8080", "urna": "Emily Eloá", "partido": "UP"}, {"nr": "1080", "urna": "Ewerton Garcia", "partido": "REPUBLICANOS"}, {"nr": "2044", "urna": "Fabrício DA 44", "partido": "PODE"}, {"nr": "3090", "urna": "Fagner Sky", "partido": "NOVO"}, {"nr": "8000", "urna": "Fausto André", "partido": "UP"}, {"nr": "4555", "urna": "Felipe Cecílio", "partido": "PSDB"}, {"nr": "1155", "urna": "Felisberto Tavares", "partido": "PP"}, {"nr": "4000", "urna": "Fellipe Fonseca", "partido": "PSB"}, {"nr": "1419", "urna": "Fernanda Borges", "partido": "MISSÃO"}, {"nr": "1088", "urna": "Fernando Cobrador", "partido": "REPUBLICANOS"}, {"nr": "5000", "urna": "Fernando Viana", "partido": "PSOL"}, {"nr": "1072", "urna": "Ferreira DO Portal Notícia", "partido": "REPUBLICANOS"}, {"nr": "1399", "urna": "Flaviane Santos", "partido": "PT"}, {"nr": "4515", "urna": "Flávia DO Maguito", "partido": "PSDB"}, {"nr": "1515", "urna": "Flávia Morais", "partido": "MDB"}, {"nr": "5077", "urna": "Fontes Lucena", "partido": "PSOL"}, {"nr": "2220", "urna": "Fred Rodrigues", "partido": "PL"}, {"nr": "2200", "urna": "Fábio Sousa", "partido": "PL"}, {"nr": "6565", "urna": "Fábio Tokarski", "partido": "PCDOB"}, {"nr": "1477", "urna": "Gabriel Morse Missão", "partido": "MISSÃO"}, {"nr": "3003", "urna": "Gabriela Pugliesi", "partido": "NOVO"}, {"nr": "2017", "urna": "Gabriela Rodart", "partido": "PODE"}, {"nr": "3001", "urna": "Gabriella Machado", "partido": "NOVO"}, {"nr": "3000", "urna": "Giselda DA Saúde", "partido": "NOVO"}, {"nr": "2021", "urna": "Gislaine Maia", "partido": "PODE"}, {"nr": "4546", "urna": "Glaucia Melo", "partido": "PSDB"}, {"nr": "2026", "urna": "Glaustin DA Fokus", "partido": "PODE"}, {"nr": "1530", "urna": "Gleimo Martins", "partido": "MDB"}, {"nr": "1400", "urna": "Guilherme Khalil", "partido": "MISSÃO"}, {"nr": "4013", "urna": "Hansmuller Salome", "partido": "PSB"}, {"nr": "4514", "urna": "Henrique Arantes", "partido": "PSDB"}, {"nr": "2255", "urna": "Henrique Vilela", "partido": "PL"}, {"nr": "5050", "urna": "Humberto Chaves", "partido": "PSOL"}, {"nr": "2022", "urna": "Igor Franco", "partido": "PODE"}, {"nr": "2722", "urna": "Irmão Ralff Alerta Total", "partido": "DC"}, {"nr": "5567", "urna": "Itamar Barreto", "partido": "PSD"}, {"nr": "4551", "urna": "Itamar Leão", "partido": "PSDB"}, {"nr": "2552", "urna": "Jaque Moura", "partido": "PRD"}, {"nr": "4556", "urna": "Jeferson Rodrigues", "partido": "PSDB"}, {"nr": "1219", "urna": "Jessica Karoline", "partido": "PDT"}, {"nr": "1410", "urna": "Jhone Santos", "partido": "MISSÃO"}, {"nr": "2789", "urna": "Joelma Silva", "partido": "DC"}, {"nr": "2212", "urna": "Jordana Ferreira", "partido": "PL"}, {"nr": "4415", "urna": "Jose Nelto", "partido": "UNIÃO"}, {"nr": "2077", "urna": "Josy Ferrari", "partido": "PODE"}, {"nr": "2225", "urna": "José Otávio", "partido": "PL"}, {"nr": "3036", "urna": "João Batista", "partido": "NOVO"}, {"nr": "2020", "urna": "João Campos", "partido": "PODE"}, {"nr": "2323", "urna": "João DA Luz", "partido": "CIDADANIA"}, {"nr": "2730", "urna": "João Dadalte", "partido": "DC"}, {"nr": "1414", "urna": "João Noleto", "partido": "MISSÃO"}, {"nr": "7789", "urna": "João Pedro Almeida", "partido": "SOLIDARIEDADE"}, {"nr": "1533", "urna": "Joãozinho Guimarães", "partido": "MDB"}, {"nr": "2733", "urna": "Juarez Explosão", "partido": "DC"}, {"nr": "3088", "urna": "Juiz Cubas", "partido": "NOVO"}, {"nr": "4061", "urna": "Júlio Barreto", "partido": "PSB"}, {"nr": "2711", "urna": "Júlio Cesar", "partido": "DC"}, {"nr": "1060", "urna": "Kelly Fera", "partido": "REPUBLICANOS"}, {"nr": "3012", "urna": "Laion", "partido": "NOVO"}, {"nr": "2027", "urna": "Leo Machado Verdade", "partido": "PODE"}, {"nr": "4567", "urna": "Leozão", "partido": "PSDB"}, {"nr": "1213", "urna": "Leticia DA Luz", "partido": "PDT"}, {"nr": "1810", "urna": "Lilia Monteiro", "partido": "REDE"}, {"nr": "4488", "urna": "Liliane Costa", "partido": "UNIÃO"}, {"nr": "2790", "urna": "Lis Marques", "partido": "DC"}, {"nr": "2502", "urna": "LO Ferreira", "partido": "PRD"}, {"nr": "4022", "urna": "Lorena Silva", "partido": "PSB"}, {"nr": "4477", "urna": "Lorrayne Castro", "partido": "UNIÃO"}, {"nr": "1177", "urna": "Luana Raiado", "partido": "PP"}, {"nr": "3070", "urna": "Lucas Brás", "partido": "NOVO"}, {"nr": "2525", "urna": "Lucas Calil", "partido": "PRD"}, {"nr": "5544", "urna": "Lucas DO Vale", "partido": "PSD"}, {"nr": "1510", "urna": "Lucas Vergílio", "partido": "MDB"}, {"nr": "2033", "urna": "Luciana DA Culinária", "partido": "PODE"}, {"nr": "3022", "urna": "Luciano Guimarães", "partido": "NOVO"}, {"nr": "2210", "urna": "Lucélia Rodrigues", "partido": "PL"}, {"nr": "1020", "urna": "Lêda Borges", "partido": "REPUBLICANOS"}, {"nr": "1012", "urna": "Maella Bethânia", "partido": "REPUBLICANOS"}, {"nr": "2222", "urna": "Magda Mofatto", "partido": "PL"}, {"nr": "1456", "urna": "Magna Mota", "partido": "MISSÃO"}, {"nr": "5015", "urna": "Magno Constantino", "partido": "PSOL"}, {"nr": "2201", "urna": "Major Vitor Hugo", "partido": "PL"}, {"nr": "1367", "urna": "Maju Ferrari", "partido": "PT"}, {"nr": "3010", "urna": "Manu Pádua", "partido": "NOVO"}, {"nr": "3030", "urna": "Marcelo Prado", "partido": "NOVO"}, {"nr": "5055", "urna": "Maria Verônica", "partido": "PSOL"}, {"nr": "1011", "urna": "Mariane Stival", "partido": "REPUBLICANOS"}, {"nr": "1055", "urna": "Marussa Boldrin", "partido": "REPUBLICANOS"}, {"nr": "2777", "urna": "Mauricio Comunicativo Leste", "partido": "DC"}, {"nr": "4092", "urna": "Max DA Saúde", "partido": "PSB"}, {"nr": "2207", "urna": "Maycon Tombini", "partido": "PL"}, {"nr": "1444", "urna": "Maykel Carvalho", "partido": "MISSÃO"}, {"nr": "1577", "urna": "Mestre Francisco Taekwondo", "partido": "MDB"}, {"nr": "1517", "urna": "Miriã Pires", "partido": "MDB"}, {"nr": "1255", "urna": "Missionária Luiza", "partido": "PDT"}, {"nr": "1500", "urna": "Mizair Lemes JR", "partido": "MDB"}, {"nr": "1001", "urna": "Moraes DA Lanchonete", "partido": "REPUBLICANOS"}, {"nr": "4001", "urna": "Mucio Santana", "partido": "PSB"}, {"nr": "1015", "urna": "Márcia Fofa", "partido": "REPUBLICANOS"}, {"nr": "1307", "urna": "Mãe Isabel DE Oxum", "partido": "PT"}, {"nr": "1488", "urna": "Mônica DE Paula", "partido": "MISSÃO"}, {"nr": "2780", "urna": "Mônica Nasser", "partido": "DC"}, {"nr": "1588", "urna": "Nailde Lima", "partido": "MDB"}, {"nr": "4055", "urna": "Natália Rinco", "partido": "PSB"}, {"nr": "2710", "urna": "Neide Alves", "partido": "DC"}, {"nr": "1512", "urna": "Nicolina Tia Nicola", "partido": "MDB"}, {"nr": "4011", "urna": "Nixon Das Casinhas", "partido": "PSB"}, {"nr": "1245", "urna": "Orlando Alves", "partido": "PDT"}, {"nr": "4512", "urna": "Osmar Lisboa", "partido": "PSDB"}, {"nr": "1455", "urna": "Ozeias Soares", "partido": "MISSÃO"}, {"nr": "1230", "urna": "Padre Roberto", "partido": "PDT"}, {"nr": "1520", "urna": "Papacapim", "partido": "MDB"}, {"nr": "1807", "urna": "Pastor Camioneiro", "partido": "REDE"}, {"nr": "1223", "urna": "Pastor Juarez DA Saúde", "partido": "PDT"}, {"nr": "2030", "urna": "Pastora Gizelle Teles", "partido": "PODE"}, {"nr": "1115", "urna": "Pastora Léia Fernandes", "partido": "PP"}, {"nr": "1209", "urna": "Patricia DA Mota", "partido": "PDT"}, {"nr": "1070", "urna": "Paulo DA Farmácia", "partido": "REPUBLICANOS"}, {"nr": "5556", "urna": "Paulo Martinez", "partido": "PSD"}, {"nr": "2522", "urna": "Pedro Canedo", "partido": "PRD"}, {"nr": "5599", "urna": "Pedro Sales", "partido": "PSD"}, {"nr": "3050", "urna": "Philippe Abner", "partido": "NOVO"}, {"nr": "2233", "urna": "Policial Federal Suender", "partido": "PL"}, {"nr": "1233", "urna": "Prof. Moacir", "partido": "PDT"}, {"nr": "4500", "urna": "Professor Alcides", "partido": "PSDB"}, {"nr": "1100", "urna": "Professor Alex Martins", "partido": "PP"}, {"nr": "1310", "urna": "Professor Edward", "partido": "PT"}, {"nr": "1314", "urna": "Professor Maurélio", "partido": "PT"}, {"nr": "5500", "urna": "Professor Élio Lima", "partido": "PSD"}, {"nr": "5041", "urna": "Professora Carmem", "partido": "PSOL"}, {"nr": "5515", "urna": "Professora Fátima Gavioli", "partido": "PSD"}, {"nr": "1333", "urna": "Professora Railda", "partido": "PT"}, {"nr": "2238", "urna": "Raphael Barra", "partido": "PL"}, {"nr": "4540", "urna": "Rebeca Romero", "partido": "PSDB"}, {"nr": "1511", "urna": "Regina Célia", "partido": "MDB"}, {"nr": "2230", "urna": "Renato Ribeiro", "partido": "PL"}, {"nr": "1010", "urna": "Ricardo Quirino", "partido": "REPUBLICANOS"}, {"nr": "3033", "urna": "Roberto Gomes", "partido": "NOVO"}, {"nr": "1467", "urna": "Roberto Junior (ravengaar)", "partido": "MISSÃO"}, {"nr": "4510", "urna": "Rodolfo Valente", "partido": "PSDB"}, {"nr": "3091", "urna": "Rosa Gonolli", "partido": "NOVO"}, {"nr": "2737", "urna": "Rosalina Proteção Animal", "partido": "DC"}, {"nr": "2010", "urna": "Rosangela DA Habitação", "partido": "PODE"}, {"nr": "5512", "urna": "Roseli DA Saúde E Social", "partido": "PSD"}, {"nr": "1313", "urna": "Rubens Otoni", "partido": "PT"}, {"nr": "1210", "urna": "Rubinho DO Povão", "partido": "PDT"}, {"nr": "4411", "urna": "Salma DA Pestalozzi", "partido": "UNIÃO"}, {"nr": "1234", "urna": "Salmo Cabral", "partido": "PDT"}, {"nr": "1040", "urna": "Samuel DA Ração", "partido": "REPUBLICANOS"}, {"nr": "2090", "urna": "Samuel Santos", "partido": "PODE"}, {"nr": "1122", "urna": "Sanches", "partido": "PP"}, {"nr": "3020", "urna": "Sandra Azevedo", "partido": "NOVO"}, {"nr": "1544", "urna": "Sandro Pedroso", "partido": "MDB"}, {"nr": "3028", "urna": "Santana Pires", "partido": "NOVO"}, {"nr": "1290", "urna": "Sargento Carneiro", "partido": "PDT"}, {"nr": "5551", "urna": "Sargento Joélcio", "partido": "PSD"}, {"nr": "2590", "urna": "Sargento Wiviane", "partido": "PRD"}, {"nr": "2500", "urna": "Silvio Vaz", "partido": "PRD"}, {"nr": "4444", "urna": "Silvye Alves", "partido": "UNIÃO"}, {"nr": "4440", "urna": "Subtenente Denise Brasil", "partido": "UNIÃO"}, {"nr": "1522", "urna": "Subtenente Sérgio", "partido": "MDB"}, {"nr": "5076", "urna": "Sulamita Santos", "partido": "PSOL"}, {"nr": "1377", "urna": "Suzana Carvalho", "partido": "PT"}, {"nr": "4033", "urna": "Sérgio Bravo JR", "partido": "PSB"}, {"nr": "4015", "urna": "Tales DE Castro", "partido": "PSB"}, {"nr": "1200", "urna": "Talita Lemke", "partido": "PDT"}, {"nr": "4044", "urna": "Tatiana Lemos", "partido": "PSB"}, {"nr": "7712", "urna": "Tatiely Sousa", "partido": "SOLIDARIEDADE"}, {"nr": "2770", "urna": "Telves Cunha", "partido": "DC"}, {"nr": "4550", "urna": "Tenente Eglai", "partido": "PSDB"}, {"nr": "7770", "urna": "Tenente Rhainna", "partido": "SOLIDARIEDADE"}, {"nr": "5013", "urna": "Thaís Castro", "partido": "PSOL"}, {"nr": "1199", "urna": "Val Nascimento", "partido": "PP"}, {"nr": "1144", "urna": "Valeria Pettersen", "partido": "PP"}, {"nr": "1312", "urna": "Valério Luiz", "partido": "PT"}, {"nr": "2015", "urna": "Vanessa Farias", "partido": "PODE"}, {"nr": "5062", "urna": "Victor Verde", "partido": "PSOL"}, {"nr": "1033", "urna": "Virgínia DO Social", "partido": "REPUBLICANOS"}, {"nr": "2577", "urna": "Washington Alves", "partido": "PRD"}, {"nr": "4412", "urna": "Wederson Lopes", "partido": "UNIÃO"}, {"nr": "4020", "urna": "Wesley Costa", "partido": "PSB"}, {"nr": "1077", "urna": "Williard Pontes", "partido": "REPUBLICANOS"}, {"nr": "5022", "urna": "Xavier", "partido": "PSOL"}, {"nr": "2277", "urna": "Yvelônia", "partido": "PL"}, {"nr": "2012", "urna": "ZÉ Camelo", "partido": "PODE"}]
};

/* ---------- MAIS BEM COLOCADOS NAS PESQUISAS ----------
   NÃO é previsão de resultado. É o ranking da pesquisa mais recente e completa de
   cada cargo, com margem de erro e empates técnicos explícitos.
   Empate técnico = diferença menor que a margem de erro: nesse caso os números NÃO
   permitem dizer quem está na frente. */
const TOP_PESQUISAS = {
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
      id: 'depest', rotulo: 'Deputado estadual por Goiás',
      inst: 'Goiás Pesquisas / Mais Goiás', reg: null,
      campo: 'divulgada em 16/set', me: 3.93, n: null, base: 'citações espontâneas',
      espontanea: true,
      limitacao: 'Atenção: esta é uma pesquisa ESPONTÂNEA (sem apresentar nomes ao eleitor) e restrita a Goiânia. Todos os percentuais estão ABAIXO da margem de erro de ± 3,93 pontos, então os números não permitem ordenar os candidatos nem indicar quem se elege. Entre os 595 candidatos, apenas estes foram citados. Use a lista completa, não este recorte.',
      fonte: 'https://www.maisgoias.com.br/blogs/poder-em-jogo/goias-pesquisas-mais-goias-veja-os-nomes-mais-citados-para-deputado-estadual-na-capital/',
      lista: [
        { nome: 'Romário Policarpo', partido: 'Cidadania', nr: '—', v: 2.25 },
        { nome: 'Paulin Vai Nele', partido: 'PRD', nr: '—', v: 2.25 },
        { nome: 'Virmondes Cruvinel', partido: 'União Brasil', nr: '—', v: 0.81 },
        { nome: 'Charles Bento', partido: 'MDB', nr: '—', v: 0.81 },
        { nome: 'Amauri Ribeiro', partido: 'PL', nr: '—', v: 0.81 }
      ]
    },
    {
      id: 'depfed', rotulo: 'Deputado federal por Goiás',
      inst: 'Instituto Directa', reg: 'GO-05903/2026', campo: 'divulgada em 1º/out',
      me: 2.83, n: 1200, base: 'votos válidos',
      limitacao: 'Esta é a única pesquisa de deputado federal em Goiás que localizamos, e ela mediu apenas 3 dos 265 candidatos. A ausência de um nome aqui não significa que ele tenha menos chance — significa que não foi medido.',
      fonte: 'https://aredacao.com.br/bruno-peixoto-lidera-pesquisa-para-deputado-federal-em-goias/',
      lista: [
        { nome: 'Bruno Peixoto', partido: 'UNIÃO', nr: '4455', v: 5.3 },
        { nome: 'Flávia Morais', partido: 'MDB', nr: '1515', v: 4.4 },
        { nome: 'Delegado Waldir', partido: 'UNIÃO', nr: '4400', v: 4.0 }
      ]
    }
  ]
};

/* ---------- DEPUTADO ESTADUAL — candidatos oficiais do TSE ----------
   Origem: consulta_cand_2026_GO.csv (Portal de Dados Abertos do TSE).
   Goiás elege 41 deputados estaduais entre 595 candidatos.
   Dois números (15100 e 30038) constam para mais de um candidato no arquivo;
   nesses casos a colinha avisa em vez de escolher. */
const DEPEST_GO = {
  total: 595,
  vagas: 41,
  fonte: "TSE · consulta de candidatos 2026",
  fonteUrl: "https://dadosabertos.tse.jus.br/dataset/candidatos-2026",
  porPartido: [["NOVO", 43], ["MDB", 43], ["PL", 43], ["MOBILIZA", 41], ["AGIR", 41], ["UNIÃO", 41], ["PSDB", 40], ["PODE", 39], ["PT", 38], ["DC", 33], ["DEMOCRATA", 32], ["PSB", 30], ["REPUBLICANOS", 29], ["PRD", 23], ["PSOL", 21], ["SOLIDARIEDADE", 17], ["PSD", 17], ["REDE", 12], ["CIDADANIA", 3], ["PV", 3], ["PP", 2], ["UP", 2], ["PCDOB", 2]],
  lista: [{"nr": "44360", "urna": "Abadyas Damasceno", "partido": "UNIÃO"}, {"nr": "15200", "urna": "Abimael Silva Da Tv", "partido": "MDB"}, {"nr": "27333", "urna": "Adao Ferraz", "partido": "DC"}, {"nr": "77456", "urna": "Adelson Da Montlajes", "partido": "SOLIDARIEDADE"}, {"nr": "10101", "urna": "Adelson Moura", "partido": "REPUBLICANOS"}, {"nr": "15111", "urna": "Adib Elias", "partido": "MDB"}, {"nr": "27700", "urna": "Adilson Do Gás", "partido": "DC"}, {"nr": "50999", "urna": "Adonias Dourado", "partido": "PSOL"}, {"nr": "27246", "urna": "Adriane Maia", "partido": "DC"}, {"nr": "45200", "urna": "Adrianinho", "partido": "PSDB"}, {"nr": "55055", "urna": "Adriano Guimarães", "partido": "PSD"}, {"nr": "25900", "urna": "Adriciele Dalacorte", "partido": "PRD"}, {"nr": "40113", "urna": "Adão Pedreiro", "partido": "PSB"}, {"nr": "30555", "urna": "Agenor Curado", "partido": "NOVO"}, {"nr": "10521", "urna": "Aiane Gama", "partido": "REPUBLICANOS"}, {"nr": "50400", "urna": "Airton Coelho", "partido": "PSOL"}, {"nr": "40852", "urna": "Aldenor Carneiro", "partido": "PSB"}, {"nr": "50444", "urna": "Aleido Afiune", "partido": "PSOL"}, {"nr": "15001", "urna": "Alessandra Iskandar", "partido": "MDB"}, {"nr": "36011", "urna": "Alessandra Oliveira", "partido": "AGIR"}, {"nr": "13113", "urna": "Alessandro Caxotinho", "partido": "PT"}, {"nr": "25111", "urna": "Alessandro Moreira", "partido": "PRD"}, {"nr": "18888", "urna": "Alex Almeida", "partido": "REDE"}, {"nr": "22671", "urna": "Alex Dos Garis", "partido": "PL"}, {"nr": "22345", "urna": "Alex Villas Boas", "partido": "PL"}, {"nr": "50024", "urna": "Alexandre Cruz", "partido": "PSOL"}, {"nr": "25500", "urna": "Alvaro Rezende", "partido": "PRD"}, {"nr": "36001", "urna": "Alves Batista Alvim", "partido": "AGIR"}, {"nr": "50500", "urna": "Amanda Costa", "partido": "PSOL"}, {"nr": "22000", "urna": "Amauri Ribeiro", "partido": "PL"}, {"nr": "15100", "urna": "Amilton Filho", "partido": "MDB"}, {"nr": "13700", "urna": "Ana Carol", "partido": "PT"}, {"nr": "10300", "urna": "Ana Carolina", "partido": "REPUBLICANOS"}, {"nr": "35020", "urna": "Ana Lucia Do Salão", "partido": "DEMOCRATA"}, {"nr": "50503", "urna": "Ana Maria Da Saúde", "partido": "PSOL"}, {"nr": "22044", "urna": "Ana Paula Da 44", "partido": "PL"}, {"nr": "33300", "urna": "Ana Paula Do Aleomar", "partido": "MOBILIZA"}, {"nr": "25789", "urna": "Anderson Teodoro", "partido": "PRD"}, {"nr": "45005", "urna": "Andrea Santos", "partido": "PSDB"}, {"nr": "35888", "urna": "Andreia Lucia", "partido": "DEMOCRATA"}, {"nr": "44333", "urna": "André Do Premium", "partido": "UNIÃO"}, {"nr": "13999", "urna": "Angela Da Saude", "partido": "PT"}, {"nr": "27045", "urna": "Angela Maria", "partido": "DC"}, {"nr": "15007", "urna": "Anne Kelly", "partido": "MDB"}, {"nr": "35777", "urna": "Antonio Carlos Cavalcante", "partido": "DEMOCRATA"}, {"nr": "13456", "urna": "Antonio Gomide", "partido": "PT"}, {"nr": "18018", "urna": "Antonio Zayek", "partido": "REDE"}, {"nr": "35500", "urna": "Antônio Carneiro", "partido": "DEMOCRATA"}, {"nr": "36888", "urna": "Apostolo Wesley Sander", "partido": "AGIR"}, {"nr": "27555", "urna": "Aracelly Cantuario", "partido": "DC"}, {"nr": "44044", "urna": "Arianne Cândido", "partido": "UNIÃO"}, {"nr": "30190", "urna": "Arthur Razec", "partido": "NOVO"}, {"nr": "25044", "urna": "Astride Magalhães", "partido": "PRD"}, {"nr": "20070", "urna": "Baiano Dos Cocos", "partido": "PODE"}, {"nr": "33279", "urna": "Batiquira", "partido": "MOBILIZA"}, {"nr": "33700", "urna": "Bessa", "partido": "MOBILIZA"}, {"nr": "22229", "urna": "Betinho Do Agro", "partido": "PL"}, {"nr": "44144", "urna": "Beto Neves", "partido": "UNIÃO"}, {"nr": "44190", "urna": "Betânia Macedo", "partido": "UNIÃO"}, {"nr": "55223", "urna": "Bia", "partido": "PSD"}, {"nr": "13123", "urna": "Bia De Lima", "partido": "PT"}, {"nr": "33022", "urna": "Bianca Vinhal", "partido": "MOBILIZA"}, {"nr": "33200", "urna": "Biany Lourenço", "partido": "MOBILIZA"}, {"nr": "20233", "urna": "Bieiz Valeriano", "partido": "PODE"}, {"nr": "13062", "urna": "Bola De Fogo Zero Meia Dois", "partido": "PT"}, {"nr": "15391", "urna": "Bombeira Luna", "partido": "MDB"}, {"nr": "22777", "urna": "Brena Santos", "partido": "PL"}, {"nr": "30500", "urna": "Brenda Gontijo", "partido": "NOVO"}, {"nr": "50013", "urna": "Bruno Gg", "partido": "PSOL"}, {"nr": "33190", "urna": "Cabo Senna", "partido": "MOBILIZA"}, {"nr": "15123", "urna": "Cairo Salim", "partido": "MDB"}, {"nr": "45190", "urna": "Capitã Waleska", "partido": "PSDB"}, {"nr": "15038", "urna": "Capitão Wilson De Oliveira", "partido": "MDB"}, {"nr": "10123", "urna": "Cardoso", "partido": "REPUBLICANOS"}, {"nr": "77100", "urna": "Carla Da Focinho", "partido": "SOLIDARIEDADE"}, {"nr": "22111", "urna": "Carlinhos Canzi", "partido": "PL"}, {"nr": "77877", "urna": "Carlos Kozlowski", "partido": "SOLIDARIEDADE"}, {"nr": "15000", "urna": "Carlão Da Fox", "partido": "MDB"}, {"nr": "15100", "urna": "Carol Do Amiltinho", "partido": "MDB"}, {"nr": "44026", "urna": "Carol Monteiro", "partido": "UNIÃO"}, {"nr": "33555", "urna": "Carpegiane Silvestre", "partido": "MOBILIZA"}, {"nr": "13333", "urna": "Cassiana Tormin", "partido": "PT"}, {"nr": "36145", "urna": "Cassiano Vieira", "partido": "AGIR"}, {"nr": "22077", "urna": "Celia Duarte", "partido": "PL"}, {"nr": "15600", "urna": "Charles Bento", "partido": "MDB"}, {"nr": "30130", "urna": "Charlles José Da Fredcar", "partido": "NOVO"}, {"nr": "36500", "urna": "Chorão Caminhoneiro", "partido": "AGIR"}, {"nr": "22500", "urna": "Christina Rakel", "partido": "PL"}, {"nr": "13800", "urna": "Cicero Goias", "partido": "PT"}, {"nr": "27600", "urna": "Cidinha Araujo", "partido": "DC"}, {"nr": "44444", "urna": "Ciê Do Sacolão", "partido": "UNIÃO"}, {"nr": "36777", "urna": "Claudia Dias", "partido": "AGIR"}, {"nr": "44141", "urna": "Claudia Silva", "partido": "UNIÃO"}, {"nr": "22122", "urna": "Claudinha Cruvinel", "partido": "PL"}, {"nr": "36799", "urna": "Claudinha Da Valdete", "partido": "AGIR"}, {"nr": "45510", "urna": "Cleia Neves", "partido": "PSDB"}, {"nr": "20234", "urna": "Cleia Pedrozo", "partido": "PODE"}, {"nr": "25100", "urna": "Cleitin Mil Graus", "partido": "PRD"}, {"nr": "36220", "urna": "Cleiton Lazaro", "partido": "AGIR"}, {"nr": "13100", "urna": "Cleiton Silva", "partido": "PT"}, {"nr": "15791", "urna": "Clenys Pinheira", "partido": "MDB"}, {"nr": "20044", "urna": "Cleonão Do Povo", "partido": "PODE"}, {"nr": "77000", "urna": "Clezer Oliveira", "partido": "SOLIDARIEDADE"}, {"nr": "45111", "urna": "Clécio Alves", "partido": "PSDB"}, {"nr": "30730", "urna": "Clésia Oliveira", "partido": "NOVO"}, {"nr": "77190", "urna": "Coronel Adailton", "partido": "SOLIDARIEDADE"}, {"nr": "55777", "urna": "Coronel Edson Raiado", "partido": "PSD"}, {"nr": "35190", "urna": "Coronel Hemerson", "partido": "DEMOCRATA"}, {"nr": "35800", "urna": "Coronel Marreiros", "partido": "DEMOCRATA"}, {"nr": "22001", "urna": "Coronel Urzeda", "partido": "PL"}, {"nr": "40004", "urna": "Cris Souza", "partido": "PSB"}, {"nr": "77099", "urna": "Cristiano Galindo", "partido": "SOLIDARIEDADE"}, {"nr": "30001", "urna": "Cristiano Zoi", "partido": "NOVO"}, {"nr": "25333", "urna": "Cristóvão", "partido": "PRD"}, {"nr": "15015", "urna": "Célia Valadão", "partido": "MDB"}, {"nr": "20003", "urna": "Daiana Oliveira", "partido": "PODE"}, {"nr": "35000", "urna": "Daniel Do Sindicato", "partido": "DEMOCRATA"}, {"nr": "27567", "urna": "Daniel Dutra", "partido": "DC"}, {"nr": "33500", "urna": "Daniel Messac", "partido": "MOBILIZA"}, {"nr": "27222", "urna": "Daniel Nogueira", "partido": "DC"}, {"nr": "30321", "urna": "Danilo Rios", "partido": "NOVO"}, {"nr": "30400", "urna": "Delcides Assis", "partido": "NOVO"}, {"nr": "36123", "urna": "Delegado Cristiomário", "partido": "AGIR"}, {"nr": "13007", "urna": "Delegado Yasser", "partido": "PT"}, {"nr": "36180", "urna": "Denice Patroa Do Brasil", "partido": "AGIR"}, {"nr": "20020", "urna": "Denis Bento", "partido": "PODE"}, {"nr": "33033", "urna": "Denise Martins", "partido": "MOBILIZA"}, {"nr": "50000", "urna": "Diego Jejees", "partido": "PSOL"}, {"nr": "22555", "urna": "Diego Morais", "partido": "PL"}, {"nr": "22220", "urna": "Dieyme Vasconcelos", "partido": "PL"}, {"nr": "33035", "urna": "Dilma Da Casa De Apoio", "partido": "MOBILIZA"}, {"nr": "27300", "urna": "Dinair Dino Rodas", "partido": "DC"}, {"nr": "36036", "urna": "Dino Mariano Excursões", "partido": "AGIR"}, {"nr": "22357", "urna": "Diogo Yagi", "partido": "PL"}, {"nr": "27797", "urna": "Divino", "partido": "DC"}, {"nr": "35007", "urna": "Dió", "partido": "DEMOCRATA"}, {"nr": "44000", "urna": "Diógenes Resíduo Zero", "partido": "UNIÃO"}, {"nr": "44004", "urna": "Djanira Soares", "partido": "UNIÃO"}, {"nr": "45645", "urna": "Domingos Rodrigues", "partido": "PSDB"}, {"nr": "44322", "urna": "Dona Ana", "partido": "UNIÃO"}, {"nr": "15300", "urna": "Dona Lúcia Quilombola", "partido": "MDB"}, {"nr": "36000", "urna": "Dr Kassio Guimaraes", "partido": "AGIR"}, {"nr": "27233", "urna": "Dr Marcio Moraes", "partido": "DC"}, {"nr": "30111", "urna": "Dr. Amarildo", "partido": "NOVO"}, {"nr": "44110", "urna": "Dr. Assilvo D Abbadia", "partido": "UNIÃO"}, {"nr": "10700", "urna": "Dr. Franklin Carvalho", "partido": "REPUBLICANOS"}, {"nr": "15150", "urna": "Dr. George Morais", "partido": "MDB"}, {"nr": "45789", "urna": "Dr. Helio De Sousa", "partido": "PSDB"}, {"nr": "13256", "urna": "Dr. Jose Nilton Carvalho", "partido": "PT"}, {"nr": "20777", "urna": "Dr. Lourival Lobo", "partido": "PODE"}, {"nr": "20200", "urna": "Dr. Ramon", "partido": "PODE"}, {"nr": "45500", "urna": "Dr. Rannieri Lopes", "partido": "PSDB"}, {"nr": "45454", "urna": "Dr. Walter Vosgrau", "partido": "PSDB"}, {"nr": "30800", "urna": "Dr. Wanderley", "partido": "NOVO"}, {"nr": "20567", "urna": "Dra Fabiana Gonçalves", "partido": "PODE"}, {"nr": "15128", "urna": "Dra Jennifer Morais", "partido": "MDB"}, {"nr": "36652", "urna": "Dra Keli Martins", "partido": "AGIR"}, {"nr": "33121", "urna": "Dra. Camila Alves", "partido": "MOBILIZA"}, {"nr": "45333", "urna": "Dra. Fabianne Leão", "partido": "PSDB"}, {"nr": "30456", "urna": "Dra. Fernanda Sarelli", "partido": "NOVO"}, {"nr": "22722", "urna": "Dra. Julmara Toledo", "partido": "PL"}, {"nr": "45530", "urna": "Dra. Simone Adad", "partido": "PSDB"}, {"nr": "44566", "urna": "Dulce Martins", "partido": "UNIÃO"}, {"nr": "20000", "urna": "Débora Domingues", "partido": "PODE"}, {"nr": "15005", "urna": "Délice Brasil", "partido": "MDB"}, {"nr": "15090", "urna": "Edilson Taquaral O Mió", "partido": "MDB"}, {"nr": "22225", "urna": "Edinalva Rosa", "partido": "PL"}, {"nr": "36789", "urna": "Edinho Carvalho", "partido": "AGIR"}, {"nr": "50101", "urna": "Edmilson Capelão", "partido": "PSOL"}, {"nr": "30123", "urna": "Edna Costa", "partido": "NOVO"}, {"nr": "36360", "urna": "Edson Automóveis Filho", "partido": "AGIR"}, {"nr": "22123", "urna": "Eduardo Prado", "partido": "PL"}, {"nr": "30345", "urna": "Edward Júnior", "partido": "NOVO"}, {"nr": "25777", "urna": "Elaine Rodrigues", "partido": "PRD"}, {"nr": "10222", "urna": "Elcimar Conexão", "partido": "REPUBLICANOS"}, {"nr": "36765", "urna": "Eliane Da Saude", "partido": "AGIR"}, {"nr": "35300", "urna": "Eliane Nascimento", "partido": "DEMOCRATA"}, {"nr": "44441", "urna": "Eliene Corretora", "partido": "UNIÃO"}, {"nr": "15050", "urna": "Eliety", "partido": "MDB"}, {"nr": "20123", "urna": "Elisa Da Saúde", "partido": "PODE"}, {"nr": "33888", "urna": "Elke Marques", "partido": "MOBILIZA"}, {"nr": "10710", "urna": "Eltinho Jk", "partido": "REPUBLICANOS"}, {"nr": "20666", "urna": "Eneas Amaral", "partido": "PODE"}, {"nr": "27500", "urna": "Enfermeira Michelly", "partido": "DC"}, {"nr": "50777", "urna": "Enio Brito", "partido": "PSOL"}, {"nr": "25150", "urna": "Ernesto Dias", "partido": "PRD"}, {"nr": "33222", "urna": "Ethienne Gayer", "partido": "MOBILIZA"}, {"nr": "22246", "urna": "Eunice Bento", "partido": "PL"}, {"nr": "43000", "urna": "Everaldo Pastore", "partido": "PV"}, {"nr": "33217", "urna": "Fabi Lima", "partido": "MOBILIZA"}, {"nr": "36111", "urna": "Fabio Correa", "partido": "AGIR"}, {"nr": "13000", "urna": "Fabricio Rosa", "partido": "PT"}, {"nr": "27027", "urna": "Fausto Pires", "partido": "DC"}, {"nr": "33900", "urna": "Felipe Cortez", "partido": "MOBILIZA"}, {"nr": "22133", "urna": "Felipe Galdino", "partido": "PL"}, {"nr": "20700", "urna": "Felipe Mabel", "partido": "PODE"}, {"nr": "15056", "urna": "Felix Ar Motociclista Entregad", "partido": "MDB"}, {"nr": "13133", "urna": "Fernandes", "partido": "PT"}, {"nr": "20022", "urna": "Fernando Cintra", "partido": "PODE"}, {"nr": "36100", "urna": "Fernando Cruvinel", "partido": "AGIR"}, {"nr": "36240", "urna": "Fernando Dr Nildo", "partido": "AGIR"}, {"nr": "15070", "urna": "Fernando Sales", "partido": "MDB"}, {"nr": "18222", "urna": "Fernando Vieira", "partido": "REDE"}, {"nr": "35222", "urna": "Florismar Junior", "partido": "DEMOCRATA"}, {"nr": "45147", "urna": "Florisvaldo Pereira", "partido": "PSDB"}, {"nr": "25444", "urna": "Florisvaldo Ribeiro", "partido": "PRD"}, {"nr": "40999", "urna": "Flávio Coutinho", "partido": "PSB"}, {"nr": "55555", "urna": "Foguinho", "partido": "PSD"}, {"nr": "35030", "urna": "Fran Do Portal", "partido": "DEMOCRATA"}, {"nr": "33456", "urna": "Fred Vidigal", "partido": "MOBILIZA"}, {"nr": "30678", "urna": "Fábio De Moura Brasil", "partido": "NOVO"}, {"nr": "45888", "urna": "Fábio Fayad", "partido": "PSDB"}, {"nr": "20222", "urna": "Gabriel Mancini Cantor", "partido": "PODE"}, {"nr": "15815", "urna": "Galdino Neto", "partido": "MDB"}, {"nr": "77222", "urna": "Galego Da Ferragista", "partido": "SOLIDARIEDADE"}, {"nr": "23153", "urna": "Gcm Romário Policarpo", "partido": "CIDADANIA"}, {"nr": "35035", "urna": "George Maranhão", "partido": "DEMOCRATA"}, {"nr": "50017", "urna": "Geraldo Do Bairro Goiá", "partido": "PSOL"}, {"nr": "18730", "urna": "Gerson Morais", "partido": "REDE"}, {"nr": "13555", "urna": "Gessimone Santana", "partido": "PT"}, {"nr": "33010", "urna": "Gil Tavares", "partido": "MOBILIZA"}, {"nr": "44811", "urna": "Gilberto Patrício", "partido": "UNIÃO"}, {"nr": "22051", "urna": "Gilson Bravo", "partido": "PL"}, {"nr": "15115", "urna": "Giovani", "partido": "MDB"}, {"nr": "20888", "urna": "Gisele Collete", "partido": "PODE"}, {"nr": "22227", "urna": "Gisleide Ribeiro", "partido": "PL"}, {"nr": "43333", "urna": "Goiano Sidney", "partido": "PV"}, {"nr": "36555", "urna": "Graciele Da Arte Trigo", "partido": "AGIR"}, {"nr": "45999", "urna": "Gugu Nader", "partido": "PSDB"}, {"nr": "10555", "urna": "Gustavo Da Popular", "partido": "REPUBLICANOS"}, {"nr": "44900", "urna": "Gustavo Gamboa", "partido": "UNIÃO"}, {"nr": "45222", "urna": "Gustavo Sebba", "partido": "PSDB"}, {"nr": "45800", "urna": "Gênio Eurípedes", "partido": "PSDB"}, {"nr": "27777", "urna": "Haroldo Shawlyn", "partido": "DC"}, {"nr": "30330", "urna": "Hebert Cardoso", "partido": "NOVO"}, {"nr": "27445", "urna": "Helida Barbosa", "partido": "DC"}, {"nr": "15244", "urna": "Helio Galeno", "partido": "MDB"}, {"nr": "30444", "urna": "Henrique Araujo", "partido": "NOVO"}, {"nr": "20100", "urna": "Henrique César", "partido": "PODE"}, {"nr": "35101", "urna": "Henrique Zini", "partido": "DEMOCRATA"}, {"nr": "40898", "urna": "Higor Jr.", "partido": "PSB"}, {"nr": "45450", "urna": "Hélio Debrey", "partido": "PSDB"}, {"nr": "13888", "urna": "Héllem Costa Quilombola", "partido": "PT"}, {"nr": "25321", "urna": "Irineu", "partido": "PRD"}, {"nr": "18123", "urna": "Irmã Mari", "partido": "REDE"}, {"nr": "36330", "urna": "Irmão Antônio", "partido": "AGIR"}, {"nr": "20456", "urna": "Isaac Martins", "partido": "PODE"}, {"nr": "22255", "urna": "Isabel Cristina", "partido": "PL"}, {"nr": "35111", "urna": "Isael Pantera", "partido": "DEMOCRATA"}, {"nr": "13190", "urna": "Ismael Calom", "partido": "PT"}, {"nr": "15900", "urna": "Issy Quinan", "partido": "MDB"}, {"nr": "77555", "urna": "Ivair Gaguinho", "partido": "SOLIDARIEDADE"}, {"nr": "27789", "urna": "Jacira Pires", "partido": "DC"}, {"nr": "45777", "urna": "Jadiel Da Bronca", "partido": "PSDB"}, {"nr": "40333", "urna": "Jadison Feitosa", "partido": "PSB"}, {"nr": "11000", "urna": "Jamil Calife", "partido": "PP"}, {"nr": "23123", "urna": "Jandy Marcolino", "partido": "CIDADANIA"}, {"nr": "22100", "urna": "Jean Carlos", "partido": "PL"}, {"nr": "35350", "urna": "Jeane Góis", "partido": "DEMOCRATA"}, {"nr": "25127", "urna": "Jhane Leopoldina", "partido": "PRD"}, {"nr": "35005", "urna": "Jheniffer Tavares", "partido": "DEMOCRATA"}, {"nr": "44720", "urna": "Jhone Palmerinha", "partido": "UNIÃO"}, {"nr": "40040", "urna": "Jhônatan Xavier", "partido": "PSB"}, {"nr": "30110", "urna": "Joana Rezende", "partido": "NOVO"}, {"nr": "33800", "urna": "Joaquim Guilherme", "partido": "MOBILIZA"}, {"nr": "13111", "urna": "Jonas Alves", "partido": "PT"}, {"nr": "36222", "urna": "Joscilene Do Mangão", "partido": "AGIR"}, {"nr": "30640", "urna": "José De Lima", "partido": "NOVO"}, {"nr": "45899", "urna": "José Divino", "partido": "PSDB"}, {"nr": "45678", "urna": "José Machado", "partido": "PSDB"}, {"nr": "25123", "urna": "João Alberto Rodrigues", "partido": "PRD"}, {"nr": "10333", "urna": "João Costa Anápolis Solidário", "partido": "REPUBLICANOS"}, {"nr": "40666", "urna": "João Tapuia", "partido": "PSB"}, {"nr": "13030", "urna": "Ju Damando", "partido": "PT"}, {"nr": "44010", "urna": "Juliana Oliveira", "partido": "UNIÃO"}, {"nr": "22223", "urna": "Julio Cunha (pró-armas)", "partido": "PL"}, {"nr": "77077", "urna": "Julio Pina", "partido": "SOLIDARIEDADE"}, {"nr": "27127", "urna": "Juninho Do Povão", "partido": "DC"}, {"nr": "20021", "urna": "Juscélio Santos", "partido": "PODE"}, {"nr": "15155", "urna": "Justino Borges", "partido": "MDB"}, {"nr": "30230", "urna": "Júlio César", "partido": "NOVO"}, {"nr": "40456", "urna": "Karlos Cabral", "partido": "PSB"}, {"nr": "36800", "urna": "Kathrein Moura Com Os Pés", "partido": "AGIR"}, {"nr": "77600", "urna": "Katia Maria", "partido": "SOLIDARIEDADE"}, {"nr": "33777", "urna": "Keke Da Vulkanic", "partido": "MOBILIZA"}, {"nr": "77777", "urna": "Kelly Ribeiro", "partido": "SOLIDARIEDADE"}, {"nr": "36600", "urna": "Kenia Vanusse", "partido": "AGIR"}, {"nr": "45631", "urna": "Kesia De Jesus", "partido": "PSDB"}, {"nr": "10000", "urna": "Kesley", "partido": "REPUBLICANOS"}, {"nr": "50555", "urna": "Ketlhyn Dos Santos", "partido": "PSOL"}, {"nr": "77888", "urna": "Kezio Montalvão", "partido": "SOLIDARIEDADE"}, {"nr": "35700", "urna": "Kleybe Morais", "partido": "DEMOCRATA"}, {"nr": "13013", "urna": "Kátia", "partido": "PT"}, {"nr": "30200", "urna": "Lana Moreira", "partido": "NOVO"}, {"nr": "20023", "urna": "Larissa Lafaiete", "partido": "PODE"}, {"nr": "80180", "urna": "Larissa Moura", "partido": "UP"}, {"nr": "36900", "urna": "Lazaro Lc", "partido": "AGIR"}, {"nr": "33400", "urna": "Leandro Ribeiro", "partido": "MOBILIZA"}, {"nr": "30700", "urna": "Leandro Sena", "partido": "NOVO"}, {"nr": "30333", "urna": "Leandro Ventura", "partido": "NOVO"}, {"nr": "20444", "urna": "Leide Alves Jornalista", "partido": "PODE"}, {"nr": "40434", "urna": "Lena", "partido": "PSB"}, {"nr": "55000", "urna": "Leo De Oliveira", "partido": "PSD"}, {"nr": "35244", "urna": "Leoncio Amorim", "partido": "DEMOCRATA"}, {"nr": "40125", "urna": "Lidevam Lima", "partido": "PSB"}, {"nr": "44789", "urna": "Lincoln Tejota", "partido": "UNIÃO"}, {"nr": "15044", "urna": "Lineu Olimpio", "partido": "MDB"}, {"nr": "45677", "urna": "Lisieux", "partido": "PSDB"}, {"nr": "22333", "urna": "Lissauer Vieira", "partido": "PL"}, {"nr": "35200", "urna": "Lohany Carvalho", "partido": "DEMOCRATA"}, {"nr": "35999", "urna": "Lorenna Louzada", "partido": "DEMOCRATA"}, {"nr": "44562", "urna": "Lu Gomes", "partido": "UNIÃO"}, {"nr": "36300", "urna": "Lucas Costa", "partido": "AGIR"}, {"nr": "33100", "urna": "Lucas Kitão", "partido": "MOBILIZA"}, {"nr": "43210", "urna": "Lucia Tomé", "partido": "PV"}, {"nr": "55521", "urna": "Luciana Gouveia", "partido": "PSD"}, {"nr": "10456", "urna": "Luciane Almeida", "partido": "REPUBLICANOS"}, {"nr": "27123", "urna": "Lucirene Martins", "partido": "DC"}, {"nr": "22789", "urna": "Lucy Medeiros", "partido": "PL"}, {"nr": "44999", "urna": "Lucíula Do Recanto", "partido": "UNIÃO"}, {"nr": "33122", "urna": "Luiza Da Assessoria", "partido": "MOBILIZA"}, {"nr": "10777", "urna": "Luís Costa", "partido": "REPUBLICANOS"}, {"nr": "20500", "urna": "Léo Portilho", "partido": "PODE"}, {"nr": "35015", "urna": "Lívio Luciano", "partido": "DEMOCRATA"}, {"nr": "40122", "urna": "Lúcia Roberta (lucinha)", "partido": "PSB"}, {"nr": "50178", "urna": "Macarrão Do Esporte", "partido": "PSOL"}, {"nr": "45000", "urna": "Magal", "partido": "PSDB"}, {"nr": "22888", "urna": "Magda Ribeiro", "partido": "PL"}, {"nr": "20111", "urna": "Magrão Da Rádio", "partido": "PODE"}, {"nr": "22190", "urna": "Major Araújo", "partido": "PL"}, {"nr": "33000", "urna": "Major Eldecirio", "partido": "MOBILIZA"}, {"nr": "15222", "urna": "Major Emannuelle", "partido": "MDB"}, {"nr": "22212", "urna": "Major Hugo Christiani", "partido": "PL"}, {"nr": "33789", "urna": "Malaquias", "partido": "MOBILIZA"}, {"nr": "50345", "urna": "Mandata Coletiva", "partido": "PSOL"}, {"nr": "13028", "urna": "Mara Do Quiosque", "partido": "PT"}, {"nr": "10444", "urna": "Marcela Patrocínio", "partido": "REPUBLICANOS"}, {"nr": "36200", "urna": "Marcelo Brites", "partido": "AGIR"}, {"nr": "30007", "urna": "Marcelo Derze", "partido": "NOVO"}, {"nr": "40136", "urna": "Marciene Andrade", "partido": "PSB"}, {"nr": "10610", "urna": "Marcilene Silva", "partido": "REPUBLICANOS"}, {"nr": "35250", "urna": "Marcinha F-250", "partido": "DEMOCRATA"}, {"nr": "30234", "urna": "Marckennedy", "partido": "NOVO"}, {"nr": "45030", "urna": "Marco Aurélio", "partido": "PSDB"}, {"nr": "10121", "urna": "Margareth Lopes", "partido": "REPUBLICANOS"}, {"nr": "35010", "urna": "Maria Costa", "partido": "DEMOCRATA"}, {"nr": "40222", "urna": "Maria Dos Santos", "partido": "PSB"}, {"nr": "33356", "urna": "Maria Muniz", "partido": "MOBILIZA"}, {"nr": "40100", "urna": "Maria Ocionira", "partido": "PSB"}, {"nr": "55100", "urna": "Mariana Arruda", "partido": "PSD"}, {"nr": "45456", "urna": "Marina Morena", "partido": "PSDB"}, {"nr": "36321", "urna": "Marlene Sampaio", "partido": "AGIR"}, {"nr": "15116", "urna": "Marquim Araújo", "partido": "MDB"}, {"nr": "22221", "urna": "Marquinho", "partido": "PL"}, {"nr": "36333", "urna": "Marquinho Do Povo", "partido": "AGIR"}, {"nr": "40789", "urna": "Marta Quintiliano", "partido": "PSB"}, {"nr": "50100", "urna": "Mateus Moura", "partido": "PSOL"}, {"nr": "45145", "urna": "Matheus Ribeiro", "partido": "PSDB"}, {"nr": "50103", "urna": "Mauro Do Alho", "partido": "PSOL"}, {"nr": "25200", "urna": "Mauro Ferratech", "partido": "PRD"}, {"nr": "13789", "urna": "Mauro Rubem", "partido": "PT"}, {"nr": "33633", "urna": "Mccartnea Mennaid", "partido": "MOBILIZA"}, {"nr": "45633", "urna": "Meiranny Reis", "partido": "PSDB"}, {"nr": "22228", "urna": "Meire Cruvinel", "partido": "PL"}, {"nr": "25145", "urna": "Michele Diniz", "partido": "PRD"}, {"nr": "20369", "urna": "Miguel Junior", "partido": "PODE"}, {"nr": "30124", "urna": "Milka Hume", "partido": "NOVO"}, {"nr": "20001", "urna": "Milla Carvalho", "partido": "PODE"}, {"nr": "36690", "urna": "Miriam Rógerio", "partido": "AGIR"}, {"nr": "30030", "urna": "Misael", "partido": "NOVO"}, {"nr": "44344", "urna": "Missionária Gilda", "partido": "UNIÃO"}, {"nr": "33600", "urna": "Missionária Rosane", "partido": "MOBILIZA"}, {"nr": "18777", "urna": "Missionária Thamyres", "partido": "REDE"}, {"nr": "33444", "urna": "Motorista Dançarino", "partido": "MOBILIZA"}, {"nr": "30038", "urna": "Márcio Da Segurança Privada", "partido": "NOVO"}, {"nr": "55800", "urna": "Márcio Gordo", "partido": "PSD"}, {"nr": "33123", "urna": "Márcio Luís", "partido": "MOBILIZA"}, {"nr": "44111", "urna": "Márcio Passos", "partido": "UNIÃO"}, {"nr": "22200", "urna": "Nara Coutrin", "partido": "PL"}, {"nr": "30022", "urna": "Nayara Barcelos", "partido": "NOVO"}, {"nr": "44065", "urna": "Nega Na Moda", "partido": "UNIÃO"}, {"nr": "13002", "urna": "Neguinha Do Pt", "partido": "PT"}, {"nr": "36016", "urna": "Neila Cavalcante", "partido": "AGIR"}, {"nr": "33007", "urna": "Neila Gonçalves", "partido": "MOBILIZA"}, {"nr": "30122", "urna": "Neto Bessa", "partido": "NOVO"}, {"nr": "30000", "urna": "Neto Karfan", "partido": "NOVO"}, {"nr": "11111", "urna": "Nárcia Kelly", "partido": "PP"}, {"nr": "45321", "urna": "Nédio Leite", "partido": "PSDB"}, {"nr": "45124", "urna": "Nélio Freitas", "partido": "PSDB"}, {"nr": "13500", "urna": "Orlanes Maranhão", "partido": "PT"}, {"nr": "36382", "urna": "Osmar Gonçalves", "partido": "AGIR"}, {"nr": "22456", "urna": "Osório", "partido": "PL"}, {"nr": "45045", "urna": "Oziel Galvão", "partido": "PSDB"}, {"nr": "44001", "urna": "Oziel Lirio", "partido": "UNIÃO"}, {"nr": "15456", "urna": "Pabio Mossoró", "partido": "MDB"}, {"nr": "40777", "urna": "Paloma Ludmyla", "partido": "PSB"}, {"nr": "13180", "urna": "Pastor Alanmain", "partido": "PT"}, {"nr": "22999", "urna": "Pastor Alex Nepomoceno", "partido": "PL"}, {"nr": "27115", "urna": "Pastor Dejesus", "partido": "DC"}, {"nr": "18333", "urna": "Pastor Julio Cezar", "partido": "REDE"}, {"nr": "35360", "urna": "Pastora Edna Abadia", "partido": "DEMOCRATA"}, {"nr": "15713", "urna": "Pastora Neide", "partido": "MDB"}, {"nr": "13192", "urna": "Patricia Rosa", "partido": "PT"}, {"nr": "22808", "urna": "Patrícia Barra", "partido": "PL"}, {"nr": "30006", "urna": "Patrícia Da Inclusão", "partido": "NOVO"}, {"nr": "45245", "urna": "Patrícia Firmino", "partido": "PSDB"}, {"nr": "30600", "urna": "Patrícia Santana", "partido": "NOVO"}, {"nr": "10128", "urna": "Patrícia Santiago", "partido": "REPUBLICANOS"}, {"nr": "45369", "urna": "Paula Alessandra", "partido": "PSDB"}, {"nr": "15800", "urna": "Paula Castro", "partido": "MDB"}, {"nr": "25555", "urna": "Paulin Vai Nele", "partido": "PRD"}, {"nr": "40115", "urna": "Paulinho Professor", "partido": "PSB"}, {"nr": "15601", "urna": "Paulo Cezar Martins", "partido": "MDB"}, {"nr": "35126", "urna": "Paulo Dantas", "partido": "DEMOCRATA"}, {"nr": "55244", "urna": "Paulo Do Vale", "partido": "PSD"}, {"nr": "30220", "urna": "Paulo Henrique Ph", "partido": "NOVO"}, {"nr": "25190", "urna": "Paulo Miranda", "partido": "PRD"}, {"nr": "10999", "urna": "Paulo Sérgio Do Povo", "partido": "REPUBLICANOS"}, {"nr": "45625", "urna": "Pedro Araújo", "partido": "PSDB"}, {"nr": "18728", "urna": "Pedro Damião", "partido": "REDE"}, {"nr": "33323", "urna": "Pedro Paulo Caiado Canedo", "partido": "MOBILIZA"}, {"nr": "25156", "urna": "Perpetua Barbosa", "partido": "PRD"}, {"nr": "20555", "urna": "Pimentinha", "partido": "PODE"}, {"nr": "36193", "urna": "Policial Gislene", "partido": "AGIR"}, {"nr": "36007", "urna": "Polly Almeida", "partido": "AGIR"}, {"nr": "44600", "urna": "Pr. Marciel Daqui", "partido": "UNIÃO"}, {"nr": "10884", "urna": "Priscilla Moreira", "partido": "REPUBLICANOS"}, {"nr": "10001", "urna": "Prof. Hélio", "partido": "REPUBLICANOS"}, {"nr": "45566", "urna": "Prof. Maria Zilma", "partido": "PSDB"}, {"nr": "80000", "urna": "Prof. Pedro Augusto", "partido": "UP"}, {"nr": "22222", "urna": "Prof. Reginaldo Pacheco", "partido": "PL"}, {"nr": "50050", "urna": "Professor Alex", "partido": "PSOL"}, {"nr": "35333", "urna": "Professor Antônio Ávila", "partido": "DEMOCRATA"}, {"nr": "25007", "urna": "Professor Carlos Dourado", "partido": "PRD"}, {"nr": "33192", "urna": "Professor Cleidomar Enfermeiro", "partido": "MOBILIZA"}, {"nr": "65123", "urna": "Professor Edinan Braúna", "partido": "PCDOB"}, {"nr": "40010", "urna": "Professor João Coelho", "partido": "PSB"}, {"nr": "13213", "urna": "Professor Luiz Carvalho", "partido": "PT"}, {"nr": "20321", "urna": "Professor Marcos Junior", "partido": "PODE"}, {"nr": "13313", "urna": "Professor Pantaleão", "partido": "PT"}, {"nr": "40000", "urna": "Professor Paulo", "partido": "PSB"}, {"nr": "45123", "urna": "Professor Zenilton", "partido": "PSDB"}, {"nr": "20678", "urna": "Professora Cida", "partido": "PODE"}, {"nr": "13300", "urna": "Professora Hilvany", "partido": "PT"}, {"nr": "33303", "urna": "Professora Lúcia Vasconcelos", "partido": "MOBILIZA"}, {"nr": "44013", "urna": "Professora Meire", "partido": "UNIÃO"}, {"nr": "50027", "urna": "Professora Miranda", "partido": "PSOL"}, {"nr": "15230", "urna": "Professora Tetê", "partido": "MDB"}, {"nr": "30300", "urna": "Pv Marques", "partido": "NOVO"}, {"nr": "44678", "urna": "Radialista Marcelo Silva", "partido": "UNIÃO"}, {"nr": "30900", "urna": "Rafael Da Mallharia", "partido": "NOVO"}, {"nr": "20026", "urna": "Rafael Marra", "partido": "PODE"}, {"nr": "55180", "urna": "Rafael Rodrigues", "partido": "PSD"}, {"nr": "22700", "urna": "Rafael Vasconcelos", "partido": "PL"}, {"nr": "27153", "urna": "Railson", "partido": "DC"}, {"nr": "15619", "urna": "Raimunda Soares De Araújo", "partido": "MDB"}, {"nr": "27345", "urna": "Raimundo Aguiar", "partido": "DC"}, {"nr": "55321", "urna": "Raimundo Da Casa Da Saúde", "partido": "PSD"}, {"nr": "27000", "urna": "Raimundo Mota", "partido": "DC"}, {"nr": "25015", "urna": "Raisla Souza", "partido": "PRD"}, {"nr": "55900", "urna": "Ralil Buzaim", "partido": "PSD"}, {"nr": "22022", "urna": "Ramos Somar", "partido": "PL"}, {"nr": "65180", "urna": "Regiane Freire", "partido": "PCDOB"}, {"nr": "55678", "urna": "Regina Alice", "partido": "PSD"}, {"nr": "27370", "urna": "Regina Morais", "partido": "DC"}, {"nr": "77111", "urna": "Renata Do Matozzo", "partido": "SOLIDARIEDADE"}, {"nr": "45007", "urna": "Ribeiro Do Túllio", "partido": "PSDB"}, {"nr": "35123", "urna": "Ricardo Fortunato", "partido": "DEMOCRATA"}, {"nr": "30777", "urna": "Rodrigo Palmeira", "partido": "NOVO"}, {"nr": "40001", "urna": "Ronaldo Quadros", "partido": "PSB"}, {"nr": "77477", "urna": "Rondinelly Hélio", "partido": "SOLIDARIEDADE"}, {"nr": "36400", "urna": "Ronei De Brito", "partido": "AGIR"}, {"nr": "15620", "urna": "Rones Ferreira", "partido": "MDB"}, {"nr": "10010", "urna": "Roni Ferreira", "partido": "REPUBLICANOS"}, {"nr": "27444", "urna": "Rosa Alves", "partido": "DC"}, {"nr": "23200", "urna": "Rosa Maria", "partido": "CIDADANIA"}, {"nr": "13678", "urna": "Rosalina", "partido": "PT"}, {"nr": "25678", "urna": "Rosangela Cheirosa", "partido": "PRD"}, {"nr": "36456", "urna": "Rosangela Rezende", "partido": "AGIR"}, {"nr": "25025", "urna": "Rosi", "partido": "PRD"}, {"nr": "44180", "urna": "Rosi Guimarães", "partido": "UNIÃO"}, {"nr": "10110", "urna": "Rosinha", "partido": "REPUBLICANOS"}, {"nr": "33017", "urna": "Rouzmari", "partido": "MOBILIZA"}, {"nr": "40555", "urna": "Rubens Marques", "partido": "PSB"}, {"nr": "13060", "urna": "Rubão", "partido": "PT"}, {"nr": "36010", "urna": "Rui Pipa", "partido": "AGIR"}, {"nr": "36778", "urna": "Salomão Do Povo", "partido": "AGIR"}, {"nr": "27150", "urna": "Samara Do Posto", "partido": "DC"}, {"nr": "55123", "urna": "Samuel Almeida", "partido": "PSD"}, {"nr": "10888", "urna": "Samuel Carvalho", "partido": "REPUBLICANOS"}, {"nr": "20244", "urna": "Samuel Lacerda", "partido": "PODE"}, {"nr": "40444", "urna": "Samuel Mendes", "partido": "PSB"}, {"nr": "10022", "urna": "Sandes Junior", "partido": "REPUBLICANOS"}, {"nr": "77746", "urna": "Sandra Barrão", "partido": "SOLIDARIEDADE"}, {"nr": "25700", "urna": "Santiago Gomes", "partido": "PRD"}, {"nr": "55990", "urna": "Sargento Ana Paula", "partido": "PSD"}, {"nr": "33180", "urna": "Sargento Artur", "partido": "MOBILIZA"}, {"nr": "18190", "urna": "Sargento Lima", "partido": "REDE"}, {"nr": "15555", "urna": "Sargento Lorena", "partido": "MDB"}, {"nr": "44911", "urna": "Sargento Martins (feijão)", "partido": "UNIÃO"}, {"nr": "27190", "urna": "Sargento Maruzan", "partido": "DC"}, {"nr": "35100", "urna": "Sargento Novandir", "partido": "DEMOCRATA"}, {"nr": "50193", "urna": "Sargento Rocha", "partido": "PSOL"}, {"nr": "27007", "urna": "Sargento Santos", "partido": "DC"}, {"nr": "55333", "urna": "Sargento Sara", "partido": "PSD"}, {"nr": "44193", "urna": "Sargento Thais", "partido": "UNIÃO"}, {"nr": "13741", "urna": "Savio Prates", "partido": "PT"}, {"nr": "33999", "urna": "Sergio Bravo", "partido": "MOBILIZA"}, {"nr": "27999", "urna": "Sergio Francisco", "partido": "DC"}, {"nr": "27234", "urna": "Sergio Silva", "partido": "DC"}, {"nr": "20010", "urna": "Sgt Janaína Cândido", "partido": "PODE"}, {"nr": "36190", "urna": "Sgt Washinton Da Cavalaria", "partido": "AGIR"}, {"nr": "15117", "urna": "Sgt Zenaide Freitas", "partido": "MDB"}, {"nr": "15060", "urna": "Sgt. Silvana Maria", "partido": "MDB"}, {"nr": "44556", "urna": "Sheilismar Ribeiro", "partido": "UNIÃO"}, {"nr": "20080", "urna": "Sid Peão", "partido": "PODE"}, {"nr": "40117", "urna": "Silvana", "partido": "PSB"}, {"nr": "33177", "urna": "Silveira Moura", "partido": "MOBILIZA"}, {"nr": "35555", "urna": "Silvio Felipe", "partido": "DEMOCRATA"}, {"nr": "33333", "urna": "Simeyzon", "partido": "MOBILIZA"}, {"nr": "50123", "urna": "Simone Da Enfermagem", "partido": "PSOL"}, {"nr": "40007", "urna": "Simone Formiguinha", "partido": "PSB"}, {"nr": "35062", "urna": "Sinara", "partido": "DEMOCRATA"}, {"nr": "36700", "urna": "Siris Zona Rural", "partido": "AGIR"}, {"nr": "44500", "urna": "Subtenente Higor", "partido": "UNIÃO"}, {"nr": "44800", "urna": "Sucena Contadora", "partido": "UNIÃO"}, {"nr": "30089", "urna": "Sunamita Rodrigues", "partido": "NOVO"}, {"nr": "22444", "urna": "Suze Guerreira", "partido": "PL"}, {"nr": "27400", "urna": "Tacileide Lemos", "partido": "DC"}, {"nr": "27900", "urna": "Tacimar Negão", "partido": "DC"}, {"nr": "13088", "urna": "Tadeu Costa", "partido": "PT"}, {"nr": "44123", "urna": "Talles Barreto", "partido": "UNIÃO"}, {"nr": "35444", "urna": "Tarcisio Garotinho", "partido": "DEMOCRATA"}, {"nr": "30060", "urna": "Tatiane Guimarães", "partido": "NOVO"}, {"nr": "35220", "urna": "Tayanny Da Papelaria", "partido": "DEMOCRATA"}, {"nr": "20190", "urna": "Ten Coronel Nilson", "partido": "PODE"}, {"nr": "55500", "urna": "Tenente Ana Paula", "partido": "PSD"}, {"nr": "20201", "urna": "Tenente Cesar Salustiano", "partido": "PODE"}, {"nr": "44456", "urna": "Tenente Coronel Fernando", "partido": "UNIÃO"}, {"nr": "44100", "urna": "Tenente Coronel Michella", "partido": "UNIÃO"}, {"nr": "15190", "urna": "Tenente Rosy", "partido": "MDB"}, {"nr": "13310", "urna": "Terapeuta Ariel Luz", "partido": "PT"}, {"nr": "15789", "urna": "Terezinha Amaral", "partido": "MDB"}, {"nr": "18999", "urna": "Thaís Oliveira", "partido": "REDE"}, {"nr": "50990", "urna": "Thefi Amâncio", "partido": "PSOL"}, {"nr": "45345", "urna": "Thiago Ribeirão", "partido": "PSDB"}, {"nr": "45331", "urna": "Thállita Teles", "partido": "PSDB"}, {"nr": "15029", "urna": "Tianinha", "partido": "MDB"}, {"nr": "10789", "urna": "Tité D Caprio", "partido": "REPUBLICANOS"}, {"nr": "10155", "urna": "Toquinho", "partido": "REPUBLICANOS"}, {"nr": "30888", "urna": "Túlio Baptistella", "partido": "NOVO"}, {"nr": "33193", "urna": "Ulisses Sousa Lídercomunitário", "partido": "MOBILIZA"}, {"nr": "10180", "urna": "Valdecy Da Saúde", "partido": "REPUBLICANOS"}, {"nr": "13358", "urna": "Valdir Melo Santos", "partido": "PT"}, {"nr": "18020", "urna": "Valéria Anastácio", "partido": "REDE"}, {"nr": "15678", "urna": "Vanessa Do Salão", "partido": "MDB"}, {"nr": "20015", "urna": "Vanilson Bueno", "partido": "PODE"}, {"nr": "30038", "urna": "Veluz Coletivo Da Seg Privada", "partido": "NOVO"}, {"nr": "22321", "urna": "Vera Aguiar", "partido": "PL"}, {"nr": "40123", "urna": "Veter Martins", "partido": "PSB"}, {"nr": "10200", "urna": "Victor Salatiel", "partido": "REPUBLICANOS"}, {"nr": "44700", "urna": "Virginia Valeria Dos Peixotos", "partido": "UNIÃO"}, {"nr": "44321", "urna": "Virmondes Cruvinel", "partido": "UNIÃO"}, {"nr": "27200", "urna": "Vivian Bueno", "partido": "DC"}, {"nr": "10111", "urna": "Vivian Naves", "partido": "REPUBLICANOS"}, {"nr": "77177", "urna": "Viviane Madeira", "partido": "SOLIDARIEDADE"}, {"nr": "20192", "urna": "Vânia Da Saúde", "partido": "PODE"}, {"nr": "27111", "urna": "Wagner", "partido": "DC"}, {"nr": "77123", "urna": "Wagner Neto", "partido": "SOLIDARIEDADE"}, {"nr": "30789", "urna": "Wagner Vasconcelos", "partido": "NOVO"}, {"nr": "45100", "urna": "Walber Da Refrigeração", "partido": "PSDB"}, {"nr": "13444", "urna": "Walcy Vieira - Mick Jagger", "partido": "PT"}, {"nr": "40992", "urna": "Walter Camargo", "partido": "PSB"}, {"nr": "30222", "urna": "Waltinho", "partido": "NOVO"}, {"nr": "40321", "urna": "Waltterlenne", "partido": "PSB"}, {"nr": "44200", "urna": "Wanessa Da Leyser Do Ercy", "partido": "UNIÃO"}, {"nr": "13131", "urna": "Welton Divino", "partido": "PT"}, {"nr": "30100", "urna": "Welton Lemos", "partido": "NOVO"}, {"nr": "40631", "urna": "Wenner Patrick", "partido": "PSB"}, {"nr": "36999", "urna": "Wesley Santos", "partido": "AGIR"}, {"nr": "45555", "urna": "Wesley Suspencar", "partido": "PSDB"}, {"nr": "13600", "urna": "Wesley Toledo", "partido": "PT"}, {"nr": "44555", "urna": "Wilde Cambão", "partido": "UNIÃO"}, {"nr": "20800", "urna": "Willian Panda", "partido": "PODE"}, {"nr": "22002", "urna": "Willian Veloso", "partido": "PL"}, {"nr": "40400", "urna": "Yago Gonçalves", "partido": "PSB"}, {"nr": "22567", "urna": "Zequinha Nogueira", "partido": "PL"}, {"nr": "20999", "urna": "Zilma Da Inclusão", "partido": "PODE"}, {"nr": "20333", "urna": "Zé Barbosa", "partido": "PODE"}, {"nr": "33070", "urna": "Zé Da Imperial", "partido": "MOBILIZA"}, {"nr": "33111", "urna": "Zé Diniz", "partido": "MOBILIZA"}, {"nr": "18065", "urna": "Zé Do Caixão", "partido": "REDE"}, {"nr": "22580", "urna": "Zé Maria Xerife", "partido": "PL"}, {"nr": "13453", "urna": "Zé Santana Da Viola", "partido": "PT"}, {"nr": "10122", "urna": "Álvaro Guimarães", "partido": "REPUBLICANOS"}]
};
