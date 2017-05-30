export default function reducer(state = {
  auth: null,
  // error: null,
}, action) {
  if (action.type === 'AUTHORIZATION_COMPLETE') {
    return {...state, auth: action.payload}
  } else if (action.type === 'AUTHORIZATION_REJECTED') {
    return {...state, auth: null}
  } 
  return state;
}