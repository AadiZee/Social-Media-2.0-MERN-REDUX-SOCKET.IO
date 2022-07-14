const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
  getAllUsers,
} = require("../Controllers/UserController");

const { authMiddleware } = require("../Middleware/AuthMiddleware");

const router = express.Router();

router.get("/", getAllUsers);
router
  .route("/:id")
  .get(getUser)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

router.put("/:id/follow", authMiddleware, followUser);
router.put("/:id/unfollow", authMiddleware, unFollowUser);

module.exports = router;
