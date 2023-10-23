const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: String,
    orders: {type: [ObjectId], ref: 'Order'},
    favorite_shoes: {type: [ObjectId], ref: 'Shoes'},
    email: String,
    password: String,
    account_type: Number,
    state: Number,
    authen_code: Number,
    avatar: String,
    offers: {type: [ObjectId], ref: 'Offer'},
    created_date: { type: Date, default: Date.now },
  });
  
  const User = mongoose.model('User', UserSchema);
  module.exports = User