var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TaskWin = (function (_super) {
    __extends(TaskWin, _super);
    // bb0:eui.Button;
    // bb1:eui.Button;
    // bb2:eui.Label;
    // static COUNT:number = 5;
    function TaskWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "TaskSkin";
        _this.dg0.itemRenderer = TaskRender;
        _this.dg1.itemRenderer = TaskRender;
        _this.vs.selectedIndex = 0;
        _this.btn1.selected = true;
        _this.btn2.selected = false;
        return _this;
        // this.total = Math.ceil(RemindMgr.taskArr[1].length/TaskWin.COUNT);
    }
    // dx:number = 1;
    // total:number;
    TaskWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this);
        // this.dg.dataProvider = new eui.ArrayCollection(TaskMgr.ins().typeTask[1]);
        this.addTouchEvent(this.btn1, this.tapCall);
        this.addTouchEvent(this.btn2, this.tapCall);
        // this.addTouchEvent(this.bb0,this.tapCall);
        // this.addTouchEvent(this.bb1,this.tapCall);
        this.addEvent(GameEvent.RED_MAIN_TASK, DataEventDispatcher.dispatcher, this.updata);
        this.addEvent(GameEvent.RED_DAY_TASK, DataEventDispatcher.dispatcher, this.updata);
        this.updata();
        // this.dx = 1;
        // this.bb2.text = this.dx + "/" + this.total ;
        UIDmgr.bindingUID(this, uid.rwParent);
    };
    TaskWin.prototype.updata = function (t) {
        if (t === void 0) { t = null; }
        // this.upMainTask();
        this.dg0.dataProvider = new eui.ArrayCollection(RemindMgr.taskArr[1]);
        this.dg1.dataProvider = new eui.ArrayCollection(RemindMgr.taskArr[2]);
        ViewManager.redToTarge(this.btn1, RemindMgr.taskGetSatus[1] == true);
        ViewManager.redToTarge(this.btn2, RemindMgr.taskGetSatus[2] == true);
    };
    // private upMainTask():void
    // {
    // var sdx:number = (this.dx - 1)*TaskWin.COUNT;
    // var c:Array<any> = [];
    // for(var i:number = sdx;i<sdx + TaskWin.COUNT;i++)
    // {
    // 	c.push(RemindMgr.taskArr[1][i]);
    // }
    // 	this.dg0.dataProvider = new eui.ArrayCollection(c);
    // }
    TaskWin.prototype.tapCall = function (e) {
        switch (e.currentTarget) {
            // case this.bb0:
            // 	if(this.dx == 1)
            // 		return;
            // 	this.dx --;
            // 	this.bb2.text = this.dx + "/" + this.total;
            // 	this.upMainTask();
            // 	break;
            // case this.bb1:
            // 	if(this.dx >= this.total)
            // 		return;
            // 	this.dx ++;
            // 	this.bb2.text = this.dx + "/" + this.total;
            // 	this.upMainTask();
            // 	break;
            case this.btn1:
                this.vs.selectedIndex = 0;
                this.btn1.selected = true;
                this.btn2.selected = false;
                break;
            default:
                this.vs.selectedIndex = 1;
                this.btn2.selected = true;
                this.btn1.selected = false;
                break;
        }
    };
    return TaskWin;
}(BaseEuiView));
__reflect(TaskWin.prototype, "TaskWin");
ViewManager.ins().reg(TaskWin, LayerManager.UI_MainUI);
//# sourceMappingURL=TaskWin.js.map