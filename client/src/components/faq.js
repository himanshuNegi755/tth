import React, {Component} from 'react';
import './faq.css';

class FAQ extends Component{
    
    constructor(props) {
        super(props);
        
        this.showFAQAns = this.showFAQAns.bind(this);
    }
    
    showFAQAns(id_value) {
        var faqAns = document.getElementById(id_value);
        if(faqAns.style.display === 'none'){
            faqAns.style.display = 'block';
        } else {
            faqAns.style.display = 'none';
        }
    }
    
    
    render() {
        return (
            <div>
                <div>
                    <h2>FAQs</h2>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <ul className="faq-ul">
                            <li className="faq-list-item" onClick={() => {this.showFAQAns('1')}}>
                                * In which cities does ThekaToHome deliver?
                                <div className="ans" style={{display: 'none'}} id="1">
                                    We delivery on-demand in Delhi, Kolkata and Odisha.
                                </div>
                            </li>
                            <li className="faq-list-item" onClick={() => {this.showFAQAns('2')}}>
                                * Why aren’t you in my city?
                                <div className="ans" style={{display: 'none'}} id="2">
                                    We’re rapidly expanding and we’ll let you know when we arrive in yours.
                                </div>
                            </li>
                            <li className="faq-list-item" onClick={() => {this.showFAQAns('3')}}>
                                * What are ThekaToHome&#39;s hours?
                                <div className="ans" style={{display: 'none'}} id="3">
                                    We’re open for 30-minute delivery:
                                    <ul>
                                        <li>
                                            8am-2am
                                        </li>
                                    </ul>
                                    <div>
                                        * You can also schedule an order in advance.
                                    </div>
                                    <div>
                                        ** Hours vary by location and are subject to change.
                                    </div>
                                </div>
                            </li>
                            <li className="faq-list-item" onClick={() => {this.showFAQAns('4')}}>
                                * How much is the delivery fee?
                                <div className="ans" style={{display: 'none'}} id="4">
                                    It depends on the delivery location.
                                </div>
                            </li>
                            <li className="faq-list-item" onClick={() => {this.showFAQAns('5')}}>
                                * Do I need to be 21 to order alcohol from ThekaToHome?
                                <div className="ans" style={{display: 'none'}} id="5">
                                    Yes. We check ID, on EVERY. SINGLE. ORDER. As part of our delivery process, we have ID scanners that work for your drivers license, state ID or passport. You must be 21+ to receive your delivery.
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <ul className="faq-ul">
                            <li className="faq-list-item" onClick={() => {this.showFAQAns('6')}}>
                                * Is there an app for alcohol delivery?
                                <div className="ans" style={{display: 'none'}} id="6">
                                    Yep! We have both an Android and an iOS app. Download for free and get it poppin’.
                                </div>
                            </li>
                            <li className="faq-list-item" onClick={() => {this.showFAQAns('7')}}>
                                * How does alcohol delivery work?
                                <div className="ans" style={{display: 'none'}} id="7">
                                    You shop your favorite beer, wine, spirits and mixers. We’ll deliver your order right to your door. Make sure you have your ID handy for the delivery. We’ll scan your ID to verify you are 21 or older.
                                </div>
                            </li>
                            <li className="faq-list-item" onClick={() => {this.showFAQAns('8')}}>
                                * Will you give me free alcohol for a year?
                                <div className="ans" style={{display: 'none'}} id="8">
                                    Maybe, what’s in it for us? Tell us @SauceyApp.
                                </div>
                            </li>
                            <li className="faq-list-item" onClick={() => {this.showFAQAns('9')}}>
                                * When should I use ThekaToHome?
                                <div className="ans" style={{display: 'none'}} id="9">
                                    Whenever you Netflix and chill, birthdays, Tuesdays, bachelor parties, Thirsty Thursdays, BYOB parties, #Selfcare Sundays… literally all the time.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default FAQ;