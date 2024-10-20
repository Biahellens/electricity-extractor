import { useNavigate } from 'react-router-dom';
import {
  Content,
  Title,
  ContainerBack,
  BtnRedirect
} from './style'

import { RiHome7Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { UseMobile } from '@contexts/MobileContext';

export default function Header() {
  const navigate = useNavigate()
  const { isMobile } = UseMobile();

  return (
    <Content>
      <Title>Eletricity</Title>
      <ContainerBack>
        <BtnRedirect onClick={() => navigate('/dashboard')}>
          <RxDashboard style={{ marginRight: '0.5rem'}}/>
          {!isMobile && <p>Dashboard</p>}
        </BtnRedirect>
        <BtnRedirect onClick={() => navigate('/')}>
          <RiHome7Line style={{ marginRight: '0.5rem'}}/>
          {!isMobile && <p>Home</p>}
        </BtnRedirect>
      </ContainerBack>

    </Content>
  );
}