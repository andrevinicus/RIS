import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import CadastroPaciente from '../cadastro/CadastroPaciente';
import ListaConsultas from '../cadastro/ListaConsultas';
import PerfilClinica from '../cadastro/PerfilClinica';

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
  const [menuOpen, setMenuOpen] = useState<'cadastroPaciente' | 'listaConsultas' | 'perfilClinica'>('cadastroPaciente');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

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
          userInfo={userInfo}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onLogout={onLogout}
          isMobile={isMobile}
          closeSidebar={() => setSidebarVisible(false)}
        />
      )}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header
          userInfo={userInfo}
          isMobile={isMobile}
          toggleSidebar={() => setSidebarVisible(!sidebarVisible)}
        />
        <main style={{ flexGrow: 1, padding: 30, overflowY: 'auto' }}>
          {menuOpen === 'cadastroPaciente' && <CadastroPaciente />}
          {menuOpen === 'listaConsultas' && <ListaConsultas />}
          {menuOpen === 'perfilClinica' && <PerfilClinica />}
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;
