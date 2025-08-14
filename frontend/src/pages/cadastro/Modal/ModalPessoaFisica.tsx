import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { fetchPessoas } from '../CadastroDePessoa/ServicePF';
import { PessoaFisica } from '../../../types/types';
import {
  CloseButton,
  customModalStyles,
  FilterInput,
  FiltersContainer,
  ListContainer,
  ListItem,
  ModalContainer, 
  ModalTitle
} from '../../../components/StyleComponents/ModalUnidade.styles';

Modal.setAppElement('#root');

interface ModalPessoaFisicaProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSelecionarPessoaFisica: (pessoa: PessoaFisica) => void;
}

const ModalPessoaFisica: React.FC<ModalPessoaFisicaProps> = ({
  isOpen,
  onRequestClose,
  onSelecionarPessoaFisica,
}) => {
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCodigo, setFiltroCodigo] = useState('');
  const [pessoas, setPessoas] = useState<PessoaFisica[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setPessoas([]);
      setFiltroNome('');
      setFiltroCodigo('');
      setError(null);
      return;
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setLoading(true);
      setError(null);

      fetchPessoas({
        nome: filtroNome.trim() || undefined,
        codigo: filtroCodigo.trim() || undefined,
      })
        .then(setPessoas)
        .catch(err => setError(err.message || 'Erro ao carregar pessoas físicas'))
        .finally(() => setLoading(false));
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [filtroNome, filtroCodigo, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Selecionar Pessoa Física"
      style={customModalStyles}
    >
      <ModalContainer>
        <ModalTitle>Buscar Pessoa Física</ModalTitle>

        <FiltersContainer>
          <FilterInput
            value={filtroNome}
            onChange={e => setFiltroNome(e.target.value)}
            placeholder="Filtrar por nome"
          />
          <FilterInput
            value={filtroCodigo}
            onChange={e => setFiltroCodigo(e.target.value)}
            placeholder="Filtrar por código"
            width="150px"
          />
        </FiltersContainer>

        <ListContainer>
          {loading && <p style={{ textAlign: 'center', color: '#666' }}>Carregando...</p>}
          {error && <p style={{ textAlign: 'center', color: 'crimson' }}>{error}</p>}
          {!loading && !error && pessoas.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666' }}>Nenhum resultado</p>
          )}

          {pessoas.slice(0, 8).map(pessoa => (
            <ListItem
              key={pessoa.codigo}
              onClick={() => {
                onSelecionarPessoaFisica(pessoa);
                onRequestClose();
              }}
            >
              <strong>{pessoa.name}</strong>{' '}
              <small style={{ color: '#666' }}>(Código: {pessoa.codigo})</small>
            </ListItem>
          ))}
        </ListContainer>

        <CloseButton onClick={onRequestClose}>Fechar</CloseButton>
      </ModalContainer>
    </Modal>
  );
};

export default ModalPessoaFisica;
