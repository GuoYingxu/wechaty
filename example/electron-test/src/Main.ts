import { app , BrowserWindow, Cookie} from 'electron'
import {
  Page,
  Browser,
  launch,
  // Dialog,
  // ElementHandle
}   from './electron-driver'
import * as fs          from 'fs'
import * as path        from 'path'
let win: BrowserWindow

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('index.html')
  test()
})
async function test() {
  const browser: Browser = await launch({title: 'test'})
  const page: Page = await browser.newPage();
  await page.goto('http://wx.qq.com')

  const  ret = await page.waitForFunction(`typeof window.angular !== 'undefined'`)
  console.log(ret)
  // const cookieList: Cookie[] = await page.cookies({})
  // console.log(cookieList)
  console.log(page.url())

  const WECHATY_BRO_JS_FILE = path.join(
    __dirname,
    'wechaty-bro.js',
  )
  const sourceCode = fs.readFileSync(WECHATY_BRO_JS_FILE)
  .toString()

  const retObj = await page.evaluate(sourceCode)
  console.log(retObj)

  const res = await page.send('test', 'arg1', 'arg2')
  console.log(res)
  console.log(await page.send('ding', 'abcdd'))
}
app.on('window-all-closed', () => {
  // process.platform !=='darwin' && app.quit(
})
