export default function reducer(state = {
  searchLocation: '',
  Date: {
    startHour: 9, 
    endHour: 17, 
    startDate: Date.now(), 
    endDate: Date.now() + 1
  },
  numGuests: 1
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