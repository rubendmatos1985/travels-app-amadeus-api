import { combineReducers } from 'redux'
import { homeReducer } from './home'

export const mainReducer = combineReducers({
  home: homeReducer
})
