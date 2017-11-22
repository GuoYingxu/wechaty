
export class Browser {
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
      return resolve(new Page())
    })
  }
}
export class Cookie {
  public name: string
  public domain: string
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
  return new Browser()
}
export class Page {
  public async close(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }
  public url(): string {
    return 'url'
  }

  public async evaluate(params: Function|string): Promise<any> {
    return new Promise((resolve, reject) => {
      return resolve()
    })
  }

  public async exposeFunction(fname: string, callback: Function): Promise<any> {
    return new Promise((resolve, reject) => {
      return resolve()
    })
  }
  public on(eventName: string, callback: Function) {
    return null
  }

  public async goto(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      return resolve()
    })
  }

  public async setCookie(...args: Cookie[]): Promise<any> {
    return new Promise((resolve, reject) => {
      return resolve()
    })
  }

  public async reload(): Promise<any> {
    return new Promise((resolve, reject) => {
      return resolve()
    })
  }

  public async waitForFunction(code: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      return resolve('message')
    })
  }
  public async cookies(): Promise<Cookie[]> {
    return new Promise<Cookie[]>((resolve, reject) => {
      return resolve([])
    })
  }
}
export default{
  Browser,
  Cookie,
  Dialog,
  ElementHandle,
  launch,
  Page,
}
