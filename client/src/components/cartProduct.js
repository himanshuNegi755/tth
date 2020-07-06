import React, {Component} from 'react';
import axios from "axios";
import {Image, Button, ListGroup} from 'react-bootstrap';
import './cartProduct.css';

//import HttpService from '../services/http-service';

//const http = new HttpService();

class CartProduct extends Component{
    
    constructor(props) {
        super(props);
        
        this.deleteProductFromCartFunction =  this.deleteProductFromCartFunction.bind(this);
    }
    
    deleteProductFromCartFunction = () => {
        /*http.deleteProductFromCart(this.props.cartProductId).then(data => {
            console.log(data);
            this.props.loadCartAgain();
        }, err => {
            
        });*/
        
        axios.put('http://localhost:5000/cart/product/delete/', {
                title: this.props.currentUser,
                productId: this.props.cartProductId  
            })
        .then(res => {
            console.log(res.data);
            this.props.loadComponentAgain();
            
        })   
    }
    
    render() {
        return (
            <ListGroup.Item className="list-group-item-for-cart">
                <div className="row">
                    <div className="col-sm-2 col-md-3 col-for-image">
                        <a href={"http://localhost:3000/product/" + this.props.cartProductId}>
                            <Image className="cart-product-image image-fluid" src={this.props.cartProductImgUrl}  />
                        </a>
                    </div>
                    <div className="col-sm-9 col-md-9 col-for-details">
                        <a href={"http://localhost:3000/product/" + this.props.cartProductId} className="cart-product-name">
                            <h3 className="cart-product-name-heading">{this.props.cartProductName}</h3>
                        </a>
                        <a href={"http://localhost:3000/shop/" + this.props.cartProductType}  className="cart-product-type">
                            <h5 className="cart-product-type-heading">{this.props.cartProductType}</h5>
                        </a>
                        <h5 className="cart-product-volume-heading">{this.props.cartProductSize}</h5>
                        <h5 className=" cart-product-price">₹ {this.props.cartProductPrice}</h5>

                        <Button variant="danger" className="remove-button" onClick={() => {this.deleteProductFromCartFunction()}}>Remove</Button>

                    </div>
                </div>
            </ListGroup.Item>
        );
    }
}

export default CartProduct;