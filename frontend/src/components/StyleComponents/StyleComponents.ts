import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 10px 18px;
  border-radius: 8px;
  background-color: #007bff;
  border: none;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  line-height: 1.2;

  &:hover {
    background-color: #0056b3;
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 123, 255, 0.4);
  }

  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const FilterButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }

  &:focus-visible {
    outline: 3px solid rgba(40, 167, 69, 0.4);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;

  thead {
    background-color: #f8f9fa;
    /* position: sticky; top: 0; z-index: 1; */ /* opcional: fixar header */
  }

  tbody tr:hover {
    background-color: rgba(0, 123, 255, 0.05);
    cursor: pointer;
  }

  tbody tr.selected {
    background-color: rgba(0, 123, 255, 0.15);
  }
`;

export const Th = styled.th`
  padding: 14px 18px;
  border-bottom: 2px solid #dee2e6;
  text-align: left;
  color: #495057;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.3px;
  background-color: inherit;
`;

export const Td = styled.td`
  padding: 14px 18px;
  border-bottom: 1px solid #f1f1f1;
  color: #343a40;
  font-size: 14px;
  vertical-align: middle;
  line-height: 1.4;
`;

export const FilterContainer = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const InputFilter = styled.input`
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  width: clamp(180px, 25vw, 280px);
  font-size: 14px;
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }
`;

export const SidebarContainer = styled.aside<{ $collapsed: boolean }>`
  width: ${(props) => (props.$collapsed ? '70px' : '240px')};
  background-color: #1e3a8a;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 10px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  transition: width 0.3s ease, padding 0.3s ease;
  overflow: hidden;
  box-shadow: 2px 0 8px rgba(0,0,0,0.25);
`;

export const MenuButton = styled.button<{
  $collapsed?: boolean;
  $active?: boolean;
  $hover?: boolean;
}>`
  width: 100%;
  padding: ${(props) => (props.$collapsed ? '15px 0' : '12px 0')};
  border-radius: 2px;
  background-color: ${(props) => (props.$active || props.$hover ? 'rgba(255,255,255,0.2)' : 'transparent')};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$collapsed ? 'center' : 'flex-start')};
  cursor: pointer;
  margin-bottom: 14px;
  font-size: 16px;
  font-weight: ${(props) => (props.$active || props.$hover ? 700 : 500)};
  opacity: ${(props) => (props.$active || props.$hover ? 1 : 0.75)};
  transition: all 0.3s ease;

  div {
    padding-left: ${(props) => (props.$collapsed ? 0 : 20)}px;
    display: flex;
    align-items: center;
    gap: ${(props) => (props.$collapsed ? 0 : 16)}px;
    width: ${(props) => (props.$collapsed ? 'auto' : '100%')};
    justify-content: ${(props) => (props.$collapsed ? 'center' : 'flex-start')};
  }
`;


export const LogoutButton = styled.button<{ $collapsed: boolean }>`
  width: 100%;
  padding: ${(props) => (props.$collapsed ? '12px 0' : '12px 20px')};
  border-radius: 10px;
  background-color: #dc2626;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$collapsed ? 'center' : 'flex-start')};
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;

  span {
    margin-right: ${(props) => (props.$collapsed ? 0 : 16)}px;
    display: flex;
    align-items: center;
  }
`;
export const SubSidebarContainer = styled.div<{ $collapsed: boolean }>`
  position: fixed;
  top: 50px;
  left: ${(props) => (props.$collapsed ? '61px' : '232px')};
  width: 250px;
  background-color: #334e8c;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  padding: 12px 16px;
  z-index: 1200;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
`;

export const SubNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SubNavButton = styled.button`
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  background-color: transparent;
  color: white;
  border: none;
  text-align: left;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export const PessoaJuridicaContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 56px;
  justify-content: center;
`;

export const PessoaJuridicaLabel = styled.label`
  font-weight: 600;
  margin-bottom: 4px;
`;

export const PessoaJuridicaWrapper = styled.div`
  display: flex;
  height: 40px;
`;

export const PessoaJuridicaIdInput = styled.input<{ $isEditable: boolean }>`
  width: 120px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
  height: 36px;
  box-sizing: border-box;
  background-color: ${({ $isEditable }) => ($isEditable ? '#fff' : '#f5f5f5')};
`;

export const PessoaJuridicaNameWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 36px;
`;

export const PessoaJuridicaNameInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px 0 0 6px;
  border-right: none;
  background-color: #f5f5f5;
  height: 36px;
  box-sizing: border-box;
`;

export const PessoaJuridicaSelectButton = styled.button<{ $isEditable: boolean }>`
  width: 40px;
  height: 36px;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 6px 6px 0;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $isEditable }) => ($isEditable ? 'pointer' : 'not-allowed')};
`;
export const PessoaFisicaContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 56px;
  justify-content: center;
`;

export const PessoaFisicaLabel = styled.label`
  font-weight: 600;
  margin-bottom: 4px;
`;

export const PessoaFisicaWrapper = styled.div`
  display: flex;
  height: 40px;
`;

export const PessoaFisicaIdInput = styled.input<{ $isEditable: boolean }>`
  width: 120px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
  height: 36px;
  box-sizing: border-box;
  background-color: ${({ $isEditable }) => ($isEditable ? '#fff' : '#f5f5f5')};
`;

export const PessoaFisicaNameWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 36px;
`;

export const PessoaFisicaNameInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px 0 0 6px;
  border-right: none;
  background-color: #f5f5f5;
  height: 36px;
  box-sizing: border-box;
`;

export const PessoaFisicaSelectButton = styled.button<{ $isEditable: boolean }>`
  width: 40px;
  height: 36px;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 6px 6px 0;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $isEditable }) => ($isEditable ? 'pointer' : 'not-allowed')};
`;
