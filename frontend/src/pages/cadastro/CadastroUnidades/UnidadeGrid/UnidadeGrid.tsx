import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { Unidade } from '../HookTypes/types';
import {
  Container,
  TopBar,
  FilterButton,
  FilterContainer,
  InputFilter,
  Table,
  Td,
  Th,
} from './UnidadeGridStyles';

interface UnidadeGridProps {
  unidades: Unidade[];
  onFilterChange: (filtros: { nome?: string; cnpj?: string; municipio?: string }) => void;
  onAddClick: () => void;
  onEditClick: (unidade: Unidade) => void;
  onDeleteClick: (codUnidade: string) => void;
}

const UnidadeGrid: React.FC<UnidadeGridProps> = ({
  unidades = [],
  onFilterChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtros, setFiltros] = useState({ nome: '', cnpj: '', codUnidade: '' });
  const [unidadeSelecionada, setUnidadeSelecionada] = useState<Unidade | null>(null);

  const toggleFiltro = () => setFiltroAberto(prev => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const handlePesquisar = () => {
    onFilterChange(filtros);
  };

  const handleSelecionar = (unidade: Unidade) => {
    setUnidadeSelecionada(prev =>
      prev?.codUnidade === unidade.codUnidade ? null : unidade
    );
  };

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
              color: unidadeSelecionada ? 'blue' : 'gray',
              cursor: unidadeSelecionada ? 'pointer' : 'not-allowed',
            }}
            onClick={() => unidadeSelecionada && onEditClick(unidadeSelecionada)}
          >
            Editar
          </span>
          <span
            style={{
              color: unidadeSelecionada ? 'blue' : 'gray',
              cursor: unidadeSelecionada ? 'pointer' : 'not-allowed',
            }}
            onClick={() =>
              unidadeSelecionada && onDeleteClick(unidadeSelecionada.codUnidade)
            }
          >
            Excluir
          </span>
        </div>
      </TopBar>

      {filtroAberto && (
        <FilterContainer id="filter-container" role="region" aria-label="Filtros de unidades">
          <InputFilter
            type="text"
            name="cnpj"
            placeholder="Filtrar por CNPJ"
            value={filtros.cnpj}
            onChange={handleChange}
            autoComplete="off"
          />
          <InputFilter
            type="text"
            name="nome"
            placeholder="Filtrar por Nome"
            value={filtros.nome}
            onChange={handleChange}
            autoComplete="off"
          />
          <InputFilter
            type="text"
            name="codUnidade"
            placeholder="Filtrar Código da Unidade"
            value={filtros.codUnidade}
            onChange={handleChange}
            autoComplete="off"
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
            <Th>Nome</Th>
            <Th>CNPJ</Th>
            <Th>Razão Social</Th>
            <Th>Matriz</Th>
          </tr>
        </thead>
        <tbody>
          {unidades.length === 0 ? (
            <tr>
              <Td colSpan={6} style={{ textAlign: 'center' }}>
                Nenhuma unidade cadastrada.
              </Td>
            </tr>
          ) : (
            unidades.map(u => (
              <tr key={u.codUnidade}>
                <Td>
                  <input
                    type="checkbox"
                    checked={unidadeSelecionada?.codUnidade === u.codUnidade}
                    onChange={() => handleSelecionar(u)}
                  />
                </Td>
                <Td>{u.codUnidade}</Td>
                <Td>{u.nomeReduzido}</Td>
                <Td>{u.cnpj}</Td>
                <Td>{u.razaoSocial}</Td>
                <Td>{u.matriz ? 'Sim' : 'Não'}</Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default UnidadeGrid;
