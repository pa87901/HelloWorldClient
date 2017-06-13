import { combineReducers } from 'redux';
import userProfile from './userProfileReducer';
import search from './searchReducer';
import profileSelection from './profileSelectionReducer';
import chat from './chatReducer';
import auth from './authReducer';
import becomeAGuide from './BecomeAGuideReducer';
import specialty from './specialtyReducer';
import booking from './bookingReducer';

export default combineReducers({
  userProfile,
  search,
  profileSelection,
  chat,
  auth,
  becomeAGuide,
  specialty,
  booking
});
