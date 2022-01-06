/* ================= промокоды =========================*/
async function activatePins(pins = []) {
	async function getAccount() {
		var parser = new DOMParser();
		let doc = await fetchToStr('https://pw.mail.ru/usercp.php');
		doc = parser.parseFromString(doc, "text/html");
		return doc.getElementsByName('game_account')[0].value;
	}
	
	const account = await getAccount();
	
	if (account)
		pins.forEach(async (pin) => {
			await fetch(`https://pw.mail.ru/pin.php?do=activate&pin=${pin}&game_account=${account}`);
		})
}
