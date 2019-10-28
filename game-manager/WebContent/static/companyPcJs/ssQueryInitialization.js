var ctxComPC='/mwork/cp';
/*--------------全局函数----------------------------------------- */
/*===============================================*/
/*当iframe中内容变化时，自动调整iframe大小*/
function iframeAuto(){
	$("#rightIframe", window.parent.document).stop(true).animate({
		height : $("body").height()
	});
}
/*===============================================*/
function menuAnimate(var1,var2,var3){
		$("#"+var1).click(function(){
			$("form[id!='"+var2+"'] ul").slideUp(function(){
				$("#"+var2+" ul").removeAttr("disabled").slideDown(function(){
					$("."+var3).fadeOut(function(){
						iframeAuto();
					});
				});
			}).attr("disabled","none");
		});
}
/*===============================================*/
/* 更新验证码 */
function upyzm(imgId){
	$.ajax({
		type:"POST",
		url:ctxComPC+"/online/ssDailyQuery/getVilidateCode",
		data:'yzm=2',
		success:function(imageUrl){
			console.info(imageUrl);
			$("#"+imgId).attr('src',imageUrl);
		}
	});
}
/*===============================================*/
/*涉税查询页面初始化执行绑定按钮和页面动画*/
//设置IFRAME高度
/*----------------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
		/* 初始化所有表单form的ul全部不可用并且隐藏 */
		$("#questionFormOne ul").attr("disabled","disabled").css("display","none");
		$("#questionFormTwo ul").attr("disabled","disabled").css("display","none");
		$("#questionFormThree ul").attr("disabled","disabled").css("display","none");
		$("#questionFormFour ul").attr("disabled","disabled").css("display","none");
		$("#questionFormFive ul").attr("disabled","disabled").css("display","none");
		$("#questionFormSix ul").attr("disabled","disabled").css("display","none");
		$("#questionFormSeven ul").attr("disabled","disabled").css("display","none");

		/* 绑定动画事件 */
		menuAnimate("btOne","questionFormOne","showInfo");
		menuAnimate("btTwo","questionFormTwo","showInfo");
		menuAnimate("btThree","questionFormThree","showInfo");
		menuAnimate("btFour","questionFormFour","showInfo");
		menuAnimate("btFive","questionFormFive","showInfo");
		menuAnimate("btSix","questionFormSix","showInfo");
		menuAnimate("btSeven","questionFormSeven","showInfo");
		
		/*--------------页面div显示特效-所有divOne到divServen全部隐藏并禁用----------------------------------------- */
		$("#divOne").attr("disabled","disabled").css("display","none");
		$("#divTwo").attr("disabled","disabled").css("display","none");
		$("#divThree").attr("disabled","disabled").css("display","none");
		$("#divFour").attr("disabled","disabled").css("display","none");
		$("#divFive").attr("disabled","disabled").css("display","none");
		$("#divSix").attr("disabled","disabled").css("display","none");
		$("#divSeven").attr("disabled","disabled").css("display","none");
});
/*----------------------------------------------------------------------------------------------------------------*/