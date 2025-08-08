import React from 'react';

interface SetorTabProps {
  setoresSelecionados: string[];
  setSetoresSelecionados: React.Dispatch<React.SetStateAction<string[]>>;
}

const setoresExemplo = ['Financeiro', 'RH', 'TI', 'Comercial'];

export default function SetorTab({ setoresSelecionados, setSetoresSelecionados }: SetorTabProps) {
  const toggleSelecao = (setor: string) => {
    if (setoresSelecionados.includes(setor)) {
      setSetoresSelecionados(setoresSelecionados.filter(s => s !== setor));
    } else {
      setSetoresSelecionados([...setoresSelecionados, setor]);
    }
  };

  return (
    <section style={{ marginBottom: 24 }}>
      <h3>Setores</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {setoresExemplo.map(setor => (
          <label key={setor} style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={setoresSelecionados.includes(setor)}
              onChange={() => toggleSelecao(setor)}
            />{' '}
            {setor}
          </label>
        ))}
      </div>
    </section>
  );
}
