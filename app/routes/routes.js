const app = require('express').Router()
const controller = require('../controllers/controllers')



app.get('/', (request, respon) => {
    respon.render('login', {
        session: request.session
    })
})
app.get('/daftar_anggota', controller.daftar_anggota)
app.get('/anggota_input', (request, respon) => {
    respon.render('anggota_input', {
        session: request.session
    })
})
app.get('/daftar_buku', controller.daftar_buku)
app.get('/buku_input', (request, respon) => {
    respon.render('buku_input', {
        session: request.session
    })
})

app.get('/buku_daftar', (request, respon) => {
    respon.render('buku_daftar', {
        session: request.session
    })
})
app.get('/daftar_penerbit', controller.penerbit_buku)
app.get('/penerbit_input', (request, respon) => {
    respon.render('penerbit_input', {
        session: request.session
    })
})
app.get('/daftar_pemasukan', controller.pemasukan_buku)
app.get('/pemasukan_input', (request, respon) => {
    respon.render('pemasukan_input', {
        session: request.session
    })
})
app.get('/daftar_pemasukan', controller.pemasukan_buku)
app.get('/pemasukan_laporan', (request, respon) => {
    respon.render('pemasukan_laporan', {
        session: request.session
    })
})
app.get('/daftar_pengeluaran', controller.daftar_pengeluaran)
app.get('/pengeluaran_input', (request, respon) => {
    respon.render('pengeluaran_input', {
        session: request.session
    })
})
app.get('/daftar_pinjam', controller.daftar_pinjam)
app.get('/peminjaman_input', (request, respon) => {
    respon.render('peminjaman_input', {
        session: request.session
    })
})

app.post('/history1', controller.history1)
app.get('/history', (request, respon) => {
    respon.render('history', {
        session: request.session
    })
})
app.get('/kategori1', controller.kategori1)
app.get('/kategori1', (request, respon) => {
    respon.render('kategori1', {
        session: request.session
    })
})
app.get('/daftar_kategori', controller.daftar_kategori)
app.get('/kategori', (request, respon) => {
    respon.render('kategori', {
        session: request.session
    })
})
app.post('/login', controller.login)
app.get('/login', (request, respon) => {
    respon.render('login', {
        session: request.session
    })
})
app.get('/daftar_pinjam', controller.daftar_pinjam)
app.get('/peminjaman_laporan', (request, respon) => {
    respon.render('peminjaman_laporan', {
        session: request.session
    })
})
app.get('/daftar_kembali', controller.pengembalian_buku)
app.get('/pengembalian_input', (request, respon) => {
    respon.render('pengembalian_input', {
        session: request.session
    })
})

app.get('/daftar_pemasukan', controller.pemasukan_buku)
app.get('/pemasukan_laporan', (request, respon) => {
    respon.render('pemasukan_laporan', {
        session: request.session
    })
})

app.get('/daftar_anggota', controller.daftar_anggota)
app.get('/anggota_laporan', (request, respon) => {
    respon.render('anggota_laporan', {
        session: request.session
    })
})
app.get('/daftar_pengeluaran', controller.daftar_pengeluaran)
app.get('/pengeluaran_laporan', (request, respon) => {
    respon.render('pengeluaran_laporan', {
        session: request.session
    })
})

app.get('/beranda1', controller.beranda1)
app.get('/Beranda', (request, respon) => {
    respon.render('beranda', {
        session: request.session
    })
})
app.get('/daftar_kembali', controller.pengembalian_buku)
app.get('/pengembalian_laporan', (request, respon) => {
    respon.render('pengembalian_laporan', {
        session: request.session
    })
})
app.post('/ubah_password1', controller.ubah_password)
app.get('/ubah_password', (request, respon) => {
    respon.render('ubah_password', {
        session: request.session
    })
})

app.post('/simpan_konfigurasi', controller.simpan_konfigurasi)
app.get('/konfigurasi1', controller.konfigurasi)
app.get('/konfigurasi', (request, respon) => {
    respon.render('konfigurasi', {
        session: request.session
    })
})
app.get('/logout', controller.logout)
app.get('/logout', (request, respon) => {
    respon.render('logout', {
        session: request.session
    })
})
app.post('/denda1', controller.denda)
app.get('/denda', (request, respon) => {
    respon.render('denda', {
        session: request.session
    })
})
app.post('/lap_nominatif1', controller.lap_nominatif)
app.get('/laporan_nominatif', (request, respon) => {
    respon.render('laporan_nominatif', {
        session: request.session
    })
})
app.get('/input_user1', controller.input_user1)
app.get('/input_user', (request, respon) => {
    respon.render('input_user', {
        session: request.session
    })
})
app.post('/buku_pinjam', controller.buku_pinjam)
app.get('/buku_pinjam', (request, respon) => {
    respon.render('buku_pinjam', {
        session: request.session
    })
})
app.post('/bayar1', controller.bayar1)
app.get('/bayar_denda', (request, respon) => {
    respon.render('bayar_denda', {
        session: request.session
    })
})
app.post('/lapbayar1', controller.lap_bayar)
app.get('/laporan_bayar', (request, respon) => {
    respon.render('laporan_bayar', {
        session: request.session
    })
})
app.post('/lap_kategori', controller.lap_kategori)
app.get('/lap_kategori', (request, respon) => {
    respon.render('lap_kategori', {
        session: request.session
    })
})

app.post('/simpan_penerbit', controller.simpan_penerbit)
app.post('/simpan_anggota', controller.simpan_anggota)
app.post('/simpan_pinjam', controller.simpan_pinjam)
app.post('/simpan_buku',controller.simpan_buku)
app.post('/simpan_pemasukan', controller.simpan_pemasukan)
app.post('/simpan_pengeluaran', controller.simpan_pengeluaran)
app.post('/simpan_kembali', controller.simpan_kembali)
app.post('/simpan_user', controller.simpan_user)
app.post('/simpan_bayar', controller.simpan_bayar)
app.post('/simpan_kategori', controller.simpan_kategori)


app.post('/tampil_anggota', controller.tampil_anggota)
app.post('/edit_buku', controller.edit_buku)
app.post('/tampil_penerbit', controller.tampil_penerbit)
app.post('/tampil_kembali', controller.tampil_kembali)
app.post('/tampil_user', controller.tampil_user)
app.post('/tampil_bayar', controller.tampil_bayar)
app.post('/tampil_cari', controller.tampil_cari)
app.post('/tampilkan_modal', controller.tampilkan_modal)
app.post('/history2', controller.history2)
app.post('/tampil_kategori', controller.tampil_kategori)

app.post('/daftar_penerbit', controller.penerbit_pemasukan)
app.post('/daftar_buku', controller.judul_pemasukan)
app.post('/daftar_kategori', controller.daftar_kategori)

app.delete('/hapus_anggota', controller.hapus_anggota)
app.delete('/hapus_penerbit', controller.hapus_penerbit)
app.delete('/hapus_pemasukan', controller.hapus_pemasukan)
app.delete('/hapus_pengeluaran', controller.hapus_pengeluaran)
app.delete('/hapus_peminjaman', controller.hapus_peminjaman)
app.delete('/hapus_buku', controller.hapus_buku)
app.delete('/hapus_pengembalian', controller.hapus_pengembalian)
app.delete('/hapus_user', controller.hapus_user)
app.delete('/hapus_kategori', controller.hapus_kategori)


app.get('/*', controller.not_found)

module.exports = app