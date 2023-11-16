const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OfferSchema = new Schema({
    discount: Number,
    discount_unit: Number, //1: %, 2: USD
    start_time: Number,
    end_time: Number,
    type: {type: Number, default: true}, // 1: chung, 2: từng sản phẩm, 3: freeship
    applied_product_type: Number,  // 1: Shoes, 2: Shoes type
    applied_shoes: {type: [ObjectId], ref: 'Shoes'},
    applied_shoes_type: {type: [ObjectId], ref: 'ShoesType'},
    applied_user_type: [Number], //0:All, 1: New, 2: Silver, 3: Golden, 4: Diamond
    image: String,
    background_image: String, 
    title: String, 
    sub_title: String,
    description: String, 
    number_of_offer: Number, // -1: Unlimited
    created_date: {type: Number, default: Date.now},
    active: {type: Boolean, default: true},
    number_of_used_offer: {type: Number, default: 0},
});

const Offer = mongoose.model('Offer', OfferSchema);
module.exports = Offer