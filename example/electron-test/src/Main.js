"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var electron_1 = require("electron");
var electron_driver_1 = require("./electron-driver");
var fs = require("fs");
var path = require("path");
var win;
electron_1.app.on('ready', function () {
    win = new electron_1.BrowserWindow();
    win.loadURL('index.html');
    test();
});
function test() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, list, ret, WECHATY_BRO_JS_FILE, sourceCode, retObj, res, _a, _b, text, obj;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, electron_driver_1.launch({ title: 'test' })];
                case 1:
                    browser = _c.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _c.sent();
                    return [4 /*yield*/, page.goto('http://wx.qq.com')];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, page.cookies({ url: 'https://wx.qq.com' })];
                case 4:
                    list = _c.sent();
                    console.log(list);
                    return [4 /*yield*/, page.waitForFunction("typeof window.angular !== 'undefined'")];
                case 5:
                    ret = _c.sent();
                    console.log(ret);
                    // const cookieList: Cookie[] = await page.cookies({})
                    // console.log(cookieList)
                    console.log(page.url());
                    WECHATY_BRO_JS_FILE = path.join(__dirname, 'wechaty-bro.js');
                    sourceCode = fs.readFileSync(WECHATY_BRO_JS_FILE)
                        .toString();
                    return [4 /*yield*/, page.evaluate(sourceCode)];
                case 6:
                    retObj = _c.sent();
                    console.log(retObj);
                    return [4 /*yield*/, page.send('test', 'arg1', 'arg2')];
                case 7:
                    res = _c.sent();
                    console.log(res);
                    _b = (_a = console).log;
                    return [4 /*yield*/, page.send('ding', 'abcdd')];
                case 8:
                    _b.apply(_a, [_c.sent()]);
                    text = fs.readFileSync('./demo.wechaty.json').toString();
                    obj = JSON.parse(text);
                    console.log(obj);
                    page.setCookie.apply(page, obj['cookies']);
                    return [2 /*return*/];
            }
        });
    });
}
electron_1.app.on('window-all-closed', function () {
    // process.platform !=='darwin' && app.quit(
});
