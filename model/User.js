const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const { Bcrypt, Constraint } = require('../utlity')

const UserSchema = new Schema({
  name: String,
  orders: { type: [ObjectId], ref: 'Order' },
  cart: {type: [ObjectId], ref: 'OrderDetail'},
  favorite_shoes: { type: [ObjectId], ref: 'Shoes' },
  email: String,
  password: String,
  account_type: {type: Number, default: 0}, // 0: local, 1: facebook, 2: google
  account_id: Number, 
  state: { type: Number, default: 1 }, // 0: inactive, 1: active, 2: block
  authen_code: { type: Number, default: -1 },
  avatar: String,
  created_date: { type: Number, default: Date.now },
  full_name: String,
  birth_day: Number, 
  phone_number: String,
  gender: Number, // 0: undefine, 1: Male, 2: Female
});

UserSchema.pre('save', async function (next) {
  try {
    if (this.password) {
      this.password = await Bcrypt.enscrypt(this.password)
    }
  } catch (e) {
    next(e)
  }
})

const User = mongoose.model('User', UserSchema);
module.exports = User