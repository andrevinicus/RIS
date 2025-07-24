import React from 'react';

interface HeaderProps {
  userInfo: {
    realname?: string;
  } | null;
  isMobile: boolean;
  toggleSidebar: () => void;
  collapsed: boolean;
  toggleCollapse: () => void;
  style?: React.CSSProperties;  // ADICIONE ESSA LINHA
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
      ...style, // aplica estilo fixo com position/left
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

    <span>Olá, {userInfo?.realname || 'Usuário'} 👋</span>
    <span style={{ fontSize: 14, color: '#6b7280' }}>Sistema da Clínica</span>
  </header>
);


export default Header;

