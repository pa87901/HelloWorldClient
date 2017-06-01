import { combineReducers } from "redux"
import filter from "./filterReducer"
import loginProfile from "./loginProfileReducer"
import search from "./searchReducer"
import profileResults from "./profileResultsReducer"
import chat from "./chatReducer"
import guideForm from "./guideFormReducer"
import auth from "./authReducer"

export default combineReducers({
  filter,
  loginProfile,
  search,
  profileResults,
  chat,
  guideForm,
  auth
});