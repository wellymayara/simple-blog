import styled from "styled-components";

const Container = styled.button`
  padding: 0.375rem 1rem;
  border: 0;
  border-radius: 5px;
  transition: all 0.5s;
  background-color: #f6f6f6;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  cursor: pointer;
  color: #595959;
  margin: auto 10px;

  &:hover {
    opacity: 0.8;
    color: #5555;
  }
`;

export { Container };
