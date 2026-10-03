import { PRESIDENTE } from '../data/candidatos';
import { ListaCandidatos } from '../components/Candidatos';
import { PageHead } from '../components/ui';

/* ordem da pesquisa mais recente */
const ORDEM = [13, 22, 70, 55, 14, 30, 80, 35, 27, 21, 16, 29, 28];
const pos = (n: number | null) => { const i = ORDEM.indexOf(n ?? -1); return i < 0 ? 99 : i; };
const lista = [...PRESIDENTE].sort((a, b) => pos(a.num) - pos(b.num));

export default function Presidente(){
  return (
    <>
      <PageHead title="Candidatos à Presidência">
        As {lista.length} chapas registradas, pela ordem na pesquisa mais recente. Clique para abrir
        propostas por tema, financiamento e histórico judicial. Os dados cadastrais vêm do arquivo
        oficial de candidaturas do TSE.
      </PageHead>
      <ListaCandidatos dados={lista} cargoId="presidente" />
    </>
  );
}
