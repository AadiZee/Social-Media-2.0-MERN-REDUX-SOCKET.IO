const express = require("express");
const router = express.Router();

const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
  getProfilePosts,
} = require("../Controllers/PostController");

router.post("/", createPost);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimelinePosts);
router.get("/:id/profile", getProfilePosts);
// router.put("/:id/dislike", dislikePost);

module.exports = router;
