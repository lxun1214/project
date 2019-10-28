/**
 *
 * @author 
 *
 */
class DateTimeUtils {

    private static date: Date = new Date();
	public constructor() {
	}
	
    public static toTimeString(ms:number):string
    {
    	var time:string;
        var h: number = Math.floor(ms/3600);//60 60
        var d:number = Math.floor(h/24);
        h = h % 24;
        var m: number = Math.floor((ms - (d*24 + h)*3600)/60);
        var s: number = Math.floor(ms%60);
        return (d?d+"天":"") + (h?h+"时":"") + (m?m+"分":"") + (s?s+"秒":"");
    }
}
