const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesIn: String,
    worksAt: String,
    country: String,
    relationshipStatus: String,
    followers: [],
    following: [],
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.usernameTaken = async function (username) {
  const user = await this.findOne({ username });
  return !!user;
};

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
