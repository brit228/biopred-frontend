import React, {Component} from 'react'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AccountPage from './pages/AccountPage'
import PredictPage from './pages/PredictPage'
import HistoryPage from './pages/HistoryPage'

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
      <Route path="/" exact component={() => <HomePage />} />
      <Route path="/about" component={() => <AboutPage />} />
      <Route path="/history" component={() => <HistoryPage />} />
      <Route path="/profile" component={() => (!this.state.authChecked ? null : this.state.authUser ? <AccountPage /> : <Redirect to="/" />)} />
      <Route path="/predict" component={() => (!this.state.authChecked ? null : this.state.authUser ? <PredictPage /> : <Redirect to="/" />)} />
    </BrowserRouter>
  }
}

export default withFirebase(App)
