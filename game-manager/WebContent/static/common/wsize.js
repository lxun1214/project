/*!
 * Copyright &copy; 2015 及时及予(北京)科技有限公司   All rights reserved.
 * 
 * 主框架窗口大小调整
 * @author JWong 
 * @version 2015-6-024
 */

$("#left").width(leftWidth);
$("#openClose").click(function(){
	if($(this).hasClass("close")){
		$(this).removeClass("close");
		$(this).addClass("open");
		$("#left").animate({width:0,opacity:"hide"});
		$("#right").animate({width:$("#content").width()-$("#openClose").width()-5},function(){
			if(typeof openCloseClickCallBack == 'function'){
				openCloseClickCallBack(true);
			}
			wSize();
		});
	}else{
		$(this).addClass("close");
		$(this).removeClass("open");
		$("#left").animate({width:leftWidth,opacity:"show"});
		$("#right").animate({width:$("#content").width()-$("#openClose").width()-leftWidth-9},function(){
			if(typeof openCloseClickCallBack == 'function'){
				openCloseClickCallBack(true);
			}
			wSize();
		});
	}
});
if(!Array.prototype.map)
	Array.prototype.map = function(fn,scope) {
	var result = [],ri = 0;
	for (var i = 0,n = this.length; i < n; i++){
	  if(i in this){
	    result[ri++]  = fn.call(scope ,this[i],i,this);
	  }
	}
	return result;
};
var getWindowSize = function(){
	return ["Height","Width"].map(function(name){
	  return window["inner"+name] ||
		document.compatMode === "CSS1Compat" && document.documentElement[ "client" + name ] || document.body[ "client" + name ];
	});
};
$(window).resize(function(){
	wSize();
});
wSize(); // 在主窗体中定义，设置调整目标