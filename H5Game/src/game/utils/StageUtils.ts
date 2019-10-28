/**
 * Stage相关工具基类
 */
class StageUtils extends BaseClass{
	private static _uiStage: eui.UILayer;
	public constructor() {
		super();

		if(StageUtils._uiStage == null){
			StageUtils._uiStage = new eui.UILayer();
			StageUtils._uiStage.touchEnabled = false;
			StageUtils._uiStage.percentHeight = 100;
			StageUtils._uiStage.percentWidth = 100;
			this.getStage().addChild(StageUtils._uiStage);
		}
	}
	public static ins(): StageUtils{
		return super.ins() as StageUtils;
	}
	/**
	 * 获取游戏的高度
	 */
	public getHeight(): number{
		return this.getStage().stageHeight;
	}
	/**
	 * 获取游戏宽度
	 */
	public getWidth(): number{
		return this.getStage().stageWidth;
	}
	/**
	 * 获取游戏stage对象
	 */
	public getStage(): egret.Stage{
		return egret.MainContext.instance.stage;
	}
	/**
	 * 设置适配方式
	 */
	public setScaleMode(value:string): void{
		this.getStage().scaleMode = value;
	}
}