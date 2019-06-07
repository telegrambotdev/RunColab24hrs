const puppeteer = require('puppeteer');
require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
	(async () => {
		ACCOUNTS = [[process.env.COLAB_URL1, process.env.GMAIL_USERNAME1, process.env.GMAIL_PASSWORD1], [process.env.COLAB_URL2, process.env.GMAIL_USERNAME2, process.env.GMAIL_PASSWORD2]]
		for (let i = 0; i<ACCOUNTS.length; i++){
			const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox', '--proxy-server=86.34.133.118:8080'], headless: true, defaultViewport: null});
			// const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox', '--proxy-server=86.34.133.118:8080'], headless: false, defaultViewport: null});
			console.log('Browser opened');
			const page = await browser.newPage(); 
			await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
			const USERNAME_SELECTOR = '#identifierId'
			const BUTTON_SELECTOR1 = '#identifierNext > div.ZFr60d.CeoRYc'
			const PASSWORD_SELECTOR = '#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input'
			const BUTTON_SELECTOR2 = '#passwordNext > div.ZFr60d.CeoRYc'
			const FILE = '#file-menu-button > div > div > div.goog-inline-block.goog-menu-button-caption'
			const SAVE = '#\\:h > div'
			await page.goto(ACCOUNTS[i][0], {waitUntil: 'networkidle2'});
			await page.waitFor(3000);
			console.log('Selecting username');
			// await page.waitForNavigation();
			await page.waitForSelector(USERNAME_SELECTOR);
			await page.screenshot({path: __dirname +`/public/screenshot1${i}.png`});
			await page.click(USERNAME_SELECTOR);
			await page.keyboard.type(ACCOUNTS[i][1]);
			await page.click(BUTTON_SELECTOR1);
			console.log('Finished entering username and clicked NEXT');
			await page.waitFor(3000);
			// await page.waitForNavigation();
			console.log('Selecting password');
			await page.waitFor(3000);
			await page.waitForSelector(PASSWORD_SELECTOR);
			await page.screenshot({path: __dirname +`/public/screenshot2${i}.png`});
			await page.click(PASSWORD_SELECTOR);
			await page.keyboard.type(ACCOUNTS[i][2]);
			await page.screenshot({path: __dirname +`/public/screenshot3${i}.png`});
			await page.click(BUTTON_SELECTOR2);
			console.log('Finished entering password and clicked LOGIN');
			// await page.waitForNavigation();
			// await page.goto(process.env.COLAB_URL);
			// await page.waitForNavigation();
			await page.waitFor(3000);
			await page.screenshot({path: __dirname +`/public/screenshot4${i}.png`});
			console.log('success');

			await page.waitFor(3000);
			await page.screenshot({path: __dirname +`/public/screenshot5${i}.png`});

			await page.waitFor(60000);
			await page.waitForSelector(FILE);
			console.log('File Selector Found');
			await page.click(FILE);
			await page.waitForSelector(SAVE);
			console.log('Save selector found');
			await page.click(SAVE);
			await page.screenshot({path: __dirname +`/public/screenshot6${i}.png`});
			await page.waitFor(3000);
			const status = await page.evaluate(()=>{
				return document.querySelector("#connect > paper-button > span").innerText;
			});

			console.log('colab saved sucessfully', status);
			await page.close();
			await browser.close();
			console.log('Browser Closed');
			console.log('GOing for next ACCount');
		}
		
	})();
	res.end('<html><head></title></head><body><h1>Browser is running. You gotta chill Bro...</img></h1></body></html>');
});
app.get('/screenshot', (req, res)=>{
	res.end('<html><head></title></head><body><img src="screenshot10.png"></img><img src="screenshot20.png"></img><img src="screenshot30.png"></img><img src="screenshot40.png"></img><img src="screenshot50.png"></img><img src="screenshot60.png"></img><h1>NEXT</h1><img src="screenshot11.png"></img><img src="screenshot21.png"></img><img src="screenshot31.png"></img><img src="screenshot41.png"></img><img src="screenshot51.png"></img><img src="screenshot61.png"></img></body></html>');

})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Colab app listening on port ${port}!`))