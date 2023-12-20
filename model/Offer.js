const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    title: String, 
    description: String, 
    discount: Number,
    discount_unit: Number, //0: %, 1: VNĐ
    start_time: Number,
    end_time: Number,
    image: String,
    number_of_offer: Number, // -1: Unlimited
    value_to_apply: Number, 
    max_value: Number, // -1: Unlimited
    created_date: {type: Number, default: Date.now},
    active: {type: Boolean, default: true},
    number_of_used_offer: {type: Number, default: 0},
});

const Offer = mongoose.model('Offer', OfferSchema);
module.exports = Offer