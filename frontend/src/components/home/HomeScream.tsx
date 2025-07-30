import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import SubSidebarCadastro from '../Sidebar/SubSidebarCadastro';

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

  const [menuHover, setMenuHover] = useState(false);
  const [submenuHover, setSubmenuHover] = useState(false);

  const showSubCadastro = menuHover || submenuHover;

  // Calculando a largura da sidebar e a margem do conteúdo principal
  // Se a sidebar não estiver visível, a largura será 0
  const currentSidebarWidth = sidebarVisible ? (collapsed ? 70 : 230) : 0;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Ao redimensionar para mobile, a sidebar deve ser escondida.
      // Ao redimensionar de mobile para desktop, a sidebar deve ser visível.
      setSidebarVisible(!mobile);
      // Em mobile, a sidebar também deve ser colapsada para economizar espaço
      if (mobile) {
        setCollapsed(true);
      }
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
            if (menu === 'Cadastros') {
              setMenuHover(true);
            } else {
              setMenuHover(false);
              setSubmenuHover(false);
            }
          }}
          onLogout={onLogout}
          isMobile={isMobile}
          closeSidebar={() => setSidebarVisible(false)} // Função para fechar completamente
          collapsed={collapsed}
          onMenuHoverStart={() => setMenuHover(true)}
          onMenuHoverEnd={() => setMenuHover(false)}
        />
      )}

      {/* Condição para SubSidebarCadastro: só mostra se sidebarVisible E showSubCadastro */}
      {sidebarVisible && showSubCadastro && (
        <SubSidebarCadastro
          // A SubSidebarCadastro também precisa saber a largura da sidebar principal para seu posicionamento
          // Ou você pode ajustar seu posicionamento com base na `currentSidebarWidth` também.
          // Por enquanto, ela mantém o `collapsed` da principal.
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
          // A margem esquerda agora é 0 se a sidebar não estiver visível
          marginLeft: currentSidebarWidth,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Header
          userInfo={userInfo}
          isMobile={isMobile}
          // Quando o botão no Header é clicado para fechar/abrir a sidebar
          // Ele alternará a visibilidade e o colapso
          toggleSidebar={() => {
            if (isMobile) {
              setSidebarVisible(!sidebarVisible);
            } else {
              // Em desktop, alternar o colapso da sidebar
              setCollapsed(!collapsed);
            }
          }}
          collapsed={collapsed} // Passa o estado de colapso para o Header
          toggleCollapse={() => setCollapsed(!collapsed)} // Permite que o Header controle o colapso
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: 45,
            zIndex: 1100,
             // Ajusta a posição com base na visibilidade da sidebar
            // O `left` do Header também deve se ajustar dinamicamente
            left: sidebarVisible ? (collapsed ? 70 : 240) : 0,
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
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;