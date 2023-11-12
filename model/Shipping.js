const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ShippingSchema = new Schema ({
    name: String,
    price:Number,
})


const Shipping= mongoose.model('Shipping', ShippingSchema);
module.exports = Shipping