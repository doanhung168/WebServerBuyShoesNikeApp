const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ShoesTypeSchema = new Schema({
  name: String,
  created_date: { type: Number, default: Date.now },
});

const ShoesType = mongoose.model('ShoesType', ShoesTypeSchema);
module.exports = ShoesType