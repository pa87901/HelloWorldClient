export function fetchMessages() {
  return {
    type: 'FETCH_MESSAGES',
    payload: [] //Data from axios response
  };
}
// This won't happen here, it will happen in component?
// export function postMessage(message) {
//   return {
//     type: 'POST_MESSAGE',
//     payload: ,
//   }
// }

export function updateChats(formattedMessages) {
  return {
    type: 'UPDATE_CHATS',
    payload: formattedMessages
  };
}
