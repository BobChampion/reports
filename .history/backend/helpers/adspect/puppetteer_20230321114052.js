const puppeteer = require('puppeteer');
require('dotenv').config();

let getStreamsWithClick = async (res) => {
  const streamswithclick = [];
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setViewport({
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
    });

    await page.goto('https://clients.adspect.ai/login');
    await page.waitForSelector('input#login-id', { visible: true, clickable: true });
    await page.focus('input#login-id');
    await page.keyboard.type(process.env.ADSPECT_EMAIL);
    await page.waitForSelector('input#login-password', { visible: true, clickable: true });
    await page.focus('input#login-password');
    await page.keyboard.type('p$p!s%FTgD,];9c`');
    await page.waitForSelector('button.btn.btn-block.btn-lg.btn-primary.font-weight-bold', {
      visible: true,
      clickable: true,
    });
    await page.click('button.btn.btn-block.btn-lg.btn-primary.font-weight-bold');
    await page.waitForSelector('.navbar-nav .nav-item:nth-child(2)', {
      visible: true,
      clickable: true,
    });
    await page.click('.navbar-nav .nav-item:nth-child(2)');

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 21);

    const dateRange = `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${startDate
      .getDate()
      .toString()
      .padStart(2, '0')} 00:00 – ${endDate.getFullYear()}-${(endDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')} 00:01`;

    await page.waitForSelector('input.form-control.form-control-sm.text-monospace.range-value', {
      visible: true,
      clickable: true,
    });
    await page.$eval(
      'input.form-control.form-control-sm.text-monospace.range-value',
      (el, value) => (el.value = value),
      dateRange,
    );
    await page.waitForSelector('#live', {
      visible: true,
      clickable: true,
    });
    await page.click('#live');
    await page.waitForSelector('thead th.text-nowrap.sorting.sorting_desc', {
      visible: true,
      clickable: true,
    });
    await page.click('thead th.text-nowrap.sorting.sorting_desc');
    await page.waitForSelector('table#funnel tbody tr .sorting_1', {
      visible: true,
      clickable: true,
    });
    const trs = await page.$$eval('table#funnel tbody tr', (trs) => {
      trs.forEach((tr) => {
        let sorting = tr.querySelector('.sorting_1');
        let nameTag = tr.querySelector('td a').innerText;
        let obj = {
          name: '',
          clickCount: '',
        };
        let clickCount = Number(sorting.innerText.split(' /')[0]);
        if (clickCount < 30) {
          obj.name = nameTag;
          obj.clickCount = '' + clickCount;
          streamswithclick.push(obj);
        }
      });
    });
    await browser.close();
  })()
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      res.send(streamswithclick);
    });
};

module.exports = {
  getStreamsWithClick,
};
