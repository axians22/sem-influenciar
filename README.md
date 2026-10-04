# Comparador Eleições 2026

Site estático (React + Tailwind) para comparar candidaturas das eleições brasileiras de 2026:
**Presidência da República**, **governo de Goiás** e **Senado por Goiás**.

Para cada candidatura: propostas por tema, financiamento de campanha, pesquisas de
intenção de voto e histórico judicial com o estágio processual exato de cada caso.

## "Mais bem colocados" — o que o site afirma e o que não afirma

A seção "Mais bem colocados" e o botão de filtro nas listas de candidatos mostram os
5 primeiros de cada cargo **na pesquisa mais recente**, com a margem de erro e os
empates técnicos marcados.

**O site não afirma quem tem chance de se eleger.** Esse dado não existe de forma
confiável, e inventá-lo seria pior que omiti-lo:

- Para **deputado federal** e **deputado estadual**, o site mostra os 10 primeiros da
  pesquisa estadual do IGAPE (GO-01814/2026, 9 a 14/set, 2.000 entrevistas, ± 2,2
  pontos). Em ambos os cargos os dez estão **todos em empate técnico** (diferença de
  1,4 e 0,7 ponto, respectivamente) e cerca de um quarto dos entrevistados não
  respondeu. A seção diz isso em destaque.
- Na lista de deputado estadual não entra o nome que liderava numericamente a
  pesquisa (Amilton Filho, MDB, 2,0%): o TSE registra a candidatura como encerrada por
  falecimento e o número passou a outra candidata, que não foi medida.
- No **voto proporcional**, quem se elege depende do quociente partidário, isto é, do
  total de votos da legenda inteira, que só se conhece na apuração.
- Para o **Senado de Goiás**, os três primeiros estão em empate técnico entre si e só
  dois se elegem — os números não dizem quais.

Empate técnico é calculado como diferença menor que duas margens de erro, e aparece
com rótulo visível ao lado do nome.

## Colinha de voto

A seção "Monte sua colinha" deixa o eleitor escolher um candidato por cargo e levar a
lista pronta para a urna, imprimindo ou abrindo no celular.

- A ordem dos cargos é a **oficial da urna** (TSE): deputado federal, deputado
  estadual, senador 1ª vaga, senador 2ª vaga, governador, presidente.
- Goiás elege **2 senadores**, então há duas escolhas e o site impede repetir o mesmo
  candidato nas duas vagas.
- Os números vêm do **registro oficial de candidaturas do TSE**
  (`consulta_cand_2026.zip`), não de digitação manual. Todos os 295 números exibidos
  foram conferidos programaticamente contra o CSV.
- Deputado federal tem os **265 candidatos** com busca por nome ou número.
- Deputado estadual tem os **595 candidatos** oficiais do TSE, com busca por nome ou
  número (41 vagas na Assembleia).
- A escolha é salva em `localStorage` — fica no navegador do usuário e não é enviada
  a nenhum servidor.
- Ao imprimir, o CSS esconde todo o resto da página e imprime apenas a colinha.

**Números compartilhados por dois candidatos** no arquivo do TSE, provável substituição
de candidatura: 4515, 2590, 1040 e 2710 (deputado federal) e 15100 e 30038 (deputado
estadual). O arquivo não traz a situação que permitiria distinguir, então nesses casos
a colinha **avisa** em vez de escolher por conta própria.

### Números conferidos

Todos os números de urna exibidos foram validados programaticamente contra o CSV do
TSE: 47 nas fichas e rankings, 265 de deputado federal e 595 de deputado estadual.

## Constituição e voto

A aba "Constituição e voto" (`#/constituicao`) explica o básico da Constituição de 1988,
o que faz cada cargo em disputa e quem decide sobre saúde, escola, segurança, transporte,
impostos e trabalho em cada nível de governo. Cada afirmação cita o artigo em que se
apoia. O conteúdo fica em `src/data/constituicao.ts`; os quóruns usam 513 deputados
(composição mantida pelo STF para 2026) e 81 senadores.

## Dados de financiamento

Os doadores vêm da prestação de contas oficial do TSE, baixada e processada
localmente:

