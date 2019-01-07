import React, { Component } from "react"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchCategories, fetchBeer, searchBeer, postSomething, deleteSomething, resetSubmitStatus } from '../actions'
import { StyledGrid,
         Styledh2, 
         StyledSmallText, 
         StyledInputRegion, 
         StyledInput, 
         StyledButton } from '../Styles'
import FilterLink from '../components/FilterLink'
import { MapItems } from './MapItems'

//Header changes based on route
const Header = props => {
    if(props.filter && props.matchPath === '/Categories/:filter') {
        return (<Styledh2>Browsing category: {props.filter}</Styledh2>)
    } else if (props.matchPath === '/Search/:filter') {
        return (<Styledh2>Search results for: {props.filter} </Styledh2>)
    } else {
        return (<Styledh2>Browsing categories</Styledh2>)
    }
}

const AddCategory = props => {
    if(props.loaded === 'categories') {
        return (
            <StyledGrid>
        <StyledInputRegion>
            <StyledInput
                placeholder="Add category"
                type="text"
                onKeyDown={ e => {
                        if (e.key === 'Enter') {
                        props.handleAddClick()}}}
                value={props.value}
                onChange={e => props.handleInputChange(e)}
             />
             <StyledButton 
                size={'small'}
                onClick={props.handleAddClick}
                value={''} >
                Submit
            </StyledButton>
        </StyledInputRegion>
        </StyledGrid>
        )
    } else { return null}
} 

class ConnectedGrid extends Component {
    state= { addCategoryInput : ''}
    //Get data on fresh mount
    componentDidMount() {
        this.fetchData();
        this.resetSubmitStatus();
    }
    //Update data any time route changes
    componentDidUpdate(prevProps) {
        const locationChanged = this.props.location !== prevProps.location;
        if (locationChanged) { return this.fetchData() }
    }

//Separating this API call so "Back to categories" buttons can access
getCategories = () => this.props.dispatch(fetchCategories());

fetchData = e => {
    //If a category is clicked, fetch beer with event as arg
    if (e) {
        this.props.dispatch(fetchBeer(e.target.value));
    }
    //fetch beer with link filter as arg
    else if (this.props.filter) {
        //Determine whether searching or browsing categories
        if(this.props.matchPath === '/Search/:filter') {
            this.props.dispatch(searchBeer(this.props.filter));
        } else {
            this.props.dispatch(fetchBeer(this.props.filter));
    }
    }
    //If there's no filter (url query), fetch all categories
    else {
        this.props.dispatch(fetchCategories());
    //If there is a filter, use it to get beers by category using the filter as arg
    }
}
    whereToLink = item => {
        //If categories are loaded, link to the category
        if(this.props.loaded === 'categories') {
            return `${this.props.match.url}/${item.name}`
        //Otherwise it's beer so link to that beer's page
        } else {
            return `/beers/${item.name}`
        }
    }

    handleInputChange = e => {
        this.setState({ addCategoryInput : e.target.value})
    }

    handleAddClick = () => {
        let body = {
            'name' : this.state.addCategoryInput
        }
        this.props.dispatch(postSomething(body))
        .then(res => {if(!this.props.items.includes(res.name)) {
            return this.fetchData() }
    })}

    handleDeleteClick = deleteTarget => {
        console.log("delete target", deleteTarget, "this.props.items", this.props.items)
        this.props.dispatch(deleteSomething(deleteTarget.url))
        .then(() => {if(this.props.items.includes(deleteTarget)) {
            return this.fetchData() }

    })}  

    resetSubmitStatus = () => {
        this.props.dispatch(resetSubmitStatus())
    }

    renderSubmitStatus = () => {
        if (this.props.submitStatus) {
            console.log(this.props.submitStatus, this.props.submitDetails)
            return(
                <React.Fragment>
                <Styledh2>{this.props.submitStatus}</Styledh2>
                {/* {this.props.submitDetails} */}
                <FilterLink 
                    color={'light'}
                    size={'big'}
                    filter={'/Categories'}
                    value={"Browse by category"}
                    handleClick={this.resetSubmitStatus} />  
                </React.Fragment> 
            )
        } else return null
    }

    render() {
        const { error, loading, items, loaded } = this.props;

        if (error) {
            return <><Styledh2>Error!</Styledh2> <p>{error.message}</p></>;
        }
    
        if (loading) {
          return <Styledh2>Loading...</Styledh2>;
        }
        if (loaded && (items.length === 0) ) {
            return (
                <React.Fragment>
                <Styledh2>No beers were found.</Styledh2>
                <FilterLink 
                    color={'light'}
                    size={'big'}
                    filter={'/Categories'}
                    value={"Browse by category"}
                    handleClick={this.getCategories} />
                <FilterLink 
                    color={'light'}
                    size={'big'}
                    filter={'/addBeer'}
                    value={"Or add one!"}
                    handleClick={this.getCategories} />
                </React.Fragment>
            )           
        } 
        return (
        <React.Fragment>
    <Header filter={this.props.filter} matchPath = {this.props.matchPath}/>
    <StyledSmallText>
    {this.props.submitStatus}
    </StyledSmallText>   
    <StyledGrid>
    {this.props.items
        .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
        .map((r,i) =>
        <MapItems 
            r={r} 
            key={i}
            whereToLink={this.whereToLink(r)}
            handleClick={this.fetchData}
            url={this.props.match.url}
            editFunction={this.props.dispatch}
            handleDeleteClick={this.handleDeleteClick}
            fetchData={this.fetchData}
            loaded={this.props.loaded}
            />
    )}
    </StyledGrid>
    <AddCategory
        loaded={this.props.loaded}
        value={this.state.addCategoryInput}
        handleInputChange={this.handleInputChange}
        handleAddClick={this.handleAddClick}
     />
    </React.Fragment>
        );
      }
    }

const mapStateToProps = (state, {match}) => {
    return ({
        items: state.items.items,
        loading: state.items.loading,
        error: state.items.error,
        loaded: state.items.loaded,
        filter: match.params.filter || '',
        matchPath: match.path,
        submitStatus: state.addEditDelete.submitStatus,
        submitDetails: state.addEditDelete.submitDetails
    })
}

  const ResultsGrid = withRouter(connect(mapStateToProps)(ConnectedGrid));
  export default ResultsGrid