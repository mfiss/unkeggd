import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Styledh2, StyledInput, StyledSmallBtn, StyledLinkButton, StyledPaddedDiv, StyledGrid } from './Styles'

const InputField = props => {
//TODO Replace followup link with success/error messages and maybe a link back to some other pages
    return (
        <StyledPaddedDiv>
        <h3>Edit Category</h3>
        <StyledInput  type="text"
          onChange={e => props.handleChange(e)}
          value={props.value} />
          <Link to="/YouChangedSomething">   
            <StyledSmallBtn onClick={props.handleSubmit}>Submit</StyledSmallBtn>
            </Link>
          </StyledPaddedDiv>
    )
}

export class EditCategory extends Component {
    state = { newCategory : '' }
    // Get the current category name from route, if there is one
    componentDidMount(){
        if(this.props.location.state) {
        this.setState({ newCategory : this.props.location.state.category.name})
    }
}
    // Set up PUT body
    handleSubmit = () => {
        const body = { "name": this.state.newCategory}

        axios.put(this.props.location.state.category.url, body)
        .then(response => { 
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    handleInputChange = e => {
        this.setState({ newCategory: e.target.value });
    }

    render() {
        //TODO this if statement is redundant. Refactor to handle both at once
        if(this.props.location.state) {
            
        return (
            <InputField handleChange={this.handleInputChange} handleSubmit={this.handleSubmit} placeholder={this.props.location.state.category.name} value={this.state.newCategory} />
        )
    } else {
        return (
        
        <React.Fragment>
        <Styledh2>We can't seem to find the category you wished to edit.</Styledh2>
        <StyledGrid>
        <Link to="/Browse">
        <StyledLinkButton>
        Try again!
        </StyledLinkButton>
        </Link>
        </StyledGrid>
        </React.Fragment>
        )
    }
}
}


export default EditCategory