
import PessoaFisicaGrid from './PessoaFisicaGrid/PessoaFisicaGrid';
import FormPessoaFisica from './PessoaFisicaFormulario/FormPessoaFisica';
import { usePessoaFisica } from './usePessoaFisica';

const PessoaFisicaPage = () => {
  const {
    pessoas,
    form,
    selected,
    isEditable,
    loading,
    error,
    calcularIdade,
    handleAddClick,
    handleCancel,
    handleChange,
    handleSave,
    handleDelete,
    handleEditClick,
    setFiltros,
  } = usePessoaFisica();

  // Para passar filtro atual no grid
  const handleFilterChange = (novosFiltros: { nome?: string; cpf?: string; codigo?: string }) => {
    setFiltros(novosFiltros);
  };

  return (
    <>
      {!isEditable && !selected && (
        <PessoaFisicaGrid
          pessoas={pessoas}
          onAddClick={handleAddClick}
          onFilterChange={handleFilterChange}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
        />
      )}

      {(isEditable || selected) && (
        <FormPessoaFisica
          form={form}
          idade={calcularIdade(form.birth_date)}
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

export default PessoaFisicaPage;
