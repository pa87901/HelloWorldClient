//placeholder for actions
export function fetchProfileResults() {
  return {
    type: 'FETCH_PROFILE_RESULTS',
    payload: {
      profileResults: [], //Data from axios response
    }
  }
}
