const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PromoSchema = new Schema({
    name:String,
    discount:Number,
    title:String,
    quantity:Number
})
const Promo= mongoose.model('Promo', PromoSchema);
module.exports = Promo