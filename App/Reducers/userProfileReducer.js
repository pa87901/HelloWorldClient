export default function reducer(state = {
  profile: null,
  userGuideId: null
}, action) {
  if (action.type === 'PROFILE_LOADED') {
    return {...state, profile: action.payload}
  } else if (action.type === 'PROFILE_UNLOADED') {
    return {...state, profile: null}
  } else if (action.type === 'UPDATE_USER_GUIDE_ID') {
    return {...state, userGuideId: action.payload}
  }
  return state;
}