import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Styledh2,
    StyledGrid,
    StyledLinkButton,
    StyledPaddedDiv
} from './Styles'

export class DisplayResults extends Component {
    //Results are sent in props and displayed
    render() {
    if (this.props.results.length > 0) {
        const options = this.props.results
            .map(d => d)
            .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
            .map((r, i) => {
                return <StyledLinkButton key={i}>
                    <Link to = {`../beers/${r.name}`}>
                    {r.name}
                    </Link> 
                    </StyledLinkButton>

            })
        return ( 
            <StyledPaddedDiv>
        <Styledh2>{this.props.match.params.categoryName}</Styledh2>
        <StyledGrid> {options} </StyledGrid>
        </StyledPaddedDiv> )
        //Catch if there are no matches
    } else {
        return <Styledh2>No beers match your search criteria.</Styledh2>
    }
}
}
export default DisplayResults