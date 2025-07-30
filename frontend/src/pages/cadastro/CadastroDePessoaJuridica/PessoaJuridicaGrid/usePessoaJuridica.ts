import { useState, useEffect, useCallback } from 'react';
import { PessoaJuridica } from '../PessoaJuridicaForms/types';
import { fetchPessoaJuridicaById, fetchPessoasJuridicas, savePessoaJuridica } from '../ServicePJ';

const FORMULARIO_VAZIO: PessoaJuridica = {
  id: '',
  codigo: '',
  razao_social: '',
  nome_fantasia: '',
  cnpj: '',
  inscricao_estadual: '',
  inscricao_municipal: '',
  email: '',
  telefone_comercial: '',
  endereco: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  pais: '',
  cep: '',
  responsavel: '',
  observacoes: '',
};

export const usePessoaJuridica = () => {
  const [empresas, setEmpresas] = useState<PessoaJuridica[]>([]);
  const [form, setForm] = useState<PessoaJuridica>(FORMULARIO_VAZIO);
  const [selected, setSelected] = useState<PessoaJuridica | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(false);

  const [filtros, setFiltros] = useState<{
  codigo?: string;
  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;
  }>({});

const loadEmpresas = useCallback(async () => {
  setLoading(true);
  try {
    const data = await fetchPessoasJuridicas(filtros);
    setEmpresas(data || []);
  } catch (e) {
    console.error('Erro ao carregar empresas:', e);
    setError('Falha ao carregar dados.');
  } finally {
    setLoading(false);
  }
}, [filtros]);


  useEffect(() => {
    const timer = setTimeout(() => loadEmpresas(), 300);
    return () => clearTimeout(timer);
  }, [loadEmpresas]);

  // Memoizando handleChange para evitar recriação a cada render
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

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

  const handleEmpresaClick = async (id: string) => {
    setLoading(true);
    try {
      const data = await fetchPessoaJuridicaById(id);
      if (data) {
        setForm(data);
        setSelected(data);
        setIsEditable(false);
      } else {
        setError('Registro não encontrado.');
      }
    } catch (e) {
      console.error('Erro ao buscar registro:', e);
      setError('Erro ao buscar registro.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const saved = await savePessoaJuridica(form, selected?.id);
      if (saved) {
        setEmpresas((prev) => {
          const idx = prev.findIndex((p) => p.id === saved.id);
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
      console.error('Erro ao salvar:', e);
      setError('Erro inesperado ao salvar.');
    } finally {
      setLoading(false);
    }
  };

  return {
    empresas,
    form,
    selected,
    loading,
    error,
    isEditable,
    handleChange,
    handleAddClick,
    handleCancel,
    handleSave,
    handleEmpresaClick,
    setFiltros,
  };
};
