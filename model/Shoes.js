const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ShoesSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  type: {type: ObjectId, ref: 'ShoesType'},
  rate: {type: Number, default: 0},
  sold: {type: Number, default: 0},
  available_sizes: [Number],
  available_colors: [String],
  main_image: String,
  images: [String],
  gender: Number, // 0: All, 1: Male, 2: Female
  created_date: { type: Number, default: Date.now },
  state: {type: Number, default: 1}, // 0: Inactive, 1: Active, 2: Sold
});

const Shoes = mongoose.model('Shoes', ShoesSchema);
module.exports = Shoes