const Token = require('../model/Token')

const TokenController = {
    create: async (req, res) => {
        try {
            const existsToken = await Token.findOne({ token: req.body.token })
            if(existsToken) {
                existsToken.userId = req.body.userId
                await existsToken.save()
            } else {
                const token = new Token(req.body)
                await token.save()
            }
            return res.json({ success: true, message: "create token success", data: null })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },
    delete: async (req, res) => {
        try {
            const result = await Token.findOneAndDelete({ token: req.body.token })
            return res.json({ success: true, message: "delete token succes", data: result })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },
    getAll: async (req, res) => {
        try {
            const result = await Token.find()
            return res.json({ success: true, message: "all token", data: result })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }
}

module.exports = TokenController