import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';


import {
  CloseButton,
  customModalStyles,
  FilterInput,
  FiltersContainer,
  ListContainer,
  ListItem,
  ModalContainer, 
  ModalTitle
} from '../components/StyleComponents/ModalUnidade.styles';

import { fetchPessoasJuridicas } from '../pages/cadastro/CadastroDePessoaJuridica/ServicePJ';
import { PessoaJuridica } from '../types/pessoaJuridica';


Modal.setAppElement('#root');

interface ModalPessoaJuridicaProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSelecionarPessoaJuridica: (pessoa: PessoaJuridica) => void;
}

const ModalPessoaJuridica: React.FC<ModalPessoaJuridicaProps> = ({
  isOpen,
  onRequestClose,
  onSelecionarPessoaJuridica,
}) => {
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCodigo, setFiltroCodigo] = useState('');
  const [pessoas, setPessoas] = useState<PessoaJuridica[]>([]);
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

      fetchPessoasJuridicas({
        nome_fantasia: filtroNome.trim() || undefined,
        codigo: filtroCodigo.trim() || undefined,
      })
        .then(setPessoas)
        .catch(err => setError(err.message || 'Erro ao carregar pessoas jurídicas'))
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
      contentLabel="Selecionar Pessoa Jurídica"
      style={customModalStyles}
    >
      <ModalContainer>
        <ModalTitle>Buscar Pessoa Jurídica</ModalTitle>

        <FiltersContainer>
          <FilterInput
            value={filtroNome}
            onChange={e => setFiltroNome(e.target.value)}
            placeholder="Filtrar por nome fantasia"
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
                onSelecionarPessoaJuridica(pessoa);
                onRequestClose();
              }}
            >
              <strong>{pessoa.nome_fantasia}</strong>{' '}
              <small style={{ color: '#666' }}>
                (CNPJ: {pessoa.cnpj}) — Código: {pessoa.codigo}
              </small>
            </ListItem>
          ))}
        </ListContainer>

        <CloseButton onClick={onRequestClose}>Fechar</CloseButton>
      </ModalContainer>
    </Modal>
  );
};

export default ModalPessoaJuridica;
