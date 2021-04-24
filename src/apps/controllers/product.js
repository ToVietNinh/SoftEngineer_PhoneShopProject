const CategoryModel = require("../models/category");
const ProductsModel = require("../models/product");
const paginate = require("../../common/paginate");
const index = async (req,res) =>{
    //const productss = await ProductsModel.find().populate({path:"cat_id"});
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = page*limit - limit;

    const total = await ProductsModel.find().countDocuments();
    const totalPage = Math.ceil(total/limit);



    const products = await ProductsModel.find().populate({path:"cat_id"}).skip(skip).limit(limit);
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
    const categories = await CategoryModel.find();

    const prd_name = req.body.prd_name;
    const prd_price = req.body.prd_price;
    const prd_catId = req.body.cat_id;

    console.log(prd_name + " " + prd_price + " " + prd_catId);

    res.render("admin/product/add_product" ,{categories: categories});
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
    create,
    edit,
    add,
    del,
    index,
    postCreate,
}