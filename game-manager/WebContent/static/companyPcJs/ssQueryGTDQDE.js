var ctxComPC='/mwork/cp';
/*--------------一般纳税人资格查询页面数据请求与处理----------------------------------------- */
function formTwoSubmit(){
	var params=$("#questionFormTwo").serialize();
	$("#divTwo").fadeOut();
	$.ajax({
		type:'post',
		data:params,
		url:ctxComPC+'/online/ssDailyQuery/gtQualificationSearch',
		success:function(res){
			console.info(res);
			var data=res.data;
			var info=res.info;
			var zys=res.zys;
			if(info&&info!=null){
				$("#pTwo").html(info);
				$("#yzmTwo").val("").focus();
			}else{
				$("#pTwo").html("");
				$("#divTwo table tbody").html("");
				for(var index in data){
					var cona = "<tr><td>"+data[index].nsrsbh+"</td><td>"+data[index].nsrmc+"</td><td>"+data[index].yjse+"</td><td>"+data[index].jydz+"</td><td>"
					+data[index].jyfw+"</td><td>"+data[index].yxqq+"</td><td>"+data[index].yxqz+"</td></tr>";
					$("#divTwo table tbody").append(cona);
				}
				$("#zysTwo").html(zys);
				//查询表单slideUp
				$("#questionFormTwo ul").slideUp(function(){
				});
				//表格特效
				$("#divTwo").stop(true).fadeIn(function(){
					iframeAuto();
				});
				
				$("#pageNoTwoShow").val($("#pageNoTwo").val());
			}
		},
		error:function(){
			$.jBox.tip('非常抱歉，服务器连接异常!', 'error');
		}
	});
	return false;
}
/*===============================================*/
/* 初始化第一次点击页数 */
function inilizationPageNoTwo(){
	$("#pageNoTwo").val("1");
}
/*===============================================*/
/*涉税查询页面初始化执行绑定按钮和页面动画*/
//设置IFRAME高度
/*----------------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
		/*===============================================*/
		/* 一般纳税人资格查询 上一页下一页跳转事件绑定 */
		/* 上一页 */
		$("#upTwo").click(function(){
			if($("#pageNoTwo").val()!=1){
				$("#pageNoTwo").val(parseInt($("#pageNoTwo").val())-1);
				formTwoSubmit();
			}else{
				alert("已经是第一页了");
			}
		});
		/*===============================================*/
		/* 下一页 */
		$("#downTwo").click(function(){
			var a=$("#pageNoTwo").val();
			var b=$("#zysTwo").html();
			if(parseInt(a)<parseInt(b)){
				$("#pageNoTwo").val(parseInt($("#pageNoTwo").val())+1);
				formTwoSubmit();
			}else{
				alert("已经是最后一页了");
			}
		});
		/*===============================================*/
		/* 跳转 */
		$("#jumpTwo").click(function(){
			var a=$("#pageNoTwoShow").val();
			var b=$("#zysTwo").html();
			if(parseInt(a)<=parseInt(b)&&parseInt(a)>0){
				$("#pageNoTwo").val($("#pageNoTwoShow").val());
				formTwoSubmit();
			}else{
				alert("页数不符合规则");
			}
		});
		/*===============================================*/
		/* 一般纳税人资格查询验证码图片获取 */
		$("#btTwo").click(function(){
			upyzm("imgTwo");
		});
		/*===============================================*/
});
/*----------------------------------------------------------------------------------------------------------------*/
