// GenericGrid.tsx
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
  field: keyof T | string;
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
  pageSize?: number;

  // 🔹 Clique direito
  onRowContextMenu?: (event: React.MouseEvent, item: T) => void;
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
  onRowContextMenu, // 🔹 recebendo clique direito
  pageSize = 10,
}: GenericGridProps<T>) {
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [filtrosInternos, setFiltrosInternos] = useState<Record<string, string>>(filters);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFiltrosInternos(filters);
    setCurrentPage(1);
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

  // Paginação
  const totalPages = Math.ceil(items.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleItems = items.slice(startIndex, startIndex + pageSize);

  return (
    <Container>
      {/* TopBar */}
      <TopBar>
        <FilterButton onClick={toggleFiltro}>
          <FaFilter style={{ marginRight: 6 }} /> Filtrar
        </FilterButton>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          {['Adicionar', 'Editar', 'Excluir'].map((action, idx) => {
            const isDisabled = action !== 'Adicionar' && !selecionadoUnico;
            const onClick =
              action === 'Adicionar'
                ? onAddClick
                : action === 'Editar'
                  ? () => selecionadoUnico && onEditClick(items.find(i => getId(i) === selecionadoUnico)!)
                  : () => selecionadoUnico && onDeleteClick(selecionadoUnico);

            return (
              <button
                key={idx}
                disabled={isDisabled}
                onClick={onClick}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #007bff',
                  backgroundColor: isDisabled ? '#f0f0f0' : '#007bff',
                  color: isDisabled ? '#aaa' : '#fff',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                {action}
              </button>
            );
          })}
        </div>
      </TopBar>

      {/* Filtros */}
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
          <button
            onClick={handlePesquisar}
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              marginTop: 8,
            }}
          >
            Pesquisar
          </button>
        </FilterContainer>
      )}

      {/* Tabela */}
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
          {visibleItems.length === 0 ? (
            <tr>
              <Td colSpan={columns.length + 1} style={{ textAlign: 'center' }}>
                Nenhum registro encontrado.
              </Td>
            </tr>
          ) : (
            visibleItems.map(item => {
              const id = getId(item);
              return (
                <tr
                  key={id}
                  onClick={() => handleRowClick(id)}
                  onDoubleClick={() => onRowDoubleClick?.(item)}
                  onContextMenu={(e) => onRowContextMenu?.(e, item)} // 🔹 clique direito
                  style={{
                    backgroundColor: isSelecionado(id)
                      ? 'rgba(0, 123, 255, 0.15)'
                      : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <Td onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelecionado(id)}
                      onChange={() => handleCheckboxClick(id)}
                    />
                  </Td>
                  {columns.map((col, idx) => (
                    <Td key={idx}>
                      {col.render ? col.render(item) : String(item[col.field as keyof T])}
                    </Td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      {/* Paginação */}
      <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 6, marginTop: 12 }}>
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #ccc',
            backgroundColor: currentPage === 1 ? '#f0f0f0' : '#fff',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #007bff',
              backgroundColor: page === currentPage ? '#007bff' : '#fff',
              color: page === currentPage ? '#fff' : '#007bff',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #ccc',
            backgroundColor: currentPage === totalPages || totalPages === 0 ? '#f0f0f0' : '#fff',
            cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ›
        </button>
      </div>
    </Container>
  );
}

export default GenericGrid;
