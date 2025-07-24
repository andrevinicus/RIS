import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import SubSidebarCadastro from '../../components/Sidebar/SubSidebarCadastro';
// ajuste o caminho se necessário

interface UserInfo {
  realname?: string;
  picture?: string;
  email?: string;
}

interface HomeScreenProps {
  userInfo: UserInfo | null;
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userInfo, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState<'Cadastros' | 'listaConsultas' | 'perfilClinica'>('Cadastros');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  // Estado para controlar hover do menu e submenu
  const [menuHover, setMenuHover] = useState(false);
  const [submenuHover, setSubmenuHover] = useState(false);

  // Mostrar submenu se hover em menu ou submenu
  const showSubCadastro = menuHover || submenuHover;

  const sidebarWidth = collapsed ? 70 : 230;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarVisible(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6' }}>
      {sidebarVisible && (
        <Sidebar
          menuOpen={menuOpen}
          setMenuOpen={(menu) => {
            setMenuOpen(menu);
            // Dispatch eventos para abrir/fechar submenu também
            if (menu === 'Cadastros') {
              setMenuHover(true); // força abrir submenu no clique também
            } else {
              setMenuHover(false);
              setSubmenuHover(false);
            }
          }}
          onLogout={onLogout}
          isMobile={isMobile}
          closeSidebar={() => setSidebarVisible(false)}
          collapsed={collapsed}
          onMenuHoverStart={() => setMenuHover(true)}
          onMenuHoverEnd={() => setMenuHover(false)}
        />
      )}

      {/* SubSidebarCadastro */}
{showSubCadastro && (
  <SubSidebarCadastro
    collapsed={collapsed}
    onClose={() => {
      setMenuHover(false);
      setSubmenuHover(false);
    }}
    onMouseEnter={() => setSubmenuHover(true)}
    onMouseLeave={() => setSubmenuHover(false)}
  />
)}

      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f3f4f6',
          marginLeft: sidebarWidth,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Header
          userInfo={userInfo}
          isMobile={isMobile}
          toggleSidebar={() => setSidebarVisible(!sidebarVisible)}
          collapsed={collapsed}
          toggleCollapse={() => setCollapsed(!collapsed)}
          style={{
            position: 'fixed',
            top: 0,
            left: !isMobile ? (collapsed ? 70 : 240) : 0,
            right: 0,
            height: 45,
            zIndex: 1100,
            transition: 'left 0.3s ease',
          }}
        />

        <main
          style={{
            flexGrow: 1,
            padding: 10,
            overflowY: 'auto',
            marginTop: 40,
            height: 'calc(100vh - 60px)',
          }}
        >

        </main>
      </div>
    </div>
  );
};

export default HomeScreen;
