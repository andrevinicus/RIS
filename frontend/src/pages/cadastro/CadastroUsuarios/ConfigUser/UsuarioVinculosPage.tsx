import React, { useState } from 'react';

import SetorTab from './SetorTab';
import PerfilTab from './PerfilTab';
import UnidadeTab from './UnidadeTab';
import { Usuario } from '../../../../types/types';


const abas = ['Perfil', 'Unidade', 'Setor'] as const;
type Aba = typeof abas[number];

interface UsuarioVinculosPageProps {
  usuario: Usuario;
  onVoltar: () => void;
}

const UsuarioVinculosPage: React.FC<UsuarioVinculosPageProps> = ({ usuario, onVoltar }) => {
  const [abaAtual, setAbaAtual] = useState<Aba>('Perfil');
  const [perfisSelecionados, setPerfisSelecionados] = useState<string[]>([]);
  const [setoresSelecionados, setSetoresSelecionados] = useState<string[]>([]);

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
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
        <h2 style={{ marginBottom: 15 }}>{usuario.usuario}</h2>

        {abaAtual === 'Perfil' && (
          <PerfilTab perfisSelecionados={perfisSelecionados} setPerfisSelecionados={setPerfisSelecionados} />
        )}

        {abaAtual === 'Setor' && (
          <SetorTab setoresSelecionados={setoresSelecionados} setSetoresSelecionados={setSetoresSelecionados} />
        )}

        {abaAtual === 'Unidade' && <UnidadeTab usuarioCodigo={usuario.codigo} />}
      </div>
    </div>
  );
};

export default UsuarioVinculosPage;
