const express = require("express");
const router = express.Router();
const productModel = require("../apps/models/product");
const productController = require("../apps/controllers/product");

router.get("/",productController.index);



module.exports = router;    