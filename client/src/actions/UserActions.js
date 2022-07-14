import * as UserApi from "../api/UserRequest";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });

  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (followId, userId) => async (dispatch) => {
  try {
    await UserApi.followUser(followId, userId);
    dispatch({ type: "FOLLOW_SUCCESS", payload: followId });
  } catch (error) {
    console.log(error);
  }
};

export const unFollowUser = (unFollowId, userId) => async (dispatch) => {
  try {
    await UserApi.unFollowUser(unFollowId, userId);
    dispatch({ type: "UNFOLLOW_SUCCESS", payload: unFollowId });
  } catch (error) {
    console.log(error);
  }
};
