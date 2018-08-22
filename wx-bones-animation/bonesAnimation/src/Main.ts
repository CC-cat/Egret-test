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

class Main extends eui.UILayer {

    private bitmap: egret.Bitmap;
    private isdisplay = false;
    private rankBtn: eui.Button;
    private exitRankBtn: eui.Button;
    private rankingListMask: egret.Shape;
    private userNameInput: egret.TextField;
    private userInfo;

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        this.userInfo = userInfo;
        console.log(this.userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }
        /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        // let parser = new egret.HtmlTextParser();

        // let textflowArr = result.map(text => parser.parse(text));
        // let textfield = this.textfield;
        // let count = -1;
        // let change = () => {
        //     count++;
        //     if (count >= textflowArr.length) {
        //         count = 0;
        //     }
        //     let textFlow = textflowArr[count];

        //     // 切换描述内容
        //     // Switch to described content
        //     textfield.textFlow = textFlow;
        //     let tw = egret.Tween.get(textfield);
        //     tw.to({ "alpha": 1 }, 200);
        //     tw.wait(2000);
        //     tw.to({ "alpha": 0 }, 200);
        //     tw.call(change, this);
        // };

        // change();
    }
    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        // 好友排行榜按钮
        this.rankBtn = new eui.Button();
        this.rankBtn.label = "排行";
        this.rankBtn.x = stageW / 2;
        this.rankBtn.y = stageH / 2;
        this.addChild(this.rankBtn);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRankBtn, this);
        // 加载 好友排行榜资源
        const platform: any = window.platform;
        platform.openDataContext.postMessage({
            command: 'loadRes'
        });

        // 好友排行榜 返回按钮
        this.exitRankBtn = new eui.Button();
        this.exitRankBtn.label = "返回";
        this.exitRankBtn.x = stageW / 4;
        this.exitRankBtn.y = stageH - 100;
        this.exitRankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
             this.isdisplay = true;
             this.onClickRankBtn();
        }, this);

        // 用户分数收集
        let title: egret.TextField = new egret.TextField();
        title.text = "请输入分数：";
        title.x = 40;
        title.y = 200;
        title.textColor = 0xffffff;
        title.stroke = 3;
        title.strokeColor = 0x999999;
        this.addChild(title);

        // 用户输入框
        this.userNameInput = new egret.TextField();
        this.userNameInput.type = egret.TextFieldType.INPUT;
        this.userNameInput.width = 360;
        this.userNameInput.height = 60;
        this.userNameInput.border = true;
        this.userNameInput.borderColor = 0x999999;
        this.userNameInput.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.userNameInput.textAlign = egret.HorizontalAlign.CENTER;
        this.userNameInput.x = title.x + title.width + 10;
        this.userNameInput.y = title.y - 10;
        this.userNameInput.text = '';
        this.userNameInput.textColor = 0x000000;
        this.addChild(this.userNameInput);

        // 用户输入框 白色背景
        let userNameInputBg = new egret.Shape;
        userNameInputBg.graphics.beginFill(0xffffff, 1);
        userNameInputBg.width = this.userNameInput.width;
        userNameInputBg.height = this.userNameInput.height;
        userNameInputBg.x = this.userNameInput.x;
        userNameInputBg.y = this.userNameInput.y;
        userNameInputBg.graphics.drawRect(0, 0, this.userNameInput.width, this.userNameInput.height);
        userNameInputBg.graphics.endFill();
        userNameInputBg.alpha = 0.8;
        this.addChild(userNameInputBg);

        this.setChildIndex(userNameInputBg, 1);
        this.setChildIndex(this.userNameInput, 2);

    }

    private onClickRankBtn() {
        let platform: any = window.platform;
        if (this.isdisplay) {
            console.log('点击 返回 按钮');
            
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
            console.log(this.userNameInput.text);


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
                text: this.userNameInput.text,
                data: {
                    key:'',
                    name: this.userInfo.nickName,
                    url: this.userInfo.avatarUrl,
                    scroes: this.userNameInput.text
                },
                year: (new Date()).getFullYear(),
                command: "open"
            });
            //主要示例代码结束  

            this.isdisplay = true;


            // 上传分数 不好用，先留着
            let score = this.userNameInput.text;
            platform.setUserCloudStorage([{key:"score", value: score + ""}]);
            // 上传分数 不好用，先留着

            // 返回按钮
            this.addChild(this.exitRankBtn);
            
        }
    }

}
