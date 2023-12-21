const Order = require('../model/Order')
const OrderDetailController = require('../controller/OrderDetailController')

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
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    get: async (req, res) => {
        try {
            const orders = Order.find()
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
                const orders = await Order.find({ user_id: req.user._id, status: { $in: [0, 1, 2] } })
                    .populate('address')
                    .populate('offer')
                    .populate({
                        path: 'order_details',
                        populate: 'shoes_id'
                    })

                return res.json({ success: true, message: null, data: orders })
            } else {
                const orders = await Order.find({ user_id: req.user._id, status: { $in: [3, 4] } })
                    .populate('address')
                    .populate('offer')
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
            const updated = await Order.findByIdAndUpdate(id, req.body, { new: true })
            console.log(updated)
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    cancelOrder: async (req, res) => {
        try {
            const { id, cancel_reason } = req.body
            const updated = await Order.findByIdAndUpdate(id, { cancel_reason: cancel_reason, status: 4 }, { new: true })
            console.log(updated)
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }

}


module.exports = OrderController