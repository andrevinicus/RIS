import React, { useState } from 'react';
import { User } from 'lucide-react';
import UserModal from './UserModal'; // ajuste o caminho conforme seu projeto

interface Unidade {
  codUnidade: string;
  nome: string;
}

interface Perfil {
  nome: string;
}

interface Setor {
  nome: string;
}

interface HeaderProps {
  userInfo: {
    username?: string;
    fullname?: string;
    realname?: string;
  } | null;
  isMobile: boolean;
  toggleSidebar: () => void;
  collapsed: boolean;
  toggleCollapse: () => void;
  style?: React.CSSProperties;
  unidadeAtiva: Unidade;
  perfil: Perfil;
  setor: Setor;
  unidadesDisponiveis: Unidade[];
  onSelectUnidade: (unidade: Unidade) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userInfo,
  isMobile,
  toggleSidebar,
  collapsed,
  toggleCollapse,
  style,
  unidadeAtiva,
  perfil,
  setor,
  unidadesDisponiveis,
  onSelectUnidade,
  onLogout,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header
        style={{
          height: 60,
          backgroundColor: 'white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          fontWeight: '600',
          fontSize: 18,
          color: '#374151',
          ...style,
        }}
      >
        <button
          onClick={isMobile ? toggleSidebar : toggleCollapse}
          aria-label="Menu"
          style={{
            background: 'none',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            color: '#1e40af',
          }}
        >
          ☰
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
          <button
            type="button"
            onClick={() => setIsModalOpen((open) => !open)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              borderRadius: 6,
              border: 'none',
              background: 'transparent',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <User size={20} color="#6b7280" />
            <span style={{ fontSize: 14, color: '#374151' }}>
              {userInfo ? userInfo.realname || 'Usuário' : '...'}
            </span>
          </button>

          {isModalOpen && userInfo && (
            <UserModal
              userInfo={{ realname: userInfo.realname || 'Usuário' }}
              unidadeAtiva={unidadeAtiva}
              perfil={perfil}
              setor={setor}
              unidadesDisponiveis={unidadesDisponiveis}
              onSelectUnidade={onSelectUnidade}
              onLogout={onLogout}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
