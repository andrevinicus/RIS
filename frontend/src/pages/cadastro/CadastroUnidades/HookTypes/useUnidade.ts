import { useState, useEffect, useCallback } from 'react';
import { Unidade } from './types';
import { deleteUnidade, fetchUnidades, saveUnidade } from '../ServiceUnidade';

const FORMULARIO_VAZIO: Unidade = {
  codUnidade: '',
  nomeReduzido: '',
  nome: '',
  cnpj: '',
  ramoAtividade: '',
  razaoSocial: '',
  inscricaoEstadual: '',
  inscricaoMunicipal: '',
  regJuntaComercial: '',
  regCartorio: '',
  status: '',
  despachoData: '',
  nomeResponsavel: '',
  cpfResponsavel: '',
  codCargo: '',
  cargoResponsavel: '',
  cnes: '',
  logradouro: '',
  endereco: '',
  numero: '',
  bairro: '',
  cep: '',
  codIbge: '',
  municipio: '',
  telefone: '',
  email: '',
  matriz: false,
};

export function useUnidade() {
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [form, setForm] = useState<Unidade>(FORMULARIO_VAZIO);
  const [selected, setSelected] = useState<Unidade | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [filtros, setFiltros] = useState<{ nome?: string; cnpj?: string; municipio?: string }>({});

  // Carrega unidades conforme filtros
  const loadUnidades = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUnidades(filtros);
      setUnidades(data || []);
    } catch (e) {
      console.error('Erro ao carregar unidades:', e);
      setError('Falha ao carregar unidades');
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    const timer = setTimeout(() => loadUnidades(), 300);
    return () => clearTimeout(timer);
  }, [loadUnidades]);

  // Manipula alteração dos inputs do formulário
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  }, []);

  // Função para preparar formulário para adicionar nova unidade
  const handleAddClick = useCallback(() => {
    setForm(FORMULARIO_VAZIO);
    setSelected(null);
    setIsEditable(true);
    setError(null);
  }, []);

  // Função para preparar formulário para editar unidade selecionada
  const handleEditClick = useCallback((unidade: Unidade) => {
    setSelected(unidade);
    setForm(unidade);
    setIsEditable(true);
    setError(null);
  }, []);
 const handleDeleteClick = useCallback(async (codUnidade: string) => {
  setLoading(true);
  setError(null);
  try {
    await deleteUnidade(codUnidade);
    setUnidades(prev => prev.filter(u => u.codUnidade !== codUnidade));
    if (selected?.codUnidade === codUnidade) {
      setSelected(null);
      setForm(FORMULARIO_VAZIO);
      setIsEditable(false);
    }
  } catch (e) {
    console.error('Erro ao excluir unidade:', e);
    setError('Falha ao excluir unidade.');
  } finally {
    setLoading(false);
  }
}, [selected]);

  // Cancelar edição/adição, volta ao estado inicial do formulário ou selecionado
  const handleCancel = useCallback(() => {
    if (selected) setForm(selected);
    else setForm(FORMULARIO_VAZIO);
    setIsEditable(false);
    setError(null);
  }, [selected]);

  // Salvar unidade (adicionar ou atualizar)
  const handleSave = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const isUpdate = !!selected?.codUnidade;
      const payload = isUpdate ? form : { ...form };
      if (!isUpdate) delete (payload as any).codEmpresa;

      const saved = await saveUnidade(payload, isUpdate ? selected.codUnidade : undefined);

      if (saved) {
        setUnidades(prev => {
          const idx = prev.findIndex(u => u.codUnidade === saved.codUnidade);
          if (idx !== -1) {
            const copy = [...prev];
            copy[idx] = saved;
            return copy;
          }
          return [...prev, saved];
        });

        setForm(saved);
        setSelected(saved);
        setIsEditable(false);
      } else {
        setError('Erro ao salvar.');
      }
    } catch (e) {
      console.error('Erro ao salvar unidade:', e);
      setError('Erro inesperado ao salvar.');
    } finally {
      setLoading(false);
    }
  }, [form, selected]);

  return {
    unidades,
    form,
    selected,
    loading,
    error,
    isEditable,
    handleChange,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleCancel,
    handleSave,
    setFiltros,
  };
}
