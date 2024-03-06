const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const adminController = require("../controlers/adminController")

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

router.post("/create-admin", upload, adminController.createAdmin);
router.get("/all-admin", adminController.getAdmin );
router.get("/admin/:id", adminController.singleAdmin  );
router.put("/admin/edit",upload , adminController.updateAdmin);
router.delete("/admin/delete", adminController.deleteAdmin)

module.exports = router;
