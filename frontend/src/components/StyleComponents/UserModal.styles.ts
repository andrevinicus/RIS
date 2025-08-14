import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.05);  /* Fundo semi-transparente */
  z-index: 1400;
  cursor: default;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  width: 280px;
  background-color: #2e4db1ff; /* azul escuro */
  color: white;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 1500;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  span {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const SectionLabel = styled.div`
  font-weight: 600;
  font-size: 13px;
  opacity: 0.8;
  margin-bottom: 4px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 6px 8px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

export const InfoText = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

export const LinksContainer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LinkButton = styled.button`
  background: none;
  border: none;
  color: white;
  text-align: left;
  cursor: pointer;
  font-size: 14px;

  &:last-child {
    font-weight: 600;
    margin-top: 12px;
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 16px;
  color: #fff; /* Se quiser */
`;