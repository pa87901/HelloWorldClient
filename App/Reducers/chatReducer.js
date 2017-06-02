export default function reducer(state = {
  chats: [],
  // error: null,
}, action) {
  if (action.type === 'UPDATE_CHATS') {
    return {...state, chats: action.payload}
  }
  else if (action.type === 'ADD_CHAT') {
    return {...state, chats: action.payload}
  }
  return state;
}