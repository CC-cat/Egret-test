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

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

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

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        var stageW =this.stage.stageWidth;
        var stageH = this.stage.stageHeight;

        // bg
        let bg = this.createBitmapByName("pic_1_jpg");
        bg.width = stageW;
        bg.height = stageH;
        this.addChild(bg);

        // nameBg
        let nameBg = this.createBitmapByName("name_bg_png");
        nameBg.width = stageW - 140;
        nameBg.height = 130;
        nameBg.anchorOffsetX = nameBg.width / 2;
        nameBg.x = stageW * .5;
        nameBg.y = stageH * .6;
        this.addChild(nameBg);

        // title
        var title:egret.TextField = new egret.TextField();
        title.text = "打老板"; 
        title.size = 32; 
        title.x = 20; 
        title.y = 60; 
        title.textColor = 0x000000;
        title.width = stageW - 40;
        this.addChild( title );

        // boxName
        let input:egret.TextField = new egret.TextField();
        input.text = "请在此输入...";
        input.width = stageW / 2 - 90;
        input.height = 80;
        input.x = stageW / 2 + 8;
        input.y = stageH * .64;
        input.textAlign = egret.HorizontalAlign.CENTER;
        input.border = true;
        input.borderColor = 0x999999;
        input.textColor = 0x000000;
        this.addChild(input);
        input.verticalAlign = egret.VerticalAlign.MIDDLE;
        input.type = egret.TextFieldType.INPUT;

        // 角色 男
        let roleMan = this.createBitmapByName("role_man_png");
        roleMan.width = stageW - 200;
        roleMan.height = stageH / 2.5;
        roleMan.anchorOffsetX = roleMan.width / 2;
        roleMan.anchorOffsetY = roleMan.height / 1.4;
        roleMan.x = stageW * .5;
        roleMan.y = stageH * .5;
        this.addChild( roleMan );

        

         // 开始游戏 btn
        let startGameBtn = this.createBitmapByName("btn_start_game_png");
        startGameBtn.width = stageW - 380;
        startGameBtn.height = 120;
        startGameBtn.anchorOffsetX = startGameBtn.width / 2;
        startGameBtn.x = stageW * .5;
        startGameBtn.y = stageH * .75;
        this.addChild( startGameBtn );

        // 群排行 btn
        let leftBtn = this.createBitmapByName("btn_1_png");
        leftBtn.x = 40;
        leftBtn.y = stageH - leftBtn.height - 40;
        this.addChild( leftBtn );

        // 排行榜 btn
        let centerBtn = this.createBitmapByName("btn_2_png");
        centerBtn.x = stageW / 2 - centerBtn.width / 2;
        centerBtn.y = stageH - centerBtn.height - 40;
        this.addChild( centerBtn );

        // 分享 btn
        let rightBtn = this.createBitmapByName("btn_3_png");
        rightBtn.x = stageW - rightBtn.width - 40;
        rightBtn.y = stageH - rightBtn.height - 40;
        this.addChild( rightBtn );

        /*** 以下代码是 【群排行、排行榜、分享】 按钮的添加监听事件 ***/
        /* 
            群排行 
        */
        leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.setChildIndex(leftBtn, this.numChildren - 1);
        }, this ); 

        /*** 按钮监听事件结束 end ***/


    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

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
}