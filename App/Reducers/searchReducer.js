export default function reducer(state = {
  city: 'SF',
  date: '2017-10-10',
  hours: '',
  numTravelers: 1,
  result: []
}, action) {
  if (action.type === 'UPDATE_CITY_FULFILLED') {
    return {...state, city: action.payload}
  } else if (action.type === 'UPDATE_DATE') {
    return {...state, date: action.payload}
  } else if (action.type === 'UPDATE_HOURS_FULFILLED') {
    return {...state, hours: action.payload}
  } else if (action.type === 'UPDATE_TRAVELERS_FULFILLED') {
    return {...state, numTravelers: action.payload}
  } else if (action.type === 'UPDATE_SEARCH_RESULTS_FULFILLED') {
    return {...state, result: action.payload}
  }
  return state;
}