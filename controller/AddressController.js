const Address = require('../model/Address')

const AddressController = {
    create: async (req, res) => {
        req.body.idU = req.user._id
        console.log(req.body)
        try {
            if (req.body.default == 'true') {
                await Address.findOneAndUpdate({ idU: req.user._id, default: true }, { default: false })
            }
            const address = new Address(req.body)
            await address.save()
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    getByUserID: async (req, res) => {
        try {
            console.log(req.query + " /n user_id: " + req.user._id)
            var listAddress = await Address.find({ 'idU': req.user._id })
            return res.json({ success: true, message: null, data: listAddress })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },


    update: async (req, res) => {
        try {
            console.log(req.body)
            if (req.body.default == 'true') {
                await Address.findOneAndUpdate({ idU: req.user._id, default: true }, { default: false })
            }
            const updatedaddress = await Address.findOneAndUpdate({ _id: req.body.id, idU: req.user._id }, req.body, { new: true })
            if (updatedaddress) {
                return res.json({ success: true, message: null, data: null })
            } else {
                return res.json({ success: false, message: "Xảy ra lỗi", data: null })
            }
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    delete: async (req, res) => {
        try {
            console.log(req.params)
            const result = await Address.findOneAndDelete({ _id: req.params.id, idU: req.user._id })
            console.log(result)
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    geDefaultAddressByUserID: async (req, res) => {
        try {
            const result = await Address.findOne({ idU: req.user.id, default: true })
            if (result) {
                return res.json({ success: true, message: null, data: result })
            } else {
                return res.json({ success: false, message: "Không tìm thấy địa chỉ mặc định", data: null })
            }

        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }

}

module.exports = AddressController