import React from "react";
import { Container, TableHeader, TableRow } from "./styles";
import { TableProps } from "./types";

const Table = ({ tableHeader, tableRows }: TableProps) => {
  return (
    <Container>
      {tableHeader.map((row) => (
        <TableHeader>{row}</TableHeader>
      ))}

      {tableRows.map((row) => {
        if (row === "string") {
          return <TableRow>{row}</TableRow>;
        }
      })}
    </Container>
  );
};

export default Table;
