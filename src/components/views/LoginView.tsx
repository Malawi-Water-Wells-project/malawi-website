import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";

const LoginView: React.FC = () => {
  return (
    <>
      <div className="login-container">
        <Card className="login-card">
          <Card.Body>
            <h3>Login</h3>
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Link to={{ pathname: "/MainView" }}>
                <Button className="form-button" variant="primary">
                  Create
                </Button>
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default LoginView;
