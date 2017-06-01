export default function reducer(state = {auth : true}, action) {
  //console.log('action',action.type )
  if (action.type === 'AUTHORIZATION_COMPLETED') {
    //console.log('action payload', action.payload)
    return {...state, auth: action.payload}
  } else if (action.type === 'AUTHORIZATION_FAILED') {
    return {...state, auth: null}
  } 
  return state;
}