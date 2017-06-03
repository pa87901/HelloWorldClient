export default function reducer(state = {
 selectedProfile: {
   guideSpecialties: [],
   user:{
//     full_name: ''
   }
 }
}, action) {
  if (action.type === 'GET_PROFILE_FULFILLED') {
    return {...state, selectedProfile: action.payload}
  } 
  return state;
}