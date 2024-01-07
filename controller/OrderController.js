const Order = require('../model/Order')
const OrderDetailController = require('../controller/OrderDetailController')
const UserController = require('../controller/UserController')
const UserOfferController = require('../controller/UserOfferController')
const ShoesController = require('../controller/ShoesController')
var FCM  =require('fcm-node')
const Token = require('../model/Token')
const Notification = require('../model/Notification');
var serverKey = 'AAAAAQBOwFE:APA91bGiHaLC5bTJCTzXfkQN_VnJL3SEfyrvIqTXAT98vbKE8cnBOKcZlcHPgJ8gW3xdqd7-pbrenhuBGkRiRMOdwjW6yaEQLOT-3EAlYfGnNrcfoPDk8t6XqLEHxJpDq5CesvnoTyER';
var fcm = new FCM(serverKey);
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
            const { status } = req.query
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
            const tokenUser = await Token.where({userId:req.body.user_id})
            var StrStatus =""
            if(req.body.status ==0){
                StrStatus="đang đóng gói"
            }else if(req.body.status==1){
                StrStatus ="đang vận chuyển"
            }else if(req.body.status==2){
                StrStatus ="đang giao hàng"
            }else if(req.body.status==3){
                StrStatus ="đã nhận hàng"
            }else{
                StrStatus ="đã hủy"
            }
            console.log(StrStatus);
            tokenUser.forEach((tonkenU) =>{
                console.log(tonkenU);
                var message = { 
                    "notification": {
                        "title":"Trạng thái đơn hàng",
                       "body": "Đơn Hàng "+req.body.id+StrStatus,               
                   },
                   "data":{
                    "id":req.body.id,
                    "type":"1"
                   },
                    "to":tonkenU.token
                };
                fcm.send(message, async function(err, response){
                    if (err) {
                        console.log(err);
                    } else {
                      console.log(message); 
                    }
                });
                
            }) 
            const notification = new Notification
                notification.title = "Trạng thái đơn hàng"
                notification.content ="Đơn hàng "+updated._id+" "+ StrStatus
                notification.link = req.body.id
                notification.type = 1
                notification.id_user = req.body.user_id
                await notification.save()
                console.log(updated)
                return res.json({ success: true, message: null, data: notification })
           
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    completeOrder: async (req, res) => {
        try {
            const updated = await Order.findByIdAndUpdate(req.body.id, { status: 3, receive_date: Date.now() }, { new: true }).populate('order_details')
            const tokenUser = await Token.where({userId:updated.user_id})

            if (updated) {
                console.log(updated)
                updated.order_details.forEach(async element => {
                    await ShoesController.increaseShoesSold(element.shoes_id, element.quantity)
                    await OrderDetailController.updateReviewStatus(element._id, { evaluated: 1 })
                });
                tokenUser.forEach((tonkenU) =>{
                    console.log(tonkenU);
                    var message = { 
                        "notification": {
                            "title":"Trạng thái đơn hàng",
                           "body": "Đơn Hàng "+updated._id+" "+StrStatus,               
                       },
                       "data":{
                        "id":req.body.id,
                        "type":"1"
                       },
                        "to":tonkenU.token
                    };
                    fcm.send(message, async function(err, response){
                        if (err) {
                            console.log(err);
                        } else {
                          console.log(message); 
                        }
                    });
                    
                }) 
                const notification = new Notification
                notification.title = "Trạng thái đơn hàng"
                notification.content ="Đơn hàng thành công"
                notification.link = updated._id
                notification.type = 2
                notification.id_user = updated.user_id
                await notification.save()
                
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
    },

    getOrderForEnvenue: async (req, res) => {
        try {
            const { start_time, end_time } = req.query
            const result = await Order.find({ status: 3, receive_date: { $gte: start_time, $lte: end_time } }, { _id: 1, total_price: 1, receive_date: 1 })
                .sort({ order_date: -1 })
            return res.json({ success: true, message: null, data: result })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

}


module.exports = OrderController