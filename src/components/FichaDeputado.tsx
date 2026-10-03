/* Pop-up com a ficha de um candidato a deputado. Tudo vem dos arquivos oficiais do
   TSE processados por scripts/deputados.py (public/tse/*.json). */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { fotoTse, type CargoTse } from '../lib/tse';
import type { Uf } from '../lib/uf';
import { col, curto, money } from '../lib/format';
import { Badge, Legend, Meter, Note, Tag } from './ui';

export interface Deputado {
  sq: string; nr: string; nome: string; urna: string; partido: string;
  partidoNome: string | null; federacao: string | null;
  ocupacao: string | null; instrucao: string | null; genero: string | null;
  corRaca: string | null; estadoCivil: string | null; nascimento: string | null;
  idadePosse: number | null;
  registro: string | null; naUrna: boolean;
  destinoVotos: string | null; limiteGastos: number | null;
  bens: { tot: number; n: number; itens: { tipo: string | null; desc: string | null; v: number }[] } | null;
  redes: string[];
  historico: { ano: number; cargo: string; local: string | null; partido: string;
    turno: number; resultado: string | null }[];
  fin: { tot: number; ndoad: number; origens: Record<string, number>;
    doadores: { nome: string; doc: string | null; tipo: string; v: number }[];
    despesa?: number; gastos?: { tipo: string; v: number }[] } | null;
}
export interface ArquivoDeputados { geradoEm: string; contasEm: string; lista: Deputado[] }

const arquivos = new Map<string, Promise<ArquivoDeputados>>();
export function useDeputados(cargo: Exclude<CargoTse, 'presidente'>, uf: string){
  const [d, setD] = useState<ArquivoDeputados | null>(null);
  const [erro, setErro] = useState(false);
  useEffect(() => {
    let vivo = true;
    setD(null); setErro(false);
    const ch = uf + '/' + cargo;
    if (!arquivos.has(ch)) arquivos.set(ch,
      fetch(`${import.meta.env.BASE_URL}tse/${ch}.json`).then(r => {
        if (!r.ok) throw new Error(String(r.status)); return r.json(); }));
    arquivos.get(ch)!.then(j => { if (vivo) setD(j); },
      () => { arquivos.delete(ch); if (vivo) setErro(true); });
    return () => { vivo = false; };
  }, [cargo, uf]);
  return { arquivo: d, erro };
}

const TIPO: Record<string, { rot: string; slot: number }> = {
  partido: { rot: 'partido', slot: 1 }, pf: { rot: 'pessoa física', slot: 2 },
  candidato: { rot: 'outros candidatos', slot: 3 }, coletivo: { rot: 'financiamento coletivo', slot: 4 },
  proprio: { rot: 'recursos próprios', slot: 5 }, outro: { rot: 'outros', slot: 6 },
};
const tipo = (k: string) => TIPO[k] || TIPO.outro;
const pct = (v: number, tot: number) => ((v / tot) * 100).toFixed(0) + '%';

const Secao = ({ titulo, children }: { titulo: string; children: ReactNode }) => (
  <section className="mt-5">
    <h4 className="mb-2 text-[.78rem] font-semibold uppercase tracking-wider text-ink-3">{titulo}</h4>
    {children}
  </section>
);
const Dado = ({ k, v }: { k: string; v: ReactNode }) => v ? (
  <div><dt className="text-[.74rem] text-ink-3">{k}</dt><dd className="text-[.9rem]">{v}</dd></div>
) : null;
const Vazio = ({ children }: { children: ReactNode }) =>
  <p className="text-[.88rem] italic text-ink-2">{children}</p>;

const ELEITO = /^eleito/i;
const tomRegistro = (r: string | null) =>
  !r ? 'neutral' : /^deferido$/i.test(r) ? 'ok' : /^indeferido/i.test(r) ? 'crit' : 'warn';

