import { useEffect, useState } from 'react';
import { pesquisasEstado, type PesquisasWiki, type TabelaWiki } from '../lib/wikipedia';
import type { Uf } from '../lib/uf';
import { Card, Note } from './ui';

function Tabela({ t }: { t: TabelaWiki }){
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[.8rem]">
        <tbody>
          {t.linhas.map((l, i) => (
            <tr key={i}>
              {l.map((c, j) => c.th
                ? <th key={j} colSpan={c.colSpan} rowSpan={c.rowSpan} className="border border-grid bg-surface-2 px-2 py-1.5 text-center align-middle text-[.76rem] font-semibold">{c.t}</th>
                : <td key={j} colSpan={c.colSpan} rowSpan={c.rowSpan} className={'border border-grid px-2 py-1.5 text-center align-middle tabular-nums ' + (j === 0 ? 'text-left' : '')}>{c.t || '—'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Pesquisas de governador e Senado do estado escolhido, buscadas na hora. */
export function PesquisasEstado({ uf, so }: { uf: Uf; so?: 'governador' | 'senador' }){
  const [st, setSt] = useState<{ d: PesquisasWiki | null; erro: string | null }>({ d: null, erro: null });
  useEffect(() => {
    let vivo = true;
    setSt({ d: null, erro: null });
    pesquisasEstado(uf).then(d => { if (vivo) setSt({ d, erro: null }); },
      (e: Error) => { if (vivo) setSt({ d: null, erro: e.message || 'falha de rede' }); });
    return () => { vivo = false; };
  }, [uf]);

  if (st.erro) return <Note>Não foi possível buscar as pesquisas {uf.em} agora ({st.erro}).</Note>;
  if (!st.d) return <p className="py-6 text-center text-ink-2">Buscando as pesquisas {uf.em}…</p>;
  const itens = ([['governador', st.d.governador], ['senador', st.d.senador]] as const)
    .filter(([k]) => !so || so === k);

  return (
    <>
      {itens.map(([k, t]) => t ? (
        <Card key={k} title={`${t.titulo} · ${uf.nome}`}
          subtitle="Período mais recente do compilado, como está na fonte. Percentuais de intenção de voto; confira em cada linha o instituto, a data, a amostra e a margem de erro.">
          <Tabela t={t} />
          <p className="mt-3 text-[.82rem] text-ink-2">Fonte: <a href={st.d!.url} target="_blank" rel="noopener">Wikipédia · {st.d!.pagina} ↗</a>,
            onde estão também os períodos anteriores, o 2º turno e o link de cada pesquisa.</p>
        </Card>
      ) : (
        <Note key={k}>Não encontramos tabela de pesquisas para {k === 'governador' ? 'governador' : 'o Senado'} {uf.em} no compilado.</Note>
      ))}
      <Note label="Como ler.">
        Pesquisa mede intenção de voto no momento da coleta, não prevê resultado, e diferenças
        menores que a margem de erro são empate técnico. Esta tabela é um compilado feito por
        voluntários da Wikipédia, que este site não conferiu linha a linha: para qualquer número
        que importe, abra a fonte e veja o registro da pesquisa no TSE.
      </Note>
    </>
  );
}
