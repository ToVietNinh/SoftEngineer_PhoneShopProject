const express = require("express");
//const { router } = require("../apps/app");
const router = express.Router();

//Require Controller
const TestController = require("../apps/controllers/test");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");
const CategoryController = require("../apps/controllers/category");
const UserController = require("../apps/controllers/user");

//Require Middleware
const AuthMiddleware = require("../apps/middlewares/auth");
router.get("/test",TestController.test);
router.get("/test2", TestController.test2);
router.get("/test3", TestController.test3);

const multer = require("multer");
const upload = multer({
   dest: __dirname + "/../../temp", 
});

router.get("/upload", TestController.frmUpload);
router.post("/upload", upload.single("file_upload"), TestController.fileUpload);




router.get("/form", (req,res)=>{
    res.send(`
        <form method=post>
            <input type=text name=mail />
            <input type=text name=pass />
            <input type=submit name=123 value=login />
        </form>
    `);
});

router.post("/form", (req,res)=>{
    const mail = req.body.mail;
    const pass = req.body.pass;
    console.log(mail+"-"+pass);
});

router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.login);
router.post("/admin/login", AuthMiddleware.checkLogin, AuthController.postLogin);

router.get("/admin/logout",AuthMiddleware.checkAdmin, AdminController.logout);
//router.post("/admin/logout",AuthMiddleware.checkAdmin, AuthController.postLogout);

router.get("/admin",AuthMiddleware.checkAdmin, AdminController.dashboard);
router.post("/admin/dashboard",AuthMiddleware.checkAdmin, AdminController.postDashboard);

router.get("/admin/products",AuthMiddleware.checkAdmin, ProductController.index);
router.post("/admin/products",AuthMiddleware.checkAdmin, (req,res)=>{
    res.send("da chuyen sang khi search");
});



router.get("/admin/products/create", ProductController.create);
router.post("/admin/products/create", ProductController.postCreate);

router.get("/admin/products/edit/:id", ProductController.edit);

router.get("/admin/products/delete/:id", ProductController.del);

router.get("/admin/categories", CategoryController.index);
router.post("/admin/categories", AdminController.postDashboard);

router.get("/admin/categories/add", CategoryController.add);
router.post("/admin/categories/add",CategoryController.postAdd);

router.get("/admin/users", UserController.index);


router.get("/admin/add_users", UserController.add);
router.post("/admin/add_users", UserController.postAdd);


module.exports = router;