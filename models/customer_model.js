let mongoose=require('mongoose');

let customerschema=mongoose.Schema({
    userName:{type:String,unique:true,required:true},
    name:String,
    mobile:Number,
    mail:{type:String,unique:true,required:true},
    password:String,
    gender:String ,
    cartitems:[Object],
    accountcreated: {type:Date,default:Date.now()}
});
let customermodel=mongoose.model('customers',customerschema);

module.exports=customermodel;