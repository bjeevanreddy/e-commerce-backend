const customercntrl=require('../controllers/customer_cntrl');
const express=require('express');
const router=express.Router();

router.post('/register',customercntrl.userregister);
router.post('/login',customercntrl.userlogin);
router.get('/addcart/:userid/:productid/:quantity',customercntrl.addtocart);
router.get('/showcart/:userid',customercntrl.showcart);
router.get('/profile/:userid',customercntrl.userprofile);
module.exports=router;