```
https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026
→ prestacao_de_contas_eleitorais_candidatos_2026.zip (158 MB)
→ receitas_candidatos_2026_BR.csv   (presidenciáveis)
→ receitas_candidatos_2026_GO.csv   (governador, Senado e deputado federal de GO)
```

Cada doação traz nome do doador, CPF/CNPJ, valor, natureza da receita e CNAE.
A seção "Quem financiou" mostra a composição por origem (partido, pessoa física,
empresa, financiamento coletivo, recursos próprios) e os maiores doadores de cada
candidatura, além de um bloco com doadores que financiaram mais de uma campanha.

## Apuração e conferência em tempo real (TSE)

A aba **Apuração** e a conferência de números da **colinha** consultam, direto do
navegador, os arquivos JSON de totalização que alimentam `resultados.tse.jus.br`:

```
https://resultados.tse.jus.br/oficial/ele2026/<eleição>/dados/<uf>/<uf>-c<cargo>-e<eleição>-u.json
  6257 = eleição federal (cargo 1, presidente, uf "br")
  6259 = eleição estadual (cargos 3 governador, 5 senador, 6 dep. federal, 7 dep. estadual, uf "go")
```

- O servidor libera CORS e renova o cache a cada ~60 s; a aba atualiza no mesmo ritmo
  e pausa quando fica oculta. Não há servidor intermediário.
- Não é uma API documentada. Os códigos de eleição saem de
  `https://resultados.tse.jus.br/oficial/comum/config/ele-c.json`; para o 2º turno,
  troque-os em `src/lib/tse.ts` (6258 e 6260).
- Na colinha, cada número escolhido é conferido contra a lista de candidaturas da
  totalização. Isso resolve os números que o CSV de candidaturas traz para dois nomes
  e avisa quando o número não consta mais na totalização (em 03/10: 15 dos 265 de
  deputado federal, 37 dos 595 de deputado estadual e o 28 para presidente).
- Sem rede, a colinha continua funcionando com a lista local e a aba de apuração
  mostra o erro com link para o site do TSE.
- O DivulgaCandContas (doadores, propostas) bloqueia acesso automatizado (HTTP 403),
  por isso financiamento, pesquisas e fichas continuam sendo dados coletados.

## Todos os estados

O seletor "Seu estado", no topo, vale para a colinha, a apuração e a aba do estado.
Tudo o que vem de dado oficial funciona para as 27 unidades da federação:

- **Colinha e apuração** usam a API de resultados do TSE do estado escolhido. No DF,
  deputado distrital ocupa o lugar de deputado estadual.
- **Fichas** de governador, senador e deputados (perfil declarado, candidaturas
  anteriores, receitas, doadores, despesas, bens e situação do registro) ficam em
  `public/tse/<uf>/<cargo>.json`. São 33 MB no total, mas o visitante só baixa o arquivo
  do estado e cargo que abrir. Para regenerar:

  ```bash
  python3 scripts/deputados.py   # baixa ~180 MB na primeira vez, para .cache-tse/
  ```

- **Processos judiciais** não são levantados nessas fichas. Cada uma traz dois links
  já na página do candidato: as certidões criminais no DivulgaCandContas do TSE e a
  busca pelo nome no Jusbrasil.

Propostas, pesquisas e histórico judicial com fonte existem só para a **Presidência** e
para **Goiás** (governador e senador), porque foram levantados candidato a candidato.

## Como rodar

Requer Node 20 ou mais recente.

```bash
npm install
npm run dev       # desenvolvimento, http://localhost:5173
npm run build     # confere os tipos e gera o site estático em dist/
npm run preview   # serve o build
```

Para publicar, envie o conteúdo de `dist/` para qualquer hospedagem estática (GitHub
Pages incluso; os caminhos são relativos). O build usa módulos ES, então precisa ser
servido por HTTP — abrir `dist/index.html` direto do disco não funciona.

## Deploy no Coolify (Docker Compose)

O repositório traz `Dockerfile`, `docker-compose.yml` e `nginx.conf`. O build roda em
Node 22 e a imagem final tem só o nginx servindo `dist/`.

1. No Coolify, crie um recurso a partir deste repositório Git e escolha o build pack
   **Docker Compose** (arquivo `docker-compose.yml`, na raiz).
