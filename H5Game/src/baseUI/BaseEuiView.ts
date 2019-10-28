/**
 * View基类，继承eui.Compeonent
 */
class BaseEuiView extends BaseView{
	public isTopLevel: boolean = false;

	win:eui.Component;
	public constructor() {
		super();
		this.percentWidth = 100;
		this.percentHeight = 100;
	}
	/**
	 * 面板是否显示
	 * @param return
	 */
	public isShow(): boolean{
		return this.stage != null && this.visible;
	}
	/**
	 * 添加到父级
	 */
	public addToParent(p: egret.DisplayObjectContainer):void{
		p.addChild(this);
	}
	/**
	 * 从父级移除
	 */
	public removeFromParent(p: egret.DisplayObjectContainer): void{
		this.destroy();
	}
	/**
	 * 销毁
	 */
	protected destroy(): void{
		if(!this.parent == null)return;
		this.parent.removeChild(this);
	}
	/**
	 * 面板开启执行函数，用于子类继承
	 * @param param参数
	 */
	newCloseBtn01:eui.ToggleButton;
	newCloseBtn00:eui.Button;
	public open(...param: any[]): void{
		if(this.win)
		{
			this.newCloseBtn01 = this.win["newCloseBtn01"];
			this.newCloseBtn00 = this.win["newCloseBtn00"];
			if(this.newCloseBtn01)
			{
				this.addChild(this.newCloseBtn01);
				this.addTouchEvent(this.newCloseBtn01, this.closeCall);
				UIDmgr.bindingUID(this.newCloseBtn01,uid.back2);
			}
			if(this.newCloseBtn00)
			{
				this.addChild(this.newCloseBtn00);
				this.addTouchEvent(this.newCloseBtn00, this.closeCall);
				UIDmgr.bindingUID(this.newCloseBtn00,uid.back0);
			}
		}
	}


	protected closeCall():void
	{
		ViewManager.ins().close(this);
	}

	/**
	 * 面板关闭执行函数，用于子类继承
	 * @param param参数
	 */
	public close(...param: any[]): void{

	}
	public static openCheck(...param: any[]): boolean{
		return true;
	}
}