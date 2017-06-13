export function getProfileResult(profile) {
  return {
    type: 'GET_PROFILE_FULFILLED',
    payload: profile
  };
}
