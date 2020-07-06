import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import './frontPage.css';
import DrinkingImage from '../images/drinking_alcohol6.jpg';
//import AddressInput from './addressInput';
import AutocompleteAddressInput from './autocompleteAddressInput';
import Glass from '../images/cocktail-glass.svg';
import GlassClock from '../images/sand-clock.svg';
import LocationPin from '../images/location-pin.svg';
import Tequila from '../images/tequila1.jpg'
import Whiskey from '../images/whiskey2.jpg';
import Vodka from '../images/vodka1.jpg'
import Wine from '../images/wine.jpg'
import Beer from '../images/beer1.jpg'
import FAQ from './faq';
import Footer from './footer';
import SignInForm from './signInForm';
import SignUpForm from './signUpForm';
import SignUpButton from './signUpButton';
import SignInButton from './signInButton';
import ProfileButton from './profileButton';



class FrontPage extends Component{
    
    constructor(props) {
        super(props);
        
        this.state = { showForm: false, showSignUpForm: false, productType: "Beer", latitude: '', longitude: ''}
        this.changeStateFunction = this.changeStateFunction.bind(this)
        this.login = this.login.bind(this);
        this.changeStateFucntionForSignUpForm = this.changeStateFucntionForSignUpForm.bind(this)
        this.signUp = this.signUp.bind(this)
        //this.changeProductTypeFunction = this.changeProductTypeFunction.bind(this)
        this.renderContent = this.renderContent.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.handleLocationError = this.handleLocationError.bind(this);
        this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates.bind(this);
    }
  
    //location
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    
    
    getCoordinates(position) {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        this.reverseGeocodeCoordinates();
    }
    
    handleLocationError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            default:
                alert('An unknow error occured.')
        }
}
    
    reverseGeocodeCoordinates() {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude}, ${this.state.longitude}&sensor=false&key=AIzaSyDlj7dfm7UQnkh8eBQLp8wc-8PPEodWUrQ`)
            .then(res => {
                //alert(res.results[0].formatted_address)
                console.log(res);
            })
            .catch(error => alert(error))
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
                            <SignUpButton buttonFunction={this.changeStateFucntionForSignUpForm}/>
                        </div>
                        <div className="btn-div">
                            <SignInButton buttonFunction={this.changeStateFunction} />
                        </div>
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment>
                        <div className="profile-button-in-front-page">
                            <ProfileButton userImage={this.props.user.userImage}/>
                        </div>
                    </React.Fragment>
                )
                
        }
    }
    
    render() {
        
        return (
            <div className="main-class">
                <div className="row">
                    <div className="col-md-4 home-image">
                        <img src={DrinkingImage} alt="Drinking Alcohol"/>
                        <div className="text-over-image">
                            <h5>ThekaToHome</h5>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8 col-back">
                        
                        {this.renderContent()}
                    
                        <div className="main-text-top">
                            <p align="centre" className="text-first"><b>Theka To Home</b></p>
                            <p align="centre" className="text-second">Bring The Party To Your Home</p>
                            <p className="text-third">Alcohol delivery in minutes.</p>
                        </div>
                        <AutocompleteAddressInput locationButton={this.getLocation}/>
                    </div>
                </div>
                
                <div>
                    <div className="how-to-heading">
                        <p><b>How to Get Theka At Home</b></p>
                    </div>
                    <div className="how-to-section">
                        <ul className="ul-list-main-page">
                            <li className="list-item-main-page">
                                <div className="svg-img">
                                    <img src={Glass} alt="Glass" height="80" width="60" />
                                </div>
                                <h2 className="h2-font-for-list">The whole liquor store</h2>
                                <p className="p-font-for-list">Fan favorites, seasonal booze, and local picks.</p>
                            </li>
                            
                            <li className="list-item-main-page">
                                <div className="svg-img">
                                    <img src={GlassClock} alt="Glass" height="80" width="60" />
                                </div>
                                <h2 className="h2-font-for-list">In 30 min</h2>
                                <p className="p-font-for-list">We’re already on our way—no need to get up.</p> 
                            </li>
                            
                            <li className="list-item-main-page">
                                <div className="svg-img">
                                    <img src={LocationPin} alt="Glass" height="80" width="60" />
                                </div>
                                <h2 className="h2-font-for-list">At the drop of a pin</h2>
                                <p className="p-font-for-list">We’re outside—Cheers! See you for round two.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="shop-section">
                    <div className="row shop-section-starting top-row-of2">
                        <div className="col-sm-12 col-md-4">
                            <a href="http://localhost:3000/shop/Tequila">
                                <img src={Tequila} alt="Shop Tequila"/>
                            </a>
                            <div className="text-over-image-in-shop-section">
                                <h5 className="text-inside-image-button">Shop Tequila</h5>
                            </div>
                        </div>
                        
                        <div className="col-sm-12 col-md-4">
                            <a href="http://localhost:3000/shop/Whisky">
                                <img src={Whiskey} alt="Shop Whisky"/>
                            </a>
                            <div className="text-over-image-in-shop-section">
                                <h5 className="text-inside-image-button">Shop Whisky</h5>
                            </div>
                        </div>
                        
                        <div className="col-sm-12 col-md-4">
                            <a href="http://localhost:3000/shop/Vodka">
                                <img src={Vodka} alt="Shop Vodka"/>
                            </a>
                            <div className="text-over-image-in-shop-section">
                                <h5 className="text-inside-image-button">Shop Vodka</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <a href="http://localhost:3000/shop/Wine">
                                <img src={Wine} alt="Shop Wine"/>
                            </a>
                            <div className="text-over-image-in-shop-section">
                                <h5 className="text-inside-image-button">Shop Wine</h5>
                            </div>
                        </div>
                        
                        <div className="col-sm-12 col-md-6">
                            
                                <a href="http://localhost:3000/shop/Beer">
                                    <img src={Beer} alt="Shop Beer"/>
                                </a>
                            
                            <div className="text-over-image-in-shop-section">
                                <h5 className="text-inside-image-button">Shop Beer</h5>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="reintroduction-section">
                    <div>
                        <h1 className="text-first reintroduction-heading">THEKA TO HOME</h1>
                        <h2 className="reintroduction-line2">On-demand 30-min delivery or 2-day shipping</h2>
                        <p className="reintroduction-subText">ENTER YOUR ZIP CODE TO SEE YOUR DELIVERY OPTIONS</p>
                        
                        <AutocompleteAddressInput locationButton={this.getLocation}/>
                    </div>
                </div>
                
                <div className="faq-section">
                    <div>
                        <FAQ />
                    </div>
                </div>
                
                <div>
                    <Footer />
                </div>
                
                {this.state.showForm ? this.login() : null}
                
                {this.state.showSignUpForm ? this.signUp() : null}
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}


export default connect(mapStateToProps)(FrontPage);