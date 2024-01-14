const Admin = require('../model/Admin')
const { Constraint, Jwt, EmailSender, Bcrypt } = require('../utlity')

const AdminController = {

    login: async(req, res) => {
        try {
            const admin = await Admin.findOne({ user_name: req.body.user_name })
            if (admin) {
                const match = Bcrypt.compareSync(req.body.password, admin.password)
                if (match) {
                    const token = Jwt.encodeToken(admin._id)
                    res.cookie('login', token);
                    return res.json({ success: true, message: null, data: true })
                } else {
                    return res.json({
                        success: false, message: "Vui lòng kiểm tra lại mật khẩu.", data: null
                    })
                }

            } else {
                return res.json({
                    success: false, message: "Vui lòng kiểm tra lại tên đăng nhập.", data: null
                })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    changePassword: async(req, res) => {
        try {
            const updated = Admin.findOneAndUpdate({user_name: req.body.user_name}, req.body)
            if(updated) {
                return res.json({ success: true, message: null, data: true })
            } else {
                return res.json({ success: false, message: null, data: false })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }

}


module.exports = AdminController