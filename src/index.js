import './index.css'

import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from './reducers/index'
import App from './App'
import Firebase, { FirebaseContext } from './components/Firebase'

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App/>
    </FirebaseContext.Provider>
  </Provider>,
  document.querySelector('#app')
)
