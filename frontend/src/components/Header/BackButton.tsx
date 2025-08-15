// src/components/BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #ffffff; /* branco igual à grid */
  border: 1px solid #dcdcdc; /* borda suave */
  color: #0505058f;
  font-size: 14px;
  font-weight: 550;
  border-radius: 0; /* quadrado */
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 12px;

  &:hover {
    background-color: #f5f5f5; /* leve hover cinza */
    box-shadow: none; /* sem sombra */
    text-decoration: none;
  }

  &:active {
    background-color: #eaeaea;
  }
`;

interface BackButtonProps {
  to: string;
  convenioNome?: string; // nome do convênio
  label?: string;        // sobrescreve manualmente
}

const BackButton: React.FC<BackButtonProps> = ({ to, convenioNome, label }) => {
  const navigate = useNavigate();

  const buttonText = label || (convenioNome ? ` ${convenioNome}` : '← Voltar');

  return (
    <StyledButton onClick={() => navigate(to)}>
      {buttonText}
    </StyledButton>
  );
};

export default BackButton;
