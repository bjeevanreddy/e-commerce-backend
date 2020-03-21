const express = require('express');
const router = express.Router();
const products_cntrl_cus = require('../controllers/products_cntrl_customer');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let filename = Date.now() + '-' + file.originalname;
    req.body.productImage = filename;
    cb(null, filename)
  }
});
const upload = multer({ storage: storage });

router.get('/category/:category',products_cntrl_cus.getByCategory);
router.get('/sortbypricelow',products_cntrl_cus.getByPriceLowtoHigh);
router.get('/sortbypricehigh',products_cntrl_cus.getByPriceHightoLow);
router.get('/products/:category/:subcategory',products_cntrl_cus.getBycategory_subcategory);

module.exports=router;