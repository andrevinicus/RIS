import { useState, useEffect, useCallback } from 'react';
import { Unidade } from './types';
import { fetchUnidades, saveUnidade } from '../ServiceUnidade';

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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  }, []);

  const handleAddClick = useCallback(() => {
    setForm(FORMULARIO_VAZIO);
    setSelected(null);
    setIsEditable(true);
    setError(null);
  }, []);

  const handleCancel = useCallback(() => {
    if (selected) setForm(selected);
    else setForm(FORMULARIO_VAZIO);
    setIsEditable(false);
    setError(null);
  }, [selected]);

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
    handleCancel,
    handleSave,
    setFiltros,
  };
}
