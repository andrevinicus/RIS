import React, { useState, useEffect } from 'react';
import PessoaFisicaGrid from './PessoaFisicaGrid/PessoaFisicaGrid';
import FormPessoaFisica from './PessoaFisicaFormulario/FormPessoaFisica';  // importe seu formulário
import { fetchPessoas, savePessoa } from './ServicePF'; // API service

const FORMULARIO_VAZIO = {
  id: '',
  name: '',
  cpf: '',
  birth_date: '',
  sex: '',
  email: '',
  phone_mobile_number: '',
  phone_work_number: '',
  weight: '',
  height: '',
  marital_status: '',
  mother_name: '',
  father_name: '',
  zip_code: '',
  address: '',
  complement: '',
  district: '',
  city: '',
  state: '',
  country: '',
  insurance_id: '',
  insurance_card_number: '',
  nationality: '',
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

const PessoaFisicaPage = () => {
  const [pessoas, setPessoas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(FORMULARIO_VAZIO);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState({ nome: '', cpf: '', codigo: '' });

  useEffect(() => {
    if (!showForm) carregarPessoas(filtros);
  }, [showForm, filtros]);

  async function carregarPessoas(filtros?: { nome: string; cpf: string; codigo: string }) {
    setLoading(true);
    try {
      const dados = await fetchPessoas(filtros);
      setPessoas(dados ?? []);
    } catch (e) {
      console.error(e);
      setPessoas([]);
    } finally {
      setLoading(false);
    }
  }

  const handleAddClick = () => {
    setForm(FORMULARIO_VAZIO);
    setShowForm(true);
    setError(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const idade = calcularIdade(form.birth_date);
    const dadosParaSalvar = { ...form, idade };

    setLoading(true);
    setError(null);

    try {
      const saved = await savePessoa(dadosParaSalvar, form.id || undefined);
      if (!saved || !saved.id) throw new Error('Falha ao salvar a pessoa.');

      setShowForm(false);
      await carregarPessoas(filtros);
    } catch (e: any) {
      setError(e.message || 'Erro ao salvar.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (novosFiltros: { nome: string; cpf: string; codigo: string }) => {
    setFiltros(novosFiltros);
  };

  return (
    <>
      {!showForm && (
        <PessoaFisicaGrid
          pessoas={pessoas}
          onAddClick={handleAddClick}
          onFilterChange={handleFilterChange}
        />
      )}

      {showForm && (
        <FormPessoaFisica
          form={form}
          idade={calcularIdade(form.birth_date)}
          isEditable={true}
          loading={loading}
          error={error}
          handleChange={handleChange}
          handleAddClick={handleAddClick} // geralmente não usado no formulário
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      )}

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default PessoaFisicaPage;
