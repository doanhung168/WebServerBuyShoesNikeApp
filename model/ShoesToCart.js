const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ShoesToCartSchema =new Schema({
    idU:String,
    idShoes:String,
    sizeChoose:Number,
    colorChoose:String,
    createdDate: { type: Number, default: Date.now },
    quantity :Number
})
const ShoesToCart= mongoose.model('ShoesToCart', ShoesToCartSchema);
module.exports = ShoesToCart