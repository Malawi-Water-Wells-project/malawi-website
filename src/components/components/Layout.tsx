import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { AppBreadcrumbs } from "../../core/Constants";
import { useAppStateSelector } from "../../state/StateContext";
import AppNavbar from "./Navbar";

interface LayoutProps {
  breadcrumbs?: Array<{ text: string; to: string }>;
}

const BreadcrumbNav: React.FC<{ route: string }> = ({ route }) => {
  const history = useHistory();
  const user = useAppStateSelector((state) => state.user.currentUser);

  if (user === null) return null;
  if (!(route in AppBreadcrumbs)) return null;

  const breadcrumbs = AppBreadcrumbs[route as keyof typeof AppBreadcrumbs];
  if (breadcrumbs === null) return null;

  return (
    <Breadcrumb>
      {breadcrumbs.map(({ to, text }, index) => (
        <Breadcrumb.Item
          key={text}
          onClick={() => history.push(to)}
          active={index === breadcrumbs.length - 1}
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
