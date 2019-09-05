import { combineReducers } from 'redux'

import animation from './animation'
import items from './items'
import profile from './profile'

const combinedReducer = combineReducers({
  animation,
  items,
  profile
})

export default combinedReducer