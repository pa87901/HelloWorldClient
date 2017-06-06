export default function reducer(state = {
  requestedGuideBookings: [],
}, action) {
  if (action.type === 'SET_REQUESTED_GUIDE_BOOKINGS_FULFILLED') {
    return {...state, requestedGuideBookings: action.payload}
  }
  return state;
}