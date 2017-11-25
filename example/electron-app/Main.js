const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const {
  config,
  Wechaty,
  log,
  MediaMessage,
} = require('../../dist/index')

let window;
app.on('ready', () => {
  window = new BrowserWindow();
  window.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file',
    slashes: true
  }))
  window.webContents.openDevTools()
  ipcMain.on("startWechaty", () => {
    initbot()
  })
})
app.on('window-all-closed', () => {
  app.quit()
})

function initbot() {
  const bot = Wechaty.instance({ profile: config.default.DEFAULT_PROFILE })

  bot
    .on('logout', user => log.info('Bot', `${user.name()} logouted`))
    .on('login', user => {
      log.info('Bot', `${user.name()} login`)
      bot.say('Wechaty login').catch(console.error)
    })
    .on('scan', (url, code) => {
      if (!/201|200/.test(String(code))) {
        const loginUrl = url.replace(/\/qrcode\//, '/l/')
        QrcodeTerminal.generate(loginUrl)
      }
      console.log(`${url}\n[${code}] Scan QR Code above url to log in: `)
    })
    .on('message', async m => {
      try {
        const room = m.room()
        console.log(
          (room ? `${room}` : '') +
          `${m.from()}:${m}`,
        )
        if (/^(ding|ping|bing|code)$/i.test(m.content()) && !m.self()) {
          m.say('dong')
          log.info('Bot', 'REPLY: dong')

          const joinWechaty = `Join Wechaty Developers' Community\n\n` +
            `Wechaty is used in many ChatBot projects by hundreds of developers.\n\n` +
            `If you want to talk with other developers, just scan the following QR Code in WeChat with secret code: wechaty,\n\n` +
            `you can join our Wechaty Developers' Home at once`
          await m.say(joinWechaty)
          await m.say('Scan now, because other Wechaty developers want to talk with you too!\n\n(secret code: wechaty)')
          log.info('Bot', 'REPLY: Image')
        }
      } catch (e) {
        log.error('Bot', 'on(message) exception: %s', e)
      }
    })

  bot.start()
    .catch(e => {
      log.error('Bot', 'start() fail: %s', e)
      bot.stop()
      process.exit(-1)
    })

  bot.on('error', async e => {
    log.error('Bot', 'error: %s', e)
    if (bot.logonoff()) {
      await bot.say('Wechaty error: ' + e.message).catch(console.error)
    }
    // await bot.stop()
  })
}