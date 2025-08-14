import React, { useState } from 'react';

import UsuarioVinculosPage from '../ConfigUser/UsuarioVinculosPage';
import GenericGrid from '../../../../components/Grid/GenericGrid';
import { Usuario } from '../../../../types/usuario';

interface UsuarioGridProps {
  usuarios: Usuario[];
  onAddClick: () => void;
  onFilterChange: (filtros: Record<string, string>) => void;
  onEditClick: (usuario: Usuario) => void;
  onDeleteClick: (id: string) => void | Promise<void>;
}

const UsuarioGrid: React.FC<UsuarioGridProps> = ({
  usuarios,
  onAddClick,
  onFilterChange,
  onEditClick,
  onDeleteClick,
}) => {
  const [usuarioVinculos, setUsuarioVinculos] = useState<Usuario | null>(null);

  if (usuarioVinculos) {
    return (
      <UsuarioVinculosPage
        usuario={usuarioVinculos}
        onVoltar={() => setUsuarioVinculos(null)}
      />
    );
  }

  return (
    <GenericGrid<Usuario>
      items={usuarios}
      columns={[
        { label: 'Código', field: 'codigo' },
        { label: 'Usuário', field: 'usuario' },
        { label: 'Email', field: 'email' },
        { label: 'Unidade Padrão', field: 'unidadePadrao' },
      ]}
      filters={{ nome: '', email: '' }}
      filterPlaceholders={{
        nome: 'Filtrar por Nome',
        email: 'Filtrar por Email',
      }}
      onFilterChange={onFilterChange}
      onAddClick={onAddClick}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      getId={(u) => u.codigo}
      onRowDoubleClick={(usuario) => setUsuarioVinculos(usuario)} // aqui dispara a navegação
    />
  );
};

export default UsuarioGrid;
