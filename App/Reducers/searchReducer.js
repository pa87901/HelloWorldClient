export default function reducer(state = {
  city: '',
  date: '',
  numTravelers: 1
}, action) {
  if (action.type === 'UPDATE_CITY_FULFILLED') {
    return {...state, city: action.payload}
  } else if (action.type === 'UPDATE_DATE_FULFILLED') {
    return {...state, date: action.payload}
  } else if (action.type === 'UPDATE_TRAVELERS_FULFILLED') {
    return {...state, numTravelers: action.payload}
  }
  return state;
}