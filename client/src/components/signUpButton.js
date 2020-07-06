import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import './signUpButton.css';

class SignUpButton extends Component{
    constructor(props) {
        super(props);
        
        this.showFormFunction = this.showFormFunction.bind(this);
    }
    
    showFormFunction() {
        this.props.buttonFunction();
    }
    
    render() {
        return (
            <div>
                <Button variant="primary" type="submit" className="sign-up-button" onClick={this.showFormFunction}>
                    SIGN UP
                </Button>
            </div>
        );
    }
}

export default SignUpButton;