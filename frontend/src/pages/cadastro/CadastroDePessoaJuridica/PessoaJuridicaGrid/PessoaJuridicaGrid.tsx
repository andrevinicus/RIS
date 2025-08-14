import React, { useState } from 'react';
import GenericGrid from '../../../../components/Grid/GenericGrid';
import { PessoaJuridica } from '../../../../types/types';


interface PessoaJuridicaGridProps {
  empresas: PessoaJuridica[];
  onAddClick: () => void;
  onEditClick: (empresa: PessoaJuridica) => void;
  onDeleteClick: (id: string) => void;
  onFilterChange: (filters: Record<string, string>) => void;  // tipo genérico aqui
}

const PessoaJuridicaGrid: React.FC<PessoaJuridicaGridProps> = ({
  empresas,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onFilterChange,
}) => {
  const [filtros, setFiltros] = useState<Record<string, string>>({ codigo: '', cnpj: '', nome: '' });

  const handleFiltroChange = (novosFiltros: Record<string, string>) => {
    setFiltros(novosFiltros);
    onFilterChange(novosFiltros);
  };

  return (
    <GenericGrid<PessoaJuridica>
      items={empresas}
      columns={[
        { label: 'Código', field: 'codigo' },
        { label: 'CNPJ', field: 'cnpj' },
        { label: 'Razão Social', field: 'razao_social' },
        { label: 'Nome Fantasia', field: 'nome_fantasia' },
        { label: 'Email', field: 'email' },
      ]}
      filters={filtros}
      filterPlaceholders={{
        codigo: 'Filtrar por Código',
        cnpj: 'Filtrar por CNPJ',
        nome: 'Filtrar por Razão Social ou Nome Fantasia',
      }}
      onAddClick={onAddClick}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      onFilterChange={handleFiltroChange}
      getId={(e) => e.id}
    />
  );
};

export default PessoaJuridicaGrid;
