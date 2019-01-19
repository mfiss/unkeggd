import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { StyledBeerPage } from '../Styles'
import {
  StyledButton,
  StyledInputRegion,
  StyledInput,
  StyledBeerInputs,
  StyledSelect,
  StyledSmallText,
  Styledh2,
} from '../Styles'
import {
  fetchBeerPage,
  fetchCategories,
  deselectBeer,
  postSomething,
  deleteSomething,
} from '../actions'
import FilterLink from '../components/FilterLink'

const InputRepeater = props => {
  //specify which fields to display
  let inputFields = [
    'name',
    'style',
    'abv',
    'ibu',
    'calories',
    'brewery_location',
  ]
  // display inputs if user clicks 'edit'
  if (props.editing) {
    return inputFields.map((str, i) => {
      return (
        <StyledInputRegion key={i}>
          <h3>{str.toUpperCase().replace(/_/g, ' ')}</h3>
          <StyledInput
            type="text"
            name={str}
            title={str}
            defaultValue={props.value[str]}
            onChange={props.handleInputChange}
          />
          <StyledSmallText> {props.submitDetails[str]} </StyledSmallText>
        </StyledInputRegion>
      )
    })
  } else {
    //display info as text by default
    return inputFields.map((str, i) => {
      return (
        <StyledInputRegion key={i}>
          <h3>{str.toUpperCase().replace(/_/g, ' ')}:</h3>
          <p>{props.value[str]}</p>
        </StyledInputRegion>
      )
    })
  }
}

//category section is different due to dropdown
const CategoryOptions = props => {
  if (props.loading) {
    return <div>Loading...</div>
  }
  //display dropdown if editing
  if (props.editing) {
    return (
      <StyledInputRegion>
        <h3>CATEGORY</h3>
        <StyledSelect value={props.value} onChange={props.handleChange}>
          <option />
          {props.categories
            .sort((a, b) =>
              a.name.toUpperCase().localeCompare(b.name.toUpperCase())
            )
            .map(c => (
              <option key={c.name} value={c.url}>
                {c.name}
              </option>
            ))}
        </StyledSelect>
        <StyledSmallText> {props.submitDetails.category} </StyledSmallText>
      </StyledInputRegion>
      //Since the category value within each beer entry is actually a URL, this matches that URL to the category's name with that URL
    )
  }
  if (props.categories && props.value && !props.editing) {
    let categoryName = props.categories.filter(c => c.url === props.value)
    return (
      <StyledInputRegion>
        <h3>CATEGORY:</h3>
        <p>{categoryName[0].name}</p>
      </StyledInputRegion>
    )
  } else return null
}
//Buttons change depending on whether a user is viewing/editing/adding
const EditButtons = props => {
  if (props.editing && props.selectedBeer) {
    return (
      <StyledInputRegion>
        <StyledButton onClick={props.handleSubmit}>Submit Changes</StyledButton>
        <StyledButton color={'light'} onClick={props.handleEditClick}>
          Cancel
        </StyledButton>

        <StyledButton color={'delete'} onClick={props.handleDeleteClick}>
          Delete Beer
        </StyledButton>
        <div>
          <p>{props.submitStatus}</p>
        </div>
      </StyledInputRegion>
    )
  } else if (props.editing && !props.selectedBeer) {
    return (
      <StyledInputRegion>
        <StyledButton onClick={props.handleSubmit}>Add Beer</StyledButton>
        <StyledSmallText>
          <p>{props.submitStatus}</p>
        </StyledSmallText>
      </StyledInputRegion>
    )
  } else {
    return (
      <StyledInputRegion>
        <StyledButton onClick={props.handleEditClick}>
          Edit this Entry
        </StyledButton>
      </StyledInputRegion>
    )
  }
}

export class ConnectedBeerPage extends Component {
  state = {
    editing: false,
    abv: null,
    brewery_location: null,
    calories: null,
    category: null,
    created_on: null,
    ibu: null,
    name: null,
    style: null,
    url: null,
    optionState: null,
    deleted: false,
  }

  componentDidMount() {
    this.props.dispatch(fetchCategories())
    if (this.props.matchPath === '/addBeer') {
      this.setState({ editing: true })
      this.props.dispatch(deselectBeer())
    } else {
      this.props.dispatch(fetchBeerPage(this.props.match.params.beer))
    }
  }
  //text inputs default to state on reset, but dropdown state persists
  //so in addition to toggling editing state, this resets the dropdown if user cancels an edit
  handleEditClick = () =>
    this.setState({
      editing: !this.state.editing,
      optionState: null,
    })

