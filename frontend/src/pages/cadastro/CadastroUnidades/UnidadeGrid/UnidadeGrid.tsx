import React, { useState } from 'react';

import { FaFilter } from 'react-icons/fa';
import { Unidade } from '../HookTypes/types';
import { Button, Container, FilterButton, FilterContainer, InputFilter, Table, Td, Th, TopBar } from './UnidadeGridStyles';

interface UnidadeGridProps {
  unidades: Unidade[];
  onFilterChange: (filtros: { nome?: string; cnpj?: string; municipio?: string }) => void;
  onAddClick: () => void; // obrigatória para evitar erro
}

const UnidadeGrid: React.FC<UnidadeGridProps> = ({ unidades = [], onFilterChange, onAddClick }) => {
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtros, setFiltros] = useState({ nome: '', cnpj: '', codUnidade: '' });

  const toggleFiltro = () => setFiltroAberto(prev => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const handlePesquisar = () => {
    onFilterChange(filtros);
  };

  const listaUnidades = Array.isArray(unidades) ? unidades : [];

  return (
    <Container>
      <TopBar>
        <Button onClick={onAddClick}>Adicionar</Button>

        <FilterButton
          onClick={toggleFiltro}
          aria-expanded={filtroAberto}
          aria-controls="filter-container"
        >
          <FaFilter style={{ marginRight: 6 }} aria-hidden="true" /> Filtrar
        </FilterButton>
      </TopBar>

      {filtroAberto && (
        <FilterContainer id="filter-container" role="region" aria-label="Filtros de unidades">
          <InputFilter
            type="text"
            name="cnpj"
            placeholder="iltrar por CNPJ"
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
            name="Codigo da Unidade"
            placeholder="Filtrar da Unidade"
            value={filtros.codUnidade}
            onChange={handleChange}
            autoComplete="off"
          />
          <Button onClick={handlePesquisar}>Pesquisar</Button>
        </FilterContainer>
      )}

      <Table>
        <thead>
          <tr>
            <Th>Código</Th>
            <Th>Nome</Th>
            <Th>CNPJ</Th>
            <Th>Razão Social</Th>
            <Th>Matriz</Th>
          </tr>
        </thead>
        <tbody>
          {listaUnidades.length === 0 ? (
            <tr>
              <Td colSpan={5} style={{ textAlign: 'center' }}>
                Nenhuma unidade cadastrada.
              </Td>
            </tr>
          ) : (
            listaUnidades.map(u => (
              <tr key={u.codUnidade}>
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
