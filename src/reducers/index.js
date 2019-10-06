import { combineReducers } from 'redux'

import animation from './animation'
import profile from './profile'

const combinedReducer = combineReducers({
  animation,
  profile
})

export default combinedReducer