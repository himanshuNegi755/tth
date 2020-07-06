import React, {Component} from 'react';
import './signInForm.css';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import GoogleButton from './googleButton';

class SignInForm extends Component{
    
    constructor(props){
        super(props);
        
        this.state={
            show: false
        };
        
    }
    
    static getDerivedStateFromProps(props, state) {
        return {show: props.showForm };
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
                                    LOG IN
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="div-for-google-button-in-sign-in-form form-group">
                                    <GoogleButton />
                                </div>
                                
                                <div>
                                    <hr className="hr-rule-for-google-button"/>
                                </div>
                                <form className="log-in-form" id="sign-in-form">
                                        <div className="form-group">
                                            <label htmlFor="inputEmailForLogIn">Email address</label>
                                            <input type="email" className="form-control" id="inputEmailForLogIn" aria-describedby="emailHelp"/>
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputPasswordForLogIn">Password</label>
                                            <input type="password" className="form-control" id="inputPasswordForLogIn"/>
                                        </div>
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="checkForLogIn"/>
                                            <label className="form-check-label" htmlFor="checkForLogIn">Keep Me Log In</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary log-in-button">Log In</button>
                                    </form>
                            </Modal.Body>
                        </Modal>
                        
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInForm;