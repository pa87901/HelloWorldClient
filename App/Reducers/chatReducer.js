export default function reducer(state = {
  messages: [],
  // error: null,
}, action) {
  if (action.type === 'FETCH_MESSAGES') {
    return {...state, fetching: true}
  } else if (action.type === 'FETCH_TWEETS_REJECTED') {
    return {...state, fetching: false, error: action.payload}
  } 
  return state;
}