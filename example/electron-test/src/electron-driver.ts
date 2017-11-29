import { BrowserWindow, WebContents, Cookie, ipcMain } from 'electron';
import { setTimeout } from 'timers';
import  * as _  from 'lodash'
export class Browser {
  public options: any
  // tslint:disable-next-line:no-empty
  constructor(options) {
  }
  public async close(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }
  public async version(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      return  resolve('version');
    })
  }

  public async newPage(): Promise<Page> {
    return new Promise<Page>((resolve, reject) => {
      return resolve(new Page(this.options))
    })
  }
}
export class Dialog {
  public type: string
  public message(): string {
    return 'message'
  }
  public async accept(): Promise<any> {
    return new Promise((resolve, reject) => {
      return resolve()
    })
  }
}
export class ElementHandle {
  public click() {
    return null
  }
}
export async function launch(options): Promise<Browser> {
  return new Browser(options)
}
export class Page {
  public win: BrowserWindow
  public web: WebContents
  constructor(opt) {
    opt = opt || {}

    opt = _.assign({}, {webPreferences: {
      allowRunningInsecureContent: true,
    }})
    this.win = new BrowserWindow(opt)
    this.web = this.win.webContents;
    this.web.openDevTools();
  }
  public async close(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.win.close()
      resolve();
    })
  }
  public url(): string {
    return this.web.getURL()
  }

  public async evaluate(params: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.web.executeJavaScript( params, false, (result) => {
        // console.log(result)
        return resolve(result)
      })
    })
  }

  public async exposeFunction(fname: string, callback: Function): Promise<any> {
    return new Promise((resolve, reject) => {
      return resolve()
    })
  }
  /**
   *
   * @param {'load'} eventName
   * @param callback
   */
  public on (eventName: string, callback: Function) {
    if (eventName === 'load') {

      this.web.addListener('did-finish-load', (event) => {
         callback()
      })
    }
    if (eventName === 'error') {
      this.web.addListener('crashed', (event, killed) => {
        callback(event)
     })
    }
  }
  public bindEvent(eventName: string, callback: Function) {
    ipcMain.on( eventName, (event, args) => {
      callback(eventName, args)
    })
  }

  public async goto(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.web.on('did-fail-load', (event, errorCode, errorMessage) => {
        reject(errorMessage)
      })
      this.web.on('did-finish-load', (event) => {
        resolve()
      })
      this.web.loadURL(url)
    })
  }

  public async setCookie(...args: Cookie[]): Promise<any> {
    return new Promise((resolve, reject) => {
      args.forEach((value) => {
        this.web.session.cookies.set( _.assign({url: 'http://wx.qq.com' }, value), (err) => {
          reject()
        })
      })
      return resolve()
    })
  }

  public async reload(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.win.reload()
      return resolve()
    })
  }
  public async send(event: string, ...args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      ipcMain.once(`bridge-${event}`, (evt, arg) => {
        resolve(arg)
      })
      this.web.send('bridge', {
        method: event,
        args: args.length > 0 ? args : null,
      })
    })
  }
  public async waitForFunction(code: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.web.executeJavaScript(code, false, (result) => {
        if (result.toString() === 'true') {
            resolve(true)
        } else {
          setTimeout(() => {
            resolve(false)
          }, 100)
        }
      })
      // return resolve('message')
    })
  }
  public async cookies(filter: any): Promise<Cookie[]> {
    return new Promise<Cookie[]>((resolve, reject) => {
      this.web.session.cookies.get(filter, (error, cookies) => {
        if (error) {
          reject(error)
        } else {
          resolve(cookies)
        }
      });
    })
  }
}
export default{
  Browser,
  Dialog,
  ElementHandle,
  launch,
  Page,
}
