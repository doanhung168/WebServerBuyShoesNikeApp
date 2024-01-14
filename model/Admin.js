const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Bcrypt } = require('../utlity')

const AdminSchema = new Schema({
    user_name: String,
    password: String
})

AdminSchema.pre('save', async function (next) {
    try {
        if (this.password) {
            this.password = await Bcrypt.enscrypt(this.password)
        }
    } catch (e) {
        next(e)
    }
})


const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin