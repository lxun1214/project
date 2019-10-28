var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var ASPathNode = (function () {
    function ASPathNode(x, y, dir) {
        this.nX = x;
        this.nY = y;
        this.nDir = dir;
    }
    return ASPathNode;
}());
__reflect(ASPathNode.prototype, "ASPathNode");
//# sourceMappingURL=ASPathNode.js.map