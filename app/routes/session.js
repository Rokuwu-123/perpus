const app = require('express').Router()
const session = require('express-session')


app.use(session({secret: "zxcvbnm", saveUninitialized: true, resave: false}))


module.exports = app