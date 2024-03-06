const handleError = require("../middlewares/error");
const Agent = require("../models/agent");
const Admin = require("../models/admin")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createAgent =  async function (req, res){
    try {
      let existingAgent = await Agent.findOne({ email: req.body.email });
  
      if (existingAgent) {
        return res.status(403).send({ message: "Agent already exist" });
      }

      let { admin_id } = req.body 
      let admin = Admin.findById(admin_id)

      if(!admin){
        return handleError(res, 403, "Bad request")
      }
  
      let password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);

  
      let agent = new Agent({
        ...req.body,
        password: hashedPassword,
        profile_photo: req.file.filename,
      });
  
      await agent.save();
  
      return res.status(200).send({
        message: "agent created",
        data: agent,
      });
    } catch (e) {
      console.log(e);
      return handleError(res, 500, "Ïnternal server error");
    }
}

const getAgent = async function (req, res) {
    try {
      let agent = await Agent.find();
  
      if (!agent) {
        return res.status(494).send({ message: "no agent" });
      }
      return res.status(200).send({
        message: "All admin",
        length: agent.length,
        data: agent,
      });
    } catch (e) {
      console.log(e);
      res.status(500).send(e.message);
    }
}

module.exports = {
    createAgent,
    getAgent
}
  