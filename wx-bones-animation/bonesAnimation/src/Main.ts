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
    // private exitRankBtn: eui.Button;
    // private rankingListMask: egret.Shape;
    private userNameInput: egret.TextField;
    private userInfo;
    private scrollerPanel: ScrollerPanel;

    // 好友排行
    private _friendRankBtn: eui.Button;
    private _rankMask: egret.Shape;
    private _rankBit: egret.Bitmap;
    private _mask: egret.Shape;

    // 群排行
    private _groupRanktBtn: eui.Button;



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
        const platform: any = window.platform;

        await this.loadResource()
        this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        this.userInfo = userInfo;
        console.log(this.userInfo);

        platform.sendShareData({ 
            command: "load" 
        });

        
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

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;

        let sky = this.createBitmapByName("bg_jpg");
        sky.width = stageW;
        sky.height = stageH;
        this.addChild(sky);

        // 遮罩
        this._mask=new egret.Shape();
		this._mask.graphics.beginFill(0x000000,0.7);
		this._mask.graphics.drawRect(0,0, stageW, stageH);
		this._mask.graphics.endFill();
		this.addChild(this._mask);

        // 好友排行榜按钮
        this._friendRankBtn=new eui.Button();
        this._friendRankBtn.label = "好友排行";
		this._friendRankBtn.y= 100;
		this._friendRankBtn.x= 30;
		this._friendRankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.friendRank,this);
		this.addChild(this._friendRankBtn);

        this._groupRanktBtn=new eui.Button();
        this._groupRanktBtn.label = "群排行";
		this._groupRanktBtn.y=this._friendRankBtn.y;
		this._groupRanktBtn.x= this._friendRankBtn.x + this._friendRankBtn.width + 20;
        this._groupRanktBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickGroup,this);
		this.addChild(this._groupRanktBtn);

        // 加载 好友排行榜资源
        platform.openDataContext.postMessage({
            command: 'loadRes'
        });

        // 处理遮罩，避免开放数据域事件影响主域。
        this._rankMask=new egret.Shape();
		this._rankMask.graphics.beginFill(0x000000,0.5);
		this._rankMask.graphics.drawRect(0,0,stageW,stageH);
		this._rankMask.graphics.endFill();
		this.addChild(this._rankMask);
		this._rankMask.touchEnabled=true;
		this._rankMask.visible=false;

      
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


    }

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
    private friendRank():void
	{
		this._rankMask.visible=true;

		platform.sendShareData({
            command:"open",
            type:"friend"
        });

		this._rankBit = platform.openDataContext.createDisplayObject(null,this.stage.stageWidth, this.stage.stageHeight);
		this._rankBit.touchEnabled=true;
		this._rankBit.pixelHitTest=true;
		this._rankMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMask,this);
		this.addChild(this._rankBit);
	}

    // 遮罩
    private onMask(e:egret.TouchEvent):void
	{
		platform.sendShareData({
            command:"close"
        });

		this._mask.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onMask,this);
		this._rankMask.visible=false;
		this.removeChild(this._rankBit);
	}

    // 群排行榜 点击onclick
    private clickGroup()
	{
		var desc:string="vae"
		var imgurl:string="resource/assets/icon"+(1+Math.floor(Math.random()*4))+".jpg";

		return new Promise((resolve, reject) => {
            platform.updateShareMenu(true).then(data => {
                    console.log(data);
                    if (data) {
                        return platform.shareApp("群主别踢,我就是看看谁的手速最快,"+desc,imgurl,desc).then(data => {
                            if (data && data.shareTickets && data.shareTickets.length > 0) {
                                this.groupRank(data.shareTickets[0]);
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        });
                    } else {
                        resolve(false);
                    }
                })
            });
	}
    
    // 群排行榜
    private groupRank(shareTicket):void
	{
		this._rankMask.visible=true;

		platform.sendShareData({
            command:"open",
            type:"group",
            groupid:shareTicket
        });

		this._rankBit = platform.openDataContext.createDisplayObject(null,this.stage.stageWidth, this.stage.stageHeight);
		this._rankBit.touchEnabled=true;
		this._rankBit.pixelHitTest=true;
		this.addChild(this._rankBit);
		this._rankMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMask,this);
	}

}
