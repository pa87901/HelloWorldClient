export default function reducer(state = {
  requestedGuideBookings: [],
  touristBookings: [],
  guideBookings: []
}, action) {
  if (action.type === 'SET_REQUESTED_GUIDE_BOOKINGS_FULFILLED') {
    return {...state, requestedGuideBookings: action.payload}
  } else if (action.type === 'SET_TOURIST_BOOKINGS') {
    return {...state, touristBookings: action.payload}
  } else if (action.type === 'SET_GUIDE_BOOKINGS') {
    return {...state, guideBookings: action.payload}
  }
  return state;
}