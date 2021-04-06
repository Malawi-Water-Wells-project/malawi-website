import React from "react";
import { Button, Form } from "react-bootstrap";
import useCreateTribeAdmin from "../../../hooks/UseCreateTribeAdmin";
import ReadingWidth from "../../components/ReadingWidth";

const CreateTribeAdminView: React.FC = () => {
    const {
        name,
        username,
        password,
        setName,
        setUsername,
        setPassword,
        handleSubmit,
        nameErrors,
        usernameErrors,
        passwordErrors,
    } = useCreateTribeAdmin();
    
    return (
        <>
        <ReadingWidth className="fade-in">
          <h1 className="page-heading">Create a new tribe admin</h1>
          <p className="feature-text">
            Use this form to create a new tribe admin on the system.
            <br />
          </p>
  
          <Form className="fade-in" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="admin-name">Name</Form.Label>
              <p className="hint" id="admin-name-hint">
                This is the admin's name shown on on the App.
              </p>
              {nameErrors.length > 0 && (
                <p className="error fade-in">
                  {nameErrors.map((error, index) => (
                    <>
                      {error}
                      {index < nameErrors.length - 1 && <br />}
                    </>
                  ))}
                </p>
              )}
              <Form.Control
                id="admin-name"
                value={name}
                aria-describedby="admin-name-hint"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="admin-username">Username</Form.Label>
                <p className="hint" id="admin-username-hint">
                    This is the admin's username that is used to login to the App.
                </p>
                {usernameErrors.length > 0 && (
                <p className="error fade-in">
                  {usernameErrors.map((error, index) => (
                    <>
                      {error}
                      {index < usernameErrors.length - 1 && <br />}
                    </>
                  ))}
                </p>
              )}
              <Form.Control
                id="admin-username"
                value={username}
                aria-describedby="admin-username-hint"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="admin-password">Password</Form.Label>
                <p className="hint" id="admin-password-hint">
                    This is the admin's password that is used to login to the App.
                </p>
                {passwordErrors.length > 0 && (
                <p className="error fade-in">
                  {passwordErrors.map((error, index) => (
                    <>
                      {error}
                      {index < passwordErrors.length - 1 && <br />}
                    </>
                  ))}
                </p>
              )}
              <Form.Control
                id="admin-password"
                value={password}
                controltype="password"
                aria-describedby="admin-password-hint"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" size="lg" variant="primary" className="mr-3">
              Create Tribe Admin
            </Button>
            <Button size="lg" variant="secondary">
              Cancel
            </Button>
          </Form>
        </ReadingWidth>
      </>
    )
};
export default CreateTribeAdminView;
