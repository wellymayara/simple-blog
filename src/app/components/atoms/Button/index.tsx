import { Container } from "./styles";
import ButtonProps from "./types";

const Button = ({ children }: ButtonProps, { ...props }) => (
  <Container {...props}>{children} </Container>
);

export default Button;
