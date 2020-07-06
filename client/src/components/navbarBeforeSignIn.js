import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './navbarBeforeSignIn.css';
import SignInForm from './signInForm';
import SignUpForm from './signUpForm';
import SignInButton from './signInButton';
import SignUpButton from './signUpButton';
import ProfileButton from './profileButton';


class NavbarBeforeSignIn extends Component{
    
    constructor(props) {
        super(props);
        
        this.state = { showForm: false, showSignUpForm: false, productType: "Beer"}
        this.changeStateFunction = this.changeStateFunction.bind(this)
        this.login = this.login.bind(this);
        this.changeStateFucntionForSignUpForm = this.changeStateFucntionForSignUpForm.bind(this)
        this.signUp = this.signUp.bind(this)        
        this.renderContent = this.renderContent.bind(this);
    }
    
    changeStateFunction() {
        this.setState({showForm: !this.state.showForm})
        this.login()
    }
    
    login() {
        return(
            <SignInForm 
                showForm = {this.state.showForm}
                triggerParentUpdate = {this.changeStateFunction}
                />
        );
    }
    
    changeStateFucntionForSignUpForm() {
        this.setState({showSignUpForm: !this.state.showSignUpForm})
        this.signUp()
    }
    
    signUp() {
        return(
            <SignUpForm 
                showSignUpForm = {this.state.showSignUpForm}
                triggerParentUpdate = {this.changeStateFucntionForSignUpForm}
                />
        );
    }
    
    
    renderContent = () => {
        switch(this.props.user) {
            case null:
                return (
                    <React.Fragment>
                        <div className="btn-div">
                            <h5>Loading</h5>
                        </div>
                    </React.Fragment>
                )
            case false:
                return (
                    <React.Fragment>
                        <div className="btn-div">
                            <SignInButton buttonFunction={this.changeStateFunction} />
                        </div>
                        
                        <div className="btn-div">
                            <SignUpButton buttonFunction={this.changeStateFucntionForSignUpForm}/>
                        </div>
                        
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment>
                        <div className="btn-div">
                            <ProfileButton userImage={this.props.user.userImage}/>
                        </div>
                    </React.Fragment>
                )
                
        }
    }
    
    
    render() {
        
        return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="http://localhost:3000/"><b>ThekaToHome</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="http://localhost:3000/shop/Beer">Beer</Nav.Link>
                            <Nav.Link href="http://localhost:3000/shop/Wine">Wine</Nav.Link>
                            <Nav.Link href="http://localhost:3000/shop/Sprites">Sprites</Nav.Link>
                            <Nav.Link href="#gifts">Gifts</Nav.Link>
                            <NavDropdown title="More" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#mixers"><b>Mixers</b></NavDropdown.Item>
                                <NavDropdown.Item href="#snacks"><b>Snacks</b></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#blog"><b>Blog</b></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            
                            {this.renderContent()}
                        
                        </Nav>
                    </Navbar.Collapse>
                    
                    {this.state.showForm ? this.login() : null}
                    {this.state.showSignUpForm ? this.signUp() : null}
                
                </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(NavbarBeforeSignIn);