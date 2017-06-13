export function getProfileResult(profile) {
  return {
    type: 'GET_PROFILE_FULFILLED',
    payload: profile
  };
}

export function selectAvailability(availabilityId) {
  return {
    type: 'SELECT_AVAILABILITY',
    payload: availabilityId
  }
}