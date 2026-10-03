import { useEffect, useState } from 'react';

/* aba ativa guardada no hash (#/pesquisas): link compartilhável e botão voltar
   funcionam, sem precisar de roteador */
export function useHashTab<T extends string>(ids: readonly T[], padrao: T){
  const ler = (): T => {
    const h = window.location.hash.replace(/^#\/?/, '') as T;
    return ids.includes(h) ? h : padrao;
  };
  const [tab, setTab] = useState<T>(ler);
  useEffect(() => {
    const on = () => setTab(ler());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const ir = (t: T) => { window.location.hash = '/' + t; window.scrollTo({ top: 0 }); };
  return [tab, ir] as const;
}
