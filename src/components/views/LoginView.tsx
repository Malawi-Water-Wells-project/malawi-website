import React from 'react';
import { Link } from 'react-router-dom';
import {
    InputGroup,
    Input,
    Button,
    Label,
    Row,
    Col,
    Container,
    Card,
    CardBody} from 'reactstrap';
import '../views/Views.css';
    
const HomeView: React.FC = () => {
    return (
        <>
            <div className="title-container">
                <h1>Malawi Well API</h1>
            </div>
            <div className="login-container">
                <Card className="login-card">
                    <CardBody>
                        <h3>Login</h3>
                            <form>
                                <Label>Username:</Label>
                                <InputGroup>
                                    <Input type="text" name="latitude"></Input>
                                </InputGroup>
                                <Label>Password:</Label>
                                <InputGroup>
                                    <Input type="password" name="longitude"></Input>
                                </InputGroup>
                                <Link  to={{pathname: '/MainView'}}>
                                <Button className="form-button" variant="primary">Create</Button>
                                </Link>
                            </form>
                    </CardBody>
                </Card> 
            </div>
        </>
        
    );
};

export default HomeView;