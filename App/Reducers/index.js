import { combineReducers } from "redux"
import filter from "./filterReducer"
import login from "./loginReducer"
import search from "./searchReducer"

export default combineReducers({
  filter,
  login,
  search
  // tweets,
  // user,
})