import React, {Component} from 'react';
import axios from "axios";
import {Image, Button, ListGroup} from 'react-bootstrap';
import './orderProduct.css';

class OrderProduct extends Component{
    
    constructor(props) {
        super(props);
        
        this.repeatOrderFunction =  this.repeatOrderFunction.bind(this);
    }
    
    repeatOrderFunction = () => {
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
            <ListGroup.Item className="list-group-item-for-cart row">
                <div className="col">
                    <h2> Date: {this.props.orderDate} </h2>
                    <h4> Status: {this.props.orderStatus} </h4>
                    <h5> Name </h5>
                    <h5> Price </h5>
                    <h5> Total Price: {this.props.orderTotalPrice} </h5>

                    <Button> Repeat </Button>                                
                </div>
            </ListGroup.Item>
        );
    }
}

export default OrderProduct;