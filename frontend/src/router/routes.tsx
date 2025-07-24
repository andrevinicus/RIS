// src/router/routes.tsx
import Login from '../pages/login/Login';
import HomeScreenWrapper from '../pages/home/HomeScreenWrapper';
import PessoaFisicaPage from '../pages/cadastro/PessoaFisica';
import Usuarios from '../pages/cadastro/Usuarios';
import PessoaJuridicaPage from '../pages/cadastro/PerfilClinica';

export interface CustomRoute {
  path: string;
  protected?: boolean;
  component?: React.ComponentType<any>;
  children?: CustomRoute[];
}

export const routes: CustomRoute[] = [
  { path: '/login', component: Login },

  {
    path: '/home',
    protected: true,
    component: HomeScreenWrapper,
  },

  {
    path: '/cadastro',
    protected: true,
    component: HomeScreenWrapper,
    children: [
      {
        path: 'pessoa-fisica',
        protected: true,
        component: PessoaFisicaPage,
      },
      {
        path: 'pessoa-juridica',
        protected: true,
        component: PessoaJuridicaPage,
      },
      {
        path: 'usuarios',
        protected: true,
        component: Usuarios,
      },
    ],
  },

  { path: '*', component: Login },
];
