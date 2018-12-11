import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { StyledInputRegion, StyledSmallBtn, StyledInput } from './Styles'

export class Input extends Component {

  handleClick = e => {
    this.props.handleClick(e)
    return false
   }

    render() {
        return (
            <StyledInputRegion>
    <h3>{this.props.title}</h3>
      <StyledInput
      name={this.props.name}
      type="text" onKeyDown={
        e => {
          if (e.key === 'Enter') {
            this.handleClick(e);
          }
        }
      }
        onChange={e => this.props.inputFunction(e)} />
        <Link to={this.props.link}>
        <StyledSmallBtn
        name={this.props.name}
        onClick={e => this.props.handleClick(e)}>
        {this.props.buttonText}
        </StyledSmallBtn>
        </Link>
        </StyledInputRegion>
        )
    }
}

    export default Input