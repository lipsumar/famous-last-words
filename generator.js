const puppeteer = require('puppeteer');
const express = require('express');
let server = null;

(async () => {
  console.log('Starting server...')
  await startServer()

  console.log('Starting puppeteer...')
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('Opening page...')
  await page.goto('http://localhost:3000');

  console.log('Screenshot...')
  await page.screenshot({path: 'out.png'});

  await browser.close();
  console.log('Done')
  server.close()
})();

function startServer(){
  app = express()
  app.use(express.static('./public'))
  return new Promise(resolve => {
    server = app.listen(3000, resolve)
  })
}