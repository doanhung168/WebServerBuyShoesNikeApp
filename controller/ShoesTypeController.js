const ShoesType = require('../model/ShoesType')

const ShoesTypeController = {

    create: async (req, res) => {
        try {

            if (req.body.name == '') {
                return res.json({ success: false, message: 'Name cannot be empty', data: null })
            }

            const shoesTypeNumber = await ShoesType.countDocuments({ name: req.body.name })
            if (shoesTypeNumber > 0) {
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
            const query = req.query
            const shoesTypes = await ShoesType.find(query).sort({ created_date: 1 })
            return res.json({ success: true, message: null, data: shoesTypes })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    update: async (req, res) => {
        try {
            const id = req.body.id
            delete req.body.id
            const shoesType = await ShoesType.findByIdAndUpdate(id, req.body, { new: true })
            if (shoesType != null) {
                return res.json({ success: true, message: null, data: shoesType })
            } else {
                return res.json({ success: false, message: 'Không tìm thấy loại giày', data: null })
            }
        } catch (error) {
            return res.json({ success: false, message: error, data: null })
        }
    }

}

module.exports = ShoesTypeController