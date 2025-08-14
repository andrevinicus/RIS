import React from 'react';

import GenericGrid from '../../../../components/Grid/GenericGrid';
import { Unidade } from '../../../../types/unidade';


interface UnidadeGridProps {
  unidades: Unidade[];
  onFilterChange: (filtros: Record<string, string>) => void;
  onAddClick: () => void;
  onEditClick: (unidade: Unidade) => void;
  onDeleteClick: (codUnidade: string) => void;
}

const UnidadeGrid: React.FC<UnidadeGridProps> = ({
  unidades,
  onFilterChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <GenericGrid<Unidade>
      items={unidades}
      columns={[
        { label: 'Código', field: 'codUnidade' },
        { label: 'Nome', field: 'nomeReduzido' },
        { label: 'CNPJ', field: 'cnpj' },
        { label: 'Razão Social', field: 'razaoSocial' },
        { label: 'Matriz', field: 'matriz', render: (u) => (u.matriz ? 'Sim' : 'Não') },
      ]}
      filters={{ cnpj: '', nome: '', codUnidade: '' }}
      filterPlaceholders={{
        cnpj: 'Filtrar por CNPJ',
        nome: 'Filtrar por Nome',
        codUnidade: 'Filtrar Código da Unidade',
      }}
      onFilterChange={onFilterChange}
      onAddClick={onAddClick}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      getId={(u) => u.codUnidade}
    />
  );
};

export default UnidadeGrid;
