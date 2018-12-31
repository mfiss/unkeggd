import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input } from '../components/Input'
import { searchBeer } from '../actions'
import { StyledInputRegion } from '../Styles'

export class ConnectedBeerSearch extends Component {
    //local state manages text inputs
    state = { search: '' }

searchBeer = () => {
    this.props.dispatch(searchBeer(this.state.search))
};

handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
};
    render() {
       return(
           <StyledInputRegion>
                <Input
                    name = "search"
                    value = "Search"
                    inputFunction = {this.handleInputChange}
                    link = {"/Search/"+this.state.search}
                    buttonText = "Search"
                    handleClick={this.searchBeer}
                    placeholder={'Search for a beer'}
                />
            </StyledInputRegion>
)}
}

const mapStateToProps = state => ({
    items: state.items.items
})

const BeerSearch = connect(mapStateToProps)(ConnectedBeerSearch);

export default BeerSearch