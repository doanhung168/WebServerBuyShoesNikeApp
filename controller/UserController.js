const User = require('../model/User');
const { Constraint, Jwt, EmailSender, Bcrypt } = require('../utlity')
const { uid } = require('uid')
const { uploadAvatar } = require('../controller/ImageControlloer')
const multer = require('multer')

async function findValidDisplayName(displayName) {
    const random = uid(8);
    const result = displayName + '-' + random
    const numberOfUser = await User.count({ name: result })
    if (numberOfUser > 0) {
        await findValidDisplayName(displayName)
    } else {
        return result;
    }
}

function generateRandomNumber() {
    var min = 100000; // Số nhỏ nhất có 6 chữ số
    var max = 999999; // Số lớn nhất có 6 chữ số
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

const UserController = {


    requestRegister: async (req, res) => {
        try {
            console.log(req)
            const exitsEmail = await User.count({ email: req.body.email, account_type: Constraint.LOCAL })
            if (exitsEmail > 0) {
                return res.json({ success: false, message: "Email này đã được đăng ký!", data: null })
            }

            const auth_code = generateRandomNumber();
            const message = `Để xác nhận đăng ký tài khoản vui lòng nhập mã này: <b>${auth_code}</b>
                                </br> Mã sẽ có thời hạn trong 5 phút.`
            await EmailSender.send(req.body.email, "[Nike Shoes] Đăng ký tài khoản", message)

            return res.json({ success: true, message: null, data: auth_code })

        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    register: async (req, res) => {
        try {
            console.log(req.body)
            const exitsEmail = await User.count({ email: req.body.email, account_type: Constraint.LOCAL })
            if (exitsEmail > 0) {
                return res.json({ success: false, message: "Email này đã được đăng ký!", data: null })
            }
            const user = User(req.body)
            user.name = await findValidDisplayName(req.body.email.substring(0, 5))
            await user.save()
            if (user) {
                const token = Jwt.encodeToken(user._id)
                return res.json({ success: true, message: null, data: { token: token, user: user } })
            }
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }

    },

    loginWithSocialAccount: async (req, res) => {
        try {
            const exitUser = await User.findOne({ account_type: req.body.account_type, account_id: req.body.account_id })
            if (exitUser) {
                const token = Jwt.encodeToken(exitUser._id)
                return res.json({ success: true, message: null, data: { token: token, user: exitUser } })
            }

            const _displayName = req.body.display_name
            const user = new User(req.body)
            user.name = await findValidDisplayName(_displayName.substring(0, 5))
            await user.save()
            if (user) {
                const token = Jwt.encodeToken(user._id)
                return res.json({ success: true, message: null, data: { token: token, user: user } })
            }
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                const match = Bcrypt.compareSync(req.body.password, user.password)
                if (match) {
                    const token = Jwt.encodeToken(user._id)
                    return res.json({ success: true, message: null, data: { token: token, user: user } })
                } else {
                    return res.json({
                        success: false, message: "Vui lòng kiểm tra lại mật khẩu.", data: null
                    })
                }

            } else {
                return res.json({
                    success: false, message: "Vui lòng kiểm tra lại địa chỉ email.", data: null
                })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    autoLogin: async (req, res) => {
        return res.json({ success: true, message: null, data: req.user })
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await User.findOne({ email: email, account_type: Constraint.LOCAL })
            if (user) {
                const auth_code = generateRandomNumber();
                user.authen_code = auth_code
                user.authen_code_expire = new Date().getTime() + (1000 * 60 * 5)
                await user.save()
                const message = `Để đổi mật khẩu của ${user.name} vui lòng nhập mã này: <b>${auth_code}</b>
                                </br> Mã sẽ có thời hạn trong 5 phút.`
                await EmailSender.send(email, "[Nike Shoes] Đổi mật khẩu", message)
                return res.json({ success: true, message: null, data: null })
            } else {
                return res.json({ success: false, message: "Email không tồn tại trong hệ thống", data: null })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    changePasswordByCode: async (req, res) => {
        try {
            console.log(req.body)
            const { email, auth_code, new_password } = req.body

            const user = await User.findOne({ email: email })
            if (user) {

                if (user.authen_code_expire < Date.now()) {
                    return res.json({ success: false, message: "Mã xác nhận hết thời hạn, vui lòng thực hiện lại thao tác tìm mật khẩu qua email để lấy mã mới", data: null })
                }

                if (auth_code != user.authen_code) {
                    return res.json({ success: false, message: "Mã xác nhận sai", data: null })
                }

                user.password = new_password
                await user.save()

                return res.json({ success: true, message: null, data: null })

            } else {
                return res.json({ success: false, message: "Không tìm thấy người dùng", data: null })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    changePassword: async (req, res) => {
        console.log(req.body)
        const { current_password, new_password } = req.body

        if (Bcrypt.compareSync(current_password, req.user.password)) {
            const user = req.user
            user.password = new_password
            await user.save()
            console.log(user)
            return res.json({ success: true, message: null, data: null })
        } else {
            return res.json({ success: false, message: "Mật khẩu cũ không chính xác", data: null })
        }
    },


    getOfferOfUser: async (req, res) => {
        try {
            const time = Date.now()
            const result = await User.findById(req.user._id, { offers: 1 })
                .populate({ path: 'offers', match: { active: true, end_time: { $gt: time } }, options: { sort: { created_date: -1 } } })
            return res.json({ success: true, message: null, data: result.offers })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    addOffer: async (req, res) => {
        try {
            console.log(req.user._id + " " + req.body.id)
            const result = await User.findOneAndUpdate({ _id: req.user._id }, { $push: { offers: req.body.id } })
            console.log(result)
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    removeOffer: async (user_id, offer_id) => {
        const result = await User.findOneAndUpdate({ _id: user_id }, { $pull: { offers: offer_id } }, { new: true })
        console.log(result)
    },

    getFavoriteShoesOfUser: async (req, res) => {
        try {
            const user = await User.findById(req.user._id, { favorite_shoes: 1 })
                .populate({ path: 'favorite_shoes' })
                .sort({ created_date: -1 })
            return res.json({ success: true, message: null, data: user.favorite_shoes })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    addFavoriteShoes: async (req, res) => {
        try {
            const user = req.user
            const exists = user.favorite_shoes.includes(req.body.id)

            if (exists) {
                var result = await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { favorite_shoes: req.body.id } }, { new: true })
                console.log(result)
                result = false
            } else {
                var result = await User.findOneAndUpdate({ _id: req.user._id }, { $push: { favorite_shoes: req.body.id } }, { new: true })
                console.log(result)
                result = true
            }

            return res.json({ success: true, message: null, data: result })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    checkFavoriteShoes: async (req, res) => {
        try {
            console.log(req.query.id)
            const user = req.user
            const result = user.favorite_shoes.includes(req.query.id)
            console.log(result)
            return res.json({ success: true, message: null, data: result })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    countNewUser: async (req, res) => {
        try {
            const { start_time, end_time } = req.query
            const result = await User.count({ created_date: { $gte: start_time, $lte: end_time } })
            return res.json({ success: true, message: null, data: result })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    get: async (req, res) => {
        try {
            const { start_time, end_time } = req.query
            const result = await User.find({ created_date: { $gte: start_time, $lte: end_time } }, { _id: 1, name: 1, created_date: 1 }).sort({ created_date: -1 })
            return res.json({ success: true, message: null, data: result })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    getUserInfo: async (req, res) => {
        try {
            return res.json({ success: true, message: null, data: req.user })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    updateUserInfo: async (req, res) => {
        try {
            console.log(req.body)
            User.findByIdAndUpdate(req.user._id, req.body, { new: true })
                .then(updatedDocument => {
                    if (!updatedDocument) {
                        return res.json({ success: false, message: "Không tìm thấy người dùng", data: null })
                    }

                    console.log(updatedDocument)
                    return res.json({ success: true, message: null, data: true })
                })
                .catch(error => {
                    return res.json({ success: false, message: error.message, data: null })
                })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }

}

function getPath(path) {
    const paths = path.split("\\")
    return "/" + paths[1] + "/" + paths[2]
}

module.exports = UserController