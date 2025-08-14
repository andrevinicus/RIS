import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import {
  Container,
  TopBar,
  FilterButton,
  FilterContainer,
  InputFilter,
  Table,
  Td,
  Th,
} from '../StyleComponents/StyleComponents';

interface Column<T> {
  label: string;
  field: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface GenericGridProps<T> {
  items: T[];
  columns: Column<T>[];
  filters: Record<string, string>;
  filterPlaceholders?: Record<string, string>;
  onAddClick: () => void;
  onEditClick: (item: T) => void;
  onDeleteClick: (id: string) => void;
  onFilterChange: (filters: Record<string, string>) => void;
  getId: (item: T) => string;
  onRowDoubleClick?: (item: T) => void;
}

function GenericGrid<T>({
  items,
  columns,
  filters,
  filterPlaceholders = {},
  onAddClick,
  onEditClick,
  onDeleteClick,
  onFilterChange,
  getId,
  onRowDoubleClick,
}: GenericGridProps<T>) {
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [filtrosInternos, setFiltrosInternos] = useState<Record<string, string>>(filters);

  useEffect(() => {
    setFiltrosInternos(filters);
  }, [filters]);

  const toggleFiltro = () => setFiltroAberto(prev => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltrosInternos(prev => ({ ...prev, [name]: value }));
  };

  const handlePesquisar = () => onFilterChange(filtrosInternos);

  const handleCheckboxClick = (id: string) => {
    setSelecionados(prev =>
      prev.includes(id) ? prev.filter(selId => selId !== id) : [...prev, id]
    );
  };

  const handleRowClick = (id: string) => {
    setSelecionados(prev =>
      prev.length === 1 && prev[0] === id ? [] : [id]
    );
  };

  const isSelecionado = (id: string) => selecionados.includes(id);
  const selecionadoUnico = selecionados.length === 1 ? selecionados[0] : null;

  return (
    <Container>
      <TopBar>
        <FilterButton onClick={toggleFiltro}>
          <FaFilter style={{ marginRight: 6 }} /> Filtrar
        </FilterButton>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          {['Adicionar', 'Editar', 'Excluir'].map((action, idx) => {
            const isDisabled =
              action !== 'Adicionar' && !selecionadoUnico;
            const onClick =
              action === 'Adicionar'
                ? onAddClick
                : action === 'Editar'
                ? () => selecionadoUnico && onEditClick(items.find(i => getId(i) === selecionadoUnico)!)
                : () => selecionadoUnico && onDeleteClick(selecionadoUnico);

            return (
              <span
                key={idx}
                style={{
                  color: isDisabled ? 'gray' : 'blue',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onClick={onClick}
              >
                {action}
              </span>
            );
          })}
        </div>
      </TopBar>

      {filtroAberto && (
        <FilterContainer>
          {Object.keys(filtrosInternos).map(key => (
            <InputFilter
              key={key}
              type="text"
              name={key}
              placeholder={filterPlaceholders[key] || `Filtrar por ${key}`}
              value={filtrosInternos[key]}
              onChange={handleChange}
            />
          ))}
          <span
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '6px 14px',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 500,
              marginTop: 8,
              display: 'inline-block',
              transition: 'background-color 0.2s',
            }}
            onClick={handlePesquisar}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Pesquisar
          </span>
        </FilterContainer>
      )}

      <Table>
        <thead>
          <tr>
            <Th></Th>
            {columns.map(col => (
              <Th key={col.label}>{col.label}</Th>
            ))}
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
                  style={{
                    backgroundColor: isSelecionado(id)
                      ? 'rgba(0, 123, 255, 0.15)'
                      : 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (!isSelecionado(id))
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        'rgba(0, 123, 255, 0.05)';
                  }}
                  onMouseLeave={e => {
                    if (!isSelecionado(id))
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        'transparent';
                  }}
                >
                  <Td
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelecionado(id)}
                      onChange={() => handleCheckboxClick(id)}
                    />
                  </Td>
                  {columns.map((col, idx) => (
                    <Td key={idx}>
                      {col.render ? col.render(item) : String(item[col.field])}
                    </Td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default GenericGrid;