export function FichaDeputado({ d, cargo, uf, arquivo, onClose }:
  { d: Deputado; cargo: CargoTse; uf: Uf; arquivo: ArquivoDeputados; onClose: () => void }){
  const ref = useRef<HTMLDialogElement>(null);
  const [semFoto, setSemFoto] = useState(false);
  useEffect(() => { const el = ref.current!; if (!el.open) el.showModal(); }, []);
  const f = d.fin;
  const origens = f && f.tot > 0 ? Object.entries(f.origens).filter(([, v]) => v / f.tot >= 0.005) : [];
  const maiorDoador = f ? Math.max(...f.doadores.map(x => x.v), 1) : 1;
  const maiorGasto = f?.gastos ? Math.max(...f.gastos.map(x => x.v), 1) : 1;
  const votoComProblema = d.destinoVotos && !/^válido$/i.test(d.destinoVotos);

  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby="ficha-nome"
      onClick={e => { if (e.target === ref.current) ref.current!.close(); }}
      className="m-auto max-h-[92dvh] w-[min(720px,calc(100vw-24px))] overflow-y-auto rounded-xl border border-line bg-surface-1 p-0 text-ink-1 shadow-2xl backdrop:bg-black/55">
      <div className="p-4 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="block h-[104px] w-[78px] flex-none overflow-hidden rounded-lg border border-line bg-surface-2">
            {!semFoto && <img src={fotoTse(cargo, d.sq, uf.sigla)} alt={'Foto de ' + d.urna}
              onError={() => setSemFoto(true)} className="size-full object-cover" />}
          </span>
          <div className="min-w-0 flex-1">
            <h3 id="ficha-nome" className="text-[1.25rem] font-semibold leading-tight">{d.urna}</h3>
            <p className="mt-0.5 text-[.88rem] text-ink-2">{d.nome}</p>
            <p className="mt-1 text-[.9rem]">
              <b className="tabular-nums">{d.nr}</b> · {d.partido}
              {d.partidoNome && d.partidoNome.toUpperCase() !== d.partido ? ' (' + d.partidoNome + ')' : ''}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {d.registro && <Badge tom={tomRegistro(d.registro)} icon={tomRegistro(d.registro) === 'ok' ? 'ok' : 'info'}>Registro: {d.registro.toLowerCase()}</Badge>}
              {!d.naUrna && <Badge tom="crit" icon="crit">Não está na urna</Badge>}
            </div>
          </div>
          <button type="button" onClick={() => ref.current!.close()} aria-label="Fechar"
            className="-mt-1 -mr-1 grid size-9 flex-none place-items-center rounded-lg border border-line bg-surface-2 text-[1.1rem] text-ink-2 hover:text-ink-1">✕</button>
        </div>

        {(votoComProblema || !d.naUrna) && (
          <Note crit label="Atenção.">
            {!d.naUrna ? 'Esta candidatura não foi carregada na urna. '
              : `O TSE classifica os votos deste candidato como “${d.destinoVotos!.toLowerCase()}”: podem não ser contados como válidos. `}
            Confira a situação no TSE antes de votar.
          </Note>
        )}

        <Secao titulo="Perfil declarado ao TSE">
          <dl className="grid grid-cols-2 gap-x-5 gap-y-2.5 sm:grid-cols-3">
            <Dado k="Ocupação" v={d.ocupacao} />
            <Dado k="Escolaridade" v={d.instrucao} />
            <Dado k="Idade na posse" v={d.idadePosse ? d.idadePosse + ' anos' : null} />
            <Dado k="Nascimento" v={d.nascimento} />
            <Dado k="Gênero" v={d.genero} />
            <Dado k="Cor ou raça" v={d.corRaca} />
            <Dado k="Estado civil" v={d.estadoCivil} />
            <Dado k="Federação" v={d.federacao} />
          </dl>
        </Secao>

        <Secao titulo="Trajetória eleitoral">
          {d.historico.length ? (
            <ul>
              {d.historico.map((h, i) => (
                <li key={i} className="flex flex-wrap items-baseline gap-x-2.5 border-b border-grid py-1.5 text-[.88rem] last:border-b-0">
                  <b className="w-10 flex-none tabular-nums">{h.ano}</b>
                  <span className="min-w-0 flex-1">{h.cargo}{h.local ? ' · ' + h.local : ''} <span className="text-ink-3">· {h.partido}{h.turno === 2 ? ' · 2º turno' : ''}</span></span>
                  {h.resultado && (ELEITO.test(h.resultado)
                    ? <Badge tom="ok" icon="ok">{h.resultado}</Badge>
                    : <span className="text-[.8rem] text-ink-2">{h.resultado}</span>)}
                </li>
              ))}
            </ul>
          ) : <Vazio>Nenhuma candidatura anterior consta no histórico do TSE.</Vazio>}
          <p className="mt-1.5 text-[.76rem] text-ink-3">Candidaturas anteriores registradas no TSE. Não inclui cargos por nomeação nem a atuação fora de eleições.</p>
        </Secao>

        <Secao titulo="Financiamento da campanha">
          {f ? <>
            <dl className="mb-3 grid grid-cols-2 gap-x-5 gap-y-2.5 sm:grid-cols-3">
              <Dado k="Receita declarada" v={<b>{money(f.tot)}</b>} />
              <Dado k="Despesa contratada" v={f.despesa != null ? money(f.despesa) : null} />
              <Dado k="Limite legal de gastos" v={d.limiteGastos ? money(d.limiteGastos) : null} />
            </dl>
            {!!origens.length && <>
              <div className="mb-2 flex h-2 gap-0.5 overflow-hidden rounded">
                {origens.map(([k, v]) => <div key={k} title={tipo(k).rot + ': ' + money(v)}
                  style={{ width: (v / f.tot) * 100 + '%', background: col(tipo(k).slot) }} />)}
              </div>
              <Legend items={origens.map(([k, v]) => ({ color: col(tipo(k).slot), label: tipo(k).rot + ' ' + pct(v, f.tot) }))} />
            </>}
            {f.doadores.map((x, i) => (
              <div key={i} className="grid gap-1 border-b border-grid py-1.5">
                <div className="flex items-baseline justify-between gap-2.5">
                  <span className="text-[.86rem] font-medium">{x.nome}<Tag>{tipo(x.tipo).rot}</Tag></span>
                  <span className="whitespace-nowrap text-[.84rem] font-semibold tabular-nums">{curto(x.v)}</span>
                </div>
                {x.doc && <div className="text-[.72rem] tabular-nums text-ink-3">{x.doc}</div>}
                <Meter thin pct={(x.v / maiorDoador) * 100} color={col(tipo(x.tipo).slot)} />
              </div>
            ))}
            {f.ndoad > f.doadores.length && <p className="mt-1.5 text-[.76rem] text-ink-3">Mostrando os {f.doadores.length} maiores de {f.ndoad} doadores declarados.</p>}
            {!!f.gastos?.length && <>
              <h5 className="mt-4 mb-1 text-[.8rem] font-semibold text-ink-2">Em que a campanha gastou</h5>
              {f.gastos.map(g => (
                <div key={g.tipo} className="grid gap-1 py-1">
                  <div className="flex items-baseline justify-between gap-2.5 text-[.84rem]">
                    <span>{g.tipo}</span><span className="whitespace-nowrap tabular-nums">{curto(g.v)}</span>
                  </div>
                  <Meter thin pct={(g.v / maiorGasto) * 100} color={col(1)} />
                </div>
              ))}
            </>}
          </> : <Vazio>Nenhuma receita ou despesa declarada ao TSE até {arquivo.contasEm}.</Vazio>}
          <p className="mt-1.5 text-[.76rem] text-ink-3">Valores parciais: a prestação de contas final é entregue depois da eleição.</p>
        </Secao>

        <Secao titulo="Bens declarados">
          {d.bens ? <>
            <p className="mb-1.5 text-[.9rem]"><b>{money(d.bens.tot)}</b> em {d.bens.n} {d.bens.n === 1 ? 'bem' : 'bens'}</p>
            {d.bens.itens.map((b, i) => (
              <div key={i} className="flex items-baseline justify-between gap-3 border-b border-grid py-1.5 text-[.86rem] last:border-b-0">
                <span className="min-w-0">{b.tipo}{b.desc && <span className="block text-[.76rem] text-ink-3">{b.desc}</span>}</span>
                <span className="whitespace-nowrap tabular-nums">{curto(b.v)}</span>
              </div>
            ))}
            {d.bens.n > d.bens.itens.length && <p className="mt-1.5 text-[.76rem] text-ink-3">Mostrando os {d.bens.itens.length} de maior valor.</p>}
          </> : <Vazio>Nenhum bem declarado ao TSE.</Vazio>}
        </Secao>

        <Secao titulo="Histórico judicial">
          <p className="mb-3 text-[.88rem] text-ink-2">
            Este site não levantou processos para esta candidatura. Para pesquisar, use um dos dois
            caminhos abaixo; os links já abrem na página deste candidato.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <a href={`https://divulgacandcontas.tse.jus.br/divulga/#/candidato/${uf.regiao}/${uf.sigla.toUpperCase()}/20322002026/${d.sq}/2026/${uf.sigla.toUpperCase()}`}
              target="_blank" rel="noopener"
              className="block rounded-lg border-[1.5px] border-line bg-surface-2 p-3.5 no-underline hover:border-s1">
              <b className="block text-[.92rem] text-ink-1">Certidões criminais no TSE ↗</b>
              <span className="mt-1 block text-[.8rem] text-ink-2">Fonte oficial. As certidões da Justiça
                Estadual e Federal que o próprio candidato entregou no registro, e os processos
                eleitorais da candidatura.</span>
            </a>
            <a href={'https://www.jusbrasil.com.br/consulta-processual/busca?q=' + encodeURIComponent(d.nome)}
              target="_blank" rel="noopener"
              className="block rounded-lg border-[1.5px] border-line bg-surface-2 p-3.5 no-underline hover:border-s1">
              <b className="block text-[.92rem] text-ink-1">Processos pelo nome no Jusbrasil ↗</b>
              <span className="mt-1 block text-[.8rem] text-ink-2">Site privado. Busca pelo nome completo em
                tribunais de todo o país, incluindo ações cíveis.</span>
            </a>
          </div>
          <Note className="mb-0">
            <b className="text-ink-1">Como ler o que aparecer.</b> Constar em um processo não é
            condenação: a pessoa pode ser autora, vítima ou testemunha, e o caso pode estar
            arquivado ou ter terminado em absolvição. Na busca por nome podem aparecer homônimos,
            pessoas diferentes com o mesmo nome. Confira sempre o estágio do processo e se é mesmo
            o candidato.
          </Note>
        </Secao>

        {!!d.redes.length && (
          <Secao titulo="Redes e site informados ao TSE">
            <ul className="grid gap-1 text-[.86rem]">
              {d.redes.map(u => <li key={u} className="truncate"><a href={u} target="_blank" rel="noopener nofollow">{u.replace(/^https?:\/\/(www\.)?/, '')}</a></li>)}
            </ul>
          </Secao>
        )}

        <p className="mt-5 border-t border-grid pt-3 text-[.76rem] text-ink-3">
          Fonte: Portal de Dados Abertos do TSE — registro de candidaturas, bens, histórico e
          prestação de contas, arquivos gerados em {arquivo.geradoEm}.{' '}
          <a href="https://dadosabertos.tse.jus.br/dataset/candidatos-2026" target="_blank" rel="noopener">Ver arquivos</a>
        </p>
      </div>
    </dialog>
  );
}
