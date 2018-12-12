import React, { Component } from 'react'
import DisplayResults from './DisplayResults'
import axios from 'axios'
import {
    Route,
    Link,
    Switch
} from 'react-router-dom'
import Home from './Home'
import Input from './Input'
import BeerPage from './BeerPage'
import Browse from './Browse'
import { EditCategory } from './EditCategory'
import {
    StyledHeaderText,
    StyledHeader,
    StyledSmallBtn
} from './Styles.js'

export default class App extends Component {
    state = {
        isLoading:true,
        beers: [],
        categories: [],
        query: '',
        results:[]
    }
    //GET beers and categories right away, store in state, and handle errors
    componentDidMount = () => {
        axios.get(process.env.REACT_APP_API_URL+'/categories/')
            .then(res => {
                this.setState({
                    categories: res.data
                });
            })
            .catch(err => {
                console.log(err)
            });
        axios.get(process.env.REACT_APP_API_URL+'/beers/')
        .then(res => {
            this.setState({
                beers: res.data,
            });
        })
        .catch(err => {
            console.log(err)
        });
    }
    // handles the Search function and errors
    getBeers = () => {
        if (this.state.search !== '') {
            axios.get(process.env.REACT_APP_API_URL+'/beers/search/?q=' + this.state.search)
                .then(res => {
                    if (res.data.length > 0) {
                        this.setState({
                            results: res.data
                        });
                    } else {
                        this.setState({
                            results: ''
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            this.setState({
                results: ''
            })
        }
    }
    //Sets both key and value for state to manage Input fields
    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    //POST new categories
    handleAddCategory = e => {
        axios.post(process.env.REACT_APP_API_URL+'/categories/', {"name": this.state.category})
        .then(function (response) {
            this.setState({ category : ''})
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    
    render() {
        return ( <div id = "root" >
                <React.Fragment >
                    <StyledHeader >
                        <Link to = "/" >
                            <StyledHeaderText onClick={this.handleHomeClick}>Unkeggd</StyledHeaderText>
                        </Link>
                        <Link to = "/addBeer">
                        <StyledSmallBtn>
                        Add a beer
                        </StyledSmallBtn>
                        </Link>
                        <Input
                        title = "Add a category"
                        name = "category" 
                        handleClick = {this.handleAddCategory}
                        inputFunction = {this.handleInputChange}
                        link = "/YouChangedSomething"
                        buttonText = "Add"
                         />  
                        <Input
                        title = "Search for a beer" 
                        name = "search"
                        handleClick = {this.getBeers}
                        inputFunction = {this.handleInputChange}
                        link = "/SearchResults"
                        buttonText = "Search"
                         />
                    </StyledHeader>
                    <Switch>
                        {/* Probably can condense Browse and DisplayResults with some shared props */}
                    <Route
                        exact path = "/SearchResults"
                        render = {(props) =>
                            <DisplayResults { ...props} 
                                results = {this.state.results}/>} 
                    />
                    <Route
                        path = "/Browse"
                        render = {(props) =>
                            <Browse { ...props}
                                categories = { this.state.categories}
                                beers = {this.state.beers}/>} 
                    />
                    {/* "BeerPage" component renders differently based on whether or not a beer has been selected (add vs edit) */}
                      <Route
                        exact path="/beers/:beer"
                        key="edit"
                        render = {(props) =>
                            <BeerPage {...props}
                            categories={this.state.categories}
                        /> }
                    />                     
                     <Route
                        exact path="/addBeer"
                        key="add"
                        render = {(props) =>
                            <BeerPage {...props}
                            beers={[]}
                            categories={this.state.categories}
                            adding={true}
                        /> }
                    />
                     <Route
                        exact path="/EditCategory"
                        component={EditCategory}
                    />
                    {/* "Home" component re-used for simple text stuff with different props. Maybe rename to "content page or similar" */}
                    <Route
                        path = "/YouChangedSomething"
                        render = {(props) =>
                            <Home {...props}
                            // TODO Add conditional rendering based on failure, success, add vs delete, etc
                            title="You changed the world. Maybe."
                            text="Congratulations on changing stuff! Or my apologies if your change didn't work. You may need to refresh the page to see your changes. Let's get back to the beers, shall we?"
                        /> } />
                    <Route 
                        path = "/" 
                        render = {(props) =>
                            <Home {...props}
                            title="Welcome to Unkeggd."
                            text="Let 's look for some beers. Try using the search bar, or browse some categories by clicking below!"
                        /> } />

                </Switch>
            </React.Fragment>
    </div>
        );
    }
}