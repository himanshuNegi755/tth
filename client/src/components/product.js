import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import { Card, Button } from 'react-bootstrap';
import './product.css';

//import HttpService from '../services/http-service';
//const http = new HttpService();

class Product extends Component{
    
    constructor(props) {
        super(props);
        
        this.uploadData = this.uploadData.bind(this);
    }
    
    uploadData = () => {
        /*console.log(JSON.stringify({
                    productId: this.props.productId,
                    cartId: "5ea2ea234bedc110142194e1",
                }));*/
        /*http.addToCart(this.props.productId).then(data => {
            console.log(data);
        }, err => {
            
        });*/
        
        switch(this.props.user) {
            case null:
                return ( alert('Pls wait your network is to weak') )
            case false:
                return ( alert('Need to login or signin first') )
            default:
                return (
                    axios.put('http://localhost:5000/cart/product/add', {
                        productId: this.props.productId,
                        title: this.props.user.userEmail
                    })
                    .then(res => {
                        console.log(res.data);
                        this.props.showPopup();
                    })
                    
                )       
        }        
}
    
    
    /*componentDidMount() {
        fetch('http://localhost:5000/cart/product/add', {
            method: 'PUT',
            body: JSON.stringify({
                productId: this.props.productId,
                cartId: "5ea2ea234bedc110142194e1"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    }*/ 
    
    
    render() {
        return (
            <div>
                <Card className="product-card" style={{ width: '177px'}}>
                    <a href={"http://localhost:3000/product/" + this.props.productId}>
                        <Card.Img className="product-img" variant="top" src={this.props.productImgUrl} />
                    </a>
                    <Card.Body className="product-card-body">
                        <Button className="add-to-cart-button" variant="primary" onClick={() =>     {this.uploadData()}}>Add To Cart</Button>
                        <Card.Title className="product-card-title"><b>{this.props.productName}</b></Card.Title>
                        <Card.Text className="product-type">
                            {this.props.productType}
                        </Card.Text>
                        <Card.Text className="product-volume">
                            {this.props.productSize}
                        </Card.Text>
                        <Card.Text className="product-volume">
                            ₹ {this.props.productPrice}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(Product);