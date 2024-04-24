import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 20.4375rem;
  margin: 2rem 1rem;
`;

const Label = styled.label`
  border: none;
  border-bottom: 0.125rem solid #6867c8;
  width: 100%;
  height: 2rem;
  font-size: 1.0625rem;
  padding-left: 0.875rem;
  line-height: 147.6%;
  padding-top: 0.825rem;
  padding-bottom: 0.5rem;
  color: #6867c8;

  input {
    border: none;
    border-bottom: 0.125rem solid #6867c8;
    width: 100%;
    height: 2rem;
    font-size: 1.0625rem;
    padding-left: 0.875rem;
    line-height: 147.6%;
    padding-top: 0.825rem;
    padding-bottom: 0.5rem;

    &:focus {
      outline: none;
    }

    span {
    }
  }
`;

export { Container, Label };
