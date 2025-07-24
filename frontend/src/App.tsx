import React, { useContext } from 'react';
import { useRoutes, Navigate, RouteObject } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { routes as routeConfig } from './router/routes';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
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

interface CustomRoute {
  path?: string;
  element?: React.ReactNode;
  component?: React.ComponentType<any>;
  protected?: boolean;
  children?: CustomRoute[];
  key?: string;
  label?: string;
}

function generateRoutes(routes: CustomRoute[], userInfo: any, logout: () => void): RouteObject[] {
  const flatRoutes: RouteObject[] = [];

  routes.forEach((route) => {
    const Element = route.component;

    const wrappedElement = route.protected
      ? (
          <ProtectedRoute>
            {Element && <Element userInfo={userInfo} onLogout={logout} />}
          </ProtectedRoute>
        )
      : Element && <Element />;

    if (route.children && route.path) {
      flatRoutes.push({
        path: route.path,
        element: wrappedElement,
        children: route.children.map((sub) => {
          const SubElement = sub.component;
          const subWrapped = sub.protected
            ? (
                <ProtectedRoute>
                  {SubElement && <SubElement />}
                </ProtectedRoute>
              )
            : SubElement && <SubElement />;

          return {
            path: sub.path?.replace(route.path!, '').replace(/^\//, ''),
            element: subWrapped,
          };
        }),
      });
    } else if (route.path) {
      flatRoutes.push({
        path: route.path,
        element: wrappedElement,
      });
    }
  });

  return flatRoutes;
}

const App: React.FC = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const element = useRoutes(generateRoutes(routeConfig, userInfo, logout));

  return element ?? <Navigate to="/login" replace />;
};

export default App;
