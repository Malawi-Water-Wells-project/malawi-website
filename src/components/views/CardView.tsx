import React from 'react';
import { Link } from 'react-router-dom';
import {Card, Button, Row, Col, Container} from 'react-bootstrap';
import { PeopleFill, LockFill } from 'react-bootstrap-icons';
import '../views/Views.css';


const CardView: React.FC = () => {
    return (
        <>
        <div className="title-container">
            <h1>Malawi Wells</h1>
        </div>
        <Container className="card-container">
            <Row>
                <Col>
                    <Card className="text-center card">
                        <Card.Body>
                            <Card.Title>Manage Tribes</Card.Title>
                            <Card.Text>
                                <PeopleFill size={96}/>
                            </Card.Text>
                            <Link  to={{pathname: '/TribeView'}}>
                            <Button variant="primary">Go to tribes</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="text-center card">
                        <Card.Body>
                            <Card.Title>Manage Accounts</Card.Title>
                            <Card.Text>
                                <LockFill size={96}/>
                            </Card.Text>
                            <Link  to={{pathname: '/CardView'}}>
                            <Button variant="primary">Go to tribes</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>   
        </Container>
        </>
        
    );
};

export default CardView;