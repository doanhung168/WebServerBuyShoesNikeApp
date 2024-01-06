const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
    user_id: { type: ObjectId, ref: 'User' },
    order_details: { type: [ObjectId], ref: 'OrderDetail' },
    address: { type: ObjectId, ref: 'Address' },
    offer: { type: ObjectId, ref: 'Offer' },
    order_date: { type: Number, default: Date.now },
    receive_date: {type: Number, default: 0},
    status: { type: Number, default: 0 }, // 0: đóng gói, 1: vận chuyển, 2: giao hàng, 3: đã nhận hàng, 4: hủy
    payment_method: Number,
    payment_complete: { type: Boolean, default: false },
    cancel_reason: String,
    total_price: Number,
    sale: Number,
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order