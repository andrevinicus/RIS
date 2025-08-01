import React from 'react';
import {
  FormularioContainer,
  HeaderContainer,
  Title,
  AddButton,
  StyledGridContainer,
  CancelButton,
  SaveButton,
  ErrorMessage,
} from './FormPessoaJuridica.styles';

import { PessoaJuridica } from '../types';
import InputText from './InputField';

interface FormPessoaJuridicaProps {
  form: PessoaJuridica;
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
}> = ({ columns, gap = '16px', marginTop = '5px', children }) => (
  <StyledGridContainer columns={columns} gap={gap} marginTop={marginTop}>
    {children}
  </StyledGridContainer>
);

const FormPessoaJuridicaComponent: React.FC<FormPessoaJuridicaProps> = ({
  form,
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
        <Title>Pessoa Jurídica</Title>
        {!isEditable && <AddButton onClick={handleAddClick}>Adicionar</AddButton>}
      </HeaderContainer>

      {/* Razão Social */}
      <GridContainer columns="1fr">
        <InputText
          label="Razão Social"
          name="razao_social"
          value={form.razao_social || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
      </GridContainer>

      {/* Nome Fantasia e CNPJ */}
      <GridContainer columns="1fr 1fr" gap="20px">
        <InputText
          label="Nome Fantasia"
          name="nome_fantasia"
          value={form.nome_fantasia || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
        <InputText
          label="CNPJ"
          name="cnpj"
          value={form.cnpj || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
      </GridContainer>

      {/* Inscrição Estadual e Municipal */}
      <GridContainer columns="1fr 1fr" gap="20px">
        <InputText
          label="Inscrição Estadual"
          name="inscricao_estadual"
          value={form.inscricao_estadual || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
        <InputText
          label="Inscrição Municipal"
          name="inscricao_municipal"
          value={form.inscricao_municipal || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
      </GridContainer>

      {/* Email e Telefone Comercial */}
      <GridContainer columns="1fr 1fr" gap="20px">
        <InputText
          label="Email"
          name="email"
          value={form.email || ''}
          onChange={handleChange}
          disabled={!isEditable}
          type="email"
        />
        <InputText
          label="Telefone Comercial"
          name="telefone_comercial"
          value={form.telefone_comercial || ''}
          onChange={handleChange}
          disabled={!isEditable}
          type="tel"
        />
      </GridContainer>

      {/* Endereço, Complemento, Bairro */}
      <GridContainer columns="1fr 1fr 1fr" gap="20px">
        <InputText
          label="Endereço"
          name="endereco"
          value={form.endereco || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
        <InputText
          label="Complemento"
          name="complemento"
          value={form.complemento || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
        <InputText
          label="Bairro"
          name="bairro"
          value={form.bairro || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
      </GridContainer>

      {/* Cidade, Estado, País, CEP */}
      <GridContainer columns="1fr 1fr 1fr 1fr" gap="20px">
        <InputText
          label="Cidade"
          name="cidade"
          value={form.cidade || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
        <InputText
          label="Estado"
          name="estado"
          value={form.estado || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
        <InputText
          label="País"
          name="pais"
          value={form.pais || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
        <InputText
          label="CEP"
          name="cep"
          value={form.cep || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
      </GridContainer>

      {/* Responsável */}
      <GridContainer columns="1fr">
        <InputText
          label="Responsável"
          name="responsavel"
          value={form.responsavel || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
      </GridContainer>

      {/* Observações */}
      <GridContainer columns="1fr" marginTop="24px">
        <InputText
          label="Observações"
          name="observacoes"
          value={form.observacoes || ''}
          onChange={handleChange}
          disabled={!isEditable}
          textarea
          rows={4}
          maxLength={2500}
        />
      </GridContainer>

      {/* Botões */}
      {isEditable && (
        <div
          style={{
            display: 'flex',
            marginTop: 20,
            gap: 16,
            flexShrink: 0,
            justifyContent: 'flex-end',
          }}
        >
          <CancelButton onClick={handleCancel} disabled={loading}>
            Cancelar
          </CancelButton>
          <SaveButton onClick={handleSave} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </SaveButton>
        </div>
      )}

      {/* Mensagem de erro */}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormularioContainer>
  );
};

export default React.memo(FormPessoaJuridicaComponent);
