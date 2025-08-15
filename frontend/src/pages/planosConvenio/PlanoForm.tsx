import React, { useState } from 'react';

import { savePlano } from './ServicePlano';
import { Plano } from '../../types/planos';

interface PlanoFormProps {
  plano?: Plano | null;
  onSaved: () => void;
  onCancel: () => void;
}

const PlanoForm: React.FC<PlanoFormProps> = ({ plano, onSaved, onCancel }) => {
  const [form, setForm] = useState<Partial<Plano>>(plano || {});

  const handleChange = (field: keyof Plano, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    await savePlano(form);
    onSaved();
  };

  return (
    <div style={{ marginTop: 20, padding: 20, background: '#fff', borderRadius: 8 }}>
      <div>
        <label>Código</label>
        <input type="text" value={form.codigo || ''} onChange={(e) => handleChange('codigo', e.target.value)} />
      </div>
      <div>
        <label>Nome</label>
        <input type="text" value={form.nome || ''} onChange={(e) => handleChange('nome', e.target.value)} />
      </div>
      <div>
        <label>Valor</label>
        <input type="number" value={form.valor || 0} onChange={(e) => handleChange('valor', Number(e.target.value))} />
      </div>
      <div>
        <label>Status</label>
        <select value={form.status || 'ativo'} onChange={(e) => handleChange('status', e.target.value)}>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
      </div>
      <button onClick={handleSave}>Salvar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default PlanoForm;
