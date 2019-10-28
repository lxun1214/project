class TextFlowMaker {
	private static STYLE_COLOR: string = "C";
	private static STYLE_SIZE: string = "S";
	private static UNDER_LINE: string = "U";
	/**
	 * "文字|S:18&C:0x444444&T:带颜色字号"
	 */
	public static generateTextFlow(sourceText: string = ""): egret.ITextElement[] {
		let textArr = sourceText.split("|");
		let str: string = "";
		for (let i = 0, len = textArr.length; i < len; i++) {
			str += this.getSingleTextFlow(textArr[i]);
		}
		return new egret.HtmlTextParser().parser(str);
	}
	public static getSingleTextFlow(text: string = ""): string {
		let arrText = text.split("&T:", 2);
		if (arrText.length == 2) {
			let str: string = "<font";
			let textArr = arrText[0].split("&");
			let tempArr: string[];
			let t: string;
			let underline: boolean = false;
			for (let i = 0, len = textArr.length; i < len; i++) {
				tempArr = textArr[i].split(":");
				switch (tempArr[0]) {
					case this.STYLE_COLOR:
						str += ` color="${parseInt(tempArr[1])}"`;
						break;
					case this.STYLE_SIZE:
						str += ` size="${parseInt(tempArr[1])}"`;
						break;
					case this.UNDER_LINE:
						underline = true;
						break;
				}
			}
			if (underline) {
				str += `><u>${arrText[1]}</u></font>`;
			} else {
				str += `>${arrText[1]}</font>`;
			}
			return str;
		} else {
			return `<font>` + text + `</font>`;
		}
	}
}