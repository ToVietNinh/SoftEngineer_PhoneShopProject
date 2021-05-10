const UserModel = require("../models/user");
const user = require("./user");
var full_name = "";

const login = (req,res)=>{
    res.render("admin/login", {data: {}});
}
const postLogin = async (req,res)=>{
    const mail = req.body.mail;
    const pass = req.body.pass;
    let error;

    const users = await UserModel.find({email: mail, password: pass});
    full_name = users[0].full_name;
    if(mail == "" || pass == ""){
        error = "Thông tin không được để trống !";
    }
    
    else if(users.length > 0 && users[0].role == 'admin') {
        req.session.mail = mail;
        req.session.pass = pass;
        res.redirect("/admin");
    }
    else if(users.length > 0 && users[0].role == 'member') {
        req.session.mail = mail;
        req.session.pass = pass;
        res.redirect("/CShop");
    }
    else {
        error = "Tài khoản không hợp lệ !";
    }
    res.render("admin/login", {data: {error: error}});
    
}



module.exports = {
    login:login,
    postLogin:postLogin,
    full_name: full_name,
}