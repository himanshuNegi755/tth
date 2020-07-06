import React, {Component} from 'react';
import './filters.css'


class Filters extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            checkedBox: ''
        };
        
        this.onCheckChange = this.onCheckChange.bind(this);
    }
    
    onCheckChange (e) {
        if(this.state.checkedBox === e.target.name) {
            this.setState({
                checkedBox: ''
            })
        } else {
            this.setState({
                checkedBox: e.target.name
            })
        }
        
        if(e.target.name === 'lth') {
            this.props.lth();
        } else if (e.target.name === 'htl') {
            this.props.htl();
        }
    }
    
    
    render() {
        return (
            <div className="filters-container">
                    <h4 className="filters-heading">Filters</h4>
                <div>
                    <input type="checkbox" className="radio" checked={(this.state.checkedBox === 'lth') ? true : false} onChange={this.onCheckChange} name="lth" value="filter" />
                    <label htmlFor="vehicle1"> Price: Low to High</label><br />
                    <input type="checkbox" className="radio" checked={(this.state.checkedBox === 'htl') ? true : false} onChange={this.onCheckChange} name="htl" value="filter" />
                    <label htmlFor="vehicle2"> Price: High to Low</label><br />
                </div>
            </div>
        );
    }
}

export default Filters;