class ColorUtlis {
	//颜色矩阵数组
	public static colorMatrix:any = new egret.ColorMatrixFilter([
		0.3,0.6,0,0,0,
		0.3,0.6,0,0,0,
		0.3,0.6,0,0,0,
		0,0,0,1,0
	]);

		public static QUALITY_COLOR: number[] = [0xffffff,0x57f65e,0x53b1fa,0xff66d6,0xffdd3e,0xede4b3];

	/**绿色 */
	public static COLOR_GREEN: number = 0x32CD32;
	/**红色 */
	public static COLOR_RED: number = 0xFF3030;


	static COLOR_STR(s:string,d:boolean):egret.ITextElement[]
	{
		if(d)
			return new egret.HtmlTextParser().parser("<font color = '#32CD32'>" + s + "</font>");
		return new egret.HtmlTextParser().parser("<font color = '#FF3030'>" + s + "</font>");
	}
}