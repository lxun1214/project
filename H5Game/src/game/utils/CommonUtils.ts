class CommonUtils extends BaseClass{
	public static overLength(num: number) {
		let str = null;
		if (num < 100000) {
			str = Math.floor(num) + "";
		}
		else if (num > 100000000) {
			num = (num / 100000000);
			num = Math.floor(num * 10) / 10;
			str = num + "亿";
		}
		else {
			num = (num / 10000);
			num = Math.floor(num * 10) / 10;
			str = num + "万";
		}
		return str;
	}
	/**
	 * 万字的显示
	 * @param label
	 * @param num
	 */
	public static labelIsOverLenght(label, num) {
		label.text = this.overLength(num);
	}
}