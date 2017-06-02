// export function authenticate(authComplete, authData) {
//   //console.log(authComplete, authData)
//   return function(dispatch){
//     if(authComplete){
//       dispatch({
//         type: 'AUTHORIZATION_COMPLETED',
//         payload: authData
//       });
//     } else {
//       dispatch( {
//           type: 'AUTHORIZATION_FAILED',
//           payload: null
//         }
//       ) 
//     }
//   }
// }



export function authenticate(authComplete, authData) {
  if (authComplete) {
    return {
      type: 'AUTHORIZATION_COMPLETED',
      payload: authData
    };
  } else {
    return {
      type: 'AUTHORIZATION_FAILED',
      payload: null
    };
  }
}