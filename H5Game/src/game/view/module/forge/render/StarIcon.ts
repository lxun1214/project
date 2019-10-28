class StarIcon extends BaseView{
	private lv: number = 1;
	public constructor() {
		super();
		this.skinName = "StarSkin";
	}
	public euiCompete(){
		this.setLv(this.lv);
	}
	public setLv(lv: number): void{
		this.lv = lv;
		for(let i = 0; i < 10; i++){
			this["star"+i].visible = false;
			if(i < lv){
				this["star"+i].visible = true;
			}
		}
	}
}