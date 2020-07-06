import React, {Component} from 'react';
import './footer.css';
import Logo from '../images/logo1.png';

class Footer extends Component{
    render() {
        return (
            <div>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-2 col-md-1 logo-in-footer">
                                <img src={Logo} alt="Company Logo"/>
                            </div>
                            <div className="col-sm-10 col-md-9">
                                <h4 align="left" className="contact-us">Contact Us</h4>
                                <p align="left" className="contact-us-par">For any queries please mail us and we will reply as soon as possible with a solution.</p>
                                <p align="left" className="contact-us-par">If you want to regester your Theka on our site, please Email us.</p>
                                <a href="https://www.facebook.com/"><i className="fab fa-facebook-square fa-2x" aria-hidden="true"></i> </a>
                                <a href="https://www.instagram.com/"><i className="fab fa-instagram fa-2x"></i></a>
                                <a href="mailto:thekatohome@gmail.com"><i className="fab fa-google-plus-square fa-2x"></i></a>
                                <i className="fab fa-twitter fa-2x"></i>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;