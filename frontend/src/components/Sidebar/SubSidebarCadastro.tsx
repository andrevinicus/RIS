import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastroSubItems } from './cadastroSubItems';
import { SubNav, SubNavButton, SubSidebarContainer } from '../StyleComponents/StyleComponents';
 // ajuste o caminho se necessário

interface SubSidebarCadastroProps {
  collapsed: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onItemClick?: () => void; // desmarca menu principal
}

const SubSidebarCadastro: React.FC<SubSidebarCadastroProps> = ({
  collapsed,
  onClose,
  onMouseEnter,
  onMouseLeave,
  onItemClick,
}) => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
    onClose();          // fecha submenu
    onItemClick?.();    // desmarca menu principal
  };

  return (
    <SubSidebarContainer
      $collapsed={collapsed}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <SubNav>
        {cadastroSubItems.map(({ key, label, path }) => (
          <SubNavButton key={key} onClick={() => handleClick(path)}>
            {label}
          </SubNavButton>
        ))}
      </SubNav>
    </SubSidebarContainer>
  );
};

export default SubSidebarCadastro;
