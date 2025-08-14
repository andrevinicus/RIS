// UsuarioPage.tsx
import React from 'react';
import UsuarioGrid from './UsuarioGrid/UsuarioGrid';
import UsuarioForm from './UsuarioForms/FormUsuario';
import { useUsuario } from './useUsuario';

const UsuarioPage: React.FC = () => {
  const {
    usuarios,
    unidades,
    form,
    showForm, // ou isEditable
    loading,
    error,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleCancel,
    handleChange,
    handleSave,
    handleSelecionarPessoaFisica,
    handleSelecionarUnidade,
  } = useUsuario();

  return (
    <>
      {!showForm && (
        <UsuarioGrid
          usuarios={usuarios}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onFilterChange={() => {}}
          onDeleteClick={handleDeleteClick}
        />
      )}

      {showForm && (
        <UsuarioForm
          form={form}
          isEditable={true}
          unidades={unidades}
          loading={loading}
          error={error}
          handleChange={handleChange}
          handleCancel={handleCancel}
          handleAddClick={handleAddClick}
          handleSave={handleSave}
          onSelecionarPessoaFisica={handleSelecionarPessoaFisica}
          onSelecionarUnidade={handleSelecionarUnidade}
        />
      )}

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default UsuarioPage;
