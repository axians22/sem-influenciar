import { createContext, useContext, useState, type ReactNode } from 'react';

export const UFS = [
  ['ac', 'Acre', 'NORTE', 'no Acre'], ['al', 'Alagoas', 'NORDESTE', 'em Alagoas'], ['ap', 'Amapá', 'NORTE', 'no Amapá'],
  ['am', 'Amazonas', 'NORTE', 'no Amazonas'], ['ba', 'Bahia', 'NORDESTE', 'na Bahia'], ['ce', 'Ceará', 'NORDESTE', 'no Ceará'],
  ['df', 'Distrito Federal', 'CENTRO-OESTE', 'no Distrito Federal'], ['es', 'Espírito Santo', 'SUDESTE', 'no Espírito Santo'],
  ['go', 'Goiás', 'CENTRO-OESTE', 'em Goiás'], ['ma', 'Maranhão', 'NORDESTE', 'no Maranhão'], ['mt', 'Mato Grosso', 'CENTRO-OESTE', 'em Mato Grosso'],
  ['ms', 'Mato Grosso do Sul', 'CENTRO-OESTE', 'em Mato Grosso do Sul'], ['mg', 'Minas Gerais', 'SUDESTE', 'em Minas Gerais'], ['pa', 'Pará', 'NORTE', 'no Pará'],
  ['pb', 'Paraíba', 'NORDESTE', 'na Paraíba'], ['pr', 'Paraná', 'SUL', 'no Paraná'], ['pe', 'Pernambuco', 'NORDESTE', 'em Pernambuco'],
  ['pi', 'Piauí', 'NORDESTE', 'no Piauí'], ['rj', 'Rio de Janeiro', 'SUDESTE', 'no Rio de Janeiro'], ['rn', 'Rio Grande do Norte', 'NORDESTE', 'no Rio Grande do Norte'],
  ['rs', 'Rio Grande do Sul', 'SUL', 'no Rio Grande do Sul'], ['ro', 'Rondônia', 'NORTE', 'em Rondônia'], ['rr', 'Roraima', 'NORTE', 'em Roraima'],
  ['sc', 'Santa Catarina', 'SUL', 'em Santa Catarina'], ['sp', 'São Paulo', 'SUDESTE', 'em São Paulo'], ['se', 'Sergipe', 'NORDESTE', 'em Sergipe'],
  ['to', 'Tocantins', 'NORTE', 'no Tocantins'],
/* `em` = nome com a preposição ("em Goiás", "no Acre"), usado em frases e títulos */
].map(([sigla, nome, regiao, em]) => ({ sigla, nome, regiao, em }));
export type Uf = typeof UFS[number];

/* Estado escolhido pelo visitante. Goiás é o padrão porque é o único com conteúdo
   pesquisado à mão (propostas, histórico judicial, pesquisas). */
const Ctx = createContext<{ uf: Uf; setUf: (sigla: string) => void }>({ uf: UFS[8], setUf: () => {} });
const acha = (s: string | null) => UFS.find(u => u.sigla === s);

export function UfProvider({ children }: { children: ReactNode }){
  const [uf, set] = useState<Uf>(() => {
    try { return acha(localStorage.getItem('uf')) || acha('go')!; } catch { return acha('go')!; }
  });
  const setUf = (s: string) => {
    const u = acha(s); if (!u) return;
    set(u);
    try { localStorage.setItem('uf', s); } catch { /* sem storage */ }
  };
  return <Ctx.Provider value={{ uf, setUf }}>{children}</Ctx.Provider>;
}
export const useUf = () => useContext(Ctx);

/* no DF o cargo equivalente a deputado estadual é deputado distrital */
export const rotuloCargo = (cargo: string, uf: Uf) => ({
  presidente: 'Presidente', governador: 'Governador', senador: 'Senador',
  depfed: 'Deputado federal', depest: uf.sigla === 'df' ? 'Deputado distrital' : 'Deputado estadual',
}[cargo] || cargo);
