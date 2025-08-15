import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericGrid from '../../../../components/Grid/GenericGrid';
import { PessoaJuridica } from '../../../../types/pessoaJuridica';
import ContextMenu, { ContextMenuOption } from '../../../../context/ContextMenu';

export interface ConvenioGridItem {
  id: string;
  codigo: string;
  nome: string;
  email?: string;
  site?: string;
  formaPagamento?: 'privado' | 'publico' | 'particular';
  tipo?: 'particular' | 'publico' | 'cortesia';
  obs?: string;
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
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    item?: ConvenioGridItem;
  }>({ visible: false, x: 0, y: 0 });

  const handleContextMenu = (event: React.MouseEvent, item: ConvenioGridItem) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY, item });
  };

  const options: ContextMenuOption[] = contextMenu.item
    ? [
        { label: 'Editar', onClick: () => onEditClick(contextMenu.item!) },
        { label: 'Excluir', onClick: () => onDeleteClick(contextMenu.item!.id) },
        { label: 'Configurações', onClick: () => navigate(`/cadastro/configs/${contextMenu.item!.id}`) },
      ]
    : [];

  return (
    <div>
      <GenericGrid<ConvenioGridItem>
        items={convenios}
        columns={[
          { label: 'Código', field: 'codigo' },
          { label: 'Nome', field: 'nome' },
          { label: 'CNPJ', field: 'pessoaJuridica', render: (c) => c.pessoaJuridica.cnpj },
          { label: 'Razão Social', field: 'pessoaJuridica', render: (c) => c.pessoaJuridica.nome_fantasia },
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
        onRowDoubleClick={(item) => navigate(`/cadastro/planos/${item.id}`, { state: { convenioNome: item.nome } })}
        onRowContextMenu={handleContextMenu} // precisa propagar no GenericGrid
      />

      <ContextMenu
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        options={options}
        onClose={() => setContextMenu({ ...contextMenu, visible: false })}
      />
    </div>
  );
};

export default ConvenioGrid;

