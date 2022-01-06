/* ================= коллекция - сбор 5 категории =========================*/
async function collect() {
	async function getInfo() {
		const res = await fetchToJson('https://pw.mail.ru/minigames.php?game=collection&doo=info');
		return res.rows;
	}
	
	async function turn() {
		await fetch('https://pw.mail.ru/minigames.php?game=collection&doo=turn');
	}
	
	let stop = false;
	
	while (!stop) {
		await turn();
		const rows = await getInfo();
		for (let cell in rows) {
			if (rows[cell] === 5) {
				const number = parseInt(cell.split('row')[1]);
				if (number < 5) {
					await fetch(`https://pw.mail.ru/minigames.php?game=collection&doo=get_next&category=${number}`);
				}
				else {
					alert('ПРОСНИСЬ!');
					stop = true;
					break;
				}
			}
		}
	}
}
