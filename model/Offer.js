const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Type: 
// 1: for type user
// 2: for day
// 3: for specific shoes
// 4: for specific shoes type
// 5: for time

const OfferSchema = new Schema({
    type: Number, 
    discount: Number,
    discount_unit: Number,
    sale_day: String, 
    started_sale_time: Number,
    ended_sale_time: Number,
    applied_product: {type: [ObjectId], ref: 'Shoes'},
    applied_type: {type: [ObjectId], ref: 'ShoesType'},
    applied_user_type: [String],
    image: String,
    title: String, 
    sub_title: String,
    description: String, 
    created_date: {type: Date, default: Date.now}
});

const Offer = mongoose.model('Offer', OfferSchema);
module.exports = Offer