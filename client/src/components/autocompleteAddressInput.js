import React, {Component} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  //geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import './autocompleteAddressInput.css';


class AutocompleteAddressInput extends Component{
    
    
    constructor(props) {
        super(props);
        this.state = { address: '' };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
 
    handleChange = address => {
        this.setState({ address });
    };
 
    handleSelect = address => {
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
    };
 
    render() {
        return (
            <div className="input-group mb-3">
                
                <div className="input-group-prepend">
                    <button className="inline-btn1" onClick={() => {this.props.locationButton()}}>⦿</button>
                </div>
            
                <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                            placeholder: 'Delivery Address',
                            className: 'location-search-input autocomplete-text-view',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                            const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                                })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                            })}
                        </div>
                    </div>
                    )}
                </PlacesAutocomplete>
                
                <div className="input-group-append">
                    <button className="inline-btn2">➔</button>
                </div>
                
            </div>
        );
  }

}

export default AutocompleteAddressInput;