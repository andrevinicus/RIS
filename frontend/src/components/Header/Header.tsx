import React from 'react';
import { User } from 'lucide-react'; 
// ou qualquer outro pacote de ícones que esteja usando

interface HeaderProps {
  userInfo: {
    realname?: string;
  } | null;
  isMobile: boolean;
  toggleSidebar: () => void;
  collapsed: boolean;
  toggleCollapse: () => void;
  style?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({
  userInfo,
  isMobile,
  toggleSidebar,
  collapsed,
  toggleCollapse,
  style
}) => (
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
    {/* ☰ botão para expandir/retrair no desktop ou abrir no mobile */}
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

    {/* Ícone + Nome da Pessoa */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <User size={20} color="#6b7280" /> {/* Ícone de perfil */}
      <span style={{ fontSize: 14, color: '#6b7280' }}>
        {userInfo?.realname || 'Usuário'}
      </span>
    </div>
  </header>
);

export default Header;
