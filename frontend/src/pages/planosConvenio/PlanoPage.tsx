import React, { useEffect, useState } from 'react';
import PlanoGrid from './PlanoGrid';
import { fetchPlanos, deletePlano } from './ServicePlano';
import { useParams } from 'react-router-dom';
import { Plano } from '../../types/planos';
import PlanoForm from './PlanoForm';

const PlanoPage: React.FC = () => {
  const { convenioId } = useParams<{ convenioId: string }>();
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [selectedPlano, setSelectedPlano] = useState<Plano | null>(null);
  const [isEditable, setIsEditable] = useState(false);

  const loadPlanos = async () => {
    const data = await fetchPlanos(convenioId);
    setPlanos(data);
  };

  useEffect(() => {
    loadPlanos();
  }, [convenioId]);

  const handleAdd = () => {
    setSelectedPlano(null);
    setIsEditable(true);
  };

  const handleEdit = (plano: Plano) => {
    setSelectedPlano(plano);
    setIsEditable(true);
  };

  const handleDelete = async (id: string) => {
    await deletePlano(id);
    await loadPlanos();
  };

  const handleFormSaved = () => {
    setIsEditable(false);
    loadPlanos();
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  return (
    <div>
      <PlanoGrid
        planos={planos}
        onFilterChange={() => {}}
        onAddClick={handleAdd}
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
      />
      {isEditable && (
        <PlanoForm
          plano={selectedPlano}
          onSaved={handleFormSaved}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default PlanoPage;
