/**
 * 基类
 */
class BaseClass {
	public constructor() {

	}
	public static ins(...args:any[]):any{
		let Class:any = this;
		if(!Class._instance){
			Class._instance = new Class(...args);
			Class._instance.initEvent();
		}
		return Class._instance;
	}
	protected initEvent(): void{
		
	}
}