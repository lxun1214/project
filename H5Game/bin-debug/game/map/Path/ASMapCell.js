var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var ASMapCell = (function () {
    function ASMapCell() {
        this.X = 0; //格子的X坐标
        this.Y = 0; //格子的Y坐标
        this.CanNotMove = false; //是否不可移动
        this.MarkTag = 0; //用于优化寻路算法效率，免去循环初始化所有节点的开销
        /**
        * 寻路计算过程中的相关参数
        */
        this.LastX = -1; //上一个格子的X坐标
        this.LastY = -1; //下一个格子的Y坐标
        this.HCost = 0;
        this.GCost = 0;
        this.FValue = 0; //距离目标格子的估价值
        this.State = 0; //状态，表示空闲、开启或关闭
        this.btDir = 0;
    }
    /**
 * 格子状态值定义
 *
 */
    ASMapCell.CSNONE = 0; //未处理的格子
    ASMapCell.CSOPEN = 1; //格子已经开启
    ASMapCell.CSCLOSE = 2; //格子已经关闭
    return ASMapCell;
}());
__reflect(ASMapCell.prototype, "ASMapCell");
//# sourceMappingURL=ASMapCell.js.map