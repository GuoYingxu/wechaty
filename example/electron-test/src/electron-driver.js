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
var timers_1 = require("timers");
var _ = require("lodash");
var Browser = (function () {
    // tslint:disable-next-line:no-empty
    function Browser(options) {
    }
    Browser.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve();
                    })];
            });
        });
    };
    Browser.prototype.version = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return resolve('version');
                    })];
            });
        });
    };
    Browser.prototype.newPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return resolve(new Page(_this.options));
                    })];
            });
        });
    };
    return Browser;
}());
exports.Browser = Browser;
var Dialog = (function () {
    function Dialog() {
    }
    Dialog.prototype.message = function () {
        return 'message';
    };
    Dialog.prototype.accept = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return resolve();
                    })];
            });
        });
    };
    return Dialog;
}());
exports.Dialog = Dialog;
var ElementHandle = (function () {
    function ElementHandle() {
    }
    ElementHandle.prototype.click = function () {
        return null;
    };
    return ElementHandle;
}());
exports.ElementHandle = ElementHandle;
function launch(options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Browser(options)];
        });
    });
}
exports.launch = launch;
var Page = (function () {
    function Page(opt) {
        opt = opt || {};
        opt = _.assign({}, { webPreferences: {
                allowRunningInsecureContent: true
            } });
        this.win = new electron_1.BrowserWindow(opt);
        this.web = this.win.webContents;
        this.web.openDevTools();
    }
    Page.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.win.close();
                        resolve();
                    })];
            });
        });
    };
    Page.prototype.url = function () {
        return this.web.getURL();
    };
    Page.prototype.evaluate = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.web.executeJavaScript(params, false, function (result) {
                            // console.log(result)
                            return resolve(result);
                        });
                    })];
            });
        });
    };
    Page.prototype.exposeFunction = function (fname, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return resolve();
                    })];
            });
        });
    };
    /**
     *
     * @param {'load'} eventName
     * @param callback
     */
    Page.prototype.on = function (eventName, callback) {
        if (eventName === 'load') {
            this.web.addListener('did-finish-load', function (event) {
                callback();
            });
        }
        if (eventName === 'error') {
            this.web.addListener('crashed', function (event, killed) {
                callback(event);
            });
        }
    };
    Page.prototype.bindEvent = function (eventName, callback) {
        electron_1.ipcMain.on(eventName, function (event, args) {
            callback(eventName, args);
        });
    };
    Page.prototype.goto = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.web.on('did-fail-load', function (event, errorCode, errorMessage) {
                            reject(errorMessage);
                        });
                        _this.web.on('did-finish-load', function (event) {
                            resolve();
                        });
                        _this.web.loadURL(url);
                    })];
            });
        });
    };
    Page.prototype.setCookie = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        args.forEach(function (value) {
                            _this.web.session.cookies.set(_.assign({ url: 'http://wx.qq.com' }, value), function (err) {
                                reject();
                            });
                        });
                        return resolve();
                    })];
            });
        });
    };
    Page.prototype.reload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.win.reload();
                        return resolve();
                    })];
            });
        });
    };
    Page.prototype.send = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        electron_1.ipcMain.once("bridge-" + event, function (evt, arg) {
                            resolve(arg);
                        });
                        _this.web.send('bridge', {
                            method: event,
                            args: args.length > 0 ? args : null
                        });
                    })];
            });
        });
    };
    Page.prototype.waitForFunction = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.web.executeJavaScript(code, false, function (result) {
                            if (result.toString() === 'true') {
                                resolve(true);
                            }
                            else {
                                timers_1.setTimeout(function () {
                                    resolve(false);
                                }, 100);
                            }
                        });
                        // return resolve('message')
                    })];
            });
        });
    };
    Page.prototype.cookies = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.web.session.cookies.get(filter, function (error, cookies) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(cookies);
                            }
                        });
                    })];
            });
        });
    };
    return Page;
}());
exports.Page = Page;
exports["default"] = {
    Browser: Browser,
    Dialog: Dialog,
    ElementHandle: ElementHandle,
    launch: launch,
    Page: Page
};
