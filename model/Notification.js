const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notificationShema = new Schema({
    title:String,
    content:String,
    seen:{type:Boolean,default:false},
    link:String,
    type:{type:Number,default:0},
    time:{ type: Number, default: Date.now }
})
const Notification = mongoose.model("Notification",notificationShema)
module.exports = Notification