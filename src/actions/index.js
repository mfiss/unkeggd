import axios from 'axios'

//Actions for browsing lists of categories and beers
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const SEARCH_BEER = 'SEARCH_BEER'
export const RECEIVE_BEER = 'RECEIVE_BEER'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'

export const REQUEST_BEERPAGE = 'REQUEST_BEERPAGE'
export const RECEIVE_BEERPAGE = 'RECEIVE_BEERPAGE'
export const DESELECT_BEER = 'DESELECT_BEER'

export const ADD_EDIT_REQUEST = 'ADD_EDIT_REQUEST'
export const ADD_EDIT_SUCCESS = 'ADD_EDIT_SUCCESS'
export const ADD_EDIT_FAILURE = 'ADD_EDIT_FAILURE'

export const DELETE_REQUEST = 'DELETE_REQUEST'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'
export const DELETE_FAILURE = 'DELETE_FAILURE'

export const RESET_SUBMIT_STATUS = 'RESET_SUBMIT_STATUS'

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
})

export const receiveCategories = res => ({
  type: RECEIVE_CATEGORIES,
  res,
})

export const queryBeer = query => ({
  type: SEARCH_BEER,
  query,
})

export const receiveBeer = res => ({
  type: RECEIVE_BEER,
  res,
})

export const receiveSearch = res => ({
  type: RECEIVE_SEARCH,
  res,
})

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category,
})

export const addEdit = body => ({
  type: ADD_EDIT_REQUEST,
  body,
})

export const addEditSuccess = res => ({
  type: ADD_EDIT_SUCCESS,
  res,
})

export const addEditFailure = res => ({
  type: ADD_EDIT_FAILURE,
  res,
})

export const deleteRequest = () => ({
  type: DELETE_REQUEST,
})

export const deleteSuccess = res => ({
  type: DELETE_SUCCESS,
  res,
})

export const deleteFailure = res => ({
  type: DELETE_FAILURE,
  res,
})

export const requestBeerPage = selectedBeer => ({
  type: REQUEST_BEERPAGE,
  selectedBeer,
})

export const receiveBeerPage = res => ({
  type: RECEIVE_BEERPAGE,
  res,
})

export const deselectBeer = () => ({
  type: DESELECT_BEER,
})

export const resetSubmitStatus = () => ({
  type: RESET_SUBMIT_STATUS,
})

export const fetchCategories = () => {
  return dispatch => {
    dispatch(requestCategories())
    return axios
      .get(process.env.REACT_APP_API_URL + '/categories/')
      .then(res => dispatch(receiveCategories(res.data)))
  }
}

export const searchBeer = query => {
  return dispatch => {
    dispatch(queryBeer(query))
    return axios
      .get(process.env.REACT_APP_API_URL + '/beers/search/?q=' + query)
      .then(res => {
        dispatch(receiveSearch(res.data))
      })
  }
}

export const fetchBeer = category => {
  return dispatch => {
    dispatch(selectCategory(category))
    return axios
      .all([
        axios.get(process.env.REACT_APP_API_URL + '/categories/'),
        axios.get(process.env.REACT_APP_API_URL + '/beers/'),
      ])
      .then(
        axios.spread((categories, beers) => {
          let categoryObject = categories.data.filter(c => c.name === category)
          if (categoryObject.length > 0) {
            let beersByCategory = beers.data.filter(
              b => b.category === categoryObject[0].url
            )
            dispatch(receiveBeer(beersByCategory))
          } else {
            dispatch(receiveBeer(''))
          }
        })
      )
  }
}

export const fetchBeerPage = selectedBeer => {
  return dispatch => {
    dispatch(requestBeerPage(selectedBeer))
    return axios.get(process.env.REACT_APP_API_URL + '/beers/').then(res => {
      dispatch(
        receiveBeerPage(res.data.filter(b => b.name === selectedBeer)[0])
      )
    })
  }
}

export const deleteSomething = target => {
  return dispatch => {
    dispatch(deleteRequest())
    return axios
      .delete(target)
      .then(res => {
        dispatch(deleteSuccess(res.data))
      })
      .catch(err => dispatch(deleteFailure(err.response.data)))
  }
}

export const postSomething = body => {
  return dispatch => {
    const API_ENDPOINT = body => {
      if (body.submitType === 'beer') {
        return '/beers/'
      } else {
        return '/categories/'
      }
    }
    if (body.url) {
      dispatch(addEdit(body))
      return axios
        .put(body.url, body)
        .then(res => {
          return dispatch(addEditSuccess(res.data))
        })
        .catch(err => dispatch(addEditFailure(err.response.data)))
    } else {
      dispatch(addEdit(body))
      return axios
        .post(process.env.REACT_APP_API_URL + API_ENDPOINT(body), body)
        .then(res => dispatch(addEditSuccess(res.data)))
        .catch(err => dispatch(addEditFailure(err.response.data)))
    }
  }
}
