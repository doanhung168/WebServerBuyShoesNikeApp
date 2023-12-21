const OrderDetail = require('../model/OrderDetail')

const OrderDetailController = {

    create: async (req, res) => {
        try {
            console.log(req)
            const { shoes_id, color, size, quantity } = req.body
            const exitedOrderDetail = await OrderDetail.findOne({ user_id: req.user._id, shoes_id: shoes_id, color: color, size: size, ordered: false })
            if (exitedOrderDetail) {
                exitedOrderDetail.quantity += parseInt(quantity)
                await exitedOrderDetail.save()  
                return res.json({ success: true, message: null, data: null })
            } else {
                const orderDetail = OrderDetail(req.body)
                orderDetail.user_id = req.user._id
                orderDetail.ordered = false
                await orderDetail.save()
                return res.json({ success: true, message: null, data: null })
            }
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    createF: async (shoes_id, color, size, quantity, user_id) => {
        const orderDetail = OrderDetail({shoes_id: shoes_id, color: color, size: size, quantity: quantity, user_id: user_id, ordered: true})
        await orderDetail.save()
        return orderDetail._id
    },

    getOrderDetailListByUser: async (req, res) => {
        try {
            console.log(req.user._id)
            const orderDetailList = await OrderDetail.find({ user_id: req.user._id, ordered: false }).populate('shoes_id')
            return res.json({ success: true, message: null, data: orderDetailList })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    delete: async (req, res) => {
        try {
            console.log(req.query)
            const { id } = req.query
            console.log(id)
            const result = await OrderDetail.findOneAndDelete({ _id: id, user_id: req.user._id })
            console.log(result)
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    updateToOrdered: async(id, user_id) => {
        await OrderDetail.findOneAndUpdate({ _id: id, user_id: user_id }, {ordered: true})
    },

    update: async (req, res) => {
        try {
            console.log(req)
            const { id, quantity } = req.body
            const updatedShoes = await OrderDetail.findOneAndUpdate({ _id: id, user_id: req.user._id }, { quantity: quantity }, { new: true })
            if (updatedShoes) {
                return res.json({ success: true, message: null, data: null })
            } else {
                return res.json({ success: false, message: "Xảy ra lỗi", data: null })
            }
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }

}


module.exports = OrderDetailController