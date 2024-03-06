const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const msg = "field is required "
const adminSchema = new mongoose.Schema({
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
        default: "admin"
    }
})


adminSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const adminModel = mongoose.model("admin", adminSchema)
module.exports = adminModel;