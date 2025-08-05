import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { PessoaJuridica } from '../PessoaJuridicaForms/types';

import {
  Container,
  TopBar,
  FilterButton,
  FilterContainer,
  InputFilter,
  Table,
  Td,
  Th,
} from './stylesComponent';

interface PessoaJuridicaGridProps {
  empresas: PessoaJuridica[];
  onAddClick: () => void;
  onEditClick: (empresa: PessoaJuridica) => void;
  onDeleteClick: (id: string) => void;
  onFilterChange: (filtros: {
    codigo?: string;
    cnpj?: string;
    nome?: string;
  }) => void;
}

const PessoaJuridicaGrid: React.FC<PessoaJuridicaGridProps> = ({
  empresas,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onFilterChange,
}) => {
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtros, setFiltros] = useState({ codigo: '', cnpj: '', nome: '' });
  const [empresaSelecionada, setEmpresaSelecionada] = useState<PessoaJuridica | null>(null);

  const toggleFiltro = () => setFiltroAberto(prev => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const handlePesquisar = () => {
    onFilterChange(filtros);
  };

  const handleSelecionar = (empresa: PessoaJuridica) => {
    setEmpresaSelecionada(prev =>
      prev?.id === empresa.id ? null : empresa
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
              color: empresaSelecionada ? 'blue' : 'gray',
              cursor: empresaSelecionada ? 'pointer' : 'not-allowed',
            }}
            onClick={() => empresaSelecionada && onEditClick(empresaSelecionada)}
          >
            Editar
          </span>
          <span
            style={{
              color: empresaSelecionada ? 'blue' : 'gray',
              cursor: empresaSelecionada ? 'pointer' : 'not-allowed',
            }}
            onClick={() => empresaSelecionada && onDeleteClick(empresaSelecionada.id)}
          >
            Excluir
          </span>
        </div>
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
            <Th>CNPJ</Th>
            <Th>Razão Social</Th>
            <Th>Nome Fantasia</Th>
            <Th>Email</Th>
          </tr>
        </thead>
        <tbody>
          {empresas.length === 0 ? (
            <tr>
              <Td colSpan={6} style={{ textAlign: 'center' }}>
                Nenhuma empresa cadastrada.
              </Td>
            </tr>
          ) : (
            empresas.map(emp => (
              <tr key={emp.id}>
                <Td>
                  <input
                    type="checkbox"
                    checked={empresaSelecionada?.id === emp.id}
                    onChange={() => handleSelecionar(emp)}
                  />
                </Td>
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
