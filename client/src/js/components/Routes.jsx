import React from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import appHistory from '../utils/history';
import Landing from './Landing';
import SignInSignUp from '../components/SignInSignUp';
import DashBoard from '../components/DashBoard';
import UsersBoard from '../components/UsersBoard';
import NotFound from '../components/NotFound';

const RequireAuth = () => {
  let isAuthenticated;
  isAuthenticated = false;
  const token = localStorage.getItem('token');
  if (!token) {
    return isAuthenticated;
  }
  isAuthenticated = true;
  return isAuthenticated;
};

const Routes = () => (
  <Router history={appHistory} >
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route
          path="/login"
          render={() => (RequireAuth() ?
          (<Redirect to="/dashboard" />) : <SignInSignUp />)}
        />
        <Route
          path="/dashboard"
          render={() => (RequireAuth() ?
      (<DashBoard />) : (<Redirect to="/" />))}
        />
        <Route
          path="/userIdeas"
          render={() => (RequireAuth() ?
      (<UsersBoard />) : (<Redirect to="/" />))}
        />
        <Route exact path="/*" component={NotFound} />
  
      </Switch>
    </div>
  </Router>
);
export default Routes;
