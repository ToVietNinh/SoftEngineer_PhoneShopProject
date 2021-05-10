const fs = require("fs");
const path = require("path");
const UserModel = require("../models/user");
const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const slug = require("slug");
const { fileLoader } = require("ejs");

const test = async (req,res) => {
    const title = "Điện Thoại IPHONE Giá Rẻ";
    console.log(title);
    console.log(slug(title));
    /*const products = ProductModel.find().populate({path: "cat_id"}).exec((err, docs) =>{
       console.log(docs[0].cat_id.title); 
    });*/

    /*ProductModel.find().populate({path: "cat_id"}).exec((err, docs)=>{
        console.log(docs[0]);
    });*/

    /*const products = await ProductModel.find().populate({path:"cat_id"});
    console.log(products);*/
    /*const categories = UserModel.find({}, (err, docs) =>{
        console.log(docs);
    });*/
    /*UserModel.find({}, (err, docs) =>{
        console.log(err);
        console.log(docs);
    });
    //res.render("test", {data: {a: 1000}});
    //res.redirect("/admin/products");
    const UserInsert1 = new UserModel({
        full_name: "demoInsert1",
        email: "demoInsert1@gmail.com",
        password: "2222223",
        role: "member",
    });
    UserInsert1.save();
    /*UserModel.updateMany({_id: ObjectId("607022cfcf67f91100890cec")}, {
        email: "demo@gmail.com"
    }).exec((err, docs) => {
        console.log(docs);
    });
    /*UserModel.updateOne({_id: ObjectId("5fa434bfceb043cc721e41d4")}, {
        email: "vietpro@gmail.com"
    }).exec((err, docs) => {
        console.log(docs);
    });*/
    
}
const test2 = (req,res) => {
    if(req.session.data){
        res.send(req.session.data);
    }else{
        res.send("session not define");
    }
    res.send("test2");
}
const test3 = (req,res) => {
    req.session.destroy();
}
const frmUpload = (req,res) => {
    res.send(`
        <form method="post" enctype="multipart/form-data">
            <input type="file" name="file_upload"/>
            <button type="submit">Upload</button>
        </form>
    
    `);
}

const fileUpload = (req,res) =>{
    const file = req.file;
    //fs.renameSync("dang nam dau", "muon di den dau");
    fs.renameSync(file.path, path.resolve("src/public/images/products",file.originalname));
    console.log("Upload");
}

const frmloadUp = (req,res) => {
    res.send(`
        <form method = "post" enctype="multipart/form-data">
            <input type="file" name="loadUp_file"/>
            <button type="submit">loadUp</button>
        </form>
    
    `);
}
const fileloadUp = (req,res) =>{
    const file = req.file;
    fs.renameSync(file.path, path.resolve("src/public/images/products",file.originalname));
}
module.exports = {
    test:test,
    test2:test2,
    test3:test3,
    frmUpload:frmUpload,
    fileUpload:fileUpload,
    frmloadUp:frmloadUp,
    fileloadUp:fileloadUp,
}