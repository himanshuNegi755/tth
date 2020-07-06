import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import './searchBar.css';

class SearchBar extends Component{
    
    constructor(props) {
        super(props);
        
        this.state = {
            suggestions: [],
            text: '',
            productSuggestions: [],
            productNameList: [],
            redirect: false,
            productId: ''
        }
        
        this.renderContent = this.renderContent.bind(this);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.suggestionSelected = this.suggestionSelected.bind(this);
        this.renderSuggestions = this.renderSuggestions.bind(this);
    }
    
    renderContent = () => {
        switch(this.props.user) {
            case null:
                return (
                    <React.Fragment>
                        <div className="btn-div">
                            <h5>Loading</h5>
                        </div>
                    </React.Fragment>
                )
            case false:
                return (
                    <React.Fragment>
                        <div>
                        </div>
                        
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment>
                        <a href="http://localhost:3000/cart">
                            <Button variant="primary" type="submit" className="cart-button">
                                <b>CART</b>
                            </Button>
                        </a>
                    </React.Fragment>
                )
                
        }
    }
    
    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.state.productNameList.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({ suggestions, text: value }));
        console.log(this.state.suggestions);
    }
    
    suggestionSelected (value) {
        this.setState({text: value, suggestions: []})
        
        axios.get(`http://localhost:5000/product/product-id-from-name/${value}`)
        .then(res => {
            console.log(res.data[0]._id);
            this.setState({redirect: true,
                          productId: res.data[0]._id})
            //return <Redirect to={`http://localhost:5000/product/${res.data[0]._id}`} />;
        })
        
    }
    
    renderSuggestions () {
        if(this.state.suggestions.length === 0) {
            return null;
        }
        return (            
            <ul>
                {this.state.suggestions.map((item) => <li onClick = {() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }
    
    
    componentDidMount() {
        axios.get('http://localhost:5000/product/for-autoComplete')
        .then(res => {
            this.setState({productSuggestions: res.data})
            //console.log(this.state.productSuggestions)
            var arr = [];
            //console.log(this.state.productSuggestions[0].productName)
            for(var i=0; i<this.state.productSuggestions.length; i++) {
                arr[i] = this.state.productSuggestions[i].productName
            }
            this.setState({productNameList: arr})
            //console.log(this.state.productNameList)
        })
    }
    
    render() {
        
        if(this.state.redirect) {
            return <Redirect to = {`/product/${this.state.productId}`}/>
        }
        
        return (
            <div className="div-to-hold-searchBar">
                <InputGroup className="mb-3 searchBar">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"><span role="img" aria-label="search">🔍</span></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="What can we help you find?"
                        aria-label="What can we help you find"
                        onChange={this.onTextChanged}
                        type='text'
                        value={this.state.text}
                    />
                </InputGroup>
                 
                <div className="mb-3 suggestion">
                    {this.renderSuggestions()}
                </div>
                
                {this.renderContent()}
                
                    
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}


export default connect(mapStateToProps)(SearchBar);