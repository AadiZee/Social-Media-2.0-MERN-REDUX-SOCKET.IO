import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async (dispatch) => {
  try {
    await UploadApi?.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });

  try {
    const newPost = await UploadApi?.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", payload: newPost.data });
  } catch (error) {
    dispatch({ type: "UPLOAD_FAIL" });
    console.log(error);
  }
};
