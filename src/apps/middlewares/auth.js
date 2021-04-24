const checkLogin = (req,res,next) => {
    if(req.session.mail && req.session.pass){
        res.redirect("/admin");
    }
    next();
}

const checkAdmin = (req,res,next) => {
    if(!req.session.mail && !req.session.pass){
        res.redirect("/admin/login");
    }
    next();
}

const checkLogout = (req,res,next) => {
    req.session.destroy();
}

module.exports = {
    checkLogin:checkLogin,
    checkAdmin:checkAdmin,
}