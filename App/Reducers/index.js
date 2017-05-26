import { combineReducers } from "redux"
import filter from "./filterReducer"
import login from "./loginReducer"
import search from "./searchReducer"
import profileResults from "./profileResultsReducer"
import chat from "./chatReducer"
import guideForm from "./guideFormReducer"

export default combineReducers({
  filter,
  login,
  search,
  profileResults,
  chat,
  guideForm
});