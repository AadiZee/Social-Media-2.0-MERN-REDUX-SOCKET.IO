const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true, loading: true };
    case "UPLOAD_SUCCESS":
      if (state.posts && state.posts.length > 0) {
        return {
          ...state,
          posts: [action.payload, ...state.posts],
          uploading: false,
          error: false,
          loading: false,
        };
      } else {
        return {
          ...state,
          posts: [action.payload],
          uploading: false,
          error: false,
          loading: false,
        };
      }
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true, loading: false };

    // belongs to Posts.jsx
    case "RETRIEVING_TIMELINE_START":
      return { ...state, loading: true, error: false };
    case "RETRIEVING_TIMELINE_SUCCESS":
      return { ...state, posts: action.payload, loading: false, error: false };
    case "RETRIEVING_TIMELINE_FAIL":
      return { ...state, loading: false, error: true };

    case "RETRIEVING_PROFILE_START":
      return { ...state, loading: true, error: false };
    case "RETRIEVING_PROFILE_SUCCESS":
      return { ...state, posts: action.payload, loading: false, error: false };
    case "RETRIEVING_PROFILE_FAIL":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default postReducer;
