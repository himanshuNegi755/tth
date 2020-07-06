import React, {Component} from 'react';
import './profileButton.css';

class ProfileButton extends Component{
    constructor(props) {
        super(props);
     
        this.state = { showOptions: false}
        this.showDropDownOptions = this.showDropDownOptions.bind(this);
    }
    
    showDropDownOptions() {
        if(this.state.showOptions) {
            return(
                <React.Fragment>
                    <div className="drop-down-options">
                        <ul>
                            <li><a href="/profile"><b>Profile</b></a></li>
                            <li><a href="/order"><b>Orders</b></a></li>
                            <li><a href="/cart"><b>Cart</b></a></li>
                            <li><a href="http://localhost:5000/auth/logout"><b>Logout</b></a></li>
                        </ul>
                    </div>
                </React.Fragment>
            )
        }
        
    }
    
    render() {        
        return (
            <div>
                <img className="profile-image-button" alt="profile" src={this.props.userImage} onClick = {() => {this.setState({showOptions: !this.state.showOptions})}}/>
                
                {this.showDropDownOptions()}
            </div>
        );
    }
}



export default ProfileButton;