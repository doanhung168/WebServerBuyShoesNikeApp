const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    type: Number, // 0: house, 1: office
    phone_number: String,
    user_name:String,
    address:String,
    default:Boolean,
    idU:String
})
const Address= mongoose.model('Address', addressSchema);
module.exports = Address