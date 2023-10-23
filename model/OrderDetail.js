const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderDetailSchema = new Schema({
    shoes_id: { type: ObjectId, ref: 'Shoes' },
    size: Number,
    color: String,
});

const OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema);
module.exports = OrderDetail