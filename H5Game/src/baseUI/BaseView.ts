class BaseView extends eui.Component{
	private event = [];
	public constructor() {
		super();
		this.addEvent(egret.Event.COMPLETE, this, this.euiCompete);
	}
	public addTouchEvent(obj: any, func: Function){
		this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
	}
	public addTouchEndEvent(obj: any, func:Function){
		this.addEvent(egret.TouchEvent.TOUCH_END, obj, func);
	}
	public addChangeEvent(obj: any, func: Function){
		this.addEvent(egret.TouchEvent.CHANGE, obj, func);
	}
	public addEvent(ev: string, obj: any, func: Function){
		if(!obj){
			let s = `${this.skinName}.exml文件错误`;
			console.error(s);
			alert(s);
			return;
		}
		obj.addEventListener(ev, func, this);
		this.event.push([ev, func, obj]);
	}
	public removeTouchEvent(obj: any, func: Function){
		obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
	}
	protected removeEvents(){
		for(let ev of this.event){
			ev[2].removeEventListener(ev[0],ev[1],this);
		}
	}
	protected euiCompete(){

	}
	public $onClose(){
		let fun = function(tar: egret.DisplayObjectContainer){
			for(let i:number = 0; i < tar.numChildren; i++){
				let obj =tar.getChildAt(i);
				if(obj instanceof BaseView){
					(<BaseView>obj).$onClose();
				}else if(obj instanceof egret.DisplayObjectContainer){
					fun(obj);
				}
			}
		};
		fun(this);
		this.removeEvents();
		
	}
	public bindLogic(com: eui.Component, logic: BaseView){
		com[`__proto__`]=logic;
	}
}