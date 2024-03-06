const mongoose = require("mongoose")
const msg = "field is required "
const agentSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, msg],
        default:""
    },
    lastName: {
        type: String, 
        required: [true, msg],
        default:""
    },
    email: {
        type: String, 
        required: [true, msg],
        default:""
    },

    password: {
        type: String, 
        required: [true, msg],
        default:""
    },
    profile_photo: {
        type: String, 
        default:""
        // required: [true, msg]
    },
    role:{
        type: String,
        default: "agent"
    },
    admin_id:{
        type:String,
         ref:"admin"}
})

agentSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const agentModel = mongoose.model("agent", agentSchema)
module.exports = agentModel;