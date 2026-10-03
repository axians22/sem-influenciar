import { createContext, useContext, useState, type ReactNode } from 'react';

export const UFS = [
  ['ac', 'Acre', 'NORTE'], ['al', 'Alagoas', 'NORDESTE'], ['ap', 'Amapá', 'NORTE'],
  ['am', 'Amazonas', 'NORTE'], ['ba', 'Bahia', 'NORDESTE'], ['ce', 'Ceará', 'NORDESTE'],
  ['df', 'Distrito Federal', 'CENTRO-OESTE'], ['es', 'Espírito Santo', 'SUDESTE'],
  ['go', 'Goiás', 'CENTRO-OESTE'], ['ma', 'Maranhão', 'NORDESTE'], ['mt', 'Mato Grosso', 'CENTRO-OESTE'],
  ['ms', 'Mato Grosso do Sul', 'CENTRO-OESTE'], ['mg', 'Minas Gerais', 'SUDESTE'], ['pa', 'Pará', 'NORTE'],
  ['pb', 'Paraíba', 'NORDESTE'], ['pr', 'Paraná', 'SUL'], ['pe', 'Pernambuco', 'NORDESTE'],
  ['pi', 'Piauí', 'NORDESTE'], ['rj', 'Rio de Janeiro', 'SUDESTE'], ['rn', 'Rio Grande do Norte', 'NORDESTE'],
  ['rs', 'Rio Grande do Sul', 'SUL'], ['ro', 'Rondônia', 'NORTE'], ['rr', 'Roraima', 'NORTE'],
  ['sc', 'Santa Catarina', 'SUL'], ['sp', 'São Paulo', 'SUDESTE'], ['se', 'Sergipe', 'NORDESTE'],
  ['to', 'Tocantins', 'NORTE'],
].map(([sigla, nome, regiao]) => ({ sigla, nome, regiao }));
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
