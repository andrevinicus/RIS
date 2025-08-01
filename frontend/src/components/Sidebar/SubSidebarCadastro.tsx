import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastroSubItems } from './cadastroSubItems';

interface SubSidebarCadastroProps {
  collapsed: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}


const SubSidebarCadastro: React.FC<SubSidebarCadastroProps> = ({
  collapsed,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: 50,
        left: collapsed ? 61 : 232,
        width: 250,
        backgroundColor: '#334e8c',
        color: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        borderRadius: 6,
        padding: '12px 16px',
        zIndex: 1200,
        transition: 'left 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <button
        onClick={onClose}
        style={{
          alignSelf: 'flex-end',
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 1,
          cursor: 'pointer',
          padding: 0,
          userSelect: 'none',
          marginBottom: 12,
        }}
        aria-label="Fechar submenu Cadastros"
      >
        &times;
      </button>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {cadastroSubItems.map(({ key, label, path }) => (
          <button
            key={key}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 6,
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
              textAlign: 'left',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onClick={() => handleClick(path)}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SubSidebarCadastro;
