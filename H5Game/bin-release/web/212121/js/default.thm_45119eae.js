window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml"};generateEUI.paths['resource/eui_skins/btn/new/Btn000Skin.exml'] = window.Btn000Skin = (function (_super) {
	__extends(Btn000Skin, _super);
	function Btn000Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay","red"];
		
		this.height = 48;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 93;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i(),this.red_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","anniu_1"),
					new eui.SetProperty("_Image1","height",48),
					new eui.SetProperty("_Image1","y",0),
					new eui.SetProperty("_Image1","width",93),
					new eui.SetProperty("_Image1","x",0)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","anniu_1"),
					new eui.SetProperty("","width",93),
					new eui.SetProperty("","height",48)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Image1","source","anniu_1")
				])
		];
	}
	var _proto = Btn000Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "anniu_1";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.right = -16;
		t.source = "red";
		t.top = -16;
		t.visible = false;
		return t;
	};
	return Btn000Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/Btn001Skin.exml'] = window.Btn001Skin = (function (_super) {
	__extends(Btn001Skin, _super);
	function Btn001Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay","red"];
		
		this.height = 48;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 93;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i(),this.red_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","height",48),
					new eui.SetProperty("_Image1","y",0),
					new eui.SetProperty("_Image1","width",93),
					new eui.SetProperty("_Image1","x",0),
					new eui.SetProperty("_Image1","source","anniu_3")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","anniu_4"),
					new eui.SetProperty("","width",93),
					new eui.SetProperty("","height",48)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Image1","source","anniu_3")
				])
		];
	}
	var _proto = Btn001Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "anniu_3";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.right = -16;
		t.source = "red";
		t.top = -16;
		t.visible = false;
		return t;
	};
	return Btn001Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/Btn002Skin.exml'] = window.Btn002Skin = (function (_super) {
	__extends(Btn002Skin, _super);
	function Btn002Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay","red"];
		
		this.height = 77;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 213;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i(),this.red_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","anniu_5"),
					new eui.SetProperty("labelDisplay","textColor",0xfff4e6),
					new eui.SetProperty("labelDisplay","strokeColor",0xdb7337),
					new eui.SetProperty("labelDisplay","stroke",1),
					new eui.SetProperty("labelDisplay","fontFamily","Arial")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","anniu_6"),
					new eui.SetProperty("","width",213),
					new eui.SetProperty("","height",77)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Image1","source","anniu_5")
				])
		];
	}
	var _proto = Btn002Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "anniu_5";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bold = true;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 30;
		t.stroke = 2;
		t.strokeColor = 0xbd7337;
		t.text = "111";
		t.textAlign = "center";
		t.textColor = 0xfff4e6;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.right = -16;
		t.source = "red";
		t.top = -16;
		t.visible = false;
		return t;
	};
	return Btn002Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/Btn003Skin.exml'] = window.Btn003Skin = (function (_super) {
	__extends(Btn003Skin, _super);
	function Btn003Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay","red"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i(),this.red_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","y",0),
					new eui.SetProperty("_Image1","x",0),
					new eui.SetProperty("_Image1","source","anniu_10"),
					new eui.SetProperty("","width",170),
					new eui.SetProperty("","height",76)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","anniu_20"),
					new eui.SetProperty("_Image1","scale9Grid",new egret.Rectangle(64,25,55,14))
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","percentWidth",100),
					new eui.SetProperty("_Image1","percentHeight",100),
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Image1","source","anniu_10"),
					new eui.SetProperty("","width",170),
					new eui.SetProperty("","height",76)
				])
		];
	}
	var _proto = Btn003Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "anniu_10";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.text = "111";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.right = -16;
		t.source = "red";
		t.top = -16;
		t.visible = false;
		return t;
	};
	return Btn003Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/Btn004Skin.exml'] = window.Btn004Skin = (function (_super) {
	__extends(Btn004Skin, _super);
	function Btn004Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay","red"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i(),this.red_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","y",0),
					new eui.SetProperty("_Image1","x",0),
					new eui.SetProperty("_Image1","source","anniu_30"),
					new eui.SetProperty("","width",170),
					new eui.SetProperty("","height",76)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","percentWidth",100),
					new eui.SetProperty("_Image1","percentHeight",100),
					new eui.SetProperty("_Image1","source","anniu_40")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","percentWidth",100),
					new eui.SetProperty("_Image1","percentHeight",100),
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Image1","source","anniu_30"),
					new eui.SetProperty("","width",170),
					new eui.SetProperty("","height",76)
				])
		];
	}
	var _proto = Btn004Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "anniu_30";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.right = -16;
		t.source = "red";
		t.top = -16;
		t.visible = false;
		return t;
	};
	return Btn004Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/Btn005Skin.exml'] = window.Btn005Skin = (function (_super) {
	__extends(Btn005Skin, _super);
	function Btn005Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay","red"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i(),this.red_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","y",0),
					new eui.SetProperty("_Image1","x",0),
					new eui.SetProperty("_Image1","source","anniu_13"),
					new eui.SetProperty("","width",177),
					new eui.SetProperty("","height",64)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","percentWidth",100),
					new eui.SetProperty("_Image1","percentHeight",100),
					new eui.SetProperty("_Image1","source","anniu_14")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","percentWidth",100),
					new eui.SetProperty("_Image1","percentHeight",100),
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Image1","source","anniu_15"),
					new eui.SetProperty("","width",177),
					new eui.SetProperty("","height",64)
				])
		];
	}
	var _proto = Btn005Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "anniu_13";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bold = true;
		t.bottom = 8;
		t.fontFamily = "Microsoft YaHei";
		t.left = 8;
		t.right = 8;
		t.size = 24;
		t.stroke = 2;
		t.strokeColor = 0x8f6c42;
		t.text = "111";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.right = -16;
		t.source = "red";
		t.top = -16;
		t.visible = false;
		return t;
	};
	return Btn005Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/Btn006Skin.exml'] = window.Btn006Skin = (function (_super) {
	__extends(Btn006Skin, _super);
	function Btn006Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay","red"];
		
		this.height = 85;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 50;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i(),this.red_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","y",0),
					new eui.SetProperty("_Image1","x",0),
					new eui.SetProperty("_Image1","source","组-131"),
					new eui.SetProperty("","width",50),
					new eui.SetProperty("","height",85)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","percentWidth",100),
					new eui.SetProperty("_Image1","percentHeight",100),
					new eui.SetProperty("_Image1","source","组-132")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","percentWidth",100),
					new eui.SetProperty("_Image1","percentHeight",100),
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Image1","source","组-131"),
					new eui.SetProperty("","width",50),
					new eui.SetProperty("","height",85)
				])
		];
	}
	var _proto = Btn006Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "组-131";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.right = -16;
		t.source = "red";
		t.top = -16;
		t.visible = false;
		return t;
	};
	return Btn006Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/Btn007Skin.exml'] = window.Btn007Skin = (function (_super) {
	__extends(Btn007Skin, _super);
	function Btn007Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay","red"];
		
		this.height = 77;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 210;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i(),this.red_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","y",0),
					new eui.SetProperty("_Image1","x",0),
					new eui.SetProperty("_Image1","source","组-80-拷贝-3"),
					new eui.SetProperty("","width",210),
					new eui.SetProperty("","height",77)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","percentWidth",100),
					new eui.SetProperty("_Image1","percentHeight",100),
					new eui.SetProperty("_Image1","source","组-80-拷贝-4")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","percentWidth",100),
					new eui.SetProperty("_Image1","percentHeight",100),
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Image1","source","组-80-拷贝-4"),
					new eui.SetProperty("","width",210),
					new eui.SetProperty("","height",77)
				])
		];
	}
	var _proto = Btn007Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "组-80-拷贝-3";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bold = true;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 30;
		t.text = "充 值";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.right = -16;
		t.source = "red";
		t.top = -16;
		t.visible = false;
		return t;
	};
	return Btn007Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/CheckBox0.exml'] = window.CheckBox0 = (function (_super) {
	__extends(CheckBox0, _super);
	function CheckBox0() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.currentState = "up";
		this.height = 46;
		this.width = 48;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","verticalCenter",0),
					new eui.SetProperty("labelDisplay","textAlign","left"),
					new eui.SetProperty("labelDisplay","x",50)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","verticalCenter",0)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","verticalCenter",0)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","verticalCenter",0),
					new eui.SetProperty("_Image2","source","gou"),
					new eui.SetProperty("_Image2","x",6)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","verticalCenter",0),
					new eui.SetProperty("_Image2","source","gou")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","x",0),
					new eui.SetProperty("_Image1","verticalCenter",0),
					new eui.SetProperty("_Image2","source","gou"),
					new eui.SetProperty("_Image2","x",6),
					new eui.SetProperty("_Image2","width",30)
				])
		];
	}
	var _proto = CheckBox0.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "gouBg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.textAlign = "center";
		t.textColor = 0xd1c28f;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.x = 50;
		return t;
	};
	return CheckBox0;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/CloseBtn00.exml'] = window.CloseBtn00 = (function (_super) {
	__extends(CloseBtn00, _super);
	function CloseBtn00() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.height = 71;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 71;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","gb_1"),
					new eui.SetProperty("labelDisplay","width",55),
					new eui.SetProperty("labelDisplay","horizontalCenter",0),
					new eui.SetProperty("","width",71),
					new eui.SetProperty("","height",71)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","gb_2"),
					new eui.SetProperty("","width",71),
					new eui.SetProperty("","height",71)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Image1","source","gb_2"),
					new eui.SetProperty("labelDisplay","horizontalCenter",0),
					new eui.SetProperty("","width",71)
				])
		];
	}
	var _proto = CloseBtn00.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "gb_1";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return CloseBtn00;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/CloseBtn01.exml'] = window.CloseBtn01 = (function (_super) {
	__extends(CloseBtn01, _super);
	function CloseBtn01() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.height = 69;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 68;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","yc_1"),
					new eui.SetProperty("labelDisplay","width",55),
					new eui.SetProperty("labelDisplay","horizontalCenter",0),
					new eui.SetProperty("","width",68),
					new eui.SetProperty("","height",69)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","yc_2"),
					new eui.SetProperty("","width",68),
					new eui.SetProperty("","height",69)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Image1","source","yc_2"),
					new eui.SetProperty("labelDisplay","horizontalCenter",0),
					new eui.SetProperty("","width",68)
				])
		];
	}
	var _proto = CloseBtn01.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "yc_1";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return CloseBtn01;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/MainBtnSkin.exml'] = window.MainBtnSkin = (function (_super) {
	__extends(MainBtnSkin, _super);
	function MainBtnSkin() {
		_super.call(this);
		this.skinParts = ["a1","n1","a0","n0","labelDisplay","red"];
		
		this.height = 119;
		this.width = 119;
		this.elementsContent = [this.labelDisplay_i(),this.red_i()];
		this.a1_i();
		
		this.n1_i();
		
		this.a0_i();
		
		this.n0_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("a0","",2,"labelDisplay"),
					new eui.AddItems("n0","",2,"labelDisplay")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("a1","",0,""),
					new eui.AddItems("n1","",2,"labelDisplay")
				])
		];
	}
	var _proto = MainBtnSkin.prototype;

	_proto.a1_i = function () {
		var t = new eui.Image();
		this.a1 = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto.n1_i = function () {
		var t = new eui.Image();
		this.n1 = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto.a0_i = function () {
		var t = new eui.Image();
		this.a0 = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto.n0_i = function () {
		var t = new eui.Image();
		this.n0 = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.right = 0;
		t.source = "red";
		t.top = 0;
		t.visible = false;
		return t;
	};
	return MainBtnSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/TabBtnSkin1.exml'] = window.TabBtnSkin1 = (function (_super) {
	__extends(TabBtnSkin1, _super);
	function TabBtnSkin1() {
		_super.call(this);
		this.skinParts = ["selectIcon","iconDisplay","textDisplay","red"];
		
		this.height = 76;
		this.width = 170;
		this.elementsContent = [this._Image1_i(),this.selectIcon_i(),this.iconDisplay_i(),this.textDisplay_i(),this.red_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","anniu_10"),
					new eui.SetProperty("selectIcon","source",""),
					new eui.SetProperty("iconDisplay","source","")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","anniu_10"),
					new eui.SetProperty("selectIcon","source","anniu_30"),
					new eui.SetProperty("iconDisplay","horizontalCenter",-1.5),
					new eui.SetProperty("iconDisplay","verticalCenter",0),
					new eui.SetProperty("iconDisplay","source",""),
					new eui.SetProperty("","height",76),
					new eui.SetProperty("","width",170)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("iconDisplay","x",8),
					new eui.SetProperty("","height",76),
					new eui.SetProperty("","width",170)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.textDisplay,"text");
	}
	var _proto = TabBtnSkin1.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.pixelHitTest = true;
		t.source = "anniu_10";
		t.verticalCenter = 0;
		return t;
	};
	_proto.selectIcon_i = function () {
		var t = new eui.Image();
		this.selectIcon = t;
		t.horizontalCenter = 0;
		t.source = "anniu_30";
		t.verticalCenter = 0;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.pixelHitTest = true;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.Label();
		this.textDisplay = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 170;
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.right = 0;
		t.source = "red";
		t.top = 0;
		t.visible = false;
		return t;
	};
	return TabBtnSkin1;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/new/ToBtn000Skin.exml'] = window.ToBtn000Skin = (function (_super) {
	__extends(ToBtn000Skin, _super);
	function ToBtn000Skin() {
		_super.call(this);
		this.skinParts = ["a1","n1","a0","n0","labelDisplay","red"];
		
		this.elementsContent = [this.labelDisplay_i(),this.red_i()];
		this.a1_i();
		
		this.n1_i();
		
		this.a0_i();
		
		this.n0_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("a0","",2,"labelDisplay"),
					new eui.AddItems("n0","",2,"labelDisplay")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("a1","",0,""),
					new eui.AddItems("n1","",2,"labelDisplay")
				])
		];
	}
	var _proto = ToBtn000Skin.prototype;

	_proto.a1_i = function () {
		var t = new eui.Image();
		this.a1 = t;
		t.horizontalCenter = 0;
		t.source = "anniu_30";
		t.verticalCenter = 0;
		return t;
	};
	_proto.n1_i = function () {
		var t = new eui.Image();
		this.n1 = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto.a0_i = function () {
		var t = new eui.Image();
		this.a0 = t;
		t.horizontalCenter = 0;
		t.source = "anniu_10";
		t.verticalCenter = 0;
		return t;
	};
	_proto.n0_i = function () {
		var t = new eui.Image();
		this.n0 = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.right = -16;
		t.source = "red";
		t.top = -16;
		t.visible = false;
		return t;
	};
	return ToBtn000Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn20Skin.exml'] = window.Btn20Skin = (function (_super) {
	__extends(Btn20Skin, _super);
	function Btn20Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","mb_1")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","x",1),
					new eui.SetProperty("_Image4","y",1),
					new eui.SetProperty("_Image4","source","mb_10"),
					new eui.SetProperty("_Image4","top",1)
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","source","mb_1")
				])
		];
	}
	var _proto = Btn20Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "mb_1";
		t.top = 0;
		return t;
	};
	return Btn20Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn21Skin.exml'] = window.Btn21Skin = (function (_super) {
	__extends(Btn21Skin, _super);
	function Btn21Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_2")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","mb_20")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_2")
				])
		];
	}
	var _proto = Btn21Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "mb_2";
		return t;
	};
	return Btn21Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn22Skin.exml'] = window.Btn22Skin = (function (_super) {
	__extends(Btn22Skin, _super);
	function Btn22Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_3")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","mb_30")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_3")
				])
		];
	}
	var _proto = Btn22Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "mb_3";
		return t;
	};
	return Btn22Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn23Skin.exml'] = window.Btn23Skin = (function (_super) {
	__extends(Btn23Skin, _super);
	function Btn23Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_4")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","mb_40")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_4")
				])
		];
	}
	var _proto = Btn23Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "mb_4";
		return t;
	};
	return Btn23Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn24Skin.exml'] = window.Btn24Skin = (function (_super) {
	__extends(Btn24Skin, _super);
	function Btn24Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_5")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","mb_50")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_5")
				])
		];
	}
	var _proto = Btn24Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "mb_5";
		return t;
	};
	return Btn24Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn25Skin.exml'] = window.Btn25Skin = (function (_super) {
	__extends(Btn25Skin, _super);
	function Btn25Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_6")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","mb_60")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_6")
				])
		];
	}
	var _proto = Btn25Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "mb_6";
		return t;
	};
	return Btn25Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn26Skin.exml'] = window.Btn26Skin = (function (_super) {
	__extends(Btn26Skin, _super);
	function Btn26Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_7")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","mb_70")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_7")
				])
		];
	}
	var _proto = Btn26Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "mb_7";
		return t;
	};
	return Btn26Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn27Skin.exml'] = window.Btn27Skin = (function (_super) {
	__extends(Btn27Skin, _super);
	function Btn27Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_8")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","mb_80")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","mb_8")
				])
		];
	}
	var _proto = Btn27Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "mb_8";
		return t;
	};
	return Btn27Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn28Skin.exml'] = window.Btn28Skin = (function (_super) {
	__extends(Btn28Skin, _super);
	function Btn28Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","c")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","c1")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","c")
				])
		];
	}
	var _proto = Btn28Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "c";
		return t;
	};
	return Btn28Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn29Skin.exml'] = window.Btn29Skin = (function (_super) {
	__extends(Btn29Skin, _super);
	function Btn29Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","gn_0007_组-115")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","gn_0007_组-116")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","gn_0007_组-115")
				])
		];
	}
	var _proto = Btn29Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "gn_0007_组-115";
		return t;
	};
	return Btn29Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn30Skin.exml'] = window.Btn30Skin = (function (_super) {
	__extends(Btn30Skin, _super);
	function Btn30Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","gn_0007_组-117")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","gn_0007_组-118")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","gn_0007_组-117")
				])
		];
	}
	var _proto = Btn30Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "gn_0007_组-117";
		return t;
	};
	return Btn30Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn31Skin.exml'] = window.Btn31Skin = (function (_super) {
	__extends(Btn31Skin, _super);
	function Btn31Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","gn_0007_组-119")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","gn_0007_组-120")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","gn_0007_组-119")
				])
		];
	}
	var _proto = Btn31Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "gn_0007_组-117";
		return t;
	};
	return Btn31Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn32Skin.exml'] = window.Btn32Skin = (function (_super) {
	__extends(Btn32Skin, _super);
	function Btn32Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","gn_0007_组-121")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","gn_0007_组-122")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","gn_0007_组-121")
				])
		];
	}
	var _proto = Btn32Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "tb_dikuang_1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "gn_0007_组-121";
		return t;
	};
	return Btn32Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/btn/system/Btn33Skin.exml'] = window.Btn33Skin = (function (_super) {
	__extends(Btn33Skin, _super);
	function Btn33Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image4_i()];
		this._Image1_i();
		
		this._Image2_i();
		
		this._Image3_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Image2","",2,"_Image4"),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","f")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image3","",2,"_Image4"),
					new eui.SetProperty("_Image4","source","f1")
				])
			,
			new eui.State ("disabled",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.SetProperty("_Image4","top",0),
					new eui.SetProperty("_Image4","source","f")
				])
		];
	}
	var _proto = Btn33Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "f";
		return t;
	};
	return Btn33Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Microsoft YaHei";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkinII.exml'] = window.ProgressBarSkinII = (function (_super) {
	__extends(ProgressBarSkinII, _super);
	function ProgressBarSkinII() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkinII.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "jdt_png";
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(77,4,469,27);
		t.source = "jdt1_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "10/100";
		t.textAlign = "center";
		t.textColor = 0x0921f4;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	return ProgressBarSkinII;
})(eui.Skin);generateEUI.paths['resource/eui_skins/LoadUISkinII.exml'] = window.LoadUISkinII = (function (_super) {
	__extends(LoadUISkinII, _super);
	function LoadUISkinII() {
		_super.call(this);
		this.skinParts = ["pro"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this.pro_i(),this._Label1_i()];
	}
	var _proto = LoadUISkinII.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1334;
		t.horizontalCenter = 0;
		t.source = "newBg02_jpg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.pro_i = function () {
		var t = new eui.ProgressBar();
		this.pro = t;
		t.horizontalCenter = 0;
		t.skinName = "ProgressBarSkinII";
		t.value = 0;
		t.verticalCenter = 517.5;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.horizontalCenter = 0;
		t.text = "努力加载中...";
		t.textColor = 0xf40913;
		t.y = 1216;
		return t;
	};
	return LoadUISkinII;
})(eui.Skin);generateEUI.paths['resource/eui_skins/login/newTextInputSkin.exml'] = window.newTextInputSkin = (function (_super) {
	__extends(newTextInputSkin, _super);
	function newTextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.height = 50;
		this.width = 420;
		this.elementsContent = [this._Image1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,""),
					new eui.SetProperty("textDisplay","size",30),
					new eui.SetProperty("textDisplay","textColor",0xffffff),
					new eui.SetProperty("promptDisplay","verticalCenter",0),
					new eui.SetProperty("promptDisplay","text","")
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,""),
					new eui.SetProperty("textDisplay","text",""),
					new eui.SetProperty("textDisplay","size",30),
					new eui.SetProperty("textDisplay","textColor",0xffffff),
					new eui.SetProperty("promptDisplay","text",""),
					new eui.SetProperty("promptDisplay","verticalCenter",0)
				])
		];
	}
	var _proto = newTextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(136,19,65,15);
		t.source = "create07";
		t.verticalCenter = 0;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 53;
		t.left = "0";
		t.right = "0";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.left = 0;
		t.right = 0;
		t.size = 30;
		t.text = "23232";
		t.textAlign = "center";
		t.textColor = 0xA9A9A9;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return newTextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/login/createRoleSkin.exml'] = window.createRoleSkin = (function (_super) {
	__extends(createRoleSkin, _super);
	var createRoleSkin$Skin1 = 	(function (_super) {
		__extends(createRoleSkin$Skin1, _super);
		function createRoleSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","create06")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = createRoleSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "create05";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return createRoleSkin$Skin1;
	})(eui.Skin);

	var createRoleSkin$Skin2 = 	(function (_super) {
		__extends(createRoleSkin$Skin2, _super);
		function createRoleSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = createRoleSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "create08";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return createRoleSkin$Skin2;
	})(eui.Skin);

	var createRoleSkin$Skin3 = 	(function (_super) {
		__extends(createRoleSkin$Skin3, _super);
		function createRoleSkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","sex11")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = createRoleSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "sex1";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return createRoleSkin$Skin3;
	})(eui.Skin);

	var createRoleSkin$Skin4 = 	(function (_super) {
		__extends(createRoleSkin$Skin4, _super);
		function createRoleSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","sex22")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = createRoleSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "sex2";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return createRoleSkin$Skin4;
	})(eui.Skin);

	function createRoleSkin() {
		_super.call(this);
		this.skinParts = ["b1","b2","b3","b4","t1","b5","role","b6","b7"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this.b1_i(),this.b2_i(),this.b3_i(),this.b4_i(),this.t1_i(),this.b5_i(),this.role_i(),this._Group1_i(),this.b6_i(),this.b7_i()];
	}
	var _proto = createRoleSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1334;
		t.source = "create04_png";
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.b1_i = function () {
		var t = new eui.Button();
		this.b1 = t;
		t.label = "";
		t.left = 50;
		t.visible = false;
		t.y = 815;
		return t;
	};
	_proto.b2_i = function () {
		var t = new eui.Button();
		this.b2 = t;
		t.horizontalCenter = 0.5;
		t.label = "";
		t.visible = false;
		t.y = 815;
		return t;
	};
	_proto.b3_i = function () {
		var t = new eui.Button();
		this.b3 = t;
		t.label = "";
		t.right = 50;
		t.visible = false;
		t.y = 815;
		return t;
	};
	_proto.b4_i = function () {
		var t = new eui.Button();
		this.b4 = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 1073;
		t.skinName = createRoleSkin$Skin1;
		return t;
	};
	_proto.t1_i = function () {
		var t = new eui.TextInput();
		this.t1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.skinName = "newTextInputSkin";
		t.y = 978;
		return t;
	};
	_proto.b5_i = function () {
		var t = new eui.Button();
		this.b5 = t;
		t.anchorOffsetX = 0;
		t.label = "";
		t.x = 537;
		t.y = 984;
		t.skinName = createRoleSkin$Skin2;
		return t;
	};
	_proto.role_i = function () {
		var t = new eui.Image();
		this.role = t;
		t.horizontalCenter = 5;
		t.source = "";
		t.verticalCenter = -150;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 200;
		t.visible = false;
		t.width = 430;
		t.x = 270;
		t.y = 806;
		t.elementsContent = [this._Rect1_i(),this._Label1_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.8;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "敬请期待";
		t.textAlign = "center";
		t.verticalCenter = 0;
		return t;
	};
	_proto.b6_i = function () {
		var t = new eui.ToggleButton();
		this.b6 = t;
		t.horizontalCenter = -90;
		t.label = "";
		t.y = 829;
		t.skinName = createRoleSkin$Skin3;
		return t;
	};
	_proto.b7_i = function () {
		var t = new eui.ToggleButton();
		this.b7 = t;
		t.horizontalCenter = 90;
		t.label = "";
		t.y = 833;
		t.skinName = createRoleSkin$Skin4;
		return t;
	};
	return createRoleSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin1.exml'] = window.skins.TextInputSkin1 = (function (_super) {
	__extends(TextInputSkin1, _super);
	function TextInputSkin1() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin1.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(19,20,13,11);
		t.source = "";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.bottom = "8";
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.top = "8";
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.bottom = 8;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.top = 8;
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin1;
})(eui.Skin);generateEUI.paths['resource/eui_skins/login/loginViewSkin.exml'] = window.loginViewSkin = (function (_super) {
	__extends(loginViewSkin, _super);
	var loginViewSkin$Skin5 = 	(function (_super) {
		__extends(loginViewSkin$Skin5, _super);
		function loginViewSkin$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","login01")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = loginViewSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "login0";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return loginViewSkin$Skin5;
	})(eui.Skin);

	function loginViewSkin() {
		_super.call(this);
		this.skinParts = ["t1","t2","b1"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this._Group3_i(),this._Image4_i()];
	}
	var _proto = loginViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1334;
		t.source = "newBg01_jpg";
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0.5;
		t.y = 1000;
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this.b1_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 0;
		t.elementsContent = [this.t1_i(),this._Image2_i()];
		return t;
	};
	_proto.t1_i = function () {
		var t = new eui.TextInput();
		this.t1 = t;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.skinName = "skins.TextInputSkin1";
		t.verticalCenter = 0.5;
		t.width = 200;
		t.x = 127;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "1_0000_ 1";
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 78;
		t.elementsContent = [this.t2_i(),this._Image3_i()];
		return t;
	};
	_proto.t2_i = function () {
		var t = new eui.TextInput();
		this.t2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.skinName = "skins.TextInputSkin1";
		t.verticalCenter = 0;
		t.width = 200;
		t.x = 127;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "1_0000_ 2";
		return t;
	};
	_proto.b1_i = function () {
		var t = new eui.Button();
		this.b1 = t;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 174;
		t.skinName = loginViewSkin$Skin5;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "";
		t.y = 147;
		return t;
	};
	return loginViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/login/selectLoginSkin.exml'] = window.selectLoginSkin = (function (_super) {
	__extends(selectLoginSkin, _super);
	var selectLoginSkin$Skin6 = 	(function (_super) {
		__extends(selectLoginSkin$Skin6, _super);
		function selectLoginSkin$Skin6() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","login01")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = selectLoginSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "login0";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return selectLoginSkin$Skin6;
	})(eui.Skin);

	function selectLoginSkin() {
		_super.call(this);
		this.skinParts = ["b1","bg","l1","r","r0","l","da","l2","l0","g0"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.b1_i(),this.bg_i(),this.l1_i(),this._Label1_i(),this.g0_i()];
	}
	var _proto = selectLoginSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1334;
		t.source = "newBg01_jpg";
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "";
		t.y = 147;
		return t;
	};
	_proto.b1_i = function () {
		var t = new eui.Button();
		this.b1 = t;
		t.horizontalCenter = 0.5;
		t.label = "";
		t.y = 1193;
		t.skinName = selectLoginSkin$Skin6;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = 0.5;
		t.source = "login03";
		t.y = 1115;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 52;
		t.horizontalCenter = -1.5;
		t.size = 35;
		t.text = "选择服务";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.width = 353;
		t.y = 1113;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.italic = false;
		t.size = 20;
		t.stroke = 0.5;
		t.text = "选择服务器";
		t.textColor = 0x07fc10;
		t.touchEnabled = false;
		t.x = 553;
		t.y = 1136;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.anchorOffsetY = 0;
		t.height = 1040;
		t.visible = false;
		t.width = 750;
		t.x = 0;
		t.y = 48;
		t.elementsContent = [this.r_i(),this.r0_i(),this.l_i(),this._Label2_i(),this._Group2_i(),this._Group5_i()];
		return t;
	};
	_proto.r_i = function () {
		var t = new eui.Rect();
		this.r = t;
		t.bottom = -294;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.top = -48;
		return t;
	};
	_proto.r0_i = function () {
		var t = new eui.Image();
		this.r0 = t;
		t.bottom = 0;
		t.horizontalCenter = 176.5;
		t.scale9Grid = new egret.Rectangle(318,67,35,12);
		t.source = "em14";
		t.top = 0;
		return t;
	};
	_proto.l_i = function () {
		var t = new eui.Image();
		this.l = t;
		t.bottom = 0;
		t.horizontalCenter = -176.5;
		t.scale9Grid = new egret.Rectangle(318,67,35,12);
		t.scaleX = -1;
		t.source = "em14";
		t.top = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0;
		t.text = "服务器列表";
		t.textAlign = "center";
		t.textColor = 0x774919;
		t.y = 12;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 799;
		t.left = 50;
		t.right = 50;
		t.y = 200;
		t.elementsContent = [this._Image3_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(18,21,9,8);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dikuang_ggg";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 20;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.scrollPolicyV = "on";
		t.top = 20;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = -1;
		t.elementsContent = [this.da_i()];
		return t;
	};
	_proto.da_i = function () {
		var t = new eui.DataGroup();
		this.da = t;
		t.itemRenderer = serverDataRender;
		t.itemRendererSkinName = serverDataRenderskin;
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.x = 80;
		t.y = 74;
		t.elementsContent = [this._Label3_i(),this._Group3_i(),this._Label4_i(),this._Group4_i()];
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "最后登陆";
		t.textColor = 0xf73500;
		t.x = 25;
		t.y = 5;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 40;
		t.elementsContent = [this._Image4_i(),this.l2_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login05";
		t.y = 0;
		return t;
	};
	_proto.l2_i = function () {
		var t = new eui.Label();
		this.l2 = t;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.horizontalCenter = 0;
		t.rotation = 360;
		t.scaleX = 1;
		t.scaleY = 1;
		t.stroke = 0.5;
		t.text = "xxxx";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 250;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "推荐";
		t.textColor = 0x07f752;
		t.x = 350;
		t.y = 4;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 323;
		t.y = 40;
		t.elementsContent = [this._Image5_i(),this.l0_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login05";
		t.y = 0;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.horizontalCenter = 0;
		t.rotation = 360;
		t.scaleX = 1;
		t.scaleY = 1;
		t.stroke = 0.5;
		t.text = "xxxx";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.width = 250;
		return t;
	};
	return selectLoginSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/login/serverDataRenderskin.exml'] = window.serverDataRenderskin = (function (_super) {
	__extends(serverDataRenderskin, _super);
	function serverDataRenderskin() {
		_super.call(this);
		this.skinParts = ["l1","l0"];
		
		this.height = 67;
		this.width = 636;
		this.elementsContent = [this._Image1_i(),this.l1_i(),this.l0_i()];
	}
	var _proto = serverDataRenderskin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(79,8,478,34);
		t.source = "login06";
		t.verticalCenter = 0;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Image();
		this.l1 = t;
		t.right = 51;
		t.source = "火爆";
		t.verticalCenter = 0;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.size = 28;
		t.stroke = 0.5;
		t.text = "Label";
		t.verticalCenter = 0;
		t.width = 480;
		t.x = 28;
		return t;
	};
	return serverDataRenderskin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.width = 298;
		this.elementsContent = [this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "03";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(19,20,13,11);
		t.source = "dikuang_ggg";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.visible = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.bottom = "8";
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.top = "8";
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.bottom = 8;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.top = 8;
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/activity/ActivityItemSkin.exml'] = window.ActivityItemSkin = (function (_super) {
	__extends(ActivityItemSkin, _super);
	function ActivityItemSkin() {
		_super.call(this);
		this.skinParts = ["bg","timeBg","title","dg","btn0","btn"];
		
		this.height = 217;
		this.width = 650;
		this.elementsContent = [this.bg_i(),this.timeBg_i(),this.title_i(),this.dg_i(),this.btn0_i(),this.btn_i()];
	}
	var _proto = ActivityItemSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(32,27,2,5);
		t.source = "kuang_jgg11";
		t.top = 22;
		return t;
	};
	_proto.timeBg_i = function () {
		var t = new eui.Image();
		this.timeBg = t;
		t.anchorOffsetX = 0;
		t.source = "huodong2";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Label();
		this.title = t;
		t.anchorOffsetX = 0;
		t.size = 24;
		t.text = "Label";
		t.x = 21.5;
		t.y = 16.5;
		return t;
	};
	_proto.dg_i = function () {
		var t = new eui.DataGroup();
		this.dg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 134;
		t.verticalCenter = 16.5;
		t.width = 436;
		t.x = 15;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.enabled = false;
		t.label = "未达标";
		t.skinName = "Btn005Skin";
		t.verticalCenter = 0;
		t.x = 456;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.enabled = false;
		t.label = "未 达 标";
		t.skinName = "Btn005Skin";
		t.verticalCenter = 0;
		t.x = 456;
		return t;
	};
	return ActivityItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/activity/ActivityPanelSkin.exml'] = window.ActivityPanelSkin = (function (_super) {
	__extends(ActivityPanelSkin, _super);
	function ActivityPanelSkin() {
		_super.call(this);
		this.skinParts = ["bg","dg"];
		
		this.height = 960;
		this.width = 650;
		this.elementsContent = [this.bg_i(),this._Scroller1_i()];
	}
	var _proto = ActivityPanelSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.top = 209;
		t.width = 650;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.dg_i()];
		return t;
	};
	_proto.dg_i = function () {
		var t = new eui.DataGroup();
		this.dg = t;
		t.itemRendererSkinName = ActivityItemSkin;
		t.scaleX = 1;
		t.scaleY = 1;
		return t;
	};
	return ActivityPanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/Win0Skin.exml'] = window.Win0Skin = (function (_super) {
	__extends(Win0Skin, _super);
	var Win0Skin$Skin7 = 	(function (_super) {
		__extends(Win0Skin$Skin7, _super);
		function Win0Skin$Skin7() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","gb_2")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = Win0Skin$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "gb_1";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return Win0Skin$Skin7;
	})(eui.Skin);

	var Win0Skin$Skin8 = 	(function (_super) {
		__extends(Win0Skin$Skin8, _super);
		function Win0Skin$Skin8() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","re11")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = Win0Skin$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "re00";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return Win0Skin$Skin8;
	})(eui.Skin);

	function Win0Skin() {
		_super.call(this);
		this.skinParts = ["tt","newCloseBtn","newCloseBtn01","newCloseBtn00"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this._Group1_i(),this.newCloseBtn01_i(),this.newCloseBtn00_i()];
	}
	var _proto = Win0Skin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.fillAlpha = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 111;
		t.horizontalCenter = 0;
		t.top = 61;
		t.width = 750;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.tt_i(),this.newCloseBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(93,120,283,6);
		t.scaleX = -1;
		t.source = "da-ditu";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.right = -1;
		t.scale9Grid = new egret.Rectangle(93,120,283,5);
		t.source = "da-ditu";
		t.top = 0;
		return t;
	};
	_proto.tt_i = function () {
		var t = new eui.Image();
		this.tt = t;
		t.horizontalCenter = 0;
		t.y = 9;
		return t;
	};
	_proto.newCloseBtn_i = function () {
		var t = new eui.Button();
		this.newCloseBtn = t;
		t.label = "";
		t.visible = false;
		t.x = 653;
		t.y = 0;
		t.skinName = Win0Skin$Skin7;
		return t;
	};
	_proto.newCloseBtn01_i = function () {
		var t = new eui.Button();
		this.newCloseBtn01 = t;
		t.bottom = 133;
		t.horizontalCenter = 314;
		t.label = "";
		t.skinName = Win0Skin$Skin8;
		return t;
	};
	_proto.newCloseBtn00_i = function () {
		var t = new eui.Button();
		this.newCloseBtn00 = t;
		t.horizontalCenter = 313.5;
		t.label = "";
		t.skinName = "CloseBtn00";
		t.y = 60;
		return t;
	};
	return Win0Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/activity/InvestPlanSkin.exml'] = window.InvestPlanSkin = (function (_super) {
	__extends(InvestPlanSkin, _super);
	function InvestPlanSkin() {
		_super.call(this);
		this.skinParts = ["bg","getBtn","dg"];
		
		this.height = 977;
		this.width = 650;
		this.elementsContent = [this.bg_i(),this._Label1_i(),this.getBtn_i(),this._Scroller1_i()];
	}
	var _proto = InvestPlanSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.top = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "500钻石";
		t.textColor = 0xff118b;
		t.y = 108;
		return t;
	};
	_proto.getBtn_i = function () {
		var t = new eui.Button();
		this.getBtn = t;
		t.horizontalCenter = 0;
		t.icon = "购买";
		t.label = "";
		t.skinName = "Btn005Skin";
		t.y = 138;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.top = 209;
		t.width = 650;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.dg_i()];
		return t;
	};
	_proto.dg_i = function () {
		var t = new eui.DataGroup();
		this.dg = t;
		t.itemRendererSkinName = ActivityItemSkin;
		t.scaleX = 1;
		t.scaleY = 1;
		return t;
	};
	return InvestPlanSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/activity/CdKeySkin.exml'] = window.CdKeySkin = (function (_super) {
	__extends(CdKeySkin, _super);
	function CdKeySkin() {
		_super.call(this);
		this.skinParts = ["btn","txt"];
		
		this.height = 960;
		this.width = 650;
		this.elementsContent = [this.btn_i(),this.txt_i()];
	}
	var _proto = CdKeySkin.prototype;

	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.horizontalCenter = 0.5;
		t.icon = "duihaun";
		t.skinName = "Btn005Skin";
		t.y = 252;
		return t;
	};
	_proto.txt_i = function () {
		var t = new eui.TextInput();
		this.txt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.horizontalCenter = -5;
		t.width = 500;
		t.y = 176;
		return t;
	};
	return CdKeySkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/activity/ActivitySkin.exml'] = window.ActivitySkin = (function (_super) {
	__extends(ActivitySkin, _super);
	function ActivitySkin() {
		_super.call(this);
		this.skinParts = ["win","tabBar","stageAward","investPlan","consumeGift","viewStack","activity"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this.activity_i()];
	}
	var _proto = ActivitySkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "fltitle";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto.activity_i = function () {
		var t = new eui.Group();
		this.activity = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1047;
		t.horizontalCenter = 0;
		t.width = 650;
		t.y = 132;
		t.elementsContent = [this._Scroller1_i(),this.viewStack_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.scrollPolicyH = "on";
		t.scrollPolicyV = "off";
		t.width = 640;
		t.x = 5;
		t.viewport = this.tabBar_i();
		return t;
	};
	_proto.tabBar_i = function () {
		var t = new eui.Group();
		this.tabBar = t;
		t.anchorOffsetY = 0;
		t.height = 66;
		t.width = 860;
		t.x = -9;
		t.y = -1;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._ToggleBtn011_i(),this._ToggleBtn012_i(),this._ToggleBtn013_i(),this._ToggleBtn014_i(),this._ToggleBtn015_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 7;
		t.horizontalAlign = "center";
		t.verticalAlign = "bottom";
		return t;
	};
	_proto._ToggleBtn011_i = function () {
		var t = new ToggleBtn01();
		t.horizontalCenter = 0;
		t.label = "";
		t.s0 = "activity3";
		t.s1 = "activity3";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.verticalCenter = 0;
		return t;
	};
	_proto._ToggleBtn012_i = function () {
		var t = new ToggleBtn01();
		t.horizontalCenter = 0;
		t.label = "";
		t.s0 = "activity2";
		t.s1 = "activity2";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.verticalCenter = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._ToggleBtn013_i = function () {
		var t = new ToggleBtn01();
		t.horizontalCenter = 0;
		t.label = "";
		t.s0 = "activity6";
		t.s1 = "activity6";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.verticalCenter = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._ToggleBtn014_i = function () {
		var t = new ToggleBtn01();
		t.horizontalCenter = 0;
		t.label = "";
		t.s0 = "activity4";
		t.s1 = "activity4";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.verticalCenter = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._ToggleBtn015_i = function () {
		var t = new ToggleBtn01();
		t.horizontalCenter = 0;
		t.label = "";
		t.s0 = "biaoqian_0004_兑换";
		t.s1 = "biaoqian_0004_兑换";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.viewStack_i = function () {
		var t = new eui.Group();
		this.viewStack = t;
		t.anchorOffsetY = 0;
		t.height = 960;
		t.horizontalCenter = 0;
		t.name = "投资计划";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 650;
		t.y = 85;
		t.elementsContent = [this._ContinueLogin1_i(),this.stageAward_i(),this.investPlan_i(),this.consumeGift_i(),this._CdKeyPanel1_i()];
		return t;
	};
	_proto._ContinueLogin1_i = function () {
		var t = new ContinueLogin();
		t.skinName = "ActivityPanelSkin";
		return t;
	};
	_proto.stageAward_i = function () {
		var t = new StageAward();
		this.stageAward = t;
		t.horizontalCenter = 0;
		t.skinName = "ActivityPanelSkin";
		t.visible = false;
		return t;
	};
	_proto.investPlan_i = function () {
		var t = new InvestPlan();
		this.investPlan = t;
		t.height = 977;
		t.horizontalCenter = 0;
		t.skinName = "InvestPlanSkin";
		t.visible = false;
		t.width = 650;
		return t;
	};
	_proto.consumeGift_i = function () {
		var t = new ConsumeGift();
		this.consumeGift = t;
		t.height = 977;
		t.horizontalCenter = 0;
		t.skinName = "ActivityPanelSkin";
		t.visible = false;
		t.width = 650;
		return t;
	};
	_proto._CdKeyPanel1_i = function () {
		var t = new CdKeyPanel();
		t.skinName = "CdKeySkin";
		return t;
	};
	return ActivitySkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/activity/FirstChargeSkin.exml'] = window.FirstChargeSkin = (function (_super) {
	__extends(FirstChargeSkin, _super);
	function FirstChargeSkin() {
		_super.call(this);
		this.skinParts = ["rc","newCloseBtn00","gd","getBtn"];
		
		this.height = 1033;
		this.width = 750;
		this.elementsContent = [this.rc_i(),this._Group1_i()];
	}
	var _proto = FirstChargeSkin.prototype;

	_proto.rc_i = function () {
		var t = new eui.Rect();
		this.rc = t;
		t.bottom = 0;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.newCloseBtn00_i(),this.gd_i(),this.getBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "首充_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.newCloseBtn00_i = function () {
		var t = new eui.Button();
		this.newCloseBtn00 = t;
		t.horizontalCenter = 278;
		t.label = "";
		t.skinName = "CloseBtn00";
		t.y = 104;
		return t;
	};
	_proto.gd_i = function () {
		var t = new eui.DataGroup();
		this.gd = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 284;
		t.width = 501;
		t.x = 126;
		t.y = 501;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "center";
		t.horizontalGap = 19;
		t.requestedColumnCount = 4;
		t.requestedRowCount = 2;
		t.verticalGap = 40;
		return t;
	};
	_proto.getBtn_i = function () {
		var t = new eui.Button();
		this.getBtn = t;
		t.label = "充 值";
		t.skinName = "Btn007Skin";
		t.x = 272;
		t.y = 868;
		return t;
	};
	return FirstChargeSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/activity/LimitCardSkin.exml'] = window.LimitCardSkin = (function (_super) {
	__extends(LimitCardSkin, _super);
	function LimitCardSkin() {
		_super.call(this);
		this.skinParts = ["rc","getOne","getTen","nextDraw"];
		
		this.height = 1033;
		this.width = 750;
		this.elementsContent = [this.rc_i(),this._Group3_i()];
	}
	var _proto = LimitCardSkin.prototype;

	_proto.rc_i = function () {
		var t = new eui.Rect();
		this.rc = t;
		t.bottom = 0;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this._Group1_i(),this._Group2_i(),this.nextDraw_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "月卡1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 90;
		t.y = 448;
		t.elementsContent = [this.getOne_i(),this._Label1_i()];
		return t;
	};
	_proto.getOne_i = function () {
		var t = new eui.Button();
		this.getOne = t;
		t.icon = "";
		t.label = "抽1次";
		t.skinName = "Btn007Skin";
		t.x = 0;
		t.y = 42;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "50钻石 ";
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 392;
		t.y = 448;
		t.elementsContent = [this.getTen_i(),this._Label2_i()];
		return t;
	};
	_proto.getTen_i = function () {
		var t = new eui.Button();
		this.getTen = t;
		t.icon = "";
		t.label = "抽10次";
		t.skinName = "Btn007Skin";
		t.x = 0;
		t.y = 43;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "450钻石 ";
		t.y = 0;
		return t;
	};
	_proto.nextDraw_i = function () {
		var t = new eui.Label();
		this.nextDraw = t;
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.text = "祝君好运!";
		t.textColor = 0x41fc05;
		t.y = 598;
		return t;
	};
	return LimitCardSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/bag/ItemIconSkin.exml'] = window.ItemIconSkin = (function (_super) {
	__extends(ItemIconSkin, _super);
	function ItemIconSkin() {
		_super.call(this);
		this.skinParts = ["imgBg","imgIcon","eff"];
		
		this.height = 110;
		this.width = 110;
		this.elementsContent = [this.imgBg_i(),this.imgIcon_i(),this.eff_i()];
	}
	var _proto = ItemIconSkin.prototype;

	_proto.imgBg_i = function () {
		var t = new eui.Image();
		this.imgBg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(41,44,19,16);
		t.source = "quality_10";
		t.top = 0;
		return t;
	};
	_proto.imgIcon_i = function () {
		var t = new eui.Image();
		this.imgIcon = t;
		t.height = 90;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 90;
		return t;
	};
	_proto.eff_i = function () {
		var t = new eui.Group();
		this.eff = t;
		t.bottom = -9;
		t.horizontalCenter = 0;
		return t;
	};
	return ItemIconSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/bag/BaseItemSkin.exml'] = window.BaseItemSkin = (function (_super) {
	__extends(BaseItemSkin, _super);
	function BaseItemSkin() {
		_super.call(this);
		this.skinParts = ["itemIcon","imgBg","labCount","labName","jie"];
		
		this.elementsContent = [this.itemIcon_i(),this.imgBg_i(),this.labCount_i(),this.labName_i(),this.jie_i()];
	}
	var _proto = BaseItemSkin.prototype;

	_proto.itemIcon_i = function () {
		var t = new ItemIcon();
		this.itemIcon = t;
		t.skinName = "ItemIconSkin";
		return t;
	};
	_proto.imgBg_i = function () {
		var t = new eui.Image();
		this.imgBg = t;
		t.source = "";
		return t;
	};
	_proto.labCount_i = function () {
		var t = new eui.Label();
		this.labCount = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "KaiTi";
		t.size = 22;
		t.text = "";
		t.textAlign = "right";
		t.textColor = 0xffffff;
		t.width = 70;
		t.x = 32;
		t.y = 82;
		return t;
	};
	_proto.labName_i = function () {
		var t = new eui.Label();
		this.labName = t;
		t.anchorOffsetX = 0;
		t.background = false;
		t.backgroundColor = 0xbbbca2;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.stroke = 2;
		t.strokeColor = 0x894e2a;
		t.text = "";
		t.textAlign = "center";
		t.width = 110;
		t.y = 112;
		return t;
	};
	_proto.jie_i = function () {
		var t = new eui.Label();
		this.jie = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.size = 22;
		t.stroke = 1;
		t.text = "";
		t.textAlign = "right";
		t.textColor = 0xff07db;
		t.touchEnabled = false;
		t.width = 73;
		t.x = 32;
		t.y = 7;
		return t;
	};
	return BaseItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/activity/MonthCardSkin.exml'] = window.MonthCardSkin = (function (_super) {
	__extends(MonthCardSkin, _super);
	function MonthCardSkin() {
		_super.call(this);
		this.skinParts = ["rc","left_text","getBtn","buyBtn","it","gd","newCloseBtn00"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.rc_i(),this._Group1_i()];
	}
	var _proto = MonthCardSkin.prototype;

	_proto.rc_i = function () {
		var t = new eui.Rect();
		this.rc = t;
		t.bottom = 0;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.left_text_i(),this._Label1_i(),this.getBtn_i(),this.buyBtn_i(),this.it_i(),this.gd_i(),this.newCloseBtn00_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "月卡13_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.left_text_i = function () {
		var t = new eui.Label();
		this.left_text = t;
		t.fontFamily = "KaiTi";
		t.text = "剩余天数";
		t.textColor = 0xf90f04;
		t.x = 492;
		t.y = 918.99;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "KaiTi";
		t.size = 24;
		t.text = "每日额外领取";
		t.textColor = 0x13fc07;
		t.x = 82.92;
		t.y = 882.38;
		return t;
	};
	_proto.getBtn_i = function () {
		var t = new eui.Button();
		this.getBtn = t;
		t.enabled = false;
		t.label = "未 达 成";
		t.skinName = "Btn005Skin";
		t.x = 468.61;
		t.y = 969.1;
		return t;
	};
	_proto.buyBtn_i = function () {
		var t = new eui.Button();
		this.buyBtn = t;
		t.icon = "";
		t.label = "购  买";
		t.skinName = "Btn005Skin";
		t.x = 288.76;
		t.y = 774.21;
		return t;
	};
	_proto.it_i = function () {
		var t = new BaseItem();
		this.it = t;
		t.skinName = "BaseItemSkin";
		t.x = 92.76;
		t.y = 917.21;
		return t;
	};
	_proto.gd_i = function () {
		var t = new eui.DataGroup();
		this.gd = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 150;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = BaseItemSkin;
		t.y = 604.74;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto.newCloseBtn00_i = function () {
		var t = new eui.Button();
		this.newCloseBtn00 = t;
		t.label = "";
		t.skinName = "CloseBtn00";
		t.x = 638;
		t.y = 50;
		return t;
	};
	return MonthCardSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/artifact/ArtifactAttrTypeSkin.exml'] = window.ArtifactAttrTypeSkin = (function (_super) {
	__extends(ArtifactAttrTypeSkin, _super);
	function ArtifactAttrTypeSkin() {
		_super.call(this);
		this.skinParts = ["labTile","dg"];
		
		this.height = 450;
		this.width = 310;
		this.elementsContent = [this._Image1_i(),this.labTile_i(),this._Scroller1_i()];
	}
	var _proto = ArtifactAttrTypeSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "组-138";
		t.top = 0;
		return t;
	};
	_proto.labTile_i = function () {
		var t = new eui.Label();
		this.labTile = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "当前属性加成";
		t.textAlign = "left";
		t.y = 16;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 386;
		t.horizontalCenter = 0;
		t.width = 314;
		t.y = 58;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.dg_i()];
		return t;
	};
	_proto.dg_i = function () {
		var t = new eui.DataGroup();
		this.dg = t;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnWidth = 220;
		t.requestedColumnCount = 1;
		return t;
	};
	return ArtifactAttrTypeSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/artifact/ArtifactItemSkin.exml'] = window.ArtifactItemSkin = (function (_super) {
	__extends(ArtifactItemSkin, _super);
	function ArtifactItemSkin() {
		_super.call(this);
		this.skinParts = ["itemIcon"];
		
		this.height = 128;
		this.width = 128;
		this.elementsContent = [this.itemIcon_i()];
	}
	var _proto = ArtifactItemSkin.prototype;

	_proto.itemIcon_i = function () {
		var t = new ItemIcon();
		this.itemIcon = t;
		t.horizontalCenter = 0;
		t.skinName = "ItemIconSkin";
		t.verticalCenter = 0;
		return t;
	};
	return ArtifactItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/artifact/ArtifactSkin.exml'] = window.ArtifactSkin = (function (_super) {
	__extends(ArtifactSkin, _super);
	function ArtifactSkin() {
		_super.call(this);
		this.skinParts = ["win","aft","panel1","panel2","itemList","itemScroller","gb","labNo","artNameImg","labNeed","btns"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Image1_i(),this.aft_i(),this._Group1_i(),this.gb_i(),this.labNo_i(),this.artNameImg_i(),this._Group2_i(),this._Button1_i(),this._Button2_i()];
	}
	var _proto = ArtifactSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "t_3";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.source = "组-140_png";
		t.y = 134;
		return t;
	};
	_proto.aft_i = function () {
		var t = new eui.Group();
		this.aft = t;
		t.horizontalCenter = 0;
		t.y = 400;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 407;
		t.horizontalCenter = 0;
		t.width = 622;
		t.y = 501;
		t.elementsContent = [this._Image2_i(),this.panel1_i(),this.panel2_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(26,27,12,8);
		t.source = "da-ditu1";
		t.top = 47;
		return t;
	};
	_proto.panel1_i = function () {
		var t = new ArtifactAttrTypePanel();
		this.panel1 = t;
		t.bottom = 12;
		t.skinName = "ArtifactAttrTypeSkin";
		t.top = 0;
		t.x = 8;
		return t;
	};
	_proto.panel2_i = function () {
		var t = new ArtifactAttrTypePanel();
		this.panel2 = t;
		t.bottom = 12;
		t.skinName = "ArtifactAttrTypeSkin";
		t.top = 0;
		t.x = 304;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "图层-812";
		t.verticalCenter = 0;
		return t;
	};
	_proto.gb_i = function () {
		var t = new eui.Group();
		this.gb = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 286;
		t.height = 128;
		t.horizontalCenter = 0;
		t.width = 530;
		t.elementsContent = [this.itemScroller_i()];
		return t;
	};
	_proto.itemScroller_i = function () {
		var t = new eui.Scroller();
		this.itemScroller = t;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.scrollPolicyV = "off";
		t.visible = true;
		t.percentWidth = 100;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = ArtifactItemSkin;
		t.visible = true;
		t.x = -20.5;
		t.y = -97.79;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 25;
		t.paddingLeft = 5;
		t.requestedRowCount = 1;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i(),this._Object9_i(),this._Object10_i(),this._Object11_i(),this._Object12_i(),this._Object13_i(),this._Object14_i(),this._Object15_i(),this._Object16_i(),this._Object17_i(),this._Object18_i(),this._Object19_i(),this._Object20_i(),this._Object21_i(),this._Object22_i(),this._Object23_i(),this._Object24_i(),this._Object25_i(),this._Object26_i(),this._Object27_i(),this._Object28_i(),this._Object29_i(),this._Object30_i(),this._Object31_i(),this._Object32_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.label = "数据1";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.label = "数据2";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object11_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object12_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object13_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object14_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object15_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object16_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object17_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object18_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object19_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object20_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object21_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object22_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object23_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object24_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object25_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object26_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object27_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object28_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object29_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object30_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object31_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object32_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto.labNo_i = function () {
		var t = new eui.Label();
		this.labNo = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = -230;
		t.text = "";
		t.textColor = 0xff0000;
		t.y = 292.33;
		return t;
	};
	_proto.artNameImg_i = function () {
		var t = new eui.Image();
		this.artNameImg = t;
		t.horizontalCenter = 0;
		t.scaleX = 1.3;
		t.scaleY = 1.3;
		t.y = 438;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 153;
		t.height = 120;
		t.horizontalCenter = 2;
		t.width = 400;
		t.elementsContent = [this.labNeed_i(),this.btns_i()];
		return t;
	};
	_proto.labNeed_i = function () {
		var t = new eui.Label();
		this.labNeed = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 25;
		t.text = "XX条件：1111111111";
		return t;
	};
	_proto.btns_i = function () {
		var t = new eui.Button();
		this.btns = t;
		t.horizontalCenter = 1;
		t.icon = "激活";
		t.label = "";
		t.skinName = "Btn003Skin";
		t.y = 40;
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.bottom = 306;
		t.horizontalCenter = -300;
		t.label = "";
		t.scaleX = -1;
		t.skinName = "Btn006Skin";
		return t;
	};
	_proto._Button2_i = function () {
		var t = new eui.Button();
		t.bottom = 306;
		t.horizontalCenter = 300;
		t.label = "";
		t.skinName = "Btn006Skin";
		return t;
	};
	return ArtifactSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/bag/BagSkin.exml'] = window.BagSkin = (function (_super) {
	__extends(BagSkin, _super);
	function BagSkin() {
		_super.call(this);
		this.skinParts = ["win","smeltBtn","btn0","btn1","btn2","itemList","itemScroller","group","viewStack"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this.smeltBtn_i(),this._Group1_i(),this._Group2_i()];
	}
	var _proto = BagSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "beibao11";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto.smeltBtn_i = function () {
		var t = new eui.Button();
		this.smeltBtn = t;
		t.bottom = 163;
		t.horizontalCenter = 0.5;
		t.icon = "熔炼";
		t.skinName = "Btn002Skin";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.top = 148;
		t.elementsContent = [this.btn0_i(),this.btn1_i(),this.btn2_i()];
		return t;
	};
	_proto.btn0_i = function () {
		var t = new ToggleBtn01();
		this.btn0 = t;
		t.s0 = "装备";
		t.s1 = "装备";
		t.skinName = "ToBtn000Skin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btn1_i = function () {
		var t = new ToggleBtn01();
		this.btn1 = t;
		t.s0 = "物品";
		t.s1 = "物品";
		t.skinName = "ToBtn000Skin";
		t.x = 177;
		t.y = 0;
		return t;
	};
	_proto.btn2_i = function () {
		var t = new ToggleBtn01();
		this.btn2 = t;
		t.s0 = "宝石";
		t.s1 = "宝石";
		t.skinName = "ToBtn000Skin";
		t.x = 354;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 265;
		t.horizontalCenter = -3;
		t.top = 237;
		t.width = 660;
		t.elementsContent = [this._Image1_i(),this.viewStack_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(11,11,15,17);
		t.source = "dikuang_ggg";
		t.top = 0;
		return t;
	};
	_proto.viewStack_i = function () {
		var t = new eui.ViewStack();
		this.viewStack = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 800;
		t.horizontalCenter = 0;
		t.selectedIndex = 0;
		t.top = 16;
		t.percentWidth = 100;
		t.elementsContent = [this.group_i()];
		return t;
	};
	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.name = "Group";
		t.top = 0;
		t.visible = true;
		t.width = 660;
		t.x = 0;
		t.elementsContent = [this.itemScroller_i()];
		return t;
	};
	_proto.itemScroller_i = function () {
		var t = new eui.Scroller();
		this.itemScroller = t;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.top = 0;
		t.visible = true;
		t.width = 630;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = ItemIconSkin;
		t.visible = true;
		t.percentWidth = 100;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 20;
		t.requestedColumnCount = 5;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i(),this._Object9_i(),this._Object10_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.label = "数据1";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.label = "数据2";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	return BagSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/bag/SmeltItemSkin.exml'] = window.SmeltItemSkin = (function (_super) {
	__extends(SmeltItemSkin, _super);
	function SmeltItemSkin() {
		_super.call(this);
		this.skinParts = ["item","selectGr"];
		
		this.elementsContent = [this.item_i(),this.selectGr_i()];
	}
	var _proto = SmeltItemSkin.prototype;

	_proto.item_i = function () {
		var t = new BaseItem();
		this.item = t;
		t.name = "item";
		t.skinName = "BaseItemSkin";
		return t;
	};
	_proto.selectGr_i = function () {
		var t = new eui.Group();
		this.selectGr = t;
		t.horizontalCenter = 0;
		t.scaleX = 1.3;
		t.scaleY = 1.3;
		t.verticalCenter = -10;
		t.elementsContent = [this._Image1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "gou";
		t.verticalCenter = 0;
		return t;
	};
	return SmeltItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/bag/SmeltSkin.exml'] = window.SmeltSkin = (function (_super) {
	__extends(SmeltSkin, _super);
	function SmeltSkin() {
		_super.call(this);
		this.skinParts = ["win","itemList","itemScroller","group","viewStack","box0","box1","box2","box3","box4","box5","userItem","smaltItem","smeltBtn"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Group1_i(),this._Group8_i(),this._Group9_i(),this._Group10_i()];
	}
	var _proto = SmeltSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "图层-12";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 561;
		t.horizontalCenter = 0;
		t.top = 134;
		t.elementsContent = [this._Image1_i(),this.viewStack_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 639;
		t.scale9Grid = new egret.Rectangle(11,11,21,20);
		t.source = "dikuang_ggg";
		t.width = 634;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.viewStack_i = function () {
		var t = new eui.ViewStack();
		this.viewStack = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 10;
		t.selectedIndex = 0;
		t.top = 10;
		t.width = 613;
		t.x = 11;
		t.elementsContent = [this.group_i()];
		return t;
	};
	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.name = "Group";
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this.itemScroller_i()];
		return t;
	};
	_proto.itemScroller_i = function () {
		var t = new eui.Scroller();
		this.itemScroller = t;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.top = 6;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.itemRendererSkinName = SmeltItemSkin;
		t.visible = true;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnWidth = 110;
		t.horizontalAlign = "center";
		t.horizontalGap = 10;
		t.paddingLeft = 0;
		t.requestedColumnCount = 5;
		t.verticalGap = 5;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i(),this._Object9_i(),this._Object10_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.label = "数据1";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.label = "数据2";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 1014;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Group2_i(),this._Group3_i(),this._Group4_i(),this._Group5_i(),this._Group6_i(),this._Group7_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.box0_i(),this._Image2_i()];
		return t;
	};
	_proto.box0_i = function () {
		var t = new eui.CheckBox();
		this.box0 = t;
		t.label = "";
		t.skinName = "CheckBox0";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "sezhi_0000s_0005_自动";
		t.x = 44;
		t.y = 9;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 118;
		t.y = 0;
		t.elementsContent = [this.box1_i(),this._Image3_i()];
		return t;
	};
	_proto.box1_i = function () {
		var t = new eui.CheckBox();
		this.box1 = t;
		t.label = "";
		t.skinName = "CheckBox0";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "sezhi_0000s_0004_绿色";
		t.x = 44;
		t.y = 9;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 228;
		t.y = 0;
		t.elementsContent = [this.box2_i(),this._Image4_i()];
		return t;
	};
	_proto.box2_i = function () {
		var t = new eui.CheckBox();
		this.box2 = t;
		t.label = "";
		t.skinName = "CheckBox0";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "sezhi_0000s_0003_蓝色";
		t.x = 44;
		t.y = 9;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.x = 322;
		t.y = 0;
		t.elementsContent = [this.box3_i(),this._Image5_i()];
		return t;
	};
	_proto.box3_i = function () {
		var t = new eui.CheckBox();
		this.box3 = t;
		t.label = "";
		t.skinName = "CheckBox0";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "sezhi_0000s_0001_紫色";
		t.x = 44;
		t.y = 9;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.x = 426;
		t.y = 0;
		t.elementsContent = [this.box4_i(),this._Image6_i()];
		return t;
	};
	_proto.box4_i = function () {
		var t = new eui.CheckBox();
		this.box4 = t;
		t.label = "";
		t.skinName = "CheckBox0";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "sezhi_0000s_0002_黄色";
		t.x = 44;
		t.y = 9;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.x = 540;
		t.y = 0;
		t.elementsContent = [this.box5_i(),this._Image7_i()];
		return t;
	};
	_proto.box5_i = function () {
		var t = new eui.CheckBox();
		this.box5 = t;
		t.label = "";
		t.skinName = "CheckBox0";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "sezhi_0000s_0000_暗金";
		t.x = 44;
		t.y = 9;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 201;
		t.horizontalCenter = 0;
		t.width = 634;
		t.y = 791;
		t.elementsContent = [this._Image8_i(),this._Image9_i(),this.userItem_i(),this.smaltItem_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(43,30,10,16);
		t.source = "suxing_ggg";
		t.top = 0;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "图层-812";
		t.verticalCenter = 0;
		return t;
	};
	_proto.userItem_i = function () {
		var t = new BaseItem();
		this.userItem = t;
		t.horizontalCenter = -180;
		t.skinName = "BaseItemSkin";
		t.verticalCenter = 0;
		return t;
	};
	_proto.smaltItem_i = function () {
		var t = new BaseItem();
		this.smaltItem = t;
		t.horizontalCenter = 180;
		t.skinName = "BaseItemSkin";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group10_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 164;
		t.horizontalCenter = 0.5;
		t.elementsContent = [this.smeltBtn_i()];
		return t;
	};
	_proto.smeltBtn_i = function () {
		var t = new eui.Button();
		this.smeltBtn = t;
		t.icon = "熔炼";
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "Btn002Skin";
		return t;
	};
	return SmeltSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/chat/ChatRenderSkin.exml'] = window.ChatRenderSkin = (function (_super) {
	__extends(ChatRenderSkin, _super);
	function ChatRenderSkin() {
		_super.call(this);
		this.skinParts = ["ln","ld","vipImg","vip","g0","icon"];
		
		this.height = 108;
		this.width = 420;
		this.elementsContent = [this.ln_i(),this._Image1_i(),this.ld_i(),this._Group1_i()];
	}
	var _proto = ChatRenderSkin.prototype;

	_proto.ln_i = function () {
		var t = new eui.Label();
		this.ln = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.height = 26;
		t.size = 24;
		t.text = "胜者为王:";
		t.textColor = 0x023bf9;
		t.width = 115;
		t.x = 89;
		t.y = 2;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(40,9,244,57);
		t.source = "圆角矩形-172";
		t.x = 88;
		t.y = 32;
		return t;
	};
	_proto.ld_i = function () {
		var t = new eui.Label();
		this.ld = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "KaiTi";
		t.height = 64;
		t.lineSpacing = 5;
		t.size = 24;
		t.text = "什么啊啊什什么啊啊什什么啊啊什什么啊啊什什么啊啊";
		t.textColor = 0x02fc41;
		t.width = 292;
		t.x = 114;
		t.y = 38;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.g0_i(),this._Image2_i(),this.icon_i()];
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.y = 85;
		t.elementsContent = [this.vipImg_i(),this.vip_i()];
		return t;
	};
	_proto.vipImg_i = function () {
		var t = new eui.Image();
		this.vipImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.source = "v";
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.vip_i = function () {
		var t = new eui.BitmapLabel();
		this.vip = t;
		t.font = "vipLvl_fnt";
		t.text = "10";
		t.touchEnabled = false;
		t.x = 45.75;
		t.y = 1;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "椭圆-1";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.anchorOffsetY = 0;
		t.height = 123;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.source = "";
		t.verticalCenter = -10;
		t.width = 120;
		t.x = 7;
		return t;
	};
	return ChatRenderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/chat/ChatSkin.exml'] = window.ChatSkin = (function (_super) {
	__extends(ChatSkin, _super);
	function ChatSkin() {
		_super.call(this);
		this.skinParts = ["win","txt","btn","g0"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Group1_i(),this._Group2_i()];
	}
	var _proto = ChatSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "t_3";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 1080;
		t.elementsContent = [this.txt_i(),this.btn_i()];
		return t;
	};
	_proto.txt_i = function () {
		var t = new eui.TextInput();
		this.txt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 53;
		t.verticalCenter = 0.5;
		t.width = 487;
		t.x = 0;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.label = "发送";
		t.scaleX = 0.8;
		t.scaleY = 0.9;
		t.skinName = "Btn005Skin";
		t.verticalCenter = 0;
		t.x = 492;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 264;
		t.horizontalCenter = 0.5;
		t.top = 139;
		t.width = 655;
		t.elementsContent = [this._Image1_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(11,11,15,17);
		t.source = "dikuang_ggg";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.bottom = 10;
		t.left = 10;
		t.right = 10;
		t.top = 10;
		t.viewport = this.g0_i();
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.layout = this._BasicLayout1_i();
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	return ChatSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/email/EmailMessageSkin.exml'] = window.EmailMessageSkin = (function (_super) {
	__extends(EmailMessageSkin, _super);
	function EmailMessageSkin() {
		_super.call(this);
		this.skinParts = ["btn0","l2","dg"];
		
		this.height = 500;
		this.width = 666;
		this.elementsContent = [this._Image1_i(),this.btn0_i(),this._Group1_i(),this.l2_i(),this._Group2_i(),this._Group3_i()];
	}
	var _proto = EmailMessageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(18,15,11,10);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dikuang_ggg";
		t.top = 0;
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.bottom = 11;
		t.horizontalCenter = 0;
		t.label = "领取";
		t.skinName = "Btn005Skin";
		t.visible = false;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 10;
		t.y = 20;
		t.elementsContent = [this._Image2_i(),this._Label1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scale9Grid = new egret.Rectangle(47,42,3,4);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-14";
		t.x = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 33.67;
		t.lineSpacing = 3;
		t.size = 35;
		t.text = "系统信息";
		t.textColor = 0x774919;
		t.verticalCenter = 0;
		t.width = 141;
		t.x = 42;
		return t;
	};
	_proto.l2_i = function () {
		var t = new eui.Label();
		this.l2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 109;
		t.left = 40;
		t.lineSpacing = 3;
		t.right = 40;
		t.size = 30;
		t.text = "";
		t.textColor = 0xDB0000;
		t.y = 83;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 10;
		t.y = 200;
		t.elementsContent = [this._Image3_i(),this._Label2_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scale9Grid = new egret.Rectangle(47,42,3,4);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-14";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 33.67;
		t.lineSpacing = 3;
		t.size = 35;
		t.text = "系统奖励";
		t.textColor = 0x774919;
		t.verticalCenter = 0;
		t.width = 141;
		t.x = 42;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 136;
		t.left = 40;
		t.right = 40;
		t.y = 265;
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.left = 0;
		t.right = 0;
		t.viewport = this.dg_i();
		return t;
	};
	_proto.dg_i = function () {
		var t = new eui.DataGroup();
		this.dg = t;
		t.x = 1.33;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "left";
		return t;
	};
	return EmailMessageSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/email/EmailRenderSkin.exml'] = window.EmailRenderSkin = (function (_super) {
	__extends(EmailRenderSkin, _super);
	function EmailRenderSkin() {
		_super.call(this);
		this.skinParts = ["l0","l1"];
		
		this.height = 120;
		this.width = 101;
		this.elementsContent = [this._Image1_i(),this.l0_i(),this.l1_i()];
	}
	var _proto = EmailRenderSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(25,13,5,84);
		t.source = "em15";
		t.touchEnabled = false;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.left = 0;
		t.right = 0;
		t.size = 22;
		t.text = "已读";
		t.textAlign = "right";
		t.textColor = 0xF70707;
		t.touchEnabled = false;
		t.y = 0;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.left = 0;
		t.right = 0;
		t.size = 22;
		t.text = "系统邮件";
		t.textAlign = "center";
		t.textColor = 0x090df4;
		t.touchEnabled = false;
		t.y = 91;
		return t;
	};
	return EmailRenderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/Win1Skin.exml'] = window.Win1Skin = (function (_super) {
	__extends(Win1Skin, _super);
	function Win1Skin() {
		_super.call(this);
		this.skinParts = ["rc","r","l","title","g0"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.rc_i(),this.g0_i()];
	}
	var _proto = Win1Skin.prototype;

	_proto.rc_i = function () {
		var t = new eui.Rect();
		this.rc = t;
		t.bottom = 0;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.height = 1043;
		t.left = 0;
		t.right = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this.r_i(),this.l_i(),this.title_i()];
		return t;
	};
	_proto.r_i = function () {
		var t = new eui.Image();
		this.r = t;
		t.bottom = 0;
		t.horizontalCenter = 176.5;
		t.scale9Grid = new egret.Rectangle(318,67,35,12);
		t.source = "em14";
		t.top = 0;
		return t;
	};
	_proto.l_i = function () {
		var t = new eui.Image();
		this.l = t;
		t.bottom = 0;
		t.horizontalCenter = -175.5;
		t.scale9Grid = new egret.Rectangle(318,67,35,12);
		t.scaleX = -1;
		t.source = "em14";
		t.top = 0;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Label();
		this.title = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.text = "邮  件";
		t.textAlign = "center";
		t.textColor = 0x774919;
		t.y = 11;
		return t;
	};
	return Win1Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/email/EmailSkin.exml'] = window.EmailSkin = (function (_super) {
	__extends(EmailSkin, _super);
	function EmailSkin() {
		_super.call(this);
		this.skinParts = ["btn0","btn1","g0"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._BaseWin11_i(),this._Group2_i()];
	}
	var _proto = EmailSkin.prototype;

	_proto._BaseWin11_i = function () {
		var t = new BaseWin1();
		t.bgH = 900;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "Win1Skin";
		t.titleS = "邮  件";
		t.top = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 900;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 706;
		t.elementsContent = [this.btn0_i(),this.btn1_i(),this._Scroller1_i(),this._Label1_i(),this._EmailMessage1_i()];
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.bottom = 50;
		t.label = "删除已读";
		t.skinName = "Btn002Skin";
		t.x = 82;
		return t;
	};
	_proto.btn1_i = function () {
		var t = new eui.Button();
		this.btn1 = t;
		t.bottom = 50;
		t.label = "一键领取";
		t.skinName = "Btn002Skin";
		t.x = 458;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 120;
		t.width = 652;
		t.x = 32;
		t.y = 68.34;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.x = 0;
		t.elementsContent = [this.g0_i()];
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.DataGroup();
		this.g0 = t;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bottom = 147;
		t.horizontalCenter = 0;
		t.text = "邮件只保留15天";
		return t;
	};
	_proto._EmailMessage1_i = function () {
		var t = new EmailMessage();
		t.horizontalCenter = 0;
		t.skinName = "EmailMessageSkin";
		t.y = 203;
		return t;
	};
	return EmailSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/email/MessageSkin.exml'] = window.MessageSkin = (function (_super) {
	__extends(MessageSkin, _super);
	function MessageSkin() {
		_super.call(this);
		this.skinParts = ["rc","l0","btn0","l1","l2","l3","l4","l5","l6","l7","l8","l9","l10","l11","l12","l13","l14"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.rc_i(),this._Group18_i()];
	}
	var _proto = MessageSkin.prototype;

	_proto.rc_i = function () {
		var t = new eui.Rect();
		this.rc = t;
		t.bottom = 0;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group18_i = function () {
		var t = new eui.Group();
		t.height = 620;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this._Group1_i(),this._Group9_i(),this._Group17_i(),this._Label1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(89,166,538,32);
		t.source = "em14";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 27;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 54;
		t.width = 672;
		t.elementsContent = [this._Image2_i(),this.l0_i(),this.btn0_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 8;
		t.right = 8;
		t.scale9Grid = new egret.Rectangle(25,42,5,5);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dikuang_ggg";
		t.top = 12;
		t.touchEnabled = false;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.text = "玩家名字：xxxx";
		t.textAlign = "center";
		t.y = 33;
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.horizontalCenter = 0.5;
		t.label = "返回";
		t.skinName = "Btn002Skin";
		t.y = 448;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.x = 37;
		t.y = 127;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group2_i(),this._Group3_i(),this._Group4_i(),this._Group5_i(),this._Group6_i(),this._Group7_i(),this._Group8_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 10;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 235;
		t.y = -352;
		t.elementsContent = [this._Image3_i(),this.l1_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1";
		t.top = 0;
		t.touchEnabled = false;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.anchorOffsetX = 0;
		t.text = "22222222222222";
		t.verticalCenter = 0;
		t.x = 18;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 2;
		t.y = 47;
		t.elementsContent = [this._Image4_i(),this.l2_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1-拷贝";
		t.top = 0;
		t.touchEnabled = false;
		return t;
	};
	_proto.l2_i = function () {
		var t = new eui.Label();
		this.l2 = t;
		t.anchorOffsetX = 0;
		t.text = "2222222222";
		t.verticalCenter = 0;
		t.x = 18;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 161;
		t.elementsContent = [this._Image5_i(),this.l3_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1";
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.l3_i = function () {
		var t = new eui.Label();
		this.l3 = t;
		t.anchorOffsetX = 0;
		t.text = "333333333333";
		t.verticalCenter = 0;
		t.x = 18;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 41;
		t.y = 47;
		t.elementsContent = [this._Image6_i(),this.l4_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1-拷贝";
		t.touchEnabled = false;
		return t;
	};
	_proto.l4_i = function () {
		var t = new eui.Label();
		this.l4 = t;
		t.anchorOffsetX = 0;
		t.text = "22";
		t.verticalCenter = 0;
		t.x = 18;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 11;
		t.y = 17;
		t.elementsContent = [this._Image7_i(),this.l5_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1";
		t.touchEnabled = false;
		return t;
	};
	_proto.l5_i = function () {
		var t = new eui.Label();
		this.l5 = t;
		t.anchorOffsetX = 0;
		t.text = "1";
		t.verticalCenter = 0;
		t.x = 18;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 1;
		t.y = 7;
		t.elementsContent = [this._Image8_i(),this.l6_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1-拷贝";
		t.touchEnabled = false;
		return t;
	};
	_proto.l6_i = function () {
		var t = new eui.Label();
		this.l6 = t;
		t.anchorOffsetX = 0;
		t.text = "1";
		t.verticalCenter = 0;
		t.x = 18;
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 1;
		t.y = 7;
		t.elementsContent = [this._Image9_i(),this.l7_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1";
		t.touchEnabled = false;
		return t;
	};
	_proto.l7_i = function () {
		var t = new eui.Label();
		this.l7 = t;
		t.anchorOffsetX = 0;
		t.text = "1";
		t.verticalCenter = 0;
		t.x = 18;
		return t;
	};
	_proto._Group17_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.width = 80;
		t.x = 589;
		t.y = 127;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this._Group10_i(),this._Group11_i(),this._Group12_i(),this._Group13_i(),this._Group14_i(),this._Group15_i(),this._Group16_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 10;
		return t;
	};
	_proto._Group10_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.x = 11;
		t.y = 17;
		t.elementsContent = [this._Image10_i(),this.l8_i()];
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1";
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.l8_i = function () {
		var t = new eui.Label();
		this.l8 = t;
		t.anchorOffsetX = 0;
		t.right = 18;
		t.text = "";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 44;
		t.x = 18;
		return t;
	};
	_proto._Group11_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.x = 21;
		t.y = 27;
		t.elementsContent = [this._Image11_i(),this.l9_i()];
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(25,13,5,84);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1-拷贝";
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.l9_i = function () {
		var t = new eui.Label();
		this.l9 = t;
		t.anchorOffsetX = 0;
		t.right = 18;
		t.text = "";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 44;
		t.x = 18;
		return t;
	};
	_proto._Group12_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.x = 31;
		t.y = 37;
		t.elementsContent = [this._Image12_i(),this.l10_i()];
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(25,13,5,84);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1";
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.l10_i = function () {
		var t = new eui.Label();
		this.l10 = t;
		t.anchorOffsetX = 0;
		t.right = 18;
		t.text = "";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 44;
		t.x = 18;
		return t;
	};
	_proto._Group13_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.x = 41;
		t.y = 47;
		t.elementsContent = [this._Image13_i(),this.l11_i()];
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(25,13,5,84);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1-拷贝";
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.l11_i = function () {
		var t = new eui.Label();
		this.l11 = t;
		t.anchorOffsetX = 0;
		t.right = 18;
		t.text = "";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 44;
		t.x = 18;
		return t;
	};
	_proto._Group14_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.x = 11;
		t.y = 17;
		t.elementsContent = [this._Image14_i(),this.l12_i()];
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(25,13,5,84);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1";
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.l12_i = function () {
		var t = new eui.Label();
		this.l12 = t;
		t.anchorOffsetX = 0;
		t.right = 18;
		t.text = "";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 44;
		t.x = 18;
		return t;
	};
	_proto._Group15_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.x = 1;
		t.y = 7;
		t.elementsContent = [this._Image15_i(),this.l13_i()];
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(25,13,5,84);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1-拷贝";
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.l13_i = function () {
		var t = new eui.Label();
		this.l13 = t;
		t.anchorOffsetX = 0;
		t.right = 18;
		t.text = "";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 44;
		return t;
	};
	_proto._Group16_i = function () {
		var t = new eui.Group();
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.x = 1;
		t.y = 7;
		t.elementsContent = [this._Image16_i(),this.l14_i()];
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(25,13,5,84);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-1";
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.l14_i = function () {
		var t = new eui.Label();
		this.l14 = t;
		t.anchorOffsetX = 0;
		t.right = 18;
		t.text = "";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 44;
		t.x = 18;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.text = "信  息";
		t.textAlign = "center";
		t.textColor = 0x774919;
		t.x = 319;
		t.y = 12;
		return t;
	};
	return MessageSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/email/NoticeSkin.exml'] = window.NoticeSkin = (function (_super) {
	__extends(NoticeSkin, _super);
	function NoticeSkin() {
		_super.call(this);
		this.skinParts = ["btn0","l0","l1"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._BaseWin11_i(),this._Group1_i()];
	}
	var _proto = NoticeSkin.prototype;

	_proto._BaseWin11_i = function () {
		var t = new BaseWin1();
		t.bgH = 1043;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "Win1Skin";
		t.titleS = "公  告";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1043;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 706;
		t.elementsContent = [this.btn0_i(),this._Image1_i(),this.l0_i(),this.l1_i()];
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.label = "返回";
		t.skinName = "Btn002Skin";
		t.x = 268;
		t.y = 932.5;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 854;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,19,10,9);
		t.source = "dikuang_ggg";
		t.width = 664;
		t.y = 64.5;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.height = 753;
		t.horizontalCenter = 0;
		t.lineSpacing = 10;
		t.size = 24;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x071ff9;
		t.width = 628;
		t.y = 143.5;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xfc0524;
		t.width = 500;
		t.y = 85;
		return t;
	};
	return NoticeSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/FightResultSkin.exml'] = window.FightResultSkin = (function (_super) {
	__extends(FightResultSkin, _super);
	function FightResultSkin() {
		_super.call(this);
		this.skinParts = ["rc","re","ww","ww0","i0","s5","ww1","items","s6"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.rc_i(),this._Group2_i()];
	}
	var _proto = FightResultSkin.prototype;

	_proto.rc_i = function () {
		var t = new eui.Rect();
		this.rc = t;
		t.bottom = 0;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.strokeAlpha = 0.5;
		t.top = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this.re_i(),this.s5_i(),this.s6_i(),this._Button1_i()];
		return t;
	};
	_proto.re_i = function () {
		var t = new eui.Image();
		this.re = t;
		t.horizontalCenter = 0;
		t.source = "组-4_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.s5_i = function () {
		var t = new eui.Group();
		this.s5 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 176;
		t.horizontalCenter = 0.5;
		t.verticalCenter = 17;
		t.width = 376;
		t.elementsContent = [this._Image1_i(),this.ww_i(),this.ww0_i(),this.i0_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 200;
		t.scale9Grid = new egret.Rectangle(26,18,8,18);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-5-拷贝";
		t.width = 376;
		t.y = -12;
		return t;
	};
	_proto.ww_i = function () {
		var t = new eui.Label();
		this.ww = t;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.size = 28;
		t.text = "很遗憾!";
		t.textColor = 0x09f945;
		t.verticalCenter = -54;
		t.x = 20;
		return t;
	};
	_proto.ww0_i = function () {
		var t = new eui.Label();
		this.ww0 = t;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.size = 24;
		t.text = "当前排名上升至:XXX";
		t.textColor = 0xffffff;
		t.verticalCenter = 18;
		t.x = 97;
		return t;
	};
	_proto.i0_i = function () {
		var t = new eui.Image();
		this.i0 = t;
		t.source = "result11";
		t.verticalCenter = 18.5;
		t.x = 21;
		return t;
	};
	_proto.s6_i = function () {
		var t = new eui.Group();
		this.s6 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0.5;
		t.verticalCenter = 83.5;
		t.visible = false;
		t.elementsContent = [this._Group1_i(),this.items_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image2_i(),this.ww1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(26,18,8,18);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "矩形-5-拷贝";
		t.y = 0;
		return t;
	};
	_proto.ww1_i = function () {
		var t = new eui.Label();
		this.ww1 = t;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.size = 28;
		t.text = "革命尚未成功,同志仍需努力!";
		t.textColor = 0x14f902;
		t.verticalCenter = 0.5;
		t.x = 2;
		return t;
	};
	_proto.items_i = function () {
		var t = new eui.DataGroup();
		this.items = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 271;
		t.itemRendererSkinName = BaseItemSkin;
		t.width = 376;
		t.y = 60;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 20;
		t.requestedColumnCount = 3;
		t.requestedRowCount = 4;
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.horizontalCenter = 0;
		t.icon = "";
		t.label = "确定";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "Btn007Skin";
		t.verticalCenter = 308.5;
		t.x = 191;
		return t;
	};
	return FightResultSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/forge/EquipSkin.exml'] = window.EquipSkin = (function (_super) {
	__extends(EquipSkin, _super);
	function EquipSkin() {
		_super.call(this);
		this.skinParts = ["itemIcon"];
		
		this.height = 134;
		this.width = 110;
		this.elementsContent = [this.itemIcon_i()];
	}
	var _proto = EquipSkin.prototype;

	_proto.itemIcon_i = function () {
		var t = new BaseItem();
		this.itemIcon = t;
		t.skinName = "BaseItemSkin";
		return t;
	};
	return EquipSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/forge/ForgeTypeSkin.exml'] = window.ForgeTypeSkin = (function (_super) {
	__extends(ForgeTypeSkin, _super);
	function ForgeTypeSkin() {
		_super.call(this);
		this.skinParts = ["dg0","l0"];
		
		this.height = 200;
		this.width = 180;
		this.elementsContent = [this._Scroller1_i(),this.l0_i()];
	}
	var _proto = ForgeTypeSkin.prototype;

	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.elementsContent = [this.dg0_i()];
		return t;
	};
	_proto.dg0_i = function () {
		var t = new eui.DataGroup();
		this.dg0 = t;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.x = 0;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 15;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.horizontalCenter = 0;
		t.text = "已达极限";
		t.textAlign = "center";
		t.textColor = 0xf90707;
		t.verticalCenter = 0;
		return t;
	};
	return ForgeTypeSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/forge/StarSkin.exml'] = window.StarSkin = (function (_super) {
	__extends(StarSkin, _super);
	function StarSkin() {
		_super.call(this);
		this.skinParts = ["star0","star1","star2","star3","star4","star5","star6","star7","star8","star9"];
		
		this.height = 50;
		this.width = 520;
		this.elementsContent = [this._Group1_i(),this._Group2_i()];
	}
	var _proto = StarSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this._Image9_i(),this._Image10_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "star2";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "star2";
		t.x = 20;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "star2";
		t.x = 40;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "star2";
		t.x = 60;
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "star2";
		t.x = 160;
		t.y = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "star2";
		t.x = 80;
		t.y = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "star2";
		t.x = 100;
		t.y = 0;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "star2";
		t.x = 120;
		t.y = 0;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "star2";
		t.x = 140;
		t.y = 0;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.source = "star2";
		t.x = 180;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.star0_i(),this.star1_i(),this.star2_i(),this.star3_i(),this.star4_i(),this.star5_i(),this.star6_i(),this.star7_i(),this.star8_i(),this.star9_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.star0_i = function () {
		var t = new eui.Image();
		this.star0 = t;
		t.source = "star1";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.star1_i = function () {
		var t = new eui.Image();
		this.star1 = t;
		t.source = "star1";
		t.x = 20;
		t.y = 0;
		return t;
	};
	_proto.star2_i = function () {
		var t = new eui.Image();
		this.star2 = t;
		t.source = "star1";
		t.x = 40;
		t.y = 0;
		return t;
	};
	_proto.star3_i = function () {
		var t = new eui.Image();
		this.star3 = t;
		t.source = "star1";
		t.x = 60;
		t.y = 0;
		return t;
	};
	_proto.star4_i = function () {
		var t = new eui.Image();
		this.star4 = t;
		t.source = "star1";
		t.x = 80;
		t.y = 0;
		return t;
	};
	_proto.star5_i = function () {
		var t = new eui.Image();
		this.star5 = t;
		t.source = "star1";
		t.x = 100;
		t.y = 0;
		return t;
	};
	_proto.star6_i = function () {
		var t = new eui.Image();
		this.star6 = t;
		t.source = "star1";
		t.x = 120;
		t.y = 0;
		return t;
	};
	_proto.star7_i = function () {
		var t = new eui.Image();
		this.star7 = t;
		t.source = "star1";
		t.x = 140;
		t.y = 0;
		return t;
	};
	_proto.star8_i = function () {
		var t = new eui.Image();
		this.star8 = t;
		t.source = "star1";
		t.x = 160;
		t.y = 0;
		return t;
	};
	_proto.star9_i = function () {
		var t = new eui.Image();
		this.star9 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "star1";
		t.x = 180;
		t.y = 13;
		return t;
	};
	return StarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/forge/AdvancedSkin.exml'] = window.AdvancedSkin = (function (_super) {
	__extends(AdvancedSkin, _super);
	function AdvancedSkin() {
		_super.call(this);
		this.skinParts = ["item","curr","curr0","avdBtn","needItem","labName","labName0","strengGroup","star","g0"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Component1_i(),this.item_i(),this.curr_i(),this.curr0_i(),this.strengGroup_i(),this.star_i(),this.g0_i()];
	}
	var _proto = AdvancedSkin.prototype;

	_proto._Component1_i = function () {
		var t = new eui.Component();
		t.skinName = "";
		return t;
	};
	_proto.item_i = function () {
		var t = new ForgeItem();
		this.item = t;
		t.horizontalCenter = 0;
		t.skinName = "EquipSkin";
		t.y = 410.81;
		return t;
	};
	_proto.curr_i = function () {
		var t = new ForgeTypeView();
		this.curr = t;
		t.horizontalCenter = -165;
		t.skinName = "ForgeTypeSkin";
		t.width = 180;
		t.y = 815;
		return t;
	};
	_proto.curr0_i = function () {
		var t = new ForgeTypeView();
		this.curr0 = t;
		t.horizontalCenter = 165;
		t.skinName = "ForgeTypeSkin";
		t.width = 180;
		t.y = 815;
		return t;
	};
	_proto.strengGroup_i = function () {
		var t = new eui.Group();
		this.strengGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 170;
		t.height = 133;
		t.horizontalCenter = 0;
		t.width = 693;
		t.elementsContent = [this.avdBtn_i(),this.needItem_i(),this.labName_i(),this.labName0_i()];
		return t;
	};
	_proto.avdBtn_i = function () {
		var t = new eui.Button();
		this.avdBtn = t;
		t.label = "升阶";
		t.skinName = "Btn002Skin";
		t.verticalCenter = 0;
		t.x = 411.54;
		return t;
	};
	_proto.needItem_i = function () {
		var t = new ItemIcon();
		this.needItem = t;
		t.skinName = "ItemIconSkin";
		t.x = 107.03;
		t.y = 5;
		return t;
	};
	_proto.labName_i = function () {
		var t = new eui.Label();
		this.labName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "进阶石";
		t.textAlign = "left";
		t.textColor = 0x92422c;
		t.width = 115;
		t.x = 222;
		t.y = 17;
		return t;
	};
	_proto.labName0_i = function () {
		var t = new eui.Label();
		this.labName0 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "";
		t.textAlign = "left";
		t.width = 115;
		t.x = 225.04;
		t.y = 72.58;
		return t;
	};
	_proto.star_i = function () {
		var t = new StarIcon();
		this.star = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.skinName = "StarSkin";
		t.y = 312;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.horizontalCenter = 0;
		t.y = 464;
		return t;
	};
	return AdvancedSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/forge/StrengSkin.exml'] = window.StrengSkin = (function (_super) {
	__extends(StrengSkin, _super);
	function StrengSkin() {
		_super.call(this);
		this.skinParts = ["item","curr","curr0","labNeed1","equipBtn1","labNeed2","equipBtn2","strengGroup","g0"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Component1_i(),this.item_i(),this.curr_i(),this.curr0_i(),this.strengGroup_i(),this.g0_i()];
	}
	var _proto = StrengSkin.prototype;

	_proto._Component1_i = function () {
		var t = new eui.Component();
		t.skinName = "";
		return t;
	};
	_proto.item_i = function () {
		var t = new ForgeItem();
		this.item = t;
		t.horizontalCenter = 0;
		t.skinName = "EquipSkin";
		t.y = 411;
		return t;
	};
	_proto.curr_i = function () {
		var t = new ForgeTypeView();
		this.curr = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = -165;
		t.skinName = "ForgeTypeSkin";
		t.width = 180;
		t.y = 815;
		return t;
	};
	_proto.curr0_i = function () {
		var t = new ForgeTypeView();
		this.curr0 = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 165;
		t.skinName = "ForgeTypeSkin";
		t.width = 180;
		t.y = 815;
		return t;
	};
	_proto.strengGroup_i = function () {
		var t = new eui.Group();
		this.strengGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 170;
		t.height = 133;
		t.horizontalCenter = 0;
		t.width = 693;
		t.elementsContent = [this._Group1_i(),this._Group2_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = -150;
		t.y = 19;
		t.elementsContent = [this.labNeed1_i(),this.equipBtn1_i()];
		return t;
	};
	_proto.labNeed1_i = function () {
		var t = new eui.Label();
		this.labNeed1 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "需要金币：";
		t.textAlign = "center";
		t.y = 0;
		return t;
	};
	_proto.equipBtn1_i = function () {
		var t = new eui.Button();
		this.equipBtn1 = t;
		t.label = "强化5次";
		t.skinName = "Btn002Skin";
		t.x = 0;
		t.y = 27;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 150;
		t.y = 19;
		t.elementsContent = [this.labNeed2_i(),this.equipBtn2_i()];
		return t;
	};
	_proto.labNeed2_i = function () {
		var t = new eui.Label();
		this.labNeed2 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "需要金币：";
		t.textAlign = "center";
		t.y = 0;
		return t;
	};
	_proto.equipBtn2_i = function () {
		var t = new eui.Button();
		this.equipBtn2 = t;
		t.label = "强化1次";
		t.skinName = "Btn002Skin";
		t.x = 0;
		t.y = 27;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.horizontalCenter = 0;
		t.y = 464;
		return t;
	};
	return StrengSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/forge/ForgeSkin.exml'] = window.ForgeSkin = (function (_super) {
	__extends(ForgeSkin, _super);
	function ForgeSkin() {
		_super.call(this);
		this.skinParts = ["win","g0","viewStack","tabBar","equip0","equip1","equip2","equip3","equip4","equip5","equip6","equip8","equip9","equip7","equipGrp"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Group2_i(),this._Image6_i(),this.g0_i(),this._Group4_i(),this.tabBar_i(),this.equipGrp_i()];
		
		eui.Binding.$bindProperties(this, ["viewStack"],[0],this.tabBar,"dataProvider");
	}
	var _proto = ForgeSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "t_5";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.width = 640;
		t.y = 216;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Group1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = -8;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(27,29,6,4);
		t.source = "dikuang_ggg";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.source = "组-5_png";
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 260;
		t.left = 15;
		t.right = 15;
		t.y = 540;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this._Label1_i(),this._Image5_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "组-138";
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = -3;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(29,27,4,6);
		t.source = "da-ditu1";
		t.top = 39;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 25;
		t.text = "属性";
		t.textAlign = "center";
		t.y = 13;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "图层-812";
		t.verticalCenter = 29;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.bottom = 291;
		t.horizontalCenter = 0.5;
		t.source = "圆角矩形-23";
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.horizontalCenter = 0;
		t.y = 543;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.top = 0;
		t.elementsContent = [this._Group3_i()];
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.top = 0;
		t.x = 0;
		t.elementsContent = [this.viewStack_i()];
		return t;
	};
	_proto.viewStack_i = function () {
		var t = new eui.ViewStack();
		this.viewStack = t;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.selectedIndex = 2;
		t.top = 0;
		t.x = 0;
		t.elementsContent = [this._StrengthenPanel1_i(),this._AdvancedPanel1_i()];
		return t;
	};
	_proto._StrengthenPanel1_i = function () {
		var t = new StrengthenPanel();
		t.anchorOffsetY = 0;
		t.name = "强 化";
		t.skinName = "StrengSkin";
		t.visible = false;
		t.x = 0;
		return t;
	};
	_proto._AdvancedPanel1_i = function () {
		var t = new AdvancedPanel();
		t.name = "升 阶";
		t.skinName = "AdvancedSkin";
		t.visible = false;
		return t;
	};
	_proto.tabBar_i = function () {
		var t = new eui.TabBar();
		this.tabBar = t;
		t.horizontalCenter = -140;
		t.itemRendererSkinName = TabBtnSkin1;
		t.y = 134;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 20;
		return t;
	};
	_proto.equipGrp_i = function () {
		var t = new eui.Group();
		this.equipGrp = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.width = 628;
		t.y = 218;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group5_i(),this._Group6_i(),this._Group7_i(),this._Group8_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 0;
		t.paddingTop = 15;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.y = 68;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.equip0_i(),this.equip1_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.equip0_i = function () {
		var t = new ForgeItem();
		this.equip0 = t;
		t.left = 10;
		t.skinName = "EquipSkin";
		t.y = 0;
		return t;
	};
	_proto.equip1_i = function () {
		var t = new ForgeItem();
		this.equip1 = t;
		t.right = 10;
		t.skinName = "EquipSkin";
		t.y = 0;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.y = 327;
		t.layout = this._BasicLayout2_i();
		t.elementsContent = [this.equip2_i(),this.equip3_i()];
		return t;
	};
	_proto._BasicLayout2_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.equip2_i = function () {
		var t = new ForgeItem();
		this.equip2 = t;
		t.left = 10;
		t.skinName = "EquipSkin";
		t.y = 0;
		return t;
	};
	_proto.equip3_i = function () {
		var t = new ForgeItem();
		this.equip3 = t;
		t.right = 10;
		t.skinName = "EquipSkin";
		t.y = 0;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.y = 228;
		t.layout = this._BasicLayout3_i();
		t.elementsContent = [this.equip4_i(),this.equip5_i()];
		return t;
	};
	_proto._BasicLayout3_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.equip4_i = function () {
		var t = new ForgeItem();
		this.equip4 = t;
		t.left = 10;
		t.skinName = "EquipSkin";
		t.y = 0;
		return t;
	};
	_proto.equip5_i = function () {
		var t = new ForgeItem();
		this.equip5 = t;
		t.right = 10;
		t.skinName = "EquipSkin";
		t.y = 0;
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.y = 327;
		t.layout = this._BasicLayout4_i();
		t.elementsContent = [this.equip6_i(),this.equip8_i(),this.equip9_i(),this.equip7_i()];
		return t;
	};
	_proto._BasicLayout4_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.equip6_i = function () {
		var t = new ForgeItem();
		this.equip6 = t;
		t.left = 10;
		t.skinName = "EquipSkin";
		t.y = 0;
		return t;
	};
	_proto.equip8_i = function () {
		var t = new ForgeItem();
		this.equip8 = t;
		t.left = 130;
		t.skinName = "EquipSkin";
		t.y = 0;
		return t;
	};
	_proto.equip9_i = function () {
		var t = new ForgeItem();
		this.equip9 = t;
		t.right = 130;
		t.skinName = "EquipSkin";
		return t;
	};
	_proto.equip7_i = function () {
		var t = new ForgeItem();
		this.equip7 = t;
		t.right = 10;
		t.skinName = "EquipSkin";
		t.y = 0;
		return t;
	};
	return ForgeSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/gem/GemItemSkin.exml'] = window.GemItemSkin = (function (_super) {
	__extends(GemItemSkin, _super);
	function GemItemSkin() {
		_super.call(this);
		this.skinParts = ["itemIcon","labLv","upBtn","downBtn","btnGroup","g0"];
		
		this.elementsContent = [this.itemIcon_i(),this.labLv_i(),this.btnGroup_i(),this.g0_i()];
	}
	var _proto = GemItemSkin.prototype;

	_proto.itemIcon_i = function () {
		var t = new BaseItem();
		this.itemIcon = t;
		t.horizontalCenter = 0;
		t.skinName = "BaseItemSkin";
		return t;
	};
	_proto.labLv_i = function () {
		var t = new eui.Label();
		this.labLv = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "Lv.1";
		t.textAlign = "right";
		t.width = 90;
		t.y = 79;
		return t;
	};
	_proto.btnGroup_i = function () {
		var t = new eui.Group();
		this.btnGroup = t;
		t.horizontalCenter = 0;
		t.y = 109;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.upBtn_i(),this.downBtn_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.upBtn_i = function () {
		var t = new eui.Button();
		this.upBtn = t;
		t.label = "升级";
		t.skinName = "Btn001Skin";
		return t;
	};
	_proto.downBtn_i = function () {
		var t = new eui.Button();
		this.downBtn = t;
		t.anchorOffsetX = 0;
		t.label = "卸下";
		t.skinName = "Btn001Skin";
		t.y = 51;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.y = 53;
		return t;
	};
	return GemItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/gem/GemSkin.exml'] = window.GemSkin = (function (_super) {
	__extends(GemSkin, _super);
	function GemSkin() {
		_super.call(this);
		this.skinParts = ["win","gen1","gen0","gen2","gen3","gen4","gen5","gen6","gen7","selectItem","btn0","btn1","btn2","btn3","btn4","btn5","btn6","btn7","btn8","btn9","tabBar","itemList","Scroller"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Group1_i(),this._Scroller1_i(),this._Group2_i()];
	}
	var _proto = GemSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "t_8";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 680.06;
		t.horizontalCenter = 0;
		t.width = 640;
		t.y = 214.82;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.gen1_i(),this.gen0_i(),this.gen2_i(),this.gen3_i(),this.gen4_i(),this.gen5_i(),this.gen6_i(),this.gen7_i(),this.selectItem_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = -0.9400000000000546;
		t.left = 1;
		t.right = -1;
		t.scale9Grid = new egret.Rectangle(32,19,2,9);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dikuang_ggg";
		t.top = 1;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(93,921,564,63);
		t.source = "组-52_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.gen1_i = function () {
		var t = new GemItemBase();
		this.gen1 = t;
		t.skinName = "GemItemSkin";
		t.x = 390.73;
		t.y = 124;
		return t;
	};
	_proto.gen0_i = function () {
		var t = new GemItemBase();
		this.gen0 = t;
		t.horizontalCenter = 0;
		t.skinName = "GemItemSkin";
		t.y = 15.18;
		return t;
	};
	_proto.gen2_i = function () {
		var t = new GemItemBase();
		this.gen2 = t;
		t.right = 3;
		t.skinName = "GemItemSkin";
		t.verticalCenter = 14.470000000000027;
		return t;
	};
	_proto.gen3_i = function () {
		var t = new GemItemBase();
		this.gen3 = t;
		t.skinName = "GemItemSkin";
		t.x = 392.73;
		t.y = 446;
		return t;
	};
	_proto.gen4_i = function () {
		var t = new GemItemBase();
		this.gen4 = t;
		t.horizontalCenter = 0;
		t.skinName = "GemItemSkin";
		t.y = 495.38;
		return t;
	};
	_proto.gen5_i = function () {
		var t = new GemItemBase();
		this.gen5 = t;
		t.horizontalCenter = -160;
		t.skinName = "GemItemSkin";
		t.y = 448;
		return t;
	};
	_proto.gen6_i = function () {
		var t = new GemItemBase();
		this.gen6 = t;
		t.left = 12;
		t.skinName = "GemItemSkin";
		t.verticalCenter = 18.470000000000027;
		return t;
	};
	_proto.gen7_i = function () {
		var t = new GemItemBase();
		this.gen7 = t;
		t.skinName = "GemItemSkin";
		t.x = 59.8;
		t.y = 123;
		return t;
	};
	_proto.selectItem_i = function () {
		var t = new ForgeItem();
		this.selectItem = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipSkin";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 66;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "on";
		t.scrollPolicyV = "off";
		t.width = 635;
		t.y = 137;
		t.viewport = this.tabBar_i();
		return t;
	};
	_proto.tabBar_i = function () {
		var t = new eui.Group();
		this.tabBar = t;
		t.anchorOffsetX = 0;
		t.width = 638;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.btn0_i(),this.btn1_i(),this.btn2_i(),this.btn3_i(),this.btn4_i(),this.btn5_i(),this.btn6_i(),this.btn7_i(),this.btn8_i(),this.btn9_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.btn0_i = function () {
		var t = new ToggleBtn01();
		this.btn0 = t;
		t.s0 = "武器";
		t.s1 = "武器";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.x = 42;
		t.y = 132.61;
		return t;
	};
	_proto.btn1_i = function () {
		var t = new ToggleBtn01();
		this.btn1 = t;
		t.s0 = "头盔";
		t.s1 = "头盔";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.x = 201.3;
		t.y = 132.61;
		return t;
	};
	_proto.btn2_i = function () {
		var t = new ToggleBtn01();
		this.btn2 = t;
		t.s0 = "胸甲";
		t.s1 = "胸甲";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.x = 360.6;
		t.y = 132.61;
		return t;
	};
	_proto.btn3_i = function () {
		var t = new ToggleBtn01();
		this.btn3 = t;
		t.s0 = "bq_0004_吊坠";
		t.s1 = "bq_0004_吊坠";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.x = 519.702;
		t.y = 133.978;
		return t;
	};
	_proto.btn4_i = function () {
		var t = new ToggleBtn01();
		this.btn4 = t;
		t.s0 = "bq_0002_护腕";
		t.s1 = "bq_0002_护腕";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.x = 529.702;
		t.y = 143.978;
		return t;
	};
	_proto.btn5_i = function () {
		var t = new ToggleBtn01();
		this.btn5 = t;
		t.s0 = "bq_0002_护腕";
		t.s1 = "bq_0002_护腕";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.x = 539.702;
		t.y = 153.978;
		return t;
	};
	_proto.btn6_i = function () {
		var t = new ToggleBtn01();
		this.btn6 = t;
		t.s0 = "bq_0003_戒指";
		t.s1 = "bq_0003_戒指";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.x = 549.702;
		t.y = 163.978;
		return t;
	};
	_proto.btn7_i = function () {
		var t = new ToggleBtn01();
		this.btn7 = t;
		t.s0 = "bq_0003_戒指";
		t.s1 = "bq_0003_戒指";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.x = 559.702;
		t.y = 173.978;
		return t;
	};
	_proto.btn8_i = function () {
		var t = new ToggleBtn01();
		this.btn8 = t;
		t.s0 = "bq_0001_腰带";
		t.s1 = "bq_0001_腰带";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.x = 569.702;
		t.y = 183.978;
		return t;
	};
	_proto.btn9_i = function () {
		var t = new ToggleBtn01();
		this.btn9 = t;
		t.s0 = "bq_0000_靴子";
		t.s1 = "bq_0000_靴子";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ToBtn000Skin";
		t.x = 579.702;
		t.y = 193.978;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 151;
		t.height = 285;
		t.horizontalCenter = 0;
		t.width = 640;
		t.elementsContent = [this.Scroller_i()];
		return t;
	};
	_proto.Scroller_i = function () {
		var t = new eui.Scroller();
		this.Scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 283;
		t.scrollPolicyV = "off";
		t.visible = true;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.itemRendererSkinName = BaseItemSkin;
		t.visible = true;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 5;
		t.paddingLeft = 5;
		t.requestedRowCount = 2;
		t.verticalGap = 5;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.label = "数据1";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.label = "数据2";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	return GemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/ItemGetWaySkin.exml'] = window.ItemGetWaySkin = (function (_super) {
	__extends(ItemGetWaySkin, _super);
	var ItemGetWaySkin$Skin9 = 	(function (_super) {
		__extends(ItemGetWaySkin$Skin9, _super);
		function ItemGetWaySkin$Skin9() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","gainItem003")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ItemGetWaySkin$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "gainItem002";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ItemGetWaySkin$Skin9;
	})(eui.Skin);

	var ItemGetWaySkin$Skin10 = 	(function (_super) {
		__extends(ItemGetWaySkin$Skin10, _super);
		function ItemGetWaySkin$Skin10() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","gainItem003")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ItemGetWaySkin$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "gainItem002";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ItemGetWaySkin$Skin10;
	})(eui.Skin);

	function ItemGetWaySkin() {
		_super.call(this);
		this.skinParts = ["rc","item","iname","i0","b0","g0","i1","b1","g1"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.rc_i(),this._Image1_i(),this._Image2_i(),this.item_i(),this.iname_i(),this._Image3_i(),this.g0_i(),this.g1_i()];
	}
	var _proto = ItemGetWaySkin.prototype;

	_proto.rc_i = function () {
		var t = new eui.Rect();
		this.rc = t;
		t.bottom = 0;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 449;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(86,49,520,300);
		t.source = "tipsBg";
		t.width = 600;
		t.y = 418;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "gainItem001";
		t.y = 397;
		return t;
	};
	_proto.item_i = function () {
		var t = new BaseItem();
		this.item = t;
		t.horizontalCenter = -74;
		t.y = 504;
		return t;
	};
	_proto.iname_i = function () {
		var t = new eui.Label();
		this.iname = t;
		t.horizontalCenter = 98;
		t.text = "物品";
		t.y = 541;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "gainItem000";
		t.y = 700;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.height = 75;
		t.horizontalCenter = 0;
		t.width = 350;
		t.y = 622;
		t.elementsContent = [this.i0_i(),this.b0_i()];
		return t;
	};
	_proto.i0_i = function () {
		var t = new eui.Image();
		this.i0 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "gainItem1";
		t.verticalCenter = 0;
		t.x = 24;
		return t;
	};
	_proto.b0_i = function () {
		var t = new eui.Button();
		this.b0 = t;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 203;
		t.skinName = ItemGetWaySkin$Skin9;
		return t;
	};
	_proto.g1_i = function () {
		var t = new eui.Group();
		this.g1 = t;
		t.height = 75;
		t.horizontalCenter = 0;
		t.width = 350;
		t.y = 733;
		t.elementsContent = [this.i1_i(),this.b1_i()];
		return t;
	};
	_proto.i1_i = function () {
		var t = new eui.Image();
		this.i1 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "gainItem3";
		t.verticalCenter = 0;
		t.x = 24;
		return t;
	};
	_proto.b1_i = function () {
		var t = new eui.Button();
		this.b1 = t;
		t.label = "";
		t.x = 203;
		t.skinName = ItemGetWaySkin$Skin10;
		return t;
	};
	return ItemGetWaySkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/ItemTipSkin.exml'] = window.ItemTipSkin = (function (_super) {
	__extends(ItemTipSkin, _super);
	function ItemTipSkin() {
		_super.call(this);
		this.skinParts = ["rc","bg","item","l0","l1","l2","l3","l4","l5","btn1","btn0","btn2"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.rc_i(),this._Group2_i()];
	}
	var _proto = ItemTipSkin.prototype;

	_proto.rc_i = function () {
		var t = new eui.Rect();
		this.rc = t;
		t.bottom = 0;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this.bg_i(),this.item_i(),this._Group1_i(),this.l3_i(),this.l4_i(),this.l5_i(),this._Image1_i(),this.btn1_i(),this.btn0_i(),this.btn2_i(),this._BitmapLabel1_i(),this._Image2_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetX = 0;
		t.height = 380;
		t.scale9Grid = new egret.Rectangle(24,22,6,7);
		t.source = "圆角矩形-1";
		t.width = 400;
		return t;
	};
	_proto.item_i = function () {
		var t = new BaseItem();
		this.item = t;
		t.skinName = "BaseItemSkin";
		t.x = 34;
		t.y = 44;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 170.5;
		t.y = 84;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.l0_i(),this.l1_i(),this.l2_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 8;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.fontFamily = "KaiTi";
		t.size = 24;
		t.text = "Label";
		t.textColor = 0xf77307;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.fontFamily = "KaiTi";
		t.size = 24;
		t.text = "Label";
		t.textColor = 0xf77307;
		t.x = 0;
		t.y = 36;
		return t;
	};
	_proto.l2_i = function () {
		var t = new eui.Label();
		this.l2 = t;
		t.fontFamily = "KaiTi";
		t.size = 24;
		t.text = "Label";
		t.textColor = 0xf77307;
		t.x = 0;
		t.y = 75;
		return t;
	};
	_proto.l3_i = function () {
		var t = new eui.Label();
		this.l3 = t;
		t.fontFamily = "KaiTi";
		t.size = 24;
		t.text = "基础属性:";
		t.textColor = 0x15f709;
		t.x = 41;
		t.y = 208;
		return t;
	};
	_proto.l4_i = function () {
		var t = new eui.Label();
		this.l4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.lineSpacing = 6;
		t.size = 24;
		t.text = "11";
		t.textColor = 0x0769fc;
		t.width = 280;
		t.x = 94;
		t.y = 243;
		return t;
	};
	_proto.l5_i = function () {
		var t = new eui.BitmapLabel();
		this.l5 = t;
		t.font = "power_fnt";
		t.text = "212121";
		t.x = 242;
		t.y = 37.5;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "power11";
		t.x = 166.5;
		t.y = 34;
		return t;
	};
	_proto.btn1_i = function () {
		var t = new eui.Button();
		this.btn1 = t;
		t.horizontalCenter = -90;
		t.icon = "";
		t.label = "确  定";
		t.skinName = "Btn005Skin";
		t.y = 273;
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.horizontalCenter = 90;
		t.icon = "";
		t.label = "取  消";
		t.skinName = "Btn005Skin";
		t.y = 273;
		return t;
	};
	_proto.btn2_i = function () {
		var t = new eui.Button();
		this.btn2 = t;
		t.horizontalCenter = 0;
		t.icon = "";
		t.label = "确  定";
		t.skinName = "Btn005Skin";
		t.y = 273;
		return t;
	};
	_proto._BitmapLabel1_i = function () {
		var t = new eui.BitmapLabel();
		t.height = 20;
		t.width = 20;
		t.x = 204;
		t.y = 69;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "圆角矩形-3";
		t.x = 97;
		t.y = 192;
		return t;
	};
	return ItemTipSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/mainUI/expProgress.exml'] = window.expProgress = (function (_super) {
	__extends(expProgress, _super);
	function expProgress() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = expProgress.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "";
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(66,1,402,13);
		t.source = "jyt_1";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	return expProgress;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/mainUI/PProgressSkin.exml'] = window.PProgressSkin = (function (_super) {
	__extends(PProgressSkin, _super);
	function PProgressSkin() {
		_super.call(this);
		this.skinParts = ["hp","l1111","l0000","pro"];
		
		this.height = 124;
		this.width = 437;
		this.elementsContent = [this.pro_i()];
	}
	var _proto = PProgressSkin.prototype;

	_proto.pro_i = function () {
		var t = new eui.Group();
		this.pro = t;
		t.horizontalCenter = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this.hp_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.l1111_i(),this.l0000_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "01";
		t.verticalCenter = 6;
		return t;
	};
	_proto.hp_i = function () {
		var t = new eui.ProgressBar();
		this.hp = t;
		t.value = 50;
		t.x = 27;
		t.y = 43;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -188.5;
		t.source = "02";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -44.5;
		t.source = "02";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.right = 8;
		t.source = "boss";
		t.y = 0;
		return t;
	};
	_proto.l1111_i = function () {
		var t = new eui.Label();
		this.l1111 = t;
		t.size = 28;
		t.text = "";
		t.textAlign = "center";
		t.verticalCenter = -1.5;
		t.width = 80;
		t.x = 134;
		return t;
	};
	_proto.l0000_i = function () {
		var t = new eui.Label();
		this.l0000 = t;
		t.size = 28;
		t.text = "";
		t.textAlign = "center";
		t.verticalCenter = -1.5;
		t.width = 80;
		t.x = -12;
		return t;
	};
	return PProgressSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/mainUI/moneySkin.exml'] = window.moneySkin = (function (_super) {
	__extends(moneySkin, _super);
	var moneySkin$Skin11 = 	(function (_super) {
		__extends(moneySkin$Skin11, _super);
		function moneySkin$Skin11() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","zengjia2")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = moneySkin$Skin11.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "zengjia";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return moneySkin$Skin11;
	})(eui.Skin);

	function moneySkin() {
		_super.call(this);
		this.skinParts = ["goldImg","labGold","addGBtn"];
		
		this.height = 36;
		this.width = 191;
		this.elementsContent = [this._Image1_i(),this.goldImg_i(),this.labGold_i(),this.addGBtn_i()];
	}
	var _proto = moneySkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.right = 0;
		t.source = "jbbg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.goldImg_i = function () {
		var t = new eui.Image();
		this.goldImg = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto.labGold_i = function () {
		var t = new eui.Label();
		this.labGold = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.right = 33;
		t.size = 20;
		t.text = "999999";
		t.textColor = 0xede4b3;
		t.verticalCenter = 0;
		t.width = 113;
		return t;
	};
	_proto.addGBtn_i = function () {
		var t = new eui.Button();
		this.addGBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.label = "";
		t.right = 0;
		t.verticalCenter = 0;
		t.skinName = moneySkin$Skin11;
		return t;
	};
	return moneySkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/mainUI/topSkin.exml'] = window.topSkin = (function (_super) {
	__extends(topSkin, _super);
	function topSkin() {
		_super.call(this);
		this.skinParts = ["m2","m3","nn"];
		
		this.height = 99;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this.m2_i(),this.m3_i(),this.nn_i()];
	}
	var _proto = topSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(341,12,60,75);
		t.source = "sk";
		t.y = 0;
		return t;
	};
	_proto.m2_i = function () {
		var t = new MoneyPanel();
		this.m2 = t;
		t.horizontalCenter = 220.5;
		t.skinName = "moneySkin";
		t.y = 12;
		return t;
	};
	_proto.m3_i = function () {
		var t = new MoneyPanel();
		this.m3 = t;
		t.horizontalCenter = -52.5;
		t.skinName = "moneySkin";
		t.y = 12;
		return t;
	};
	_proto.nn_i = function () {
		var t = new eui.Label();
		this.nn = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.fontFamily = "Microsoft JhengHei";
		t.stroke = 0;
		t.text = "楚中天";
		t.textAlign = "center";
		t.textColor = 0x523217;
		t.width = 146;
		t.x = 0;
		t.y = 4;
		return t;
	};
	return topSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/mainUI/roleIconSkin.exml'] = window.roleIconSkin = (function (_super) {
	__extends(roleIconSkin, _super);
	function roleIconSkin() {
		_super.call(this);
		this.skinParts = ["icon","lvl","eff"];
		
		this.height = 133;
		this.width = 336;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.icon_i(),this.lvl_i(),this.eff_i()];
	}
	var _proto = roleIconSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "rw_1";
		t.top = 0;
		t.x = 2;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scale9Grid = new egret.Rectangle(29,5,29,33);
		t.source = "rw_2";
		t.width = 119;
		t.x = 0;
		t.y = 89;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.anchorOffsetY = 0;
		t.height = 123;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "human2_png";
		t.verticalCenter = -12.5;
		t.width = 120;
		t.x = 9;
		return t;
	};
	_proto.lvl_i = function () {
		var t = new eui.Label();
		this.lvl = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 21;
		t.size = 20;
		t.stroke = 0.3;
		t.strokeColor = 0x020100;
		t.text = "10重100级";
		t.textAlign = "center";
		t.textColor = 0x2bf904;
		t.width = 100;
		t.x = 9;
		t.y = 108;
		return t;
	};
	_proto.eff_i = function () {
		var t = new eui.Group();
		this.eff = t;
		t.x = 228;
		t.y = 46;
		return t;
	};
	return roleIconSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/mainUI/vipIconSkin.exml'] = window.vipIconSkin = (function (_super) {
	__extends(vipIconSkin, _super);
	function vipIconSkin() {
		_super.call(this);
		this.skinParts = ["vipImg","vip"];
		
		this.height = 48;
		this.width = 93;
		this.elementsContent = [this._Button1_i(),this.vipImg_i(),this.vip_i()];
	}
	var _proto = vipIconSkin.prototype;

	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.label = "";
		t.skinName = "Btn001Skin";
		return t;
	};
	_proto.vipImg_i = function () {
		var t = new eui.Image();
		this.vipImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.left = 0;
		t.source = "v";
		t.touchEnabled = false;
		t.verticalCenter = -1.5;
		return t;
	};
	_proto.vip_i = function () {
		var t = new eui.BitmapLabel();
		this.vip = t;
		t.font = "vipLvl_fnt";
		t.horizontalCenter = 22.5;
		t.text = "0";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	return vipIconSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/mainUI/mapMessSkin.exml'] = window.mapMessSkin = (function (_super) {
	__extends(mapMessSkin, _super);
	function mapMessSkin() {
		_super.call(this);
		this.skinParts = ["ln","mmap","mm","rr"];
		
		this.height = 131;
		this.width = 196;
		this.elementsContent = [this._Image1_i(),this.ln_i(),this.mmap_i(),this.mm_i(),this.rr_i()];
	}
	var _proto = mapMessSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scale9Grid = new egret.Rectangle(120,89,20,20);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "a";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.ln_i = function () {
		var t = new eui.Label();
		this.ln = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 26;
		t.lineSpacing = 15;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 22;
		t.text = "地图";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 4;
		return t;
	};
	_proto.mmap_i = function () {
		var t = new eui.Image();
		this.mmap = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scale9Grid = new egret.Rectangle(120,89,20,20);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "";
		t.x = 8;
		t.y = 5;
		return t;
	};
	_proto.mm_i = function () {
		var t = new eui.Rect();
		this.mm = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 90;
		t.horizontalCenter = 0;
		t.width = 184;
		t.y = 30;
		return t;
	};
	_proto.rr_i = function () {
		var t = new eui.Rect();
		this.rr = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillColor = 0xf90707;
		t.height = 8;
		t.width = 8;
		t.x = 95;
		t.y = 72;
		return t;
	};
	return mapMessSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/mainUI/mainUISkin.exml'] = window.mainUISkin = (function (_super) {
	__extends(mainUISkin, _super);
	var mainUISkin$Skin12 = 	(function (_super) {
		__extends(mainUISkin$Skin12, _super);
		function mainUISkin$Skin12() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","G1")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = mainUISkin$Skin12.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "G";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return mainUISkin$Skin12;
	})(eui.Skin);

	var mainUISkin$Skin13 = 	(function (_super) {
		__extends(mainUISkin$Skin13, _super);
		function mainUISkin$Skin13() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","gn_0007_组-130")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = mainUISkin$Skin13.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "gn_0007_组-129";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return mainUISkin$Skin13;
	})(eui.Skin);

	function mainUISkin() {
		_super.call(this);
		this.skinParts = ["noticeBtn","actionBtn","taskBtn","mailBtn","rankBtn","shopBtn","firstBtn","mcBtn","mbBtn","copyBtn","arenaBtn","reBornBtn","mainBtn","qiehuan","exit","challenge","newsBtn","skill0","skill1","skill2","skill6","skill3","skill4","skill5","s","chatBtn","pro","vipBtn","reBtn","labfight","G2","roleGroup","roleBtn","bagBtn","riskBtn","skillBtn","achieveBtn","exp","g0"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Group4_i(),this.pro_i(),this._TopPanel1_i(),this.roleGroup_i(),this.g0_i()];
	}
	var _proto = mainUISkin.prototype;

	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchEnabled = false;
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i(),this.qiehuan_i(),this.exit_i(),this.challenge_i(),this.newsBtn_i(),this.s_i(),this.chatBtn_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.right = 0;
		t.top = 392;
		t.width = 109;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.noticeBtn_i(),this.actionBtn_i(),this.taskBtn_i(),this.mailBtn_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.noticeBtn_i = function () {
		var t = new eui.Button();
		this.noticeBtn = t;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "Btn21Skin";
		return t;
	};
	_proto.actionBtn_i = function () {
		var t = new eui.Button();
		this.actionBtn = t;
		t.anchorOffsetX = 0;
		t.label = "福利大厅";
		t.skinName = "Btn32Skin";
		t.width = 109;
		t.y = 129;
		return t;
	};
	_proto.taskBtn_i = function () {
		var t = new eui.Button();
		this.taskBtn = t;
		t.label = "Button";
		t.skinName = "Btn24Skin";
		t.width = 109;
		t.x = 0;
		t.y = 258;
		return t;
	};
	_proto.mailBtn_i = function () {
		var t = new eui.Button();
		this.mailBtn = t;
		t.label = "Button";
		t.skinName = "Btn27Skin";
		t.width = 109;
		t.x = 0;
		t.y = 387;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.bottom = 608;
		t.left = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.rankBtn_i(),this.shopBtn_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 20;
		return t;
	};
	_proto.rankBtn_i = function () {
		var t = new eui.Button();
		this.rankBtn = t;
		t.label = "Button";
		t.skinName = "Btn23Skin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.shopBtn_i = function () {
		var t = new eui.Button();
		this.shopBtn = t;
		t.label = "Button";
		t.skinName = "Btn25Skin";
		t.x = 0;
		t.y = 138;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 120;
		t.right = 0;
		t.width = 750;
		t.y = 189.6;
		t.layout = this._BasicLayout2_i();
		t.elementsContent = [this.firstBtn_i(),this.mcBtn_i(),this.mbBtn_i(),this.copyBtn_i(),this.arenaBtn_i(),this.reBornBtn_i()];
		return t;
	};
	_proto._BasicLayout2_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.firstBtn_i = function () {
		var t = new eui.Button();
		this.firstBtn = t;
		t.anchorOffsetX = 0;
		t.height = 109;
		t.label = "福利大厅";
		t.skinName = "Btn29Skin";
		t.width = 109;
		t.x = 50;
		t.y = 6;
		return t;
	};
	_proto.mcBtn_i = function () {
		var t = new eui.Button();
		this.mcBtn = t;
		t.anchorOffsetX = 0;
		t.height = 109;
		t.label = "福利大厅";
		t.skinName = "Btn30Skin";
		t.width = 109;
		t.x = 169;
		t.y = 6;
		return t;
	};
	_proto.mbBtn_i = function () {
		var t = new eui.Button();
		this.mbBtn = t;
		t.anchorOffsetX = 0;
		t.height = 109;
		t.label = "福利大厅";
		t.skinName = "Btn31Skin";
		t.width = 109;
		t.x = 288;
		t.y = 6;
		return t;
	};
	_proto.copyBtn_i = function () {
		var t = new eui.Button();
		this.copyBtn = t;
		t.label = "Button";
		t.right = 238;
		t.skinName = "Btn20Skin";
		t.verticalCenter = 0;
		return t;
	};
	_proto.arenaBtn_i = function () {
		var t = new eui.Button();
		this.arenaBtn = t;
		t.label = "Button";
		t.right = 119;
		t.skinName = "Btn22Skin";
		t.verticalCenter = 0;
		return t;
	};
	_proto.reBornBtn_i = function () {
		var t = new eui.Button();
		this.reBornBtn = t;
		t.anchorOffsetY = 0;
		t.label = "重生";
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "Btn28Skin";
		t.verticalCenter = 0;
		return t;
	};
	_proto.qiehuan_i = function () {
		var t = new eui.Group();
		this.qiehuan = t;
		t.bottom = 177;
		t.left = 0;
		t.elementsContent = [this.mainBtn_i()];
		return t;
	};
	_proto.mainBtn_i = function () {
		var t = new eui.Button();
		this.mainBtn = t;
		t.anchorOffsetY = 0;
		t.height = 107;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "Btn33Skin";
		t.width = 107;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.exit_i = function () {
		var t = new eui.Button();
		this.exit = t;
		t.icon = "6";
		t.label = "";
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainBtnSkin";
		t.visible = false;
		t.x = 0;
		return t;
	};
	_proto.challenge_i = function () {
		var t = new eui.Group();
		this.challenge = t;
		t.bottom = 211;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 319;
		t.y = 1008;
		t.elementsContent = [this._Button1_i()];
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = mainUISkin$Skin12;
		return t;
	};
	_proto.newsBtn_i = function () {
		var t = new eui.Button();
		this.newsBtn = t;
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "Btn26Skin";
		t.visible = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.s_i = function () {
		var t = new eui.Group();
		this.s = t;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 141;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.x = 0;
		t.layout = this._BasicLayout3_i();
		t.elementsContent = [this.skill0_i(),this.skill1_i(),this.skill2_i(),this.skill6_i(),this.skill3_i(),this.skill4_i(),this.skill5_i()];
		return t;
	};
	_proto._BasicLayout3_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.skill0_i = function () {
		var t = new SkillCompeonent();
		this.skill0 = t;
		t.bottom = 0;
		t.height = 138;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.width = 115;
		t.x = 0;
		return t;
	};
	_proto.skill1_i = function () {
		var t = new SkillCompeonent();
		this.skill1 = t;
		t.bottom = 0;
		t.height = 138;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.width = 115;
		t.x = 96;
		return t;
	};
	_proto.skill2_i = function () {
		var t = new SkillCompeonent();
		this.skill2 = t;
		t.bottom = 0;
		t.height = 138;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.width = 115;
		t.x = 361;
		return t;
	};
	_proto.skill6_i = function () {
		var t = new SkillCompeonent();
		this.skill6 = t;
		t.bottom = 0;
		t.height = 138;
		t.horizontalCenter = 0;
		t.width = 176;
		return t;
	};
	_proto.skill3_i = function () {
		var t = new SkillCompeonent();
		this.skill3 = t;
		t.bottom = 0;
		t.height = 138;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.width = 115;
		t.x = 550;
		return t;
	};
	_proto.skill4_i = function () {
		var t = new SkillCompeonent();
		this.skill4 = t;
		t.bottom = 0;
		t.height = 138;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.width = 115;
		t.x = 255;
		return t;
	};
	_proto.skill5_i = function () {
		var t = new SkillCompeonent();
		this.skill5 = t;
		t.bottom = 0;
		t.height = 138;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.width = 115;
		t.x = 658;
		return t;
	};
	_proto.chatBtn_i = function () {
		var t = new eui.Button();
		this.chatBtn = t;
		t.label = "";
		t.x = 1;
		t.y = 873;
		t.skinName = mainUISkin$Skin13;
		return t;
	};
	_proto.pro_i = function () {
		var t = new PProgress();
		this.pro = t;
		t.horizontalCenter = 0.5;
		t.skinName = "PProgressSkin";
		t.y = 297;
		return t;
	};
	_proto._TopPanel1_i = function () {
		var t = new TopPanel();
		t.left = 0;
		t.right = 0;
		t.skinName = "topSkin";
		return t;
	};
	_proto.roleGroup_i = function () {
		var t = new eui.Group();
		this.roleGroup = t;
		t.anchorOffsetY = 0;
		t.height = 151;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchEnabled = false;
		t.elementsContent = [this._Group7_i(),this.G2_i()];
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.top = 50;
		t.x = 0;
		t.elementsContent = [this._RoleIcon1_i(),this.vipBtn_i(),this._Group5_i(),this._Group6_i()];
		return t;
	};
	_proto._RoleIcon1_i = function () {
		var t = new RoleIcon();
		t.skinName = "roleIconSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.vipBtn_i = function () {
		var t = new VipIcon();
		this.vipBtn = t;
		t.skinName = "vipIconSkin";
		t.x = 126;
		t.y = 55;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.x = 226;
		t.y = 55;
		t.elementsContent = [this.reBtn_i()];
		return t;
	};
	_proto.reBtn_i = function () {
		var t = new eui.Button();
		this.reBtn = t;
		t.icon = "cz";
		t.label = "";
		t.skinName = "Btn000Skin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.width = 234;
		t.x = 101;
		t.y = 5;
		t.elementsContent = [this._Image1_i(),this.labfight_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zhanli";
		t.verticalCenter = 1;
		t.x = 13.5;
		return t;
	};
	_proto.labfight_i = function () {
		var t = new eui.BitmapLabel();
		this.labfight = t;
		t.font = "fightpower_fnt";
		t.text = "";
		t.verticalCenter = 0.5;
		t.x = 81;
		return t;
	};
	_proto.G2_i = function () {
		var t = new MapMess();
		this.G2 = t;
		t.right = 0;
		t.skinName = "mapMessSkin";
		t.y = 55;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.visible = false;
		t.elementsContent = [this._Image2_i(),this._Group8_i(),this.exp_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(264,10,151,67);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "xk";
		t.y = 80;
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 139;
		t.horizontalCenter = 0;
		t.width = 649;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.roleBtn_i(),this.bagBtn_i(),this.riskBtn_i(),this.skillBtn_i(),this.achieveBtn_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "bottom";
		return t;
	};
	_proto.roleBtn_i = function () {
		var t = new Btn01();
		this.roleBtn = t;
		t.bottom = 0;
		t.height = 119;
		t.left = 0;
		t.s0 = "1";
		t.s1 = "1_1";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainBtnSkin";
		t.width = 119;
		return t;
	};
	_proto.bagBtn_i = function () {
		var t = new Btn01();
		this.bagBtn = t;
		t.bottom = 0;
		t.height = 119;
		t.horizontalCenter = -146;
		t.s0 = "2";
		t.s1 = "2_2";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainBtnSkin";
		t.width = 119;
		return t;
	};
	_proto.riskBtn_i = function () {
		var t = new Btn01();
		this.riskBtn = t;
		t.bottom = 0;
		t.height = 139;
		t.horizontalCenter = 0;
		t.s0 = "7";
		t.s1 = "7_7";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainBtnSkin";
		t.width = 151;
		return t;
	};
	_proto.skillBtn_i = function () {
		var t = new Btn01();
		this.skillBtn = t;
		t.bottom = 0;
		t.height = 119;
		t.horizontalCenter = 146;
		t.s0 = "5";
		t.s1 = "5_5";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainBtnSkin";
		t.width = 119;
		return t;
	};
	_proto.achieveBtn_i = function () {
		var t = new Btn01();
		this.achieveBtn = t;
		t.bottom = 0;
		t.height = 119;
		t.right = 0;
		t.s0 = "8";
		t.s1 = "8_8";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainBtnSkin";
		t.width = 119;
		return t;
	};
	_proto.exp_i = function () {
		var t = new eui.ProgressBar();
		this.exp = t;
		t.bottom = -2;
		t.left = 108;
		t.right = 108;
		t.skinName = "expProgress";
		t.value = 100;
		return t;
	};
	return mainUISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/Win2Skin.exml'] = window.Win2Skin = (function (_super) {
	__extends(Win2Skin, _super);
	function Win2Skin() {
		_super.call(this);
		this.skinParts = ["rc","r","l","newCloseBtn00","title","g0"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.rc_i(),this.g0_i()];
	}
	var _proto = Win2Skin.prototype;

	_proto.rc_i = function () {
		var t = new eui.Rect();
		this.rc = t;
		t.bottom = 0;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.height = 800;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 612;
		t.elementsContent = [this.r_i(),this.l_i(),this.newCloseBtn00_i(),this.title_i()];
		return t;
	};
	_proto.r_i = function () {
		var t = new eui.Image();
		this.r = t;
		t.bottom = 0;
		t.horizontalCenter = 152;
		t.right = 1;
		t.scale9Grid = new egret.Rectangle(318,67,35,12);
		t.source = "buyTip";
		t.top = 0;
		return t;
	};
	_proto.l_i = function () {
		var t = new eui.Image();
		this.l = t;
		t.bottom = 0;
		t.horizontalCenter = -153;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(190,67,22,12);
		t.scaleX = -1;
		t.source = "buyTip";
		t.top = 0;
		return t;
	};
	_proto.newCloseBtn00_i = function () {
		var t = new eui.Button();
		this.newCloseBtn00 = t;
		t.horizontalCenter = 274;
		t.label = "";
		t.skinName = "CloseBtn01";
		t.top = -7;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Label();
		this.title = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.text = "邮  件";
		t.textAlign = "center";
		t.textColor = 0x774919;
		t.y = 18;
		return t;
	};
	return Win2Skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/mainUI/ReborthSkin.exml'] = window.ReborthSkin = (function (_super) {
	__extends(ReborthSkin, _super);
	function ReborthSkin() {
		_super.call(this);
		this.skinParts = ["reborthBtn","awardGroup","l0"];
		
		this.height = 1069;
		this.width = 750;
		this.elementsContent = [this._BaseWin11_i(),this._Group2_i()];
	}
	var _proto = ReborthSkin.prototype;

	_proto._BaseWin11_i = function () {
		var t = new BaseWin1();
		t.bgH = 550;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "Win2Skin";
		t.titleS = "重  生";
		t.top = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 550;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 612;
		t.elementsContent = [this._Group1_i(),this.reborthBtn_i(),this.awardGroup_i(),this.l0_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.bottom = 24;
		t.height = 101;
		t.horizontalCenter = 0.5;
		t.elementsContent = [this._Image1_i(),this._Label1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(18,15,11,10);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dikuang_ggg";
		t.top = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.height = 79;
		t.lineSpacing = 10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "重生后将重置人物等级、经验、所有装备强化等级、关卡数、金币数量！";
		t.textAlign = "left";
		t.textColor = 0xf90707;
		t.verticalAlign = "justify";
		t.verticalCenter = 0;
		t.width = 557;
		t.x = 8;
		return t;
	};
	_proto.reborthBtn_i = function () {
		var t = new eui.Button();
		this.reborthBtn = t;
		t.bottom = 158;
		t.horizontalCenter = 0.5;
		t.icon = "";
		t.label = "重 生";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "Btn002Skin";
		return t;
	};
	_proto.awardGroup_i = function () {
		var t = new eui.DataGroup();
		this.awardGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 272;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = BaseItemSkin;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.null = "";
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.stroke = 0.5;
		t.text = "重生后将获得如下奖励:";
		t.textColor = 0x1b09f9;
		t.x = 30;
		t.y = 88;
		return t;
	};
	return ReborthSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/mainUI/selectSkillSkin.exml'] = window.selectSkillSkin = (function (_super) {
	__extends(selectSkillSkin, _super);
	function selectSkillSkin() {
		_super.call(this);
		this.skinParts = ["skill0","skill1","skill2","skill3","s","jt"];
		
		this.height = 284;
		this.width = 246;
		this.elementsContent = [this._Image1_i(),this.s_i(),this.jt_i()];
	}
	var _proto = selectSkillSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 254;
		t.scale9Grid = new egret.Rectangle(24,22,6,7);
		t.source = "圆角矩形-123";
		t.width = 246;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.s_i = function () {
		var t = new eui.Group();
		this.s = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.y = 20;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.skill0_i(),this.skill1_i(),this.skill2_i(),this.skill3_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.requestedColumnCount = 2;
		t.requestedRowCount = 2;
		return t;
	};
	_proto.skill0_i = function () {
		var t = new SkillCompeonent();
		this.skill0 = t;
		t.height = 102;
		t.width = 102;
		t.x = 62;
		t.y = 25;
		return t;
	};
	_proto.skill1_i = function () {
		var t = new SkillCompeonent();
		this.skill1 = t;
		t.height = 102;
		t.width = 102;
		t.x = 145;
		t.y = 39;
		return t;
	};
	_proto.skill2_i = function () {
		var t = new SkillCompeonent();
		this.skill2 = t;
		t.height = 102;
		t.width = 102;
		t.x = 77;
		t.y = 11;
		return t;
	};
	_proto.skill3_i = function () {
		var t = new SkillCompeonent();
		this.skill3 = t;
		t.height = 102;
		t.width = 102;
		t.x = 102;
		t.y = 63;
		return t;
	};
	_proto.jt_i = function () {
		var t = new eui.Image();
		this.jt = t;
		t.horizontalCenter = 0.5;
		t.source = "形状-47";
		t.y = 246;
		return t;
	};
	return selectSkillSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/mainUI/SkillCompeonentSkin.exml'] = window.SkillCompeonentSkin = (function (_super) {
	__extends(SkillCompeonentSkin, _super);
	function SkillCompeonentSkin() {
		_super.call(this);
		this.skinParts = ["w1","icon","sname","cd","rc","suo"];
		
		this.height = 138;
		this.width = 176;
		this.elementsContent = [this.w1_i(),this.icon_i(),this.sname_i(),this.cd_i(),this.rc_i(),this.suo_i()];
	}
	var _proto = SkillCompeonentSkin.prototype;

	_proto.w1_i = function () {
		var t = new eui.Image();
		this.w1 = t;
		t.horizontalCenter = 0;
		t.source = "ww2";
		t.top = 0;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 89;
		t.horizontalCenter = -1.5;
		t.source = "";
		t.touchEnabled = false;
		t.verticalCenter = -12.5;
		t.width = 89;
		return t;
	};
	_proto.sname_i = function () {
		var t = new eui.Label();
		this.sname = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 24;
		t.stroke = 3;
		t.strokeColor = 0x894e2a;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.touchEnabled = false;
		t.width = 148;
		t.y = 110;
		return t;
	};
	_proto.cd_i = function () {
		var t = new eui.Label();
		this.cd = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 20;
		t.stroke = 0.5;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xf70202;
		t.touchEnabled = false;
		t.verticalCenter = -13.5;
		t.percentWidth = 100;
		return t;
	};
	_proto.rc_i = function () {
		var t = new eui.Rect();
		this.rc = t;
		t.fillAlpha = 0.5;
		t.height = 102;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = -12;
		t.visible = false;
		t.width = 102;
		return t;
	};
	_proto.suo_i = function () {
		var t = new eui.Image();
		this.suo = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "suo";
		t.verticalCenter = -10.5;
		t.x = -48;
		t.y = -20;
		return t;
	};
	return SkillCompeonentSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/mainUI/UIViewSkin.exml'] = window.UIViewSkin = (function (_super) {
	__extends(UIViewSkin, _super);
	function UIViewSkin() {
		_super.call(this);
		this.skinParts = ["mailBtn","rankBtn","taskBtn","shopBtn","noticeBtn","newsBtn","arenaBtn","copyBtn","btnGroup","roleBtn","bagBtn","riskBtn","skillBtn","achieveBtn","g0"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.btnGroup_i(),this._Group3_i()];
	}
	var _proto = UIViewSkin.prototype;

	_proto.btnGroup_i = function () {
		var t = new eui.Group();
		this.btnGroup = t;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Group1_i(),this._Group2_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.left = 15;
		t.y = 433;
		t.elementsContent = [this.mailBtn_i(),this.rankBtn_i(),this.taskBtn_i(),this.shopBtn_i()];
		return t;
	};
	_proto.mailBtn_i = function () {
		var t = new eui.Button();
		this.mailBtn = t;
		t.label = "Button";
		t.skinName = "Btn27Skin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.rankBtn_i = function () {
		var t = new eui.Button();
		this.rankBtn = t;
		t.label = "Button";
		t.skinName = "Btn23Skin";
		t.x = 0;
		t.y = 125;
		return t;
	};
	_proto.taskBtn_i = function () {
		var t = new eui.Button();
		this.taskBtn = t;
		t.label = "Button";
		t.skinName = "Btn24Skin";
		t.x = 0;
		t.y = 250.01;
		return t;
	};
	_proto.shopBtn_i = function () {
		var t = new eui.Button();
		this.shopBtn = t;
		t.label = "Button";
		t.skinName = "Btn25Skin";
		t.x = 0;
		t.y = 383.34;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.right = 46;
		t.y = 358.79;
		t.elementsContent = [this.noticeBtn_i(),this.newsBtn_i(),this.arenaBtn_i(),this.copyBtn_i()];
		return t;
	};
	_proto.noticeBtn_i = function () {
		var t = new eui.Button();
		this.noticeBtn = t;
		t.label = "Button";
		t.skinName = "Btn21Skin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.newsBtn_i = function () {
		var t = new eui.Button();
		this.newsBtn = t;
		t.label = "Button";
		t.skinName = "Btn26Skin";
		t.visible = false;
		t.x = 0;
		t.y = 130.67;
		return t;
	};
	_proto.arenaBtn_i = function () {
		var t = new eui.Button();
		this.arenaBtn = t;
		t.label = "Button";
		t.skinName = "Btn22Skin";
		t.x = 0;
		t.y = 324.22;
		return t;
	};
	_proto.copyBtn_i = function () {
		var t = new eui.Button();
		this.copyBtn = t;
		t.label = "Button";
		t.skinName = "Btn20Skin";
		t.x = 0;
		t.y = 457.55;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 1167;
		t.elementsContent = [this._Image1_i(),this.g0_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(264,10,151,67);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "xk";
		t.x = 0;
		t.y = 80;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 139;
		t.width = 649;
		t.x = 51;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.roleBtn_i(),this.bagBtn_i(),this.riskBtn_i(),this.skillBtn_i(),this.achieveBtn_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		t.horizontalAlign = "center";
		t.verticalAlign = "bottom";
		return t;
	};
	_proto.roleBtn_i = function () {
		var t = new Btn01();
		this.roleBtn = t;
		t.s0 = "1";
		t.s1 = "1_1";
		t.skinName = "MainBtnSkin";
		t.x = 22;
		t.y = -233;
		return t;
	};
	_proto.bagBtn_i = function () {
		var t = new Btn01();
		this.bagBtn = t;
		t.s0 = "2";
		t.s1 = "2_2";
		t.skinName = "MainBtnSkin";
		t.x = 22;
		t.y = -233;
		return t;
	};
	_proto.riskBtn_i = function () {
		var t = new Btn01();
		this.riskBtn = t;
		t.height = 139;
		t.s0 = "7";
		t.s1 = "7_7";
		t.skinName = "MainBtnSkin";
		t.width = 151;
		t.x = 22;
		t.y = -233;
		return t;
	};
	_proto.skillBtn_i = function () {
		var t = new Btn01();
		this.skillBtn = t;
		t.s0 = "5";
		t.s1 = "5_5";
		t.skinName = "MainBtnSkin";
		t.x = 384.40000000000003;
		t.y = -233;
		return t;
	};
	_proto.achieveBtn_i = function () {
		var t = new Btn01();
		this.achieveBtn = t;
		t.s0 = "8";
		t.s1 = "8_8";
		t.skinName = "MainBtnSkin";
		t.x = 22;
		t.y = -233;
		return t;
	};
	return UIViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/offline/offlineSkin.exml'] = window.offlineSkin = (function (_super) {
	__extends(offlineSkin, _super);
	function offlineSkin() {
		_super.call(this);
		this.skinParts = ["l0","b1","b0","l1","l2","l4","l5"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._BaseWin11_i(),this._Group8_i()];
	}
	var _proto = offlineSkin.prototype;

	_proto._BaseWin11_i = function () {
		var t = new BaseWin1();
		t.bgH = 500;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "Win2Skin";
		t.titleS = "离 线 信 息";
		t.top = 0;
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 500;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 612;
		t.elementsContent = [this.l0_i(),this.b1_i(),this._Group7_i()];
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.size = 24;
		t.text = "xxxxxxxxxxx";
		t.textAlign = "center";
		t.textColor = 0xf70707;
		t.width = 500;
		t.x = 55;
		t.y = 92;
		return t;
	};
	_proto.b1_i = function () {
		var t = new eui.Button();
		this.b1 = t;
		t.bottom = 28;
		t.icon = "确定";
		t.label = "";
		t.skinName = "Btn002Skin";
		t.x = 199;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 234;
		t.x = 29;
		t.y = 138;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.b0_i(),this._Group3_i(),this._Group6_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 184;
		t.scale9Grid = new egret.Rectangle(21,21,14,7);
		t.source = "dikuang_ggg";
		t.width = 260;
		t.x = 0;
		t.y = 49;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 184;
		t.scale9Grid = new egret.Rectangle(28,20,7,7);
		t.source = "dikuang_ggg";
		t.width = 260;
		t.x = 293;
		t.y = 49;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.source = "off12";
		t.x = 28;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.source = "off13";
		t.x = 356;
		t.y = 2;
		return t;
	};
	_proto.b0_i = function () {
		var t = new eui.Button();
		this.b0 = t;
		t.icon = "前往激活";
		t.label = "";
		t.skinName = "Btn005Skin";
		t.x = 341;
		t.y = 160;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 8;
		t.y = 66;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group1_i(),this._Group2_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 10;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Label1_i(),this._Image5_i(),this.l1_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 25;
		t.text = "经验：";
		t.textColor = 0x774919;
		t.x = 0;
		t.y = 8;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 41;
		t.source = "shop5";
		t.x = 71;
		t.y = 0;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.size = 30;
		t.text = "Label";
		t.width = 120;
		t.x = 85;
		t.y = 6;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 2;
		t.y = 51;
		t.elementsContent = [this._Label2_i(),this._Image6_i(),this.l2_i()];
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 25;
		t.text = "金币：";
		t.textColor = 0x774919;
		t.x = 0;
		t.y = 8;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 41;
		t.source = "shop5";
		t.x = 71;
		t.y = 0;
		return t;
	};
	_proto.l2_i = function () {
		var t = new eui.Label();
		this.l2 = t;
		t.size = 30;
		t.text = "Label";
		t.width = 120;
		t.x = 85;
		t.y = 6;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.x = 306;
		t.y = 66;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this._Group4_i(),this._Group5_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Label3_i(),this._Image7_i(),this.l4_i()];
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 25;
		t.text = "经验：";
		t.textColor = 0x774919;
		t.x = 0;
		t.y = 8;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 41;
		t.source = "shop5";
		t.x = 71;
		t.y = 0;
		return t;
	};
	_proto.l4_i = function () {
		var t = new eui.Label();
		this.l4 = t;
		t.size = 30;
		t.text = "Label";
		t.textAlign = "center";
		t.x = 89;
		t.y = 8;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Label4_i(),this._Image8_i(),this.l5_i()];
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 25;
		t.text = "金币：";
		t.textColor = 0x774919;
		t.x = 0;
		t.y = 8;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 41;
		t.source = "shop5";
		t.x = 71;
		t.y = 0;
		return t;
	};
	_proto.l5_i = function () {
		var t = new eui.Label();
		this.l5 = t;
		t.size = 30;
		t.text = "Label";
		t.textAlign = "center";
		t.x = 89;
		t.y = 8;
		return t;
	};
	return offlineSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/player/PlayerEquipItemSkin.exml'] = window.PlayerEquipItemSkin = (function (_super) {
	__extends(PlayerEquipItemSkin, _super);
	function PlayerEquipItemSkin() {
		_super.call(this);
		this.skinParts = ["item"];
		
		this.height = 139;
		this.width = 114;
		this.elementsContent = [this.item_i()];
	}
	var _proto = PlayerEquipItemSkin.prototype;

	_proto.item_i = function () {
		var t = new ForgeItem();
		this.item = t;
		t.skinName = "EquipSkin";
		return t;
	};
	return PlayerEquipItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/player/ReplaceItemSkin.exml'] = window.ReplaceItemSkin = (function (_super) {
	__extends(ReplaceItemSkin, _super);
	function ReplaceItemSkin() {
		_super.call(this);
		this.skinParts = ["itemIcon","eFighting","labType0","labType1","labType2","labType3","repBtn","g0"];
		
		this.height = 180;
		this.width = 590;
		this.elementsContent = [this._Image1_i(),this.itemIcon_i(),this.g0_i()];
	}
	var _proto = ReplaceItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(31,30,3,5);
		t.source = "kuang_jgg11";
		t.top = 0;
		return t;
	};
	_proto.itemIcon_i = function () {
		var t = new BaseItem();
		this.itemIcon = t;
		t.skinName = "BaseItemSkin";
		t.x = 24;
		t.y = 25;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.x = 145;
		t.y = 15;
		t.elementsContent = [this.eFighting_i(),this._Image2_i(),this._Group1_i(),this.repBtn_i()];
		return t;
	};
	_proto.eFighting_i = function () {
		var t = new eui.BitmapLabel();
		this.eFighting = t;
		t.font = "power_fnt";
		t.text = "0000";
		t.x = 79;
		t.y = 6;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "power11";
		t.x = 6;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 118;
		t.width = 330;
		t.x = 0;
		t.y = 37;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.labType0_i(),this.labType1_i(),this.labType2_i(),this.labType3_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 8;
		return t;
	};
	_proto.labType0_i = function () {
		var t = new eui.Label();
		this.labType0 = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "物理攻击:99999";
		t.textAlign = "left";
		t.textColor = 0x92422c;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.labType1_i = function () {
		var t = new eui.Label();
		this.labType1 = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "攻击：99999";
		t.textAlign = "left";
		t.textColor = 0x92422c;
		t.x = 169;
		t.y = 1;
		return t;
	};
	_proto.labType2_i = function () {
		var t = new eui.Label();
		this.labType2 = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "攻击：99999";
		t.textAlign = "left";
		t.textColor = 0x92422c;
		t.y = 32;
		return t;
	};
	_proto.labType3_i = function () {
		var t = new eui.Label();
		this.labType3 = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "物理攻击:99999";
		t.textAlign = "left";
		t.textColor = 0x92422c;
		t.x = 169;
		t.y = 66;
		return t;
	};
	_proto.repBtn_i = function () {
		var t = new eui.Button();
		this.repBtn = t;
		t.icon = "";
		t.label = "装备";
		t.skinName = "Btn000Skin";
		t.x = 334;
		t.y = 51;
		return t;
	};
	return ReplaceItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/player/PlayerEquipReplaceSkin.exml'] = window.PlayerEquipReplaceSkin = (function (_super) {
	__extends(PlayerEquipReplaceSkin, _super);
	function PlayerEquipReplaceSkin() {
		_super.call(this);
		this.skinParts = ["c","itemList","itemScroller","group","viewStack"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._BaseWin11_i(),this._Group1_i()];
	}
	var _proto = PlayerEquipReplaceSkin.prototype;

	_proto._BaseWin11_i = function () {
		var t = new BaseWin1();
		t.bgH = 937;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "Win2Skin";
		t.titleS = "装 备 更 换";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 937;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.elementsContent = [this._Label1_i(),this.c_i(),this._Label2_i(),this.viewStack_i(),this._Image1_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.horizontalCenter = 0.5;
		t.size = 25;
		t.stroke = 0.5;
		t.text = "当前装备";
		t.textColor = 0x0715f9;
		t.y = 76.56;
		return t;
	};
	_proto.c_i = function () {
		var t = new ReplaceItemRender();
		this.c = t;
		t.horizontalCenter = 0;
		t.skinName = "ReplaceItemSkin";
		t.y = 107;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.horizontalCenter = 0.5;
		t.size = 24;
		t.stroke = 0.5;
		t.text = "选择装备";
		t.textColor = 0xfc0707;
		t.y = 355.32;
		return t;
	};
	_proto.viewStack_i = function () {
		var t = new eui.ViewStack();
		this.viewStack = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 535.27;
		t.horizontalCenter = 0;
		t.selectedIndex = 0;
		t.width = 590;
		t.y = 388;
		t.elementsContent = [this.group_i()];
		return t;
	};
	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.name = "Group";
		t.visible = true;
		t.elementsContent = [this.itemScroller_i()];
		return t;
	};
	_proto.itemScroller_i = function () {
		var t = new eui.Scroller();
		this.itemScroller = t;
		t.anchorOffsetY = 0;
		t.height = 522;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.visible = true;
		t.y = 6;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = ReplaceItemSkin;
		t.visible = true;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 10;
		t.paddingLeft = 0;
		t.requestedColumnCount = 1;
		t.verticalGap = 10;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.left = 20;
		t.right = 20;
		t.scale9Grid = new egret.Rectangle(115,0,25,3);
		t.source = "圆角矩形-3";
		t.y = 321;
		return t;
	};
	return PlayerEquipReplaceSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/player/PlayerSkin.exml'] = window.PlayerSkin = (function (_super) {
	__extends(PlayerSkin, _super);
	var PlayerSkin$Skin14 = 	(function (_super) {
		__extends(PlayerSkin$Skin14, _super);
		function PlayerSkin$Skin14() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","xiang_2")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PlayerSkin$Skin14.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "xiang_1";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return PlayerSkin$Skin14;
	})(eui.Skin);

	function PlayerSkin() {
		_super.call(this);
		this.skinParts = ["win","role","equip0","equip1","equip2","equip3","equip4","equip5","equip6","equip8","equip9","equip7","equipGrp","labTypes","dg","btnForge","btnGem","btnArtifact","f","g0"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Image1_i(),this.role_i(),this.equipGrp_i(),this._Group5_i(),this._Group6_i(),this.g0_i()];
	}
	var _proto = PlayerSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "t_6";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "ditu_png";
		t.y = 123.62;
		return t;
	};
	_proto.role_i = function () {
		var t = new eui.Image();
		this.role = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.y = 285;
		return t;
	};
	_proto.equipGrp_i = function () {
		var t = new eui.Group();
		this.equipGrp = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.width = 628;
		t.y = 212;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i(),this._Group4_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 68;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.equip0_i(),this.equip1_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 400;
		return t;
	};
	_proto.equip0_i = function () {
		var t = new PlayerEquipItem();
		this.equip0 = t;
		t.skinName = "PlayerEquipItemSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.equip1_i = function () {
		var t = new PlayerEquipItem();
		this.equip1 = t;
		t.skinName = "PlayerEquipItemSkin";
		t.x = 448;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 228;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.equip2_i(),this.equip3_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 400;
		return t;
	};
	_proto.equip2_i = function () {
		var t = new PlayerEquipItem();
		this.equip2 = t;
		t.skinName = "PlayerEquipItemSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.equip3_i = function () {
		var t = new PlayerEquipItem();
		this.equip3 = t;
		t.skinName = "PlayerEquipItemSkin";
		t.x = 448;
		t.y = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 327;
		t.layout = this._HorizontalLayout3_i();
		t.elementsContent = [this.equip4_i(),this.equip5_i()];
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 400;
		return t;
	};
	_proto.equip4_i = function () {
		var t = new PlayerEquipItem();
		this.equip4 = t;
		t.skinName = "PlayerEquipItemSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.equip5_i = function () {
		var t = new PlayerEquipItem();
		this.equip5 = t;
		t.skinName = "PlayerEquipItemSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 327;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.equip6_i(),this.equip8_i(),this.equip9_i(),this.equip7_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.equip6_i = function () {
		var t = new PlayerEquipItem();
		this.equip6 = t;
		t.skinName = "PlayerEquipItemSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.equip8_i = function () {
		var t = new PlayerEquipItem();
		this.equip8 = t;
		t.skinName = "PlayerEquipItemSkin";
		t.x = 120;
		t.y = 0;
		return t;
	};
	_proto.equip9_i = function () {
		var t = new PlayerEquipItem();
		this.equip9 = t;
		t.skinName = "PlayerEquipItemSkin";
		t.x = 393;
		return t;
	};
	_proto.equip7_i = function () {
		var t = new PlayerEquipItem();
		this.equip7 = t;
		t.skinName = "PlayerEquipItemSkin";
		t.x = 513;
		t.y = 0;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 275;
		t.horizontalCenter = 1;
		t.width = 640;
		t.y = 799.45;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this._Label1_i(),this.labTypes_i(),this.dg_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(40,52,240,5);
		t.source = "sx_1";
		t.top = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 1;
		t.scale9Grid = new egret.Rectangle(40,52,240,5);
		t.scaleX = -1;
		t.source = "sx_1";
		t.top = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Arial";
		t.height = 42;
		t.size = 25;
		t.text = "属  性";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.touchEnabled = true;
		t.verticalAlign = "middle";
		t.width = 214;
		t.x = 215;
		t.y = 2.17;
		return t;
	};
	_proto.labTypes_i = function () {
		var t = new eui.Button();
		this.labTypes = t;
		t.label = "";
		t.x = 575;
		t.y = 8;
		t.skinName = PlayerSkin$Skin14;
		return t;
	};
	_proto.dg_i = function () {
		var t = new eui.DataGroup();
		this.dg = t;
		t.anchorOffsetX = 0;
		t.height = 200;
		t.horizontalCenter = 0;
		t.width = 530;
		t.y = 56;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnWidth = 265;
		t.paddingLeft = 0;
		t.requestedColumnCount = 2;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 167;
		t.horizontalCenter = 0.5;
		t.layout = this._HorizontalLayout4_i();
		t.elementsContent = [this.btnForge_i(),this.btnGem_i(),this.btnArtifact_i()];
		return t;
	};
	_proto._HorizontalLayout4_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.btnForge_i = function () {
		var t = new eui.Button();
		this.btnForge = t;
		t.icon = "锻造";
		t.label = "";
		t.skinName = "Btn003Skin";
		t.x = 109;
		t.y = 14;
		return t;
	};
	_proto.btnGem_i = function () {
		var t = new eui.Button();
		this.btnGem = t;
		t.icon = "宝石";
		t.label = "";
		t.skinName = "Btn003Skin";
		t.x = 119;
		t.y = 24;
		return t;
	};
	_proto.btnArtifact_i = function () {
		var t = new eui.Button();
		this.btnArtifact = t;
		t.icon = "神器";
		t.label = "";
		t.skinName = "Btn003Skin";
		t.x = 109;
		t.y = 14;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.horizontalCenter = 0;
		t.y = 138;
		t.elementsContent = [this._Image4_i(),this._Image5_i(),this.f_i(),this._Image6_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "pbg1";
		t.x = 6;
		t.y = 26;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "pbg0";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.f_i = function () {
		var t = new eui.BitmapLabel();
		this.f = t;
		t.font = "power_fnt";
		t.text = "0000";
		t.x = 146;
		t.y = 23;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "power11";
		t.x = 73;
		t.y = 17;
		return t;
	};
	return PlayerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/player/PlayerTypesSkin.exml'] = window.PlayerTypesSkin = (function (_super) {
	__extends(PlayerTypesSkin, _super);
	function PlayerTypesSkin() {
		_super.call(this);
		this.skinParts = ["l0","l1"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._BaseWin11_i(),this._Group3_i()];
	}
	var _proto = PlayerTypesSkin.prototype;

	_proto._BaseWin11_i = function () {
		var t = new BaseWin1();
		t.bgH = 800;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "Win2Skin";
		t.titleS = "详 细 属 性";
		t.top = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 800;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 612;
		t.elementsContent = [this._Group2_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 19;
		t.top = 70;
		t.width = 585;
		t.x = 13;
		t.elementsContent = [this._Image1_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(11,18,20,13);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dikuang_ggg";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 10;
		t.left = 10;
		t.right = 10;
		t.scrollPolicyH = "off";
		t.scrollPolicyV = "off";
		t.top = 10;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.l0_i(),this.l1_i()];
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.lineSpacing = 15;
		t.size = 24;
		t.text = "";
		t.textColor = 0x92422c;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.lineSpacing = 15;
		t.size = 24;
		t.text = "";
		t.textColor = 0x92422c;
		t.x = 300;
		t.y = 10;
		return t;
	};
	return PlayerTypesSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/player/PropertySkin.exml'] = window.PropertySkin = (function (_super) {
	__extends(PropertySkin, _super);
	function PropertySkin() {
		_super.call(this);
		this.skinParts = ["pn","pv"];
		
		this.height = 36;
		this.width = 265;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.pn_i(),this.pv_i()];
	}
	var _proto = PropertySkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "pp1";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 4;
		t.source = "pp0";
		t.verticalCenter = 0;
		return t;
	};
	_proto.pn_i = function () {
		var t = new eui.Label();
		this.pn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.size = 24;
		t.text = "物理防御";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.verticalAlign = "middle";
		t.width = 101;
		t.x = 3;
		t.y = 2;
		return t;
	};
	_proto.pv_i = function () {
		var t = new eui.Label();
		this.pv = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 30;
		t.size = 22;
		t.text = "物理防御";
		t.textAlign = "left";
		t.textColor = 0x92422c;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 140;
		t.x = 115;
		return t;
	};
	return PropertySkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/pve/PVEIISkin.exml'] = window.PVEIISkin = (function (_super) {
	__extends(PVEIISkin, _super);
	function PVEIISkin() {
		_super.call(this);
		this.skinParts = ["win","ls","newCloseBtn"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Scroller1_i(),this._Group1_i()];
	}
	var _proto = PVEIISkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "fbtitle";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1046;
		t.horizontalCenter = -3;
		t.scrollPolicyH = "off";
		t.width = 660;
		t.y = 128;
		t.viewport = this.ls_i();
		return t;
	};
	_proto.ls_i = function () {
		var t = new eui.DataGroup();
		this.ls = t;
		t.anchorOffsetY = 0;
		t.height = 1048;
		t.itemRenderer = PVERenderII;
		t.x = 2;
		t.y = 1;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 9;
		t.height = 114;
		t.horizontalCenter = 0;
		t.visible = false;
		t.width = 736;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.newCloseBtn_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 3;
		t.horizontalAlign = "left";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.newCloseBtn_i = function () {
		var t = new eui.ToggleButton();
		this.newCloseBtn = t;
		t.bottom = 15;
		t.icon = "6";
		t.left = 137;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainBtnSkin";
		t.x = 56;
		t.y = -6;
		return t;
	};
	return PVEIISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/pve/PVERenderSkinII.exml'] = window.PVERenderSkinII = (function (_super) {
	__extends(PVERenderSkinII, _super);
	function PVERenderSkinII() {
		_super.call(this);
		this.skinParts = ["bg","l0","l1","l2","l3","l4"];
		
		this.height = 220;
		this.width = 650;
		this.elementsContent = [this._Image1_i(),this.bg_i(),this._Image2_i(),this.l0_i(),this.l1_i(),this.l2_i(),this.l3_i(),this.l4_i()];
	}
	var _proto = PVERenderSkinII.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(29,29,5,4);
		t.source = "kuang_jgg11";
		t.top = 0;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = 0;
		t.source = "fb4_png";
		t.verticalCenter = -4;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "fb7";
		t.x = 351;
		t.y = 137;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 32;
		t.text = "沉默的神殿";
		t.x = 43;
		t.y = 34;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.size = 20;
		t.text = "参与人数:99999";
		t.visible = false;
		t.x = 212;
		t.y = 50;
		return t;
	};
	_proto.l2_i = function () {
		var t = new eui.Label();
		this.l2 = t;
		t.size = 20;
		t.text = "开放时间:全天";
		t.x = 51;
		t.y = 121;
		return t;
	};
	_proto.l3_i = function () {
		var t = new eui.Label();
		this.l3 = t;
		t.size = 20;
		t.text = "挑战可获得:";
		t.x = 51;
		t.y = 151;
		return t;
	};
	_proto.l4_i = function () {
		var t = new eui.Label();
		this.l4 = t;
		t.size = 22;
		t.text = "挑战可获得";
		t.x = 366;
		t.y = 143;
		return t;
	};
	return PVERenderSkinII;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/pve/PVESkin.exml'] = window.PVESkin = (function (_super) {
	__extends(PVESkin, _super);
	function PVESkin() {
		_super.call(this);
		this.skinParts = ["win","ls"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Scroller1_i()];
	}
	var _proto = PVESkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "fbtitle";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 156;
		t.horizontalCenter = -2;
		t.scrollPolicyH = "off";
		t.top = 132;
		t.width = 650;
		t.viewport = this.ls_i();
		return t;
	};
	_proto.ls_i = function () {
		var t = new eui.DataGroup();
		this.ls = t;
		t.itemRenderer = PVERender;
		t.x = 1;
		t.y = 293;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	return PVESkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/pvp/PVPVoSkin.exml'] = window.PVPVoSkin = (function (_super) {
	__extends(PVPVoSkin, _super);
	function PVPVoSkin() {
		_super.call(this);
		this.skinParts = ["eff","rname","power","rank","icon","role"];
		
		this.height = 400;
		this.width = 300;
		this.elementsContent = [this.eff_i(),this._Image1_i(),this._Image2_i(),this.rname_i(),this.power_i(),this.rank_i(),this.icon_i(),this.role_i()];
	}
	var _proto = PVPVoSkin.prototype;

	_proto.eff_i = function () {
		var t = new eui.Image();
		this.eff = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.visible = false;
		t.y = 37;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 76;
		t.horizontalCenter = 0;
		t.source = "pvp07";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "pvp13";
		return t;
	};
	_proto.rname_i = function () {
		var t = new eui.Label();
		this.rname = t;
		t.anchorOffsetY = 0;
		t.bottom = 30;
		t.height = 22;
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "111";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.width = 180;
		return t;
	};
	_proto.power_i = function () {
		var t = new eui.Label();
		this.power = t;
		t.anchorOffsetY = 0;
		t.bottom = 3;
		t.height = 22;
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "111";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.width = 180;
		return t;
	};
	_proto.rank_i = function () {
		var t = new eui.Label();
		this.rank = t;
		t.anchorOffsetY = 0;
		t.bottom = 58;
		t.height = 22;
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "111";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.width = 180;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.top = 0;
		return t;
	};
	_proto.role_i = function () {
		var t = new eui.Image();
		this.role = t;
		t.horizontalCenter = 11;
		t.scaleX = 0.65;
		t.scaleY = 0.65;
		t.source = "";
		t.y = 7;
		return t;
	};
	return PVPVoSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/pvp/PVPSkin.exml'] = window.PVPSkin = (function (_super) {
	__extends(PVPSkin, _super);
	function PVPSkin() {
		_super.call(this);
		this.skinParts = ["win","l0","l2","l1","l4","l3","r2","r1","r0","btn","btn0"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Image1_i(),this._Group1_i(),this._Group2_i(),this.r2_i(),this.r1_i(),this.r0_i(),this.btn_i(),this.btn0_i()];
	}
	var _proto = PVPSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "jjctitle";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "pvp0_png";
		t.y = 132;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.y = 1003;
		t.elementsContent = [this._Image2_i(),this.l0_i(),this._Label1_i(),this.l2_i(),this.l1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -1;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "pvp03";
		t.x = 0;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.horizontalCenter = -222;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 22;
		t.text = "当前排名：99999";
		t.textColor = 0xede4b3;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 6.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 22;
		t.text = "每日奖励:";
		t.textColor = 0x11f714;
		t.verticalCenter = 0;
		return t;
	};
	_proto.l2_i = function () {
		var t = new eui.Label();
		this.l2 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 22;
		t.text = "";
		t.verticalCenter = 0;
		t.x = 517;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.DataGroup();
		this.l1 = t;
		t.horizontalCenter = 180;
		t.itemRendererSkinName = AwardShowSkin;
		t.width = 240;
		t.y = 6;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 195.5;
		t.y = 146;
		t.elementsContent = [this._Image3_i(),this.l4_i(),this.l3_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "pvp08";
		t.x = 3;
		t.y = 0;
		return t;
	};
	_proto.l4_i = function () {
		var t = new eui.Label();
		this.l4 = t;
		t.fontFamily = "KaiTi";
		t.size = 22;
		t.text = "挑战次数:";
		t.textAlign = "left";
		t.textColor = 0xede4b3;
		t.x = 7;
		t.y = 56;
		return t;
	};
	_proto.l3_i = function () {
		var t = new eui.Label();
		this.l3 = t;
		t.fontFamily = "KaiTi";
		t.size = 22;
		t.text = "我的战斗力:999999";
		t.textAlign = "left";
		t.textColor = 0xede4b3;
		t.x = 7;
		t.y = 20;
		return t;
	};
	_proto.r2_i = function () {
		var t = new PVPRender();
		this.r2 = t;
		t.horizontalCenter = 161;
		t.skinName = "PVPVoSkin";
		t.y = 336;
		return t;
	};
	_proto.r1_i = function () {
		var t = new PVPRender();
		this.r1 = t;
		t.horizontalCenter = -166;
		t.skinName = "PVPVoSkin";
		t.y = 554;
		return t;
	};
	_proto.r0_i = function () {
		var t = new PVPRender();
		this.r0 = t;
		t.horizontalCenter = -156;
		t.skinName = "PVPVoSkin";
		t.top = 141;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.bottom = 180;
		t.horizontalCenter = -140;
		t.icon = "pvp01";
		t.label = "";
		t.skinName = "Btn002Skin";
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.bottom = 180;
		t.horizontalCenter = 140;
		t.icon = "领取";
		t.label = "";
		t.skinName = "Btn002Skin";
		return t;
	};
	return PVPSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/rank/RankRenderSkin.exml'] = window.RankRenderSkin = (function (_super) {
	__extends(RankRenderSkin, _super);
	function RankRenderSkin() {
		_super.call(this);
		this.skinParts = ["tt","l0","l1","l2","l3"];
		
		this.height = 40;
		this.width = 640;
		this.elementsContent = [this.tt_i(),this.l0_i(),this.l1_i(),this.l2_i(),this.l3_i()];
	}
	var _proto = RankRenderSkin.prototype;

	_proto.tt_i = function () {
		var t = new eui.Image();
		this.tt = t;
		t.horizontalCenter = 0;
		t.source = "rankI";
		t.verticalCenter = 0;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.fontFamily = "KaiTi";
		t.text = "990";
		t.textAlign = "center";
		t.textColor = 0x92422c;
		t.verticalCenter = 0;
		t.width = 60;
		t.x = 38;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.fontFamily = "KaiTi";
		t.text = "xx";
		t.textAlign = "center";
		t.textColor = 0x92422c;
		t.verticalCenter = 0;
		t.width = 150;
		t.x = 148;
		return t;
	};
	_proto.l2_i = function () {
		var t = new eui.Label();
		this.l2 = t;
		t.fontFamily = "KaiTi";
		t.text = "1";
		t.textAlign = "center";
		t.textColor = 0x92422c;
		t.verticalCenter = 0;
		t.width = 150;
		t.x = 317;
		return t;
	};
	_proto.l3_i = function () {
		var t = new eui.Label();
		this.l3 = t;
		t.fontFamily = "KaiTi";
		t.right = 9;
		t.text = "1";
		t.textAlign = "center";
		t.textColor = 0x92422c;
		t.verticalCenter = 0;
		t.width = 150;
		return t;
	};
	return RankRenderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/rank/RankSkin.exml'] = window.RankSkin = (function (_super) {
	__extends(RankSkin, _super);
	function RankSkin() {
		_super.call(this);
		this.skinParts = ["win","dg","l0","l1","l2","l3","r0","btn0","btn1","btn2","btn3"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Group4_i(),this._Group5_i(),this._Group6_i()];
	}
	var _proto = RankSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.skinName = "Win0Skin";
		t.titleS = "phbtitle";
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 947;
		t.horizontalCenter = 0;
		t.width = 650;
		t.y = 136;
		t.elementsContent = [this._Image1_i(),this._Scroller1_i(),this._Group3_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(11,18,20,13);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dikuang_ggg";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 12;
		t.horizontalCenter = 0;
		t.scrollPolicyV = "on";
		t.top = 139;
		t.width = 640;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 1;
		t.y = 2;
		t.elementsContent = [this.dg_i()];
		return t;
	};
	_proto.dg_i = function () {
		var t = new eui.DataGroup();
		this.dg = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 80;
		t.elementsContent = [this._Image2_i(),this._Group2_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "rank3";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.verticalCenter = -1;
		t.x = 40;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.l0_i(),this.l1_i(),this.l2_i(),this.l3_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 100;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.text = "排行";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.x = 0;
		t.y = 6;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.text = "名字";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.x = 144;
		t.y = 0;
		return t;
	};
	_proto.l2_i = function () {
		var t = new eui.Label();
		this.l2 = t;
		t.text = "等级";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.x = 326;
		t.y = 0;
		return t;
	};
	_proto.l3_i = function () {
		var t = new eui.Label();
		this.l3 = t;
		t.text = "战力";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.x = 528;
		t.y = 0;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.bottom = 192;
		t.horizontalCenter = 0;
		t.elementsContent = [this._Image3_i(),this.r0_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "rank2";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.r0_i = function () {
		var t = new eui.Label();
		this.r0 = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.text = "1111";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.verticalCenter = 0;
		t.width = 603;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.top = 147;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.btn0_i(),this.btn1_i(),this.btn2_i(),this.btn3_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.btn0_i = function () {
		var t = new ToggleBtn01();
		this.btn0 = t;
		t.label = "";
		t.s0 = "biaoqian_0003_战力榜";
		t.s1 = "biaoqian_0003_战力榜";
		t.skinName = "ToBtn000Skin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btn1_i = function () {
		var t = new ToggleBtn01();
		this.btn1 = t;
		t.s0 = "biaoqian_0002_等级榜";
		t.s1 = "biaoqian_0002_等级榜";
		t.skinName = "ToBtn000Skin";
		t.x = 177;
		t.y = 0;
		return t;
	};
	_proto.btn2_i = function () {
		var t = new ToggleBtn01();
		this.btn2 = t;
		t.s0 = "biaoqian_0001_土豪榜";
		t.s1 = "biaoqian_0001_土豪榜";
		t.skinName = "ToBtn000Skin";
		t.x = 354;
		t.y = 0;
		return t;
	};
	_proto.btn3_i = function () {
		var t = new ToggleBtn01();
		this.btn3 = t;
		t.s0 = "biaoqian_0000_竞技榜";
		t.s1 = "biaoqian_0000_竞技榜";
		t.skinName = "ToBtn000Skin";
		t.x = 364;
		t.y = 10;
		return t;
	};
	return RankSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/recharge/RechargeItemSkin.exml'] = window.RechargeItemSkin = (function (_super) {
	__extends(RechargeItemSkin, _super);
	var RechargeItemSkin$Skin15 = 	(function (_super) {
		__extends(RechargeItemSkin$Skin15, _super);
		function RechargeItemSkin$Skin15() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","recharge_json.eItemBg")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","recharge_json.eItemBg")
					])
			];
		}
		var _proto = RechargeItemSkin$Skin15.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "recharge_json.eItemBg";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RechargeItemSkin$Skin15;
	})(eui.Skin);

	function RechargeItemSkin() {
		_super.call(this);
		this.skinParts = ["buyBtn","new","labNum","diamonds","labName","title"];
		
		this.height = 211;
		this.width = 305;
		this.elementsContent = [this.buyBtn_i(),this.new_i(),this.labNum_i(),this.diamonds_i(),this.labName_i(),this.title_i()];
	}
	var _proto = RechargeItemSkin.prototype;

	_proto.buyBtn_i = function () {
		var t = new eui.Button();
		this.buyBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.enabled = true;
		t.horizontalCenter = 0;
		t.label = "";
		t.verticalCenter = 0;
		t.skinName = RechargeItemSkin$Skin15;
		return t;
	};
	_proto.new_i = function () {
		var t = new eui.Image();
		this.new = t;
		t.left = 0;
		t.source = "recharge_json.new";
		t.top = 0;
		t.touchEnabled = false;
		return t;
	};
	_proto.labNum_i = function () {
		var t = new eui.Label();
		this.labNum = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.text = "Label";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.y = 165;
		return t;
	};
	_proto.diamonds_i = function () {
		var t = new eui.Image();
		this.diamonds = t;
		t.horizontalCenter = 0;
		t.source = "bsaa";
		t.touchEnabled = false;
		t.y = 88;
		return t;
	};
	_proto.labName_i = function () {
		var t = new eui.Label();
		this.labName = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.horizontalCenter = 0;
		t.text = "额外赠送20%";
		t.textAlign = "center";
		t.textColor = 0x16f704;
		t.touchEnabled = false;
		t.y = 49.32;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Label();
		this.title = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 15;
		t.text = "6800钻石";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.width = 192.67;
		t.y = 4;
		return t;
	};
	return RechargeItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/recharge/RechargeSkin.exml'] = window.RechargeSkin = (function (_super) {
	__extends(RechargeSkin, _super);
	function RechargeSkin() {
		_super.call(this);
		this.skinParts = ["win","reItemGroup"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Image1_i(),this._Scroller1_i(),this._Label1_i()];
	}
	var _proto = RechargeSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "cztitle";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1030;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(21,20,8,8);
		t.source = "dikuang_ggg";
		t.width = 643;
		t.y = 133;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 991;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.width = 612;
		t.y = 155;
		t.viewport = this.reItemGroup_i();
		return t;
	};
	_proto.reItemGroup_i = function () {
		var t = new eui.DataGroup();
		this.reItemGroup = t;
		t.anchorOffsetY = 0;
		t.height = 1032;
		t.scrollEnabled = true;
		t.x = 0;
		t.y = 1;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnAlign = "left";
		t.horizontalAlign = "center";
		t.horizontalGap = 5;
		t.paddingLeft = 0;
		t.requestedColumnCount = 2;
		t.rowHeight = 220;
		t.verticalAlign = "top";
		t.verticalGap = 10;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "KaiTi_GB2312";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "首次充值可获得对应额度所赠送的百分比钻石!";
		t.textColor = 0xf70707;
		t.y = 1117;
		return t;
	};
	return RechargeSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/rewardItemTipSkin.exml'] = window.rewardItemTipSkin = (function (_super) {
	__extends(rewardItemTipSkin, _super);
	function rewardItemTipSkin() {
		_super.call(this);
		this.skinParts = ["bg","itemIcon","item","nn","l3","btn2"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = rewardItemTipSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this.bg_i(),this.itemIcon_i(),this.item_i(),this.nn_i(),this.l3_i(),this.btn2_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 446;
		t.scale9Grid = new egret.Rectangle(86,49,520,300);
		t.source = "tipsBg";
		t.width = 582;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.itemIcon_i = function () {
		var t = new ItemIcon();
		this.itemIcon = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "ItemIconSkin";
		t.x = 220;
		t.y = 78;
		return t;
	};
	_proto.item_i = function () {
		var t = new eui.Image();
		this.item = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 90;
		t.width = 100;
		t.x = 226;
		t.y = 90;
		return t;
	};
	_proto.nn_i = function () {
		var t = new eui.Label();
		this.nn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 43;
		t.size = 26;
		t.text = "";
		t.textAlign = "center";
		t.width = 130;
		t.x = 161;
		t.y = 37;
		return t;
	};
	_proto.l3_i = function () {
		var t = new eui.Label();
		this.l3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.size = 24;
		t.text = "属性";
		t.textAlign = "center";
		t.width = 424;
		t.x = 63;
		t.y = 223;
		return t;
	};
	_proto.btn2_i = function () {
		var t = new eui.Button();
		this.btn2 = t;
		t.height = 64;
		t.icon = "";
		t.label = "确定";
		t.skinName = "Btn1Skin";
		t.x = 207;
		t.y = 307;
		return t;
	};
	return rewardItemTipSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/task/AwardShowSkin.exml'] = window.AwardShowSkin = (function (_super) {
	__extends(AwardShowSkin, _super);
	function AwardShowSkin() {
		_super.call(this);
		this.skinParts = ["goldImg","labGold"];
		
		this.height = 40;
		this.width = 140;
		this.elementsContent = [this.goldImg_i(),this.labGold_i()];
	}
	var _proto = AwardShowSkin.prototype;

	_proto.goldImg_i = function () {
		var t = new eui.Image();
		this.goldImg = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto.labGold_i = function () {
		var t = new eui.Label();
		this.labGold = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.stroke = 0.1;
		t.text = "111";
		t.textColor = 0xf7093c;
		t.verticalCenter = 0;
		t.width = 90;
		t.x = 52;
		return t;
	};
	return AwardShowSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/shop/shopItemSkin.exml'] = window.shopItemSkin = (function (_super) {
	__extends(shopItemSkin, _super);
	function shopItemSkin() {
		_super.call(this);
		this.skinParts = ["item","labName","buyBtn","lbMoney","c"];
		
		this.height = 175;
		this.width = 650;
		this.elementsContent = [this._Group2_i()];
	}
	var _proto = shopItemSkin.prototype;

	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image1_i(),this.item_i(),this.labName_i(),this.buyBtn_i(),this._Group1_i(),this.c_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(32,31,4,7);
		t.source = "kuang_jgg11";
		t.top = 0;
		return t;
	};
	_proto.item_i = function () {
		var t = new ItemIcon();
		this.item = t;
		t.skinName = "ItemIconSkin";
		t.verticalCenter = 0.5;
		t.x = 44;
		return t;
	};
	_proto.labName_i = function () {
		var t = new eui.Label();
		this.labName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 30;
		t.stroke = 2;
		t.strokeColor = 0x894e2a;
		t.text = "道具名称";
		t.textAlign = "left";
		t.textColor = 0xf7a504;
		t.x = 176;
		t.y = 32;
		return t;
	};
	_proto.buyBtn_i = function () {
		var t = new eui.Button();
		this.buyBtn = t;
		t.icon = "购买";
		t.label = "";
		t.skinName = "Btn005Skin";
		t.verticalCenter = 0.5;
		t.x = 426;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 64;
		t.x = 167;
		t.y = 67;
		t.elementsContent = [this._Image2_i(),this.lbMoney_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.scale9Grid = new egret.Rectangle(65,32,14,11);
		t.source = "shop5";
		t.width = 225;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbMoney_i = function () {
		var t = new AwardShow();
		this.lbMoney = t;
		t.skinName = "AwardShowSkin";
		t.x = 13;
		t.y = 10;
		return t;
	};
	_proto.c_i = function () {
		var t = new eui.Label();
		this.c = t;
		t.anchorOffsetX = 0;
		t.size = 25;
		t.stroke = 0.1;
		t.text = "剩余xxx购买次数";
		t.textAlign = "left";
		t.textColor = 0xfc0505;
		t.verticalAlign = "justify";
		t.verticalCenter = 53;
		t.x = 421;
		return t;
	};
	return shopItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/shop/shopSkin.exml'] = window.shopSkin = (function (_super) {
	__extends(shopSkin, _super);
	function shopSkin() {
		_super.call(this);
		this.skinParts = ["win","list","itemScroller","b0","b1","b2","b3"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Group1_i(),this._Group2_i()];
	}
	var _proto = shopSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "shop图层-13";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 953;
		t.horizontalCenter = 0;
		t.name = "Group";
		t.width = 650;
		t.y = 216;
		t.elementsContent = [this.itemScroller_i()];
		return t;
	};
	_proto.itemScroller_i = function () {
		var t = new eui.Scroller();
		this.itemScroller = t;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.scrollPolicyH = "off";
		t.top = 0;
		t.width = 650;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 9533;
		t.itemRendererSkinName = shopItemSkin;
		t.x = -2;
		t.y = 22;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 5;
		t.paddingLeft = 5;
		t.requestedColumnCount = 1;
		t.verticalGap = 6;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.top = 136;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.b0_i(),this.b1_i(),this.b2_i(),this.b3_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.b0_i = function () {
		var t = new ToggleBtn01();
		this.b0 = t;
		t.label = "";
		t.s0 = "道具";
		t.s1 = "道具";
		t.skinName = "ToBtn000Skin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.b1_i = function () {
		var t = new ToggleBtn01();
		this.b1 = t;
		t.label = "";
		t.s0 = "宝石";
		t.s1 = "宝石";
		t.skinName = "ToBtn000Skin";
		t.x = 133;
		t.y = 0;
		return t;
	};
	_proto.b2_i = function () {
		var t = new ToggleBtn01();
		this.b2 = t;
		t.label = "";
		t.s0 = "竞技";
		t.s1 = "竞技";
		t.skinName = "ToBtn000Skin";
		t.x = 278;
		t.y = 0;
		return t;
	};
	_proto.b3_i = function () {
		var t = new ToggleBtn01();
		this.b3 = t;
		t.label = "";
		t.s0 = "黑市";
		t.s1 = "黑市";
		t.skinName = "ToBtn000Skin";
		t.x = 278;
		t.y = 0;
		return t;
	};
	return shopSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/shop/suerBuyTipSkin.exml'] = window.suerBuyTipSkin = (function (_super) {
	__extends(suerBuyTipSkin, _super);
	var suerBuyTipSkin$Skin16 = 	(function (_super) {
		__extends(suerBuyTipSkin$Skin16, _super);
		function suerBuyTipSkin$Skin16() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","-1")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = suerBuyTipSkin$Skin16.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "-";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return suerBuyTipSkin$Skin16;
	})(eui.Skin);

	var suerBuyTipSkin$Skin17 = 	(function (_super) {
		__extends(suerBuyTipSkin$Skin17, _super);
		function suerBuyTipSkin$Skin17() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","+1")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = suerBuyTipSkin$Skin17.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "+";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return suerBuyTipSkin$Skin17;
	})(eui.Skin);

	function suerBuyTipSkin() {
		_super.call(this);
		this.skinParts = ["goldImg","lbMoney","lbNum","samllBtn","maxBtn","sureBtn"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._BaseWin11_i(),this._Group3_i()];
	}
	var _proto = suerBuyTipSkin.prototype;

	_proto._BaseWin11_i = function () {
		var t = new BaseWin1();
		t.bgH = 500;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "Win2Skin";
		t.titleS = "离 线 信 息";
		t.top = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 1334;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 750;
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this.sureBtn_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 661;
		t.elementsContent = [this.goldImg_i(),this.lbMoney_i()];
		return t;
	};
	_proto.goldImg_i = function () {
		var t = new eui.Image();
		this.goldImg = t;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "money_2";
		t.x = 0;
		t.y = 4;
		return t;
	};
	_proto.lbMoney_i = function () {
		var t = new eui.Label();
		this.lbMoney = t;
		t.text = "1000";
		t.textAlign = "left";
		t.x = 36.1;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 564;
		t.elementsContent = [this.lbNum_i(),this.samllBtn_i(),this.maxBtn_i()];
		return t;
	};
	_proto.lbNum_i = function () {
		var t = new eui.TextInput();
		this.lbNum = t;
		t.enabled = true;
		t.height = 42;
		t.text = "0";
		t.verticalCenter = 0;
		t.width = 153;
		t.x = 85;
		return t;
	};
	_proto.samllBtn_i = function () {
		var t = new eui.Button();
		this.samllBtn = t;
		t.anchorOffsetX = 0;
		t.icon = "-";
		t.label = "";
		t.verticalCenter = 0;
		t.x = 0;
		t.skinName = suerBuyTipSkin$Skin16;
		return t;
	};
	_proto.maxBtn_i = function () {
		var t = new eui.Button();
		this.maxBtn = t;
		t.anchorOffsetX = 0;
		t.icon = "+";
		t.label = "";
		t.verticalCenter = 0;
		t.x = 246;
		t.skinName = suerBuyTipSkin$Skin17;
		return t;
	};
	_proto.sureBtn_i = function () {
		var t = new eui.Button();
		this.sureBtn = t;
		t.horizontalCenter = 0.5;
		t.icon = "确定";
		t.label = "";
		t.skinName = "Btn002Skin";
		t.y = 720;
		return t;
	};
	return suerBuyTipSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/skill/SkillItemSkin.exml'] = window.SkillItemSkin = (function (_super) {
	__extends(SkillItemSkin, _super);
	function SkillItemSkin() {
		_super.call(this);
		this.skinParts = ["icon","labName","labLv","l0","suo","red"];
		
		this.height = 118;
		this.width = 115;
		this.elementsContent = [this.icon_i(),this.labName_i(),this._Image1_i(),this.labLv_i(),this.l0_i(),this.suo_i(),this.red_i()];
	}
	var _proto = SkillItemSkin.prototype;

	_proto.icon_i = function () {
		var t = new eui.Component();
		this.icon = t;
		t.horizontalCenter = 0;
		t.skinName = "ItemIconSkin";
		return t;
	};
	_proto.labName_i = function () {
		var t = new eui.Label();
		this.labName = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0.5;
		t.size = 22;
		t.stroke = 3;
		t.strokeColor = 0x894e2a;
		t.text = "111111";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.width = 146;
		t.y = 113;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "图层-3";
		t.x = 51;
		t.y = 82;
		return t;
	};
	_proto.labLv_i = function () {
		var t = new eui.Label();
		this.labLv = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.right = 4;
		t.size = 18;
		t.text = "LV:100";
		t.textColor = 0xede4b3;
		t.width = 60;
		t.y = 86;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.alpha = 0.8;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.background = true;
		t.bold = true;
		t.border = false;
		t.borderColor = 0xf90202;
		t.fontFamily = "KaiTi";
		t.height = 79;
		t.right = 5;
		t.size = 25;
		t.stroke = 0.5;
		t.text = "装配中";
		t.textColor = 0x0241ff;
		t.visible = false;
		t.width = 25;
		t.y = 6;
		return t;
	};
	_proto.suo_i = function () {
		var t = new eui.Group();
		this.suo = t;
		t.height = 110;
		t.visible = false;
		t.width = 115;
		t.elementsContent = [this._Image2_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "suo";
		t.verticalCenter = 0;
		t.x = -48;
		t.y = -20;
		return t;
	};
	_proto.red_i = function () {
		var t = new eui.Image();
		this.red = t;
		t.right = 0;
		t.source = "red";
		t.top = 0;
		t.visible = false;
		return t;
	};
	return SkillItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/skill/lookSkillSkin.exml'] = window.lookSkillSkin = (function (_super) {
	__extends(lookSkillSkin, _super);
	function lookSkillSkin() {
		_super.call(this);
		this.skinParts = ["jt","des","l","l6","btn","g2","g1","g0","l7","btn0"];
		
		this.height = 330;
		this.width = 652;
		this.elementsContent = [this._Image1_i(),this.jt_i(),this._Group1_i(),this._Image3_i(),this.g2_i(),this.g1_i(),this.g0_i(),this.l7_i(),this.btn0_i()];
	}
	var _proto = lookSkillSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(10,10,16,16);
		t.source = "ditu_jgg_2";
		t.top = 26;
		return t;
	};
	_proto.jt_i = function () {
		var t = new eui.Image();
		this.jt = t;
		t.source = "形状-1";
		t.x = 270;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 82;
		t.height = 67;
		t.left = 18;
		t.right = 18;
		t.elementsContent = [this.des_i(),this._Image2_i()];
		return t;
	};
	_proto.des_i = function () {
		var t = new eui.Label();
		this.des = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 4;
		t.left = 8;
		t.right = 8;
		t.size = 24;
		t.text = "";
		t.textColor = 0xede4b3;
		t.top = 4;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(18,11,19,15);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dikuang_ggg";
		t.top = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "图层-812";
		t.x = 150;
		t.y = 59;
		return t;
	};
	_proto.g2_i = function () {
		var t = new eui.Group();
		this.g2 = t;
		t.x = 462;
		t.y = 61;
		t.elementsContent = [this._Label1_i(),this.l_i(),this.l6_i(),this.btn_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 25;
		t.text = "消耗:";
		t.textColor = 0xede4b3;
		t.x = 10;
		t.y = 0;
		return t;
	};
	_proto.l_i = function () {
		var t = new eui.Image();
		this.l = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "";
		t.x = 64;
		t.y = -12;
		return t;
	};
	_proto.l6_i = function () {
		var t = new eui.Label();
		this.l6 = t;
		t.size = 24;
		t.text = "1";
		t.x = 104;
		t.y = 4;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.icon = "技能升级";
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "Btn005Skin";
		t.y = 41;
		return t;
	};
	_proto.g1_i = function () {
		var t = new SkillIconItemII();
		this.g1 = t;
		t.skinName = "SkillItemSkin";
		t.x = 14;
		t.y = 38;
		return t;
	};
	_proto.g0_i = function () {
		var t = new SkillIconItemII();
		this.g0 = t;
		t.skinName = "SkillItemSkin";
		t.x = 250;
		t.y = 38;
		return t;
	};
	_proto.l7_i = function () {
		var t = new eui.Label();
		this.l7 = t;
		t.bold = true;
		t.text = "已达最高等级！";
		t.textColor = 0xf70404;
		t.x = 250;
		t.y = 80;
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.label = "使  用";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "Btn005Skin";
		t.x = 242;
		t.y = 260;
		return t;
	};
	return lookSkillSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/skill/SkillLvItemRender.exml'] = window.SkillLvItemRender = (function (_super) {
	__extends(SkillLvItemRender, _super);
	function SkillLvItemRender() {
		_super.call(this);
		this.skinParts = ["skillList","labLv","l3","n0","g0"];
		
		this.height = 170;
		this.width = 652;
		this.elementsContent = [this._Image1_i(),this._Group1_i(),this.g0_i()];
	}
	var _proto = SkillLvItemRender.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(29,30,5,4);
		t.source = "kuang_jgg11";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.y = 29;
		t.elementsContent = [this.skillList_i(),this.labLv_i(),this.l3_i()];
		return t;
	};
	_proto.skillList_i = function () {
		var t = new eui.List();
		this.skillList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 115.67;
		t.itemRendererSkinName = SkillItemSkin;
		t.visible = true;
		t.width = 500;
		t.x = 136;
		t.y = -14;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "center";
		t.horizontalGap = 8;
		t.paddingLeft = 5;
		t.requestedRowCount = 1;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.label = "数据1";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.label = "数据2";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.label = "null";
		return t;
	};
	_proto.labLv_i = function () {
		var t = new eui.Label();
		this.labLv = t;
		t.fontFamily = "Microsoft YaHei";
		t.stroke = 1;
		t.text = "1";
		t.textColor = 0x894e2a;
		t.visible = false;
		t.x = 58;
		t.y = 44;
		return t;
	};
	_proto.l3_i = function () {
		var t = new eui.Label();
		this.l3 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 30;
		t.stroke = 3;
		t.strokeColor = 0x894e2a;
		t.text = "222";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.verticalCenter = 0;
		t.width = 129;
		t.x = 9;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.percentHeight = 100;
		t.visible = false;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.n0_i()];
		return t;
	};
	_proto.n0_i = function () {
		var t = new eui.Label();
		this.n0 = t;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 26;
		t.stroke = 0.2;
		t.text = "22级解锁";
		t.textAlign = "center";
		t.textColor = 0xf90202;
		t.verticalCenter = 51;
		t.x = 21;
		return t;
	};
	return SkillLvItemRender;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/skill/SkillSkin.exml'] = window.SkillSkin = (function (_super) {
	__extends(SkillSkin, _super);
	function SkillSkin() {
		_super.call(this);
		this.skinParts = ["win","itemGroup"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Group1_i()];
	}
	var _proto = SkillSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "skillTitle";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 160;
		t.horizontalCenter = -2;
		t.name = "Group";
		t.top = 138;
		t.width = 652;
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scrollPolicyH = "off";
		t.top = 0;
		t.viewport = this.itemGroup_i();
		return t;
	};
	_proto.itemGroup_i = function () {
		var t = new eui.Group();
		this.itemGroup = t;
		return t;
	};
	return SkillSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/task/AchievementSkin.exml'] = window.AchievementSkin = (function (_super) {
	__extends(AchievementSkin, _super);
	function AchievementSkin() {
		_super.call(this);
		this.skinParts = ["win","dg"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Scroller1_i()];
	}
	var _proto = AchievementSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "task0";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 160;
		t.horizontalCenter = -2;
		t.scrollPolicyV = "on";
		t.top = 139;
		t.width = 650;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.dg_i()];
		return t;
	};
	_proto.dg_i = function () {
		var t = new eui.DataGroup();
		this.dg = t;
		t.percentWidth = 100;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	return AchievementSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/task/AchieveRenderSkin.exml'] = window.AchieveRenderSkin = (function (_super) {
	__extends(AchieveRenderSkin, _super);
	function AchieveRenderSkin() {
		_super.call(this);
		this.skinParts = ["items","btn1","l0","btn","l1","l2","g0"];
		
		this.height = 185;
		this.width = 650;
		this.elementsContent = [this._Image1_i(),this.items_i(),this.btn1_i(),this.l0_i(),this.btn_i(),this._Group1_i()];
	}
	var _proto = AchieveRenderSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(30,29,5,5);
		t.source = "kuang_jgg11";
		t.top = 0;
		return t;
	};
	_proto.items_i = function () {
		var t = new BaseItem();
		this.items = t;
		t.skinName = "BaseItemSkin";
		t.x = 22;
		t.y = 62;
		return t;
	};
	_proto.btn1_i = function () {
		var t = new eui.Button();
		this.btn1 = t;
		t.label = "领取奖励";
		t.right = 20;
		t.skinName = "Btn005Skin";
		t.verticalCenter = 0;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 30;
		t.lineSpacing = 5;
		t.size = 26;
		t.stroke = 3;
		t.strokeColor = 0x894e2a;
		t.text = "奖励:";
		t.textAlign = "center";
		t.textColor = 0xede4b3;
		t.verticalAlign = "middle";
		t.width = 149;
		t.x = 5;
		t.y = 25;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Image();
		this.btn = t;
		t.right = 50;
		t.source = "dacheng1";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 109;
		t.width = 363;
		t.x = 155;
		t.y = 52;
		t.elementsContent = [this._Image2_i(),this.l1_i(),this.l2_i(),this.g0_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(35,12,72,76);
		t.source = "圆角矩形-5";
		t.top = 0;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.stroke = 2;
		t.strokeColor = 0xaa7849;
		t.text = ".1111";
		t.textColor = 0xede4b3;
		t.verticalAlign = "middle";
		t.width = 340;
		t.x = 15;
		t.y = 17;
		return t;
	};
	_proto.l2_i = function () {
		var t = new eui.Label();
		this.l2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 30;
		t.lineSpacing = 5;
		t.size = 24;
		t.stroke = 2;
		t.strokeColor = 0xaa7849;
		t.text = "奖励:";
		t.textColor = 0xede4b3;
		t.verticalAlign = "middle";
		t.width = 57;
		t.x = 15;
		t.y = 67;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.width = 280;
		t.x = 78;
		t.y = 62;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "left";
		return t;
	};
	return AchieveRenderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/task/TaskRenderSkin.exml'] = window.TaskRenderSkin = (function (_super) {
	__extends(TaskRenderSkin, _super);
	var TaskRenderSkin$Skin18 = 	(function (_super) {
		__extends(TaskRenderSkin$Skin18, _super);
		function TaskRenderSkin$Skin18() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TaskRenderSkin$Skin18.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "day7BtnD";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return TaskRenderSkin$Skin18;
	})(eui.Skin);

	var TaskRenderSkin$Skin19 = 	(function (_super) {
		__extends(TaskRenderSkin$Skin19, _super);
		function TaskRenderSkin$Skin19() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TaskRenderSkin$Skin19.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "day7BtnS";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return TaskRenderSkin$Skin19;
	})(eui.Skin);

	var TaskRenderSkin$Skin20 = 	(function (_super) {
		__extends(TaskRenderSkin$Skin20, _super);
		function TaskRenderSkin$Skin20() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = TaskRenderSkin$Skin20.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "day7BtnN";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return TaskRenderSkin$Skin20;
	})(eui.Skin);

	function TaskRenderSkin() {
		_super.call(this);
		this.skinParts = ["btn","l1","l2","items","btn0","btn1","g0","l0"];
		
		this.height = 185;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this.btn_i(),this.l1_i(),this.l2_i(),this.items_i(),this.btn0_i(),this.btn1_i(),this.g0_i(),this.l0_i()];
	}
	var _proto = TaskRenderSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "task01";
		t.x = -13;
		t.y = -15;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.label = "";
		t.verticalCenter = -15;
		t.visible = false;
		t.x = 558;
		t.skinName = TaskRenderSkin$Skin18;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.anchorOffsetX = 0;
		t.text = ".";
		t.verticalAlign = "middle";
		t.width = 536;
		t.x = 169;
		t.y = 26;
		return t;
	};
	_proto.l2_i = function () {
		var t = new eui.Label();
		this.l2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.lineSpacing = 5;
		t.size = 20;
		t.text = "奖励:";
		t.verticalAlign = "middle";
		t.width = 50;
		t.x = 170;
		t.y = 99;
		return t;
	};
	_proto.items_i = function () {
		var t = new BaseItem();
		this.items = t;
		t.x = 16;
		t.y = 55;
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.label = "";
		t.verticalCenter = -15;
		t.visible = false;
		t.x = 558;
		t.skinName = TaskRenderSkin$Skin19;
		return t;
	};
	_proto.btn1_i = function () {
		var t = new eui.Button();
		this.btn1 = t;
		t.label = "";
		t.verticalCenter = -15;
		t.visible = false;
		t.x = 558;
		t.skinName = TaskRenderSkin$Skin20;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.width = 313;
		t.x = 222;
		t.y = 91;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "left";
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.lineSpacing = 5;
		t.size = 30;
		t.text = "奖励:";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 155;
		t.x = 3;
		t.y = 14;
		return t;
	};
	return TaskRenderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/task/TaskSkin.exml'] = window.TaskSkin = (function (_super) {
	__extends(TaskSkin, _super);
	function TaskSkin() {
		_super.call(this);
		this.skinParts = ["win","dg0","dg1","vs","btn1","btn2"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this.vs_i(),this._Group4_i()];
	}
	var _proto = TaskSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "task05";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto.vs_i = function () {
		var t = new eui.ViewStack();
		this.vs = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 172;
		t.horizontalCenter = 0.5;
		t.selectedIndex = 1;
		t.top = 225;
		t.width = 647;
		t.elementsContent = [this._Group2_i(),this._Scroller2_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 939;
		t.scaleX = 1;
		t.scaleY = 1;
		t.scrollPolicyV = "on";
		t.percentWidth = 100;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 828;
		t.x = 0;
		t.y = 111;
		t.elementsContent = [this.dg0_i()];
		return t;
	};
	_proto.dg0_i = function () {
		var t = new eui.DataGroup();
		this.dg0 = t;
		t.percentWidth = 100;
		return t;
	};
	_proto._Scroller2_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.scrollPolicyV = "on";
		t.top = 0;
		t.visible = false;
		t.percentWidth = 100;
		t.viewport = this._Group3_i();
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.dg1_i()];
		return t;
	};
	_proto.dg1_i = function () {
		var t = new eui.DataGroup();
		this.dg1 = t;
		t.percentWidth = 100;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = -134;
		t.y = 139;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.btn1_i(),this.btn2_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.btn1_i = function () {
		var t = new ToggleBtn01();
		this.btn1 = t;
		t.s0 = "主线";
		t.s1 = "主线";
		t.skinName = "ToBtn000Skin";
		t.x = 407;
		t.y = 81;
		return t;
	};
	_proto.btn2_i = function () {
		var t = new ToggleBtn01();
		this.btn2 = t;
		t.s0 = "日常";
		t.s1 = "日常";
		t.skinName = "ToBtn000Skin";
		t.x = 572;
		t.y = 78;
		return t;
	};
	return TaskSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/tips_skin.exml'] = window.tips_skin = (function (_super) {
	__extends(tips_skin, _super);
	function tips_skin() {
		_super.call(this);
		this.skinParts = ["bg","label"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = tips_skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 45;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 200;
		t.elementsContent = [this.bg_i(),this._Image1_i(),this.label_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Rect();
		this.bg = t;
		t.fillAlpha = 0.5;
		t.visible = false;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 20;
		t.width = 20;
		t.x = 8;
		t.y = 15;
		return t;
	};
	_proto.label_i = function () {
		var t = new eui.Label();
		this.label = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 30;
		t.text = "阿斯蒂芬阿斯蒂芬";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	return tips_skin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/TipsViewSkin.exml'] = window.TipsViewSkin = (function (_super) {
	__extends(TipsViewSkin, _super);
	function TipsViewSkin() {
		_super.call(this);
		this.skinParts = ["win1","buyBtn1","buyBtn0","buyBtn2","labDesc"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win1_i(),this._Group1_i()];
	}
	var _proto = TipsViewSkin.prototype;

	_proto.win1_i = function () {
		var t = new BaseWin1();
		this.win1 = t;
		t.bgH = 400;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "Win2Skin";
		t.titleS = "离 线 信 息";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 320;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 612;
		t.elementsContent = [this.buyBtn1_i(),this.buyBtn0_i(),this.buyBtn2_i(),this.labDesc_i()];
		return t;
	};
	_proto.buyBtn1_i = function () {
		var t = new eui.Button();
		this.buyBtn1 = t;
		t.bottom = 24;
		t.horizontalCenter = -150.5;
		t.icon = "";
		t.label = "确  定";
		t.skinName = "Btn005Skin";
		return t;
	};
	_proto.buyBtn0_i = function () {
		var t = new eui.Button();
		this.buyBtn0 = t;
		t.bottom = 24;
		t.horizontalCenter = -0.5;
		t.icon = "";
		t.label = "确  定";
		t.skinName = "Btn005Skin";
		return t;
	};
	_proto.buyBtn2_i = function () {
		var t = new eui.Button();
		this.buyBtn2 = t;
		t.bottom = 24;
		t.horizontalCenter = 149.5;
		t.icon = "";
		t.label = "确  定";
		t.skinName = "Btn005Skin";
		return t;
	};
	_proto.labDesc_i = function () {
		var t = new eui.Label();
		this.labDesc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.height = 139.64;
		t.horizontalCenter = -0.5;
		t.size = 26;
		t.text = "这是个提示弹窗这是个提示弹窗这是个提示弹窗这是个提示弹窗这是个提示弹窗这是个提示弹窗这是个提示弹窗这是个提示弹窗";
		t.textAlign = "center";
		t.textColor = 0xf40e0e;
		t.verticalAlign = "middle";
		t.width = 553.21;
		t.y = 74.36;
		return t;
	};
	return TipsViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/VIP/VipAwardSkin.exml'] = window.VipAwardSkin = (function (_super) {
	__extends(VipAwardSkin, _super);
	function VipAwardSkin() {
		_super.call(this);
		this.skinParts = ["btn","dg","lvl"];
		
		this.height = 200;
		this.width = 650;
		this.elementsContent = [this._Group2_i()];
	}
	var _proto = VipAwardSkin.prototype;

	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 200;
		t.left = 0;
		t.right = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.btn_i(),this._Scroller1_i(),this.lvl_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 202;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(31,28,2,4);
		t.source = "kuang_jgg11";
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.source = "组-141";
		t.verticalCenter = -10;
		t.x = 19;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.label = "领  取";
		t.scaleX = 0.8;
		t.skinName = "Btn005Skin";
		t.x = 497.5;
		t.y = 67;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 139;
		t.verticalCenter = 0;
		t.width = 402;
		t.x = 92;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.dg_i()];
		return t;
	};
	_proto.dg_i = function () {
		var t = new eui.DataGroup();
		this.dg = t;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = BaseItemSkin;
		t.scaleX = 1;
		t.scaleY = 1;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.lvl_i = function () {
		var t = new eui.Label();
		this.lvl = t;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.size = 24;
		t.text = "20";
		t.textAlign = "center";
		t.width = 25;
		t.x = 38;
		t.y = 92;
		return t;
	};
	return VipAwardSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/VIP/VipProgressBar.exml'] = window.VipProgressBar = (function (_super) {
	__extends(VipProgressBar, _super);
	function VipProgressBar() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.height = 28;
		this.width = 525;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = VipProgressBar.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "VIP_json.v_strip1";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "VIP_json.v_strip2";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.x = 175.5;
		t.y = 27;
		return t;
	};
	return VipProgressBar;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/VIP/VipSkin.exml'] = window.VipSkin = (function (_super) {
	__extends(VipSkin, _super);
	function VipSkin() {
		_super.call(this);
		this.skinParts = ["win","progress","c","labNext","vipList"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.win_i(),this._Group1_i(),this._Scroller1_i()];
	}
	var _proto = VipSkin.prototype;

	_proto.win_i = function () {
		var t = new BaseWin0();
		this.win = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "Win0Skin";
		t.titleS = "vipti";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = -420;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.progress_i(),this.c_i(),this.labNext_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "组-140";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "vip矩形-3";
		t.y = 12;
		return t;
	};
	_proto.progress_i = function () {
		var t = new eui.ProgressBar();
		this.progress = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.direction = "ltr";
		t.enabled = true;
		t.horizontalCenter = 0.5;
		t.skinName = "VipProgressBar";
		t.value = 60;
		t.y = 82;
		return t;
	};
	_proto.c_i = function () {
		var t = new eui.Label();
		this.c = t;
		t.fontFamily = "KaiTi";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "当前VIP等级";
		t.textAlign = "center";
		t.textColor = 0xfc8905;
		t.width = 200;
		t.y = 22;
		return t;
	};
	_proto.labNext_i = function () {
		var t = new eui.Label();
		this.labNext = t;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.height = 68;
		t.horizontalCenter = 0;
		t.lineSpacing = 8;
		t.size = 26;
		t.text = "再充值100钻石，即可成为VIP钻石，即可成为VIP";
		t.textAlign = "center";
		t.textColor = 0x0402ff;
		t.verticalAlign = "justify";
		t.width = 500;
		t.y = 130.67;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 801.15;
		t.horizontalCenter = 0;
		t.width = 650;
		t.y = 365;
		t.viewport = this._Group2_i();
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 982.15;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.vipList_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.vipList_i = function () {
		var t = new eui.DataGroup();
		this.vipList = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.y = -11;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	return VipSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/welcomeSkin.exml'] = window.welcomeSkin = (function (_super) {
	__extends(welcomeSkin, _super);
	var welcomeSkin$Skin21 = 	(function (_super) {
		__extends(welcomeSkin$Skin21, _super);
		function welcomeSkin$Skin21() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","组-47")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = welcomeSkin$Skin21.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "组-46";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return welcomeSkin$Skin21;
	})(eui.Skin);

	function welcomeSkin() {
		_super.call(this);
		this.skinParts = ["rc","btn"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.rc_i(),this._Image1_i(),this.btn_i()];
	}
	var _proto = welcomeSkin.prototype;

	_proto.rc_i = function () {
		var t = new eui.Rect();
		this.rc = t;
		t.bottom = 0;
		t.fillAlpha = 0.6;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "欢迎界面_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.verticalCenter = 247.5;
		t.skinName = welcomeSkin$Skin21;
		return t;
	};
	return welcomeSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);