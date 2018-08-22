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
    private rankingListMask: egret.Shape;

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
        console.log(userInfo);
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
        //打开关闭排行榜按钮
        this.rankBtn = new eui.Button();
        this.rankBtn.label = "排行";
        this.rankBtn.x = 260;
        this.rankBtn.y = 750;
        this.addChild(this.rankBtn);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRankBtn, this);
        //加载资源
        const platform: any = window.platform;
        platform.openDataContext.postMessage({
            command: 'loadRes'
        });

    }

    private onClickRankBtn() {
        console.log('点击btnClose按钮');
        let platform: any = window.platform;
        if (this.isdisplay) {
            this.bitmap.parent && this.bitmap.parent.removeChild(this.bitmap);
            this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
            this.isdisplay = false;
            platform.openDataContext.postMessage({
                isDisplay: this.isdisplay,
                text: 'hello',
                year: (new Date()).getFullYear(),
                command: "close"
            });
        } else {
            //处理遮罩，避免开放数据域事件影响主域。
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000, 1);
            this.rankingListMask.graphics.drawRect(0, 0, this.stage.width, this.stage.height);
            this.rankingListMask.graphics.endFill();
            this.rankingListMask.alpha = 0.5;
            this.rankingListMask.touchEnabled = true;
            this.addChild(this.rankingListMask);

            //简单实现，打开这关闭使用一个按钮。
            this.addChild(this.rankBtn);
            //主要示例代码开始
            this.bitmap = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this.addChild(this.bitmap);
            //主域向子域发送自定义消息
            platform.openDataContext.postMessage({
                isDisplay: this.isdisplay,
                text: 'hello',
                year: (new Date()).getFullYear(),
                command: "open"
            });
            //主要示例代码结束            
            this.isdisplay = true;
        }
    }

}

// class Main extends eui.UILayer {


//     protected createChildren(): void {
//         super.createChildren();

//         egret.lifecycle.addLifecycleListener((context) => {
//             // custom lifecycle plugin
//         })

//         egret.lifecycle.onPause = () => {
//             egret.ticker.pause();
//         }

//         egret.lifecycle.onResume = () => {
//             egret.ticker.resume();
//         }

//         //inject the custom material parser
//         //注入自定义的素材解析器
//         let assetAdapter = new AssetAdapter();
//         egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
//         egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


//         this.runGame().catch(e => {
//             console.log(e);
//         })
//     }

//     private async runGame() {
//         await this.loadResource()
//         this.createTestScene();
//         const result = await RES.getResAsync("description_json")
//         // this.startAnimation(result);
//         await platform.login();
//         const userInfo = await platform.getUserInfo();
//         console.log(userInfo);

//     }

//     private async loadResource() {
//         try {
//             const loadingView = new LoadingUI();
//             this.stage.addChild(loadingView);
//             await RES.loadConfig("resource/default.res.json", "resource/");
//             await this.loadTheme();
//             await RES.loadGroup("preload", 0, loadingView);
//             this.stage.removeChild(loadingView);
//         }
//         catch (e) {
//             console.error(e);
//         }
//     }

//     private loadTheme() {
//         return new Promise((resolve, reject) => {
//             // load skin theme configuration file, you can manually modify the file. And replace the default skin.
//             //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
//             let theme = new eui.Theme("resource/default.thm.json", this.stage);
//             theme.addEventListener(eui.UIEvent.COMPLETE, () => {
//                 resolve();
//             }, this);

//         })
//     }

//     private textfield: egret.TextField;
//     /**
//      * 创建场景界面
//      * Create scene interface
//      */
//     protected async createTestScene() {
//         let sky = this.createBitmapByName("bg_jpg");
//         this.addChild(sky);
//         let stageW = this.stage.stageWidth;
//         let stageH = this.stage.stageHeight;
//         sky.width = stageW;
//         sky.height = stageH;

//         let topMask = new egret.Shape();
//         topMask.graphics.beginFill(0x000000, 0.5);
//         topMask.graphics.drawRect(0, 0, stageW, stageH);
//         topMask.graphics.endFill();
//         this.addChild(topMask);

//         /* 
//             调取 微信排行榜接口
//         */

//         // 添加到舞台  // 创建bitmap
//         this.$parent.addChild(platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight))

//         // 向子域发送加载资源的消息
//         await platform.openDataContext.postMessage({
//             title: 'Title',
//             text: 'Hello',
//             time: (new Date()).getFullYear() + 1,
//             command: 'loadRes'
//         })

//         // 向子域发送 “打开排行榜” 的消息
//         await platform.openDataContext.postMessage({
//             time: (new Date()).getFullYear() + 2,
//             command: 'open'
//         })

//     }

    

