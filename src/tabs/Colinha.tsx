import { useEffect, useMemo, useState } from 'react';
import { DEPEST_GO, ORDEM_URNA, URNA } from '../data/urna';
import type { CandUrna, CargoUrna } from '../data/types';
import { buscaTse, type CargoTse, type TseCand } from '../lib/tse';
import { norm, titulo } from '../lib/format';
import { rotuloCargo, useUf, type Uf } from '../lib/uf';
import { Note, PageHead, Tag } from '../components/ui';
import { TiposDeVoto } from '../components/TiposDeVoto';

const CHAVE = 'colinha2026';
type Escolhas = Record<string, string>;

const estatica = (id: string, uf: string): CandUrna[] =>
    id === 'presidente' ? URNA.presidente
  : uf !== 'go' ? []
  : id === 'governador' ? URNA.governador
  : id === 'senador1' || id === 'senador2' ? URNA.senador
  : id === 'depfed' ? URNA.depfederal
  : id === 'depest' ? DEPEST_GO.lista
  : [];

const CARGO_TSE: Record<string, CargoTse> = {
  presidente: 'presidente', governador: 'governador', senador1: 'senador', senador2: 'senador',
  depfed: 'depfed', depest: 'depest',
};

/* Lista de candidaturas da totalização oficial, por cargo: número -> candidato.
   Serve para conferir cada número escolhido contra o que o TSE vai totalizar. */
type Oficial = Partial<Record<CargoTse, Map<string, TseCand>>>;
function useListaOficial(uf: string){
  const [of, setOf] = useState<Oficial>({});
  const [vagas, setVagas] = useState<Partial<Record<CargoTse, number>>>({});
  const [geradoEm, setGeradoEm] = useState('');
  useEffect(() => {
    let vivo = true;
    (['presidente', 'governador', 'senador', 'depfed', 'depest'] as CargoTse[]).forEach(k =>
      buscaTse(k, uf).then(r => {
        if (!vivo) return;
        setOf(o => ({ ...o, [k]: new Map(r.cands.map(c => [c.n, c])) }));
        setVagas(v => ({ ...v, [k]: r.vagas }));
        setGeradoEm(g => g || r.geradoEm);
      }, () => { /* sem rede: a colinha segue com a lista local */ }));
    return () => { vivo = false; };
  }, [uf]);
  return { of, vagas, geradoEm };
}

/* candidatos oferecidos em cada cargo: a lista local quando existe (presidente e
   Goiás); nos demais estados, a lista da totalização do TSE */
function candidatos(id: string, uf: string, of: Oficial): CandUrna[] {
  const e = estatica(id, uf);
  if (e.length) return e;
  const m = of[CARGO_TSE[id]];
  return m ? [...m.values()].sort((a, b) => Number(a.n) - Number(b.n))
    .map(c => ({ nr: c.n, urna: titulo(c.urna), partido: c.partido })) : [];
}

/* O que se sabe sobre um número escolhido.
   - oficial: consta na totalização do TSE (consultado agora)
   - fora: a lista do TSE foi consultada e o número não está nela
   - ambiguo: sem consulta ao TSE, e o arquivo local tem dois nomes para o número
   - local: sem consulta ao TSE, nome vem só do arquivo local */
type Conf =
  | { tipo: 'oficial' | 'local'; nome: string; partido: string; foto?: string }
  | { tipo: 'fora'; nome: string | null }
  | { tipo: 'ambiguo'; nomes: string[] }
  | { tipo: 'desconhecido' };

function confere(id: string, nr: string, of: Oficial, lista: CandUrna[]): Conf {
  const locais = lista.filter(c => c.nr === nr);
  const mapa = of[CARGO_TSE[id]];
  if (mapa){
    const o = mapa.get(nr);
    if (o) return { tipo: 'oficial', nome: titulo(o.urna), partido: o.partido, foto: o.foto };
    return { tipo: 'fora', nome: locais.length ? locais.map(c => c.urna).join(' ou ') : null };
  }
  if (locais.length > 1) return { tipo: 'ambiguo', nomes: locais.map(c => c.urna) };
  if (locais.length === 1) return { tipo: 'local', nome: locais[0].urna, partido: locais[0].partido };
  return { tipo: 'desconhecido' };
}

