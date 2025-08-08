import React from 'react';

import InputText from './InputField';

import { AddButton, CancelButton, 
  ErrorMessage, FormularioContainer, 
  HeaderContainer, SaveButton, Select, 
  StyledGridContainer, Title } 
  from './FormPessoaFisica.styles';
import { PessoaFisica } from '../../../../types/types';

// seu componente input aprimorado


interface FormPessoaFisicaProps {
  form: PessoaFisica;
  idade: string;
  isEditable: boolean;
  loading: boolean;
  error: string | null;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleAddClick: () => void;
  handleCancel: () => void;
  handleSave: () => void;
}


const GridContainer: React.FC<{
  columns: string;
  gap?: string;
  marginTop?: string;
  children: React.ReactNode;
}> = ({ columns, gap = '16px', marginTop = '16px', children }) => (
  <StyledGridContainer columns={columns} gap={gap} marginTop={marginTop}>
    {children}
  </StyledGridContainer>
);

const FormPessoaFisica: React.FC<FormPessoaFisicaProps> = ({
  form,
  idade,
  isEditable,
  loading,
  error,
  handleChange,
  handleAddClick,
  handleCancel,
  handleSave,
}) => {
  return (
    <FormularioContainer>
      <HeaderContainer>
        <Title>Pessoa Física</Title>
        {!isEditable && (
          <AddButton onClick={handleAddClick}>
            Adicionar
          </AddButton>
        )}
      </HeaderContainer>

      <GridContainer columns="minmax(70px, 0.5fr) minmax(200px, 2fr) minmax(50px, 0.5fr) minmax(100px, 1fr)">
        <InputText label="Código" name="id" value={form?.id || ''} disabled onChange={() => {}} />
        <InputText label="Nome" name="name" value={form?.name || ''} onChange={handleChange} disabled={!isEditable} />
        <InputText label="Idade" name="idade" value={idade} disabled onChange={() => {}} />
        <InputText label="CPF" name="cpf" value={form?.cpf || ''} onChange={handleChange} disabled={!isEditable} />
      </GridContainer>

      <GridContainer columns="repeat(auto-fit, minmax(120px, 1fr))">
        <InputText
          type="date"
          label="Data Nasc."
          name="birth_date"
          value={form?.birth_date}
          onChange={handleChange}
          disabled={!isEditable}
        />

        <label style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ marginBottom: 4, color: 'rgba(0,0,0,0.6)', fontSize: 14, userSelect: 'none' }}>Sexo</span>
          <Select
            name="sex"
            value={form?.sex}
            onChange={handleChange}
            disabled={!isEditable}
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </Select>
        </label>

        <InputText label="Email" name="email" value={form?.email} onChange={handleChange} disabled={!isEditable} />
        <InputText label="DDD + Telefone" name="phone_mobile_number" value={form?.phone_mobile_number} onChange={handleChange} disabled={!isEditable} />
        <InputText label="DDD + Trabalho" name="phone_work_number" value={form?.phone_work_number} onChange={handleChange} disabled={!isEditable} />
      </GridContainer>

      <GridContainer columns="repeat(auto-fit, minmax(120px, 1fr))">
        <InputText label="Peso" name="weight" value={form?.weight} onChange={handleChange} disabled={!isEditable} />
        <InputText label="Altura" name="height" value={form?.height} onChange={handleChange} disabled={!isEditable} />

        <label style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ marginBottom: 4, color: 'rgba(0,0,0,0.6)', fontSize: 14, userSelect: 'none' }}>Estado Civil</span>
          <Select
            name="marital_status"
            value={form?.marital_status}
            onChange={handleChange}
            disabled={!isEditable}
          >
            <option value="">Selecione</option>
            <option value="Solteiro">Solteiro(a)</option>
            <option value="Casado">Casado(a)</option>
            <option value="Divorciado">Divorciado(a)</option>
            <option value="Viúvo">Viúvo(a)</option>
            <option value="Outro">Outro</option>
          </Select>
        </label>

        <InputText label="Nome da Mãe" name="mother_name" value={form?.mother_name} onChange={handleChange} disabled={!isEditable} />
        <InputText label="Nome do Pai" name="father_name" value={form?.father_name} onChange={handleChange} disabled={!isEditable} />
      </GridContainer>

      <GridContainer columns="repeat(auto-fit, minmax(110px, 1fr))">
        <InputText label="CEP" name="zip_code" value={form?.zip_code} onChange={handleChange} disabled={!isEditable} />
        <InputText label="Endereço" name="address" value={form?.address} onChange={handleChange} disabled={!isEditable} />
        <InputText label="Complemento" name="complement" value={form?.complement} onChange={handleChange} disabled={!isEditable} />
        <InputText label="Bairro" name="district" value={form?.district} onChange={handleChange} disabled={!isEditable} />
        <InputText label="Cidade" name="city" value={form?.city} onChange={handleChange} disabled={!isEditable} />
        <InputText label="Estado" name="state" value={form?.state} onChange={handleChange} disabled={!isEditable} />
        <InputText label="País" name="country" value={form?.country} onChange={handleChange} disabled={!isEditable} />
      </GridContainer>

      <GridContainer columns="minmax(100px, 1fr) minmax(100px, 1.5fr) minmax(120px, 2fr)">
        <InputText label="ID Convênio" name="insurance_id" value={form?.insurance_id} onChange={handleChange} disabled={!isEditable} />
        <InputText label="Convênio" name="insurance_card_number" value={form?.insurance_card_number} onChange={handleChange} disabled={!isEditable} />
        <InputText label="Nacionalidade" name="nationality" value={form?.nationality} onChange={handleChange} disabled={!isEditable} />
      </GridContainer>

      <GridContainer columns="1fr">
        <InputText
          label="Observações"
          name="observations"
          value={form?.observations}
          onChange={handleChange}
          disabled={!isEditable}
          textarea
          rows={4}
          maxLength={2500}
        />
      </GridContainer>

      {isEditable && (
        <div style={{ display: 'flex', marginTop: 15, gap: 16, flexShrink: 0 }}>
          <CancelButton onClick={handleCancel} disabled={loading}>
            Cancelar
          </CancelButton>
          <SaveButton onClick={handleSave} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </SaveButton>
        </div>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormularioContainer>
  );
};

export default FormPessoaFisica;
