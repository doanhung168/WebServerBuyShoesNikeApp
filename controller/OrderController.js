const Order = require('../model/Order')
const OrderDetailController = require('../controller/OrderDetailController')

const OrderController = {

    create: async (req, res) => {
        try {
            console.log(req.body)
            req.body.user_id = req.user._id
            const order = Order(req.body)
            await order.save()

            const {order_details} = req.body
            order_details.forEach(async element => {
                await OrderDetailController.deleteF(element, req.user._id)
            });

            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    get: async (req, res) => {

    },

    getByUserId: async (req, res) => {
        try {
            
            const order = Order(req.body)
            await order.save()

            const {order_details} = req.body
            order_details.forEach(async element => {
                await OrderDetailController.deleteF(element, req.user._id)
            });

            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },  


    update: async (req, res) => {

    },

    cancelOrder: async (req, res) => {

    }

}


module.exports = OrderController