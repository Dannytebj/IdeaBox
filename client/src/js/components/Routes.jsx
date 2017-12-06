import React from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import appHistory from '../utils/history';
import Landing from './Landing';
import SignInSignUp from '../components/SignInSignUp';

const Routes = () => (
  <Router history={appHistory} >
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={SignInSignUp} />

    </Switch>
  </Router>
);
export default Routes;
