var FCM  =require('fcm-node')
const Token = require('../model/Token')
const Notification = require('../model/Notification');
const NotificationController ={
    pushNoti:async(req,res) =>{
        try {
            var serverKey = 'AAAAAQBOwFE:APA91bGiHaLC5bTJCTzXfkQN_VnJL3SEfyrvIqTXAT98vbKE8cnBOKcZlcHPgJ8gW3xdqd7-pbrenhuBGkRiRMOdwjW6yaEQLOT-3EAlYfGnNrcfoPDk8t6XqLEHxJpDq5CesvnoTyER';
            var fcm = new FCM(serverKey);
            const tokenUser = await Token.where({userId:req.body.userId})
            console.log(tokenUser);
            tokenUser.forEach((tonkenU) =>{
                var message = { 
                    "notification": {
                        "title": req.body.title,
                        "body": req.body.content,
                       "image":req.body.image                
                   },
                   "data":{
                    "id":"123",
                    "type":"0"
                   },
                    "to":tonkenU.token
                };
                fcm.send(message,async function(err, response){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("check notification succses"); 
                        return res.json({ success: true, message:null, data: message })
                    }
                });  
            })  
           
          
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
       
    },
    get:async(req,res)=>{
        try {
            const notification = await Notification.find()
            return res.json({ success: true, message:null, data: notification })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        } 
    },
    getByIdUser:async(req,res)=>{
        try {
            const notification = await Notification.find({id_user:req.params.id_user})
            return res.json({ success: true, message:null, data: notification })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },
    getNotificationOffer:async(req,res)=>{
        try {
            const notification = await Notification.find({type:0})
            return res.json({ success: true, message:null, data: notification })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },
    updateSeenNotification:async(req,res)=>{
        try {
            const notification = await Notification.findById(req.params.idN)
            if(notification!=null){
                await Notification.findByIdAndUpdate(req.params.idN,{seen:true})
                return res.json({ success: true, message:"Success", data: null })

            }else{
                return res.json({ success: false, message: 'Notification ko ton tai', data: null })
            }
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },
    getQuantityNotification:async(req,res)=>{
        try{
            const numberNotificationIdU = await Notification.countDocuments({link:req.params.idU,seen:false})
            const numberNotificationSale = await Notification.countDocuments({type:0,seen:false})
            var count = numberNotificationIdU+numberNotificationSale
            return res.json({ success: true, message:"Success", data: count })
        }catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }

}
    
module.exports = NotificationController