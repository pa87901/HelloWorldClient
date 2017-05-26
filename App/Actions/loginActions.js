//placeholder for actions
export function fetchUserName() {
  return {
    type: "FETCH_USERNAME",
    payload: {
      userName: '',
      profilePic: '',
    }
  }
}

// export function setUserName(name) {
//   return {
//     type: 'SET_USER_NAME',
//     payload: name,
//   }
// }

// export function setUserAge(age) {
//   return {
//     type: 'SET_USER_AGE',
//     payload: age,
//   }
// }