import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Handle special cases
  if (username.toLowerCase() === "admin") {
    return res
      .status(400)
      .json({ message: "Cannot register with reserved username 'admin'" });
  }
  if (["manager1", "manager2"].includes(username.toLowerCase())) {
    return res
      .status(400)
      .json({ message: "Cannot register with reserved manager usernames" });
  }

  const isVolunteerRequested = role === "volunteer";

  const user = await User.create({
    username,
    password,
    role: isVolunteerRequested ? "user" : role, // volunteers start as 'user'
    volunteerRequestPending: isVolunteerRequested,
  });

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
      volunteerRequestPending: user.volunteerRequestPending,
    });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

export const forgotPassword = async (req, res) => {
  const { username } = req.body;
  console.log("Received password reset for:", username);

  if (!username)
    return res.status(400).json({ message: "Username is required" });

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  console.log("Found user, preparing to send email");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: "Password Reset Request",
    text: `User '${username}' has requested a password reset.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.json({ message: "Password reset request sent to admin" });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

export const changeUserPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  if (!newPassword)
    return res.status(400).json({ message: "New password is required" });

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.password = newPassword;
  await user.save();

  res.json({ message: "Password updated successfully" });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
