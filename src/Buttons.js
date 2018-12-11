import React, {Component} from 'react'
import { StyledSmallBtn } from './Styles'


export class EditButton extends Component {
    state={active:false}
    
    render() {
        return (
            <StyledSmallBtn onClick={this.props.handleClick}>Edit</StyledSmallBtn>
        )
    }
}

export class DeleteButton extends Component {
    
    render() {
        return (
            <StyledSmallBtn delete onClick={this.props.handleClick} value={this.props.value}>
            Delete
            </StyledSmallBtn>
        )
    
    }
}