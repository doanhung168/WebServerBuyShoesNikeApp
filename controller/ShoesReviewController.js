const ShoesReview = require('../model/ShoesReview')
const ShoesController = require('../controller/ShoesController')
const OrderDetailController = require('../controller/OrderDetailController')

const ShoesReviewController = {

    get: async (req, res) => {
        try {
            const shoesReviewList = await ShoesReview.find(req.query).populate('user_id').sort({ created_date: -1 })
            return res.json({ success: true, message: null, data: shoesReviewList })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    add: async (req, res) => {
        try {
            const user_id = req.user._id
            req.body.user_id = user_id
            const shoesReview = ShoesReview(req.body)
            await shoesReview.save()
            const orderDetail = await OrderDetailController.updateReviewStatus(req.body.order_id, { evaluated: 0 })
            const shoes = await ShoesController.updateReviewShoes(req.body.shoes_id, parseFloat(req.body.rate)) 
            console.log(orderDetail)
            console.log(shoes)
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }

}

module.exports = ShoesReviewController