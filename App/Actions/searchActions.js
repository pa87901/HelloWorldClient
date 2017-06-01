//placeholder for actions
export function updateDate(date) {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_DATE_FULFILLED',
      payload: date
    });
  };
}

export function updateCity(city) {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_CITY_FULFILLED',
      payload: city
    });
  };
}

export function updateTravelers(number) {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_TRAVELERS_FULFILLED',
      payload: number
    });
  };
}

export function updateSearchResult(result) {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_SEARCH_RESULTS_FULFILLED',
      payload: result
    });
  };
}