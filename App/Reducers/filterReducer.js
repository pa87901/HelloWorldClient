export default function reducer(state = {
  costMin: 0,
  costMax: 0,
  ratingMin: 0,
  ratingMax: 5,
  hasCar: false,
  languages: ,
  transportationType: {walk: false, transit: false, taxiService: false}
  specialties: {sightseeing: false, museums: false, food: false, nightlife: false, outdoors: false}
  // error: null,
}, action) {
  if (action.type === 'FETCH_TWEETS') {
    return {...state, fetching: true}
  } else if (action.type === 'FETCH_TWEETS_REJECTED') {
    return {...state, fetching: false, error: action.payload}
  } else if (action.type === 'FETCH_TWEETS_FULFILLED') {
    return {
      ...state,
      fetching: false,
      fetched: true,
      tweets: action.payload
    }
  } else if (action.type === 'ADD_TWEET') {
    return {
      ...state,
      tweets: [...state.tweets, action.payload]
    }
  }
  return state;
}