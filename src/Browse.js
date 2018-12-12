import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
    StyledGrid,
    StyledLinkButton,
    StyledPaddedDiv,
    StyledCategory,
    StyledSmallBtnArea
} from './Styles'
import { EditButton, DeleteButton } from './Buttons'

//If categories exist, populate a <StyledGrid> with those options
const AreThereOptions = props => {
    if(props.options.length > 0) {
        return (
        <StyledGrid>{props.options}</StyledGrid>
        )
    } else {
        return (
            //Handle a view with no categories
            <React.Fragment>
            <p>It looks like there aren't any beers in this category.</p>
            <StyledLinkButton onClick={props.onClick}>
            Try again! 
            </StyledLinkButton>
            <Link to="/addBeer">
            <StyledLinkButton>
            Or add one!
            </StyledLinkButton>
            </Link>
            </React.Fragment>
        )    
}
}
// TODO: Make this happen inline. A separate view for an input field and submit button is probably unnecessary.
const EditCategory = props => {
    if(!props.viewingBeers) {
        return (
            <Link to={{ pathname: '/editCategory', state: { category: props.r} }}>
            <EditButton />
            </Link>
        )
    } else return null
}

export class Browse extends Component {
    state = { category : '',
              message : "Select a category"
            }
    //GET categories
    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL+'/categories/')
        .then(res => {
            return this.setState({categories : res.data})
        })
        .catch(err => {
            console.log(err)
        });
        }
    // When a category is clicked, set this.state.category to the value and change the message. 
    //This is set up to potentially support nested categories
    handleClick = e => {
        if(this.state.category === ''){
        this.setState({category : e.target.value, message: "Select a beer."})
    }
}

    handleDeleteClick = e => {
        axios.delete(e.target.value)
        .then(function (response) {
        console.log(response);
        })
      .catch(function (error) {
        console.log(error);
        });
        this.setState({categories : this.state.categories.filter(c => c.url === e.target.value)})
    }

    resetCategories = () => {
        this.setState({ category : '', message: "Select a category." })
        console.log("reset", this.state)
    }

    render() {
        // If no category is selected, show categories. If a category is selected, show beers from that category
        const whatToDisplay = () => {
            if (this.state.category === '') { return this.props.categories }
            else { return this.props.beers.filter(b => b.category === this.state.category)}
            }
        // If no category is selected, route updates to a category name. If a category is selected, route to beer page
        const whereToLink = r => {
            if(this.state.category === '') { return `${this.props.match.path}/${r.name}`}
            else { return `/beers/${r.name}`}
        }
            const options = 
                whatToDisplay()
                //alphabetical sort
                .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
                .map((r, i) => {
                    return (
                    <StyledCategory key = {i}>
                    <Link to = {whereToLink(r)} >
                    <StyledLinkButton onClick={this.handleClick} value={r.url}> 
                        {r.name}
                    </StyledLinkButton>
                    </Link>
                     <StyledSmallBtnArea>
                    <EditCategory viewingBeers={this.state.category} r={r}/>
                    <Link to="/YouChangedSomething">
                    <DeleteButton handleClick={e => this.handleDeleteClick(e)} value={r.url}/>
                    </Link>
                    </StyledSmallBtnArea>
                    </StyledCategory>
                    )
                })
            return (
                <StyledPaddedDiv>
            <h1>{this.state.message}</h1>
            <AreThereOptions options={options} onClick={this.resetCategories} />
            </StyledPaddedDiv>
            )
        }
    
}
export default Browse