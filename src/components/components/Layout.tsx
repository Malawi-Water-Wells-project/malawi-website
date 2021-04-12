import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useAppState } from "../../state/StateContext";
import AppNavbar from "./Navbar";

interface LayoutProps {
  breadcrumbs?: Array<{ text: string; to: string }>;
}

const BreadcrumbNav: React.FC<{ route: string }> = ({ route }) => {
  const history = useHistory();
  const [state] = useAppState();

  if (state.user.currentUser === null) return null;
  if (state.ui.breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb>
      {state.ui.breadcrumbs.map(({ to, text }, index) => (
        <Breadcrumb.Item
          key={text}
          onClick={() => history.push(to)}
          active={index === state.ui.breadcrumbs.length - 1}
        >
          {text}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, breadcrumbs }) => {
  const location = useLocation();

  return (
    <>
      <AppNavbar />
      <Container fluid>
        <BreadcrumbNav route={location.pathname} />
        {children}
      </Container>
    </>
  );
};

export default Layout;
