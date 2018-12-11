import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
    Styledh2,
    StyledGrid,
    StyledLinkButton,
    StyledPaddedDiv
} from './Styles'

export class DisplayResults extends Component {
    state = { beersInCurrentCategory:this.props.results}

    componentDidMount = () => {
        if (this.state.beersInCurrentCategory.length === 0) {
            const currentCategory = 
            axios.get(process.env.REACT_APP_API_URL+'/categories/')
            .then(res => {
                res.data.filter(r => r.name === this.props.match.params.categoryName)})
                axios.get(process.env.REACT_APP_API_URL+'/beers/')
                .then(res => {
                    this.setState({
                        beersInCurrentCategory: res.data.filter(r => r.category === currentCategory.url)
                    });
                    console.log(this.state)
                })
                .catch(err => {
                    console.log(err);
                    })
        } else {console.log(this.state.beersInCurrentCategory.length)}
    }

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
    } else {
        return <Styledh2>No beers match your search criteria.</Styledh2>
    }
}
}
export default DisplayResults