const Shoes = require('../model/Shoes')

const ShoesController = {

    create: async (req, res) => {
        try {

            const shoesNumber = await Shoes.where({ 'name': req.body.name }).countDocuments()
            if (shoesNumber > 0) {
                return res.json({ success: false, message: 'Exist shoes', data: null })
            }

            const shoes = new Shoes(req.body)
            await shoes.save()
            return res.json({ success: true, message: null, data: shoes })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    get: async (req, res) => {
        try {
            const { page, page_item, type } = req.query
            if (req.body.id) {
                const shoes = await Shoes.find({ _id: req.body.id })
                return res.json({ success: true, message: null, data: shoes })
            } else {
                let _page = 0
                let _page_item = 10

                if (page) {
                    _page = page
                }

                if (page_item) {
                    _page_item = page_item
                }

                if (type) {
                    const shoesTotal = await Shoes.where({ type: type }).countDocuments()
                    const shoes = await Shoes.find({ type: type }, {_id: 1, name: 1, sold: 1, rate: 1, main_image: 1, price: 1})
                        .sort({ created_date: 1 })
                        .skip(_page * _page_item)
                        .limit(_page_item)

                    return res.json({ success: true, message: null, data: { total: shoesTotal, shoes: shoes } })

                } else {
                    const shoesTotal = await Shoes.countDocuments()
                    const shoes = await Shoes.find({}, {_id: 1, name: 1, sold: 1, rate: 1, main_image: 1, price: 1})
                        .sort({ created_date: 1 })
                        .skip(_page * _page_item)
                        .limit(_page_item)

                    return res.json({ success: true, message: null, data: { total: shoesTotal, shoes: shoes } })
                }
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }

}

module.exports = ShoesController