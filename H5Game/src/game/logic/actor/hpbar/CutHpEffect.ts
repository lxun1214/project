/**
 *
 * @author 
 *
 */
class CutHpEffect extends eui.BitmapLabel
{
	private static pooling:Array<any> = [[],[],[]];//飘血特效
    
    public tw:egret.Tween;
    private isCrit:boolean;
	public t:number;
	public constructor(ty:number)
	{
    	super();
		this.t = ty;
		if(ty == ActorRace.HUMAN)
				this.font = RES.getRes("fightFontII_fnt");
		else
			this.font = RES.getRes("sysFont_fnt");
		this.verticalAlign = egret.VerticalAlign.JUSTIFY;
	}
	
	/**
	 * 播放特效
	 */ 
    public static playHp(value: number,parent: BaseActor,crit: number = 1,offsetx:number = 0,offsety:number=-100):void
	{
	    var effect:CutHpEffect;

		if(CutHpEffect.pooling[parent.nRace].length)
	    {
			effect = CutHpEffect.pooling[parent.nRace].shift();
	    }else
	    {
	        effect = new CutHpEffect(parent.nRace);
	    }
		effect.isCrit = false;
	    if(value == Number.MIN_VALUE)
        {
            // effect.textColor = 0xFF00FF;
            effect.text = "未命中";
	    }else if(value == 0)
        {
            // effect.textColor = 0xFF00FF;
            effect.text = "闪避";
	    }else if(crit >= 1)
        {
            // effect.textColor = 0xFE6001;
			effect.text = "暴击"+Math.floor(value).toString();
			effect.isCrit = true;
        }else if(value < 0)
        {
            // effect.textColor = 0xffff00;
			effect.text = value.toString();
        }else
        {
            // effect.textColor = 0x00ff00;
            effect.text = "+" + Math.floor(value);
        }
	    parent.addChild(effect);
	    effect.x = -effect.textWidth/2 + offsetx;
	    effect.y = -100 + offsety;
	    effect.scaleX = effect.scaleY = 0;
	    effect.tw = egret.Tween.get(effect);
		if(!effect.isCrit)
			effect.tw.to({y:-165 + offsety,scaleX:1.5,scaleY:1.5},300).call(effect.twEnd,null,[effect,0,offsetx,offsety]);
		else
			effect.tw.to({y:-165 + offsety,x:-100,scaleX:0.45,scaleY:0.45},100).call(effect.twEnd,null,[effect,0,offsetx,offsety]);
	}
	private delay:number;
	private twEnd(effect:CutHpEffect,type:number,offsetx,offsety):void
	{
		if(!effect.isCrit)
		{
			if(type == 0)
			{
				this.delay = setTimeout(effect.twEnd,400,effect,1,offsetx,offsety);
			}else
			{
				effect.tw = egret.Tween.get(effect,null,true);
				effect.tw.to({x:150+offsetx,alpha:0,scaleX:0,scaleY:0},300).call(effect.endEffect,effect);
			}
		}else
		{
			if(type == 0)
			{
				effect.tw = egret.Tween.get(effect,null,true);
				effect.tw.to({y:-180+offsety,x:-150+offsetx,scaleX:1.65,scaleY:1.65},500,egret.Ease.elasticOut).call(effect.twEnd,null,[effect,1,offsetx,offsety]);
			}
			else if(type == 1)
			{
				effect.tw = egret.Tween.get(effect,null,true);
				effect.tw.to({x:0+offsetx,alpha:0,scaleX:0,scaleY:0},300).call(effect.endEffect,effect);
			}
		}
	}

	/**
	 * 播放特效
	 */ 
    // public static playEffect(src: string,color:number,parent: egret.DisplayObjectContainer,offsetx: number,offsety: number):void
	// {
    //     var effect: CutHpEffect;
    //     if(CutHpEffect.pooling.length) {
    //         effect = CutHpEffect.pooling.shift();
    //     } else {
    //         effect = new CutHpEffect();
    //     }
    //     // effect.textColor = color;
    //     effect.text = src;
       
    //     parent.addChild(effect);
    //     effect.x = offsetx - effect.textWidth / 2;
    //     effect.y = offsety;

    //     effect.tw = egret.Tween.get(effect);
    //     effect.tw.to({ y: offsety - 26 },800).call(effect.endEffect,effect);
	// }
	
	/**
	 * 结束特效
	 */ 
	public endEffect():void
	{
		clearTimeout(this.delay);
	    if(this.parent){
	        this.parent.removeChild(this);
	    }
		this.scaleX = this.scaleY = 1;
		this.alpha = 1;
	    egret.Tween.removeTweens(this);
		CutHpEffect.pooling[this.t].push(this);
	}
}
