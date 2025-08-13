import React, { useState } from 'react';
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
  onRowDoubleClick?: (item: T) => void; // nova prop opcional
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

  React.useEffect(() => {
    setFiltrosInternos(filters);
  }, [filters]);

  const toggleFiltro = () => setFiltroAberto(prev => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltrosInternos(prev => ({ ...prev, [name]: value }));
  };

  const handlePesquisar = () => {
    onFilterChange(filtrosInternos);
  };

  const handleCheckboxClick = (id: string) => {
    setSelecionados(prev =>
      prev.includes(id) ? prev.filter(selId => selId !== id) : [...prev, id]
    );
  };

  const handleRowClick = (id: string) => {
    if (selecionados.length === 1 && selecionados[0] === id) {
      setSelecionados([]);
    } else {
      setSelecionados([id]);
    }
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
          <span style={{ color: 'blue', cursor: 'pointer' }} onClick={onAddClick}>
            Adicionar
          </span>
          <span
            style={{
              color: selecionadoUnico ? 'blue' : 'gray',
              cursor: selecionadoUnico ? 'pointer' : 'not-allowed',
            }}
            onClick={() => {
              if (selecionadoUnico) {
                const item = items.find(i => getId(i) === selecionadoUnico);
                if (item) onEditClick(item);
              }
            }}
          >
            Editar
          </span>
          <span
            style={{
              color: selecionadoUnico ? 'blue' : 'gray',
              cursor: selecionadoUnico ? 'pointer' : 'not-allowed',
            }}
            onClick={() => selecionadoUnico && onDeleteClick(selecionadoUnico)}
          >
            Excluir
          </span>
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
              padding: '6px 12px',
              borderRadius: 4,
              cursor: 'pointer',
              display: 'inline-block',
              marginTop: 8,
            }}
            onClick={handlePesquisar}
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
                  }}
                  onMouseEnter={e => {
                    if (!isSelecionado(id)) {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        'rgba(0, 123, 255, 0.05)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelecionado(id)) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    }
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
                    <Td key={idx}>{col.render ? col.render(item) : (item[col.field] as any)}</Td>
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
