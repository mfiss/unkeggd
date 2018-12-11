import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { StyledLinkButton, StyledPaddedDiv } from './Styles'

export default class Home extends Component {
    render() {
        return ( <StyledPaddedDiv >
            <h1>{this.props.title}</h1>
            <p>{this.props.text}</p>              
            <Link to = "/Browse">
            <StyledLinkButton >
            Let's get started! 
            </StyledLinkButton>
            </Link>
            </StyledPaddedDiv>
        )
    };
};