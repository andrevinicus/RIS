import React from 'react';
import { ConvenioGridItem } from '../ConvenioGrid/ConvenioGrid';


interface FormConvenioProps {
  form: Partial<ConvenioGridItem>;
  isEditable: boolean;
  loading: boolean;
  error: string | null;
  handleChange: (field: keyof ConvenioGridItem, value: any) => void;
  handleCancel: () => void;
  handleSave: () => void;
  handleAddClick: () => void;
}

const FormConvenio: React.FC<FormConvenioProps> = ({
  form,
  isEditable,
  loading,
  error,
  handleChange,
  handleCancel,
  handleSave,
}) => {
  return (
    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px' }}>
      <h2>{form.id ? 'Editar Convênio' : 'Novo Convênio'}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Código:</label>
        <input
          type="text"
          value={form.codigo || ''}
          onChange={(e) => handleChange('codigo', e.target.value)}
          disabled={!isEditable}
        />
      </div>

      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={form.nome || ''}
          onChange={(e) => handleChange('nome', e.target.value)}
          disabled={!isEditable}
        />
      </div>

      <div>
        <label>Contato:</label>
        <input
          type="text"
          value={form.contato || ''}
          onChange={(e) => handleChange('contato', e.target.value)}
          disabled={!isEditable}
        />
      </div>

      <div>
        <label>Telefone:</label>
        <input
          type="text"
          value={form.telefone || ''}
          onChange={(e) => handleChange('telefone', e.target.value)}
          disabled={!isEditable}
        />
      </div>

      <div style={{ marginTop: '16px' }}>
        <button onClick={handleSave} disabled={loading || !isEditable}>
          Salvar
        </button>
        <button onClick={handleCancel} style={{ marginLeft: '8px' }}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default FormConvenio;
