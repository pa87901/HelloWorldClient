export default function reducer(state = {
 selectedProfile: {}
}, action) {
  if (action.type === 'GET_PROFILE_FULFILLED') {
    return {...state, selectedProfile: action.payload}
  } 
  return state;
}