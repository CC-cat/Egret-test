var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
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
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isdisplay = false;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var platform, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = window.platform;
                        return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        // const result = await RES.getResAsync("description_json")
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        // const result = await RES.getResAsync("description_json")
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        this.userInfo = userInfo;
                        console.log(this.userInfo);
                        platform.sendShareData({
                            command: "load"
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
 * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
 */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var sky = this.createBitmapByName("bg_jpg");
        sky.width = stageW;
        sky.height = stageH;
        this.addChild(sky);
        // 遮罩
        this._mask = new egret.Shape();
        this._mask.graphics.beginFill(0x000000, 0.7);
        this._mask.graphics.drawRect(0, 0, stageW, stageH);
        this._mask.graphics.endFill();
        this.addChild(this._mask);
        // 好友排行榜按钮
        this._friendRankBtn = new eui.Button();
        this._friendRankBtn.label = "好友排行";
        this._friendRankBtn.y = 100;
        this._friendRankBtn.x = 30;
        this._friendRankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendRank, this);
        this.addChild(this._friendRankBtn);
        this._groupRanktBtn = new eui.Button();
        this._groupRanktBtn.label = "群排行";
        this._groupRanktBtn.y = this._friendRankBtn.y;
        this._groupRanktBtn.x = this._friendRankBtn.x + this._friendRankBtn.width + 20;
        this._groupRanktBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroup, this);
        this.addChild(this._groupRanktBtn);
        // 加载 好友排行榜资源
        platform.openDataContext.postMessage({
            command: 'loadRes'
        });
        // 处理遮罩，避免开放数据域事件影响主域。
        this._rankMask = new egret.Shape();
        this._rankMask.graphics.beginFill(0x000000, 0.5);
        this._rankMask.graphics.drawRect(0, 0, stageW, stageH);
        this._rankMask.graphics.endFill();
        this.addChild(this._rankMask);
        this._rankMask.touchEnabled = true;
        this._rankMask.visible = false;
        // 用户分数收集
        // let title: egret.TextField = new egret.TextField();
        // title.text = "请输入分数：";
        // title.x = 40;
        // title.y = 100;
        // title.textColor = 0xffffff;
        // title.stroke = 3;
        // title.strokeColor = 0x999999;
        // this.addChild(title);
        // 用户输入框
        // this.userNameInput = new egret.TextField();
        // this.userNameInput.type = egret.TextFieldType.INPUT;
        // this.userNameInput.width = 360;
        // this.userNameInput.height = 60;
        // this.userNameInput.border = true;
        // this.userNameInput.borderColor = 0x999999;
        // this.userNameInput.verticalAlign = egret.VerticalAlign.MIDDLE;
        // this.userNameInput.textAlign = egret.HorizontalAlign.CENTER;
        // this.userNameInput.x = title.x + title.width + 10;
        // this.userNameInput.y = title.y - 10;
        // this.userNameInput.text = '';
        // this.userNameInput.textColor = 0x000000;
        // this.addChild(this.userNameInput);
        // // 用户输入框 白色背景
        // let userNameInputBg = new egret.Shape;
        // userNameInputBg.graphics.beginFill(0xffffff, 1);
        // userNameInputBg.width = this.userNameInput.width;
        // userNameInputBg.height = this.userNameInput.height;
        // userNameInputBg.x = this.userNameInput.x;
        // userNameInputBg.y = this.userNameInput.y;
        // userNameInputBg.graphics.drawRect(0, 0, this.userNameInput.width, this.userNameInput.height);
        // userNameInputBg.graphics.endFill();
        // userNameInputBg.alpha = 0.8;
        // this.addChild(userNameInputBg);
        // this.setChildIndex(userNameInputBg, 3);
        // this.setChildIndex(this.userNameInput, 4);
        this.scrollerPanel = new ScrollerPanel();
        this.scrollerPanel.x = 10;
        this.scrollerPanel.y = 200;
        this.addChild(this.scrollerPanel);
        // 这块需要用到eui的可视化编辑功能，请下载代码示例查看
        // ListGroup是EXML文件，可以进行可视化编辑
        var listGroup = new components.ListGroup();
        listGroup.width = 400;
        listGroup.height = 500;
        listGroup.x = 30;
        listGroup.y = 400;
        this.addChild(listGroup);
    };
    /*
    private onClickRankBtn() {
        // const platform: any = window.platform;
        if (this.isdisplay) {
            console.log('点击 关闭 按钮');
            
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
            this.isdisplay = false;
            platform.openDataContext.postMessage({
                isDisplay: this.isdisplay,
                text: 'byebye',
                year: (new Date()).getFullYear(),
                command: "close"
            });

            this.removeChild(this.exitRankBtn);

        } else {
            console.log('点击 好友排行榜 按钮');
            // console.log(this.userNameInput.text);

            //处理遮罩，避免开放数据域事件影响主域。
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000, 1);
            this.rankingListMask.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
            this.rankingListMask.graphics.endFill();
            this.rankingListMask.alpha = 0.5;
            this.rankingListMask.touchEnabled = true;
            this.addChild(this.rankingListMask);
            
            //主要示例代码开始
            this.bitmap = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this.addChild(this.bitmap);

            //主域向子域发送自定义消息
            platform.openDataContext.postMessage({
                isDisplay: this.isdisplay,
                data: {
                    key:'',
                    name: this.userInfo.nickName,
                    url: this.userInfo.avatarUrl,
                    scroes: '11'
                },
                year: (new Date()).getFullYear(),
                command: "open"
            });
            //主要示例代码结束

            this.isdisplay = true;


            // 上传分数 不好用，先留着
            // let score = '11';
            // platform.setUserCloudStorage([{key:"score", value: score + ""}]);
            // 上传分数 不好用，先留着

            // 返回按钮
            this.addChild(this.exitRankBtn);
            
        }
    }
    */
    // 好友排行榜 点击onclick
    Main.prototype.friendRank = function () {
        this._rankMask.visible = true;
        platform.sendShareData({
            command: "open",
            type: "friend"
        });
        this._rankBit = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
        this._rankBit.touchEnabled = true;
        this._rankBit.pixelHitTest = true;
        this._rankMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMask, this);
        this.addChild(this._rankBit);
    };
    // 遮罩
    Main.prototype.onMask = function (e) {
        platform.sendShareData({
            command: "close"
        });
        this._mask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMask, this);
        this._rankMask.visible = false;
        this.removeChild(this._rankBit);
    };
    // 群排行榜 点击onclick
    Main.prototype.clickGroup = function () {
        var _this = this;
        var desc = "vae";
        var imgurl = "resource/assets/icon" + (1 + Math.floor(Math.random() * 4)) + ".jpg";
        return new Promise(function (resolve, reject) {
            platform.updateShareMenu(true).then(function (data) {
                console.log(data);
                if (data) {
                    return platform.shareApp("群主别踢,我就是看看谁的手速最快," + desc, imgurl, desc).then(function (data) {
                        if (data && data.shareTickets && data.shareTickets.length > 0) {
                            _this.groupRank(data.shareTickets[0]);
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    });
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    // 群排行榜
    Main.prototype.groupRank = function (shareTicket) {
        this._rankMask.visible = true;
        platform.sendShareData({
            command: "open",
            type: "group",
            groupid: shareTicket
        });
        this._rankBit = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
        this._rankBit.touchEnabled = true;
        this._rankBit.pixelHitTest = true;
        this.addChild(this._rankBit);
        this._rankMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMask, this);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.showAD = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.setUserCloudStorage = function (kvobj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.shareAppMessage = function (title, imgurl, query) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    DebugPlatform.prototype.sendShareData = function (kvobj) { };
    DebugPlatform.prototype.getLaunchOptionsSync = function () { };
    DebugPlatform.prototype.shareApp = function (title, imgurl, query) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    DebugPlatform.prototype.updateShareMenu = function (withticket) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
/**
 * 滑动列表
 * 使用虚拟布局、自定义项呈现器
 * 不需要初始化item只需要添加皮肤
 *
 */
var ScrollerPanel = (function (_super) {
    __extends(ScrollerPanel, _super);
    function ScrollerPanel() {
        var _this = _super.call(this) || this;
        //创建一个列表
        var myGroup2 = new eui.Group();
        _this.addChild(myGroup2);
        myGroup2.layout = new eui.BasicLayout();
        myGroup2.width = 500;
        myGroup2.height = 60;
        var btn1 = new eui.Button();
        btn1.label = "egret 按钮 1";
        var btn2 = new eui.Button();
        btn2.label = "egret 按钮 2";
        var btn3 = new eui.Button();
        btn3.label = "egret 按钮 3";
        var btn4 = new eui.Button();
        btn4.label = "egret 按钮 4";
        var btn5 = new eui.Button();
        btn5.label = "egret 按钮 5";
        var btn6 = new eui.Button();
        btn6.label = "egret 按钮 6";
        myGroup2.addChild(btn1);
        myGroup2.addChild(btn2);
        myGroup2.addChild(btn3);
        myGroup2.addChild(btn4);
        myGroup2.addChild(btn5);
        myGroup2.addChild(btn6);
        var hLayout = new eui.HorizontalLayout();
        hLayout.gap = 10;
        hLayout.paddingTop = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        myGroup2.layout = hLayout; /// 水平布局
        // var list = new eui.List();
        // list.dataProvider = new eui.ArrayCollection([1, 2, 3, 4, 5]);
        //创建一个 Scroller
        var scroller = new eui.Scroller();
        scroller.height = 60;
        scroller.viewport = myGroup2;
        _this.addChild(scroller);
        _this.scroller = scroller;
        _this.scroller.scrollPolicyH = eui.ScrollPolicy.ON; // 横向
        _this.scroller.scrollPolicyV = eui.ScrollPolicy.OFF; // 竖向
        // eui.TileLayout.orientation = eui.TileOrientation.ROWS;
        //创建一个按钮，点击后改变 Scroller 滚动的位置
        var btn = new eui.Button();
        btn.label = '点击向右';
        btn.x = 200;
        btn.y = 70;
        _this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.moveScroller, _this);
        return _this;
    }
    ScrollerPanel.prototype.createChildren = function () {
        //初始化后改变滚动的位置
        this.scroller.viewport.validateNow();
        this.scroller.viewport.scrollV = 40;
    };
    ScrollerPanel.prototype.moveScroller = function () {
        //点击按钮后改变滚动的位置
        var sc = this.scroller;
        sc.viewport.scrollH += 10;
        if ((sc.viewport.scrollH + sc.width) >= sc.viewport.contentWidth) {
            console.log("滚动到底部了");
        }
    };
    return ScrollerPanel;
}(eui.UILayer));
__reflect(ScrollerPanel.prototype, "ScrollerPanel");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
;window.Main = Main;