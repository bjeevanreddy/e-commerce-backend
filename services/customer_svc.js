const customermodel=require('../models/customer_model');

class Customer{
    userRegister(data){
        let user=new customermodel(data);
        return user.save();
    }
    usercheck(username,mobile)
    {
        return customermodel.find({ $or: [{ userName: username }, { mobile: mobile }] }).exec();
    }
    userlogin(username){
        return customermodel.findOne({userName:username}).exec();
    }
    getuser(id)
    {
        return customermodel.findOne({_id:id}).exec();
    }
    getuserprofile(id){
        return customermodel.findOne({_id:id},{cartitems:0,_id:0,__v:0,password:0,accountcreated:0}).exec();
    }
    
}

module.exports=new Customer();