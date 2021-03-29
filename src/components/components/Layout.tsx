import React, { useState } from "react";
import { Container, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";

const Layout: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar color="primary" dark expand="md" className="mb-4">
        <NavbarBrand>Malawi Admin</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      </Navbar>
      <Container fluid>{children}</Container>
    </>
  );
};

export default Layout;
