import * as PostApi from "../api/PostRequest";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETRIEVING_TIMELINE_START" });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: "RETRIEVING_TIMELINE_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETRIEVING_TIMELINE_FAIL" });
  }
};

export const getProfilePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETRIEVING_PROFILE_START" });
  try {
    const { data } = await PostApi.getProfilePosts(id);
    dispatch({ type: "RETRIEVING_PROFILE_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETRIEVING_PROFILE_FAIL" });
  }
};
