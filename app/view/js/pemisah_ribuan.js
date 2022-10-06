function pemisah_ribuan(angka){
    return  ((angka + '').replace(/\D/g,'') * 1).toLocaleString().replace(/,/g,'.')
    // var number_string = angka.replace(/[^,\d]/g, '').toString(),
    // split   		= number_string.split(','),
    // sisa     		= split[0].length % 3,
    // rupiah     		= split[0].substr(0, sisa),
    // ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    // // tambahkan titik jika yang di input sudah menjadi angka ribuan
    // if(ribuan){
    //     separator = sisa ? '.' : '';
    //     rupiah += separator + ribuan.join('.');
    // }

    // rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    // return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    // return rupiah;
}
// penghapus format rupiah
function titik(num) {
	let hasil = +((''+num).replace(/\./g, ""));
	return hasil;
}

// input format rupiah dg selector class (.formatRp)
$('.formatRp').on('input change', function() {
	this.value = formatRupiah(this.value);
})