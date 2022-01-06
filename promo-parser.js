/* ================== парсер промокодов ==========================*/
async function parsePins() {
	async function parseLastArticleId() {
		const doc = await parsePage('https://pw.mail.ru/news.php');
		const href = doc.getElementsByClassName('news_page')[0].getElementsByTagName('a')[0].href;
		return parseInt(href.replace('https://pw.mail.ru/news.php?article=', ''));
	}
	
	function findPin(page) {
		let pin = '';
		let pinIndex = -1;
		let innerText = page.body.innerText.replace(/[\u0000-\u001F\u007F-\u009F]/g, " ").replace(/\s+/g, ' ').trim();
		innerText = innerText.split(' ');
		for (let i = 0; i < innerText.length; i++) {
			if (innerText[i].match(/промокод/i)) {
				pinIndex = i + 1;
				break ;
			}
		}
		if (pinIndex !== -1)
			pin = innerText[pinIndex].replace(/[^a-zA-Z0-9]/g, '');
		return pin;
	}
	
	const lastVal = await parseLastArticleId();
	const pins = [];
	
	for (let i = 0; i < 20; i++) {
		let pin = '';
		let url = `https://pw.mail.ru/news.php?article=${lastVal + i}`;
		const nextPage = await parsePage(url);
		pin = findPin(nextPage);
		if (pin)
			pins.push(pin);
		if (i) {
			url = `https://pw.mail.ru/news.php?article=${lastVal - i}`;
			const prevPage = await parsePage(url);
			pin = findPin(prevPage);
			if (pin)
				pins.push(pin);
		}
		
	}
	
	return pins;
}
