import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import HomeScreen from './HomeScream';

const HomeScreenWrapper: React.FC = () => {
  const { userInfo, logout } = useContext(AuthContext);

  return <HomeScreen userInfo={userInfo} onLogout={logout} />;
};

export default HomeScreenWrapper;
