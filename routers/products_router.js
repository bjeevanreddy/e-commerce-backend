const express = require('express');
const router = express.Router();
const productscntrl = require('../controllers/products_cntrl');
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

router.post('/addproduct', upload.single('productImage'), productscntrl.addProducts);
router.put('/updateproduct', productscntrl.updateProduct);
router.delete('/deleteproduct/:id', productscntrl.deleteProduct);
router.get('/totalproducts', productscntrl.productCount);
router.get('/featured', productscntrl.getfeaturedProducts);

module.exports = router;
