import React, { useState } from 'react';
import {
  AddButton, CancelButton, SaveButton, ErrorMessage,
  FormularioContainer, HeaderContainer, StyledGridContainer, Title
} from '../../../../components/StyleComponents/FormStyles';
import { ConvenioGridItem } from '../ConvenioGrid/ConvenioGrid';
import InputConvenio from './InputConvenio';
import ModalPessoaJuridica from '../../../../Modal/ModalPessoaJuridica';
import { LookupContainer, LookupLabel, LookupWrapper, LookupIdInput, LookupNameWrapper, LookupNameInput, LookupSelectButton } from '../../../../components/StyleComponents/Lookup';
import SelectConvenio from './SelectConvenio';

interface FormConvenioProps {
  form: Partial<ConvenioGridItem>;
  isEditable: boolean;
  loading: boolean;
  error: string | null;
  handleChange: (field: keyof ConvenioGridItem, value: any) => void;
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
  <StyledGridContainer $columns={columns} $gap={gap} $marginTop={marginTop}>
    {children}
  </StyledGridContainer>
);

const FormConvenio: React.FC<FormConvenioProps> = ({
  form,
  isEditable,
  loading,
  error,
  handleChange,
  handleAddClick,
  handleCancel,
  handleSave,
}) => {
  const [isModalPessoaJuridicaOpen, setIsModalPessoaJuridicaOpen] = useState(false);

const handleInputChange =
  (field: keyof ConvenioGridItem) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      handleChange(field, e.target.value);

  const pessoaJuridicaNome = form.pessoaJuridica?.nome_fantasia ?? '';

  return (
  <FormularioContainer>
    <HeaderContainer>
      <Title>{form.id ? 'Editar Convênio' : 'Novo Convênio'}</Title>
      {!isEditable && (
        <AddButton onClick={handleAddClick}>Adicionar</AddButton>
      )}
    </HeaderContainer>

    {/* Primeira linha: Código e Nome */}
    <GridContainer columns="minmax(50px, 0.4fr) minmax(200px, 2fr)">
      <InputConvenio
        label="Código"
        name="codigo"
        value={form?.codigo || ''}
        disabled
        onChange={() => {}}
      />
      <InputConvenio
        label="Nome"
        name="nome"
        value={form.nome || ''}
        onChange={handleInputChange('nome')}
        disabled={!isEditable}
      />
    </GridContainer>

    {/* Segunda linha: Contato, Telefone, Código ANS */}
    <GridContainer columns="repeat(auto-fit, minmax(150px, 1fr))">
      <InputConvenio
        label="Email"
        name="email"
        value={form.email || ''}
        onChange={handleInputChange('email')}
        disabled={!isEditable}
      />
      <InputConvenio
        label="Telefone"
        name="telefone"
        value={form.telefone || ''}
        onChange={handleInputChange('telefone')}
        disabled={!isEditable}
      />
      <InputConvenio
        label="Código ANS"
        name="codigoAns"
        value={form.codigoAns || ''}
        onChange={handleInputChange('codigoAns' as keyof ConvenioGridItem)}
        disabled={!isEditable}
      />
    </GridContainer>


    {/* Quarta linha: Tipo e Forma de Pagamento */}
    <GridContainer columns="1fr 1fr">
      <SelectConvenio
        label="Tipo"
        name="tipo"
        value={form.tipo || ''}
        onChange={(e) => handleChange('tipo', e.target.value)}
        disabled={!isEditable}
        options={[
          { value: '', label: 'Selecione' },
          { value: 'particular', label: 'Particular' },
          { value: 'publico', label: 'Público' },
          { value: 'cortesia', label: 'Cortesia' },
        ]}
      />
      <SelectConvenio
        label="Forma de Pagamento"
        name="formaPagamento"
        value={form.formaPagamento || ''}
        onChange={(e) => handleChange('formaPagamento', e.target.value)}
        disabled={!isEditable}
        options={[
          { value: '', label: 'Selecione' },
          { value: 'privado', label: 'Privado' },
          { value: 'publico', label: 'Público' },
          { value: 'particular', label: 'Particular' },
        ]}
      />
    </GridContainer>

    {/* Pessoa Jurídica */}
    <GridContainer columns="0.4fr 1fr">
      <InputConvenio
        label="Site"
        name="site"
        value={form.site || ''}
        onChange={handleInputChange('site')}
        disabled={!isEditable}
      />
      <LookupContainer>
        <LookupLabel>Pessoa Jurídica</LookupLabel>
        <LookupWrapper>
          <LookupIdInput
            $isEditable={isEditable}
            type="text"
            name="pessoaJuridicaId"
            value={form.pessoaJuridicaId ?? form.pessoaJuridica?.codigo ?? ''}
            onChange={(e) => handleChange('pessoaJuridicaId', e.target.value)}
            disabled={!isEditable}
          />
          <LookupNameWrapper>
            <LookupNameInput
              type="text"
              value={form.pessoaJuridica?.nome_fantasia ?? ''}
              disabled
            />
            <LookupSelectButton
              $isEditable={isEditable}
              type="button"
              onClick={() => setIsModalPessoaJuridicaOpen(true)}
              disabled={!isEditable}
            >
              🔍
            </LookupSelectButton>
          </LookupNameWrapper>
        </LookupWrapper>
      </LookupContainer>
    </GridContainer>
   {/* Quinta linha: Observações */}
    <GridContainer columns="1fr">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <InputConvenio
          label="Observações"
          name="obs"
          value={form.obs || ''}
          onChange={(e) => {
            const value = e.target.value.slice(0, 1000); // Limite de 1000 caracteres
            handleChange('obs', value);
          }}
          disabled={!isEditable}
          textarea
        />
        <div style={{ alignSelf: 'flex-end', fontSize: 12, color: '#666', marginTop: 4 }}>
          {(form.obs?.length || 0)}/1000
        </div>
      </div>
    </GridContainer>

    {/* Modal para selecionar Pessoa Jurídica */}
    <ModalPessoaJuridica
      isOpen={isModalPessoaJuridicaOpen}
      onRequestClose={() => setIsModalPessoaJuridicaOpen(false)}
      onSelecionarPessoaJuridica={(pessoa) => {
        handleChange('pessoaJuridicaId', pessoa.codigo);
        handleChange('pessoaJuridica', pessoa);
        setIsModalPessoaJuridicaOpen(false);
      }}
    />

    {/* Botões de ação */}
    {isEditable && (
      <div style={{ display: 'flex', marginTop: 16, gap: 16 }}>
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

export default FormConvenio;
