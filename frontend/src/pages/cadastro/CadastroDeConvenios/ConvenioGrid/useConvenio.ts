import { useState, useEffect } from 'react';
import { ConvenioGridItem } from './ConvenioGrid';
import { deleteConvenio, fetchConvenioById, fetchConvenios, saveConvenio } from '../convenioService';


export const useConvenio = () => {
  const [convenios, setConvenios] = useState<ConvenioGridItem[]>([]);
  const [form, setForm] = useState<Partial<ConvenioGridItem>>({});
  const [selected, setSelected] = useState<ConvenioGridItem | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<Record<string, string>>({});

  const loadConvenios = async () => {
    try {
      setLoading(true);
      const data = await fetchConvenios(filtros);
      setConvenios(data);
    } catch (err) {
      setError('Erro ao carregar convênios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConvenios();
  }, [filtros]);

  const handleChange = (field: keyof ConvenioGridItem, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddClick = () => {
    setForm({});
    setSelected(null);
    setIsEditable(true);
  };

  const handleCancel = () => {
    setForm({});
    setSelected(null);
    setIsEditable(false);
  };

  const handleEditClick = async (convenio: ConvenioGridItem) => {
    try {
      setLoading(true);
      const data = await fetchConvenioById(convenio.id);
      setForm(data);
      setSelected(data);
      setIsEditable(true);
    } catch {
      setError('Erro ao carregar convênio');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteConvenio(id);
      await loadConvenios();
    } catch {
      setError('Erro ao excluir convênio');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await saveConvenio(form);
      setIsEditable(false);
      setSelected(null);
      await loadConvenios();
    } catch {
      setError('Erro ao salvar convênio');
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};
