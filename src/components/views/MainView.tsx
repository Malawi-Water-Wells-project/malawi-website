import React, {SyntheticEvent} from 'react';
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


interface TribeViewProps {};

type TribeViewState = {
    tribeName: string;
    tribeLongitude: string;
    tribeLatitude: string;
}

class TribeView extends React.Component<TribeViewProps, TribeViewState> {

    constructor(props: TribeViewProps) {
        super(props);
        this.state = {
            tribeName:  "",
            tribeLongitude: "",
            tribeLatitude: "",
                
        };
    }

    onCreateTribeSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            // body: JSON.stringify(this.state.tribecreate)
        };
        fetch('https://malawi.inabox.uk/api/tribe/create', requestOptions)
        .then(response => response.json())
        .then(response => {console.log(response)});
    };

    onTribeAdminInput = (e: SyntheticEvent<HTMLInputElement>) => {
        const {value, name} = e.currentTarget;
        // this.setState({ tribecreate: { ...this.state.tribecreate, [name]: value } });
    };

    onTribeAdminSubmit = async (e: SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            // body: JSON.stringify(this.state.tribecreate)
        };
        fetch('https://malawi.inabox.uk/api/tribe/create', requestOptions)
        .then(response => response.json())
        .then(response => {console.log(response)});
    };


    render() {
        return (
            <>
            <div className="title-container">
                <h1>Malawi Well API</h1>
            </div>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                <h3>Create Tribe</h3>
                                <form onSubmit={this.onCreateTribeSubmit}>
                                    <Label>Name:</Label>
                                    <InputGroup>
                                        <Input onChange={(e) => this.setState({ tribeName: e.currentTarget.value })} type="text" name="name" />
                                    </InputGroup>
                                    <Label>Latitude:</Label>
                                    <InputGroup>
                                        <Input onChange={(e) => this.setState({ tribeLatitude: e.currentTarget.value })} type="text" name="latitude" />
                                    </InputGroup>
                                    <Label>Longitude:</Label>
                                    <InputGroup>
                                        <Input onChange={(e) => this.setState({ tribeLongitude: e.currentTarget.value })} type="text" name="longitude" />
                                    </InputGroup>
                                    <Button 
                                        className="form-button"
                                        variant="primary"
                                        type="submit"
                                    >
                                        Create
                                    </Button>
                                </form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                <h3>Create Tribe Admin</h3>
                                <form >
                                    <Label>Name:</Label>
                                    <InputGroup>
                                        <Input onChange={this.onTribeAdminInput} type="text" name="name"></Input>
                                    </InputGroup>
                                    <Label>Username:</Label>
                                    <InputGroup>
                                        <Input onChange={this.onTribeAdminInput} type="text" name="latitude"></Input>
                                    </InputGroup>
                                    <Label>Password:</Label>
                                    <InputGroup>
                                        <Input onChange={this.onTribeAdminInput} type="password" name="longitude"></Input>
                                    </InputGroup>
                                    <Button className="form-button" variant="primary" onClick={(e) => this.onTribeAdminSubmit(e as any)}>Create</Button>
                                </form>
                                </CardBody>
                            </Card> 
                        </Col> 
                    </Row>
                </Container>
            </>
        )
    }
}
export default TribeView;

