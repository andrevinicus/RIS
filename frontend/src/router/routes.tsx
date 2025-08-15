import Login from '../pages/login/Login';
import HomeScreenWrapper from '../components/home/HomeScreenWrapper';
import PessoaFisicaPage from '../pages/cadastro/CadastroDePessoa/PessoaFisicaPage';
import PessoaJuridicaPage from '../pages/cadastro/CadastroDePessoaJuridica/PessoaJuridicaPage';
import UnidadePage from '../pages/cadastro/CadastroUnidades/UnidadesPages';
import UsuarioPage from '../pages/cadastro/CadastroUsuarios/UsuarioPage';
import ConvenioPage from '../pages/cadastro/CadastroDeConvenios/ConvenioPage';
import PlanoPage from '../pages/planosConvenio/PlanoPage';

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
      { path: 'pessoa-fisica', protected: true, component: PessoaFisicaPage },
      { path: 'pessoa-juridica', protected: true, component: PessoaJuridicaPage },
      { path: 'usuarios', protected: true, component: UsuarioPage },
      { path: 'unidades', protected: true, component: UnidadePage },
      { path: 'convenios', protected: true, component: ConvenioPage },
      { path: 'planos/:convenioId', protected: true, component: PlanoPage },
    ],
  },

  { path: '*', component: Login },
];

