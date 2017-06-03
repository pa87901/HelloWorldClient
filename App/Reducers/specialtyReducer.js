export default function reducer(state = {
  sightseeing: false,
  museum: false,
  food: false,
  nightlife: false,
  sports: false,
  music: false,
  history: false,
  politics: false
}, action) {
  if (action.type === 'SET_SIGHTSEEING_FULFILLED') {
    return {...state, sightseeing: action.payload}
  } else if (action.type === 'SET_MUSEUM_FULFILLED') {
    return {...state, museum: action.payload}
  } else if (action.type === 'SET_FOOD_FULFILLED') {
    return {...state, food: action.payload}
  } else if (action.type === 'SET_NIGHTLIFE_FULFILLED') {
    return {...state, nightlife: action.payload}
  } else if (action.type === 'SET_SPORTS_FULFILLED') {
    return {...state, sports: action.payload}
  } else if (action.type === 'SET_MUSIC_FULFILLED') {
    return {...state, music: action.payload}
  } else if (action.type === 'SET_HISTORY_FULFILLED') {
    return {...state, history: action.payload}
  } else if (action.type === 'SET_POLITICS_FULFILLED') {
    return {...state, politics: action.payload}
  }
  return state;
}