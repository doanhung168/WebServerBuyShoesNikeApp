const UserOffer = require('../model/UserOffer')

const UserOfferController = {
    add: async (req, res) => {
        try {
            req.body.user_id = req.user._id
            await UserOffer(req.body).save()
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    update: async (user_id, id, update) => {
        try {
            await UserOffer.findOneAndUpdate({ user_id: user_id, _id: id }, update)
        } catch (error) {
            console.log(error.message)
        }
    },

    getByUserId: async (req, res) => {
        try {
            const userOffers = await UserOffer.find({ user_id: req.user._id })
                .populate('user_id')
                .populate('offer_id')
            return res.json({ success: true, message: null, data: userOffers })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }
}

module.exports = UserOfferController