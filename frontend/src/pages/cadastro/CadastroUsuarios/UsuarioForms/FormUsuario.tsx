import React, { useState } from 'react';

import ModalUnidade from '../../../../Modal/ModalUnidade';
import ModalPessoaFisica from '../../../../Modal/ModalPessoaFisica';
import { AddButton, CancelButton, ErrorMessage, FormularioContainer, HeaderContainer, SaveButton, StyledGridContainer, Title } from '../../../../components/StyleComponents/FormStyles';
import InputText from '../../CadastroDePessoa/PessoaFisicaFormulario/InputField';
import { LookupContainer, LookupLabel, LookupWrapper, LookupIdInput, LookupNameWrapper, LookupNameInput, LookupSelectButton } from '../../../../components/StyleComponents/Lookup';
import { Usuario } from '../../../../types/usuario';
import { Unidade } from '../../../../context/AuthContext';


interface FormUsuarioProps {
  form: Usuario;
  isEditable: boolean;
  loading: boolean;
  error: string | null;
  unidades?: Unidade[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleAddClick: () => void;
  handleCancel: () => void;
  handleSave: () => void;
  onSelecionarPessoaFisica: (pessoa: { codigo: string; nome: string }) => void;
  onSelecionarUnidade: (unidade: { codUnidade: string; nomeUnidade: string }) => void;
}


// No seu componente (antes do return):

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

const FormUsuario: React.FC<FormUsuarioProps> = ({
  form,
  isEditable,
  loading,
  error,
  handleChange,
  handleAddClick,
  handleCancel,
  handleSave,
  onSelecionarPessoaFisica,
  onSelecionarUnidade,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUnidadeOpen, setIsModalUnidadeOpen] = useState(false);
  const dataCriacaoFormatada = form.dataCriacao
    ? new Date(form.dataCriacao).toLocaleDateString()
    : '';

  return (
    <FormularioContainer>
      <HeaderContainer>
        <Title>Usuário</Title>
        {!isEditable && <AddButton onClick={handleAddClick}>Adicionar</AddButton>}
      </HeaderContainer>

      {/* Nome completo e Pessoa Física */}
      <GridContainer columns="0.2fr 1fr 1fr">
        <InputText
          label="Código"
          name="id"
          value={form?.codigo || ''}
          disabled onChange={() => { }} />
        <InputText
          label="Nome Completo"
          name="nomeCompleto"
          value={form.pessoaFisicanome || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />
        <LookupContainer>
          <LookupLabel>Pessoa Física</LookupLabel>
          <LookupWrapper>
            <LookupIdInput
              $isEditable={isEditable}
              type="text"
              name="pessoaFisicaId"
              value={form.pessoaFisicaId || ''}
              onChange={handleChange}
              disabled={!isEditable}
            />
            <LookupNameWrapper>
              <LookupNameInput
                type="text"
                value={form.pessoaFisicanome || ''}
                disabled
              />
              <LookupSelectButton
                $isEditable={isEditable}
                type="button"
                onClick={() => setIsModalOpen(true)}
                disabled={!isEditable}
              >
                🔍
              </LookupSelectButton>
            </LookupNameWrapper>
          </LookupWrapper>
        </LookupContainer>

      </GridContainer>
      {/* Usuário e Senha */}
      <GridContainer columns="1fr 1fr" gap="20px">
        <InputText label="Usuário (login)" name="usuario" value={form.usuario || ''} onChange={handleChange} disabled={!isEditable} />
        <InputText label="Senha" name="senha" type="password" value={form.senha || ''} onChange={handleChange} disabled={!isEditable} />
      </GridContainer>

      {/* Email e Setor */}
      <GridContainer columns="1fr 1fr" gap="20px">
        <InputText label="Email" name="email" type="email" value={form.email || ''} onChange={handleChange} disabled={!isEditable} />
        <InputText label="Setor" name="setor" value={form.setor || ''} onChange={handleChange} disabled={!isEditable} />
      </GridContainer>

      {/* Página Inicial e Unidade Padrão */}
      <GridContainer columns="1fr 1fr">
        <InputText
          label="Página Inicial"
          name="paginaInicial"
          value={form.paginaInicial || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />

        <LookupContainer>
          <LookupLabel>Unidade Padrão</LookupLabel>
          <LookupWrapper>
            <LookupIdInput
              $isEditable={isEditable}
              type="text"
              name="unidadePadraoId"
              value={form.unidadePadraoId || ''}
              onChange={handleChange}
              disabled={!isEditable}
            />
            <LookupNameWrapper>
              <LookupNameInput
                type="text"
                value={form.unidadePadrao || ''}
                disabled
              />
              <LookupSelectButton
                $isEditable={isEditable}
                type="button"
                onClick={() => setIsModalUnidadeOpen(true)}
                disabled={!isEditable}
              >
                🔍
              </LookupSelectButton>
            </LookupNameWrapper>
          </LookupWrapper>
        </LookupContainer>
      </GridContainer>



      {/* Criação */}
      <GridContainer columns="1fr 1fr" gap="20px" marginTop="20px">
        <InputText label="Usuário Criação" name="usuarioCriacao" value={form.usuarioCriacao || ''} onChange={handleChange} disabled />
        <InputText label="Data Criação" name="dataCriacao" value={dataCriacaoFormatada} onChange={handleChange} disabled />
      </GridContainer>

      {/* Situação */}
      <GridContainer columns="1fr">
        <div style={{ marginTop: '8px' }}>
          <label style={{ fontWeight: 600 }}>Situação:</label>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <label>
              <input type="radio" name="situacao" value="ativo" checked={form.situacao === 'ativo'} onChange={handleChange} disabled={!isEditable} />
              Ativo
            </label>
            <label>
              <input type="radio" name="situacao" value="inativo" checked={form.situacao === 'inativo'} onChange={handleChange} disabled={!isEditable} />
              Inativo
            </label>
          </div>
        </div>
      </GridContainer>

      {/* Botões */}
      {isEditable && (
        <div style={{ display: 'flex', marginTop: 20, gap: 16, justifyContent: 'flex-end' }}>
          <CancelButton onClick={handleCancel} disabled={loading}>Cancelar</CancelButton>
          <SaveButton onClick={handleSave} disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</SaveButton>
        </div>
      )}

      {/* Erro */}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* Modal Pessoa Física */}
      <ModalPessoaFisica
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSelecionarPessoaFisica={(pessoa) => {
          onSelecionarPessoaFisica({
            codigo: pessoa.codigo,
            nome: pessoa.name,
          });
          setIsModalOpen(false);
        }}
      />


      {/* Modal Unidade */}
      <ModalUnidade
        isOpen={isModalUnidadeOpen}
        onRequestClose={() => setIsModalUnidadeOpen(false)}
        onSelecionarUnidade={(unidade) => {
          onSelecionarUnidade({
            codUnidade: unidade.codUnidade,
            nomeUnidade: unidade.nomeReduzido,

          });
          setIsModalUnidadeOpen(false);
        }}
      />
    </FormularioContainer>
  );
};

export default React.memo(FormUsuario);
