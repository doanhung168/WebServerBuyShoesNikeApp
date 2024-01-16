const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notificationShema = new Schema({
    id_user:String,
    title:String,
    content:String,
    seen:{type:Boolean,default:false},
    link:String,
    type: String, // 0:thông báo khuyến mãi  1:thông báo trạng thái đơn hàng   2:thông báo đơn hàng hoàn thành  
    time:{ type: Number, default: Date.now }
    
})
const Notification = mongoose.model("Notification",notificationShema)
module.exports = Notification