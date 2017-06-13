export default function reducer(state = {
 selectedProfile: {
   guideSpecialties: [],
   user:{},
   availabilities:[{}],
   bookings: [],
   availabilityId: 0
 }
}, action) {
  if (action.type === 'GET_PROFILE_FULFILLED') {
    return {...state, selectedProfile: action.payload}
  } else if (action.type === 'SELECT_AVAILABILITY') {
    return {...state, availabilityId: action.payload}
  }
  
  return state;
}