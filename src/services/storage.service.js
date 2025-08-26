const cloudinary = require("../config/cloudinary");
const fs = require("fs");

class StorageService {
  async uploadFile(file, folder = "publixx") {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder,
        resource_type: "auto",
        transformation: [
          { quality: "auto" },
          { fetch_format: "auto" }
        ]
      });

      // Cleanup temp file (multer saves locally)
      await fs.promises.unlink(file.path);

      return result.secure_url;
    } catch (err) {
      // Optionally log error: console.error(err);
      throw new Error("Upload failed: " + err.message);
    }
  }

  async deleteFile(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
      return result.result === "ok";
    } catch (err) {
      // Optionally log error: console.error(err);
      throw new Error("Delete failed: " + err.message);
    }
  }
}

module.exports = new StorageService();