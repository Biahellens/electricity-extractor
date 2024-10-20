import styled from "styled-components";

export const Content = styled.div`
  width: 100vw;
  height: 3.4rem;
  background: #2E8B57;
  top: 0;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0.5rem;
`

export const Title = styled.text`
  font-size: 1.4rem;
  color: #ffffff;
  font-weight: bold;
`

export const BtnRedirect = styled.button`
  font-size: 1rem;
  color: #ffffff;
  font-weight: bold;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center ;
  cursor: pointer;
`

export const ContainerBack = styled.div`
  width: 20rem;
  height: 3.4rem;
  background: #228B22;
  right: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 768px) {
    width: 10rem;
  }
`