class ResMgr {
	public constructor() {
	}

	public static getGameOtherPng(value: string): string {
        var url: string = ParamMgr.ressite + ParamMgr.gameSynRes ;
        return url + "/assets/otherPng/"  + value + ".png?v=" + ParamMgr.ver;
    }

	public static getGameOtherJpg(value: string): string {
        var url: string = ParamMgr.ressite + ParamMgr.gameSynRes ;
        return url + "/assets/otherPng/"  + value + ".jpg?v=" + ParamMgr.ver;
    }
    public static getGameItemPng(value: string): string{
        var url: string = ParamMgr.ressite + ParamMgr.gameSynRes ;
        return url + "/assets/item/"  + value + ".png?v=" + ParamMgr.ver;
    }

    public static getMapImage(value: string):string
    {
        var url: string = ParamMgr.ressite + ParamMgr.gameSynRes ;
        return url + "/assets/newMap/"  + value + "?v=" + ConfigMgr.gameConfig["globalConfig"].mapVer;
    }

    static skillIcon(value:string):string
    {
        var url: string = ParamMgr.ressite + ParamMgr.gameSynRes ;
        return url + "/assets/model/skill/"  + value + ".png?v=" + ParamMgr.ver;
    }


    static gameSound(value:string):string
    {
        var url: string = ParamMgr.ressite + ParamMgr.gameSynRes ;
        return url + "/assets/sound/"  + value + ".mp3?v=" + ParamMgr.ver;
    }
}