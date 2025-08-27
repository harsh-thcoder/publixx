// const authService = require("../services/auth.service");

// exports.signup = async (req, res) => {
//   try {
//     const { codename, linkedUser } = req.body;
//     if (!codename) {
//       return res.status(400).json({ success: false, message: "Codename is required" });
//     }

//     const user = await authService.signup({ codename, linkedUser });
//     res.status(201).json({ success: true, user });
//   } catch (err) {
//     // Optionally log error: console.error(err);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// exports.login = async (req, res) => {
//   // Placeholder — will add JWT or Firebase Auth later
//   res.json({ success: true, message: "Login placeholder" });
// };

// exports.getUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await authService.getUserById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }
//     res.json({ success: true, user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// }


const authService = require("../services/auth.service");

exports.signup = async (req, res) => {
  try {
    const { codename, password, linkedUsers } = req.body;
    if (!codename || !password || !Array.isArray(linkedUsers) || linkedUsers.length !== 2) {
      return res.status(400).json({
        success: false,
        message: "Codename, password, and exactly two linked users are required",
      });
    }

    const user = await authService.signup({ codename, password, linkedUsers });
    res.status(201).json({ success: true, user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { codename, password } = req.body;
    if (!codename || !password) {
      return res.status(400).json({
        success: false,
        message: "Codename and password are required",
      });
    }

    const user = await authService.login({ codename, password });
    res.json({ success: true, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(401).json({ success: false, message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid or missing user id" });
    }
    const user = await authService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};