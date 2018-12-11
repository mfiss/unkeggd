import React, { Component } from 'react'
import { StyledBeerPage } from './Styles'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { StyledSmallBtn, StyledInputRegion, StyledInput } from './Styles'
import { DeleteButton } from './Buttons'

const AreWeAdding = props => {
    if(props.adding === '/addBeers' )
    return null
    else return (
        <Link to="/YouChangedSomething">
            <DeleteButton handleClick={props.handleClick} />
        </Link>
    )                    
}

export class BeerPage extends Component {
    state = {
        abv:'',
        brewery_location: '',
        calories:'',
        category: '',
        created_on: '',
        ibu: '',
        name: '',
        style: '',
        url: '',
        optionState: ''
     }

componentDidMount() {
    console.log("this.state:", this.state, "this.props:", this.props, "res.data:", this.state.category)
        if(this.props.match.params.beer) {
            axios.get(process.env.REACT_APP_API_URL+'/beers/')
        .then(res => {
            let newBeer = res.data.filter(b => b.name === this.props.match.params.beer)[0];
            if(newBeer){
            return this.setState({ 
                 abv: newBeer.abv,
                 brewery_location: newBeer.brewery_location,
                 calories: newBeer.calories,
                 category: newBeer.category,
                 created_on: newBeer.created_on,
                 ibu: newBeer.ibu,
                 name: newBeer.name,
                 style: newBeer.style,
                 url: newBeer.url,
                })
                
            }
        })
        .then(
            axios.get(process.env.REACT_APP_API_URL+'/categories/')
            .then(res => {

                if(this.state.category){
                let newOptionState = res.data.filter(r => r.url === this.state.category)[0].url;
                return this.setState({
                    optionState : newOptionState,
                    categories: res.data
                })
            } else { return null } 
            })
        )
        .catch(err => {
            console.log(err)
        });

        } else return null
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDropdownChange = e => {
        this.setState({ optionState: e.target.value})
        console.log(e.target.value, this.state)
    }
// TODO Validate this input before submitting it
    handleSubmit = e => {
        if(!this.state.optionState) {
                // Setting a default option to submit if the user forgets to do the dropdown
                if(this.props.categories.length > 0) {
                    const firstCategoryOption = this.props.categories[0].url;
                    console.log(firstCategoryOption)
                    console.log("here are the props categories", this.props.categories)
                    if(!this.state.optionState && firstCategoryOption){
                        this.setState({ optionState : firstCategoryOption})
                    }
                }     
            }   
        const body = {
            "url": this.state.url,
            "name": this.state.name,
            "ibu": this.state.ibu,
            "calories": this.state.calories,
            "abv": this.state.abv,
            "style": this.state.style,
            "brewery_location": this.state.brewery_location,
            "category": this.state.optionState
          }
        if(this.props.match.path === "/addBeer") {
            axios.post(process.env.REACT_APP_API_URL+'/beers/',body)
        .then(response => { 
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
    } else {
        axios.put(this.state.url, body)
        .then(response => { 
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
    }
    }

    handleDeleteClick = () => {
        axios.delete(this.state.url)
        .then(function (response) {
        console.log(response);
        })
      .catch(function (error) {
        console.log(error);
        });
    }

    render() {
        const categoryOptions = this.props.categories.map(c => 
            <option key={c.name} value={c.url}>{c.name}</option>
        );
        return ( 
            <StyledBeerPage>
                <StyledInputRegion>
            <h3>Name</h3>
     {/* TODO: Create an input component to DRY this out*/}
            <StyledInputRegion>
        <StyledInput type="text"
            name="name"
            title="name"
            onChange={e => this.handleInputChange(e)}
            value={this.state.name} />
            </StyledInputRegion>
            <StyledInputRegion>
            <h3>Style</h3>
            <StyledInput  type="text"
            name="style"
            title="style"
            onChange={e => this.handleInputChange(e)}
            value={this.state.style} />
            </StyledInputRegion>
            <StyledInputRegion>
          <h3>Alcohol by Volume</h3>
          <StyledInput  type="text"
            name="abv"
            title="abv"
            onChange={e => this.handleInputChange(e)}
            value={this.state.abv} />
            </StyledInputRegion>
        </StyledInputRegion>
        <StyledInputRegion>            
            <StyledInputRegion>
            <h3>IBU</h3>
            <StyledInput  type="text"
            name="ibu"
            title="ibu"
            onChange={e => this.handleInputChange(e)}
            value={this.state.ibu} />
            </StyledInputRegion>
            <StyledInputRegion>
            <h3>Calories</h3>
            <StyledInput  type="text"
            name="calories"
            title="calories"
            onChange={e => this.handleInputChange(e)}
            value={this.state.calories} />   
            </StyledInputRegion>
            <StyledInputRegion>         
          <h4>Brewery Location</h4>
          <StyledInput  type="text"
            name="brewery_location"
            title="brewery_location"
            onChange={e => this.handleInputChange(e)}
            value={this.state.brewery_location} /><br />
            </StyledInputRegion>
        </StyledInputRegion>
        <StyledInputRegion>
            <br />
            <StyledInputRegion>
            <h3>Category</h3>
            <select value={this.state.optionState} onChange={this.handleDropdownChange}>
                {categoryOptions}
            </select>
            </StyledInputRegion>
            <p>Edit the fields and submit with the button below!</p>
            <Link to="/YouChangedSomething">   
            <StyledSmallBtn onClick={this.handleSubmit}>Submit</StyledSmallBtn>
            </Link>
            <AreWeAdding adding={this.props.match.path} handleClick={this.handleDeleteClick} />
            </StyledInputRegion>
          </StyledBeerPage>
        )}
    }

export default BeerPage