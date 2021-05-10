const CategoryModel = require("../models/category");
const paginate = require("../../common/paginate");
const slug = require("slug");
const index = async (req,res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 3;
    const skip = page*limit - limit;

    const total = await CategoryModel.find().countDocuments();
    const totalPage = Math.ceil(total/limit);

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
    const cat_name = req.body.cat_name;
    const CategoryInsert = new CategoryModel({
        title: cat_name,

        slug: slug(cat_name),

        description: null,
        
    });
    CategoryInsert.save();      

    res.render("admin/category/add_category");
}

module.exports = {
    index:index,
    add:add,
    postAdd:postAdd,
}