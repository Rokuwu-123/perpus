const koneksi = require('../configs/database')

async function name() {
    let data = await koneksi.query(`select current_dae tanggal`)
        .catch(err=>{
            console.log('error koneksi [' + err.message + ']')
            return 
        })
    console.log(data.rows)
}

name()