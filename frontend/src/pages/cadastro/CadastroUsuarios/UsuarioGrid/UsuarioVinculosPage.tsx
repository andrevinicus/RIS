import React, { useState, useEffect } from 'react';
import { Usuario } from '../types';
import { Unidade } from '../../CadastroUnidades/HookTypes/types';
import { fetchUnidades } from '../../CadastroUnidades/ServiceUnidade';
import { fetchUnidadesVinculadas, salvarUnidadesVinculadas } from '../ServiceUsuario';
// Ajuste o caminho correto

interface UsuarioVinculosPageProps {
  usuario: Usuario;
  onVoltar: () => void;
}

const perfisExemplo = ['Admin', 'Editor', 'Visualizador'];
const setoresExemplo = ['Financeiro', 'RH', 'TI', 'Comercial'];

const abas = ['Perfil', 'Unidade', 'Setor'] as const;
type Aba = typeof abas[number];

const UsuarioVinculosPage: React.FC<UsuarioVinculosPageProps> = ({ usuario, onVoltar }) => {
  const [abaAtual, setAbaAtual] = useState<Aba>('Perfil');
  const [perfisSelecionados, setPerfisSelecionados] = useState<string[]>([]);
  const [setoresSelecionados, setSetoresSelecionados] = useState<string[]>([]);
  const [unidadesSelecionadas, setUnidadesSelecionadas] = useState<string[]>([]);
  const [unidadesCarregadas, setUnidadesExemplo] = useState<Unidade[]>([]);
  const [loadingSalvarUnidades, setLoadingSalvarUnidades] = useState(false);
useEffect(() => {
  // Carrega todas as unidades
  fetchUnidades()
    .then(data => setUnidadesExemplo(data))
    .catch(err => console.error('Erro ao buscar unidades:', err));

  // Carrega unidades vinculadas ao usuário
  if (usuario?.codigo) {
    fetchUnidadesVinculadas(usuario.codigo)
      .then(vinculadas => {
        // Pegando os IDs das unidades vinculadas
        const idsVinculados = vinculadas.map(u => u.codUnidade ?? u.codUnidade ?? '');
        setUnidadesSelecionadas(idsVinculados);
      })
      .catch(err => console.error('Erro ao buscar unidades vinculadas:', err));
  }
}, [usuario.codigo]);


  const toggleSelecao = (
    item: string,
    selecionados: string[],
    setSelecionados: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selecionados.includes(item)) {
      setSelecionados(selecionados.filter(i => i !== item));
    } else {
      setSelecionados([...selecionados, item]);
    }
  };

    // Handler para salvar unidades vinculadas
  const handleSalvarUnidades = async () => {
    setLoadingSalvarUnidades(true);
    try {
      await salvarUnidadesVinculadas(usuario.codigo, unidadesSelecionadas);
      alert('Unidades vinculadas salvas com sucesso!');
    } catch (error) {
      alert('Erro ao salvar unidades vinculadas.');
      console.error(error);
    } finally {
      setLoadingSalvarUnidades(false);
    }
  };


  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Barra superior */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#e9e9e9ff',
          padding: '12px 24px',
          borderBottom: '1px solid #ccc',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {abas.map(aba => (
            <div
              key={aba}
              onClick={() => setAbaAtual(aba)}
              style={{
                cursor: 'pointer',
                paddingBottom: 6,
                fontWeight: abaAtual === aba ? 'bold' : 'normal',
                color: abaAtual === aba ? '#000' : '#333',
                borderRadius: 4,
                fontSize: abaAtual === aba ? '18px' : '17px',
                transition: 'background-color 0.2s ease-in-out',
              }}
              onMouseEnter={e => {
                if (abaAtual !== aba) (e.currentTarget as HTMLDivElement).style.backgroundColor = '#e0e0e0';
              }}
              onMouseLeave={e => {
                if (abaAtual !== aba) (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
              }}
            >
              {aba}
            </div>
          ))}
        </div>
        <div
          onClick={onVoltar}
          title="Voltar"
          aria-label="Voltar"
          style={{
            cursor: 'pointer',
            fontSize: 20,
            fontWeight: 'bold',
            color: 'rgba(0, 0, 0, 0.5)',
            padding: '0 8px',
            userSelect: 'none',
          }}
        >
          🡠
        </div>
      </div>

      <div style={{ padding: '1px 10px', flex: 1, overflowY: 'auto', backgroundColor: '#fff' }}>
        <h2 style={{ marginBottom: 15 }}>
          {usuario.usuario}
        </h2>

        {abaAtual === 'Perfil' && (
          <section style={{ marginBottom: 24 }}>
            <h3>Perfis</h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {perfisExemplo.map(perfil => (
                <label key={perfil} style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={perfisSelecionados.includes(perfil)}
                    onChange={() => toggleSelecao(perfil, perfisSelecionados, setPerfisSelecionados)}
                  />{' '}
                  {perfil}
                </label>
              ))}
            </div>
          </section>
        )}

        {abaAtual === 'Setor' && (
          <section style={{ marginBottom: 24 }}>
            <h3>Setores</h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {setoresExemplo.map(setor => (
                <label key={setor} style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={setoresSelecionados.includes(setor)}
                    onChange={() => toggleSelecao(setor, setoresSelecionados, setSetoresSelecionados)}
                  />{' '}
                  {setor}
                </label>
              ))}
            </div>
          </section>
        )}

        {abaAtual === 'Unidade' && (
          <section style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex' }}>
              {/* Grid de todas unidades (com scroll interno) */}
              <div
                style={{
                  flex: 1,
                  maxWidth: '46%',
                  maxHeight: '450px',
                  overflowY: 'auto',
                  padding: '8px 16px 16px 16px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <h4 style={{ marginBottom: 12, marginTop: 0 }}>Lista de Unidades</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr
                      style={{
                        backgroundColor: '#dde6f0',
                        boxShadow: 'inset 0 -1px 0 #a3b1c6',
                      }}
                    >
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '10px 8px',
                          borderBottom: '2px solid #a3b1c6',
                          fontWeight: '700',
                          color: '#334e7a',
                          width: 40,
                        }}
                      >
                        <input
                          type="checkbox"
                          aria-label="Selecionar todas as unidades"
                        />
                      </th>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '5px 8px',
                          borderBottom: '2px solid #a3b1c6',
                          fontWeight: '700',
                          color: '#334e7a',
                          width: 80,
                        }}
                      >
                        Código
                      </th>
                      <th
                        style={{
                          textAlign: 'left',
                          padding: '10px 8px',
                          borderBottom: '2px solid #a3b1c6',
                          fontWeight: '700',
                          color: '#334e7a',
                        }}
                      >
                        Nome
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                   {unidadesCarregadas
                    .filter(unidade => !unidadesSelecionadas.includes(unidade.codUnidade))
                    .map(unidade => (
                      <tr key={unidade.codUnidade} style={{ borderBottom: '1px solid #e1e8f0' }}>
                        <td style={{ padding: '8px' }}>
                          <input
                            type="checkbox"
                            checked={unidadesSelecionadas.includes(unidade.codUnidade)}
                            onChange={() =>
                              toggleSelecao(unidade.codUnidade, unidadesSelecionadas, setUnidadesSelecionadas)
                            }
                            aria-label={`Selecionar unidade ${unidade.nome}`}
                          />
                        </td>
                        <td style={{ padding: '8px' }}>{unidade.codUnidade}</td>
                        <td style={{ padding: '8px' }}>{unidade.nome}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Unidades já vinculadas (com mais espaço) */}
              <div
                style={{
                  flex: 2,
                  padding: '16px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f1f1f1',
                }}
              >
                <h4 style={{ marginBottom: 12, marginTop: 0 }}>Unidades Vinculadas</h4>
                {unidadesSelecionadas.length === 0 ? (
                  <p>Nenhuma unidade vinculada.</p>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr
                        style={{
                          backgroundColor: '#dde6f0',
                          boxShadow: 'inset 0 -1px 0 #a3b1c6',
                        }}
                      >
                        <th
                          style={{
                            textAlign: 'left',
                            padding: '10px 8px',
                            borderBottom: '2px solid #a3b1c6',
                            fontWeight: '700',
                            color: '#334e7a',
                            width: 80,
                          }}
                        >
                          Código
                        </th>
                        <th
                          style={{
                            textAlign: 'left',
                            padding: '10px 8px',
                            borderBottom: '2px solid #a3b1c6',
                            fontWeight: '700',
                            color: '#334e7a',
                          }}
                        >
                          Nome
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {unidadesCarregadas
                        .filter(u => unidadesSelecionadas.includes(u.codUnidade))
                        .map(u => (
                          <tr key={u.codUnidade} style={{ borderBottom: '1px solid #e1e8f0' }}>
                            <td style={{ padding: '8px' }}>{u.codUnidade}</td>
                            <td style={{ padding: '8px' }}>{u.nome}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <button
              onClick={handleSalvarUnidades}
              disabled={loadingSalvarUnidades}
              style={{
                marginTop: 24,
                padding: '10px 20px',
                backgroundColor: loadingSalvarUnidades ? '#6c757d' : '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: loadingSalvarUnidades ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              {loadingSalvarUnidades ? 'Salvando...' : 'Salvar Unidades'}
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default UsuarioVinculosPage;
