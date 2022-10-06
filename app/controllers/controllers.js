const models = require('../models/laporan')

const controller = {
    not_found: async (request, respon) => {
        try {
            respon.status(404).send('URL not Found')
        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    daftar_anggota: async (request, respon) => {
        try {
            
            data = await models.anggota()

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    penerbit_buku: async (request, respon) => {
        try {
            data = await models.penerbit()

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        } 
    },
    // BATASSSS
    penerbit_pemasukan: async (request, respon) => {
        try {
            data = await models.penerbit_pemasukan(request.body)

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    judul_pemasukan: async (request, respon) => {
        try {
            data = await models.judul_pemasukan(request.body)

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    // penerbit_keluar: async (request, respon) => {
    //     try {
    //         data = await models.penerbit_keluar(request.body)

    //         respon.status(200).send(data)

    //     } catch (error) {
    //         console.log(error.message)
    //         respon.status(500).send(error.message)
    //     }
    // },
    // judul_keluar: async (request, respon) => {
    //     try {
    //         data = await models.judul_keluar(request.body)

    //         respon.status(200).send(data)

    //     } catch (error) {
    //         console.log(error.message)
    //         respon.status(500).send(error.message)
    //     }
    // },
    pemasukan_buku: async (request, respon) => {
        try {
            data = await models.pemasukan(request.body)

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    daftar_pengeluaran: async (request, respon) => {
        try {
            data = await models.pengeluaran()

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    penerbit_peminjaman: async (request, respon) => {
        try {
            data = await models.penerbit_peminjaman(request.body)

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    
    peminjaman_buku: async (request, respon) => {
        try {
            data = await models.peminjaman()

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    pengembalian_buku: async (request, respon) => {
        try {
            data = await models.pengembalian()

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    daftar_buku: async (request, respon) => {
        try {
            data = await models.buku()

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    daftar_pinjam: async (request, respon) => {
        try {
          
            data = await models.pinjam()

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    bayar1: async (request, respon) => {
        try {
          
            data = await models.bayar1()

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    history1: async (request, respon) => {
        try {
            if(request.body.tgl1=="" || typeof request.body.tgl1=="undefined") throw{ message:"tanggal awal tidak boleh kosong"}
            if(request.body.tgl2=="" || typeof request.body.tgl2=="undefined") throw{ message:"tanggal akhir tidak boleh kosong"}
            data = await models.history1(request.body)

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    history2: async (request, respon) => {
        try {
           
            data = await models.history2(request.body)

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    kategori1: async (request, respon) => {
        try {
            
            data = await models.kategori1(request.body)

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    lap_kategori: async (request, respon) => {
        try {
            
            data = await models.lap_kategori(request.body)

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    daftar_kategori: async (request, respon) => {
        try {
            data = await models.kategori1()

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    input_user1: async (request, respon) => {
        try {
            
            data = await models.input_user1() 

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    login: async (request, respon) => {
        try {
            if(request.body.username=="" || typeof request.body.username=="undefined") throw{ message:"username tidak boleh kosong"}
            if(request.body.password=="" || typeof request.body.password=="undefined") throw{ message:"password tidak boleh kosong"}
            data = await models.login(request.body)
            // if (data != true) throw {message:'gagal login'}
            // console.log(data)
            request.session.nama=data
            request.session.username=request.body.username
            request.session.cookie.maxAge=60 * 60 * 1000 * 4
            request.session.save()
            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    logout: async (request, respon) => {
        try {
            request.session.nama=""
            request.session.username=""
            request.session.save()
            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    ubah_password: async (request, respon) => {
        try {
            if(request.body.password_baru!=request.body.konfirmasi) throw{ message:"konfirmasi password salah"}
            data = await models.ubah_password(request.body)
            // if (data != true) throw {message:'gagal mengubah password'}
            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
   
    simpan_penerbit: async (request, respon) => {
        try {
            if(request.body.nama=="" || typeof request.body.nama=="undefined") throw{ message:"nama tidak boleh kosong"}
            data = await models.simpan_penerbit(request.body)

            if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    simpan_kategori: async (request, respon) => {
        try {
            if(request.body.nama=="" || typeof request.body.nama=="undefined") throw{ message:"nama tidak boleh kosong"}
            data = await models.simpan_kategori(request.body)

            if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    simpan_bayar: async (request, respon) => {
        try {
            if(request.body.tg_bayar=="" || typeof request.body.tg_bayar=="undefined") throw{ message:"tanggal tidak boleh kosong"}
            data = await models.simpan_bayar(request.body)

            // if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    simpan_user: async (request, respon) => {
        try {
            
            if(request.body.nama=="" || typeof request.body.nama=="undefined") throw{ message:"nama tidak boleh kosong"}
            if(request.body.username=="" || typeof request.body.username=="undefined") throw{ message:"username tidak boleh kosong"}
            if(request.body.password=="" || typeof request.body.password=="undefined") throw{ message:"password tidak boleh kosong"}
            if(request.body.konfirmasi=="" || typeof request.body.konfirmasi=="undefined") throw{ message:"konfirmasi tidak boleh kosong"}
            if(request.body.password!=request.body.konfirmasi) throw{ message:"konfirmasi password salah"}

            data = await models.simpan_user(request.body)

            // if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    simpan_pemasukan: async (request, respon) => {
        try {
            if(request.body.n_bukum=="" || typeof request.body.n_bukum=="undefined") throw{ message:"nomer buku tidak boleh kosong"}
            if(request.body.jumlah=="" || typeof request.body.jumlah=="undefined") throw{ message:"jumlah tidak boleh kosong"}
            if(request.body.tg_masuk=="" || typeof request.body.tg_masuk=="undefined") throw{ message:"tanggal tidak boleh kosong"}
            
            data = await models.simpan_pemasukan(request.body)

            if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    simpan_anggota: async (request, respon) => {
        try {
            if(request.body.nama=="" || typeof request.body.nama=="undefined") throw{ message:"nama tidak boleh kosong"}
            data = await models.simpan_anggota(request.body)

            if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    simpan_pinjam: async (request, respon) => {
        try {
            if(request.body.n_bukum=="" || typeof request.body.n_bukum=="undefined") throw{ message:"kode buku tidak boleh kosong"}
            if(request.body.tg_pinjam=="" || typeof request.body.tg_pinjam=="undefined") throw{ message:"tanggal tidak boleh kosong"}
            if(request.body.lama=="" || typeof request.body.lama=="undefined") throw{ message:"lama pinjam tidak boleh kosong"}
            if(request.body.jumlah=="" || typeof request.body.jumlah=="undefined") throw{ message:"jumlah tidak boleh kosong"}
            
            data = await models.simpan_pinjam(request.body)

            // if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    simpan_buku: async (request, respon) => {
        try {
            if(request.body.judul=="" || typeof request.body.judul=="undefined") throw{ message:"judul tidak boleh kosong"}
            data = await models.simpan_buku(request.body)

            if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    simpan_pengeluaran: async (request, respon) => {
        try {
            if(request.body.n_bukum=="" || typeof request.body.n_bukum=="undefined") throw{ message:"nomer buku tidak boleh kosong"}
            if(request.body.jumlah=="" || typeof request.body.jumlah=="undefined") throw{ message:"jumlah buku tidak boleh kosong"}
            if(request.body.tgkeluar=="" || typeof request.body.tgkeluar=="undefined") throw{ message:"tanggal keluar tidak boleh kosong"}
           
            data = await models.simpan_pengeluaran(request.body)

            if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    simpan_kembali: async (request, respon) => {
        try {
            if(request.body.n_pinjam=="" || typeof request.body.n_pinjam=="undefined") throw{ message:"nomer pinjam tidak boleh kosong"}
            if(request.body.tgl_kembali=="" || typeof request.body.tgl_kembali=="undefined") throw{ message:"tanggal kembali tidak boleh kosong"}
            if(request.body.n_bukuk=="" || typeof request.body.n_bukuk=="undefined") throw{ message:"Kode buku tidak boleh kosong"}
           
            data = await models.simpan_kembali(request.body)

            // if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    simpan_konfigurasi: async (request, respon) => {
        try {
            data = await models.simpan_konfigurasi(request.body)

            if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
//   upload: async (request, respon) => {
//         try {
//             data = await models.upload(request.body)

//             if (data != true) throw {message:'gagal input'}

//             respon.status(200).send(JSON.stringify({status: 'berhasil'}))

//         } catch (error) {
//             console.log(error.message)
//             respon.status(500).send(error.message)
//         }
//     },
    beranda: async (request, respon) => {
        try {
            data = await models.beranda()

            respon.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    
    tampil_anggota: async (request, respon) => {
        try {
            data = await models.tampil_anggota(request.body)

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    tampil_user: async (request, respon) => {
        try {
            data = await models.tampil_user(request.body)

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    
    edit_buku: async (request, respon) => {
        try {
            data = await models.edit_buku(request.body)

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
   
//    cetak_pinjam: async (request, respon) => {
//         try {
//             data = await models.cetak_pinjam(request.body)

//             respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

//         } catch (error) {
//             console.log(error.message)
//             respon.status(500).send(error.message)
//         }
//     },
    tampil_kategori: async (request, respon) => {
        try {
            data = await models.tampil_kategori(request.body)

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    
    tampil_bayar: async (request, respon) => {
        try {
            data = await models.bayar1(request.body)

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    tampil_cari: async (request, respon) => {
        try {
            // if(request.body.tg_bayar=="" || typeof request.body.tg_bayar=="undefined") throw{ message:"tanggal tidak boleh kosong"}
            data = await models.tampil_cari(request.body)

            // if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    tampilkan_modal: async (request, respon) => {
        try {
            // if(request.body.tg_bayar=="" || typeof request.body.tg_bayar=="undefined") throw{ message:"tanggal tidak boleh kosong"}
            data = await models.tampilkan_modal(request.body)

            // if (data != true) throw {message:'gagal input'}

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
   
    tampil_penerbit: async (request, respon) => {
        try {
            data = await models.tampil_penerbit(request.body)

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    tampil_kembali: async (request, respon) => {
        try {
           
            data = await models.tampil_kembali(request.body)

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    konfigurasi: async (request, respon) => {
        try {
            data = await models.konfigurasi(request.body)

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    denda: async (request, respon) => {
        try {
            if(request.body.tgl1=="" || typeof request.body.tgl1=="undefined") throw{ message:"tanggal awal tidak boleh kosong"}
            if(request.body.tgl2=="" || typeof request.body.tgl2=="undefined") throw{ message:"tanggal akhir tidak boleh kosong"}
            data = await models.denda(request.body)

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    lap_nominatif: async (request, respon) => {
        try {
            // if(request.body.tgl1=="" || typeof request.body.tgl1=="undefined") throw{ message:"tanggal awal tidak boleh kosong"}
            // if(request.body.tgl2=="" || typeof request.body.tgl2=="undefined") throw{ message:"tanggal akhir tidak boleh kosong"}
            data = await models.lap_nominatif(request.body)

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    lap_bayar: async (request, respon) => {
        try {
            if(request.body.tgl1=="" || typeof request.body.tgl1=="undefined") throw{ message:"tanggal awal tidak boleh kosong"}
            if(request.body.tgl2=="" || typeof request.body.tgl2=="undefined") throw{ message:"tanggal akhir tidak boleh kosong"}
            data = await models.lap_bayar(request.body)

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    
    buku_pinjam: async (request, respon) => {
        try {
           
            data = await models.buku_pinjam(request.body)

            respon.status(200).send(JSON.stringify({status: 'berhasil','data':data}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    
// BATASSSS HAPUSSSSSS

    hapus_anggota: async (request, respon) => {
        try {
            data = await models.hapus_anggota(request.body)

            if (data != true) throw {message:'gagal hapus data'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    hapus_penerbit: async (request, respon) => {
        try {
            data = await models.hapus_penerbit(request.body)

            if (data != true) throw {message:'gagal hapus data'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    hapus_buku: async (request, respon) => {
        try {
            data = await models.hapus_buku(request.body)

            if (data != true) throw {message:'gagal hapus data'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    hapus_kategori: async (request, respon) => {
        try {
            data = await models.hapus_kategori(request.body)

            if (data != true) throw {message:'gagal hapus data'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    hapus_pemasukan: async (request, respon) => {
        try {
            data = await models.hapus_pemasukan(request.body)

            if (data != true) throw {message:'gagal hapus data'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    hapus_user: async (request, respon) => {
        try {
            data = await models.hapus_user(request.body)

            if (data != true) throw {message:'gagal hapus data'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    hapus_pengeluaran: async (request, respon) => {
        try {
            data = await models.hapus_pengeluaran(request.body)

            if (data != true) throw {message:'gagal hapus data'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    hapus_peminjaman: async (request, respon) => {
        try {
            data = await models.hapus_peminjaman(request.body)

            if (data != true) throw {message:'gagal hapus data'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    hapus_pengembalian: async (request, respon) => {
        
        try {
            data = await models.hapus_pengembalian(request.body)

            if (data != true) throw {message:'gagal hapus data'}

            respon.status(200).send(JSON.stringify({status: 'berhasil'}))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
    beranda1: async (request, respon) => {
        try {
           
            data = await models.beranda1()

            respon.status(200).send(JSON.stringify(data))

        } catch (error) {
            console.log(error.message)
            respon.status(500).send(error.message)
        }
    },
   
    

}


module.exports = controller