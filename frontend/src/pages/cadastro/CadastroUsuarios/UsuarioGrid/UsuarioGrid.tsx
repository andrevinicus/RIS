import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

import {
  Container,
  TopBar,
  FilterButton,
  Table,
  Th,
  Td,
  FilterContainer,
  InputFilter,
} from './UsuarioGridStyles';
import { Usuario } from '../types';

interface UsuarioGridProps {
  usuarios: Usuario[];
  onAddClick: () => void;
  onFilterChange: (filtros: {
    nome?: string;
    email?: string;
  }) => void;
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
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtros, setFiltros] = useState({
    nome: '',
    email: '',
  });
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);

  const toggleFiltro = () => setFiltroAberto(prev => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const handlePesquisar = () => {
    onFilterChange(filtros);
  };

  const handleSelecionar = (usuario: Usuario) => {
    setUsuarioSelecionado(prev =>
      prev?.codigo === usuario.codigo ? null : usuario
    );
  };

  return (
    <Container>
      <TopBar>
        <FilterButton onClick={toggleFiltro}>
          <FaFilter style={{ marginRight: 6 }} /> Filtrar
        </FilterButton>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={onAddClick}
          >
            Adicionar
          </span>
          <span
            style={{
              color: usuarioSelecionado ? 'blue' : 'gray',
              cursor: usuarioSelecionado ? 'pointer' : 'not-allowed',
            }}
            onClick={() => usuarioSelecionado && onEditClick(usuarioSelecionado)}
          >
            Editar
          </span>
          <span
            style={{
              color: usuarioSelecionado ? 'blue' : 'gray',
              cursor: usuarioSelecionado ? 'pointer' : 'not-allowed',
            }}
            onClick={() =>
              usuarioSelecionado && onDeleteClick(usuarioSelecionado.codigo)
            }
          >
            Excluir
          </span>
        </div>
      </TopBar>

      {filtroAberto && (
        <FilterContainer>
          <InputFilter
            type="text"
            name="nome"
            placeholder="Filtrar por Nome"
            value={filtros.nome}
            onChange={handleChange}
          />
          <InputFilter
            type="email"
            name="email"
            placeholder="Filtrar por Email"
            value={filtros.email}
            onChange={handleChange}
          />
          <span
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '6px 12px',
              borderRadius: 4,
              cursor: 'pointer',
              display: 'inline-block',
              marginTop: 8,
            }}
            onClick={handlePesquisar}
          >
            Pesquisar
          </span>
        </FilterContainer>
      )}

      <Table>
        <thead>
          <tr>
            <Th></Th>
            <Th>Código</Th>
            <Th>Usuário</Th>
            <Th>Email</Th>
            <Th>Unidade Padrão</Th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <Td colSpan={5}>Nenhum usuário encontrado.</Td>
            </tr>
          ) : (
            usuarios.map(usuario => (
              <tr key={usuario.codigo}>
                <Td>
                  <input
                    type="checkbox"
                    checked={usuarioSelecionado?.codigo === usuario.codigo}
                    onChange={() => handleSelecionar(usuario)}
                  />
                </Td>
                <Td>{usuario.codigo}</Td>
                <Td>{usuario.usuario}</Td>
                <Td>{usuario.email}</Td>
                <Td>{usuario.unidadePadrao || '-'}</Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsuarioGrid;
