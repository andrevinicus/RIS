// src/pages/PessoaJuridicaPage.tsx
import React, { useState, useEffect } from 'react';
import PessoaJuridicaGrid from './PessoaJuridicaGrid/PessoaJuridicaGrid';
import FormPessoaJuridica from './PessoaJuridicaForms/FormPessoaJuridica/FormPessoaJuridica';
import { usePessoaJuridica } from './PessoaJuridicaGrid/usePessoaJuridica';


const PessoaJuridicaPage: React.FC = () => {
  const {
    empresas,
    form,
    isEditable,
    loading,
    error,
    handleChange,
    handleAddClick,
    handleCancel,
    handleSave,
    setFiltros,
  } = usePessoaJuridica();

  return (
    <div style={{ padding: 16 }}>
      {!isEditable && (
        <PessoaJuridicaGrid
          empresas={empresas}
          onAddClick={handleAddClick}
          onFilterChange={setFiltros}
        />
      )}

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
