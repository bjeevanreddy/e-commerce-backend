const customersvc = require('../services/customer_svc');
const productssvc = require('../services/products_svc_customer');
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');
const customercntrl = {
    userregister: async function (req, res) {
        try {
            let username = req.body.userName;
            let mobile = req.body.mobile;
            let userpresent = await customersvc.usercheck(username, mobile);
            if (userpresent.length >= 1) {
                res.send("You are already a Buyer").status(200);
            }
            else {
                req.body.password = bcrypt.hashSync(req.body.password, 2);
                let result = await customersvc.userRegister(req.body);
                if (result) {
                    res.send("Congratulations your now a Buyer").status(200);
                }
            }
        } catch (error) {
            if (error && error.errmsg && error.errmsg.includes('duplicate key error collection') > -1) {
                res.status(200).send({ status: 0, data: 'Already exist' });
            } else {
                res.status(500).send('Internal server error');
            }
        }

    },
    userlogin: async function (req, res) {
        try {
            let user = await customersvc.userlogin(req.body.userName);
            let login = bcrypt.compareSync(req.body.password, user.password);
            // console.log(login);
            let token = jwt.sign({
                userName: req.body.userName,userId:user._id
            }, config.secret, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });
            // console.log(token);
            if (login) {
                // console.log(token);
                res.status(200).json({ status: 1, data: { username: req.body.userName, token: token } });
            }
            else {
                res.status(200).send({ status: 0, data: 'Invalid username/password' });
            }
        } catch (error) {
            res.send(error).status(200);
        }

    },
    addtocart: async function (req, res) {
        try {
            let productid = req.params.productid;
            let userid = req.params.userid;
            let quantity = req.params.quantity;
            let user = await customersvc.getuser(userid);
            let incart = false;
            let cartlength = user.cartitems.length;
            for (let i = 0; i < cartlength; i++) {
                if (user.cartitems[i].productid === productid) {
                    incart = true;
                    break;
                }
            }
            if (!incart) {
                user.cartitems.push({ productid: productid, quantity: quantity });
                user.save();
                res.send({status:1,message:"Added Successfully"}).status(200);
            } else {
                res.send({status:0,message:"Already in Cart"}).status(200);
            }

        } catch (error) {
            res.send("Internal Server Error").status(500);
        }
    },
    showcart: async function (req, res) {
        try {
            let userid = req.params.userid;
            let user = await customersvc.getuser(userid);
            let temparray = [];
            let cartlength = user.cartitems.length;
            // console.log(cartlength);
            if (cartlength > 0) {
                for (let i = 0; i < cartlength; i++) {
                    let productid = user.cartitems[i].productid;
                    //console.log( user.cartitems[i].productid);
                    let productdetails = await productssvc.getProductById(productid);

                    let quantity = user.cartitems[i].quantity;
                    // console.log(parseInt(quantity) * 5);
                   // let pname = productdetails.productName;
                   // let pid=productdetails._id;
                    let pprice = productdetails.productPrice;
                   // let amount = pprice * parseInt(quantity);
                    //console.log(typeOf(pprice));
                    temparray.push({product:productdetails,quantity:parseInt(quantity)});
                }
                //console.log(temparray);
                res.send(temparray).status(200);
            
            } else {
                res.send({status:1,message:"Cart Is Empty"}).status(200);
            }
        } catch (error) {
            res.send("Internal Error").status(500);
        }
    },
    userprofile: async function(req,res){
        try{
            let userid=req.params.userid;
        let user=await customersvc.getuserprofile(userid);
        res.json(user).status(200);
        }catch(error)
        {
            res.send("Internl Server Error").status(500);
        }
    }
}

module.exports = customercntrl;