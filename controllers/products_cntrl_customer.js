const products_service_customer = require('../services/products_svc_customer');
const products_cat = require('../models/products_category');

const product_cus_svc={
    getByCategory: async function(req,res)
    {
        try{
            let category=req.params.category;
        let products=await products_service_customer.getProductsByCategory(category);
        if(products.length>=1){
            res.json(products).status(200);
        }else{
            res.send("No products for this category").status(200);
        }
        }catch(error)
        {
            res.send("Internal Server Error").status(500);
        }
    },
    getByPriceLowtoHigh: async function(req,res){
        try{
            let lowhigh=await products_service_customer.getProductsByPriceLowToHigh();
            if(lowhigh)
            {
                res.json(lowhigh).status(200);
            }
        }catch(error){
            res.send("Internal Server Error").status(500);
        }
    },
    getByPriceHightoLow: async function(req,res){
        try{
            let highlow=await products_service_customer.getProductsByPriceHighToLow();
            if(highlow)
            {
                res.json(highlow).status(200);
            }
        }catch(error){
            res.send("Internal Server Error").status(500);
        }
    },
    getBycategory_subcategory: async function(req,res){
        try{
            let category=req.params.category;
            let subcategory=req.params.subcategory;
            let products=await products_service_customer.getProductBySubcategory(category,subcategory);
            if(products.length>=1){
                res.json(products).status(200);
            }else{
                res.send("No products found in this sub category!!!!").status(200);
            }
        }catch(error)
        {
            res.send("Internal Server Error").status(500);
        }
    }
}
module.exports=product_cus_svc;

// getProductsByIndex: async function (req, res) {
//     try {
//         let cnt = await productsvc.getProductsCount();
//         let pageIndex = +req.params.pageIndex || 0;
//         let pageSize = +req.params.pageSize || 10;
//         let totalPages = Math.ceil(cnt / pageSize);
//         let metadata = {
//             count: cnt,
//             totalPages: totalPages,
//             hasPrevious: pageIndex > 0,
//             hasNext: pageIndex < totalPages - 1
//         };
//         let productsToSkip = Math.ceil(pageIndex * pageSize);
//         let response = await products_service_customer.getProductsUsingLimit(productsToSkip, pageSize);
//         let jsonResponse = response;
//         for(let i = 0; i < jsonResponse.length; i++){
//             if(jsonResponse[i].image) jsonResponse[i].image = `${req.protocol}://${req.get('host')}/${jsonResponse[i].image}`;
//             else jsonResponse.image = '';
//         }
//         for(let i = 0; i < jsonResponse.length; i++){
//             let reviews = await reviewsSvc.getReviews(jsonResponse[i]._id);
//             let updatedResponse = jsonResponse[i].toJSON();
//             updatedResponse.reviews = reviews;   
//             jsonResponse[i] = updatedResponse;
//         }
//         res.json({ metadata: metadata, data: jsonResponse });
//         res.status(200);
//     } catch (error) {
//         res.send(error);
//         res.status(200);
//     }
// }