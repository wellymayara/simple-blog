import styled from "styled-components";

const Container = styled.table`
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  height: 90px;
  margin-top: 2rem;
`;

const TableRow = styled.tr``;

const TableHeader = styled.thead``;

export { Container, TableHeader, TableRow };
