
# Membuat Data Stage
Untuk membuat data sebuah stage, buat file json dengan format nama file `{slug}_{stage}.json`
contoh : `FindIT2020_Preliminary.json`

File json tersebut harus memiliki format sebagai berikut
```json
{
    "nama": "...",
    "tanggal": "...",
    "team": [
	    {
		    "nama": "...",
		    "rank": "...",
		    "solve": "...",
		    "penalty": "...",
		    "anggota": [
			    "...",
			    "...",
			    "..."
		    ]
	    }
    ],
    "problem": ["...", "...", "...", "..."]
}
```
- `nama` adalah string yang berisi `{nama_contest} - {stage}`.
- `tanggal` adalah string yang berisi tanggal dilaksanakan kontes tersebut dengan format `{tanggal} {bulan} {tahun}`.
- `team` adalah array of struct yang berisi detail dari tim yang mengikuti kontes tersebut.
- `nama` dalam `team` adalah string yang berisi nama tim tersebut.
- `rank` dalam `team` adalah string yang berisi peringkat tim tersebut di akhir kontes, tulis `N/A` jika tidak diketahui.
- `solve` dalam `team` adalah string yang berisi jumlah solve tim tersebut di akhir kontes.
- `penalty` dalam `team` adalah string yang berisi nilai penalti tim tersebut di akhir kontes, tulis `N/A` jika tidak diketahui.
- `anggota` dalam `team` adalah arrray of string yang berisi nama-nama anggota tim tersebut dan disusun secara *lexicography*.
- `problem` adalah array of string yang berisi nama-nama alphabet problem secara terurut.


# Membuat Data Problem dan Solusi
Untuk membuat data sebuah problem dan solusinya, buat file json dengan format nama file `{slug}_{stage}_{problem}.json`
contoh : `FindIT2020_Preliminary_A.json`

File json tersebut harus memiliki format sebagai berikut
```json
{
    "tag": ["...", "..."],
    "problem": "...",
    "solution": ["...", "...", "..."]
}
```
- `tag` adalah array of string yang berisi kategori materi problem tersebut.
- File PDF problem disimpan dalam folder `problem` yang ada di root.
- `solution` adalah array of string yang berisi nama nama tim yang berhasil menyelesaikan problem ini.
- `solution` akan tampil pada dropdown solusi.
- File solusi disimpan dalam folder `solution` yang ada di root dan memiliki format `{slug}_{stage}_{nama_tim}_{problem}`.
- File solusi tidak mempunyai ekstensi dan `{nama_tim}` harus sesuai dengan yang ada di `solution`.