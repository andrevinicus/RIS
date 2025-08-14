// src/pages/PessoaJuridicaPage.tsx

import React from 'react';
import PessoaJuridicaGrid from './PessoaJuridicaGrid/PessoaJuridicaGrid';
import FormPessoaJuridica from './PessoaJuridicaForms/FormPessoaJuridica/FormPessoaJuridica';
import { usePessoaJuridica } from './PessoaJuridicaGrid/usePessoaJuridica';

const PessoaJuridicaPage: React.FC = () => {
  const {
    empresas,
    form,
    selected,            // igual PF
    isEditable,
    loading,
    error,
    handleChange,
    handleAddClick,
    handleCancel,
    handleEditClick,
    handleDelete,
    handleSave,
    setFiltros,
  } = usePessoaJuridica();

  // Função para passar filtros para a grid
  const handleFilterChange = (novosFiltros: { nome?: string; cnpj?: string; codigo?: string }) => {
    setFiltros(novosFiltros);
  };

  return (
    <>
      {!isEditable && !selected && (
        <PessoaJuridicaGrid
          empresas={empresas}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
          onFilterChange={handleFilterChange}
        />
      )}

      {(isEditable || selected) && (
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

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default PessoaJuridicaPage;
