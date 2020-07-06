import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import './cartPage.css';
import axios from "axios";
import NavbarBeforeSignIn from './navbarBeforeSignIn';
import GradientSection from './gradientSection';
import CartProduct from './cartProduct';
import Footer from './footer'
import {ListGroup} from 'react-bootstrap';
import SummaryOfOrder from './summaryOfOrder';

//import HttpService from '../services/http-service';
//const http = new HttpService();


class CartPage extends Component{
    
    constructor(props) {
        super(props);
        
        this.state = { cartProducts:[], cartLength: 0, cartProductTotalPrice: 0, userEmailInState: null, loggedIn: true };
        
        //this.loadData =  this.loadData.bind(this);
        //this.loadData();
        this.cartProductList = this.cartProductList.bind(this);
        this.loadComponentAgain = this.loadComponentAgain.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        
    }
    
    /*loadData = () => {
        http.getCart().then(data => {
            //console.log(data[0].products.length);
            this.setState({cartProducts: data[0].products})
            this.setState({cartLength: data[0].products.length})
            var x = 0;
            
            for (var i=0; i<this.state.cartLength; i++){
                x+=data[0].products[i].productPrice;
            }
            this.setState({cartProductTotalPrice: x})
            
        }, err => {
            
        });
    }*/
    
    loadComponentAgain() {
        axios.get(`http://localhost:5000/cart/${this.state.userEmailInState}`)
                    .then(res => {
                        //console.log(data[0].products);
                        this.setState({cartProducts: res.data[0].products});
                        this.setState({cartLength: res.data[0].products.length});
                        var x = 0;
            
                        for (var i=0; i<this.state.cartLength; i++){
                            x+=res.data[0].products[i].productPrice;
                        }
                        this.setState({cartProductTotalPrice: x})
                    })
    }
    
    componentDidUpdate(prevProps, prevState) {
        //console.log(prevProps.user)
        //console.log(prevState.userEmailInState)
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
                                //console.log(this.props.user)
                                axios.get(`http://localhost:5000/cart/${this.state.userEmailInState}`)
                                .then(res => {
                                    //console.log(res.data[0].products);
                                    this.setState({cartProducts: res.data[0].products});
                                    this.setState({cartLength: res.data[0].products.length});
                                    var x = 0;

                                    for (var i=0; i<this.state.cartLength; i++){
                                        x+=res.data[0].products[i].productPrice;
                                    }
                                    this.setState({cartProductTotalPrice: x})
                                })
                            )    
                    }
                }

            }
        } catch(err) {
            this.setState({loggedIn: false})
        }
    } 
    
    componentDidMount() {
        //console.log((this.props.user) ? true : false) 
        switch(this.props.user) {
            case null:
                return (<div></div>)
            default:
                return (
                    //console.log(this.props.user)
                    axios.get(`http://localhost:5000/cart/${this.state.userEmailInState}`)
                    .then(res => {
                        //console.log(res.data[0].products);
                        this.setState({cartProducts: res.data[0].products});
                        this.setState({cartLength: res.data[0].products.length});
                        var x = 0;
            
                        for (var i=0; i<this.state.cartLength; i++){
                            x+=res.data[0].products[i].productPrice;
                        }
                        this.setState({cartProductTotalPrice: x})
                    })
                )    
        }            
    }
    
    placeOrder() {
        
        var arr = []
        for(var i=0; i<this.state.cartLength; i++){
            arr[i]=this.state.cartProducts[i]._id;
        }
        //console.log(arr);
        
        axios.put('http://localhost:5000/order/add', {
            title: this.state.userEmailInState,
            totalAmount: this.state.cartProductTotalPrice,
            order: arr
            })
            .then(res => {
                console.log(res.data);
            })
        
        axios.put('http://localhost:5000/cart/product/empty-all/', {
                title: this.state.userEmailInState
            })
        .then(res => {
            console.log(res.data);
            this.setState({cartProducts:[]})
            this.loadComponentAgain();
            
        })
        
    }
    
    cartProductList = () => {
        const list = this.state.cartProducts.map((cartProduct) =>
            <div  key={cartProduct._id}>
                                                     
                <CartProduct cartProductId={cartProduct._id} cartProductName={cartProduct.productName} cartProductType={cartProduct.productType} cartProductSize={cartProduct.productSize} cartProductImgUrl={cartProduct.productImgUrl} cartProductPrice={cartProduct.productPrice} currentUser={this.state.userEmailInState} loadComponentAgain={this.loadComponentAgain}/>
                                                     
            </div>
        );
        
        return (list);
    }
    
    
    render() {
        if(!this.state.loggedIn) {
            return <Redirect to='/' />;
        }
        
        return (
            <div className="container-for-cart-component">
                <NavbarBeforeSignIn />
                <GradientSection />
                <div className="container-for-cart-product">
                    <div>
                        <h2 className="cart-heading">Shopping Cart</h2>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-9">
                            <hr className="hr-tag"/>
                            <ListGroup>
                                {this.cartProductList()}
                            </ListGroup>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <SummaryOfOrder totalPrice={this.state.cartProductTotalPrice} noOfItems={this.state.cartLength} placeOrder={this.placeOrder}/>
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

export default connect(mapStateToProps)(CartPage);