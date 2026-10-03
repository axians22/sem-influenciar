/* Navegação entre as abas. Em tela larga é uma barra lateral fixa à esquerda; em
   tela estreita vira uma faixa horizontal rolável no topo, porque uma coluna
   lateral não cabe no celular. */
export interface ItemNav<T extends string> { id: T; label: string }

export function Sidebar<T extends string>({ itens, ativo, onChange }:
  { itens: readonly ItemNav<T>[]; ativo: T; onChange: (id: T) => void }){
  return (
    <nav aria-label="Seções"
      className="sticky top-0 z-40 -mx-4 overflow-x-auto border-b border-line bg-surface-1 px-4 lg:top-4 lg:z-auto lg:mx-0 lg:self-start lg:overflow-visible lg:rounded-xl lg:border lg:p-2 print:hidden">
      <div role="tablist" aria-orientation="vertical" className="flex min-w-max gap-1 lg:min-w-0 lg:flex-col">
        {itens.map(a => {
          const on = a.id === ativo;
          return (
            <button key={a.id} type="button" role="tab" id={'tab-' + a.id} aria-selected={on}
              aria-controls="painel" onClick={() => onChange(a.id)}
              className={'whitespace-nowrap border-b-2 px-3 py-3 text-left text-[.9rem] lg:rounded-lg lg:border-b-0 lg:border-l-[3px] lg:py-2 '
                + (on ? 'border-s1 font-semibold text-ink-1 lg:bg-surface-2'
                  : 'border-transparent text-ink-2 hover:text-ink-1 lg:hover:bg-surface-2')}>
              {a.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
