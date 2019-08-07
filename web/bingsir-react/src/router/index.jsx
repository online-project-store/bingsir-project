import React from 'react';
// import { Switch, Route, Router } from 'react-router';
import { Router, Link, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";
import LayoutIndex from '@/layout/index.jsx';
import loginLayout from '@/pages/loginLayout.jsx';
import Home from '@/pages/home.jsx';
const history = createBrowserHistory();

const BasicRoute = () => (
    <Router history={history}>
        <LayoutIndex>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={loginLayout} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </LayoutIndex>
    </Router>
);

export default BasicRoute;



