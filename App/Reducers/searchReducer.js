<<<<<<< HEAD
export default function reducer(state = {
  city: '',
  date: '',
<<<<<<< HEAD
  hours: '',
  numTravelers: 1,
  result: [],
=======
  numTravelers: 1
=======
export default function edit(state = {
  searchLocation: '',
  Date: {
    startHour: 9, 
    endHour: 17, 
    startDate: Date.now(), 
    endDate: Date.now() + 1
  },
  numGuests: 1
  // error: null,
>>>>>>> rebasing
>>>>>>> rebasing
}, action) {
  if (action.type === 'UPDATE_CITY_FULFILLED') {
    return {...state, city: action.payload}
  } else if (action.type === 'UPDATE_DATE_FULFILLED') {
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