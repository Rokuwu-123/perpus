const koneksi = require('../configs/database')

const laporan = {
    anggota: async () => {

        let data = await new Promise(async (resolve, reject) => {
            await koneksi.query('select * from anggota', async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        return data
    },

    penerbit: async () => {
        let data = await new Promise(async (resolve, reject) => {
            await koneksi.query('select * from penerbit', async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        return data
    },
    kategori1: async () => {

        query = `
        select id_kategori,nama_kategori,
        ( select sum(jumlah) jumlah from buku where buku.kategori = kategori.id_kategori)jumlah 
        from kategori
        `

        let data = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })
        console.log(data)
        return data
    },
    lap_kategori: async () => {

        let data = await new Promise(async (resolve, reject) => {
            await koneksi.query('select * from kategori', async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })
        console.log(data)
        return data
    },
    buku: async () => {
        query = `select n_buku,judul,deskripsi,(select nama from penerbit where penerbit.n_penerbit=buku.n_penerbit) n_penerbit,
        pengarang,jumlah,rak_buku,(select nama_kategori from kategori where id_kategori=buku.kategori)nama_kategori from buku
        `
        let data = await new Promise(async (resolve, reject) => {
            // await koneksi.query('select * from buku',async(err,hasil)=>{
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        return data
    },
    pengeluaran: async () => {
        query = `select (select judul from buku where n_buku=n_bukukel)judul,n_keluar,penerbit.nama,date_format(tg_keluar,'%d-%m-%Y')tg_keluar,tujuan,buku_keluar.jumlah,keterangan from buku_keluar
        left join buku on buku.n_buku = buku_keluar.n_bukukel
        left join penerbit on penerbit.n_penerbit=buku.n_penerbit
`
        let data = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        return data
    },
    pinjam: async () => {
        query =
            `select (select nama from anggota where n_anggota=no_anggota)nama, no_pinjam, penerbit.nama penerbit,
        (select judul from buku where n_buku=n_bukup)judul,
        date_format(tg_pinjam,'%d-%m-%Y')tg_pinjam,
        lama, pinjam.jumlah from pinjam
        left join buku on buku.n_buku = pinjam.n_bukup
        left join penerbit on penerbit.n_penerbit=buku.n_penerbit
         `

        let data = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        return data
    },
    pengembalian: async () => {

        query = `select n_kembali, (select no_pinjam from pinjam where no_pinjam=n_pinjam)n_pinjam,anggota.nama,

        (select judul from buku where n_buku=n_bukuk)judul, penerbit.nama penerbit1,      
        date_format(tgl_kembali,'%d-%m-%Y')tgl_kembali, 
        kembali.jumlah, 
         (select date_format(tg_pinjam,'%d-%m-%Y')tg_pinjam from pinjam where no_pinjam=n_pinjam)tg_pinjam,
        (select lama from pinjam where no_pinjam=n_pinjam)lama, 
        (
            datediff(tgl_kembali,
                DATE_ADD((SELECT tg_pinjam FROM pinjam WHERE no_pinjam=kembali.n_pinjam), 
                            INTERVAL (SELECT lama FROM pinjam WHERE no_pinjam = n_pinjam) day
                            )
            )
        )telat from kembali
        left join buku on buku.n_buku=kembali.n_bukuk
        left join penerbit on penerbit.n_penerbit=buku.n_penerbit
        left join pinjam on pinjam.no_pinjam = kembali.n_pinjam
        left join anggota on anggota.n_anggota=pinjam.no_anggota

                 `
                
        let data = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })



        })

        console.log(query)
        return data
    },

    pemasukan: async () => {
        let data = await new Promise(async (resolve, reject) => {
            query = `select n_masuk,
            (select judul from buku where n_buku=n_bukum) judul,
            penerbit.nama,buku_masuk.jumlah,sumber,date_format(tg_masuk,'%d-%m-%Y')tg_masuk,keterangan from buku_masuk
            left join buku on buku.n_buku = buku_masuk.n_bukum
            left join penerbit on penerbit.n_penerbit=buku.n_penerbit`
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        return data
    },
    // BATASSSSSS
    penerbit_pemasukan: async (data) => {

        let query = `
    select nama from penerbit 
  
     `
        if (data.n_bukum > 0) {
            query = `
            select (select nama from penerbit where penerbit.n_penerbit=buku.n_penerbit)nama from buku where n_buku=${data.n_bukum}
           
             `
        }


        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        console.log(query)
        return hasil
    },
    judul_pemasukan: async (data) => {
        let query = `
        select judul from buku 
  
     `
        if (data.n_penerbit > 0) {
            query = `
            select buku.judul from buku where buku.n_penerbit=${data.n_penerbit}
           
             `
        }

        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })
        console.log(hasil)
        return hasil
    },
    // penerbit_keluar : async(data)=>{
    //     query=
    //     `select penerbit.nama
    //    from buku_masuk 
    //     left join buku on buku.n_buku = buku_masuk.n_bukum
    //     left join penerbit on penerbit.n_penerbit=buku.n_penerbit
    //     where n_bukum=${data.n_bukukel}
    //      `
    //      console.log(query)
    //     let hasil = await new Promise(async (resolve,reject)=>{
    //         await koneksi.query(query,async(err,hasil)=>{
    //             if(err) reject(err)

    //             resolve(hasil)
    //         })
    //     })

    //     return hasil
    // },
    // judul_keluar : async(data)=>{
    //     query=
    //     `select buku.judul
    //     from buku_masuk 
    //      left join buku on buku.n_buku = buku_masuk.n_bukum
    //      left join penerbit on penerbit.n_penerbit=buku.n_penerbit
    //      where buku.n_penerbit=${data.n_penerbit}
    //       `

    //     let hasil = await new Promise(async (resolve,reject)=>{
    //         await koneksi.query(query,async(err,hasil)=>{
    //             if(err) reject(err)

    //             resolve(hasil)
    //         })
    //     })
    //     console.log(hasil)
    //     return hasil
    // },
    history1: async (data) => {

        if (new Date(data.tgl1) > new Date(data.tgl2)) throw {
            message: 'tanggal akhir tidak boleh kurang dari tanggal awal'
        };

        query1 = `select 
        (
            nullkenol((select sum(jumlah) from buku_masuk where n_bukum=${data.n_buku} and tg_masuk <'${data.tgl1}'))-
            nullkenol((select sum(jumlah) from buku_keluar where n_bukukel=${data.n_buku} and tg_keluar <'${data.tgl1}'))-
            nullkenol((select sum(jumlah) from pinjam where n_bukup=${data.n_buku} and tg_pinjam <'${data.tgl1}'))+
            nullkenol((select sum(jumlah) from kembali where n_bukuk=${data.n_buku} and tgl_kembali <'${data.tgl1}'))

        )
        stok_awal`

        let hasil
        hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query1, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })


        stok_awal = hasil[0].stok_awal

        stok = stok_awal

        query = `select  date_format(tanggal,'%Y-%m-%d')tanggal ,pemasukan,pengeluaran,peminjaman,pengembalian,stok from
        (
        select tg_keluar tanggal,0 pemasukan,buku_keluar.jumlah pengeluaran,0 peminjaman,0 pengembalian,0 stok
        from buku_keluar 
        where n_bukukel=${data.n_buku} and (tg_keluar between '${data.tgl1}' and '${data.tgl2}')
        UNION ALL
        select tg_masuk tanggal,buku_masuk.jumlah pemasukan,0 pengeluaran,0 peminjaman,0 pengembalian,0 stok
        from buku_masuk 
        where n_bukum='${data.n_buku}' and (tg_masuk between '${data.tgl1}' and '${data.tgl2}')
        UNION ALL
        select tg_pinjam tanggal,0 pemasukan,0 pengeluaran,pinjam.jumlah peminjaman,0 pengembalian,0 stok
        from pinjam 
        where n_bukup='${data.n_buku}' and (tg_pinjam between '${data.tgl1}' and '${data.tgl2}')
        UNION ALL
        select tgl_kembali tanggal,0 pemasukan,0 pengeluaran,0 peminjaman,kembali.jumlah pengembalian,0 stok
        from kembali 
        where n_bukuk='${data.n_buku}' and (tgl_kembali between '${data.tgl1}' and '${data.tgl2}')

        )foo order by tanggal
         `
        

        hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)

            })
        })
        for (kolom of hasil) {
            kolom.stok = (kolom.pemasukan - kolom.pengeluaran - kolom.peminjaman + kolom.pengembalian) + stok_awal
            stok_awal = kolom.stok
        }

        return {
            stok_awal: stok,
            data: hasil
        }
    },
    konfigurasi: async (data) => {

        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select * from setting`, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        return hasil
    },
    input_user1: async () => {

        let data = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select * from users `, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        return data
    },

    denda: async (data) => {
        if (new Date(data.tgl1) > new Date(data.tgl2)) throw {
            message: 'tanggal akhir tidak boleh kurang dari tanggal awal'
        };

        query = `select (select no_pinjam from pinjam where no_pinjam=kembali.n_pinjam)n_pinjam,nama,
        date_format(tgl_kembali,'%d-%m-%Y')tgl_kembali, (select date_format(tg_bayar,'%d-%m-%Y')tg_bayar from bayar_denda where n_pinjam=kembali.n_pinjam)tg_bayar, 
        (select date_format(tg_pinjam,'%d-%m-%Y')tg_pinjam from pinjam where no_pinjam=kembali.n_pinjam)tg_pinjam,
        (select denda from setting)denda,
        (
            datediff(tgl_kembali,
                DATE_ADD((SELECT tg_pinjam FROM pinjam WHERE no_pinjam=kembali.n_pinjam), 
                            INTERVAL (SELECT lama FROM pinjam WHERE no_pinjam = kembali.n_pinjam) day
                            )
            )
        )telat from kembali
        left join pinjam on pinjam.no_pinjam = kembali.n_pinjam
        left join anggota on anggota.n_anggota=pinjam.no_anggota
        left join bayar_denda on bayar_denda.n_pinjam=kembali.n_pinjam 
         `
        oke = []
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)

            })
        })

        for (kolom of hasil) {
            if (kolom.telat > 0) oke.push(kolom)
        }
        return oke
    },
    lap_nominatif: async (data) => {

        query = `
        select anggota.nama peminjam, judul, penerbit.nama penerbit, pinjam.jumlah,
        date_format(pinjam.tg_pinjam,'%d-%m-%Y') tg_pinjam, date_format(kembali.tgl_kembali,'%d-%m-%Y') tgl_kembali, 
        lama, denda,
        (datediff(tgl_kembali,
            DATE_ADD( tg_pinjam,INTERVAL (lama) day)) )telat 
         from pinjam
                left join anggota on anggota.n_anggota=pinjam.no_anggota
                left join buku on buku.n_buku=pinjam.n_bukup
                left join penerbit on penerbit.n_penerbit=buku.n_penerbit
                 left join kembali on kembali.n_pinjam=pinjam.no_pinjam
                 where tg_pinjam <= '${data.tgl1}' and date_format(pinjam.tg_pinjam,'%m-%Y') ='${data.tgl1}' 
                 and  date_format(kembali.tgl_kembali,'%m-%Y') > '${data.tgl1}' is null 
                 or tgl_kembali is null
         `
        

        // oke = []
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)

            })
        })

        // for (kolom of hasil) {
        //     if (kolom.telat > 0) oke.push(kolom)
        // }

        return hasil
    },
    lap_bayar: async (data) => {
        query1 = `select (case when '${data.tgl1}'>'${data.tgl2}' then true else false end)validasi`
        let hasil
        hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query1, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        if (hasil[0].validasi) throw {
            message: 'tanggal akhir tidak boleh kurang dari tanggal awal'
        };

        query = `
        select n_pinjam,nama,
        date_format(tg_bayar,'%d-%m-%Y')tg_bayar,
        nilai_bayar from bayar_denda 
        left join pinjam on pinjam.no_pinjam = bayar_denda.n_pinjam
        left join anggota on anggota.n_anggota=pinjam.no_anggota
        where tg_bayar between '${data.tgl1}' and '${data.tgl2}'
         `
        hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)

            })
        })
        return hasil
    },
    bayar1: async (data) => {
        let where = ``

        if (typeof data != 'undefined') where = `and kembali.n_pinjam=${data.n_pinjam}`

        query = `select (select no_pinjam from pinjam where no_pinjam=kembali.n_pinjam)n_pinjam,nama,
        date_format(tgl_kembali,'%d-%m-%Y')tgl_kembali, 
        (select date_format(tg_pinjam,'%d-%m-%Y')tg_pinjam from pinjam where no_pinjam=kembali.n_pinjam)tg_pinjam,
        (select denda from setting) denda,
        (
            datediff(tgl_kembali,
                DATE_ADD((SELECT tg_pinjam FROM pinjam WHERE no_pinjam=kembali.n_pinjam), 
                            INTERVAL (SELECT lama FROM pinjam WHERE no_pinjam = kembali.n_pinjam) day
                            )
            )
        )telat from kembali
        left join pinjam on pinjam.no_pinjam = kembali.n_pinjam
        left join anggota on anggota.n_anggota=pinjam.no_anggota
        left join bayar_denda on bayar_denda.n_pinjam=kembali.n_pinjam 
        where bayar_denda.n_pinjam is null ${where}
         `
        oke = []
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)

            })
        })
        for (kolom of hasil) {
            if (kolom.telat > 0) oke.push(kolom)
        }
        return oke
    },
    buku_pinjam: async () => {
        query = `select judul,
        (select nama from penerbit where penerbit.n_penerbit=buku.n_penerbit)n_penerbit,
        (select sum(jumlah) from pinjam where n_bukup=n_buku)jpinjam,
        (select sum(jumlah) from kembali where n_bukuk=n_buku)jkembali,
        jumlah from buku`
        let data = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        return data
    },

    simpan_user: async (data) => {

        let hasil
        if (data.userbaru == 'true') {
            if (data.username.trim().length > 10) throw {
                message: " username tidak boleh lebih dari 10 digit"
            }
            query = `select username from users`

            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(query, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(hasil)
                })
            })
            if (hasil[0].username == data.username) throw {
                message: 'username sudah ada'
            }

            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(`insert into users(username,password,nama) values('${data.username}',${data.password},'${data.nama}')`, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })


        } else {
            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(`update users set nama='${data.nama}' where username='${data.username}'`, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })


        }

        return hasil
    },

    simpan_penerbit: async (data) => {

        let hasil
        if (data.n_penerbit == 0) {
            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(`insert into penerbit(nama) values('${data.nama}')`, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })



        } else {
            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(`update penerbit set nama= '${data.nama}' where n_penerbit=${data.n_penerbit}`, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })


        }


        return hasil
    },
    simpan_pemasukan: async (data) => {

        query = `
        insert into buku_masuk(n_bukum,sumber,jumlah,tg_masuk,keterangan) 
        values('${data.n_bukum}','${data.sumber}',${data.jumlah},'${data.tg_masuk}','${data.keterangan}');
        update buku set jumlah=jumlah+${data.jumlah} where n_buku= ${data.n_bukum};
        `

        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(true)
            })
        })

        return hasil
    },
    simpan_anggota: async (data) => {
        let hasil
        if (data.n_anggota == 0) {
            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(`insert into anggota(nama,alamat,kota,telepon,no_identitas,pekerjaan) values('${data.nama}','${data.alamat}','${data.kota}','${data.telepon}','${data.identitas}','${data.pekerjaan}')`, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })

        } else {
            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(`update anggota set nama= '${data.nama}',alamat= '${data.alamat}',kota= '${data.kota}',telepon= '${data.telepon}',no_identitas= '${data.identitas}' ,pekerjaan= '${data.pekerjaan}' where n_anggota=${data.n_anggota}`, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })



        }

        return hasil
    },
    simpan_kategori: async (data) => {

        let hasil
        if (data.id_kategori == 0) {
            kt = `select nama_kategori from kategori where nama_kategori='${data.nama}'`

            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(kt, async (err, hasil1) => {
                    if (err) reject(err)

                    resolve(hasil1)
                })
            })

            if (hasil.length != 0) {
                if (hasil[0].nama_kategori == data.nama) throw {
                    message: 'kategori sudah ada'
                };
            }


            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(`insert into kategori(nama_kategori,id_kategori) values('${data.nama}',${data.id_kategori})`, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })

        } else {

            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(`update kategori set nama_kategori= '${data.nama}' where id_kategori=${data.id_kategori}`, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })


        }


        return hasil
    },
    simpan_pinjam: async (data) => {

        oke = `select jumlah from buku where n_buku=${data.n_bukum}`

        let hasil
        hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(oke, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        okay = `select lama_pinjam from setting`
        hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(okay, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })
        console.log(hasil[0].lama_pinjam, data.lama)
        if (hasil[0].lama_pinjam < Number(data.lama)) throw {
            message: 'lama pinjam melebihi batas'
        }

        if (data.no_pinjam == 0) {
            if (hasil[0].jumlah < Number(data.jumlah)) throw {
                message: 'jumlah stok tidak mencukupi'
            };
            query = ` 
            insert into pinjam(no_anggota,n_bukup,tg_pinjam,lama,jumlah)
            values('${data.no_anggota}','${data.n_bukum}','${data.tg_pinjam}','${data.lama}','${data.jumlah}');
            update buku set jumlah=jumlah-${data.jumlah} where n_buku= ${data.n_bukum};
            `
            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(query, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(true)
                })

            })
            // BAATTASSS
            // let hasil1
            // if(data.n_pinjam==0){
            //      hasil1 = await new Promise(async (resolve,reject)=>{
            //         await koneksi.query(`insert into pinjam(no_anggota,n_bukup,tg_pinjam,lama,jumlah)
            //         values('${data.no_anggota}','${data.n_bukup}','${data.tg_pinjam}','${data.lama}','${data.jumlah}')`,async(err,hasil)=>{
            //             if(err) reject(err)

            //             resolve(true)
            //         })
            //     })


        } else {
            hasil1 = await new Promise(async (resolve, reject) => {
                await koneksi.query(`update pinjam set no_anggota= '${data.no_anggota}',n_bukup= '${data.n_bukum}',tg_pinjam= '${data.tg_pinjam}',lama= '${data.lama}' where no_anggota=${data.no_anggota}`, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })

        }

        return hasil
    },

    simpan_buku: async (data) => {

        let hasil

        if (data.n_buku == 0) {
            apa = `select judul,jilid from buku where judul='${data.judul}' and jilid='${data.jilid}'`


            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(apa, async (err, hasil1) => {
                    if (err) reject(err)

                    resolve(hasil1)
                })
            })

            if (hasil.length != 0) throw {
                message: 'buku sudah ada'
            };

            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(`insert into buku(judul,pengarang,n_penerbit,terbit,jilid,halaman,isbn,deskripsi,rak_buku,kategori)values('${data.judul}','${data.pengarang}',${data.n_penerbit},'${data.terbit}','${data.jilid}','${data.halaman}','${data.isbn}','${data.sinopsis}','${data.rak_buku}','${data.kategori}')`, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })

        } else {
            apa = `select judul from buku where judul='${data.judul}' and n_buku !='${data.n_buku}'`


            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(apa, async (err, hasil1) => {
                    if (err) reject(err)

                    resolve(hasil1)
                })
            })

            if (hasil.length != 0) {
                if (hasil[0].judul == data.judul) throw {
                    message: 'judul ada'
                };
            }

            query = `update buku set judul= '${data.judul}', pengarang= '${data.pengarang}', n_penerbit= ${data.n_penerbit}, terbit= '${data.terbit}',jilid='${data.jilid}',halaman ='${data.halaman}', isbn='${data.isbn}',deskripsi='${data.sinopsis}',rak_buku='${data.rak_buku}',kategori='${data.kategori}' where n_buku=${data.n_buku}`

            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(query, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })

        }
        // console.log(hasil)
        return hasil
    },
    simpan_pengeluaran: async (data) => {
        oke = `select jumlah from buku where n_buku=${data.n_bukum}`

        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(oke, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })

        })

        if (hasil[0].jumlah < data.jumlah) throw {
            message: 'jumlah stok tidak mencukupi'
        };
        query = `
      insert into buku_keluar(n_bukukel,tujuan,jumlah,tg_keluar,keterangan)
       values('${data.n_bukum}','${data.tujuan}','${data.jumlah}','${data.tgkeluar}','${data.keterangan}');
      update buku set jumlah=jumlah-${data.jumlah} where n_buku= ${data.n_bukum};
      `

        hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(true)
            })
        })

        return hasil
    },
    simpan_kembali: async (data) => {

        ok = `select no_pinjam from pinjam where no_pinjam=${data.n_pinjam}`
        let hasil
        hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(ok, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })
        if (hasil.length == 0) {
            throw {
                message: 'Data tidak ada'
            };
        }
        query = `select (case when date_format(tg_pinjam,'%Y-%m-%d')>'${data.tgl_kembali}' then true else false end)validasi from pinjam where no_pinjam=${data.n_pinjam}`
        hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        if (hasil[0].validasi) {
            throw {
                message: 'tanggal kembali tidak boleh kurang dari tanggal pinjam'
            };
        }


        if (data.n_kembali == 0) {
            ok = `select n_pinjam from kembali where n_pinjam=${data.n_pinjam}`
            let hasil
            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(ok, async (err, hasil) => {
                    if (err) reject(err)

                    resolve(hasil)
                })
            })
            if (hasil.length) throw {
                message: 'data peminjaman sudah di kembalikan'
            }

            query = `
        insert into kembali(n_pinjam,tgl_kembali,n_bukuk,jumlah)
         values('${data.n_pinjam}','${data.tgl_kembali}','${data.n_bukuk}','${data.jumlah}');
         update buku set jumlah=jumlah+${data.jumlah} where n_buku= ${data.n_bukuk};
        `
            console.log(query)
            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(query, async (err, hasil1) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })

        } else {
            hasil = await new Promise(async (resolve, reject) => {
                await koneksi.query(`update kembali set n_pinjam= '${data.n_pinjam}',n_bukuk= '${data.n_bukuk}',tgl_kembali= '${data.tgl_kembali}',jumlah= '${data.jumlah}' where n_kembali=${data.n_kembali}`, async (err, hasil1) => {
                    if (err) reject(err)

                    resolve(true)
                })
            })
        }



        return hasil
    },
    simpan_konfigurasi: async (data) => {
        console.log(data)
        hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`update setting set denda= ${data.denda},lama_pinjam=${data.lama_pinjam},cek=${data.cek}`, async (err, hasil1) => {
                if (err) reject(err)

                resolve(true)
            })
        })


        return hasil
    },
    simpan_bayar: async (data) => {

        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select n_pinjam from bayar_denda where n_pinjam=${data.n_pinjam}`, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        if (hasil.length) throw {
            message: 'denda sudah dibayar'
        }


        query = `insert into bayar_denda(n_pinjam,tg_bayar,hari_telat,denda_hari,nilai_bayar) values(${data.n_pinjam},'${data.tg_bayar}',${data.hari_telat},${data.denda_hari},${data.nilai})`
        let hasil1 = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })


        return hasil
    },

    beranda: async () => {
        let data = await new Promise(async (resolve, reject) => {
            await koneksi.query('#', async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)
            })
        })

        return data
    },
    login: async (data) => {
        let hasil1 = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select * from users where username= '${data.username}' and password= '${data.password}'`, async (err, hasil) => {
                if (err) reject(err)

                resolve(hasil)

            })

        })
        if (hasil1.length == 0) throw {
            message: "user atau password salah"
        }

        return hasil1[0].nama

    },
    ubah_password: async (data) => {
        oke = `select password from users where trim(password)='${data.password1}' and trim(username)='${data.username}'`

        let hasil

        hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(oke, async (err, hasil1) => {
                if (err) reject(err)

                resolve(hasil1)

            })

        })
        if (hasil.length == 0) {
            if (hasil.password != data.password1) throw {
                message: 'password tidak sesuai'
            }
        }

        await new Promise(async (resolve, reject) => {
            await koneksi.query(`update users set password='${data.password_baru}' where password='${data.password1}' and username='${data.username}'`, async (err, hasil1) => {
                if (err) reject(err)

                resolve(hasil1)

            })

        })
        console.log(hasil)
        return hasil[0]
    },

    tampil_anggota: async (data) => {
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select * from anggota where n_anggota= ${data.n_anggota}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })

        return hasil[0]
    },
    edit_buku: async (data) => {
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select * from buku where n_buku= ${data.n_buku}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })

        return hasil[0]
    },

    // cetak_pinjam : async(data)=>{
    //     let hasil = await new Promise(async (resolve,reject)=>{
    //         await koneksi.query(`select no_anggota,n_bukup,date_format(tg_pinjam,'%Y-%m-%d') tg_pinjam, denda, lama, jumlah from pinjam where no_pinjam= ${data.no_pinjam}`,async(err,hasil_eksekusi)=>{
    //             if(err) reject(err)

    //             resolve(hasil_eksekusi)
    //         })
    //     })

    //     return hasil[0]
    // }, 
    tampil_user: async (data) => {
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select* from users where username= '${data.username}'`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })

        return hasil[0]
    },
    tampil_pengeluaran: async (data) => {
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select * from buku_keluar where n_keluar= ${data.n_keluar}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })

        return hasil[0]
    },
    tampil_penerbit: async (data) => {
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select * from penerbit where n_penerbit= ${data.n_penerbit}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })

        return hasil[0]
    },
    tampil_kategori: async (data) => {
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select * from kategori where id_kategori= ${data.id_kategori}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })

        return hasil[0]
    },
    tampil_kembali: async (data) => {
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select n_pinjam,date_format(tgl_kembali,'%Y-%m-%d') tgl_kembali, n_bukuk, jumlah from kembali where n_kembali= ${data.n_kembali}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })

        return hasil[0]
    },
    tampil_cari: async (data) => {
        console.log(data)
        let where = ``

        if (typeof data != 'undefined') where = `and anggota.nama like '%${data.nama}%'`

        query = `select no_pinjam,(select nama from anggota where n_anggota=no_anggota)nama,
        (select n_pinjam from kembali where n_pinjam=no_pinjam)n_pinjam,
        date_format(tg_pinjam,'%d-%m-%y')tg_pinjam from pinjam
        left join anggota on anggota.n_anggota=pinjam.no_anggota
        left join kembali on kembali.n_pinjam=pinjam.no_pinjam

        where kembali.n_pinjam is null ${where}
         `
        console.log(query)
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil1) => {
                if (err) reject(err)

                resolve(hasil1)
            })
        })
        console.log(hasil)
        return hasil
    },
    tampilkan_modal: async (data) => {

        query = `select no_pinjam,(select nama from anggota where n_anggota=no_anggota)nama1,
        (select judul from buku where n_buku=n_bukup)judul,penerbit.nama,
        date_format(tg_pinjam,'%Y-%m-%d')tg_pinjam,
        n_bukup,pinjam.jumlah,lama from pinjam
        left join buku on buku.n_buku = pinjam.n_bukup
        left join penerbit on penerbit.n_penerbit=buku.n_penerbit
        where no_pinjam=${data.no_pinjam}
         `
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil1) => {
                if (err) reject(err)

                resolve(hasil1)

            })
        })
        console.log(hasil)
        return hasil
    },
    // BATASSSS HAPUUUSSS

    hapus_anggota: async (data) => {
        let valid = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select * from pinjam  where no_anggota= ${data.n_anggota}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })
        if(valid.length)throw {
            message :"data tidak bisa dihapus karena digunakan dipeminjaman "
        }
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`delete from anggota where n_anggota= ${data.n_anggota}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(false)
            })
        })

        return true
    },
    hapus_penerbit: async (data) => {
        let valid = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select * from buku  where n_penerbit= ${data.n_penerbit}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })
        if(valid.length)throw {
            message :"data tidak bisa dihapus karena digunakan di data buku "
        }

        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`delete from penerbit where n_penerbit= ${data.n_penerbit}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(false)
            })
        })

        return true
    },
    hapus_kategori: async (data) => {
        let valid = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select * from buku  where kategori= ${data.id_kategori}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })

        if(valid.length)throw {
            message :"data tidak bisa dihapus karena digunakan di data buku "
        }

        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`delete from kategori where id_kategori= ${data.id_kategori}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(false)
            })
        })

        return true
    },
    hapus_user: async (data) => {
        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`delete from users where username= '${data.username}'`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(false)
            })
        })

        return true
    },
    hapus_buku: async (data) => {
        let valid = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select * from buku_masuk  where n_bukum=${data.n_buku}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })

        if(valid.length)throw {
            message :"data tidak bisa dihapus karena digunakan dipemasukan"
        }

        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(`delete from buku where n_buku= ${data.n_buku}`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(false)
            })
        })

        return true
    },
    hapus_pengembalian: async (data) => {
        query = `
        update buku set buku.jumlah=buku.jumlah-(select pinjam.jumlah from pinjam left join kembali on kembali.n_pinjam=pinjam.no_pinjam where n_kembali =${data.n_kembali}) 
        where n_buku=(select n_bukup from pinjam left join kembali on kembali.n_pinjam=pinjam.no_pinjam where n_kembali=${data.n_kembali});
        delete from kembali where n_kembali= ${data.n_kembali};
         `

        //  console.log(query)

        let hasil = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(false)
            })
        })

        return true
    },
    beranda1: async () => {
        let jm_anggota = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select count(*) jumlah from anggota`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })

        let jm_pinjam = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select count(*) jumlah from pinjam`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })
        let jm_buku = await new Promise(async (resolve, reject) => {
            await koneksi.query(`select nullkenol(sum(jumlah)) jumlah from buku`, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })
        query = `
        select
        (
            nullkenol((select sum(jumlah)jumlah from pinjam))-
            nullkenol((select sum(jumlah)jumlah from kembali))
        ) jumlah
        `
        let jm_dipinjam = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })
        query = `
        select count(*)jumlah from penerbit`
        let jm_terbit = await new Promise(async (resolve, reject) => {
            await koneksi.query(query, async (err, hasil_eksekusi) => {
                if (err) reject(err)

                resolve(hasil_eksekusi)
            })
        })

        return {
            'jm_anggota': jm_anggota[0].jumlah,
            'jm_peminjaman': jm_pinjam[0].jumlah,
            'jm_buku': jm_buku[0].jumlah,
            'jm_dipinjam': jm_dipinjam[0].jumlah,
            'jm_terbit': jm_terbit[0].jumlah

        }
    },
}

module.exports = laporan