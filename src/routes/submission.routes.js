const router = require("express").Router();
const upload = require("../middlewares/upload.middleware");
const submissionController = require("../controllers/submission.controller");

router.post("/upload", upload.single("file"), submissionController.uploadSubmission);
router.delete("/delete", submissionController.deleteSubmission);

module.exports = router;