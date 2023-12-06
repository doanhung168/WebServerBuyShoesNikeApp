const Receipt = require('../model/Receipt')

const ReceiptController ={
    create : async(req,res) =>{
        try {
            const receipt = new Receipt(req.body)
            await receipt.save()
            return res.json({ success: true, message: null, data: receipt })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }
}
module.exports = ReceiptController