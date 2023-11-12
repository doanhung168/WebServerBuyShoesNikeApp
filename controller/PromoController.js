const Promo = require('../model/Promo')

const PromoController  ={
    create : async(req,res) =>{
        try {
            const objPromo = await Promo.where({ 'name': req.body.name }).countDocuments()
            if (objPromo > 0) {
                return res.json({ success: false, message: 'Exist shoes', data: null })
            }
            const promo = new Promo(req.body)
            await promo.save()
            return res.json({ success: true, message: null, data: promo })
        } catch (error) {
            
        }
    },
    get: async (req,res) =>{
        try {
            var listPromo = await Promo.find()
            return res.json(listPromo)
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }
}
module.exports = PromoController