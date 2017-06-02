export function authenticate(authComplete, authData) {
  if (authComplete) {
    return {
      type: 'AUTHORIZATION_COMPLETED',
      payload: authData
    };
  } else {
    return {
      type: 'AUTHORIZATION_FAILED',
      payload: null
    };
  }
}