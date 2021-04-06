import React from "react";
import { Button, Form, Card } from "react-bootstrap";
import useLogin from "../../hooks/UseLogin";

const LoginView: React.FC = () => {
  const {
    username,
    password,
    setUsername,
    setPassword,
    handleSubmit,
    isWorking,
    error,
  } = useLogin();

  return (
    <div className="login-container">
      <Card className="card--login card--shadow fade-in">
        <Card.Body>
          <h3>Login</h3>
          {error && <p className="error fade-in">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={isWorking}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginView;
