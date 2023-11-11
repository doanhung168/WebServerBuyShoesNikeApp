const Shoes = require('../model/Shoes')

const ShoesController = {

    create: async (req, res) => {
        try {

            const shoesNumber = await Shoes.countDocuments({ name: req.body.name })
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

            const {limit} = query
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

            const filter = query
            console.log(filter)

            const shoes = await Shoes.findOne(filter).populate(populate)
            if (shoes != null) {
                return res.json({ success: true, message: null, data: shoes })
            } else {
                return res.json({ success: false, message: 'Not found shoes', data: null })
            }

        } catch (error) {
            return res.json({ success: false, message: error, data: null })
        }
    },

    update: async (req, res) => {
        try {
            console.log(req.body)
            const id = req.body.id
            delete req.body.id

            const updatedShoes = await Shoes.findByIdAndUpdate(id, req.body, { new: true })
            if (updatedShoes) {
                return res.json({ success: true, message: null, data: updatedShoes })
            } else {
                return res.json({ success: false, message: 'Không tìm thấy giày này.', data: null })
            }
        } catch (error) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }

}

module.exports = ShoesController