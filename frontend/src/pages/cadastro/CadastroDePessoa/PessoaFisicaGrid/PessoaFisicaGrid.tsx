import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { PessoaFisica } from './types';

import {
  Container,
  TopBar,
  FilterButton,
  FilterContainer,
  InputFilter,
  Table,
  Td,
  Th,
} from '../../CadastroDePessoaJuridica/PessoaJuridicaGrid/stylesComponent';

interface PessoaFisicaGridProps {
  pessoas: PessoaFisica[];
  onAddClick: () => void;
  onEditClick: (pessoa: PessoaFisica) => void;
  onDeleteClick: (id: string) => void;
  onFilterChange: (filters: { nome: string; cpf: string; codigo: string }) => void;
}

const PessoaFisicaGrid: React.FC<PessoaFisicaGridProps> = ({
  pessoas,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onFilterChange,
}) => {
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtros, setFiltros] = useState({ nome: '', cpf: '', codigo: '' });
  const [pessoaSelecionada, setPessoaSelecionada] = useState<PessoaFisica | null>(null);

  const toggleFiltro = () => setFiltroAberto(prev => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const handlePesquisar = () => {
    onFilterChange(filtros);
  };

  const handleSelecionar = (pessoa: PessoaFisica) => {
    setPessoaSelecionada(prev => (prev?.id === pessoa.id ? null : pessoa));
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
              color: pessoaSelecionada ? 'blue' : 'gray',
              cursor: pessoaSelecionada ? 'pointer' : 'not-allowed',
            }}
            onClick={() => pessoaSelecionada && onEditClick(pessoaSelecionada)}
          >
            Editar
          </span>
          <span
            style={{
              color: pessoaSelecionada ? 'blue' : 'gray',
              cursor: pessoaSelecionada ? 'pointer' : 'not-allowed',
            }}
            onClick={() => pessoaSelecionada && onDeleteClick(pessoaSelecionada.id)}
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
            name="cpf"
            placeholder="Filtrar por CPF"
            value={filtros.cpf}
            onChange={handleChange}
          />
          <InputFilter
            type="text"
            name="nome"
            placeholder="Filtrar por Nome"
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
            <Th>CPF</Th>
            <Th>Nome</Th>
            <Th>Idade</Th>
            <Th>Email</Th>
          </tr>
        </thead>
        <tbody>
          {pessoas.length === 0 ? (
            <tr>
              <Td colSpan={6} style={{ textAlign: 'center' }}>
                Nenhuma pessoa cadastrada.
              </Td>
            </tr>
          ) : (
            pessoas.map(pessoa => (
              <tr key={pessoa.id}>
                <Td>
                  <input
                    type="checkbox"
                    checked={pessoaSelecionada?.id === pessoa.id}
                    onChange={() => handleSelecionar(pessoa)}
                  />
                </Td>
                <Td>{pessoa.codigo}</Td>
                <Td>{pessoa.cpf}</Td>
                <Td>{pessoa.name}</Td>
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
