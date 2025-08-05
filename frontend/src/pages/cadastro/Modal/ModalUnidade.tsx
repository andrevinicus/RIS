import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { fetchUnidades } from '../CadastroUnidades/ServiceUnidade';
import { Unidade } from '../CadastroUnidades/HookTypes/types';

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
      style={{
        content: {
          maxWidth: 580,
          width: '100%',
          height: '90vh',
          margin: 'auto',
          padding: 0,
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        },
      }}
    >
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h2 style={{ marginBottom: 16, fontWeight: 600, color: '#333' }}>
          Buscar Unidade
        </h2>

        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <input
            type="text"
            value={filtroNome}
            onChange={e => setFiltroNome(e.target.value)}
            placeholder="Filtrar por nome"
            style={{
              flex: 1,
              minWidth: 200,
              padding: '10px 14px',
              borderRadius: 8,
              border: '1.5px solid #ccc',
              fontSize: 16,
            }}
          />
          <input
            type="text"
            value={filtroCodigo}
            onChange={e => setFiltroCodigo(e.target.value)}
            placeholder="Filtrar por código"
            style={{
              width: 180,
              padding: '10px 14px',
              borderRadius: 8,
              border: '1.5px solid #ccc',
              fontSize: 16,
            }}
          />
          <input
            type="text"
            value={filtroMunicipio}
            onChange={e => setFiltroMunicipio(e.target.value)}
            placeholder="Filtrar por município"
            style={{
              width: 180,
              padding: '10px 14px',
              borderRadius: 8,
              border: '1.5px solid #ccc',
              fontSize: 16,
            }}
          />
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {loading && <p style={{ textAlign: 'center', color: '#666' }}>Carregando...</p>}
          {error && <p style={{ textAlign: 'center', color: 'crimson' }}>{error}</p>}
          {!loading && !error && unidades.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666' }}>Nenhum resultado.</p>
          )}

          <ul
            style={{
              padding: 0,
              margin: 0,
              listStyle: 'none',
              borderTop: '1px solid #eee',
              borderBottom: '1px solid #eee',
            }}
          >
            {unidades.slice(0, 8).map(unidade => (
              <li key={unidade.codUnidade} style={{ marginBottom: 10 }}>
                <button
                  onClick={() => {
                    onSelecionarUnidade(unidade);
                    onRequestClose();
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    border: 'none',
                    borderRadius: 8,
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                    fontSize: 15,
                    color: '#333',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.backgroundColor = '#e6f0ff')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.backgroundColor = '#f9f9f9')
                  }
                  type="button"
                >
                  <strong>{unidade.nome}</strong>{' '}
                  <small style={{ color: '#666' }}>
                    (Código: {unidade.codUnidade})
                  </small>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onRequestClose}
          style={{
            marginTop: 24,
            width: '100%',
            padding: '12px 0',
            borderRadius: 10,
            border: 'none',
            backgroundColor: '#1976d2',
            color: '#fff',
            fontWeight: '600',
            fontSize: 16,
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#125ea9')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1976d2')}
          type="button"
        >
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default ModalUnidade;
