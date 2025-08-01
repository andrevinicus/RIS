import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { PessoaJuridica } from '../PessoaJuridicaForms/types';

// importar estilos
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
} from './stylesComponent';

interface PessoaJuridicaGridProps {
  empresas: PessoaJuridica[];
  onAddClick: () => void;
  onFilterChange: (filtros: {
    codigo?: string;
    cnpj?: string;
    razao_social?: string;
    nome_fantasia?: string;
  }) => void;
}

const PessoaJuridicaGrid: React.FC<PessoaJuridicaGridProps> = ({
  empresas,
  onAddClick,
  onFilterChange,
}) => {
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtros, setFiltros] = useState({
    codigo: '',
    cnpj: '',
    nome: '',
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
            name="codigo"
            placeholder="Filtrar por Código"
            value={filtros.codigo}
            onChange={handleChange}
          />
          <InputFilter
            type="text"
            name="cnpj"
            placeholder="Filtrar por CNPJ"
            value={filtros.cnpj}
            onChange={handleChange}
          />
          <InputFilter
            type="text"
            name="nome"
            placeholder="Filtrar por Razão Social ou Nome Fantasia"
            value={filtros.nome}
            onChange={handleChange}
          />
          <Button onClick={handlePesquisar}>Pesquisar</Button>
        </FilterContainer>
      )}

      <Table>
        <thead>
          <tr>
            <Th>Código</Th>
            <Th>CNPJ</Th>
            <Th>Razão Social</Th>
            <Th>Nome Fantasia</Th>
            <Th>Email</Th>
          </tr>
        </thead>
        <tbody>
          {empresas.length === 0 ? (
            <tr>
              <Td colSpan={5}>Nenhuma empresa cadastrada.</Td>
            </tr>
          ) : (
            empresas.map(emp => (
              <tr key={emp.id}>
                <Td>{emp.codigo}</Td>
                <Td>{emp.cnpj}</Td>
                <Td>{emp.razao_social}</Td>
                <Td>{emp.nome_fantasia}</Td>
                <Td>{emp.email}</Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default PessoaJuridicaGrid;
