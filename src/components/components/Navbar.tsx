import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router";
import { Routes } from "../../core/Constants";

const AppNavbar: React.FC = () => {
  const history = useHistory();

  const navigate = (route: string) => (e: any) => {
    e.preventDefault();
    history.push(route);
  };

  return (
    <Navbar color="primary" expand="md">
      <Navbar.Brand href="/" onClick={navigate(Routes.HOME)}>
        Malawi Admin
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto" navbar>
          <NavDropdown id="navbar-tribes-dropdown" title="Tribes">
            <NavDropdown.Item onClick={navigate(Routes.CREATE_NEW_TRIBE)}>
              New Tribe
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav navbar>
          <NavDropdown
            alignRight
            id="navbar-account-dropdown"
            title="Logged in as Mr Test User"
          >
            <NavDropdown.Item>Account</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
