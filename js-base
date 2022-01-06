/* ====================== ФЕТЧ ======================== */
/* фетч, читающий любые кодировки. вернет декодированную строку, если всё хорошо, либо null */
async function fetchToStr(url) {
	let contentType = '';
	let charset = '';
	let dataView = '';
	let decoder = '';
	let str = '';
	let error = '';
  
	await fetch(url)
	.then(res => {
		contentType = res.headers.get('Content-Type');
		charset = contentType.substring(contentType.indexOf("charset=") + 8);
		return res.arrayBuffer();
	})
	.then(ab => {
		dataView = new DataView(ab);
		decoder = new TextDecoder(charset);
		str = decoder.decode(dataView);
	})
	.catch(e => error = e);
	
	if (error) {
		console.log('Error occured: ', error);
		return null;
	}
		
	return str;
}

/* фетч в джсон. вернет объект, если всё хорошо, либо null */
async function fetchToJson(url) {
	let jsonDoc = '';
	let error = '';
	
	await fetch(url)
	.then(res => res.json())
	.then(res => jsonDoc = res)
	.catch(e => error = e);
	
	if (error) {
		console.log('Error occured: ', error);
		return null;
	}
	
	return jsonDoc;
}
/* ========================================================================================= */

/* парсер url-страницы. вернет собранное dom-дерево, если всё хорошо, либо null */
async function parsePage(url) {
	let domStr = await fetchToStr(url);
	
	if (domStr) {
		let parser = new DOMParser();
		return parser.parseFromString(domStr, "text/html");
	}
  
	return null;
}
