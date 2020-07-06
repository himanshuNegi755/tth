import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import './summaryOfOrder.css';


class SummaryOfOrder extends Component{
    render() {
        return (
            <div>
                <h2>Subtotal ({this.props.noOfItems} items):</h2>
                <h3>Rs. {this.props.totalPrice}</h3>
                <Button className="buy-button" onClick={() => {this.props.placeOrder()}}>
                    Proceed to Buy
                </Button>
            </div>
        );
    }
}

export default SummaryOfOrder;