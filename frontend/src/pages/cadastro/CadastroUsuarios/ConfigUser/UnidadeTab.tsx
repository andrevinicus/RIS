import React, { useState, useEffect } from 'react';
import { fetchUnidadesVinculadas, salvarUnidadesVinculadas } from '../ServiceUsuario';
import { fetchUnidades } from '../../CadastroUnidades/ServiceUnidade';
import { Unidade } from '../../../../types/unidade';

interface UnidadeTabProps {
  usuarioCodigo: string;
}

export default function UnidadeTab({ usuarioCodigo }: UnidadeTabProps) {
  const [unidadesCarregadas, setUnidadesCarregadas] = useState<Unidade[]>([]);
  const [unidadesSelecionadas, setUnidadesSelecionadas] = useState<string[]>([]);
  const [loadingSalvarUnidades, setLoadingSalvarUnidades] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [todasUnidades, vinculadas] = await Promise.all([
          fetchUnidades(),
          fetchUnidadesVinculadas(usuarioCodigo),
        ]);
        setUnidadesCarregadas(todasUnidades);
        setUnidadesSelecionadas(vinculadas.map(u => u.codUnidade));
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      }
    }

    if (usuarioCodigo) carregarDados();
  }, [usuarioCodigo]);

  const toggleSelecao = (id: string) => {
    setUnidadesSelecionadas(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const handleSalvarUnidades = async () => {
    setLoadingSalvarUnidades(true);
    try {
      const unidadesParaSalvar = unidadesSelecionadas
        .map(id => {
          const unidade = unidadesCarregadas.find(u => u.codUnidade === id);
          return unidade ? { id: unidade.codUnidade, nome: unidade.nome } : null;
        })
        .filter((u): u is { id: string; nome: string } => u !== null);

      await salvarUnidadesVinculadas(usuarioCodigo, unidadesParaSalvar);
      alert('Unidades vinculadas salvas com sucesso!');
    } catch (error) {
      alert('Erro ao salvar unidades vinculadas.');
      console.error(error);
    } finally {
      setLoadingSalvarUnidades(false);
    }
  };

  const selecionarTodas = () => {
    setUnidadesSelecionadas(
      unidadesSelecionadas.length === unidadesCarregadas.length
        ? []
        : unidadesCarregadas.map(u => u.codUnidade)
    );
  };

  return (
    <section style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', gap: 24 }}>
        {/* Lista de Unidades */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#fefefe',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            padding: 16,
            maxHeight: 480,
            overflowY: 'auto',
          }}
        >
          <h3 style={{ marginBottom: 16, color: '#333' }}>Lista de Unidades</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f4f8' }}>
                <th style={{ padding: 10 }}>
                  <input
                    type="checkbox"
                    onChange={selecionarTodas}
                    checked={
                      unidadesSelecionadas.length > 0 &&
                      unidadesSelecionadas.length === unidadesCarregadas.length
                    }
                  />
                </th>
                <th style={{ textAlign: 'left', padding: 10 }}>Código</th>
                <th style={{ textAlign: 'left', padding: 10 }}>Nome</th>
              </tr>
            </thead>
            <tbody>
              {unidadesCarregadas
                .filter(u => !unidadesSelecionadas.includes(u.codUnidade))
                .map(u => (
                  <tr key={u.codUnidade} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 10 }}>
                      <input
                        type="checkbox"
                        checked={unidadesSelecionadas.includes(u.codUnidade)}
                        onChange={() => toggleSelecao(u.codUnidade)}
                      />
                    </td>
                    <td style={{ padding: 10 }}>{u.codUnidade}</td>
                    <td style={{ padding: 10 }}>{u.nome}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Unidades Vinculadas */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#fefefe',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            padding: 16,
            maxHeight: 480,
            overflowY: 'auto',
          }}
        >
          <h3 style={{ marginBottom: 16, color: '#333' }}>Unidades Vinculadas</h3>
          {unidadesSelecionadas.length === 0 ? (
            <p style={{ color: '#777' }}>Nenhuma unidade vinculada.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f4f8' }}>
                  <th style={{ textAlign: 'left', padding: 10 }}>Código</th>
                  <th style={{ textAlign: 'left', padding: 10 }}>Nome</th>
                </tr>
              </thead>
              <tbody>
                {unidadesCarregadas
                  .filter(u => unidadesSelecionadas.includes(u.codUnidade))
                  .map(u => (
                    <tr key={u.codUnidade} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: 10 }}>{u.codUnidade}</td>
                      <td style={{ padding: 10 }}>{u.nome}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div style={{ textAlign: 'right', marginTop: 24 }}>
        <button
          onClick={handleSalvarUnidades}
          disabled={loadingSalvarUnidades}
          style={{
            backgroundColor: loadingSalvarUnidades ? '#a0aec0' : '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: 8,
            cursor: loadingSalvarUnidades ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: 15,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'background 0.3s',
          }}
        >
          {loadingSalvarUnidades ? 'Salvando...' : 'Salvar Unidades'}
        </button>
      </div>
    </section>
  );
}
