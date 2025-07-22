import React from 'react';

interface SidebarProps {
  userInfo: {
    realname?: string;
    picture?: string;
  } | null;
  menuOpen: string;
  setMenuOpen: (value: 'cadastroPaciente' | 'listaConsultas' | 'perfilClinica') => void;
  onLogout: () => void;
  isMobile: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  userInfo,
  menuOpen,
  setMenuOpen,
  onLogout,
  isMobile,
  closeSidebar,
}) => {
  const handleMenuClick = (menu: 'cadastroPaciente' | 'listaConsultas' | 'perfilClinica') => {
    setMenuOpen(menu);
    if (isMobile) closeSidebar();
  };

  return (
    <aside
      style={{
        width: 260,
        backgroundColor: '#1e40af',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        boxSizing: 'border-box',
        position: isMobile ? 'fixed' : 'relative',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: isMobile ? '2px 0 12px rgba(0,0,0,0.3)' : undefined,
      }}
    >
      {/* Usuário */}
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        {userInfo?.picture ? (
          <img
            src={userInfo.picture}
            alt="Avatar"
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              marginBottom: 12,
              objectFit: 'cover',
              border: '2px solid white',
            }}
          />
        ) : (
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              backgroundColor: '#2563eb',
              margin: '0 auto 12px',
            }}
          />
        )}
        <div style={{ fontWeight: '700', fontSize: 20 }}>
          {userInfo?.realname || 'Usuário'}
        </div>
      </div>

      {/* Navegação */}
      <nav style={{ flexGrow: 1 }}>
        {[
          { key: 'cadastroPaciente', label: 'Cadastro de Paciente' },
          { key: 'listaConsultas', label: 'Lista de Consultas' },
          { key: 'perfilClinica', label: 'Perfil da Clínica' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => handleMenuClick(item.key as any)}
            style={{
              width: '100%',
              padding: '14px 24px',
              borderRadius: 8,
              backgroundColor: menuOpen === item.key ? 'rgba(255,255,255,0.25)' : 'transparent',
              color: 'white',
              fontWeight: menuOpen === item.key ? '700' : '500',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              marginBottom: 12,
              fontSize: 16,
              transition: 'background-color 0.3s ease',
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        style={{
          marginTop: 'auto',
          padding: '14px 24px',
          borderRadius: 8,
          backgroundColor: '#dc2626',
          color: 'white',
          fontWeight: '700',
          border: 'none',
          cursor: 'pointer',
          fontSize: 16,
        }}
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
