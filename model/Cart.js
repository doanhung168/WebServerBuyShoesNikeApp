const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CartSchema = new Schema({
    user_id: {type: ObjectId, ref: 'User'},
    order_shoes: {type: [ObjectId], ref: 'OrderShoes'}
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart