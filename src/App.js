import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AccountPage from './pages/AccountPage'
import PredictPage from './pages/PredictPage'

import './App.css'


class App extends Component {
  render() {
    return <BrowserRouter>
      <Route path="/" exact component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/account" component={AccountPage} />
      <Route path="/predict" component={PredictPage} />
    </BrowserRouter>
  }
}

export default App
