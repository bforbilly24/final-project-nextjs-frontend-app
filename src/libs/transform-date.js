function transformDate(value) {
	const rawDate = new Date(value);

	var year = rawDate.getFullYear();
	var month = rawDate.getMonth();
	var date = rawDate.getDate();
	var day = rawDate.getDay();
	var hour = ("0" + rawDate.getHours()).slice(-2);
	var minute = ("0" + rawDate.getMinutes()).slice(-2);
	var second = ("0" + rawDate.getSeconds()).slice(-2);

	switch (day) {
		case 0:
			day = "Minggu";
			break;
		case 1:
			day = "Senin";
			break;
		case 2:
			day = "Selasa";
			break;
		case 3:
			day = "Rabu";
			break;
		case 4:
			day = "Kamis";
			break;
		case 5:
			day = "Jum'at";
			break;
		case 6:
			day = "Sabtu";
			break;
	}

	switch (month) {
		case 0:
			month = "Januari";
			break;
		case 1:
			month = "Februari";
			break;
		case 2:
			month = "Maret";
			break;
		case 3:
			month = "April";
			break;
		case 4:
			month = "Mei";
			break;
		case 5:
			month = "Juni";
			break;
		case 6:
			month = "Juli";
			break;
		case 7:
			month = "Agustus";
			break;
		case 8:
			month = "September";
			break;
		case 9:
			month = "Oktober";
			break;
		case 10:
			month = "November";
			break;
		case 11:
			month = "Desember";
			break;
	}

	var formattedDate = day + ", " + date + " " + month + " " + year;
	var formatedTime = hour + ":" + minute + ":" + second + " WIB";

	return `${formattedDate}, ${formatedTime}`;
}

export { transformDate };
