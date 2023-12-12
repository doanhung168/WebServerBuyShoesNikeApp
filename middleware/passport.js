const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const { Constraint } = require('../utlity')
const User = require('../model/User')



// Local
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.AUTH_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findOne({ _id: payload.sub })
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }

    } catch (err) {
        return done(err, false)
    }

}))


passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

