// src/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './router/routes';
import PrivateRoute from './router/PrivateRoute';



interface CustomRoute {
  path: string;
  element?: React.ReactNode;
  protected?: boolean;
  children?: CustomRoute[];
}

const renderRoutes = (routesArray: CustomRoute[]): React.ReactNode =>
  routesArray.map((route) => {
    const element = route.protected
      ? route.children
        ? <PrivateRoute /> // Subrotas protegidas com layout próprio
        : <PrivateRoute>{route.element}</PrivateRoute>
      : route.element;

    return (
      <Route key={route.path} path={route.path} element={element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });

export const AppRoutes: React.FC = () => (
  <Routes>
    {renderRoutes(routes)}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);
