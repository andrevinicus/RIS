import React, { useState } from 'react';
import {
  AddButton, CancelButton, SaveButton, ErrorMessage,
  FormularioContainer, HeaderContainer, StyledGridContainer, Title
} from '../../../../components/StyleComponents/FormStyles';
import { ConvenioGridItem } from '../ConvenioGrid/ConvenioGrid';
import InputConvenio from './InputConvenio';
import ModalPessoaJuridica from '../../../../Modal/ModalPessoaJuridica';
import { LookupContainer, LookupLabel, LookupWrapper, LookupIdInput, LookupNameWrapper, LookupNameInput, LookupSelectButton } from '../../../../components/StyleComponents/Lookup';

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
  <StyledGridContainer columns={columns} gap={gap} marginTop={marginTop}>
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
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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

      {/* Primeira linha */}
      <GridContainer columns="minmax(80px, 1fr) minmax(200px, 2fr)">
        <InputConvenio
          label="Código"
          name="id"
          value={form?.codigo || ''}
          disabled onChange={() => { }} />
        <InputConvenio
          label="Nome"
          name="nome"
          value={form.nome || ''}
          onChange={handleInputChange('nome')}
          disabled={!isEditable}
        />
      </GridContainer>

      {/* Segunda linha */}
      <GridContainer columns="repeat(auto-fit, minmax(150px, 1fr))">
        <InputConvenio
          label="Contato"
          name="contato"
          value={form.contato || ''}
          onChange={handleInputChange('contato')}
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
          name="codigoAns" // certifique-se que existe na interface
          value={(form as any).codigoAns || ''}
          onChange={handleInputChange('codigoAns' as keyof ConvenioGridItem)}
          disabled={!isEditable}
        />
      </GridContainer>

      {/* Pessoa Jurídica */}
      <GridContainer columns="1fr">
        <LookupContainer>
          <LookupLabel>Pessoa Jurídica</LookupLabel>
          <LookupWrapper>
            <LookupIdInput
              $isEditable={isEditable}
              type="text"
              name="pessoaJuridicaId"
              value={form.pessoaJuridicaId || ''}
              onChange={(e) => handleChange('pessoaJuridicaId', e.target.value)}
              disabled={!isEditable}
            />
            <LookupNameWrapper>
              <LookupNameInput
                type="text"
                value={pessoaJuridicaNome}
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
