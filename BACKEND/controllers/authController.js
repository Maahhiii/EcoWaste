import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
  const { username, password, role } = req.body; // Include role

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const assignedRole = role === "volunteer" ? "volunteer" : "user";

  const user = await User.create({ username, password, role: assignedRole }); // Pass role

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};
