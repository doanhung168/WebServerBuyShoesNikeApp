const Shipping = require('../model/Shipping')

const ShippingController  ={
    create : async(req,res) =>{
        try {
            const objShipping = await Shipping.where({ 'name': req.body.name }).countDocuments()
            if (objShipping > 0) {
                return res.json({ success: false, message: 'Exist shoes', data: null })
            }
            const shipping = new Shipping(req.body)
            await shipping.save()
            return res.json({ success: true, message: null, data: shipping })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },
    get: async (req,res) =>{
        try {
            var listShipping = await Shipping.find()
            return res.json(listShipping)
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },
    getById:async(req,res)=>{
        try {
            let shipping = await Shipping.findById(req.params.id)
            return res.json(shipping)
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }
}
module.exports = ShippingController