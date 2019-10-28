class BaseItemRender extends BaseView implements eui.IItemRenderer{
	private _data: any = null;
	private _selected: boolean = false;
	public itemIndex: number = -1;
	private touchCaptured: boolean = false;
	public constructor() {
		super();
	}
	protected ontouchcancel(e: egret.TouchEvent): void{
		this.touchCaptured = false;
		let stage = e.$currentTarget;
		stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.ontouchcancel, this);
		stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
		this.invalidateState();
		this.tapHandleFun();
	}
	protected onTouchBegin(e: egret.TouchEvent): void{
		this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.ontouchcancel, this);
		this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
		this.touchEnabled = true;
		this.invalidateState();
		e.updateAfterEvent();
	}
	private onStageTouchEnd(e: egret.TouchEvent): void{
		let stage = e.$currentTarget;
		stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.ontouchcancel, this);
		stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
		this.touchEnabled = true;
		this.invalidateState();
		this.tapHandleFun();
	}
	protected tapHandleFun(): void{

	}
	protected getCurrentState(): string{
		let state = "up";
		if(this.touchCaptured){
			state = "down";
		}
		if(this._selected){
			let selectedState = state + "AndSelected";
			let skin = this.skin;
			if(skin && skin.hasState(selectedState)){
				return selectedState;
			}
			return state == "disabled" ? "disabled" : "down";
		}
		return state;
	}
	public get data():any{
		return this._data;
	}
	public set data(value: any){
		this._data = value;
		this.dataChanged();
	}
	protected dataChanged(): void{

	}
	public get selected(): boolean{
		return this._selected;
	}
	public set selected(value: boolean){
		if(this._selected == value){
			return;
		}
		this._selected = value;
		this.invalidateState();
	}
	public dispose(): void{
		this._data = null;
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
	}
}
eui.registerBindable(BaseItemRender.prototype,"data");