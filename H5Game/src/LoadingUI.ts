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

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {
    static LOAD_UI_CREATE:string = "LOAD_UI_CREATE";

    public static ins:LoadingUI;

    public constructor() {
        super();

        LoadingUI.ins = this;

        var imageLoader:egret.ImageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE,(event:egret.Event)=>{
                this.data.push(imageLoader.data);
                if(this.loadImg.length > 0)
                    imageLoader.load("resource/res/other/" + this.loadImg.shift());
                else
                    this.createView();
        },this);
        imageLoader.load("resource/res/other/" + this.loadImg.shift());
    }

    data:Array<any> = [];
    loadImg:Array<string> =["newBg02.jpg","jdt.png","jdt1.png"];
    r:egret.Sprite;
    private p:egret.Bitmap;
    private createView(): void {
        var d = new egret.Texture();
        d._setBitmapData(this.data[0]);
        this.addChild(new egret.Bitmap(d));
        d = new egret.Texture();
        d._setBitmapData(this.data[1]);
        var pbg:egret.Bitmap = new egret.Bitmap(d);
        d = new egret.Texture();
        d._setBitmapData(this.data[2]);
        var p:egret.Bitmap = new egret.Bitmap(d);
        this.p = p;
        
        this.r = new egret.Sprite();
        // this.r.graphics.beginFill(0x0,1);
        // this.r.graphics.drawRect(0,0,50,35);
        // this.r.graphics.endFill();
        p.mask = this.r;
        this.addChild(pbg);
        this.addChild(this.r);
        this.addChild(p);

        var textField:egret.TextField = new egret.TextField()
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

        this.x = (GlobalVo.GAME_W - 750)/2;
        this.y = (GlobalVo.GAME_H - 1334)/2;

        this.dispatchEventWith(LoadingUI.LOAD_UI_CREATE);
    }

    public onProgress(current: number, total: number): void {
        egret.log(current,total);
         this.r.graphics.clear();
        this.r.graphics.beginFill(0x0,1);
        this.r.graphics.drawRect(0,0,6+(this.p.width-6)*current/total,this.p.height);
        this.r.graphics.endFill();
    }
}
