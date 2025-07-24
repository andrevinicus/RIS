// Sidebar.tsx
import React, { useState } from 'react';
import { IconType } from 'react-icons';
import {
  FaCalendarCheck,
  FaClinicMedical,
  FaSignOutAlt,
  FaUserPlus,
  FaSearch,
} from 'react-icons/fa';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface SidebarProps {
  menuOpen: string;
  setMenuOpen: (value: 'Cadastros' | 'listaConsultas' | 'perfilClinica') => void;
  onLogout: () => void;
  isMobile: boolean;
  closeSidebar: () => void;
  collapsed: boolean;
  onMenuHoverStart?: () => void;
  onMenuHoverEnd?: () => void;
}

interface MenuItem {
  key: 'Cadastros' | 'listaConsultas' | 'perfilClinica';
  label: string;
  Icon: IconType;
}

const Sidebar: React.FC<SidebarProps> = ({
  menuOpen,
  setMenuOpen,
  onLogout,
  isMobile,
  closeSidebar,
  collapsed,
  onMenuHoverStart,
  onMenuHoverEnd,
}) => {
  const [search, setSearch] = useState('');

  // Lista dos itens do menu principal
  const menuItems: MenuItem[] = [
    { key: 'Cadastros', label: 'Cadastros', Icon: FaUserPlus },
    { key: 'listaConsultas', label: 'Lista de Consultas', Icon: FaCalendarCheck },
    { key: 'perfilClinica', label: 'Perfil da Clínica', Icon: FaClinicMedical },
  ];

  // Filtragem dos itens com base na busca
  const filteredItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  // Clique em um item do menu
  const handleMenuClick = (menu: MenuItem['key']) => {
    setMenuOpen(menu);

    if (isMobile) closeSidebar();

    if (menu === 'Cadastros') {
      window.dispatchEvent(new CustomEvent('openSubCadastro'));
    } else {
      window.dispatchEvent(new CustomEvent('closeSubCadastro'));
    }
  };

  // Hover inicia o submenu para 'Cadastros'
  const handleMouseEnter = (key: string) => {
    if (!isMobile && key === 'Cadastros') {
      onMenuHoverStart?.();
      window.dispatchEvent(new CustomEvent('openSubCadastro'));
    }
  };

  // Sai do hover e agenda fechamento do submenu
  const handleMouseLeave = (key: string) => {
    if (!isMobile && key === 'Cadastros') {
      onMenuHoverEnd?.();
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('closeSubCadastro'));
      }, 300);
    }
  };

  return (
    <aside
      style={{
        width: collapsed ? 70 : 240,
        backgroundColor: '#1e3a8a',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 10px',
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 1000,
        transition: 'width 0.3s ease, padding 0.3s ease',
        overflow: 'hidden',
        boxShadow: '2px 0 8px rgba(0,0,0,0.25)',
      }}
    >
      {/* Logo da sidebar - muda tamanho conforme colapsado */}
      <div
        style={{
          marginBottom: 20,
          textAlign: 'center',
          transition: 'all 0.3s ease',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!collapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: '60px', height: 'auto', fill: 'white' }}>
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="5" fill="#1e3a8a" />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="30" fill="white" fontFamily="Arial">CL</text>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: '40px', height: 'auto', fill: 'white' }}>
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="5" fill="#1e3a8a" />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20" fill="white" fontFamily="Arial">CL</text>
          </svg>
        )}
      </div>

      {/* Campo de busca no menu */}
      <div style={{ marginBottom: 20, padding: '0 10px' }}>
        {collapsed ? (
          // Ícone de busca em sidebar colapsada
          <button
            onClick={() => {
              setSearch('');
              const event = new CustomEvent('expandSidebar');
              window.dispatchEvent(event);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '8px 0',
              cursor: 'pointer',
            }}
          >
            <FaSearch size={20} />
          </button>
        ) : (
          // Input de busca
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 8,
              padding: '8px 10px',
            }}
          >
            <FaSearch color="white" />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'white',
                marginLeft: 8,
                width: '100%',
              }}
            />
          </div>
        )}
      </div>

      {/* Itens do menu de navegação */}
      <nav style={{ flexGrow: 1 }}>
        {filteredItems.map(({ key, label, Icon }) => {
          const isActive = menuOpen === key;
          return (
            <TooltipPrimitive.Provider key={key}>
              <TooltipPrimitive.Root delayDuration={300}>
                <TooltipPrimitive.Trigger asChild>
                  <button
                    onClick={() => handleMenuClick(key)}
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={() => handleMouseLeave(key)}
                    style={{
                      width: '100%',
                      padding: collapsed ? '15px 0' : '12px 0',
                      borderRadius: 2,
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                      color: 'white',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      cursor: 'pointer',
                      marginBottom: 14,
                      fontSize: 16,
                      fontWeight: isActive ? 700 : 500,
                      opacity: isActive ? 1 : 0.75,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: collapsed ? 0 : 20,
                        display: 'flex',
                        alignItems: 'center',
                        gap: collapsed ? 0 : 16,
                        color: 'white',
                        // IMPORTANTE: só setar width quando NÃO estiver colapsado
                        width: collapsed ? 'auto' : '100%',
                        justifyContent: collapsed ? 'center' : 'flex-start',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {React.createElement(Icon, { size: 20 })}
                      </span>
                      {!collapsed && label}
                    </div>
                  </button>
                </TooltipPrimitive.Trigger>
              </TooltipPrimitive.Root>
            </TooltipPrimitive.Provider>
          );
        })}
      </nav>

      {/* Botão de logout */}
      <button
        onClick={onLogout}
        style={{
          width: '100%',
          padding: collapsed ? '12px 0' : '12px 20px',
          borderRadius: 10,
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          cursor: 'pointer',
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        <span
          style={{
            marginRight: collapsed ? 0 : 16,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FaSignOutAlt size={20} />
        </span>
        {!collapsed && 'Logout'}
      </button>
    </aside>
  );
};

export default Sidebar;
