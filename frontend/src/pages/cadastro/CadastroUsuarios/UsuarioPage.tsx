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
    showForm,
    loading,
    error,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleCancel,
    handleChange,
    handleSave,
    handleSelecionarPessoaFisica,
  } = useUsuario();

  return (
    <div style={{ padding: 3, margin: '0 auto' }}>
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
        />
      )}

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UsuarioPage;