  handleDeleteClick = () => {
    this.props.dispatch(deleteSomething(this.props.selectedBeer.url))
    this.setState({})
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDropdownChange = e => {
    this.setState({ optionState: e.target.value })
  }
  // TODO Validate this input before submitting it
  handleSubmit = e => {
    //POST body gets an updated local state if user edited an input fields, or defaults to original props
    //empty string should pass, null will default to props
    const emptyStringOperand = (el, fallback) => (el || el === '')  ?  el : fallback
        const body = {
            'submitType' :'beer',
            'url': this.props.selectedBeer.url,
            'name': emptyStringOperand(this.state.name, this.props.selectedBeer.name),
            'ibu': emptyStringOperand(this.state.ibu, this.props.selectedBeer.ibu),
            'calories': emptyStringOperand(this.state.calories, this.props.selectedBeer.calories),
            'abv': emptyStringOperand(this.state.abv, this.props.selectedBeer.abv),
            'style': emptyStringOperand(this.state.style, this.props.selectedBeer.style),
            'brewery_location': emptyStringOperand(this.state.brewery_location, this.props.selectedBeer.brewery_location),
            'category': emptyStringOperand(this.state.optionState, this.props.selectedBeer.category)
        }
        this.props.dispatch(postSomething(body))
  }

  render() {
    const { error, loading } = this.props

    if (error) {
      return (
        <>
          <Styledh2>Error!</Styledh2> <p>{error.message}</p>
        </>
      )
    }

    if (loading) {
      return <Styledh2>Loading...</Styledh2>
    }
    if (this.state.deleted) {
      return (
        <React.Fragment>
          <Styledh2>This beer was successfully deleted.</Styledh2>
          <FilterLink
            color={'light'}
            size={'big'}
            filter={'/Categories'}
            value={'Browse by category'}
            handleClick={this.getCategories}
          />
          <FilterLink
            color={'light'}
            size={'big'}
            filter={'/addBeer'}
            value={'Add a beer'}
            handleClick={this.getCategories}
          />
        </React.Fragment>
      )
    }
    if (!this.props.selectedBeer && !this.state.editing) {
      return (
        <React.Fragment>
          <Styledh2>There's been a mistake. Sorry about that.</Styledh2>
          <FilterLink
            color={'light'}
            size={'big'}
            filter={'/Categories'}
            value={'Browse by category'}
            handleClick={this.getCategories}
          />
          <FilterLink
            color={'light'}
            size={'big'}
            filter={'/addBeer'}
            value={'Add a beer'}
            handleClick={this.getCategories}
          />
        </React.Fragment>
      )
    } else {
      return (
        <StyledBeerPage>
          <StyledInputRegion>
            <StyledBeerInputs>
              <InputRepeater
                value={this.props.selectedBeer}
                editing={this.state.editing}
                handleInputChange={this.handleInputChange}
                submitDetails={this.props.submitDetails}
              />
              <CategoryOptions
                editing={this.state.editing}
                categories={this.props.categories}
                value={
                  this.state.optionState ||
                  this.props.selectedBeer.category ||
                  ''
                }
                handleChange={this.handleDropdownChange}
                submitDetails={this.props.submitDetails}
              />
            </StyledBeerInputs>
            <EditButtons
              selectedBeer={this.props.selectedBeer}
              editing={this.state.editing}
              handleSubmit={this.handleSubmit}
              handleEditClick={this.handleEditClick}
              handleDeleteClick={this.handleDeleteClick}
              submitStatus={this.props.submitStatus}
            />
          </StyledInputRegion>
        </StyledBeerPage>
      )
    }
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    categories: state.items.items,
    selectedBeer: state.beerPage.selectedBeer,
    loading: state.beerPage.loading || state.items.loading,
    error: state.beerPage.error,
    matchPath: match.path,
    submitStatus: state.addEditDelete.submitStatus,
    submitDetails: state.addEditDelete.submitDetails,
  }
}

const BeerPage = withRouter(connect(mapStateToProps)(ConnectedBeerPage))

export default BeerPage
