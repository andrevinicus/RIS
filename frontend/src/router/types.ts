import { RouteObject } from 'react-router-dom';

export type AppRouteObject = RouteObject & {
  protected?: boolean;
};
