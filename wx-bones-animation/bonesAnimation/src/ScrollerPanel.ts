
/** 
 * 滑动列表
 * 使用虚拟布局、自定义项呈现器
 * 不需要初始化item只需要添加皮肤
 * 
 */
class ScrollerPanel extends eui.UILayer {
    public scroller: eui.Scroller;

    constructor() {
        super();
        //创建一个列表
        var myGroup2 = new eui.Group();
        this.addChild( myGroup2 );

        myGroup2.layout = new eui.BasicLayout();
        myGroup2.width = 500;
        myGroup2.height = 60;

        var btn1:eui.Button = new eui.Button();
        btn1.label = "egret 按钮 1";
        var btn2:eui.Button = new eui.Button();
        btn2.label = "egret 按钮 2";
        var btn3:eui.Button = new eui.Button();
        btn3.label = "egret 按钮 3";
        var btn4:eui.Button = new eui.Button();
        btn4.label = "egret 按钮 4";
        var btn5:eui.Button = new eui.Button();
        btn5.label = "egret 按钮 5";
        var btn6:eui.Button = new eui.Button();
        btn6.label = "egret 按钮 6";
        myGroup2.addChild( btn1 );
        myGroup2.addChild( btn2 );
        myGroup2.addChild( btn3 );
        myGroup2.addChild( btn4 );
        myGroup2.addChild( btn5 );
        myGroup2.addChild( btn6 );

        var hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.gap = 10;
        hLayout.paddingTop = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        myGroup2.layout = hLayout;   /// 水平布局

        // var list = new eui.List();
        // list.dataProvider = new eui.ArrayCollection([1, 2, 3, 4, 5]);

        //创建一个 Scroller
        var scroller = new eui.Scroller();
        scroller.height = 60;
        scroller.viewport = myGroup2;
        this.addChild(scroller);
        this.scroller = scroller;
        this.scroller.scrollPolicyH = eui.ScrollPolicy.ON; // 横向
        this.scroller.scrollPolicyV = eui.ScrollPolicy.OFF; // 竖向
        // eui.TileLayout.orientation = eui.TileOrientation.ROWS;
        //创建一个按钮，点击后改变 Scroller 滚动的位置
        var btn = new eui.Button();
        btn.label = '点击向右';
        btn.x = 200;
        btn.y = 70;
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.moveScroller,this);
    }
    public createChildren() {
        //初始化后改变滚动的位置
        this.scroller.viewport.validateNow();
        this.scroller.viewport.scrollV = 40;
    }
    public moveScroller():void{
        //点击按钮后改变滚动的位置
        var sc = this.scroller;
        sc.viewport.scrollH += 10;
        if ((sc.viewport.scrollH + sc.width) >= sc.viewport.contentWidth) {
          console.log("滚动到底部了");
        }
    }
}