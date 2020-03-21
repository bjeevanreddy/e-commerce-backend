let mongoose=require('mongoose');
let date=new Date();
var year=date.getFullYear();
var month=date.getMonth();
var day =date.getDay();
// var hrs=date.getHours();
// var min=date.getMinutes();
var new_date1=new Date(year,month,day);

let productSchema=mongoose.Schema({
    productName:{type:String,required:true},
    productPrice:Number,
    addedTime:{type:Date,default:new_date1},
    featuredProduct:{type:Number,default:0},
    productStock:Number,
    productImage:String,
    productCategory:String,
    productSubCategory:String,
    productSizeandvariants:[String]
});
let productmodel=mongoose.model('products',productSchema);

module.exports=productmodel;