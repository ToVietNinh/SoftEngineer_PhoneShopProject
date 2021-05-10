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
const IndexController = require("../apps/controllers/index");

//Require Middleware
const AuthMiddleware = require("../apps/middlewares/auth");
const UploadMiddleware = require("../apps/middlewares/upload");


router.get("/test",TestController.test);
router.get("/test2", TestController.test2);
router.get("/test3", TestController.test3);

const multer = require("multer");
const upload = multer({
   dest: __dirname + "/../../temp", 
});

router.get("/upload", TestController.frmUpload);    
router.post("/upload", upload.single("file_upload"), TestController.fileUpload);

router.get("/loadUp",TestController.frmloadUp);
router.post("/loadUp",upload.single("loadUp_file"),TestController.fileloadUp);


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

// Admin Page
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



router.get("/admin/products/create",AuthMiddleware.checkAdmin, ProductController.create);
router.post("/admin/products/store",AuthMiddleware.checkAdmin,UploadMiddleware.single("image"), ProductController.postCreate);

router.get("/admin/products/edit/:id",AuthMiddleware.checkAdmin, ProductController.edit);

router.get("/admin/products/delete/:id",AuthMiddleware.checkAdmin, ProductController.del);

router.get("/admin/categories",AuthMiddleware.checkAdmin, CategoryController.index);
router.post("/admin/categories",AuthMiddleware.checkAdmin, AdminController.postDashboard);

router.get("/admin/categories/add",AuthMiddleware.checkAdmin, CategoryController.add);
router.post("/admin/categories/add",AuthMiddleware.checkAdmin,CategoryController.postAdd);

router.get("/admin/users",AuthMiddleware.checkAdmin, UserController.index);


router.get("/admin/add_users",AuthMiddleware.checkAdmin, UserController.add);
router.post("/admin/add_users",AuthMiddleware.checkAdmin, UserController.postAdd);

/*const multer = require("multer");
const upload = multer({
    dest: __dirname + "/../../temp",
});
*/

// Client Page
router.get("/CShop",IndexController.index);


module.exports = router;