//     protected createGameScene(): void {
//         let sky = this.createBitmapByName("bg_jpg");
//         this.addChild(sky);
//         let stageW = this.stage.stageWidth;
//         let stageH = this.stage.stageHeight;
//         sky.width = stageW;
//         sky.height = stageH;

//         let topMask = new egret.Shape();
//         topMask.graphics.beginFill(0x000000, 0.5);
//         topMask.graphics.drawRect(0, 0, stageW, stageH);
//         topMask.graphics.endFill();
//         this.addChild(topMask);

//         /*
//             骨骼动画
//         */

//         // 实例化DragonBones所需要的数据
//         var dragonbonesData = RES.getRes("Robot_json");
//         var textureData = RES.getRes("texture_json");
//         var texture = RES.getRes("texture_png");

//         // 设置动画中绑定的贴图
//         let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
//         egretFactory.parseDragonBonesData(dragonbonesData);
//         egretFactory.parseTextureAtlasData(textureData, texture);

//         // 1
//         let armatureDisplay: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay("robot");
//         this.addChild(armatureDisplay);
//         armatureDisplay.x = 150;
//         armatureDisplay.y = 300;
//         armatureDisplay.scaleX = 0.5;
//         armatureDisplay.scaleY = 0.5;
//         // armatureDisplay.animation.play("Walk");


//         // 2
//         let egretFactoryB: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
//         egretFactoryB.parseDragonBonesData(dragonbonesData);
//         egretFactoryB.parseTextureAtlasData(textureData, texture);

//         let armatureDisplayB: dragonBones.EgretArmatureDisplay = egretFactoryB.buildArmatureDisplay("robot");
//         this.addChild(armatureDisplayB);
//         armatureDisplayB.x = 480;
//         armatureDisplayB.y = 300;
//         armatureDisplayB.scaleX = 0.5;
//         armatureDisplayB.scaleY = 0.5;
//         // armatureDisplayB.animation.play("Standby");

//         armatureDisplay.animation.fadeIn("Walk", 0.2, 0, 0, "NORMAL_ANIMATION_GROUP");
//         // armatureDisplayB.animation.fadeIn("Run", 0.2, 0, 0, "NORMAL_ANIMATION_GROUP");

//         let animationState = armatureDisplayB.animation.fadeIn("Run", 0.2, 0, 0, "NORMAL_ANIMATION_GROUP");
//         animationState.addBoneMask("body_u");


//         // Event listener.
//         function animationEventHandler(event: dragonBones.EgretEvent): void {
//             let eventObject = event.eventObject;

//             console.log(eventObject.animationState.name, event.type, eventObject.name ? eventObject.name : "");
//         }

//         // Add animation event listener.
//         armatureDisplay.addEventListener(dragonBones.EventObject.START, animationEventHandler, this);
//         armatureDisplay.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, animationEventHandler, this);
//         armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, animationEventHandler, this);
//         armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN, animationEventHandler, this);
//         armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, animationEventHandler, this);
//         armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT, animationEventHandler, this);
//         armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, animationEventHandler, this);

//         // Add animation custom event listener.
//         armatureDisplay.addEventListener(dragonBones.EventObject.FRAME_EVENT, animationEventHandler, this);
//         // Add animation sound event listener.
//         // factory.soundEventManager.addEventListener(dragonBones.EventObject.SOUND_EVENT, animationEventHandler, this);
//     }
//     /**
//      * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
//      * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
//      */
//     private createBitmapByName(name: string): egret.Bitmap {
//         let result = new egret.Bitmap();
//         let texture: egret.Texture = RES.getRes(name);
//         result.texture = texture;
//         return result;
//     }
//     /**
//      * 描述文件加载成功，开始播放动画
//      * Description file loading is successful, start to play the animation
//      */
//     private startAnimation(result: Array<any>): void {
//         let parser = new egret.HtmlTextParser();

//         let textflowArr = result.map(text => parser.parse(text));
//         let textfield = this.textfield;
//         let count = -1;
//         let change = () => {
//             count++;
//             if (count >= textflowArr.length) {
//                 count = 0;
//             }
//             let textFlow = textflowArr[count];

//             // 切换描述内容
//             // Switch to described content
//             textfield.textFlow = textFlow;
//             let tw = egret.Tween.get(textfield);
//             tw.to({ "alpha": 1 }, 200);
//             tw.wait(2000);
//             tw.to({ "alpha": 0 }, 200);
//             tw.call(change, this);
//         };

//         change();
//     }

//     /**
//      * 点击按钮
//      * Click the button
//      */
//     private onButtonClick(e: egret.TouchEvent) {
//         let panel = new eui.Panel();
//         panel.title = "Title";
//         panel.horizontalCenter = 0;
//         panel.verticalCenter = 0;
//         this.addChild(panel);
//     }
// }
