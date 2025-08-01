// src/pages/UnidadePage.tsx
import React from 'react';


import { useUnidade } from './HookTypes/useUnidade';
import FormUnidadeComponent from './FormUnidade/FormUnidades';
import UnidadeGrid from './UnidadeGrid/UnidadeGrid';

const UnidadePage: React.FC = () => {
  const {
    unidades,
    form,
    isEditable,
    loading,
    error,
    handleChange,
    handleAddClick,
    handleCancel,
    handleSave,
    setFiltros,
  } = useUnidade();

  return (
    <div style={{ padding: 16 }}>
      {!isEditable && (
        <UnidadeGrid
          unidades={unidades}
          onAddClick={handleAddClick}
          onFilterChange={setFiltros}
        />
      )}

      {isEditable && (
        <FormUnidadeComponent
          form={form}
          isEditable={isEditable}
          loading={loading}
          error={error}
          handleChange={handleChange}
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default UnidadePage;
