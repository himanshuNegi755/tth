import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import axios from "axios";
import './orderPage.css';
import NavbarBeforeSignIn from './navbarBeforeSignIn';
import GradientSection from './gradientSection';
import OrderProduct from './orderProduct';
import Footer from './footer';


class OrderPage extends Component{
    
    constructor(props) {
        super(props);   
        
        this.state = { orders:[], cartLength: 0, cartProductTotalPrice: 0, userEmailInState: null, loggedIn: true };
        
    }
    
    componentDidUpdate(prevProps, prevState) {
        try {
            if(!prevState.userEmailInState) {
                this.setState({userEmailInState: this.props.user.userEmail})
                //console.log(this.state.userEmailInState)

                if(this.state.userEmailInState) {
                    switch(this.props.user) {
                        case null:
                            return (<div></div>)
                        default:
                            return (
                                axios.get(`http://localhost:5000/order/${this.state.userEmailInState}`)
                                .then(res => {
                                    console.log(res.data[0].orders);
                                    this.setState({orders: res.data[0].orders})
                                    //this.setState({cartProducts: res.data[0].products});
                                    //this.setState({cartLength: res.data[0].products.length});
                                })
                            )    
                    }
                }

            }
        } catch(err) {
            this.setState({loggedIn: false})
        }
    }
    
    orderProductList = () => {
        const list = this.state.orders.map((order) =>
            <div  key={order._id}>
                                                     
                <OrderProduct orderId={order._id} orderDate={order.dateAndTime} orderStatus={order.status} orderTotalPrice={order.totalAmount} currentUser={this.state.userEmailInState} loadComponentAgain={this.loadComponentAgain}/>
                                                     
            </div>
        );
        
        return (list);
    }
    
    render() {
        if(!this.state.loggedIn) {
            return <Redirect to='/' />;
        }
        
        return (
            <div className="main-div-for-order-history">
                <NavbarBeforeSignIn />
                <GradientSection />
                <div className="container-for-order-history">
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col-lg-11">
                            <div>
                                <h1 className="order-heading">Orders</h1>
                            </div>
                            <hr className="hr-tag"/>
                            <div className="order-details">
                                {this.orderProductList()}
                            </div>
                        </div>
                        <div className="col">
                        </div>
                        
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

export default connect(mapStateToProps)(OrderPage);