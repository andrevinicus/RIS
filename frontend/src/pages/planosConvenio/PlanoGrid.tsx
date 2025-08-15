import React from 'react';
import { useLocation } from 'react-router-dom';
import { Plano } from '../../types/planos';
import GenericGrid from '../../components/Grid/GenericGrid';
import BackButton from '../../components/Header/BackButton';


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
  const location = useLocation();
  const convenioNome = (location.state as { convenioNome?: string })?.convenioNome;

  return (
    <div>
      <BackButton to="/cadastro/convenios" convenioNome={convenioNome} />

      <GenericGrid<Plano>
        items={planos}
        columns={[
          { label: 'Código', field: 'codigo' },
          { label: 'Nome', field: 'nome' },
          { label: 'Convênio', field: 'convenioNome' },
          { 
            label: 'Valor', 
            field: 'valor', 
            render: (p) => p.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
          },
          { label: 'Status', field: 'status' },
          { 
            label: 'Criado em', 
            field: 'createdAt', 
            render: (p) => new Date(p.createdAt).toLocaleDateString() 
          },
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
    </div>
  );
};

export default PlanoGrid;
