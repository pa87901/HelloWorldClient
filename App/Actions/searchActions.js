//placeholder for actions
export function updateDate(date) {
  return {
    type: 'UPDATE_DATE_FULFILLED',
    payload: date
  };
}

export function updateCity(city) {
  return {
    type: 'UPDATE_CITY_FULFILLED',
    payload: city
  };
}

export function updateTravelers(number) {
  return {
    type: 'UPDATE_TRAVELERS_FULFILLED',
    payload: number
  };
}

export function updateSearchResult(result) {
  return {
    type: 'UPDATE_SEARCH_RESULTS_FULFILLED',
    payload: result
  };
}