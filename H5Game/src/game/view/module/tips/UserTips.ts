class UserTips extends BaseClass{
	public constructor() {
		super();
	}
	public static ins(): UserTips{
		return super.ins() as UserTips;
	}
	// public showTips(str: string =""): void{
	// 	// let view : TipsView = ViewManager.ins().open(TipsView) as TipsView;
	// 	// DelayOptManager.ins().addDelayOptFunction(view,view.showTips,str); 
	// 	this.showTipsBigToSmall();
	// }

	public showitemTips(str: string =""): void{
		let view : ItemTips = ViewManager.ins().open(ItemTips) as TipsView;
		DelayOptManager.ins().addDelayOptFunction(view,view.showTips,str); 
	}

	public showTipsDownToUp(str:string = "",isWarning:boolean = false):void{
        var effectTips:egret.TextField = ObjectPool.pop("egret.TextField");

        effectTips.size = 24;
        effectTips.y = GlobalVo.GAME_H/2;
        if(isWarning){
            effectTips.textColor = ColorUtlis.COLOR_RED;
        }else{
            effectTips.textColor = ColorUtlis.COLOR_GREEN;
        }
        effectTips.alpha = 0;
        effectTips.width = 500;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = GlobalVo.GAME_W/2 - effectTips.width/2;        
        effectTips.stroke  = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        egret.log(effectTips.textAlign,effectTips.x);
		if(!LayerManager.UI_Tips.contains(effectTips)){
            LayerManager.UI_Tips.addChild( effectTips );
        }        

        var onComplete2:Function = function(){
            if(LayerManager.UI_Tips.contains(effectTips)){
                LayerManager.UI_Tips.removeChild( effectTips );
                ObjectPool.push(effectTips);
            }
        };
        var onComplete1:Function = function(){
            egret.Tween.get(effectTips).to({alpha:0},500).call(onComplete2,this);   
        };
        effectTips.visible = true;
        egret.Tween.get(effectTips).to({y:effectTips.y - 120,alpha:1},800,egret.Ease.backOut).call(onComplete1,this);   
    }    

    //从左至右 或者 从右至左
   public showTipsLeftOrRight(str:string = "",isWarning:boolean = false,isFromeLeft:boolean = true):void{
        var effectTips = ObjectPool.pop("egret.TextField");

        effectTips.size = 24;
        effectTips.y = GlobalVo.GAME_H/2;
        if(isWarning){
            effectTips.textColor = ColorUtlis.COLOR_RED;
        }else{
            effectTips.textColor = ColorUtlis.COLOR_GREEN;
        }
        effectTips.alpha = 0;
        effectTips.anchorOffsetX = effectTips.anchorOffsetY = 0;
        effectTips.width = 500;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        if(isFromeLeft){
            effectTips.x = - effectTips.width;        
        }else{
            effectTips.x = GlobalVo.GAME_W;        
        }
        effectTips.stroke  = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        if(!LayerManager.UI_Tips.contains(effectTips)){
            LayerManager.UI_Tips.addChild( effectTips );
        }        

        if(isFromeLeft){
            egret.Tween.get(effectTips).to({x:GlobalVo.GAME_W/2 - effectTips.width/2 ,alpha:1},300,egret.Ease.sineInOut);   
        }else{
            egret.Tween.get(effectTips).to({x:GlobalVo.GAME_W/2 - effectTips.width/2,alpha:1},300,egret.Ease.sineInOut);   
        }

        egret.setTimeout(function () {
            if(isFromeLeft){
                egret.Tween.get(effectTips).to({x:GlobalVo.GAME_W},300,egret.Ease.sineIn);    
            }else{
                egret.Tween.get(effectTips).to({x:-effectTips.width},300,egret.Ease.sineIn);    
            }
        }, this, 1300);  

        egret.setTimeout(function () {
            if(LayerManager.UI_Tips.contains(effectTips)){
                LayerManager.UI_Tips.removeChild( effectTips );
                ObjectPool.push(effectTips);
            }
        }, this, 1600);     

    }  

    //从里到外
   public showTipsFromCenter(str:string = "",isWarning:boolean = false):void{
        var effectTips = ObjectPool.pop("egret.TextField");

        effectTips.size = 24;
        effectTips.y = GlobalVo.GAME_H/2;
        if(isWarning){
            effectTips.textColor = ColorUtlis.COLOR_RED;
        }else{
            effectTips.textColor = ColorUtlis.COLOR_GREEN;
        }
        effectTips.alpha = 0;
        
        effectTips.width = 500;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = GlobalVo.GAME_W/2;        
        effectTips.stroke  = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        if(!LayerManager.UI_Tips.contains(effectTips)){
            LayerManager.UI_Tips.addChild( effectTips );
        }        

        effectTips.anchorOffsetX = effectTips.width/2;
        effectTips.anchorOffsetY = effectTips.height/2;
        effectTips.scaleX = 0;
        effectTips.scaleY = 0;
        
        var onComplete2:Function = function(){
            if(LayerManager.UI_Tips.contains(effectTips)){
                LayerManager.UI_Tips.removeChild( effectTips );
                ObjectPool.push(effectTips);
            }
        };
        egret.Tween.get(effectTips).to({scaleX:1,scaleY:1,alpha:1},200); 
        egret.setTimeout(function () {
            egret.Tween.get(effectTips).to({alpha:0},500).call(onComplete2,this);   
        }, this, 1000);   

    }    

    //从外到里
   public showTipsBigToSmall(str:string = "",isWarning:boolean = true):void{
        var effectTips:egret.TextField = ObjectPool.pop("egret.TextField");

        effectTips.size = 24;
        effectTips.y = GlobalVo.GAME_H/2;
        if(isWarning){
            effectTips.textColor = ColorUtlis.COLOR_RED;
        }else{
            effectTips.textColor = ColorUtlis.COLOR_GREEN;
        }
        effectTips.alpha = 0;
        
        effectTips.width = 500;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = GlobalVo.GAME_W/2;        
        effectTips.stroke  = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        if(!LayerManager.UI_Tips.contains(effectTips)){
            LayerManager.UI_Tips.addChild( effectTips );
        }        

        effectTips.anchorOffsetX = effectTips.width / 2;
        effectTips.anchorOffsetY = effectTips.height / 2;
        effectTips.scaleX = 4;
        effectTips.scaleY = 4;
        
        var onComplete2:Function = function(){
            if(LayerManager.UI_Tips.contains(effectTips)){
                LayerManager.UI_Tips.removeChild( effectTips );
                effectTips.anchorOffsetX = effectTips.anchorOffsetY = 0;
               ObjectPool.push(effectTips);
            }
        };
        egret.Tween.get(effectTips).to({scaleX:1,scaleY:1,alpha:1},200); 
        egret.setTimeout(function () {
            egret.Tween.get(effectTips).to({alpha:0},500).call(onComplete2,this);   
        }, this, 1000);   
    }    
}