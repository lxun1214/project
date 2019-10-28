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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.data = [];
        _this.loadImg = ["newBg02.jpg", "jdt.png", "jdt1.png"];
        LoadingUI.ins = _this;
        var imageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, function (event) {
            _this.data.push(imageLoader.data);
            if (_this.loadImg.length > 0)
                imageLoader.load("resource/res/other/" + _this.loadImg.shift());
            else
                _this.createView();
        }, _this);
        imageLoader.load("resource/res/other/" + _this.loadImg.shift());
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        var d = new egret.Texture();
        d._setBitmapData(this.data[0]);
        this.addChild(new egret.Bitmap(d));
        d = new egret.Texture();
        d._setBitmapData(this.data[1]);
        var pbg = new egret.Bitmap(d);
        d = new egret.Texture();
        d._setBitmapData(this.data[2]);
        var p = new egret.Bitmap(d);
        this.p = p;
        this.r = new egret.Sprite();
        // this.r.graphics.beginFill(0x0,1);
        // this.r.graphics.drawRect(0,0,50,35);
        // this.r.graphics.endFill();
        p.mask = this.r;
        this.addChild(pbg);
        this.addChild(this.r);
        this.addChild(p);
        var textField = new egret.TextField();
        this.addChild(textField);
        textField.text = "努力加载中...";
        textField.textColor = 0xF40913;
        textField.width = 750;
        textField.height = 100;
        textField.bold = true;
        textField.size = 30;
        textField.fontFamily = "KaiTi";
        textField.textAlign = "center";
        this.addChild(textField);
        this.r.y = p.y = pbg.y = 1167;
        this.r.x = p.x = pbg.x = 64;
        textField.y = 1216;
        this.x = (GlobalVo.GAME_W - 750) / 2;
        this.y = (GlobalVo.GAME_H - 1334) / 2;
        this.dispatchEventWith(LoadingUI.LOAD_UI_CREATE);
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        egret.log(current, total);
        this.r.graphics.clear();
        this.r.graphics.beginFill(0x0, 1);
        this.r.graphics.drawRect(0, 0, 6 + (this.p.width - 6) * current / total, this.p.height);
        this.r.graphics.endFill();
    };
    LoadingUI.LOAD_UI_CREATE = "LOAD_UI_CREATE";
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map