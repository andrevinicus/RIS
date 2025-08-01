import Login from '../pages/login/Login';
import HomeScreenWrapper from '../components/home/HomeScreenWrapper';
import PessoaFisicaPage from '../pages/cadastro/CadastroDePessoa/PessoaFisicaPage';
import PessoaJuridicaPage from '../pages/cadastro/CadastroDePessoaJuridica/PessoaJuridicaPage';
import UnidadePage from '../pages/cadastro/CadastroUnidades/UnidadesPages';
import UsuarioPage from '../pages/cadastro/CadastroUsuarios/UsuarioPage';

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
        component: UsuarioPage,
      },
      {
        path: 'Unidades',
        protected: true,
        component: UnidadePage,
      },
    ],
  },

  { path: '*', component: Login },
];
