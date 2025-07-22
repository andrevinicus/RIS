import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../services/authService';
import LoginScreen from './LoginScreen';

const Login: React.FC = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = async (username: string, password: string) => {
    try {
      const token = await login(username, password);
      setToken(token);
      navigate('/home');  // troquei aqui para o path do HomeScreen
    } catch (error) {
      throw error;
    }
  };

  return <LoginScreen onLogin={onLogin} />;
};

export default Login;