const FORA = 'não consta na lista de candidaturas da totalização do TSE. A candidatura pode ter sido indeferida, renunciada ou substituída, e o voto pode ser anulado.';

/* Foto oficial do TSE, a mesma da urna. Sem rede (ou se o TSE não tiver a foto)
   fica só a moldura, para o layout não pular. */
function Foto({ src, nome, redonda }: { src?: string; nome: string; redonda?: boolean }){
  const [falhou, setFalhou] = useState(false);
  const tam = redonda ? 'size-12 rounded-full border-2 border-axis' : 'h-[44px] w-[34px] rounded-md border border-line';
  return (
    <span className={'block flex-none overflow-hidden bg-surface-2 ' + tam}>
      {src && !falhou && (
        <img src={src} alt={'Foto de ' + nome} loading={redonda ? 'eager' : 'lazy'} decoding="async"
          onError={() => setFalhou(true)} className="size-full object-cover object-top" />
      )}
    </span>
  );
}

function Retorno({ nr, conf }: { nr: string; conf: Conf }){
  if (conf.tipo === 'oficial') return <span className="text-[.78rem] text-good">✓ {conf.nome} · {conf.partido} · confirmado no TSE</span>;
  if (conf.tipo === 'local') return <span className="text-[.78rem] text-ink-3">✓ {conf.nome} · {conf.partido}</span>;
  if (conf.tipo === 'fora') return <span className="text-[.78rem] text-crit">⚠ O número {nr}{conf.nome ? ' (' + conf.nome + ')' : ''} {FORA}</span>;
  if (conf.tipo === 'ambiguo') return <span className="text-[.78rem] text-crit">⚠ o número {nr} consta para {conf.nomes.length} candidatos: {conf.nomes.join(' e ')}. Confira na urna.</span>;
  return <span className="text-[.78rem] text-ink-3">não encontrado no registro do TSE</span>;
}

/* Busca com rosto, para cargos com muitos candidatos (deputados).
   Sem escolha: campo de busca com lista de resultados (foto, número, nome, partido).
   Com escolha: cartão do candidato com botão para remover. */
