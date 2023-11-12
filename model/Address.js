const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    name:String,
    address:String,
    default:Boolean,
    idU:String
})
const Address= mongoose.model('Address', addressSchema);
module.exports = Address