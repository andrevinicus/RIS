import React from 'react';

interface FiltersProps {
  filtrosInternos: Record<string, string>;
  filterPlaceholders?: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePesquisar: () => void;
}

function Filters({ filtrosInternos, filterPlaceholders = {}, handleChange, handlePesquisar }: FiltersProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      {Object.keys(filtrosInternos).map(key => (
        <input
          key={key}
          type="text"
          name={key}
          placeholder={filterPlaceholders[key] || `Filtrar por ${key}`}
          value={filtrosInternos[key]}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
      ))}
      <button onClick={handlePesquisar}>Pesquisar</button>
    </div>
  );
}

export default Filters;
