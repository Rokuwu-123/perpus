const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createPool({
    host : process.env.db_host,
    user : process.env.db_user,
    database : 'perpus',
    multipleStatements : true,
    password : process.env.db_pass,
    port:3306
})

module.exports = connection