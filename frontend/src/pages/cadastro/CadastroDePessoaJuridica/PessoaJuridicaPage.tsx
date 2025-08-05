// src/pages/PessoaJuridicaPage.tsx

import React from 'react';
import PessoaJuridicaGrid from './PessoaJuridicaGrid/PessoaJuridicaGrid';
import FormPessoaJuridica from './PessoaJuridicaForms/FormPessoaJuridica/FormPessoaJuridica';
import { usePessoaJuridica } from './PessoaJuridicaGrid/usePessoaJuridica';

const PessoaJuridicaPage: React.FC = () => {
  const {
    empresas,              // Lista de empresas carregadas
    form,                  // Estado do formulário
    isEditable,            // Indica se o formulário está sendo exibido
    loading,               // Indicador de carregamento
    error,                 // Mensagem de erro, se houver
    handleChange,          // Handler para mudanças no formulário
    handleAddClick,        // Handler ao clicar em "Adicionar"
    handleCancel,          // Handler para cancelar edição
    handleEditClick,       // Handler para iniciar edição
    handleDelete,          // Handler para deletar
    handleSave,            // Handler para salvar
    setFiltros,            // Atualiza os filtros da grid
  } = usePessoaJuridica();

  return (
    <div style={{ padding: 16 }}>
      {/* Grid de empresas - exibida quando não está editando */}
      {!isEditable && (
        <PessoaJuridicaGrid
          empresas={empresas}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
          onFilterChange={setFiltros}
        />
      )}

      {/* Formulário de empresa - exibido quando está em modo de edição/adicionando */}
      {isEditable && (
        <FormPessoaJuridica
          form={form}
          isEditable={isEditable}
          loading={loading}
          error={error}
          handleChange={handleChange}
          handleCancel={handleCancel}
          handleSave={handleSave}
          handleAddClick={handleAddClick}
        />
      )}
    </div>
  );
};

export default PessoaJuridicaPage;
