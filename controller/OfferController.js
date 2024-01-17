const Offer = require('../model/Offer')
const Token = require('../model/Token');
const Notification = require('../model/Notification')
const { Messaging } = require("../utlity")
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

            const notification = new Notification
            notification.title = req.body.title
            notification.content = req.body.description
            notification.link = offer._id
            notification.type = "OFFER_NOTIFY"
            await notification.save()

            const tokenUser = await Token.find()
            tokenUser.forEach((tokenU) => {
                var message = {
                    "data": {
                        "id": offer._id,
                        "type": "OFFER_NOTIFY",
                        "title": req.body.title,
                        "body": req.body.description,
                        "image": req.body.image,
                        "notification_id": notification._id
                    },
                    "to": tokenU.token
                };
                Messaging.send(message)
            })

            return res.json({ success: true, message: null, data: offer })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
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
            return res.json({ success: false, message: error.message, data: null })
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
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    getAvailableOfferList: async (req, res) => {
        try {
            const time = Date.now()
            const offers = await Offer.find({ active: true, end_time: { $gt: time } }).sort({ created_date: -1 })
            return res.json({ success: true, message: null, data: offers })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    getExpiredOffer: async (req, res) => {
        try {
            const time = Date.now()
            const offers = await Offer.find({ active: true, end_time: { $lt: time } }).sort({ created_date: -1 })
            return res.json({ success: true, message: null, data: offers })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    getOfferOfUser: async (req, res) => {
        try {
            const time = Date.now()
            const offers = await Offer.find({ active: true, end_time: { $gt: time } }).sort({ created_date: -1 })
            return res.json({ success: true, message: null, data: offers })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    getOfferById: async (req, res) => {
        try {
            const offer = await Offer.findById(req.query.id)
            if(offer) {
                return res.json({ success: true, message: null, data: offer })
            } else {
                return res.json({ success: false, message: "Không tìm thấy khuyến mãi", data: null })
            }
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }
}

module.exports = OfferController