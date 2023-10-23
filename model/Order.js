const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
    user_id: { type: ObjectId, ref: 'User' },
    order_detail: { type: [ObjectId], ref: 'OrderDetail' },
    address: String,
    price: Number,
    applied_offers: { type: [ObjectId], ref: 'Offer' },
    phone_number: String,
    order_date: { type: Date, default: Date.now },
    receive_date: { type: Date, default: Date.now },
    status: Number,
    pay_method: Number,
    origin_price: Number
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order