class ViewManager extends BaseClass {
	/**已注册的UI信息 */
	private _regesterInfo: any;
	/**ui实体 */
	private _views: any;

	private _hCode2Key: any;

	private _opens: string[] = [];
	public constructor() {
		super();
		this._regesterInfo = {};
		this._views = {};
		this._hCode2Key = {};
		this._opens = [];
	}
	public static ins(): ViewManager {
		return super.ins() as ViewManager;
	}
	/**
	 * 注册面板
	 * @param viewClass 类名
	 * @param layer 层级
	 */
	public reg(viewClass: any, layer: BaseSpriteLayer): void {
		if (viewClass == null) return;
		let keys: string = egret.getQualifiedClassName(viewClass);
		if (this._regesterInfo[keys]) {
			return;
		}
		this._regesterInfo[keys] = [viewClass, layer];
	}
	private getKey(viewClass: any): string {
		return egret.getQualifiedClassName(viewClass);
	}
	/**
	 * 销毁一个面板
	 * @param tar
	 */
	public destroy(tar: egret.DisplayObject): void {
		let keys = this._hCode2Key[tar.hashCode];
		delete this._views[keys];
	}
	/**
	 * 统一打开窗口函数
	 * @param viewClass 类名
	 * @param param 打开窗口传入的参数
	 */
	public open(viewClass: any, ...param: any[]): BaseEuiView {

		if(!SystemOpenMgr.checkOpen(viewClass,true))
			return;
		else{
			if(param)
			{
				for(var i:number=0;i<param.length;i++)
				{
					if(param[i] instanceof BaseView)
					{
						if(!SystemOpenMgr.checkOpen(param[i],true))
							return;
					}
				}
			}
		}

		let key = this.getKey(viewClass);
		let info = this._regesterInfo[key];

		if (!viewClass.openCheck(...param))
			return null;

		let view = this.openEasy(viewClass, ...param);
		return view;
	}
	/**
	 * 统一关闭窗口
	 * @param viewClass 类名
	 * @param param 传入的参数
	 */
	public close(viewClass: any, ...param:any[]): BaseEuiView{
		if(!this.isShow(viewClass)) return null;
		let key = this.getKey(viewClass);
		let view = this._views[key];
		if(view){
			let viewIndex = this._opens.indexOf(key);
			if(viewIndex >= 0){
				this._opens.splice(viewIndex,1);
			}
			view.close.bind(view)(...param);
			view.$onClose.apply(view);
			if(view.parent == LayerManager.UI_MainUI)
			{
				let tw:egret.Tween = egret.Tween.get(view);
				tw.to({x:-GlobalVo.GAME_W},200).call(()=>{
					view.x = GlobalVo.GAME_W;
					view.removeFromParent();
				},this);
			}else
				view.removeFromParent();
		}
		return view;
	}
	/**
	 * 检测一个UI是否打开
	 * @param viewClass 类名，类名字符串，类对象
	 * @returns boolean;
	 */
	public isShow(viewClass: any): boolean{
	
		return this._opens.indexOf(this.getKey(viewClass)) >= 0;
	}
	private openEasy(viewClass: any, ...param: any[]): BaseEuiView {
		let keys = this.getKey(viewClass);
		let view = this._views[keys];
		let info = this._regesterInfo[keys];
		if (!view) {
			view = new info[0]();
			this._views[keys] = view;
			this._hCode2Key[view.hashCode] = keys;
		}

		if (!view) {
			console.log("UI_" + keys + "不存在");
			return null;
		}
		if(view.isShow())return view;

		if(info[1] == LayerManager.UI_MainUI)
		{
			view.x = GlobalVo.GAME_W;
			let tw:egret.Tween = egret.Tween.get(view);
			tw.to({x:0},200);
		}
		view.addToParent(info[1]);
		view.open.bind(view)(...param);
		if(this._opens.indexOf(keys) == -1){
			this._opens.push(keys);
		}
		return view;
	}
	public getView(nameClass: any): BaseEuiView{
		let key = this.getKey(nameClass);
		return this._views[key];
	}
	/**
	 * 关闭一级窗口
	 */
	public closeTopLevel(viewClass: any = null): void {
		for(let i = this._opens.length -1; i >=0; i--){
			let keys = this._opens[i];
			let view = this.getView(egret.getDefinitionByName(keys));
			if(view == viewClass){
				continue;
			}
			if(view.isTopLevel){
				this.close(keys,[]);
			}
		}
	}
	static getView(id:number):any
	{
		switch(id)
		{
			case ViewID.shop:
				return ShopWin;
			case ViewID.pveII:
				return PVEWinII;
			case ViewID.pvp:
				return PVPWin;
		}
		return null;
	}


	static redDic:Object = {};
	static redToTarge(targe:egret.DisplayObject,add:boolean):void
	{
		var img:eui.Image = ViewManager.redDic[targe.hashCode];
		if(add)
		{
			if(!img)
			{
				if(targe["red"])
					img = targe["red"];
				if(!img)
				{
					img = new eui.Image();
					img.x = targe.x + targe.width - 32;
					img.y = targe.y;
					img.source = RES.getRes("red");
					// targe.addEventListener(egret.Event.RESIZE,()=>{
					// 	img.x = targe.x + targe.width - 32;
					// 	img.y = targe.y;
					// },this);
					if(targe.parent)
						targe.parent.addChild(img);
					// else
					// 	throw new Error("红点添加错误!");
				}
				img.touchEnabled = false;
				ViewManager.redDic[targe.hashCode] = img;
			}
			img.visible = true;
		}else
		{
			if(img)
				img.visible = false;
		}
	}

	static effectDic:Object = {};
	static effectToTarge(targe:egret.DisplayObject,add:boolean):void
	{
		var img:clips.BmpClip = ViewManager.redDic[targe.hashCode];
		if(add)
		{
			if(!img)
			{
				if(targe["red"])
					img = targe["red"];
				if(!img)
				{
					img = ObjectPool.pop("clips.BmpClip");
					img.x = targe.x + targe.width/2;
					img.y = targe.y + targe.height + 19/ 2;
					ModelResMgr.getOtherEffect(10013,img);
					if(targe.parent)
						targe.parent.addChild(img);
					// else
					// 	throw new Error("红点添加错误!");
				}
				img.play(-1);
				img.touchEnabled = false;
				ViewManager.effectDic[targe.hashCode] = img;
			}
			img.visible = true;
		}else
		{
			if(img)
			{
				img.stop();
				img.visible = false;
			}
		}
	}
}
enum ViewID
{
	dx,
	shop,
	pvp,
	pveII,
	points,
}
