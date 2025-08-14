// src/pages/ConvenioPage.tsx
import React from 'react';
import { useConvenio } from './ConvenioGrid/useConvenio';
import ConvenioGrid from './ConvenioGrid/ConvenioGrid';
import FormConvenio from './ConvenioForms/FormConvenio';

const ConvenioPage: React.FC = () => {
  const {
    convenios,
    form,
    selected,
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
  } = useConvenio();

  // Função para passar filtros para a grid
  const handleFilterChange = (novosFiltros: { nome?: string; codigo?: string; pessoaJuridica?: string }) => {
    setFiltros(novosFiltros);
  };

  return (
    <>
      {!isEditable && !selected && (
        <ConvenioGrid
          convenios={convenios}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
          onFilterChange={handleFilterChange}
        />
      )}

      {(isEditable || selected) && (
        <FormConvenio
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

export default ConvenioPage;
