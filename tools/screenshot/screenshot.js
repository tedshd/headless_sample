const argv      = require('minimist')(process.argv.slice(2)),
      puppeteer = require('puppeteer'),
      devices   = require('puppeteer/DeviceDescriptors');

// console.log(argv);

(async () => {
    const url    = argv['url'] || '',
          name   = argv['name'] || 'screenshot_' + new Date().toJSON() + '.png',
          path   = argv['path'] || './',
          ua     = argv['ua'] || '',
          size   = argv['size'] || '',
          device = argv['device'] || '',
          w      = (size) ? parseInt(size.split(',')[0], 10) : '',
          h      = (size) ? parseInt(size.split(',')[1], 10) : '';

    if (!url) {
        console.error('screenshot: url arg is empty');
        return;
    }

    if (size) {
        if (!w || !h) {
            console.error('screenshot: size arg format is error');
            return;
        }
    }

    let screenshotArg = {
        path: path + name,
        fullPage: (size) ? false : true
    };

    let viewport = {
        width: w,
        height: h,
        isMobile: false,
        hasTouch: false,
    };

    // run puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if (device) {
        await page.emulate(devices[device]);
    } else {
        if (ua) {
            page.setUserAgent(ua);
        }
        if (size) {
            await page.setViewport(viewport);
        }
    }

    const response = await page.goto(url, {waitUntil: 'networkidle2'});

    await page.screenshot(screenshotArg);
    await browser.close();

})();
