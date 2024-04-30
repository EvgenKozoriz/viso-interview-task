import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        className="justify-content-between"
      >
        <Container>
          <Navbar.Brand href="/">Products</Navbar.Brand>
        </Container>

        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Main
          </Nav.Link>
          <Nav.Link as={Link} to="/auth">
            Authorization
          </Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
