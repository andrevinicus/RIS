// ContextMenu.tsx
import React, { useEffect, useRef } from 'react';

export interface ContextMenuOption {
  label: string;
  onClick: () => void;
}

interface ContextMenuProps {
  visible: boolean;
  x: number;
  y: number;
  options: ContextMenuOption[];
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ visible, x, y, options, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!visible) return null;

  // Ajuste de posição para não vazar da tela
  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    top: y,
    left: x,
    background: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    borderRadius: 6,
    padding: 4,
    zIndex: 1000,
    minWidth: 140,
    transition: 'opacity 0.2s ease',
  };

  // Ajusta se o menu estiver fora da viewport
  if (menuRef.current) {
    const { innerWidth, innerHeight } = window;
    const rect = menuRef.current.getBoundingClientRect();
    if (x + rect.width > innerWidth) menuStyle.left = innerWidth - rect.width - 8;
    if (y + rect.height > innerHeight) menuStyle.top = innerHeight - rect.height - 8;
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999,
      }}
    >
      <div ref={menuRef} style={menuStyle} onClick={(e) => e.stopPropagation()}>
        {options.map((opt, index) => (
          <div
            key={index}
            onClick={() => {
              opt.onClick();
              onClose();
            }}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              borderRadius: 4,
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContextMenu;
