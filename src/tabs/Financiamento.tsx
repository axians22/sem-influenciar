import { useState } from 'react';
import { DOAD, FINANCIAMENTO as F } from '../data/financiamento';
import type { PrestacaoCand } from '../data/types';
import { brl, col, curto, money, titulo } from '../lib/format';
import { BarChart } from '../components/Chart';
import { Card, DataTable, Legend, Meter, Note, PageHead, Seg, Sources, Tag, tip } from '../components/ui';

const TIPO: Record<string, { rot: string; slot: number }> = {
  partido: { rot: 'partido', slot: 1 }, pf: { rot: 'pessoa física', slot: 2 },
  pj: { rot: 'empresa', slot: 3 }, coletivo: { rot: 'financiamento coletivo', slot: 4 },
  proprio: { rot: 'recursos próprios', slot: 5 }, outro: { rot: 'outros', slot: 6 },
};
const tipo = (k: string) => TIPO[k] || TIPO.outro;
const pct = (v: number, d = 1) => v.toFixed(d).replace('.', ',') + '%';

function Prestacao({ c }: { c: PrestacaoCand }){
  const origens = Object.entries(c.origens || {}).filter(([, v]) => c.tot > 0 && (v / c.tot) * 100 >= 0.05);
  const maior = Math.max(...c.doadores.map(x => x.v), 1);
  return (
    <Card>
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-[1.05rem] font-semibold">{titulo(c.cand)} ({c.partido}){c.nr ? ' · ' + c.nr : ''}</h3>
        <span className="text-[.85rem] tabular-nums text-ink-2">
          {curto(c.tot)} de {c.ndoad} {c.ndoad === 1 ? 'doador' : 'doadores'}
        </span>
      </div>

      {!(c.tot > 0) ? (
        <p className="mt-2.5 text-[.88rem] italic text-ink-2">Nenhuma receita declarada ao TSE até a geração do arquivo.</p>
      ) : <>
        {/* composição por origem do dinheiro */}
        {!!origens.length && <>
          <div className="mt-2.5 mb-2 flex h-2 gap-0.5 overflow-hidden rounded">
            {origens.map(([k, v]) => (
              <div key={k} style={{ width: (v / c.tot) * 100 + '%', background: col(tipo(k).slot) }}
                {...tip(tipo(k).rot, [{ color: col(tipo(k).slot), label: 'Valor', value: money(v) },
                  { label: 'Do total', value: pct((v / c.tot) * 100) }])} />
            ))}
          </div>
          <Legend items={origens.map(([k, v]) => ({ color: col(tipo(k).slot),
            label: tipo(k).rot + ' ' + pct((v / c.tot) * 100, 0) }))} />
        </>}

        <h4 className="mt-3 mb-1 text-[.78rem] font-semibold uppercase tracking-wider text-ink-3">Maiores doadores</h4>
        {c.doadores.map((x, i) => {
          const sub = [x.doc, x.cnae].filter(Boolean).join(' · ');
          return (
            <div key={i} className="grid gap-1 border-b border-grid py-2"
              {...tip(x.nome, [{ color: col(tipo(x.tipo).slot), label: tipo(x.tipo).rot, value: money(x.v) },
                { label: 'Do total declarado', value: pct((x.v / c.tot) * 100, 2) }], sub)}>
              <div className="flex items-baseline justify-between gap-2.5">
                <span className="text-[.88rem] font-medium">{x.nome}<Tag>{tipo(x.tipo).rot}</Tag></span>
                <span className="whitespace-nowrap text-[.85rem] font-semibold tabular-nums">{curto(x.v)}</span>
              </div>
              <div className="text-[.74rem] tabular-nums text-ink-3">{sub}</div>
              <Meter thin pct={(x.v / maior) * 100} color={col(tipo(x.tipo).slot)} />
            </div>
          );
        })}
        {c.ndoad > c.doadores.length && (
          <p className="mt-2 text-[.74rem] text-ink-3">
            Mostrando os {c.doadores.length} maiores de {c.ndoad} doadores declarados.</p>
        )}
        <DataTable label="Ver doadores em tabela"
          headers={['Doador', 'Documento', 'Tipo', { t: 'Valor', n: true }]}
          rows={c.doadores.map(x => [x.nome, x.doc, tipo(x.tipo).rot, money(x.v)])} />
      </>}
    </Card>
  );
}

