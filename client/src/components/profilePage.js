import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import NavbarBeforeSignIn from './navbarBeforeSignIn';
import GradientSection from './gradientSection';
import './profilePage.css';
import Footer from './footer';


class ProfilePage extends Component{    
    
    constructor(props) {
        super(props);
        
        this.state = { userName: null, userEmail: '', userImage: '', numberField: '', show: false, msg: '', otp: '',
                     verify: '', loggedIn: true}
        this.verifyNumberFunction = this.verifyNumberFunction.bind(this);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.showOTPEnterModal = this.showOTPEnterModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onTextChanged = (e) => {
        //const value = e.target.value;
        this.setState({ 
            [e.target.name]: e.target.value 
        });
    }
    
    onSubmit() {
        this.setState({show: !this.state.show})
        
        axios.get(`http://localhost:5000/verify?phoneNo=${this.state.numberField}&code=${this.state.otp}&userId=${this.props.user._id}`)
            .then(res => {
                //console.log(res)
                alert(res.data.message)
                this.setState({
                    verify: 'Verified'
                })
                
            })
        
    }
    
    showOTPEnterModal() {
    
        return (
            <React.Fragment>
                <Modal
                    show = {this.state.show}
                    backdrop="static"
                    keyboard={true}
                >
                <Modal.Header >
                    <Modal.Title>Enter OTP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.msg}
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            OTP
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control type="number" value={this.state.otp} name='otp' onChange={this.onTextChanged} placeholder="OTP" />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onSubmit}>
                        Submit
                    </Button>
                        
                </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    
}
    
    
    
    verifyNumberFunction() {
        
        if(this.state.numberField === '') {
            alert('please enter your mobile number')
        }else{
            axios.get(`http://localhost:5000/phoneNo/${this.state.numberField}`)
            .then(res => {
                this.setState({show: !this.state.show,
                              msg: res.data.message})
                this.showOTPEnterModal();
                //alert(res.data.message)
                
            })
            
            //this.setState({show: !this.state.show})
            //this.showOTPEnterModal();
            
        }
        
    }
    
    componentDidUpdate(prevProps, prevState) {
        try{
            if(!prevState.userName) {
                if(this.props.user.userPhoneNo[0]){
                this.setState({userName: this.props.user.userName,
                              userEmail: this.props.user.userEmail,
                              userImage: this.props.user.userImage,
                              numberField: this.props.user.userPhoneNo[0].value,
                              verify: 'Verified'})
                } else {
                    this.setState({userName: this.props.user.userName,
                              userEmail: this.props.user.userEmail,
                              userImage: this.props.user.userImage})
                }  
            }
        } catch(err) {
            this.setState({loggedIn: false})
        }
    }
    
    componentDidMount() {
        if(this.props.user){
            this.setState({
                userName: this.props.user.userName
            })
        }
    }
    
    render() {
        if(!this.state.loggedIn) {
            return <Redirect to='/' />;
        }
        
        return (
            <div className="parent-div">
                <NavbarBeforeSignIn />
                
                
                {this.showOTPEnterModal()}
                
                
                <div className="overlap-div">
                    <GradientSection />
                    <div className="aling-name-and-image row">
                        <div className="col image-col-div">
                            <img className="profile-image" alt="profile" src={this.state.userImage} />
                        </div>
                        <div className="col name-col-div">
                            <h5>{this.state.userName}</h5>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-9">       
                        <Form>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={this.state.userEmail} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    Phone Number ({this.state.verify})
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="number" value={this.state.numberField} name='numberField' onChange={this.onTextChanged} placeholder="Enter Phone Number without 0 or +91" />
                                </Col>
                                <Button onClick={this.verifyNumberFunction}> Verify Number </Button>
                                
                            </Form.Group>
                            
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control as="textarea" rows="3" placeholder="Address" className="address-text-area"/>
                            </Form.Group>
                            
                        </Form>
                    </div>
                    <div className="col-2">
                    </div>
                    
                </div>
                
                <Footer />
                
            </div>    
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(ProfilePage);