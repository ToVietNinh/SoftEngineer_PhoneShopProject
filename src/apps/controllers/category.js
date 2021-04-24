const CategoryModel = require("../models/category");
const paginate = require("../../common/paginate");

const index = async (req,res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 3;
    const skip = page*limit - limit;

    const total = await CategoryModel.find().countDocuments();
    const totalPage = Math.ceil(total/limit);
    console.log(page + " " + totalPage);
    console.log(paginate(page,totalPage));


    const categories = await CategoryModel.find().populate().skip(skip).limit(limit);
    res.render("admin/category/category", 
    {
        categories: categories, 
        pages: paginate(page, totalPage),
        page:page,
        totalPage:totalPage,
    });
}

const add =  (req,res) => {
    res.render("admin/category/add_category");
}

const postAdd = (req,res) => {
    
}

module.exports = {
    index:index,
    add:add,
    postAdd:postAdd,
}