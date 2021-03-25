
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history'

import NewUser from '../containers/SignUp';
import Login from "../containers/Login";
import GetData from '../containers/Home';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={GetData} />
                    <Route path="/signup" component={NewUser} />
                    <Route path="/login" component={Login} />
                </Switch>
            </Router>
        )
    }
}