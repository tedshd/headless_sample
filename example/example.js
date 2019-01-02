const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 4'];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // const viewport = {
    //     width: 1024,
    //     height: 768,
    //     isMobile: false,
    //     hasTouch: false,
    // };
    // await page.setViewport(viewport);
    // await page.emulate(iPhone);
    // page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36');
    page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:64.0) Gecko/20100101 Firefox/64.0');
    page.on('request', request => {
      console.log(request.url());
    });

    const response = await page.goto('https://tedshd.io', {waitUntil: 'networkidle2'});

    console.log(await response.text());

    // await page.goto('https://tysh310246.blogspot.com');

    await page.screenshot({path: 'example_1.png', fullPage: true});
    await browser.close();

})();
