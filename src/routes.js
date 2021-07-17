import {BrowserRouter, Switch, Route} from 'react-router-dom'
import React, { Component } from 'react'
import Login from './components/Login'
import View from './components/View'


 class Routes extends Component {
    render() {
        return (
          <BrowserRouter>
          <Switch>
          <Route path="/" exact component={Login}  />
          <Route path="/view-detail" exact component={View}  />
          
          </Switch>
          
          </BrowserRouter>
        )
    }
}

export default Routes
