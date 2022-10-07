const mysql = require('mysql')

const connection = mysql.createPool({
    host : '192.168.200.69',
    user : 'user',
    database : 'perpus',
    multipleStatements : true,
    password : 'inticomp1!',
    port:3306
})

module.exports = connection