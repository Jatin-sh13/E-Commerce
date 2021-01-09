import React from 'react'
import ReactDom from 'react-dom'
import './bootstrap.min.css'
import App from './App'
import store from './Store'
import { Provider } from 'react-redux'
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
)