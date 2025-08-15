import React, { useState, useEffect, useContext, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import SubSidebarCadastro from '../Sidebar/SubSidebarCadastro';
import { AuthContext } from '../../context/AuthContext';

interface Unidade {
  codUnidade: string;
  nome: string;
  nomeReduzido?: string;
}

interface Perfil { nome: string; }
interface Setor { nome: string; }

interface HomeScreenProps { onLogout: () => void; }

const HomeScreen: React.FC<HomeScreenProps> = ({ onLogout }) => {
  const { userInfo, setUnidadeAtiva } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState<'Cadastros' | 'listaConsultas' | 'perfilClinica' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const [submenuHover, setSubmenuHover] = useState(false);
  const [showSubCadastro, setShowSubCadastro] = useState(false);

  const subSidebarRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const unidadeAtiva: Unidade = {
    codUnidade: userInfo?.unidadeAtiva?.unidadePadraoID || '',
    nome: userInfo?.unidadeAtiva?.unidadePadraoNome || '',
    nomeReduzido: userInfo?.unidadeAtiva?.unidadeNomeReduzido || '',
  };
  const perfil = userInfo?.perfil ?? { nome: '' };
  const setor = userInfo?.setor ?? { nome: '' };
  const unidadesDisponiveis = userInfo?.unidadeAtiva?.unidadesDisponiveis ?? [];

  const onSelectUnidade = (unidade: Unidade) => { setUnidadeAtiva(unidade); };
  const handleLogout = () => { onLogout(); };
  const currentSidebarWidth = sidebarVisible ? (collapsed ? 70 : 230) : 0;

  // Fecha SubSidebar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        showSubCadastro &&
        subSidebarRef.current &&
        !subSidebarRef.current.contains(target) &&
        sidebarRef.current &&
        !sidebarRef.current.contains(target)
      ) {
        setShowSubCadastro(false);
        setMenuOpen(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showSubCadastro]);

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
        <div ref={sidebarRef}>
          <Sidebar
            menuOpen={menuOpen}
            setMenuOpen={(menu) => {
              setMenuOpen(menu);
              if (menu === 'Cadastros') setShowSubCadastro(true);
              else setShowSubCadastro(false);
            }}
            onLogout={onLogout}
            isMobile={isMobile}
            closeSidebar={() => setSidebarVisible(false)}
            collapsed={collapsed}
            onMenuHoverStart={() => { if(menuOpen === 'Cadastros') setShowSubCadastro(true); }}
            onMenuHoverEnd={() => { if(menuOpen !== 'Cadastros') setShowSubCadastro(false); }}
          />
        </div>
      )}

      {sidebarVisible && showSubCadastro && (
        <div ref={subSidebarRef}>
          <SubSidebarCadastro
            collapsed={collapsed}
            onClose={() => {
              setShowSubCadastro(false);
              setMenuOpen(null);
            }}
            onMouseEnter={() => setSubmenuHover(true)}
            onMouseLeave={() => setSubmenuHover(false)}
            onItemClick={() => setMenuOpen(null)}
          />
        </div>
      )}

      <div style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f3f4f6',
        marginLeft: currentSidebarWidth,
        transition: 'margin-left 0.3s ease',
      }}>
        <Header
          userInfo={userInfo ? { realname: userInfo.fullname || userInfo.username || 'Usuário' } : { realname: 'Usuário' }}
          isMobile={isMobile}
          toggleSidebar={() => isMobile ? setSidebarVisible(!sidebarVisible) : setCollapsed(!collapsed)}
          collapsed={collapsed}
          toggleCollapse={() => setCollapsed(!collapsed)}
          style={{ position: 'fixed', top: 0, right: 0, height: 45, zIndex: 1100, left: sidebarVisible ? (collapsed ? 70 : 240) : 0, transition: 'left 0.3s ease' }}
          unidadeAtiva={unidadeAtiva}
          perfil={perfil}
          setor={setor}
          unidadesDisponiveis={unidadesDisponiveis}
          onSelectUnidade={onSelectUnidade}
          onLogout={handleLogout}
        />

        <main style={{ flexGrow: 1, padding: 10, marginTop: 40, height: 'calc(100vh - 60px)', paddingBottom: 50 }}>
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-10%)',
            minWidth: 220,
            maxWidth: 300,
            padding: '10px 20px',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            border: '1px solid #ddd',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.15)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 500,
            textAlign: 'center',
            zIndex: 1200,
          }}>
            <span>
              Unidade: <strong>{userInfo?.unidadeAtiva?.unidadeNomeReduzido || userInfo?.unidadeAtiva?.unidadePadraoNome || 'Nenhuma'}</strong>
            </span>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;
