import { RouteObject } from 'react-router-dom';

export function flattenRoutes(routes: any[]): RouteObject[] {
  return routes.flatMap((route) => {
    if (route.submenu) {
      return flattenRoutes(route.submenu);
    }

    if (route.path && route.element) {
      return [{ path: route.path, element: route.element }];
    }

    return [];
  });
}
