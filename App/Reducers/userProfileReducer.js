export default function reducer(state = {profile: null}, action) {
  if (action.type === 'PROFILE_LOADED') {
    return {...state, profile: action.payload}
  } else if (action.type === 'PROFILE_UNLOADED') {
    return {...state, profile: null}
  }
  return state;
}