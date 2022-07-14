const authReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action.payload,
        loading: false,
        error: false,
      };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };
    case "UPDATING_START":
      return { ...state, loading: true, error: false };
    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action.payload,
        loading: false,
        error: false,
      };
    case "UPDATING_FAIL":
      return { ...state, loading: false, error: true };

    case "FOLLOW_SUCCESS":
      return {
        ...state,
        authData: {
          ...state.authData,
          userData: {
            ...state.authData.userData,
            following: [...state.authData.userData.following, action.payload],
          },
        },
      };

    case "UNFOLLOW_SUCCESS":
      return {
        ...state,
        authData: {
          ...state.authData,
          userData: {
            ...state.authData.userData,
            following: [
              ...state.authData.userData.following.filter(
                (personId) => personId !== action.payload
              ),
            ],
          },
        },
      };
    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };
    default:
      return state;
  }
};

export default authReducer;
