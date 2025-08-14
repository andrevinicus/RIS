import { useState, useEffect, useCallback } from 'react';

import { deletePessoa, fetchPessoas, fetchPessoaById, savePessoa } from './ServicePF';
import { PessoaFisica } from '../../../types/pessoaFisica';


const FORMULARIO_VAZIO: PessoaFisica = {
  id: '',
  codigo: '',
  name: '',
  cpf: '',
  document_number: '',
  document_type: '',
  email: '',
  phone_mobile_number: '',
  phone_work_number: '',
  birth_date: '',
  sex: '',
  weight: '',
  height: '',
  contact: '',
  marital_status: '',
  mother_name: '',
  father_name: '',
  address: '',
  complement: '',
  district: '',
  city: '',
  state: '',
  country: '',
  zip_code: '',
  nationality: '',
  insurance_id: '',
  insurance_card_number: '',
  observations: '',
  idade: '',
};

const calcularIdade = (dataNascimento: string) => {
  if (!dataNascimento) return '';
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  if (
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())
  ) {
    idade--;
  }
  return idade.toString();
};

export const usePessoaFisica = () => {
  const [pessoas, setPessoas] = useState<PessoaFisica[]>([]);
  const [form, setForm] = useState<PessoaFisica>(FORMULARIO_VAZIO);
  const [selected, setSelected] = useState<PessoaFisica | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(false);

  const [filtros, setFiltros] = useState<{
    nome?: string;
    cpf?: string;
    codigo?: string;
  }>({});

  const carregarPessoas = useCallback(async () => {
    setLoading(true);
    try {
      const dados = await fetchPessoas(filtros);
      setPessoas(dados ?? []);
      setError(null);
    } catch (e) {
      console.error('Erro ao carregar pessoas:', e);
      setPessoas([]);
      setError('Falha ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    const timer = setTimeout(() => carregarPessoas(), 300);
    return () => clearTimeout(timer);
  }, [carregarPessoas]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleAddClick = useCallback(() => {
    setForm(FORMULARIO_VAZIO);
    setSelected(null);
    setIsEditable(true);
    setError(null);
  }, []);

    const handleCancel = () => {
      setIsEditable(false);
      setSelected(null); // limpa o item selecionado
      setForm( FORMULARIO_VAZIO);
      setError(null);
    };

  const handlePessoaClick = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const dados = await fetchPessoaById(id);
        if (dados) {
          setForm(dados);
          setSelected(dados);
          setIsEditable(false);
          setError(null);
        } else {
          setError('Registro não encontrado.');
        }
      } catch (e) {
        console.error('Erro ao buscar registro:', e);
        setError('Erro ao buscar registro.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSave = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const idade = calcularIdade(form.birth_date);
      const dadosParaSalvar = { ...form, idade };
      const saved = await savePessoa(dadosParaSalvar, selected?.id);
      if (saved) {
        setPessoas(prev => {
          const idx = prev.findIndex(p => p.id === saved.id);
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
        setError(null);
      } else {
        setError('Erro ao salvar.');
      }
    } catch (e) {
      console.error('Erro ao salvar:', e);
      setError('Erro inesperado ao salvar.');
    } finally {
      setLoading(false);
    }
  }, [form, selected]);

  const handleDelete = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await deletePessoa(id);
        setPessoas(prev => prev.filter(p => p.id !== id));
        if (selected?.id === id) {
          setForm(FORMULARIO_VAZIO);
          setSelected(null);
          setIsEditable(false);
        }
        setError(null);
      } catch (error) {
        console.error('Erro ao excluir pessoa:', error);
        setError('Erro ao excluir.');
      } finally {
        setLoading(false);
      }
    },
    [selected]
  );

  const handleEditClick = useCallback((pessoa: PessoaFisica) => {
    setSelected(pessoa);
    setForm(pessoa);
    setIsEditable(true);
    setError(null);
  }, []);

  return {
    pessoas,
    form,
    selected,
    loading,
    error,
    isEditable,
    filtros,
    setFiltros,
    calcularIdade,
    handleChange,
    handleAddClick,
    handleCancel,
    handlePessoaClick,
    handleSave,
    handleDelete,
    handleEditClick,
  };
};
