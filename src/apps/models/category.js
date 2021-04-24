// Call the file which connected with MongoDB
const mongoose = require("../../common/database")();

//Use schema to describe the collection user
const categorySchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        default: null,
    },
    
}, {
    timestamps: true,
});
// Change User Schema to Model
const categoryModel = mongoose.model("Category", categorySchema, "categories");
module.exports = categoryModel;