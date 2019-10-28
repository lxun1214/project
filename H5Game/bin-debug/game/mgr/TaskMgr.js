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
var TaskMgr = (function (_super) {
    __extends(TaskMgr, _super);
    function TaskMgr() {
        var _this = _super.call(this) || this;
        _this.typeTask = [];
        var obj = ConfigMgr.gameConfig["task"];
        for (var key in obj) {
            if (!_this.typeTask[obj[key].taskType])
                _this.typeTask[obj[key].taskType] = [];
            _this.typeTask[obj[key].taskType].push(obj[key]);
        }
        return _this;
    }
    TaskMgr.ins = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.ins.call(this, args);
    };
    TaskMgr.prototype.upTask = function (d) {
        var obj = ConfigMgr.gameConfig["task"];
        var o;
        var has = false;
        var newVo;
        for (var j = 0; j < d.length; j++) {
            var type = obj[d[j].taskId].taskType;
            o = UserVo.ins.getTaskInfo(type);
            for (var i = 0; i < o.length; i++) {
                if (o[i].taskId == d[j].taskId) {
                    has = true;
                    o[i].completeNum = d[j].completeNum;
                }
            }
            if (!has) {
                newVo = {};
                newVo.taskId = d[j].taskId;
                newVo.isReceive = false;
                newVo.completeNum = d[j].completeNum;
                o.push(newVo);
            }
        }
        //  UserVo.ins.playerTaskInfos.threadTaskInfos = o;
        RemindMgr.ins().checkTask(0);
        // DataEventDispatcher.dispatchEventWith(GameEvent.UP_TASK,type);
    };
    TaskMgr.prototype.finishTask = function (d) {
        if (d.code == 0) {
            var obj = ConfigMgr.gameConfig["task"];
            var type = obj[d.taskId].taskType;
            var o = UserVo.ins.getTaskInfo(type);
            for (var i = 0; i < o.length; i++) {
                if (o[i].taskId == d.taskId) {
                    o[i].isReceive = true;
                    break;
                }
            }
            RemindMgr.ins().checkTask(0);
            // DataEventDispatcher.dispatchEventWith(GameEvent.UP_TASK,type);
        }
        else {
            // var o:any = ConfigMgr.gameConfig["error"][d.code];
            // var s:string = o?o.msg:d.code + "";
            // UserTips.ins().showTips(s);
        }
    };
    return TaskMgr;
}(BaseClass));
__reflect(TaskMgr.prototype, "TaskMgr");
//# sourceMappingURL=TaskMgr.js.map