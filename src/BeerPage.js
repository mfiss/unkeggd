import React, { Component } from 'react'
import { StyledBeerPage } from './Styles'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { StyledSmallBtn, StyledInputRegion, StyledInput, StyledBeerInputs } from './Styles'
import { DeleteButton } from './Buttons'

// If we are editing a beer, add option to delete it
const AreWeAdding = props => {
    if(props.adding === '/addBeer' )
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
        optionState: '',
        inputFields : [
            "name",
            "style",
            "abv",
            "ibu",
            "calories",
            "brewery_location"
        ]
     }
// If editing existing beer, populate fields with current info
componentDidMount() {
    this.getDefaultCategory()
    // If passed a beer prop, GET beers
        if(this.props.match.params.beer) {
            axios.get(process.env.REACT_APP_API_URL+'/beers/')
        .then(res => {
            // Then filter the list by beer name prop
            let newBeer = res.data.filter(b => b.name === this.props.match.params.beer)[0];
            // If we got a beer, set the state
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
                 url: newBeer.url
                })
                
            }
        })
        //If our state has a category, get the URL for that category and set that in state to eventually POST it
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
//Get a default category to submit if user did not touch the dropdown    
    getDefaultCategory = () => {
        if(!this.state.optionState) {
                
            if(this.props.categories.length > 0) {
                const firstCategoryOption = this.props.categories[0].url;
                console.log(firstCategoryOption)
                console.log("here are the props categories", this.props.categories)
                if(!this.state.optionState && firstCategoryOption){
                    this.setState({ optionState : firstCategoryOption})
                }
            }    
        }
    }
    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    // The target value is the URL, which is what's used in the beer objects
    handleDropdownChange = e => {
        this.setState({ optionState: e.target.value})
    }
// TODO Validate this input before submitting it
    handleSubmit = e => {
        this.getDefaultCategory()
        console.log(this.state)
            // Set up our POST body with state   
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
          // POST if we're adding
        if(this.props.match.path === "/addBeer") {
            axios.post(process.env.REACT_APP_API_URL+'/beers/',body)
        .then(response => { 
            console.log(response)
            this.setState({ submitStatus : "Success!"})
        })
        .catch(error => {
            let errData = error.response.data
            let errText = Object.values(errData)
            console.log(errText)
            this.setState({ submitStatus : errText})
        });
    } else {
        // PUT if we're editing 
        axios.put(this.state.url, body)
        .then(response => { 
            console.log(response)
            this.setState({ submitStatus : "Success!"})
        })
        .catch(error => {
            let errData = error.response.data
            let errText = Object.values(errData)
            console.log(errText)
            this.setState({ submitStatus : errText})
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
        // Populate the dropdown with Categories by name, while populating the value with the URL
        const categoryOptions = this.props.categories.map(c => 
            <option key={c.name} value={c.url}>{c.name}</option>
        );
        // Iterate over this.state.inputFields to create inputs and populate props
        const InputRepeater = this.state.inputFields.map((str,i) => {
            return (
            <StyledInputRegion key={i}>
            <h3>{str.toUpperCase().replace(/_/g, " ")}</h3>
            <StyledInput  type="text"
            name={str}
            title={str}
            onChange={e => this.handleInputChange(e)}
            value={this.state[str]} />
            </StyledInputRegion>
            )
        })
        return ( 
            <StyledBeerPage>
        <StyledInputRegion>
            <StyledBeerInputs>
               {InputRepeater}
               </StyledBeerInputs>
        </StyledInputRegion>
        <StyledInputRegion>
            <br />
            <StyledInputRegion>
            <h3>Category</h3>
            <select value={this.state.optionState} onChange={this.handleDropdownChange}>
                {categoryOptions}
            </select>
            </StyledInputRegion>
            <p>Edit the fields and submit with the button!</p>
            <StyledBeerInputs>
            <StyledSmallBtn onClick={this.handleSubmit}>Submit</StyledSmallBtn>
            <AreWeAdding adding={this.props.match.path} handleClick={this.handleDeleteClick} />
            </StyledBeerInputs>
            <br />
            <div>
            <p>{this.state.submitStatus}</p>
            </div>
            </StyledInputRegion>
          </StyledBeerPage>
        )}
    }

export default BeerPage