import { useEffect, useState } from 'react';
import { fetchUsuarios, saveUsuario, deleteUsuario } from './ServiceUsuario';
import { fetchUnidades } from '../CadastroUnidades/ServiceUnidade';
import { Usuario } from './types';
import { Unidade } from '../CadastroUnidades/HookTypes/types';

const FORM_VAZIO: Omit<Usuario, "unidades" | "usuarioCriacao" > = {
  codigo: '',
  nomeCompleto: '',
  usuario: '',
  senha: '',
  email: '',
  unidadePadraoId: '',
  unidadePadrao: '',
  situacao: 'ativo',
  setor: '',
  paginaInicial: '',
  pessoaFisicaId: '',
  pessoaFisicanome: '',
  dataCriacao: new Date().toISOString(),
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
    unidadePadraoId: usuario.unidadePadraoId,
    unidadePadrao: usuario.unidadePadrao || '',  // **importante**
    situacao: usuario.situacao,
    setor: usuario.setor || '',
    paginaInicial: usuario.paginaInicial || '',
    pessoaFisicaId: usuario.pessoaFisicaId || '',
    pessoaFisicanome: usuario.pessoaFisicanome || '',
    dataCriacao: usuario.dataCriacao || '',
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
  const handleSelecionarUnidade = (unidade: { codUnidade: string; nomeUnidade: string }) => {
    setForm(prev => ({
      ...prev,
        unidadePadraoId: unidade.codUnidade,
        unidadePadrao: unidade.nomeUnidade,
      
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
    handleSelecionarUnidade,
  };
}
