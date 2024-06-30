const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    users.length
      ? res.status(200).json(users)
      : res.status(404).json({ message: "no registered users" });
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
};
const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne(email);
    if (existingUser.email)
      return res.status(401).json({
        message: `a user with the email ${existingUser.email} is already registred , go to sign in`,
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    newUser
      ? res
          .status(201)
          .json({ message: "new user was added successfully", newUser })
      : res.status(400).send("something wrong!");
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
};
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        const accessToken = jwt.sign(
          { id: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "60s",
          }
        );
        res.status(200).json({ message: "login successfully", accessToken });
      } else res.status(401).send("unauthorized access : wrong password");
    } else res.status(404).json({ message: "no user found with this email" });
  } catch (error) {}
};
module.exports = { getUsers, signUp, signIn };
