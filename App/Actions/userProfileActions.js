
export function setUserProfile(profileLoaded, profileData) {
  return function (dispatch) {
    if (profileLoaded) {
      dispatch({
        type: 'PROFILE_LOADED',
        payload: profileData
      });
    } else {
      dispatch({
        type: 'PROFILE_UNLOADED',
        payload: null
      });
    }
  };
}

export function updateUserGuideId(userGuideId) {
  return function (dispatch) {
    dispatch({
      type: 'UPDATE_USER_GUIDE_ID', 
      payload: userGuideId
    });
  };
}
