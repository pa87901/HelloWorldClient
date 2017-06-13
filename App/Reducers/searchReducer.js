export default function reducer(state = {
  city: '',
  date: new Date().toDateString(),
  fromHour: (new Date()).getHours(),
  toHour: (new Date()).getHours() + 1,
  numTravelers: 1,
  result: [],
  filterCriteria: {
    sightseeing: false,
    food: false,
    sports: false,
    nightlife: false,
    music: false,
    museum: false,
    history: false,
    politics: false,
  }
}, action) {
  if (action.type === 'UPDATE_CITY_FULFILLED') {
    return { ...state, city: action.payload };
  } else if (action.type === 'UPDATE_DATE') {
    return { ...state, date: action.payload };
  } else if (action.type === 'UPDATE_TRAVELERS_FULFILLED') {
    return { ...state, numTravelers: action.payload };
  } else if (action.type === 'UPDATE_SEARCH_RESULTS_FULFILLED') {
    return { ...state, result: action.payload };
  } else if (action.type === 'UPDATE_FROM_HOUR') {
    return { ...state, fromHour: action.payload };
  } else if (action.type === 'UPDATE_TO_HOUR') {
    return { ...state, toHour: action.payload };
  } else if (action.type === 'FILTER_CRITERIA') {
    return { ...state, filterCriteria: action.payload };
  }

  return state;
}
