const authService = require("../services/auth.service");

exports.signup = async (req, res) => {
  try {
    const { codename, linkedUser } = req.body;
    if (!codename) {
      return res.status(400).json({ success: false, message: "Codename is required" });
    }

    const user = await authService.signup({ codename, linkedUser });
    res.status(201).json({ success: true, user });
  } catch (err) {
    // Optionally log error: console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  // Placeholder — will add JWT or Firebase Auth later
  res.json({ success: true, message: "Login placeholder" });
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await authService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}