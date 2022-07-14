const ChatModel = require("../models/ChatModel");

const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const result = await newChat.save();

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating chat with user", error: error });
  }
};

const userChat = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting user chats", error: error });
  }
};

const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });

    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error finding user chat", error: error });
  }
};

module.exports = { createChat, userChat, findChat };
