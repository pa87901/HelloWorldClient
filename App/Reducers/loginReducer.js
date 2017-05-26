export default function reducer(state = {
  userName: null,
  profilePic: '',
  // error: null,
}, action) {
  if (action.type === 'FETCH_USERNAME') {
    return {...state, fetching: true}
  } else if (action.type === 'FETCH_TWEETS_REJECTED') {
    return {...state, fetching: false, error: action.payload}
  }
  return state;
}