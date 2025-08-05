import React, { useState } from 'react';

import {
  FormularioContainer,
  HeaderContainer,
  Title,
  AddButton,
  StyledGridContainer,
  CancelButton,
  SaveButton,
  ErrorMessage,
} from './FromsUsuario.Style';
import InputText from '../InputText';
import { Unidade } from '../../CadastroUnidades/HookTypes/types';
import { Usuario } from '../types';
import ModalUnidade from '../../Modal/ModalUnidade';
import ModalPessoaFisica from '../../Modal/ModalPessoaFisica';


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
  onSelecionarUnidade: (unidade: {codUnidade: string; nomeUnidade: string}) => void;
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
      <GridContainer columns="1fr 1fr" gap="20px">
        <InputText
          label="Nome Completo"
          name="nomeCompleto"
          value={form.pessoaFisicanome || ''}
          onChange={handleChange}
          disabled={!isEditable}
        />

        <div style={{ display: 'flex', flexDirection: 'column', height: '56px', justifyContent: 'center' }}>
          <label style={{ fontWeight: 600, marginBottom: 4 }}>Pessoa Física</label>
          <div style={{ display: 'flex', height: '40px' }}>
            <input
              type="text"
              name="pessoaFisicaId"
              value={form.pessoaFisicaId || ''}
              onChange={handleChange}
              disabled={!isEditable}
              style={{
                width: '120px',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '3px',
                backgroundColor: isEditable ? '#fff' : '#f5f5f5',
                height: '36px',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'flex', flex: 1, height: '36px' }}>
              <input
                type="text"
                value={form.pessoaFisicanome || ''}
                disabled
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  border: '1px solid #ccc',
                  borderRadius: '6px 0 0 6px',
                  backgroundColor: '#f5f5f5',
                  borderRight: 'none',
                  height: '36px',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                disabled={!isEditable}
                style={{
                  width: 40,
                  height: '36px',
                  border: '1px solid #ccc',
                  borderLeft: 'none',
                  borderRadius: '0 6px 6px 0',
                  backgroundColor: '#ffffff',
                  cursor: isEditable ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                🔍
              </button>
            </div>
          </div>
        </div>
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
      <GridContainer columns="1fr 1fr" gap="20px">
        <InputText label="Página Inicial" name="paginaInicial" value={form.paginaInicial || ''} onChange={handleChange} disabled={!isEditable} />

        <div style={{ display: 'flex', flexDirection: 'column', height: '56px', justifyContent: 'center' }}>
          <label style={{ fontWeight: 600, marginBottom: 4 }}>Unidade Padrão</label>
          <div style={{ display: 'flex', height: '40px' }}>
            <input
              type="text"
              name="unidadePadraoId"
              value={form.unidadePadraoId || ''}
              onChange={handleChange}
              disabled={!isEditable}
              style={{
                width: '120px',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '3px',
                backgroundColor: isEditable ? '#fff' : '#f5f5f5',
                height: '36px',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'flex', flex: 1, height: '36px' }}>
              <input
                type="text"
                value={form.unidadePadrao || ''}
                disabled
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  border: '1px solid #ccc',
                  borderRadius: '6px 0 0 6px',
                  backgroundColor: '#f5f5f5',
                  borderRight: 'none',
                  height: '36px',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setIsModalUnidadeOpen(true)}
                disabled={!isEditable}
                style={{
                  width: 40,
                  height: '36px',
                  border: '1px solid #ccc',
                  borderLeft: 'none',
                  borderRadius: '0 6px 6px 0',
                  backgroundColor: '#ffffff',
                  cursor: isEditable ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                🔍
              </button>
            </div>
          </div>
        </div>
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
