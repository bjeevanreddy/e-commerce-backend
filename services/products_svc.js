const productModel = require('../models/products_model');

class Products {
    addProduct(data) {
        let product = new productModel(data);
        return product.save();
    }
    updateProduct(id, data) {
        return productModel.findByIdAndUpdate(id, { $set: data }).exec();
    }
    deleteProduct(id) {
        return productModel.findByIdAndDelete(id).exec();
    }
    productCount() {
        return productModel.find({}).exec();
    }
    featuredProducts() {
        return productModel.find({ featuredProduct: 1 }, { _id: 0, __v: 0, addedTime: 0, featuredProduct: 0 }).exec();
    }
    getProducts(){
        return productModel.find({}).exec();
    }
    getProductByID(id){
        return productModel.findById(id).exec();
    }
}

module.exports = new Products();