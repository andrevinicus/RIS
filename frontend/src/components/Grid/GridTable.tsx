import React from 'react';
import { Table, Td, Th } from '../StyleComponents/StyleComponents';

interface Column<T> {
  label: string;
  field: keyof T | string;
  render?: (item: T) => React.ReactNode;
}

interface GridTableProps<T> {
  items: T[];
  columns: Column<T>[];
  getId: (item: T) => string;
  isSelecionado: (id: string) => boolean;
  handleCheckboxClick: (id: string) => void;
  handleRowClick: (id: string) => void;
  onRowDoubleClick?: (item: T) => void;
  onRowContextMenu?: (e: React.MouseEvent, item: T) => void;
}

function GridTable<T>({
  items,
  columns,
  getId,
  isSelecionado,
  handleCheckboxClick,
  handleRowClick,
  onRowDoubleClick,
  onRowContextMenu,
}: GridTableProps<T>) {
  return (
    <Table>
      <thead>
        <tr>
          <Th></Th>
          {columns.map(col => <Th key={col.label}>{col.label}</Th>)}
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <Td colSpan={columns.length + 1} style={{ textAlign: 'center' }}>
              Nenhum registro encontrado.
            </Td>
          </tr>
        ) : (
          items.map(item => {
            const id = getId(item);
            return (
              <tr
                key={id}
                onClick={() => handleRowClick(id)}
                onDoubleClick={() => onRowDoubleClick?.(item)}
                onContextMenu={e => onRowContextMenu?.(e, item)}
                style={{ backgroundColor: isSelecionado(id) ? 'rgba(0,123,255,0.15)' : 'transparent' }}
              >
                <Td onClick={e => e.stopPropagation()}>
                  <input type="checkbox" checked={isSelecionado(id)} onChange={() => handleCheckboxClick(id)} />
                </Td>
                {columns.map((col, idx) => (
                  <Td key={idx}>{col.render ? col.render(item) : String(item[col.field as keyof T])}</Td>
                ))}
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
}

export default GridTable;
