const handleError = require("../middlewares/error");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const path = require("path");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage }).single("profile_photo");
// ;

const createAdmin =  async function (req, res){
  try {
    let existingAdmin = await Admin.findOne({ email: req.body.email });

    if (existingAdmin) {
      return res.status(403).send({ message: "Admin already exist" });
    }

    let password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    let admin = new Admin({
      ...req.body,
      password: hashedPassword,
      profile_photo: req.file.filename,
    });

    await admin.save();

    return res.status(200).send({
      message: "admin created",
      data: admin,
    });
  } catch (e) {
    console.log(e);
    return handleError(res, 500, "Ïnternal server error");
  }
}

const getAdmin = async function (req, res) {
    try {
      let admin = await Admin.find();
  
      if (!admin) {
        return res.status(494).send({ message: "no admin" });
      }
      return res.status(200).send({
        message: "All admin",
        length: admin.length,
        data: admin,
      });
    } catch (e) {
      console.log(e);
      res.status(500).send(e.message);
    }
}

const singleAdmin = async function (req, res) {
    try {
      let { id } = req.params;
  
      let admin = await Admin.findById(id);
  
      if (!admin) {
        return handleError(res, 404, "admin does not exist");
      }
  
      return res.status(200).send({
        Status: "Success",
        data: admin,
      });
    } catch (e) {
      console.log(e);
      handleError(res, 500, "Internal server error");
    }
}

const updateAdmin =   async function (req, res) {
    try {
      let { id } = req.body;
      let admin = await Admin.findById(id);

      if (!admin) {
        return handleError(res, 404, "Admin does not exist");
      }

      let result = await Admin.findByIdAndUpdate(id, req.body);

      return res.status(200).send({
        message: "Product updated",
        data: result,
      });
    } catch (e) {
      console.log(e);
      handleError(res, 500, "Internal server error");
    }
}

const deleteAdmin =  async function (req, res){
    try{
        let { id } = req.body;
        let admin = await Admin.findById(id)

        if(!admin){
            return handleError(res, 404, "Admin does not exist")
        }

        await Admin.findOneAndDelete(id)

        res.status(200).send({message: "admin deleted"})
    }catch(e){
        console.log(e)
        handleError(res, 500, "Internal server error")
    }
}

  

module.exports = { 
    createAdmin, 
    getAdmin,
    singleAdmin,
    updateAdmin,
    deleteAdmin
}