import express from 'express'
import bodyParser from 'body-parser'
import env from 'dotenv'
import UserRoutes from './routes/User.route.js'
import passport from 'passport'
import AuthRoutes from './routes/Auth.routes.js'
import SlugRoutes from './routes/Slug.routes.js'
import GoogleRoutes from './routes/Google.routes.js'
import ProductRoutes from './routes/Product.routes.js'
import cookieParser from 'cookie-parser'
import GoogleStrategy from 'passport-google-oauth20'
import session from 'express-session'
import ConfigGoogle from './configuration/Google.config.js'
const app = express()
const StrategyGoogle = GoogleStrategy.Strategy


passport.use(new GoogleStrategy({
    clientID: ConfigGoogle.CLIENT_ID,
    clientSecret: ConfigGoogle.SECRET_KEY,
    callbackURL: ConfigGoogle.CALLBACK_URL,
    },
    function(acessToken, refreshToken, profile, done){
        return done(null, profile)
    }
))

passport.serializeUser(function(user, done){
    done(null, user)
})

passport.deserializeUser(function(obj, done){
    done(null, obj)
})

env.config()
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())


app.use('/auth', AuthRoutes)
app.use('/auth', GoogleRoutes)
app.use('/users', UserRoutes)
app.use('/slug', SlugRoutes)
app.use('/product', ProductRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
})