const GRUPOS = [
  { id: 'pres', label: 'Presidência', lista: DOAD.presidente },
  { id: 'gov', label: 'Governo de Goiás', lista: DOAD.goias['Governador'] },
  { id: 'sen', label: 'Senado por Goiás', lista: DOAD.goias['Senador'] },
  { id: 'depfed', label: 'Dep. federal por Goiás', lista: DOAD.goias['Deputado Federal'],
    nota: 'As 15 maiores arrecadações entre os candidatos a deputado federal por Goiás.' },
  { id: 'cruz', label: 'Doadores em mais de uma campanha', lista: null },
].filter(g => g.id === 'cruz' ? DOAD.cruzados?.length : g.lista?.length);

export default function Financiamento(){
  const [sub, setSub] = useState(GRUPOS[0].id);
  const g = GRUPOS.find(x => x.id === sub)!;
  const vs = F.linhas.map(r => r.v);

  return (
    <>
      <PageHead title="Financiamento de campanha">
        Doadores declarados ao TSE, com CPF ou CNPJ. Vale distinguir duas coisas que costumam ser
        confundidas: <b className="text-ink-1">doador</b> é quem colocou dinheiro na campanha;{' '}
        <b className="text-ink-1">fornecedor</b> é quem recebeu dinheiro dela. Os valores são parciais —
        a prestação de contas final ocorre depois da eleição.
      </PageHead>

      <Seg label="Cargo" value={sub} onChange={setSub}
        options={GRUPOS.map(x => ({ id: x.id, label: x.label }))} />

      {sub === 'pres' && (
        <Card title={F.titulo}
          subtitle={`Em milhões de reais. Escala logarítmica, porque os valores vão de ${brl(Math.min(...vs))} a ${brl(Math.max(...vs))}.`}>
          <BarChart log={{ min: 0.001, max: 100 }} unidade="Receita declarada" valFmt={brl}
            tickFmt={v => v >= 1 ? Math.round(v) + ' mi' : Math.round(v * 1000) + ' mil'}
            alt="Receita de campanha declarada por candidato."
            rows={F.linhas.map(r => ({ label: r.nome, v: r.v }))} />
          <Note>{F.nota}</Note>
          <DataTable label="Ver valores em tabela"
            headers={['Candidato', { t: 'Receita declarada', n: true }]}
            rows={F.linhas.map(r => [r.nome, brl(r.v)])} />
        </Card>
      )}

      {g.nota && <p className="mb-4 text-[.88rem] text-ink-2">{g.nota}</p>}
      {g.lista?.map(c => <Prestacao key={c.cand + c.nr} c={c} />)}

      {sub === 'cruz' && <>
        <p className="mb-3.5 max-w-[70ch] text-[.88rem] text-ink-2">
          Quem colocou dinheiro em candidaturas diferentes, às vezes de partidos adversários. Apenas
          doações somando R$ 200 mil ou mais.
        </p>
        {DOAD.cruzados.map(c => (
          <div key={c.doc + c.nome} className="mb-3 rounded-r-lg border-l-[3px] border-s2 bg-surface-2 px-4 py-3.5">
            <div className="text-[.95rem] font-semibold">{c.nome}<Tag>{tipo(c.tipo).rot}</Tag></div>
            <div className="text-[.74rem] tabular-nums text-ink-3">{c.doc} · total {curto(c.tot)}</div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[.85rem] text-ink-2">
              {c.para.map(p => (
                <span key={p.cand + p.cargo}>{p.cand} ({p.partido}, {p.cargo}) ·{' '}
                  <b className="tabular-nums text-ink-1">{curto(p.v)}</b></span>
              ))}
            </div>
          </div>
        ))}
      </>}

      <Note label="Fonte.">
        {DOAD.fonte}. Arquivo gerado pelo TSE em {DOAD.geradoEm} e processado sem intermediários.{' '}
        {DOAD.nota} CPF aparece parcialmente mascarado; CNPJ é informação pública e aparece completo.
      </Note>
      <Sources fontes={[{ t: 'TSE · prestação de contas eleitorais 2026', u: DOAD.fonteUrl }]} />
    </>
  );
}
