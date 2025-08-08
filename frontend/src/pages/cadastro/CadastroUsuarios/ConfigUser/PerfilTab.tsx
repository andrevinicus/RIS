import React from 'react';

interface PerfilTabProps {
  perfisSelecionados: string[];
  setPerfisSelecionados: React.Dispatch<React.SetStateAction<string[]>>;
}

const perfisExemplo = ['Admin', 'Editor', 'Visualizador'];

export default function PerfilTab({ perfisSelecionados, setPerfisSelecionados }: PerfilTabProps) {
  const toggleSelecao = (perfil: string) => {
    if (perfisSelecionados.includes(perfil)) {
      setPerfisSelecionados(perfisSelecionados.filter(p => p !== perfil));
    } else {
      setPerfisSelecionados([...perfisSelecionados, perfil]);
    }
  };

  return (
    <section style={{ marginBottom: 24 }}>
      <h3>Perfis</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {perfisExemplo.map(perfil => (
          <label key={perfil} style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={perfisSelecionados.includes(perfil)}
              onChange={() => toggleSelecao(perfil)}
            />{' '}
            {perfil}
          </label>
        ))}
      </div>
    </section>
  );
}
