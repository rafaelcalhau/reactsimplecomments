import React, { Component } from 'react'
//import { applyMiddleware, createStore } from 'redux'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import logger from 'redux-logger'

import reducer from './reducer'
import App from './App'

//const store = createStore(reducer, applyMiddleware( logger ))
const store = createStore(reducer)

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

export default Root