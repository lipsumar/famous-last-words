const express = require('express')
const puppeteer = require('puppeteer');
const uniqid = require('uniqid')

const OUT_PATH = 'out/'
const PORT = 3005


const app = express()
app.use(express.static('./public'))
app.get('/generate', async (req, res) => {
  const id = uniqid()
  const { text } = req.query
  await screenshot(text, id)
  res.send({ path: outFilePath(id) })
})


async function screenshot(text, id) {
  console.log('Starting puppeteer...')
  const browser = await puppeteer.launch({
    executablePath: 'google-chrome-unstable',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  console.log('Opening page...')
  await page.goto(`http://localhost:${PORT}?text=${text}`);

  console.log('Screenshot...')
  await page.screenshot({ path: 'public/' + outFilePath(id) });

  await browser.close();
  console.log('Done')
}

function outFilePath(id){
  return OUT_PATH + id + '.png'
}

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))