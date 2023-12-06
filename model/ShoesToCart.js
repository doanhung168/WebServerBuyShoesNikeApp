const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ShoesToCartSchema =new Schema({
    idU:String,
    idShoes:String,
    sizeChoose:Number,
    colorChoose:String,
    quantity :Number,
    createdDate: { type: Number, default: Date.now }
})
const ShoesToCart= mongoose.model('ShoesToCart', ShoesToCartSchema);
module.exports = ShoesToCart