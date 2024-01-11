const Shoes = require('../model/Shoes')

const ShoesController = {

    create: async (req, res) => {
        try {

            const shoesNumber = await Shoes.countDocuments({ name: req.body.name })
            if (shoesNumber > 0) {
                return res.json({ success: false, message: 'Exist shoes', data: null })
            }

            const shoes = new Shoes(req.body)

            const price = parseInt(shoes.price)

            if(shoes.discount_unit == '0') {
                shoes.final_price = price - (price * parseInt(shoes.discount_quantity) / 100)
            } else {
                shoes.final_price = price - parseInt(shoes.discount_quantity)
            }

            await shoes.save()
            return res.json({ success: true, message: null, data: shoes })
        } catch (e) {
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

            const { limit } = query
            delete query.limit

            const filter = query

            if (page == null) {
                const shoes = await Shoes.find(filter, projection)
                    .sort(sort)
                    .limit(limit)
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

                const shoesTotal = await Shoes.countDocuments(filter)
                const shoes = await Shoes.find(filter, projection)
                    .sort(sort)
                    .skip(_page * _page_item)
                    .limit(_page_item)

                return res.json({ success: true, message: null, data: { total: shoesTotal, shoes: shoes } })
            }

        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getShoesById: async (req, res) => {
        try {
            const query = req.query
            console.log(query)

            let populate = []
            Object.entries(query)
                .filter(([key, value]) => key.substring(0, 3) == 'pot')
                .map(([key, value]) => {
                    const pop = { path: value }
                    populate.push(pop)
                    delete query[key]
                })

            if (populate.length == 0) {
                populate = null
            }

            const id = req.params.id
            if (id == null) {
                return
            }

            const shoes = await Shoes.findById(id).populate(populate)
            if (shoes != null) {
                return res.json({ success: true, message: null, data: shoes })
            } else {
                return res.json({ success: false, message: 'Not found shoes', data: null })
            }

        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    update: async (req, res) => {
        try {
            console.log(req.body)
            const id = req.body.id
            delete req.body.id

            const updatedShoes = await Shoes.findByIdAndUpdate(id, req.body, { new: true })

            const price = parseInt(updatedShoes.price)

            if(updatedShoes.discount_unit == '0') {
                updatedShoes.final_price = price - (price * parseInt(updatedShoes.discount_quantity) / 100)
            } else {
                updatedShoes.final_price = price - parseInt(updatedShoes.discount_quantity)
            }
            await updatedShoes.save()

            if (updatedShoes) {
                return res.json({ success: true, message: null, data: updatedShoes })
            } else {
                return res.json({ success: false, message: 'Không tìm thấy giày này.', data: null })
            }
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    getShoesByName: async (req, res) => {
        try {
            const { name, gender, min_price, max_price, rate, type, sort } = req.query;

            let _sort

            const filter = {
                name: { $regex: name, $options: 'i' },
                final_price: { $gte: min_price, $lte: max_price }
            }

            if (gender != null) {
                filter.gender = Number.parseInt(gender)
            }

            if (rate != null) {
                filter.rate = { $gte: Number.parseInt(rate), $lte: rate + 0.9 }
            }

            if (type != null) {
                filter.type = type
            }

            if (sort == "Popular") {
                _sort = { sold: -1 }
            } else {
                _sort = { created_date: -1 }
            }

            const shoesList = await Shoes.find(filter).sort(_sort)
            return res.json({ success: true, message: null, data: shoesList })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    increaseShoesSold: async (id, quantity) => {
        console.log(id)
        const shoes = await Shoes.findById(id)
        shoes.sold = shoes.sold + quantity
        shoes.quantity = shoes.quantity - quantity
        await shoes.save()
        return shoes
    },

    updateReviewShoes: async (shoesId, star) => {
        const shoes = await Shoes.findById(shoesId)
        const rate = shoes.rate
        const numberOfReviewers = shoes.number_of_reviews
        const newRate = ((rate * numberOfReviewers) + star) / (numberOfReviewers + 1)
        const newNumberOfReviews = shoes.number_of_reviews + 1
        await Shoes.findByIdAndUpdate(shoesId, {rate: newRate, number_of_reviews: newNumberOfReviews})
    },

    countShoes: async (req, res) => {
        try {
            const result = await Shoes.count()
            return res.json({ success: true, message: null, data: result })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }

}

module.exports = ShoesController