const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const app = express()

const routes = require('./app/routes/routes')
const session = require('./app/routes/session')

const view_list = [
    'app/view',
    'app/view/pages/',
    'app/view/dist/'
]

app.set('port', '0.0.0.0' || 7000)
app.set('views',view_list)
app.set('view engine','ejs')
app.use(express.json())
app.use(express.static(__dirname + '/app/view'));
app.use(express.static(__dirname + '/app/view/plugins'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session)
app.use(routes)



http.createServer(app).listen(7000, '0.0.0.0',()=>{
    console.log('server berjalan di port 7000');
})