const MAX_RESULTADOS = 40;
function CampoBusca({ cargo, nr, of, lista, onChange }:
  { cargo: CargoUrna; nr?: string; of: Oficial; lista: CandUrna[]; onChange: (nr: string | null) => void }){
  const mapa = of[CARGO_TSE[cargo.id]];
  /* com a lista oficial em mãos, só ela é oferecida: sem números duplicados
     nem candidaturas que saíram da disputa */
  const opcoes = useMemo(() => (mapa
    ? [...mapa.values()].map(c => ({ nr: c.n, urna: titulo(c.urna), partido: c.partido, foto: c.foto as string | undefined }))
    : lista.map(c => ({ nr: c.nr, urna: c.urna, partido: c.partido, foto: undefined as string | undefined }))
  ).sort((a, b) => a.urna.localeCompare(b.urna, 'pt-BR')).map(c => ({ ...c, chave: norm(c.urna + ' ' + c.partido) })), [mapa, lista]);
  const [q, setQ] = useState('');
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState(0);
  const id = 'busca-' + cargo.id;

  const nq = norm(q.trim());
  const digitos = q.replace(/\D/g, '');
  const achados = useMemo(() => !nq ? opcoes
    : /^\d+$/.test(nq) ? opcoes.filter(c => c.nr.startsWith(nq))
    : opcoes.filter(c => c.chave.includes(nq)), [opcoes, nq]);
  const vis = achados.slice(0, MAX_RESULTADOS);
  /* número completo que não está na lista: dá para anotar mesmo assim, com aviso */
  const avulso = digitos.length === cargo.digitos && !opcoes.some(c => c.nr === digitos) ? digitos : null;

  const escolhe = (n: string) => { onChange(n); setQ(''); setAberto(false); };
  const tecla = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setAberto(true); setAtivo(a => Math.min(a + 1, vis.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setAtivo(a => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (vis[ativo]) escolhe(vis[ativo].nr); else if (avulso) escolhe(avulso); }
    else if (e.key === 'Escape') setAberto(false);
  };

  /* ---- já escolhido: cartão com foto e botão de remover ---- */
  if (nr) {
    const conf = confere(cargo.id, nr, of, lista);
    const o = mapa?.get(nr);
    const nome = conf.tipo === 'oficial' || conf.tipo === 'local' ? conf.nome
      : conf.tipo === 'ambiguo' ? conf.nomes.join(' ou ') : conf.tipo === 'fora' && conf.nome ? conf.nome : 'Número ' + nr;
    const ok = conf.tipo === 'oficial' || conf.tipo === 'local';
    return (
      <div className="mt-2.5">
        <div className={'flex items-center gap-3 rounded-lg border-[1.5px] p-2 sm:max-w-[30rem] ' + (ok ? 'border-s1 bg-s1/10' : 'border-crit bg-crit/10')}>
          <Foto redonda src={o?.foto} nome={nome} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[.95rem] font-semibold">{nome}</div>
            <div className="text-[.82rem] text-ink-2">
              <b className="tabular-nums text-ink-1">{nr}</b>{ok && 'partido' in conf ? ' · ' + conf.partido : ''}
            </div>
          </div>
          <button type="button" onClick={() => onChange(null)} aria-label={'Remover ' + nome + ' de ' + cargo.rotulo}
            className="flex-none rounded-lg border border-line bg-surface-1 px-3 py-1.5 text-[.82rem] font-semibold text-ink-2 hover:border-crit hover:text-crit">
            ✕ Remover
          </button>
        </div>
        <div className="mt-1.5"><Retorno nr={nr} conf={conf} /></div>
      </div>
    );
  }

  /* ---- sem escolha: busca ---- */
  return (
    <div className="relative mt-2.5 sm:max-w-[30rem]"
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setAberto(false); }}>
      <div className="relative">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-3"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <input type="text" role="combobox" aria-expanded={aberto} aria-controls={id} aria-autocomplete="list"
          aria-activedescendant={aberto && vis[ativo] ? id + '-' + vis[ativo].nr : undefined}
          aria-label={'Buscar candidato a ' + cargo.rotulo}
          value={q} onChange={e => { setQ(e.target.value); setAberto(true); setAtivo(0); }}
          onFocus={() => setAberto(true)} onKeyDown={tecla} autoComplete="off"
          placeholder={`Buscar entre ${opcoes.length} candidatos por nome, partido ou número`}
          className="w-full rounded-lg border-[1.5px] border-line bg-surface-2 py-2.5 pr-3 pl-9 text-[.9rem] outline-none focus:border-s1" />
      </div>
      {aberto && (
        <ul id={id} role="listbox" aria-label={'Candidatos a ' + cargo.rotulo}
          className="absolute z-30 mt-1 max-h-[340px] w-full overflow-y-auto rounded-lg border border-line bg-surface-1 p-1 shadow-xl">
          {vis.map((c, i) => (
            <li key={c.nr + c.urna} id={id + '-' + c.nr} role="option" aria-selected={i === ativo}
              ref={el => { if (el && i === ativo) el.scrollIntoView({ block: 'nearest' }); }}
              onMouseDown={e => e.preventDefault()} onClick={() => escolhe(c.nr)} onMouseEnter={() => setAtivo(i)}
              className={'flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 ' + (i === ativo ? 'bg-surface-2' : '')}>
              <Foto src={c.foto} nome={c.urna} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[.9rem] font-medium">{c.urna}</span>
                <span className="block text-[.78rem] text-ink-3">{c.partido}</span>
              </span>
              <b className="flex-none text-[.95rem] tabular-nums">{c.nr}</b>
            </li>
          ))}
          {achados.length > vis.length && (
            <li className="px-2 py-2 text-[.78rem] text-ink-3">Mostrando {vis.length} de {achados.length}. Digite mais para afinar a busca.</li>
          )}
          {!vis.length && !avulso && <li className="px-2 py-3 text-[.85rem] text-ink-2">Nenhum candidato encontrado para “{q}”.</li>}
          {avulso && (
            <li role="option" aria-selected={false} onMouseDown={e => e.preventDefault()} onClick={() => escolhe(avulso)}
              className="cursor-pointer rounded-md px-2 py-2 text-[.85rem] text-ink-2 hover:bg-surface-2">
              O número <b className="tabular-nums text-ink-1">{avulso}</b> não está na lista do TSE. Anotar mesmo assim
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

/* botões de seleção, para listas curtas */
function Opcoes({ cargo, nr, of, lista, onChange }:
  { cargo: CargoUrna; nr?: string; of: Oficial; lista: CandUrna[]; onChange: (nr: string) => void }){
  const mapa = of[CARGO_TSE[cargo.id]];
  const sel = nr ? lista.find(c => c.nr === nr) : null;
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {lista.map(c => {
          const fora = !!mapa && !mapa.has(c.nr);
          return (
            <label key={c.nr} className={'inline-flex cursor-pointer items-center gap-2 rounded-lg border-[1.5px] px-3 py-1.5 text-[.85rem] transition-colors '
              + (nr === c.nr ? 'border-s1 bg-s1/10' : 'border-line bg-surface-2 hover:border-ink-3')}>
              <input type="radio" name={'col-' + cargo.id} value={c.nr} checked={nr === c.nr}
                onChange={() => onChange(c.nr)} className="accent-s1" />
              <Foto src={mapa?.get(c.nr)?.foto} nome={c.urna} />
              <b className="tabular-nums">{c.nr}</b>
              <span>{c.urna} · {c.partido}</span>
              {(c.alerta || fora) && <Tag title={c.alerta || FORA}>atenção</Tag>}
            </label>
          );
        })}
      </div>
      {sel && (sel.alerta || (mapa && !mapa.has(sel.nr))) && (
        <Note crit label="Atenção." className="mb-0">
          {sel.alerta ? sel.alerta + '. Um voto neste número pode ser anulado.'
            : 'O número ' + sel.nr + ' ' + FORA}
        </Note>
      )}
    </>
  );
}

/* A colinha pronta: uma linha por cargo, na ordem da urna, com a foto e um
   quadrinho por dígito, como no teclado da urna. */
function Cola({ esc, of, uf, cargos }: { esc: Escolhas; of: Oficial; uf: Uf; cargos: CargoUrna[] }){
  const n = cargos.filter(c => esc[c.id]).length;
  return (
    <div className="rounded-xl border-2 border-ink-1 bg-surface-1 p-4 print:break-inside-avoid print:border-black print:bg-white print:text-black">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[1.05rem] font-bold uppercase tracking-wide">Colinha eleitoral</div>
          <div className="text-[.85rem] text-ink-2 print:text-black">{uf.nome}</div>
        </div>
        <div className="text-right leading-none">
          <div className="text-[.68rem] font-bold uppercase tracking-widest text-ink-2 print:text-black">Eleições</div>
          <div className="text-[1.7rem] font-extrabold tabular-nums">2026</div>
        </div>
      </div>
      <div className="mt-3 mb-2 flex items-baseline justify-between text-[.74rem] font-bold uppercase tracking-wider">
        <span>1º turno · 4 de outubro</span>
        <span className="text-ink-2 print:text-black">{n} de {cargos.length} votos</span>
      </div>

      <div className="rounded-lg bg-surface-2 px-3 print:bg-white print:px-0">
        {cargos.map(cargo => {
          const nr = esc[cargo.id];
          const conf = nr ? confere(cargo.id, nr, of, candidatos(cargo.id, uf.sigla, of)) : null;
          const nome = !conf ? null
            : conf.tipo === 'oficial' || conf.tipo === 'local' ? conf.nome
            : conf.tipo === 'ambiguo' ? conf.nomes.join(' ou ')
            : conf.tipo === 'fora' ? conf.nome : null;
          const partido = conf && (conf.tipo === 'oficial' || conf.tipo === 'local') ? conf.partido : null;
          const aviso = conf?.tipo === 'ambiguo' ? 'número consta para mais de um candidato'
            : conf?.tipo === 'fora' ? 'não consta na totalização do TSE' : null;
          return (
            <div key={cargo.id} className="border-b border-dashed border-axis py-3 last:border-b-0">
              <div className="flex items-center gap-3">
                <Foto redonda key={nr} nome={nome || cargo.rotulo}
                  src={conf?.tipo === 'oficial' ? conf.foto : undefined} />
                <div className="min-w-0 flex-1">
                  <div className="text-[.68rem] font-bold uppercase leading-tight tracking-wider text-ink-2 print:text-black">{cargo.rotulo}</div>
                  <div className={'mt-0.5 text-[.88rem] font-semibold leading-tight ' + (nome ? '' : 'text-ink-3')}>
                    {nome || (nr ? 'número ' + nr : '—')}
                  </div>
                  {partido && <div className="text-[.74rem] text-ink-2 print:text-black">{partido}</div>}
                </div>
                <div className="flex flex-none gap-1" aria-label={nr ? 'Número ' + nr : 'Não escolhido'}>
                  {Array.from({ length: cargo.digitos }, (_, i) => (
                    <span key={i} aria-hidden="true"
                      className="grid h-8 w-[22px] place-items-center rounded border-[1.5px] border-ink-1 bg-surface-1 text-[1.05rem] font-bold tabular-nums print:border-black print:bg-white">
                      {nr?.[i] ?? ''}
                    </span>
                  ))}
                </div>
              </div>
              {aviso && <div className="mt-1.5 text-[.7rem] font-semibold uppercase tracking-wide text-crit">Atenção: {aviso}</div>}
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-center text-[.72rem] leading-normal text-ink-3 print:text-black">
        Mesma ordem da urna. Números conforme o registro oficial do TSE. Confira nome e foto na
        urna antes de confirmar.
      </div>
    </div>
  );
}

/* trocar de estado remonta a colinha: cada estado guarda as suas escolhas */
export default function Colinha(){
  const { uf } = useUf();
  return <ColinhaUf key={uf.sigla} uf={uf} />;
}

const plural = (id: string, uf: Uf) => id === 'depfed' ? 'deputados federais'
  : uf.sigla === 'df' ? 'deputados distritais' : 'deputados estaduais';

function ColinhaUf({ uf }: { uf: Uf }){
  const chave = uf.sigla === 'go' ? CHAVE : CHAVE + '-' + uf.sigla;
  const [esc, setEsc] = useState<Escolhas>(() => {
    try { return JSON.parse(localStorage.getItem(chave) || '{}') || {}; } catch { return {}; }
  });
  useEffect(() => { try { localStorage.setItem(chave, JSON.stringify(esc)); } catch { /* sem storage */ } }, [esc, chave]);
  const { of, vagas, geradoEm } = useListaOficial(uf.sigla);
  /* rótulos e dicas valem para qualquer estado; o número de vagas vem do TSE */
  const cargos: CargoUrna[] = ORDEM_URNA.map(c => {
    const k = CARGO_TSE[c.id], v = vagas[k];
    return { ...c,
      rotulo: c.id === 'depest' ? rotuloCargo('depest', uf) : c.rotulo,
      dica: c.id === 'depfed' || c.id === 'depest'
          ? `${v ? uf.nome + ' elege ' + v + ' ' + plural(c.id, uf) + '. ' : ''}Busque por nome ou número; seu voto também ajuda o partido a eleger outros nomes.`
        : c.id === 'senador1' ? 'Cada estado elege 2 senadores em 2026. Esta é a primeira das duas escolhas.'
        : c.dica };
  });
  const conferidos = Object.keys(of).length;

  const escolhe = (id: string, nr: string | null) => setEsc(e => {
    const n = { ...e };
    if (nr) n[id] = nr; else delete n[id];
    /* as duas vagas de senador precisam ser candidatos diferentes */
    if (nr && id === 'senador1' && n.senador2 === nr) delete n.senador2;
    if (nr && id === 'senador2' && n.senador1 === nr) delete n.senador1;
    return n;
  });

  return (
    <div className="grid items-start gap-x-6 min-[1100px]:grid-cols-[minmax(0,1fr)_350px] print:block">
      <div className="min-w-0 print:hidden">
        <PageHead title="Monte sua colinha de voto">
          Escolha seus candidatos abaixo e leve a lista pronta para a urna — imprima ou abra no
          celular, com a foto oficial de cada candidato, a mesma que aparece na urna. A ordem segue
          exatamente a da urna eletrônica, conforme o TSE. Sua escolha fica
          salva neste navegador e não é enviada a lugar nenhum.
        </PageHead>

        <TiposDeVoto />

        <div className="mb-4 rounded-xl border border-line bg-surface-1 px-4 sm:px-5">
          {cargos.map((cargo, i) => {
            const lista = candidatos(cargo.id, uf.sigla, of);
            return (
              <div key={cargo.id} className="border-b border-grid py-4 last:border-b-0">
                <div className="mb-2 flex flex-wrap items-baseline gap-2.5">
                  <span className="grid size-[22px] flex-none place-items-center self-center rounded-full border border-line bg-surface-2 text-[.72rem] font-bold text-ink-2">{i + 1}</span>
                  <span className="text-[.98rem] font-semibold">{cargo.rotulo}</span>
                  <span className="text-[.76rem] text-ink-3">{cargo.digitos} dígitos</span>
                </div>
                {cargo.dica && <p className="mb-2.5 text-[.82rem] text-ink-2">{cargo.dica}</p>}
                {!lista.length ? <p className="text-[.85rem] text-ink-3">Carregando candidatos do TSE…</p>
                  : lista.length > 20
                  ? <CampoBusca cargo={cargo} nr={esc[cargo.id]} of={of} lista={lista} onChange={nr => escolhe(cargo.id, nr)} />
                  : <Opcoes cargo={cargo} nr={esc[cargo.id]} of={of} lista={lista} onChange={nr => escolhe(cargo.id, nr)} />}
              </div>
            );
          })}

          <div className="flex flex-wrap gap-2.5 py-4">
            <button type="button" onClick={() => setEsc({})}
              className="rounded-lg border border-line bg-surface-2 px-4 py-2.5 text-[.9rem] font-semibold">Limpar escolhas</button>
          </div>

          <Note label="Fonte dos números." className="mt-0 mb-4">
            {URNA.fonte}.{' '}
            {conferidos
              ? `Conferidos agora com a lista de candidaturas da totalização oficial do TSE (arquivo de ${geradoEm}).`
              : 'Não foi possível conferir com a totalização do TSE neste momento; os nomes vêm do arquivo de candidaturas baixado em 3 de outubro.'}{' '}
            Confira sempre o número e a foto na urna antes de confirmar o voto.
          </Note>
        </div>
      </div>
      {/* fica presa à direita enquanto o eleitor escolhe; no celular vai para o fim */}
      <aside aria-label="Sua colinha" className="min-[1100px]:sticky min-[1100px]:top-4">
        <Cola esc={esc} of={of} uf={uf} cargos={cargos} />
        <button type="button" onClick={() => window.print()}
          className="mt-3 w-full rounded-lg bg-s1 px-4 py-2.5 text-[.9rem] font-semibold text-white hover:brightness-110 print:hidden">
          Imprimir colinha</button>
      </aside>
    </div>
  );
}
