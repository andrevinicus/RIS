import React from 'react';
import { useNavigate } from 'react-router-dom';
import GenericGrid from '../../../../components/Grid/GenericGrid';
import { PessoaJuridica } from '../../../../types/pessoaJuridica';

export interface ConvenioGridItem {
  id: string;
  codigo: string;
  nome: string;
  contato?: string;
  telefone?: string;
  codigoAns?: string;
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
  const navigate = useNavigate();

  return (
    <GenericGrid<ConvenioGridItem>
      items={convenios}
      columns={[
        { label: 'Código', field: 'codigo' },
        { label: 'Nome', field: 'nome' },
        { label: 'CNPJ', field: 'pessoaJuridica', render: (c) => c.pessoaJuridica.cnpj },
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
      getId={(c) => c.id}
      onRowDoubleClick={(item) => {
        navigate(`/cadastro/planos/${item.id}`);
      }}
    />
  );
};

export default ConvenioGrid;
