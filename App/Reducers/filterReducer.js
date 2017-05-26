export default function reducer(state = {
  rateMin: 0,
  rateMax: 0,
  ratingMin: 0,
  ratingMax: 5,
  hasCar: false,
  languages: {
    English: false, 
    Spanish: false, 
    Chinese: false, 
    French: false, 
    Korean: false, 
    Japanese: false, 
    Hindi: false, 
    Arabic: false, 
    Portuguese: false, 
    Russian: false 
  },
  transportationType: {
    walk: false, 
    transit: false, 
    taxiService: false
  },
  specialties: {
    sightseeing: false, 
    museums: false, 
    food: false, 
    nightlife: false, 
    outdoors: false
  }
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