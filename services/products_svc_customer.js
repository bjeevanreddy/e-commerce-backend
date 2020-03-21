const productModel = require('../models/products_model');

class customersvc {
    getProductsUsingLimit(productsToSkip, pageSize) {
        return productModel.find()
            .skip(productsToSkip)
            .limit(pageSize)
            .exec()
    }
    getProductsByCategory(category)
    {
        return productModel.find({productCategory:category},{_id:0,__v:0,addedTime:0,featuredProduct:0}).exec();
    }
    getProductsByPriceLowToHigh(){
        return productModel.find({}).sort({productPrice:1}).exec();
    }
    getProductsByPriceHighToLow(){
        return productModel.find({}).sort({productPrice:-1}).exec();
    }
    getProductBySubcategory(category,subcategory){
        return productModel.find({productCategory:category,productSubCategory:subcategory},{_id:0,__v:0,featuredProduct:0,addedTime:0}).exec();
    }
    getProductById(id)
    {
        return productModel.findOne({_id:id},{productName:1,productPrice:1}).exec();
    }


}

module.exports=new customersvc();