import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input } from '../components/Input'
import { searchBeer } from '../actions'
import { StyledInputRegion } from '../Styles'
import { Redirect } from 'react-router'

export class ConnectedBeerSearch extends Component {
  //local state manages text inputs
  //redirect allows pressing enter on search to force route change
  state = { search: '', redirect: '' }

  //if redirected and now route matches state, set redirect to false , and reset serach bar value
  componentDidUpdate() {
    if (
      this.state.redirect &&
      this.props.currentRoute === `/Search/${this.state.search}`
    ) {
      this.setState({ redirect: '', search: '' })
    }
  }

  searchBeer = () => {
    this.props.dispatch(searchBeer(this.state.search))
    //redirect forces route update
    this.setState({ redirect: true })
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  //this function renders the redirect only if the current route doesn't match the search value
  redirectMe = () => {
    if (
      this.state.redirect &&
      this.props.currentRoute !== `/Search/${this.state.search}`
    ) {
      return <Redirect push to={`/Search/${this.state.search}`} />
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.redirectMe()}
        <StyledInputRegion>
          <Input
            name="search"
            value="Search"
            inputFunction={this.handleInputChange}
            link={`/Search/${this.state.search}`}
            buttonText="Search"
            handleClick={this.searchBeer}
            placeholder={'Search for a beer'}
            inputValue={this.state.search}
          />
        </StyledInputRegion>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  items: state.items.items,
})

const BeerSearch = connect(mapStateToProps)(ConnectedBeerSearch)

export default BeerSearch
