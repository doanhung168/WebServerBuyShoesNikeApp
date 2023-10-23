const ShoesType = require('../model/ShoesType')

const ShoesTypeController = {

    create: async (req, res) => {
        try {

            if(req.body.name == '') {
                return res.json({ success: false, message: 'Name cannot be empty', data: null })
            }

            const shoesTypeNumber = await ShoesType.where({'name': req.body.name}).countDocuments()
            if(shoesTypeNumber > 0) {
                return res.json({ success: false, message: 'Exist shoes type', data: null })
            }

            const shoesType = new ShoesType(req.body)
            await shoesType.save()
            return res.json({ success: true, message: null, data: shoesType })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    get: async (req, res) => {
        try {
            const shoesTypes = await ShoesType.find().sort({ created_date: 1 })
            return res.json({ success: true, message: null, data: shoesTypes })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }

}

module.exports = ShoesTypeController