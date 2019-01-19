import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  SEARCH_BEER,
  RECEIVE_BEER,
  RECEIVE_SEARCH,
  REQUEST_BEERPAGE,
  RECEIVE_BEERPAGE,
  DESELECT_BEER,
  ADD_EDIT_REQUEST,
  ADD_EDIT_SUCCESS,
  ADD_EDIT_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  RESET_SUBMIT_STATUS,
} from '../actions'

const initialState = {
  items: [],
  selectedBeer: '',
  loading: false,
  submitStatus: '',
  submitDetails: '',
}

const items = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return { ...state, loading: true }
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        loading: false,
        items: action.res,
        loaded: 'categories',
      }
    case SELECT_CATEGORY:
      return { ...state, loading: true }
    case SEARCH_BEER:
      return { ...state, loading: true }
    case RECEIVE_BEER:
      return { ...state, loading: false, items: action.res, loaded: 'beers' }
    case RECEIVE_SEARCH:
      return { ...state, loading: false, items: action.res, loaded: 'search' }
    default:
      return state
  }
}

const beerPage = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BEERPAGE:
      return { ...state, loading: true }
    case RECEIVE_BEERPAGE:
      return { ...state, loading: false, selectedBeer: action.res }
    case DESELECT_BEER:
      return { ...state, selectedBeer: '' }
    default:
      return state
  }
}

const addEditDelete = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDIT_REQUEST:
      return { ...state }
    case ADD_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        submitStatus: 'Success!',
        submitDetais: action.res,
      }
    case ADD_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        submitStatus: 'Error!',
        submitDetails: action.res,
      }
    case DELETE_REQUEST:
      return { ...state, loading: true }
    case DELETE_SUCCESS:
      return { ...state, loading: false, submitStatus: 'Success!' }
    case DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        submitStatus: 'Error!',
        submitDetails: action.res,
      }
    case RESET_SUBMIT_STATUS:
      return { ...state, submitStatus: '', submitDetails: '' }
    default:
      return state
  }
}

export default combineReducers({
  items,
  addEditDelete,
  beerPage,
})
