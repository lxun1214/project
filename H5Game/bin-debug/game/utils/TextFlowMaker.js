var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TextFlowMaker = (function () {
    function TextFlowMaker() {
    }
    /**
     * "文字|S:18&C:0x444444&T:带颜色字号"
     */
    TextFlowMaker.generateTextFlow = function (sourceText) {
        if (sourceText === void 0) { sourceText = ""; }
        var textArr = sourceText.split("|");
        var str = "";
        for (var i = 0, len = textArr.length; i < len; i++) {
            str += this.getSingleTextFlow(textArr[i]);
        }
        return new egret.HtmlTextParser().parser(str);
    };
    TextFlowMaker.getSingleTextFlow = function (text) {
        if (text === void 0) { text = ""; }
        var arrText = text.split("&T:", 2);
        if (arrText.length == 2) {
            var str = "<font";
            var textArr = arrText[0].split("&");
            var tempArr = void 0;
            var t = void 0;
            var underline = false;
            for (var i = 0, len = textArr.length; i < len; i++) {
                tempArr = textArr[i].split(":");
                switch (tempArr[0]) {
                    case this.STYLE_COLOR:
                        str += " color=\"" + parseInt(tempArr[1]) + "\"";
                        break;
                    case this.STYLE_SIZE:
                        str += " size=\"" + parseInt(tempArr[1]) + "\"";
                        break;
                    case this.UNDER_LINE:
                        underline = true;
                        break;
                }
            }
            if (underline) {
                str += "><u>" + arrText[1] + "</u></font>";
            }
            else {
                str += ">" + arrText[1] + "</font>";
            }
            return str;
        }
        else {
            return "<font>" + text + "</font>";
        }
    };
    TextFlowMaker.STYLE_COLOR = "C";
    TextFlowMaker.STYLE_SIZE = "S";
    TextFlowMaker.UNDER_LINE = "U";
    return TextFlowMaker;
}());
__reflect(TextFlowMaker.prototype, "TextFlowMaker");
//# sourceMappingURL=TextFlowMaker.js.map