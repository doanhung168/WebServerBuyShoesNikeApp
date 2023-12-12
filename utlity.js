const JWT = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcryptjs = require('bcryptjs')


const Constraint = {
    AUTH_KEY: 'Authorization',
    LOCAL: 0,
    FACEBOOK: 1,
    GOOGLE: 2,
    JWT: 'jwt'
}

const Jwt = {
    encodeToken: (userId) => {
        return JWT.sign({
            iss: 'Nguyen Hung',
            sub: userId,
            iat: new Date().getTime()
        }, process.env.AUTH_SECRET)
    },

    encodeTokenWithEx: (userId, ex) => {
        return JWT.sign({
            iss: 'Nguyen Hung',
            sub: userId,
            iat: new Date().getTime()
        }, process.env.AUTH_SECRET, { expiresIn: ex })
    },

    verifyToken: (token) => {
        return JWT.verify(token, process.env.AUTH_SECRET)
    }
}



const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

const EmailSender = {

    send: async (user, subject, message) => {
        await Transporter.sendMail({
            from: process.env.EMAIL,
            to: user,
            subject: subject,
            html: message
        })
    }
}

const Bcrypt = {
    enscrypt: async (text) => {
        const salt = bcryptjs.genSaltSync(10)
        return await bcryptjs.hash(text, salt)
    },

    compareSync: (text1, text2) => {
        return bcryptjs.compareSync(text1, text2)
    }
}

module.exports = { Jwt, EmailSender, Bcrypt, Constraint }