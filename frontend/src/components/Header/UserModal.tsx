import React from 'react';
import { User } from 'lucide-react';
import {
  Header,
  InfoText,
  LinkButton,
  LinksContainer,
  ModalContainer,
  Overlay,
  SectionLabel,
  Select,
} from '../StyleComponents/UserModal.styles';

interface Unidade {
  codUnidade: string;
  nome: string;
}

interface Perfil {
  nome: string;
}

interface Setor {
  nome: string;
}

interface ModalProps {
  userInfo: {
    realname: string;
  };
  unidadeAtiva: Unidade;
  perfil: Perfil;
  setor: Setor;
  unidadesDisponiveis: Unidade[];
  onSelectUnidade: (unidade: Unidade) => void;
  onLogout: () => void;
  onClose: () => void;
}

const UserModal: React.FC<ModalProps> = ({
  userInfo,
  unidadeAtiva,
  perfil,
  setor,
  unidadesDisponiveis,
  onSelectUnidade,
  onLogout,
  onClose,
}) => {
  return (
    <>
      {/* Ao clicar no Overlay, fecha o modal */}
      <Overlay onClick={() => {
        onClose();
      }} />

      {/* Impede que o clique dentro do modal feche ele */}
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <User size={32} />
          <span>{userInfo.realname}</span>
        </Header>

        <div style={{ marginBottom: 12 }}>
          <SectionLabel>Unidade Ativa:</SectionLabel>
          <Select
            value={unidadeAtiva.codUnidade}
            onChange={(e) => {
              const selecionada = unidadesDisponiveis.find((u) => u.codUnidade === e.target.value);
              if (selecionada) onSelectUnidade(selecionada);
            }}
          >
            {unidadesDisponiveis.map((u) => (
              <option key={u.codUnidade} value={u.codUnidade}>
                {u.nome}
              </option>
            ))}
          </Select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <SectionLabel>Perfil:</SectionLabel>
          <InfoText>{perfil.nome}</InfoText>
        </div>

        <div style={{ marginBottom: 20 }}>
          <SectionLabel>Setor:</SectionLabel>
          <InfoText>{setor.nome}</InfoText>
        </div>

        <LinksContainer>
          <LinkButton onClick={() => alert('Abrir Meu cadastro')}>Meu cadastro</LinkButton>
          <LinkButton onClick={() => alert('Abrir alterar senha')}>Alterar senha</LinkButton>
          <LinkButton
            onClick={() => {
              onLogout();
              onClose();
            }}
          >
            Sair
          </LinkButton>
        </LinksContainer>
      </ModalContainer>
    </>
  );
};

export default UserModal;