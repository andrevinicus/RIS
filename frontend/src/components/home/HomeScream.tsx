import React, { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import SubSidebarCadastro from '../Sidebar/SubSidebarCadastro';
import { AuthContext } from '../../context/AuthContext'; // ajuste o caminho conforme necessário

interface Unidade {
  codUnidade: string;
  nome: string;
}

interface UnidadeAtiva {
  unidadePadraoID: string;
  unidadePadraoNome: string;
  unidadesDisponiveis: Unidade[];
}
interface Perfil {
  nome: string;
}

interface Setor {
  nome: string;
}

interface HomeScreenProps {
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onLogout }) => {
  const { userInfo, setUnidadeAtiva } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState<'Cadastros' | 'listaConsultas' | 'perfilClinica'>('Cadastros');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const [menuHover, setMenuHover] = useState(false);
  const [submenuHover, setSubmenuHover] = useState(false);

  const showSubCadastro = menuHover || submenuHover;

  // Pegando dados direto do contexto (userInfo)
  const unidadeAtiva: Unidade = {
  codUnidade: userInfo?.unidadeAtiva?.unidadePadraoID || '',
  nome: userInfo?.unidadeAtiva?.unidadePadraoNome || '',
};
  const perfil: Perfil = userInfo?.perfil ?? { nome: '' };
  const setor: Setor = userInfo?.setor ?? { nome: '' };
  const unidadesDisponiveis: Unidade[] = userInfo?.unidadeAtiva?.unidadesDisponiveis ?? [];

  // Função para seleção de unidade no modal do Header
  const onSelectUnidade = (unidade: Unidade) => {
    setUnidadeAtiva(unidade);
    // Aqui pode chamar backend para salvar unidade ativa, se desejar
  };

  // Função de logout
  const handleLogout = () => {
    onLogout();
  };

  const currentSidebarWidth = sidebarVisible ? (collapsed ? 70 : 230) : 0;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarVisible(!mobile);
      if (mobile) setCollapsed(true);
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
          closeSidebar={() => setSidebarVisible(false)}
          collapsed={collapsed}
          onMenuHoverStart={() => setMenuHover(true)}
          onMenuHoverEnd={() => setMenuHover(false)}
        />
      )}

      {sidebarVisible && showSubCadastro && (
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
          marginLeft: currentSidebarWidth,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Header
          userInfo={
            userInfo
              ? { realname: userInfo.fullname || userInfo.username || 'Usuário' }
              : { realname: 'Usuário' }
          }
          isMobile={isMobile}
          toggleSidebar={() => {
            if (isMobile) {
              setSidebarVisible(!sidebarVisible);
            } else {
              setCollapsed(!collapsed);
            }
          }}
          collapsed={collapsed}
          toggleCollapse={() => setCollapsed(!collapsed)}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: 45,
            zIndex: 1100,
            left: sidebarVisible ? (collapsed ? 70 : 240) : 0,
            transition: 'left 0.3s ease',
          }}
          unidadeAtiva={unidadeAtiva}
          perfil={perfil}
          setor={setor}
          unidadesDisponiveis={unidadesDisponiveis}
          onSelectUnidade={onSelectUnidade}
          onLogout={handleLogout}
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
