# Membuat Data Contest

File `contest.json` memiliki format sebagai berikut :
```json
[
	{
		"nama": "...",
		"slug": "...",
		"stage": ["...", "..."]
	}
]
```

- slug merupakan string yang berguna sebagai *identifier* kontes (CamelCase)
- nama merupakan string yang berisi nama kontes (Title Case)
- stage merupakan array of string yang berisi stage yang diikuti (Title Case)
- nama dan stage akan tampil pada sidebar
- slug dan stage akan digunakan untuk formating nama file solusi