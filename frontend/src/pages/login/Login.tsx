import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { login, getMe } from './authService';
import LoginScreen from './LoginScreen';

const Login: React.FC = () => {
  const { setToken, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onLogin = async (username: string, password: string) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const access_token = await login(username, password);
      setToken(access_token);
      console.log('Token recebido:', access_token);

      const userInfo = await getMe(access_token);
      setUserInfo(userInfo);

      navigate('/home');
    } catch (error: any) {
      console.error('Erro no login:', error);
      setErrorMessage(error.message || 'Erro desconhecido no login.');
    } finally {
      setLoading(false);
    }
  };

  return <LoginScreen onLogin={onLogin} loading={loading} errorMessage={errorMessage} />;
};

export default Login;
