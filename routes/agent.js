const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const agentController = require("../controlers/agentController")

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage }).single("profile_photo");

router.post("/create-agent", upload, agentController.createAgent)
router.get("/agent/all", agentController.getAgent)

module.exports = router 