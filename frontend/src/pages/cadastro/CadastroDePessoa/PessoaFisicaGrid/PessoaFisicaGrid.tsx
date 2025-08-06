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

  // Controle de seleção (array de ids para múltipla seleção)
  const [selecionados, setSelecionados] = useState<string[]>([]);

  const toggleFiltro = () => setFiltroAberto((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handlePesquisar = () => {
    onFilterChange(filtros);
  };

  // Clique no checkbox: adiciona/remove da seleção múltipla
  const handleCheckboxClick = (id: string) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]
    );
  };

  // Clique na linha (fora checkbox): seleciona só essa linha (substitui múltiplos)
  const handleRowClick = (id: string) => {
    if (selecionados.length === 1 && selecionados[0] === id) {
      setSelecionados([]);
    } else {
      setSelecionados([id]);
    }
  };

  // Verifica se id está selecionado (para estilizar linha e checkbox)
  const isSelecionado = (id: string) => selecionados.includes(id);

  // Para habilitar/desabilitar botões, apenas seleção única é permitida
  const selecionadoUnico = selecionados.length === 1 ? selecionados[0] : null;

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
            onClick={() => {
              if (selecionadoUnico) {
                const pessoa = pessoas.find((p) => p.id === selecionadoUnico);
                if (pessoa) onEditClick(pessoa);
              }
            }}
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
            pessoas.map((pessoa) => (
              <tr
                key={pessoa.id}
                onClick={() => handleRowClick(pessoa.id)}
                onDoubleClick={() => onEditClick(pessoa)}
                style={{
                  backgroundColor: isSelecionado(pessoa.id)
                    ? 'rgba(0, 123, 255, 0.15)'
                    : 'transparent',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!isSelecionado(pessoa.id)) {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      'rgba(0, 123, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelecionado(pessoa.id)) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Td
                  onClick={(e) => {
                    e.stopPropagation(); // previne clique na linha ao clicar no checkbox
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelecionado(pessoa.id)}
                    onChange={() => handleCheckboxClick(pessoa.id)}
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
