import User from "../models/User.js";

export const getPendingVolunteers = async (req, res) => {
  try {
    const pendingUsers = await User.find({
      volunteerRequestPending: true,
      role: "user",
    }).select("-password");

    res.json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending volunteers" });
  }
};

export const approveVolunteer = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user && user.volunteerRequestPending) {
      user.role = "volunteer";
      user.volunteerRequestPending = false;
      await user.save();

      res.json({ message: "User approved as volunteer" });
    } else {
      res
        .status(404)
        .json({ message: "User not found or not pending approval" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error approving volunteer" });
  }
};

export const resetUserPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
};
