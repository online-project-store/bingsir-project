import React from 'react';
// import { Switch, Route, Router } from 'react-router';
import { Router, Link, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";
import LayoutIndex from '@/layout/index.jsx';
import loginLayout from '@/pages/loginLayout.jsx';
import Home from '@/pages/home.jsx';
import article from '@/pages/article.jsx';
import classify from '@/pages/classify.jsx';
import topicList from '@/pages/topicList.jsx';
import activity from '@/pages/activity.jsx';
import writeArticle from '@/pages/writeArticle.jsx'
const history = createBrowserHistory();

const BasicRoute = () => (
    <Router history={history}>
        <LayoutIndex>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={loginLayout} />
                <Route exact path="/article" component={article} />
                <Route exact path="/classify" component={classify} />
                <Route exact path="/topicList" component={topicList} />
                <Route exact path="/activity" component={activity} />
                <Route exact path="/writeArticle" component={writeArticle} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </LayoutIndex>
    </Router>
);

export default BasicRoute;



