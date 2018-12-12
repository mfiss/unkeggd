import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class BeerSearch extends Component {

  //Refers back to search function so it can use state elsewhere
  handleClick = e => {
   this.props.queryFunction(e)
   return false
  }

  render() {
    return (
     <div>
      <h3>Search for beers</h3>
      <input type="text" onKeyDown={
        e => {
          if (e.key === 'Enter') {
            this.handleClick(e);
          }
        }
      }
        placeholder="Search for..."
        onChange={e => this.props.inputFunction(e)} />
        <Link to="/SearchResults">
        <button
        onClick={e => this.handleClick(e)}>
        Search
        </button>
        </Link>
        </div>
        )
  }
}

export default BeerSearch