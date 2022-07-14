const UserModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// get all users
const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();

    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting all users", error: error });
  }
};

// get user
const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else if (user) {
      const { password, ...userData } = user._doc;
      return res.status(200).json(userData);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting user", error: error });
  }
};

//  update a user
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus, oldPassword, newPassword } =
    req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      if (newPassword && oldPassword) {
        const user = await UserModel.findById(id);
        if (user) {
          const validPassword = await bcrypt.compare(
            oldPassword,
            user.password
          );
          if (validPassword) {
            const salt = await bcrypt.genSalt(10);
            req.body.newPassword = await bcrypt.hash(
              req.body.newPassword,
              salt
            );
          } else {
            return res
              .status(400)
              .json({ message: "Current Password is incorrect!" });
          }
        } else {
          return res
            .status(404)
            .json({ message: "User not found for the id provided!" });
        }
      }
      const user = await UserModel.findByIdAndUpdate(
        id,
        { ...req.body, password: req.body.newPassword },
        {
          new: true,
        }
      );
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const { password, ...userData } = user._doc;
      return res.status(200).json({ userData, token });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error updating user", error: error });
    }
  } else {
    res
      .status(403)
      .json({ message: "Access Denied! You can only update your own account" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      return res.status(200).json({ message: "Account successfully deleted!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error deleting user", error: error });
    }
  } else {
    res
      .status(403)
      .json({ message: "Access Denied! You can only delete your own account" });
  }
};

// For following a user
const followUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res
      .status(403)
      .json({ message: "Action forbidden! You can't follow yourself." });
  } else {
    try {
      const userToFollow = await UserModel.findById(id);
      const currentUser = await UserModel.findById(currentUserId);
      if (!userToFollow) {
        return res
          .status(404)
          .json({ message: "User you are trying to follow was not found." });
      }
      if (!currentUser) {
        return res.status(404).json({ message: "You are not authorized!" });
      }
      if (userToFollow.followers.includes(currentUserId)) {
        return res
          .status(403)
          .json({ message: "You are already following this user." });
      }
      if (!userToFollow.followers.includes(currentUserId)) {
        await userToFollow.updateOne({ $push: { followers: currentUserId } });
        await currentUser.updateOne({ $push: { following: userToFollow.id } });
        return res.status(200).json({ message: "User followed!" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error following user", error: error });
    }
  }
};

// For un-following  a user
const unFollowUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res
      .status(403)
      .json({ message: "Action forbidden! You can't unfollow yourself." });
  } else {
    try {
      const userToFollow = await UserModel.findById(id);
      const currentUser = await UserModel.findById(currentUserId);
      if (!userToFollow) {
        return res
          .status(404)
          .json({ message: "User you are trying to unfollow was not found." });
      }
      if (!currentUser) {
        return res.status(404).json({ message: "You are not authorized!" });
      }
      if (!userToFollow.followers.includes(currentUserId)) {
        return res
          .status(403)
          .json({ message: "You are not following this user." });
      }
      if (userToFollow.followers.includes(currentUserId)) {
        await userToFollow.updateOne({ $pull: { followers: currentUserId } });
        await currentUser.updateOne({ $pull: { following: userToFollow.id } });
        return res.status(200).json({ message: "User unfollowed!" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error unfollowing user", error: error });
    }
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
};
