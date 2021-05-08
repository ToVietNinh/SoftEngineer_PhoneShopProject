const ProductsModel = require("../models/product");
const CategoryModel = require("../models/category");
const paginate = require("../../common/paginate");

const index = async (req,res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = page*limit - limit;

    const total = await ProductsModel.find().countDocuments();
    const totalPage = Math.ceil(total/limit);



    const products = await ProductsModel.find().populate({path:"cat_id"}).skip(skip).limit(limit).sort({"_id": -1});
    const categories = await CategoryModel.find();
    
    res.render("index", 
    {
        products: products, 
        categories: categories,
        pages: paginate(page, totalPage),
        page:page,
        totalPage:totalPage,
    });
}
module.exports = {
    index:index,
}