import styled from 'styled-components';
import Modal from 'react-modal';

// Estilização do overlay e do content do react-modal
export const customModalStyles = {
  content: {
    position: 'fixed' as const,
    top: '50%' as const,
    left: '50%' as const,
    transform: 'translate(-50%, -50%)' as const,
    maxWidth: 580,
    width: '100%' as const,
    height: '90vh' as const,
    padding: 0,
    borderRadius: 12,
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)' as const,
    backgroundColor: '#fff' as const,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    overflow: 'hidden' as const,
    zIndex: 9999,
  },
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)' as const,
    zIndex: 9998,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: 20,
  },
};


export const ModalContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 16px;
  font-weight: 600;
  color: #333;
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const FilterInput = styled.input<{ width?: string }>`
  flex: ${({ width }) => (width ? '0 0 auto' : '1')};
  width: ${({ width }) => width || 'auto'};
  min-width: ${({ width }) => (width ? 'auto' : '200px')};
  padding: 10px 14px;
  border-radius: 8px;
  border: 1.5px solid #ccc;
  font-size: 16px;
`;

export const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const ListItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  font-size: 15px;
  color: #333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;

  &:hover {
    background-color: #e6f0ff;
  }
`;

export const CloseButton = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 12px 0;
  border-radius: 10px;
  border: none;
  background-color: #1976d2;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #125ea9;
  }
`;
