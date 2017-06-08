export default function reducer(state = {
 selectedProfile: {
   guideSpecialties: [],
   user:{},
   availabilities:[{}],
   bookings: [],
 }
}, action) {
  if (action.type === 'GET_PROFILE_FULFILLED') {
    return {...state, selectedProfile: action.payload}
  } 
  return state;
}