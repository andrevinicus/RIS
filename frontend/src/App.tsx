import React, { useContext } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { routes } from './router/routes';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    // Mostra um loader enquanto o contexto carrega o token
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Carregando...</h2>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const element = useRoutes(
    routes.map((route) => {
      if (route.protected && route.element) {
        return {
          ...route,
          element: (
            <ProtectedRoute>
              {route.element}
            </ProtectedRoute>
          ),
        };
      }
      return route;
    })
  );

  return element ?? <Navigate to="/login" replace />;
};

export default App;
