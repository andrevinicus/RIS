import Login from '../pages/login/Login';
import HomeScreenWrapper from '../components/home/HomeScreenWrapper';

import Usuarios from '../pages/cadastro/Usuarios';

import PessoaFisicaPage from '../pages/cadastro/CadastroDePessoa/PessoaFisicaPage'; // use este aqui
import PessoaJuridicaPage from '../pages/cadastro/CadastroDePessoaJuridica/PessoaJuridicaPage';

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
        component: PessoaFisicaPage,  // <-- aqui o componente correto
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
