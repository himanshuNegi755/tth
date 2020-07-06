import React, {Component} from 'react';
import { Button } from 'react-bootstrap'
import './signInButton.css';

class SignInButton extends Component{
    
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
                <Button variant="primary" type="submit" className="sign-in-button" onClick={this.showFormFunction}>
                    LOG IN
                </Button>
            </div>
        );
    }
}

export default SignInButton;