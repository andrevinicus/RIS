import React from 'react';
import { FaFilter } from 'react-icons/fa';

interface TopBarProps<T> {
  selecionadoUnico: string | null;
  items: T[];
  getId: (item: T) => string;
  onAddClick: () => void;
  onEditClick: (item: T) => void;
  onDeleteClick: (id: string) => void;
  toggleFiltro: () => void;
}

function TopBar<T>({
  selecionadoUnico,
  items,
  getId,
  onAddClick,
  onEditClick,
  onDeleteClick,
  toggleFiltro,
}: TopBarProps<T>) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <button onClick={toggleFiltro} style={{ marginRight: 12 }}>
        <FaFilter style={{ marginRight: 6 }} /> Filtrar
      </button>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        {['Adicionar', 'Editar', 'Excluir'].map((action, idx) => {
          const isDisabled = action !== 'Adicionar' && !selecionadoUnico;
          const onClick =
            action === 'Adicionar'
              ? onAddClick
              : action === 'Editar'
                ? () => selecionadoUnico && onEditClick(items.find(i => getId(i) === selecionadoUnico)!)
                : () => selecionadoUnico && onDeleteClick(selecionadoUnico);

          return (
            <button key={idx} disabled={isDisabled} onClick={onClick}>
              {action}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TopBar;
