import React from 'react';
import ReactDOM from 'react-dom';
import Route from './routes'
import { createBrowserHistory } from 'history';
import { BrowserRouter} from 'react-router-dom'

import { Provider } from 'react-redux';
import {store} from './store'

let browserHistory = createBrowserHistory();
// console.log(browserHistory)


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
    <Route /> 
    </BrowserRouter>
 
  </Provider>

,document.getElementById('root')
);
