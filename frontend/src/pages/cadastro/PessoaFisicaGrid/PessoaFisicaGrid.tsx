import React, { useState } from 'react';
import styled from 'styled-components';
import { PessoaFisica } from './types'; 
import { FaFilter } from 'react-icons/fa';

interface PessoaFisicaGridProps {
  pessoas: PessoaFisica[];
  onAddClick: () => void;
  onFilterChange: (filters: { nome: string; cpf: string; codigo: string }) => void;
}

const Container = styled.div`
  width: 100%;
  background: #fff;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #0056b3;
  }
`;

const FilterButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #1e7e34;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 10px;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const FilterContainer = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const InputFilter = styled.input`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 150px;
`;

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
