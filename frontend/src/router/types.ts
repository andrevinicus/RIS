import React from 'react';
import { RouteObject } from 'react-router-dom';

export type AppRouteObject = RouteObject & {
  protected?: boolean;
};
export interface RouteType {
  path: string;
  element: React.ReactElement;
  protected?: boolean;
  children?: RouteType[];
  key?: string;
  label?: string;
  submenu?: RouteType[]; // se quiser manter submenu também
}
