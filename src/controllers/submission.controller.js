const storageService = require("../services/storage.service");

exports.uploadSubmission = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const result = await storageService.uploadFile(req.file, "submissions");
    // result could be an object with url and public_id
    res.json({ success: true, url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ success: false, message: "Public ID is required" });
    }
    const success = await storageService.deleteFile(publicId);
    if (!success) {
      return res.status(404).json({ success: false, message: "File not found" });
    }
    res.json({ success: true, message: "File deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err); // Added error logging
    res.status(500).json({ success: false, message: err.message });
  }
};