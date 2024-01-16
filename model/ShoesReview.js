const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ShoesReviewSchema = new Schema({
  comment: String,
  rate: Number,
  shoes_id: {type: ObjectId, ref: 'Shoes'},
  user_id: {type: ObjectId, ref: 'User'},
  created_date: {type: Number, default: Date.now}
});

const ShoesReview = mongoose.model('ShoesReview', ShoesReviewSchema);
module.exports = ShoesReview