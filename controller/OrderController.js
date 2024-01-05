const Order = require('../model/Order')
const OrderDetailController = require('../controller/OrderDetailController')
const UserController = require('../controller/UserController')
const UserOfferController = require('../controller/UserOfferController')
const ShoesController = require('../controller/ShoesController')

const OrderController = {

    create: async (req, res) => {
        try {
            console.log(req.body)
            req.body.user_id = req.user._id
            const order = Order(req.body)
            await order.save()

            const { order_details } = req.body
            order_details.forEach(async element => {
                await OrderDetailController.updateToOrdered(element, req.user._id)
            });
            await UserOfferController.update(req.user._id, req.body.offer, { used: true })
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    createByRawData: async (req, res) => {
        try {
            const { shoes_id, quantity, size, color } = req.body
            const orderDetailId = await OrderDetailController.createF(shoes_id, color, size, quantity, req.user._id)
            req.body.user_id = req.user._id
            req.body.order_details = [orderDetailId]
            const order = Order(req.body)
            await order.save()
            await UserOfferController.update(req.user._id, req.body.offer, { used: true })
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    get: async (req, res) => {
        try {

            const query = req.query

            let projection = {}
            Object.entries(query)
                .filter(([key, value]) => key.substring(0, 3) == 'get')
                .map(([key, value]) => {
                    projection[key.substring(4, key.length)] = parseInt(value)
                    delete query[key]
                })
            if (projection.length == 0) {
                projection = null
            }

            let sort = {}
            Object.entries(query)
                .filter(([key, value]) => key.substring(0, 4) == 'sort')
                .map(([key, value]) => {
                    sort[key.substring(5, key.length)] = parseInt(value)
                    delete query[key]
                })
            if (sort.length == 0) {
                sort = null
            }

            const filter = query

            const orders = await Order.find(filter, projection).populate({
                path: 'order_details',
                populate: 'shoes_id'
            }).sort(sort)
            return res.json({ success: true, message: null, data: orders })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    getById: async (req, res) => {
        try {
            const orders = await Order.findOne({ _id: req.query.id })
                .populate('address')
                .populate('offer')
                .populate({
                    path: 'order_details',
                    populate: 'shoes_id'
                })

            return res.json({ success: true, message: null, data: orders })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    getByStatus: async (req, res) => {
        try {
            const status = req.query
            const orders = Order.find({ status: status }).populate('address')
                .populate('offer')
                .populate({
                    path: 'order_details',
                    populate: 'shoes_id'
                })
            return res.json({ success: true, message: null, data: orders })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    getByUserId: async (req, res) => {
        try {
            const active = req.query.active
            if (active == 'true') {
                const orders = await Order.find({ user_id: req.user._id, status: { $in: [0, 1, 2] } }, { order_details: 1, status: 1, total_price: 1 })
                    .populate({
                        path: 'order_details',
                        populate: 'shoes_id'
                    })

                return res.json({ success: true, message: null, data: orders })
            } else {
                const orders = await Order.find({ user_id: req.user._id, status: { $in: [3, 4] } }, { order_details: 1, status: 1, total_price: 1 })
                    .populate({
                        path: 'order_details',
                        populate: 'shoes_id'
                    })

                return res.json({ success: true, message: null, data: orders })
            }
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },


    update: async (req, res) => {
        try {
            const updated = await Order.findByIdAndUpdate(req.body.id, req.body, { new: true })
            console.log(updated)
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    completeOrder: async (req, res) => {
        try {
            const updated = await Order.findByIdAndUpdate(req.body.id, {status: '3'}, { new: true }).populate('order_details')
            if(updated) {
                console.log(updated)
                updated.order_details.forEach(async element => {
                    await ShoesController.increaseShoesSold(element.shoes_id, element.quantity)
                    await OrderDetailController.updateReviewStatus(element._id, {evaluated: 1})
                });
                return res.json({ success: true, message: null, data: null })
            } else {
                return res.json({ success: false, message: "Không tìm thấy đơn hàng", data: null })
            }
            
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    cancelOrder: async (req, res) => {
        try {
            const { id, cancel_reason } = req.body
            const updated = await Order.findOneAndUpdate({ _id: id, user_id: req.user._id }, { cancel_reason: cancel_reason, status: 4 }, { new: true })
            console.log(updated)
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }

}


module.exports = OrderController