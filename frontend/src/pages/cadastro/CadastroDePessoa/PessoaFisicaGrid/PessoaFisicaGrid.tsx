import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { PessoaFisica } from './types';

// Importa os estilos separados
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
} from './PessoaFisicaGrid.styles';

interface PessoaFisicaGridProps {
  pessoas: PessoaFisica[];
  onAddClick: () => void;
  onFilterChange: (filters: { nome: string; cpf: string; codigo: string }) => void;
}

const PessoaFisicaGrid: React.FC<PessoaFisicaGridProps> = ({ pessoas, onAddClick, onFilterChange }) => {
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtros, setFiltros] = useState({ nome: '', cpf: '', codigo: '' });

  const toggleFiltro = () => setFiltroAberto(prev => !prev);

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            onChange={handleFiltroChange}
          />
          <InputFilter
            type="text"
            name="cpf"
            placeholder="Filtrar por CPF"
            value={filtros.cpf}
            onChange={handleFiltroChange}
          />
          <InputFilter
            type="text"
            name="codigo"
            placeholder="Filtrar por Código"
            value={filtros.codigo}
            onChange={handleFiltroChange}
          />
          <Button onClick={handlePesquisar}>Pesquisar</Button>
        </FilterContainer>
      )}

      <Table>
        <thead>
          <tr>
            <Th>Código</Th>
            <Th>Nome</Th>
            <Th>CPF</Th>
            <Th>Idade</Th>
            <Th>Email</Th>
          </tr>
        </thead>
        <tbody>
          {pessoas.length === 0 ? (
            <tr><Td colSpan={5}>Nenhuma pessoa cadastrada.</Td></tr>
          ) : (
            pessoas.map(pessoa => (
              <tr key={pessoa.id}>
                <Td>{pessoa.codigo}</Td>
                <Td>{pessoa.name}</Td>
                <Td>{pessoa.cpf}</Td>
                <Td>{pessoa.idade}</Td>
                <Td>{pessoa.email}</Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default PessoaFisicaGrid;
