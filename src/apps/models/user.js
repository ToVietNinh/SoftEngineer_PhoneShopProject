// Call the file which connected with MongoDB
const mongoose = require("../../common/database")();

//Use schema to describe the collection user
const userSchema = mongoose.Schema({
    full_name : {
        type: String,
        default: null
    },
    email : {
        type: String,
        unique: true
    },
    password : {
        type: String,
        default: null
    },
    role : {
        type: String,
        enum: ["member", "admin"],
        default: "member"
    }
    
});
// Change User Schema to Model
const userModel = mongoose.model("users", userSchema, "users");
module.exports = userModel;