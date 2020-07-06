import React, {Component} from 'react';
import axios from "axios";
import NavbarBeforeSignIn from './navbarBeforeSignIn';
import SearchBar from './searchBar';
import Filters from './filters';
import Product from './product';
import './shopPage.css'
import Footer from './footer'

/*import HttpService from '../services/http-service';
const http = new HttpService();*/

class ShopPage extends Component{
    
    constructor(props) {
        super(props);
        
        this.state = { products:[]};
        
        //this.loadData = this.loadData.bind(this);
        this.productList = this.productList.bind(this);
        //this.loadData();
        this.lowToHigh = this.lowToHigh.bind(this);
        this.highToLow = this.highToLow.bind(this);
        this.showPopup = this.showPopup.bind(this);
    }
    
    /*loadData = () => {
        http.getProductsWithType(this.props.match.params.productType).then(data => {
            this.setState({products: data})
        }, err => {
            
        });
        //console.log(this.props.match.params.productType);
    }*/
    
    showPopup() {
        var popup = document.getElementById("myPopup");
        popup.style.display = 'inline-block';
        setTimeout(function(){ popup.style.display = 'none' }, 1000);
    }
    
    lowToHigh = () => {
        axios.get(`http://localhost:5000/product/order/asce/productType/${this.props.match.params.productType}`)
        .then(res => {
            this.setState({products: res.data})
        })
    }
    
    highToLow = () => {
        axios.get(`http://localhost:5000/product/order/desc/productType/${this.props.match.params.productType}`)
        .then(res => {
            this.setState({products: res.data})
        })
    }
    
    componentDidMount() {
        axios.get(`http://localhost:5000/product/productType/${this.props.match.params.productType}`)
        .then(res => {
            this.setState({products: res.data})
        })
    } 
    
    productList = () => {
        const list = this.state.products.map((product) =>
            <div className="col-sm-3" key={product._id}>
                <Product productId={product._id}  productName={product.productName} productType={product.productType} productSize={product.productSize ? product.productSize : '1000'} productImgUrl={product.productImgUrl} productPrice={product.productPrice ? product.productPrice : product.productSizeVariation[0].full} showPopup={this.showPopup}/>
            </div>
        );
        
        return (list);
    }
    
    render() {
        return (
            <div className="shopPage-container">
                <NavbarBeforeSignIn />
                <SearchBar />
                
                <div className="popup-div">
                    <span className="popup-text" id="myPopup">Product Added to Cart!!</span>
                </div>
            
                <div className="row product-row">
                    <div className="col-sm-12 col-md-3 filters-col">
                        <Filters lth={this.lowToHigh} htl={this.highToLow}/>
                    </div>
                    <div className="col-sm-12 col-md-9 product-card-col">
                        <div className="row">
                            {this.productList()}
                        </div>
                    </div>
                </div>
                
                <Footer />
                
            </div>
        );
    }
}

export default ShopPage;