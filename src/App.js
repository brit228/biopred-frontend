import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AccountPage from './pages/AccountPage'
import PredictPage from './pages/PredictPage'

import { withFirebase } from './components/Firebase'

import './App.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return <BrowserRouter>
      <Route path="/" exact component={() => <HomePage />} />
      <Route path="/about" component={() => <AboutPage />} />
      <Route path="/account" component={() => <AccountPage />} />
      <Route path="/predict" component={() => <PredictPage />} />
      <Route path="/history" component={() => <PredictPage />} />
      <Route path="/explore" component={() => <PredictPage />} />
    </BrowserRouter>
  }
}

export default withFirebase(App)
