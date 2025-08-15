import React from 'react';
import { Plano } from '../../types/planos';
import GenericGrid from '../../components/Grid/GenericGrid';

interface PlanoGridProps {
  planos: Plano[];
  onFilterChange: (filtros: Record<string, string>) => void;
  onAddClick: () => void;
  onEditClick: (plano: Plano) => void;
  onDeleteClick: (id: string) => void;
}

const PlanoGrid: React.FC<PlanoGridProps> = ({
  planos,
  onFilterChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <GenericGrid<Plano>
      items={planos}
      columns={[
        { label: 'Código', field: 'codigo' },
        { label: 'Nome', field: 'nome' },
        { label: 'Convênio', field: 'convenioNome' },
        { label: 'Valor', field: 'valor', render: (p) => p.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
        { label: 'Status', field: 'status' },
        { label: 'Criado em', field: 'createdAt', render: (p) => new Date(p.createdAt).toLocaleDateString() },
      ]}
      filters={{ codigo: '', nome: '', convenioNome: '' }}
      filterPlaceholders={{
        codigo: 'Filtrar por Código',
        nome: 'Filtrar por Nome',
        convenioNome: 'Filtrar por Convênio',
      }}
      onFilterChange={onFilterChange}
      onAddClick={onAddClick}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      getId={(p) => p.id}
    />
  );
};

export default PlanoGrid;
