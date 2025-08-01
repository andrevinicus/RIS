import React from 'react';


import { Unidade } from '../HookTypes/types';
import InputText from './FormUnidadeInputs';
import {  CancelButton, ErrorMessage, FormularioContainer, HeaderContainer, SaveButton, StyledGridContainer, Title } from './FormUnidade.styles';

interface FormUnidadeProps {
    form: Partial<Unidade>;
    isEditable: boolean;
    loading: boolean;
    error: string | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleCancel: () => void;
    handleSave: () => void;
    
    
}

const GridContainer: React.FC<{columns: string; gap?: string; marginTop?: string; children: React.ReactNode;}> = ({ columns, gap = '16px', marginTop = '16px', children }) => (
    <StyledGridContainer columns={columns} gap={gap} marginTop={marginTop}>{children}</StyledGridContainer>
);

const FormUnidade: React.FC<FormUnidadeProps> = ({ form, isEditable, loading, error, handleChange, handleCancel, handleSave,
    
  }) => {
    return (
        <FormularioContainer>
            <HeaderContainer>
                <Title>Cadastro de Unidade</Title>
            </HeaderContainer>

            <GridContainer columns="1fr 1fr">
                <InputText label="Nome Reduzido" name="nomeReduzido" value={form.nomeReduzido || ''} onChange={handleChange} disabled={!isEditable} />
                <InputText label="Nome" name="nome" value={form.nome || ''} onChange={handleChange} disabled={!isEditable} />
            </GridContainer>

            <GridContainer columns="1fr 1fr">
                <InputText label="CNPJ" name="cnpj" value={form.cnpj || ''} onChange={handleChange} disabled={!isEditable} />
                <InputText label="Ramo de Atividade" name="ramoAtividade" value={form.ramoAtividade || ''} onChange={handleChange} disabled={!isEditable} />
            </GridContainer>

            <GridContainer columns="1fr 1fr">
                <InputText label="Razão Social" name="razaoSocial" value={form.razaoSocial || ''} onChange={handleChange} disabled={!isEditable} />
                <InputText label="Inscrição Estadual" name="inscricaoEstadual" value={form.inscricaoEstadual || ''} onChange={handleChange} disabled={!isEditable} />
            </GridContainer>

            <GridContainer columns="1fr 1fr">
                <InputText label="Inscrição Municipal" name="inscricaoMunicipal" value={form.inscricaoMunicipal || ''} onChange={handleChange} disabled={!isEditable} />
                <InputText label="Registro Junta Comercial" name="regJuntaComercial" value={form.regJuntaComercial || ''} onChange={handleChange} disabled={!isEditable} />
            </GridContainer>

            <GridContainer columns="1fr 1fr">
                <InputText label="Registro Cartório" name="regCartorio" value={form.regCartorio || ''} onChange={handleChange} disabled={!isEditable} />
                <InputText label="Status" name="status" value={form.status || ''} onChange={handleChange} disabled={!isEditable} />
            </GridContainer>

            <GridContainer columns="1fr 1fr">
                <InputText label="Despacho Data" name="despachoData" value={form.despachoData ? String(form.despachoData).slice(0, 10) : ''} onChange={handleChange} disabled={!isEditable} type="date" />
                <InputText label="Nome Responsável" name="nomeResponsavel" value={form.nomeResponsavel || ''} onChange={handleChange} disabled={!isEditable} />
            </GridContainer>

            <GridContainer columns="1fr 1fr">
                <InputText label="CPF Responsável" name="cpfResponsavel" value={form.cpfResponsavel || ''} onChange={handleChange} disabled={!isEditable} />
                <InputText label="Código Cargo" name="codCargo" value={form.codCargo || ''} onChange={handleChange} disabled={!isEditable} />
            </GridContainer>

            <GridContainer columns="1fr 1fr">
                <InputText label="Cargo Responsável" name="cargoResponsavel" value={form.cargoResponsavel || ''} onChange={handleChange} disabled={!isEditable} />
                <InputText label="CNES" name="cnes" value={form.cnes || ''} onChange={handleChange} disabled={!isEditable} />
            </GridContainer>

            <GridContainer columns="1fr 1fr 1fr">
                <InputText label="Logradouro" name="logradouro" value={form.logradouro || ''} onChange={handleChange} disabled={!isEditable} />
                <InputText label="Endereço" name="endereco" value={form.endereco || ''} onChange={handleChange} disabled={!isEditable} />
                <InputText label="Número" name="numero" value={form.numero || ''} onChange={handleChange} disabled={!isEditable} />
            </GridContainer>

            <GridContainer columns="1fr 1fr 1fr">
                <InputText label="Bairro" name="bairro" value={form.bairro || ''} onChange={handleChange} disabled={!isEditable} />
                <InputText label="CEP" name="cep" value={form.cep || ''} onChange={handleChange} disabled={!isEditable} />
                <InputText label="Código IBGE" name="codIbge" value={form.codIbge || ''} onChange={handleChange} disabled={!isEditable} />
            </GridContainer>

            <GridContainer columns="1fr 1fr 1fr">
                <InputText label="Município" name="municipio" value={form.municipio || ''} onChange={handleChange} disabled={!isEditable} />
                <InputText label="Telefone" name="telefone" value={form.telefone || ''} onChange={handleChange} disabled={!isEditable} type="tel" />
                <InputText label="Email" name="email" value={form.email || ''} onChange={handleChange} disabled={!isEditable} type="email" />
            </GridContainer>

            <GridContainer columns="1fr" marginTop="24px">
                <label style={{ color: isEditable ? '#000' : '#777' }}>
                    <input type="checkbox" name="matriz" checked={!!form.matriz} disabled={!isEditable} onChange={(e) => handleChange({...e, target: {...e.target, name: 'matriz', value: e.target.checked}} as any)} />{' '}Matriz (marca se esta unidade é matriz)
                </label>
            </GridContainer>

            {isEditable && (
                <div style={{ display: 'flex', marginTop: 20, gap: 16, flexShrink: 0, justifyContent: 'flex-end' }}>
                    <CancelButton onClick={handleCancel} disabled={loading}>Cancelar</CancelButton>
                    <SaveButton onClick={handleSave} disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</SaveButton>
                </div>
            )}

            {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormularioContainer>
    );
};

export default React.memo(FormUnidade);
