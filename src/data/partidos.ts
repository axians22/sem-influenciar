/* Dados das Eleições 2026 — coletados em 03/10/2026.
   Toda informação aqui tem fonte rastreável; ver /dados/*.md no repositório.
   Fontes primárias: CSV oficial do TSE (dadosabertos.tse.jus.br), camara.leg.br,
   senado.leg.br, tse.jus.br, datafolha.folha.uol.com.br, poder360.com.br,
   agenciabrasil.ebc.com.br. */

import type { Bancada, Federacoes } from "./types";

/* ---------- PARTIDOS ---------- */
export const PARTIDOS_CAMARA: Bancada = {
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

export const PARTIDOS_SENADO: Bancada = {
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

export const PARTIDOS_GOVERNADORES: Bancada = {
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

export const FEDERACOES: Federacoes = {
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

