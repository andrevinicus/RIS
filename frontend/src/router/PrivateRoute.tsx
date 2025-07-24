import React, { useContext, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


interface PrivateRouteProps {
  children?: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;

  if (!token) return <Navigate to="/login" replace />;

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
