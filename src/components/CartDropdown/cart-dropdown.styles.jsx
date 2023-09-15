import styled from "styled-components";

export const StyledCartDropdownContainer = styled.div`
  position: absolute;
  width: 24rem;
  height: 34rem;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid black;
  background-color: white;
  top: 9rem;
  right: 4rem;
  z-index: 5;
`;

export const StyledEmptyMessage = styled.p`
  font-size: 1.8rem;
  margin: 5rem auto;
`;

export const StyledCartItems = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;
