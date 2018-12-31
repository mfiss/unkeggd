import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import Root from './components/Root'
import rootReducer from './reducers';
import thunk from 'redux-thunk'
import './index.css';


const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    );

render(<Root store={store} />, document.getElementById('root'))