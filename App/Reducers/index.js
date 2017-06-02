import { combineReducers } from "redux"
import filter from "./filterReducer"
import userProfile from "./userProfileReducer"
import search from "./searchReducer"
import profileSelection from "./profileSelectionReducer"
import chat from "./chatReducer"
import guideForm from "./guideFormReducer"
import auth from "./authReducer"
import becomeAGuide from "./BecomeAGuideReducer"

export default combineReducers({
  filter,
  userProfile,
  search,
  profileSelection,
  chat,
  guideForm,
  auth,
  becomeAGuide
});