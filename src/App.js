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

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

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
                        /> }
                    />
                     <Route
                        exact path="/EditCategory"
                        component={EditCategory}
                    />                    
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