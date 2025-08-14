import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import HomeScreen from './HomeScream';
import { Outlet } from 'react-router-dom';

const HomeScreenWrapper: React.FC = () => {
  const { userInfo, logout } = useContext(AuthContext);

  return (
    <>
      <HomeScreen onLogout={logout} />

    </>
  );
};

export default HomeScreenWrapper;
