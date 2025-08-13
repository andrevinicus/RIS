import React, { useState } from 'react';

import { PessoaFisica } from '../../../../types/types';
import GenericGrid from '../../../../components/Grid/GenericGrid';

interface PessoaFisicaGridProps {
  pessoas: PessoaFisica[];
  onAddClick: () => void;
  onEditClick: (pessoa: PessoaFisica) => void;
  onDeleteClick: (id: string) => void;
  onFilterChange: (filters: Record<string, string>) => void;  // <-- aqui
}

const PessoaFisicaGrid: React.FC<PessoaFisicaGridProps> = ({
  pessoas,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onFilterChange,
}) => {
  const [filtros, setFiltros] = useState({ nome: '', cpf: '', codigo: '' });

const handleFiltroChange = (novosFiltros: Record<string, string>) => {
  onFilterChange(novosFiltros);
};

  return (
    <GenericGrid<PessoaFisica>
      items={pessoas}
      columns={[
        { label: 'Código', field: 'codigo' },
        { label: 'CPF', field: 'cpf' },
        { label: 'Nome', field: 'name' },
        { label: 'Idade', field: 'idade' },
        { label: 'Email', field: 'email' },
      ]}
      filters={filtros}
      filterPlaceholders={{
        codigo: 'Filtrar por Código',
        cpf: 'Filtrar por CPF',
        nome: 'Filtrar por Nome',
      }}
      onAddClick={onAddClick}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      onFilterChange={handleFiltroChange}
      getId={(p) => p.id}
    />
  );
};

export default PessoaFisicaGrid;
