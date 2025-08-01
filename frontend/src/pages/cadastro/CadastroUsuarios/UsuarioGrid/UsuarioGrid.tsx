import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

import {
  Container,
  TopBar,
  Button,
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

  const toggleFiltro = () => setFiltroAberto(prev => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const handlePesquisar = () => {
    onFilterChange(filtros);
  };

  return (
    <Container>
      <TopBar>
        <Button onClick={onAddClick}>Adicionar</Button>
        <FilterButton onClick={toggleFiltro}>
          <FaFilter style={{ marginRight: 6 }} /> Filtrar
        </FilterButton>
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
          <Button onClick={handlePesquisar}>Pesquisar</Button>
        </FilterContainer>
      )}

      <Table>
        <thead>
          <tr>            
            <Th>Codigo</Th>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Unidade Padrão</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <Td colSpan={4}>Nenhum usuário encontrado.</Td>
            </tr>
          ) : (
            usuarios.map(usuario => (
              <tr key={usuario.codigo}>
                <Td>{usuario.codigo}</Td>
                <Td>{usuario.nomeCompleto}</Td>
                <Td>{usuario.email}</Td>
                <Td>{usuario.unidadePadrao?.nome || '-'}</Td>
                <Td>
                  <Button
                    style={{ marginRight: 8 }}
                    onClick={() => onEditClick(usuario)}
                  >
                    Editar
                  </Button>
                  <Button
                    style={{ backgroundColor: '#dc3545' }}
                    onClick={() => onDeleteClick(usuario.codigo)}
                  >
                    Excluir
                  </Button>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsuarioGrid;
