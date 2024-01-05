const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserOfferSchema = new Schema({
    user_id: { type: ObjectId, ref: 'User' },
    offer_id: {type: ObjectId, ref: 'Offer'},
    used: {type: Boolean, default: false}
});

const UserOffer = mongoose.model('UserOffer', UserOfferSchema);
module.exports = UserOffer