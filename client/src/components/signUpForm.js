import React, {Component} from 'react';
import './signUpForm.css';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import GoogleButton from './googleButton';

//import HttpService from '../services/http-service';
//const http = new HttpService();

class SignUpForm extends Component{
    
    constructor(props){
        super(props);
        
        this.state={
            show: false,
            fullName: '',
            emailAddress: '',
            password: ''
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.createUser = this.createUser.bind(this);
    }
    
    static getDerivedStateFromProps(props, state) {
        return {show: props.showSignUpForm };
    }    
    
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    /*createUser = () => {
        http.createNewUser(this.state.fullName, this.state.emailAddress, this.state.password).then(data => {
            console.log(data)
        }, err => {
            
        });
    }*/
    
    handleSubmit = (event) => {
        if(this.state.fullName === '') {
            alert('please enter your first name')
            event.preventDefault();
        }
        else if(this.state.emailAddress === '') {
            alert('please enter your email Address')
            event.preventDefault();
        }
        else if(this.state.password === '') {
            alert('please enter password')
            event.preventDefault();
        }
        /*else {
            this.createUser();
        }*/
        
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        
                        <Modal
                            size="md"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            show={this.state.show}
                            onHide={this.props.triggerParentUpdate}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    SIGN UP
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                
                                <div className="div-for-google-button-in-sign-in-form form-group">
                                    <GoogleButton />
                                </div>
                                
                                <div>
                                    <hr className="hr-rule-for-google-button"/>
                                </div>
                                
                                <Form onSubmit={this.handleSubmit}>
                                    
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" placeholder="Full Name" name='fullName' value={this.state.fullName} onChange={this.handleInputChange}/>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" name='emailAddress' value={this.state.emailAddress} onChange={this.handleInputChange}/>
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name='password' value={this.state.password} onChange={this.handleInputChange}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="sign-up-button">
                                        Submit
                                    </Button>
                                </Form>
                            
                            </Modal.Body>
                        </Modal>
                        
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpForm;