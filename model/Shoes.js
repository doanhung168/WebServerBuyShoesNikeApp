const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ShoesSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  type: {type: ObjectId, ref: 'ShoesType'},
  number_of_reviews: {type: Number, default: 0},
  rate: {type: Number, default: 0},
  sold: {type: Number, default: 0},
  available_sizes: [Number],
  available_colors: [String],
  main_image: String,
  images: [String],
  gender: Number, // 0: All, 1: Male, 2: Female
  created_date: { type: Number, default: Date.now },
  state: {type: Number, default: 1}, // 0: Inactive, 1: Active, 2: Sold,
  quantity: Number,
  discount_quantity: Number,
  discount_unit: Number, // 0: %, 1: vnđ
  discounted_price: Number,
  final_price: Number
});

const Shoes = mongoose.model('Shoes', ShoesSchema);
module.exports = Shoes