import React from 'react';


import GenericGrid from '../../../../components/Grid/GenericGrid';
import { PessoaJuridica } from '../../../../types/pessoaJuridica';



export interface ConvenioGridItem {
  id: string;
  codigo: string;
  nome: string;
  contato?: string;
  telefone?: string;
  codigoAns?: string; // ← adicionar aqui
  pessoaJuridica: PessoaJuridica;
  pessoaJuridicaId?: string;
  createdAt: Date;
}

interface ConvenioGridProps {
  convenios: ConvenioGridItem[];
  onFilterChange: (filtros: Record<string, string>) => void;
  onAddClick: () => void;
  onEditClick: (convenio: ConvenioGridItem) => void;
  onDeleteClick: (id: string) => void;
}

const ConvenioGrid: React.FC<ConvenioGridProps> = ({
  convenios,
  onFilterChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <GenericGrid<ConvenioGridItem>
      items={convenios}
      columns={[
        { label: 'Código', field: 'codigo' },
        { label: 'Nome', field: 'nome' },
        { label: 'Cnpj', field: 'contato' },
        { label: 'Empresa', field: 'pessoaJuridica', render: (c) => c.pessoaJuridica.nome_fantasia },
        { label: 'Criado em', field: 'createdAt', render: (c) => new Date(c.createdAt).toLocaleDateString() },
      ]}
      filters={{ codigo: '', nome: '', pessoaJuridica: '' }}
      filterPlaceholders={{
        codigo: 'Filtrar por Código',
        nome: 'Filtrar por Nome',
        pessoaJuridica: 'Filtrar por Empresa',
      }}
      onFilterChange={onFilterChange}
      onAddClick={onAddClick}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      getId={(c) => c.codigo}
      onRowDoubleClick={(item) => {
        // Redireciona para a tela de planos do convênio
        window.location.href = `/planos/${item.id}`;
        // ou usando react-router: navigate(`/planos/${item.id}`);
      }}
    />
  );
};

export default ConvenioGrid;
