const Offer = require('../model/Offer')

const OfferController = {

    add: async (req, res) => {
        try {

            console.log(req.body)

            const { title } = req.body
            const existOffer = await Offer.countDocuments({ title: title })
            if (existOffer > 0) {
                return res.json({ success: false, message: 'Đã tồn tại khuyến mãi này', data: null })
            }

            const offer = new Offer(req.body)
            await offer.save()
            return res.json({ success: true, message: null, data: offer })

        } catch (error) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    get: async (req, res) => {
        try {
            const query = req.query

            let projection = {}
            Object.entries(query)
                .filter(([key, value]) => key.substring(0, 3) == 'get')
                .map(([key, value]) => {
                    projection[key.substring(4, key.length)] = parseInt(value)
                    delete query[key]
                })
            if (projection.length == 0) {
                projection = null
            }

            let sort = {}
            Object.entries(query)
                .filter(([key, value]) => key.substring(0, 4) == 'sort')
                .map(([key, value]) => {
                    sort[key.substring(5, key.length)] = parseInt(value)
                    delete query[key]
                })
            if (sort.length == 0) {
                sort = null
            }

            const { page, page_item } = query
            delete query.page
            delete query.page_item

            const filter = query

            if (page == null) {
                const offers = await Offer.find(filter, projection)
                    .sort(sort)
                return res.json({ success: true, message: null, data: offers })
            } else {
                let _page = 0
                let _page_item = 10

                if (page) {
                    _page = page
                }

                if (page_item) {
                    _page_item = page_item
                }

                const offerTotal = await Offer.countDocuments(filter)
                const offers = await Offer.find(filter, projection)
                    .sort(sort)
                    .skip(_page * _page_item)
                    .limit(_page_item)

                return res.json({ success: true, message: null, data: { total: offerTotal, shoes: offers } })
            }

        } catch (error) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    update: async (req, res) => {
        try {
            console.log(req.body)
            const { id } = req.body
            const updatedOffer = await Offer.findByIdAndUpdate(id, req.body, { new: true })
            if (updatedOffer) {
                return res.json({ success: true, message: null, data: updatedOffer })
            } else {
                return res.json({ success: false, message: 'Không tìm thấy khuyến mãi.', data: null })
            }
        } catch (error) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getAvailableOfferList: async (req, res) => {
        try {
            const time = Date.now()
            const offers = await Offer.find({ active: true, end_time: { $gt: time } })
            return res.json({ success: true, message: null, data: offers })
        } catch (error) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }
}

module.exports = OfferController