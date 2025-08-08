import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

import {
  Container,
  TopBar,
  FilterButton,
  FilterContainer,
  InputFilter,
  Table,
  Td,
  Th,
} from '../../../../components/StyleCadastro/StyleComponents';
import { Usuario } from '../../../../types/types';
import UsuarioVinculosPage from '../ConfigUser/UsuarioVinculosPage';

// Importe sua tela de vínculos

interface UsuarioGridProps {
  usuarios: Usuario[];
  onAddClick: () => void;
  onFilterChange: (filtros: { nome?: string; email?: string }) => void;
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
  const [filtros, setFiltros] = useState({ nome: '', email: '' });

  const [selecionados, setSelecionados] = useState<string[]>([]);

  // Estado para controlar qual usuário está aberto na tela de vínculos
  const [usuarioVinculos, setUsuarioVinculos] = useState<Usuario | null>(null);

  const toggleFiltro = () => setFiltroAberto((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handlePesquisar = () => {
    onFilterChange(filtros);
  };

  const handleCheckboxClick = (codigo: string) => {
    setSelecionados((prev) =>
      prev.includes(codigo) ? prev.filter((id) => id !== codigo) : [...prev, codigo]
    );
  };

  const handleRowClick = (codigo: string) => {
    if (selecionados.length === 1 && selecionados[0] === codigo) {
      setSelecionados([]);
    } else {
      setSelecionados([codigo]);
    }
  };

  const isSelecionado = (codigo: string) => selecionados.includes(codigo);

  const selecionadoUnico = selecionados.length === 1 ? selecionados[0] : null;

  // Se estiver na tela de vínculos, renderiza essa tela, com botão para voltar
  if (usuarioVinculos) {
    return (

      <UsuarioVinculosPage
        usuario={usuarioVinculos}
        onVoltar={() => setUsuarioVinculos(null)}
      />

    );
  }
  return (
    <Container>
      <TopBar>
        <FilterButton onClick={toggleFiltro}>
          <FaFilter style={{ marginRight: 6 }} /> Filtrar
        </FilterButton>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: 'blue', cursor: 'pointer' }} onClick={onAddClick}>
            Adicionar
          </span>
          <span
            style={{
              color: selecionadoUnico ? 'blue' : 'gray',
              cursor: selecionadoUnico ? 'pointer' : 'not-allowed',
            }}
            onClick={() =>
              selecionadoUnico &&
              onEditClick(usuarios.find((u) => u.codigo === selecionadoUnico)!)
            }
          >
            Editar
          </span>
          <span
            style={{
              color: selecionadoUnico ? 'blue' : 'gray',
              cursor: selecionadoUnico ? 'pointer' : 'not-allowed',
            }}
            onClick={() => selecionadoUnico && onDeleteClick(selecionadoUnico)}
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
            usuarios.map((usuario) => (
              <tr
                key={usuario.codigo}
                onClick={() => handleRowClick(usuario.codigo)}
                onDoubleClick={() => setUsuarioVinculos(usuario)} // abre tela de vínculos
                style={{
                  backgroundColor: isSelecionado(usuario.codigo)
                    ? 'rgba(0, 123, 255, 0.15)'
                    : 'transparent',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!isSelecionado(usuario.codigo)) {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      'rgba(0, 123, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelecionado(usuario.codigo)) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Td
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    width: '40px', // define uma largura fixa para garantir alinhamento com o header
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selecionados.includes(usuario.codigo)}
                    onChange={() => handleCheckboxClick(usuario.codigo)}
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
