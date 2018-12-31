import React, { Component } from 'react';
import FilterLink from '../components/FilterLink'
import { StyledPaddedDiv } from '../Styles'

export default class TextContent extends Component {
    render() {
        return ( <StyledPaddedDiv >
            <h1>{this.props.title}</h1>
            <p>{this.props.text}</p>              
            <FilterLink 
                color={this.props.color}
                size={this.props.size}
                filter={this.props.filter}
                value={this.props.buttonText}
                />
            </StyledPaddedDiv>
        )
    };
};