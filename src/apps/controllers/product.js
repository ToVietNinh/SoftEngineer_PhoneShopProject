const CategoryModel = require("../models/category");
const ProductsModel = require("../models/product");
const paginate = require("../../common/paginate");
const fs = require("fs");
const path = require("path");
const slug = require("slug");
const index = async (req,res) =>{
    //const productss = await ProductsModel.find().populate({path:"cat_id"});
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = page*limit - limit;

    const total = await ProductsModel.find().countDocuments();
    const totalPage = Math.ceil(total/limit);



    const products = await ProductsModel.find().populate({path:"cat_id"}).skip(skip).limit(limit).sort({"_id": -1});
    res.render("admin/product/product", 
    {
        products: products, 
        pages: paginate(page, totalPage),
        page:page,
        totalPage:totalPage,
    });
}

const create = async (req,res)=>{
    const categories = await CategoryModel.find();
    res.render("admin/product/add_product", {categories: categories});
}
const postCreate = async (req,res) => {
    const body = req.body;
    const file = req.file;

    const product = {
        description: body.description,
        price: body.price,
        cat_id: body.cat_id,
        status: body.status,
        featured: body.featured,
        promotion: body.promotion,
        warranty: body.warranty,
        accessories: body.accessories,
        is_stock: body.is_stock,
        name: body.name,
        slug: slug(body.name),
    }
    console.log(product);

    if(file) {
        const thumbnail = "products/" + file.originalname;
        product["thumbnail"] = thumbnail;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
    }
    //fs.renameSync("dang nam dau", "muon di den dau");

    new ProductsModel(product).save();
    res.redirect("/admin/products");

    
    
}
const add = (req,res)=>{
    res.send("Them san pham");
}
const edit = (req,res)=>{
    res.send("Sua san pham");
}
const del = (req,res)=>{
    res.send("Xoa san pham");
}

module.exports = {
    index,
    create,
    postCreate,
    edit,
    add,
    del,
}