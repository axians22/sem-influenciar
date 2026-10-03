import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

/* `rev` muda a cada troca de tema; os gráficos em canvas o usam para se redesenhar
   com as cores novas, já que canvas não herda variáveis CSS. */
const Ctx = createContext<{ rev: number; toggle: () => void }>({ rev: 0, toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }){
  const [rev, setRev] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const on = () => setRev(r => r + 1);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const atual = root.getAttribute('data-theme');
    const escuro = atual === 'dark' ? true : atual === 'light' ? false
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = escuro ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('tema', next); } catch { /* sem storage */ }
    setRev(r => r + 1);
  }, []);

  return <Ctx.Provider value={{ rev, toggle }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);

/* resolve as variáveis CSS do tema em cores concretas */
export function cssColors(){
  const s = getComputedStyle(document.documentElement);
  const v = (n: string) => s.getPropertyValue(n).trim();
  return {
    surface1: v('--surface-1'), surface2: v('--surface-2'),
    ink1: v('--ink-1'), ink2: v('--ink-2'), ink3: v('--ink-3'),
    grid: v('--grid'), axis: v('--axis'),
    s: [1, 2, 3, 4, 5, 6].map(i => v('--s' + i)),
  };
}
export type Colors = ReturnType<typeof cssColors>;
