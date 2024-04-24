import { Container, Label } from "./styles";
import InputProps from "./types";

const Input = ({ children }: InputProps, { ...props }) => (
  <Container {...props}>
    <Label>
      teste <input />
    </Label>
  </Container>
);

export default Input;
