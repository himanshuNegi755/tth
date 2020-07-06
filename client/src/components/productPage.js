import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import NavbarBeforeSignIn from './navbarBeforeSignIn';
import SearchBar from './searchBar';
import { Image, Button } from 'react-bootstrap';
import './productPage.css';
import Footer from './footer';


//import HttpService from '../services/http-service';
//const http = new HttpService();

class ProductPage extends Component{
    
    constructor(props) {
        super(props);
        
        this.state = { productImgUrl: '',
                       productName: '',
                       productPrice: '',
                       productSize: '',
                       productType: '',
                       productId: '',
                       quarterPrice: '',
                       halfPrice:'',
                       fullPrice:''
                     };
        
        //this.loadData =  this.loadData.bind(this);
        //this.loadData();
        this.uploadData = this.uploadData.bind(this);
        this.showPopup = this.showPopup.bind(this);
        this.showSelectionOption = this.showSelectionOption.bind(this);
    }
    
    /*loadData = () => {
        http.getProductDetailsForProductPage(this.props.match.params.productId).then(data => {
            this.setState({productDetailsWithId: data})
            console.log(this.state.productDetailsWithId[0]);
        }, err => {
            
        });
    }*/
    
    showPopup() {
        var popup = document.getElementById("myPopup");
        popup.style.display = 'inline-block';
        setTimeout(function(){ popup.style.display = 'none' }, 1000);
    }
    
    uploadData = () => {     
        
        switch(this.props.user) {
            case null:
                return ( alert('Pls wait your network is to weak') )
            case false:
                return ( alert('Need to login or signin first') )
            default:
                return (
                    axios.put('http://localhost:5000/cart/product/add', {
                        productId: this.state.productId,
                        title: this.props.user.userEmail
                    })
                    .then(res => {
                        console.log(res.data);
                        this.showPopup();
                    })
                    
                )       
        }        
}
    
    showSelectionOption() {
        if(this.state.productPrice !== '') {
            return(
                <React.Fragment>
                    <h4 className="product-size product-style">{this.state.productSize}</h4>
                    <h4 className="product-price product-style"> ₹ {this.state.productPrice}</h4>
                </React.Fragment>
            )
        } else {
            
            return(
                <React.Fragment>
                    <div className="qhf-selction row">
                        <ul className="col-md-4">
                            <li>
                                <input type="radio" id="quarter" name="size"/>
                                <lable>
                                    <div>
                                        250ml
                                    </div>
                                    <div>
                                        ₹ {this.state.quarterPrice}
                                    </div>
                                </lable>
                            </li>
                            <li>
                                <input type="radio" id="half" name="size"/>
                                <lable>
                                    <div>
                                        500ml
                                    </div>
                                    <div>
                                        ₹ {this.state.halfPrice}
                                    </div>
                                </lable>
                            </li>
                            <li className="last-list-item">
                                <input type="radio" id="full" name="size" checked/>
                                <lable>
                                    <div>
                                        1000ml
                                    </div>
                                    <div>
                                        ₹ {this.state.fullPrice}
                                    </div>
                                </lable>
                            </li>
                        </ul>
                    </div>
                </React.Fragment>
            )
        }
    }
    
    componentDidMount() {
        axios.get(`http://localhost:5000/product/product-details/${this.props.match.params.productId}`)
        .then(res => {
            console.log(res.data[0]);
            if(res.data[0].productPrice) {
                this.setState({productImgUrl: res.data[0].productImgUrl,
                        productName: res.data[0].productName,
                        productPrice: res.data[0].productPrice,
                        productSize: res.data[0].productSize,
                        productType: res.data[0].productType,
                        productId: res.data[0]._id})
            } else {
                this.setState({productImgUrl: res.data[0].productImgUrl,
                        productName: res.data[0].productName,
                        quarterPrice: res.data[0].productSizeVariation[0].quarter,
                        halfPrice: res.data[0].productSizeVariation[0].half,
                        fullPrice: res.data[0].productSizeVariation[0].full,
                        productType: res.data[0].productType,
                        productId: res.data[0]._id})
            }
        })
    }
    
    render() {
        return (
            <div className="product-page-container">
                <NavbarBeforeSignIn />
                <SearchBar />
                <div className="msg-block">
                    <p className="msg-header">Theka To Home</p>
                </div>
                <div className="popup-div">
                    <span className="popup-text" id="myPopup">Product Added to Cart!!</span>
                </div>
                <div className="row main-row">
                    <div className="col">
                    </div>
                    <div className="col-sm-12 col-md-11">
                        <div className="row main-product-holder">
                            <div className="col-sm-12 col-md-4 image-col">
                                <Image className="product-image" src={this.state.productImgUrl} />
                            </div>
                            <div className="col-sm-12 col-md-7">
                                <h1 className="product-name product-style"><b>{this.state.productName}</b></h1>
                                <h2 className="product-type product-style">{this.state.productType}</h2>
                                
                                {this.showSelectionOption()}
                                
                                <Button className="add-to-cart-button-in-product-page" onClick={() => {this.uploadData()}}>
                                    Add To Cart
                                </Button>
                            </div>
                        </div>                        
                                                
                    </div>
                    <div className="col">
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

export default connect(mapStateToProps)(ProductPage);