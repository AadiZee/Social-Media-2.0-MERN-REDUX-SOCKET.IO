const UserModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registering a new user
const registerUser = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const enteredPassword = password;

  try {
    if (await UserModel.usernameTaken(username)) {
      return res
        .status(400)
        .json({ message: "Sorry, username already taken!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(enteredPassword, salt);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const user = await newUser.save();
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const { password, ...userData } = user._doc;
    return res.status(200).json({ userData, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error saving user", error: error });
  }
};

// Login an existing user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "Username not found!" });
    } else if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password!" });
      } else if (validPassword) {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { password, ...userData } = user._doc;
        return res.status(200).json({ userData, token });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error logging in", error: error });
  }
};

module.exports = { registerUser, loginUser };
