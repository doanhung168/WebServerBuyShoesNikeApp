const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderDetailSchema = new Schema({
    user_id: String,
    shoes_id: { type: ObjectId, ref: 'Shoes' },
    size: Number,
    color: String,
    quantity: Number,
    created_date: {type: Number, default: Date.now()}
})
const OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema);
module.exports = OrderDetail