const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderDetailSchema = new Schema({
    user_id: String,
    shoes_id: { type: ObjectId, ref: 'Shoes' },
    size: Number,
    color: String,
    quantity: Number,
    ordered: {type: Boolean, default: false},
    evaluated: {type: Number, default: 3}, // 0: yet, 1: not yet, 2: pending, 3: not able
    created_date: {type: Number, default: Date.now()}
})
const OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema);
module.exports = OrderDetail