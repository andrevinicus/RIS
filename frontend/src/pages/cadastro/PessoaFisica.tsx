import React, { useState, useEffect } from 'react';
import InputText from './InputField';

const gerarCodigo = () => Math.floor(1000000 + Math.random() * 9000000).toString();

const calcularIdade = (dataNascimento: string) => {
  if (!dataNascimento) return '';
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade.toString();
};

const PessoaFisica: React.FC = () => {
  const [form, setForm] = useState({
    codigo: gerarCodigo(),
    name: '',
    cpf: '',
    document_number: '',
    document_type: '',
    email: '',
    phone_mobile_ddi: '',
    phone_mobile_ddd: '',
    phone_mobile_number: '',
    phone_work_ddi: '',
    phone_work_ddd: '',
    phone_work_number: '',
    birth_date: '',
    idade: '',
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
  });

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const idadeCalculada = calcularIdade(form.birth_date);
    if (form.idade !== idadeCalculada) {
      setForm(prev => ({ ...prev, idade: idadeCalculada }));
    }
  }, [form.birth_date]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => setIsEditable(true);
  const handleCancel = () => setIsEditable(false);
  const handleSave = () => {
    console.log('Salvo:', form);
    setIsEditable(false);
  };

  const grid = (cols: string, children: React.ReactNode) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: cols,
        gap: 32,
        marginTop: 16,
        width: '100%',
      }}
    >
      {children}
    </div>
  );

  return (
    <div
      style={{
        background: '#fff',
        padding: 30,
        minHeight: '100vh',
        boxSizing: 'border-box',
        maxWidth: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <h1 style={{ fontSize: 24 }}>Pessoa Física</h1>
          {!isEditable && (
            <button
              onClick={handleAddClick}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                cursor: 'pointer',
                fontSize: 14,
                padding: 0,
              }}
            >
              Adicionar
            </button>
          )}
        </div>

        {grid(
          '120px 1fr 80px',
          <>
            <InputText label="Código" name="codigo" value={form.codigo} disabled onChange={() => {}} />
            <InputText label="Nome" name="name" value={form.name} onChange={handleChange} disabled={!isEditable} />
            <InputText label="Idade" name="idade" value={form.idade} disabled onChange={() => {}} />
          </>
        )}

        {grid(
          '100px 110px 120px 160px 60px 140px 60px 1fr',
          <>
            <InputText label="CPF:" name="cpf" value={form.cpf} onChange={handleChange} disabled={!isEditable} />
            <InputText type="date" label="Data Nascimento" name="birth_date" value={form.birth_date} onChange={handleChange} disabled={!isEditable} />
            <label>
              Sexo:
              <select name="sex" value={form.sex} onChange={handleChange} disabled={!isEditable} style={{ width: '100%', padding: 8 }}>
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </label>
            <InputText label="Email:" name="email" value={form.email} onChange={handleChange} disabled={!isEditable} />
            <InputText label="DDD:" name="phone_mobile_ddd" value={form.phone_mobile_ddd} onChange={handleChange} disabled={!isEditable} maxLength={2} placeholder="(XX)" />
            <InputText label="Celular:" name="phone_mobile_number" value={form.phone_mobile_number} onChange={handleChange} disabled={!isEditable} />
            <InputText label="DDD:" name="phone_work_ddd" value={form.phone_work_ddd} onChange={handleChange} disabled={!isEditable} maxLength={2} placeholder="(XX)" />
            <InputText label="Número Trabalho:" name="phone_work_number" value={form.phone_work_number} onChange={handleChange} disabled={!isEditable} />
          </>
        )}

        {grid(
          '100px 100px 1fr',
          <>
            <InputText label="Peso (kg)" name="weight" value={form.weight} onChange={handleChange} disabled={!isEditable} />
            <InputText label="Altura (cm)" name="height" value={form.height} onChange={handleChange} disabled={!isEditable} />
          </>
        )}

        {grid(
          'repeat(3, minmax(200px, 1fr))',
          <>
            <label>
              Estado Civil:
              <select name="marital_status" value={form.marital_status} onChange={handleChange} disabled={!isEditable} style={{ width: '100%', padding: 8 }}>
                <option value="">Selecione</option>
                <option value="Solteiro">Solteiro(a)</option>
                <option value="Casado">Casado(a)</option>
                <option value="Divorciado">Divorciado(a)</option>
                <option value="Viúvo">Viúvo(a)</option>
                <option value="Outro">Outro</option>
              </select>
            </label>
            <InputText label="Nome da Mãe" name="mother_name" value={form.mother_name} onChange={handleChange} disabled={!isEditable} />
            <InputText label="Nome do Pai" name="father_name" value={form.father_name} onChange={handleChange} disabled={!isEditable} />
          </>
        )}

        {grid(
          'repeat(3, minmax(200px, 1fr))',
          <>
            <InputText label="Endereço" name="address" value={form.address} onChange={handleChange} disabled={!isEditable} />
            <InputText label="Complemento" name="complement" value={form.complement} onChange={handleChange} disabled={!isEditable} />
            <InputText label="Bairro" name="district" value={form.district} onChange={handleChange} disabled={!isEditable} />
            <InputText label="Cidade" name="city" value={form.city} onChange={handleChange} disabled={!isEditable} />
            <InputText label="Estado" name="state" value={form.state} onChange={handleChange} disabled={!isEditable} />
            <InputText label="País" name="country" value={form.country} onChange={handleChange} disabled={!isEditable} />
            <InputText label="CEP" name="zip_code" value={form.zip_code} onChange={handleChange} disabled={!isEditable} />
          </>
        )}

        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <InputText label="Nacionalidade" name="nationality" value={form.nationality} onChange={handleChange} disabled={!isEditable} />
          <InputText label="ID Convênio" name="insurance_id" value={form.insurance_id} onChange={handleChange} disabled={!isEditable} />
          <InputText label="Nº Cartão Convênio" name="insurance_card_number" value={form.insurance_card_number} onChange={handleChange} disabled={!isEditable} />
          <InputText label="Observações" name="observations" value={form.observations} onChange={handleChange} disabled={!isEditable} textarea rows={4} />
        </div>

        {isEditable && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32, gap: 32 }}>
            <button
              onClick={handleCancel}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                background: '#eee',
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                background: '#007bff',
                border: 'none',
                color: '#fff',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PessoaFisica;
