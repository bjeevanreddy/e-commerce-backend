const products_service = require('../services/products_svc');
const products_cat = require('../models/products_category');
const productsControl = {
    addProducts: async function (req, res) {
        try {
            let canbeadded = false;
            let maincategory = req.body.productCategory;
            let subcategory = req.body.productSubCategory;
            for (let i = 0; i < products_cat.length; i++) {
                if (products_cat[i].categoryName === maincategory) {
                    let subcat = products_cat[i].subcategoryName;
                    for (let j = 0; j < subcat.length; j++) {
                        if (subcat[j] === subcategory) {
                            canbeadded = true;
                            break;
                        }
                    }
                }
            }
            if (canbeadded) {
                let newproduct = await products_service.addProduct(req.body);
                if (newproduct) {
                    res.send("Added Successfully!!!!");
                    res.status(200);
                }
            }
            else {
                res.send("Cannot be added");
                res.status(200);
            }
        } catch (error) {
            res.send("Internal error");
            res.status(500);
        }
    },
    updateProduct: async function (req, res) {
        try {
            let id = req.body._id;
            let updated = await products_service.updateProduct(id, req.body);
            if (updated) {
                res.send("Updated Successfully!!!").status(200);
            }
            else {
                res.send("Cannot update").status(200);
            }
        } catch (error) {
            res.send("Internal Error").status(500);
        }

    },
    deleteProduct: async function (req, res) {
        try {
            let id = req.params.id;
            let deleted = await products_service.deleteProduct(id);
            if (deleted) {
                res.send("deleetd Successfully!!!").status(200);
            } else {
                res.send("cannot delete").status(200);
            }
        } catch (error) {
            res.send("Internal Server Error").status(500);
        }
    },
    productCount: async function (req, res) {
        try {
            let count = await products_service.productCount();
            res.send({ "No.of Products": count.length });
            res.status(200);
        } catch (error) {
            res.send("Internal Error").status(500);
        }
    },
    getfeaturedProducts: async function (req, res) {
        try {
            let featured = await products_service.featuredProducts();
            for (let i in featured) {
                featured[i].productImage = `${req.protocol}://${req.get('host')}/${featured[i].productImage}`;
            }
            if (featured.length >= 1) {
                res.send({ "Total Featured": featured.length, "Products": featured });
                res.status(200);
            } else {
                res.send("NO Featured Products").status(200);
            }
        } catch (error) {
            res.send("Internal Server Error").status(500);
        }
    },
    getproducts: async function(req,res)
    {
        try{
            let prod=await products_service.getProducts();
            for (let i in prod) {
                prod[i].productImage = `${req.protocol}://${req.get('host')}/${prod[i].productImage}`;
            }
        if(prod.length>0)
        {
            res.json(prod).status(200);
        }else{
            res.send("No products").status(200);
        }

        }catch(err)
        {
            res.send("internal Server Error").status(500);
        }
    },
    getproductbyID: async function(req,res)
    {
        try{
            let id=req.params.id;
            let prod=await products_service.getProductByID(id);
            if(prod)
            {
                res.send(prod).status(200);
            }else{
                res.send("product not found").status(200);
            }

        }catch(err)
        {
            res.send("Internal Serrver Error").status(500);
        }
    }
}

module.exports = productsControl;