2. Em **Domains**, informe o domínio para o serviço `web`, na porta **80**
   (por exemplo `https://seu-dominio.com.br:80`). O proxy do Coolify cuida do HTTPS.
3. Faça o deploy. Não há variáveis de ambiente nem volumes.

O compose não publica portas no host de propósito: quem expõe o site é o proxy do
Coolify. Para testar a imagem fora dele:

```bash
docker build -t eleicoes-2026 . && docker run --rm -p 8080:80 eleicoes-2026
```

## Estrutura

```
index.html              ponto de entrada do Vite
src/main.tsx, App.tsx   casca do app: cabeçalho, abas (uma por hash, ex. #/pesquisas)
src/tabs/*.tsx          uma aba por arquivo, carregada sob demanda
src/components/         fichas de candidato, blocos de UI e gráficos (Chart.js)
src/lib/tse.ts          consulta aos resultados oficiais do TSE
src/data/*.ts           todos os dados, tipados, com fonte por item
src/index.css           Tailwind v4 e os tokens de cor (claro e escuro)
public/tse/<uf>/*.json  fichas de governador, senador e deputados de cada estado
scripts/deputados.py    baixa os CSV oficiais do TSE e regenera public/tse/
dados/*.md              notas de pesquisa com as fontes originais
legacy/                 versão anterior, em HTML e JavaScript puros (pode ser removida)
```

Para atualizar um número, edite o arquivo correspondente em `src/data/`. Os gráficos e
tabelas se reconstroem a partir dele, e `npm run build` acusa campo faltando ou com
tipo errado.

Stack: React 19, TypeScript, Vite, Tailwind CSS v4 e Chart.js importado em partes
(só linha e barra), num chunk separado que só baixa nas abas com gráfico.

## Princípios adotados

**Fonte primária sempre que possível.** As fontes usadas são o arquivo oficial de
candidaturas do TSE, a **prestação de contas eleitorais do TSE** (dados de doadores,
processados direto do CSV oficial, sem intermediários), as páginas de propostas
registradas no TSE, `camara.leg.br`, `senado.leg.br`, os relatórios publicados pelos
próprios institutos de pesquisa e decisões do STF.

**Sem fontes do grupo Globo.** Por decisão editorial, nenhum dado vem de G1, Valor ou
veículos da Globo. Os dados de financiamento, que inicialmente vinham de uma ferramenta
do G1, foram refeitos a partir do CSV oficial do TSE — o que também corrigiu valores
(a receita de Lula, por exemplo, é R$ 87,4 mi e não R$ 77,3 mi).

**Status processual explícito.** Toda menção a processo traz o estágio exato, porque a
diferença é decisiva: investigação não é acusação, acusação não é condenação, e
condenação anulada não é condenação. Processos arquivados, anulados e absolvições
aparecem com o mesmo destaque das condenações. Acusação sem fonte verificável ficou
de fora.

**Lacuna declarada.** Onde um dado não foi encontrado, o site diz "não localizado" em
vez de preencher com estimativa. As limitações conhecidas estão listadas na própria
página, na seção "Método e fontes".

**Séries não se misturam.** Pesquisas em votos totais e em votos válidos são
apresentadas separadamente, porque não são comparáveis. Divergências entre institutos
são mostradas, não suavizadas.

## Limitações conhecidas

- Os valores de financiamento vêm do arquivo oficial de prestação de contas do TSE,
  gerado em 03/10/2026. São **parciais**: a prestação final é entregue após a eleição.
- CPF de doadores aparece parcialmente mascarado. CNPJ é informação pública e aparece
  completo.
- Dois candidatos (Danilo Pinheiro, PCO, e Guilherme Darques, UP) não declararam
  receita até a geração do arquivo.
- Candidatos de menor expressão frequentemente não têm propostas detalhadas
  disponíveis.
- Para Oséias Varão, Ernesto Roller e Renan Santos não houve busca dedicada de
  processos.
- A classificação ideológica dos partidos é interpretativa, não um dado oficial.

## Aviso

Este site **não é oficial** e não tem vínculo com o TSE, partidos ou candidaturas.
Em caso de divergência, vale a informação oficial do Tribunal Superior Eleitoral:
<https://www.tse.jus.br>.

Dados coletados em 3 de outubro de 2026.
