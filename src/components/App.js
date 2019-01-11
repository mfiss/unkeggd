import React, { Component } from 'react'
import {
    Route,
    Link,
    Switch
} from 'react-router-dom'
import BeerSearch from '../containers/BeerSearch'
import TextContent from './TextContent'
import ResultsGrid from '../containers/ResultsGrid'
import BeerPage from '../containers/BeerPage'
import {
    StyledHeaderText,
    StyledHeader,
    StyledButton
} from '../Styles.js'

export default class App extends Component {

    render() {
        return ( <div id = "root" >
                <React.Fragment>
                    <StyledHeader >
                        <Link to = "/" >
                            <StyledHeaderText>Unkeggd</StyledHeaderText>
                        </Link>
                        <Link to = "/addBeer">
                        <StyledButton size={'small'}>
                        Add a beer
                        </StyledButton>
                        </Link>
                        <BeerSearch currentRoute={this.props.location.pathname} />
                    </StyledHeader>
                    <Switch>
                    <Route
                        path = "/Search/:filter"
                        component = {ResultsGrid} 
                    />
                     <Route
                        exact path = "/Search/"
                        render = {(props) =>
                            <TextContent {...props}
                            title={'No search criteria entered.'}
                            text={'Try entering some search terms, or browse by category.'}
                            buttonText={'Browse Categories'}
                            filter={'Categories'}
                            color={'light'}
                            size={'big'}
                        /> } />      
                    <Route
                        exact path = "/Categories"
                        component = {ResultsGrid}
                    />                                
                    <Route
                        path = "/Categories/:filter"
                        component = {ResultsGrid}
                    />

                      <Route
                        exact path="/beers/:beer"
                        component={BeerPage}
                    />                     
                     <Route
                        exact path="/addBeer"
                        key="add"
                        component={BeerPage}
                    />
                    {/* <Route
                        path = "/YouChangedSomething"
                        render = {props =>
                            <TextContent {...props}
                            // TODO Add conditional rendering based on failure, success, add vs delete, etc
                            title={'You changed the world. Maybe.'}
                            text={'Congratulations on changing stuff! Or my apologies if your change didn\'t work. You may need to refresh the page to see your changes. Let\'s get back to the beers, shall we?'}
                        /> } /> */}
                    <Route 
                        path = '/' 
                        render = {(props) =>
                            <TextContent {...props}
                            title={'Welcome to Unkeggd.'}
                            text={'Let\'s look for some beers. Try using the search bar, or browse some categories by clicking below!'}
                            buttonText={'Browse Categories'}
                            filter={'Categories'}
                            color={'light'}
                            size={'big'}
                            /> 
                        }         
                    />
                </Switch>
            </React.Fragment>
    </div>
        );
    }
}