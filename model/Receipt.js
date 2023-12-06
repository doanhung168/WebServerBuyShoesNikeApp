const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ReceiptSchema = new Schema({
    cart:Object,
    status:Number,//trang thai don hang vd : cho xacnhan , danggiao , huydon , thanhcong, ...
    createdDate: { type: Number, default: Date.now }
})

const Receipt= mongoose.model('Receipt', ReceiptSchema);
module.exports = Receipt