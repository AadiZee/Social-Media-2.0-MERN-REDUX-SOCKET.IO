const express = require("express");
const {
  createChat,
  userChat,
  findChat,
} = require("../Controllers/ChatController");

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChat);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
