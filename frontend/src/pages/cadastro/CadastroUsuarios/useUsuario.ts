import { useEffect, useState } from 'react';
import { fetchUsuarios, saveUsuario, deleteUsuario } from './ServiceUsuario';
import { fetchUnidades } from '../CadastroUnidades/ServiceUnidade';
import { Usuario } from './types';
import { Unidade } from '../CadastroUnidades/HookTypes/types';

const FORM_VAZIO: Omit<Usuario, 'unidadePadrao' | 'unidades' | 'usuarioCriacao' | 'dataCriacao'> = {
  codigo: '',
  nomeCompleto: '',
  usuario: '',
  senha: '',
  email: '',
  unidadePadraoId: '',
  situacao: 'ativo',
  setor: '',
  paginaInicial: '',
  pessoaFisicaId: '',
  pessoaFisicanome: '',
};

export function useUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [form, setForm] = useState(FORM_VAZIO);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editandoCodigo, setEditandoCodigo] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [usrs, unds] = await Promise.all([fetchUsuarios(), fetchUnidades({})]);
      setUsuarios(usrs);
      setUnidades(unds);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setForm(FORM_VAZIO);
    setEditandoCodigo(null);
    setShowForm(true);
    setError(null);
  };

  const handleEditClick = (usuario: Usuario) => {
    setForm({
      codigo: usuario.codigo,
      nomeCompleto: usuario.nomeCompleto,
      usuario: usuario.usuario,
      senha: '', // não exibe senha antiga por segurança
      email: usuario.email,
      unidadePadraoId: usuario.unidadePadrao?.codigo || '',
      situacao: usuario.situacao,
      setor: usuario.setor || '',
      paginaInicial: usuario.paginaInicial || '',
      pessoaFisicaId: usuario.pessoaFisicaId || '',
    });
    setEditandoCodigo(usuario.codigo);
    setShowForm(true);
    setError(null);
  };

  const handleDeleteClick = async (codigo: string) => {
    if (!window.confirm('Confirma exclusão?')) return;
    try {
      await deleteUsuario(codigo);
      setUsuarios(prev => prev.filter(u => u.codigo !== codigo));
    } catch (err) {
      alert('Erro ao excluir usuário: ' + err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setError(null);
    setForm(FORM_VAZIO);
    setEditandoCodigo(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = async () => {
    setLoading(true);
    try {
      await saveUsuario(form, editandoCodigo ?? undefined);
      await carregarDados();
      setShowForm(false);
    } catch (err: any) {
      setError(err?.message || 'Erro ao salvar usuário.');
    } finally {
      setLoading(false);
    }
  };
  const handleSelecionarPessoaFisica = (pessoa: { codigo: string; nome: string }) => {
  setForm(prev => ({
    ...prev,
    pessoaFisicaId: pessoa.codigo,
    pessoaFisicanome: pessoa.nome,
  }));
};

  return {
    usuarios,
    unidades,
    form,
    showForm,
    loading,
    error,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleCancel,
    handleChange,
    handleSave,
    handleSelecionarPessoaFisica,
  };
}
