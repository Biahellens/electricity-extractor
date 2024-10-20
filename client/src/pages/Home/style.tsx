import styled from "styled-components";

export const Content = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const Title = styled.text`
  font-size: 1.6rem;
  font-weight: 700;
  color: #A9A9A9
`
export const ContentCards = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem 7.5rem;
`

export const Card = styled.div`
  display: flex;
  width: 35%;
  height: 20rem;
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: -4px 6px 6.8px -4px rgba(0, 0, 0, 0.17);
`