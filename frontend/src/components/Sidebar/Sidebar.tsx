import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FaCalendarCheck, FaClinicMedical, FaSignOutAlt, FaUserPlus, FaSearch } from 'react-icons/fa';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { LogoutButton, MenuButton, SidebarContainer } from '../StyleComponents/StyleComponents';
 // seu arquivo de styled-components

interface SidebarProps {
  menuOpen: 'Cadastros' | 'listaConsultas' | 'perfilClinica' | null;
  setMenuOpen: (value: 'Cadastros' | 'listaConsultas' | 'perfilClinica' | null) => void;
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
  const [hoverKey, setHoverKey] = useState<MenuItem['key'] | null>(null);

  const menuItems: MenuItem[] = [
    { key: 'Cadastros', label: 'Cadastros', Icon: FaUserPlus },
    { key: 'listaConsultas', label: 'Lista de Consultas', Icon: FaCalendarCheck },
    { key: 'perfilClinica', label: 'Perfil da Clínica', Icon: FaClinicMedical },
  ];

  const filteredItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleMenuClick = (menu: MenuItem['key']) => {
    if (menu === 'Cadastros') {
      window.dispatchEvent(new CustomEvent('openSubCadastro'));
    } else {
      window.dispatchEvent(new CustomEvent('closeSubCadastro'));
    }
    setMenuOpen(menu);
    if (isMobile) closeSidebar();
  };

  return (
    <SidebarContainer $collapsed={collapsed}>
      {/* Logo */}
      <div style={{ marginBottom: 20, textAlign: 'center', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

      {/* Busca */}
      <div style={{ marginBottom: 20, padding: '0 10px' }}>
        {collapsed ? (
          <button
            onClick={() => {
              setSearch('');
              window.dispatchEvent(new CustomEvent('expandSidebar'));
            }}
            style={{ background: 'transparent', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '8px 0', cursor: 'pointer' }}
          >
            <FaSearch size={20} />
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 8, padding: '8px 10px' }}>
            <FaSearch color="white" />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', marginLeft: 8, width: '100%' }}
            />
          </div>
        )}
      </div>

      {/* Menu */}
      <nav style={{ flexGrow: 1 }}>
        {filteredItems.map(({ key, label, Icon }) => (
          <TooltipPrimitive.Provider key={key}>
            <TooltipPrimitive.Root delayDuration={300}>
              <TooltipPrimitive.Trigger asChild>
                <MenuButton
                  $collapsed={collapsed}
                  $active={menuOpen === key}
                  $hover={hoverKey === key}
                  onMouseEnter={() => {
                    setHoverKey(key);
                    onMenuHoverStart?.();
                  }}
                  onMouseLeave={() => {
                    setHoverKey(null);
                    onMenuHoverEnd?.();
                  }}
                  onClick={() => handleMenuClick(key)}
                >
                  <div>
                    <Icon size={20} />
                    {!collapsed && label}
                  </div>
                </MenuButton>
              </TooltipPrimitive.Trigger>
            </TooltipPrimitive.Root>
          </TooltipPrimitive.Provider>
        ))}
      </nav>

      {/* Logout */}
      <LogoutButton $collapsed={collapsed} onClick={onLogout}>
        <span><FaSignOutAlt size={20} /></span>
        {!collapsed && 'Logout'}
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
