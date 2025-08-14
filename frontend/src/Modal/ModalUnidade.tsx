import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { fetchUnidades } from '../pages/cadastro/CadastroUnidades/ServiceUnidade';
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
import { Unidade } from '../types/unidade';

Modal.setAppElement('#root');

interface ModalUnidadeProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSelecionarUnidade: (unidade: Unidade) => void;
}

const ModalUnidade: React.FC<ModalUnidadeProps> = ({
  isOpen,
  onRequestClose,
  onSelecionarUnidade,
}) => {
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCodigo, setFiltroCodigo] = useState('');
  const [filtroMunicipio, setFiltroMunicipio] = useState('');
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setUnidades([]);
      setFiltroNome('');
      setFiltroCodigo('');
      setFiltroMunicipio('');
      setError(null);
      return;
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setLoading(true);
      setError(null);

      fetchUnidades({
        nome: filtroNome.trim() !== '' ? filtroNome : undefined,
        codUnidade: filtroCodigo.trim() !== '' ? filtroCodigo : undefined,
        municipio: filtroMunicipio.trim() !== '' ? filtroMunicipio : undefined,
      })
        .then(setUnidades)
        .catch(err =>
          setError(err.message || 'Erro ao carregar unidades')
        )
        .finally(() => setLoading(false));
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [filtroNome, filtroCodigo, filtroMunicipio, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Selecionar Unidade"
      style={customModalStyles}
    >
      <ModalContainer>
        <ModalTitle>Buscar Unidade</ModalTitle>

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
            width="180px"
          />
        </FiltersContainer>

        <ListContainer>
          {loading && <p style={{ textAlign: 'center', color: '#666' }}>Carregando...</p>}
          {error && <p style={{ textAlign: 'center', color: 'crimson' }}>{error}</p>}
          {!loading && !error && unidades.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666' }}>Nenhum resultado</p>
          )}

          {unidades.slice(0, 8).map(unidade => (
            <ListItem
              key={unidade.codUnidade}
              onClick={() => {
                onSelecionarUnidade(unidade);
                onRequestClose();
              }}
            >
              <strong>{unidade.nome}</strong>{' '}
              <small style={{ color: '#666' }}>(Código: {unidade.codUnidade})</small>
            </ListItem>
          ))}
        </ListContainer>

        <CloseButton onClick={onRequestClose}>Fechar</CloseButton>
      </ModalContainer>
    </Modal>
  );
};

export default ModalUnidade;
