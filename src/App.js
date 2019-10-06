import React, {Component} from 'react'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AccountPage from './pages/AccountPage'
import RNAProteinPage from './pages/Predictions/RNAProteinPage'

import { withFirebase } from './components/Firebase'

import './App.css'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      authChecked: false
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser, authChecked: true })
        : this.setState({ authUser: null, authChecked: true })
    });
  }

  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route path="/about" render={() => <AboutPage />} />
        <Route path="/profile" render={() => (!this.state.authChecked ? null : this.state.authUser ? <AccountPage /> : <Redirect to="/" />)} />
        <Route path="/predict" render={routeProps => {
          return !this.state.authChecked ? null : this.state.authUser ? (
            routeProps.location.pathname === '/predict/rnaprotein' ?
          <RNAProteinPage /> :
          <Redirect to="/" />
        ) : 
        <Redirect to="/" />}} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  }
}

export default withFirebase(App)
