var ctxComPC='/mwork/cp';
/*--------------一般纳税人资格查询页面数据请求与处理----------------------------------------- */
function formOneSubmit(){
	var params=$("#questionFormOne").serialize();
	$("#divOne").fadeOut();
	$.ajax({
		type:'post',
		data:params,
		url:ctxComPC+'/online/ssDailyQuery/taxpayerQualificationSearch',
		success:function(res){
			console.info(res);
			var data=res.data;
			var info=res.info;
			var zys=res.zys;
			if(info&&info!=null){
				$("#pOne").html(info);
				$("#yzmOne").val("").focus();
			}else{
				$("#pOne").html("");
				$("#divOne table tbody").html("");
				for(var index in data){
					var cona = "<tr><td>"+data[index].nsrsbh+"</td><td>"+data[index].nsrmc+"</td><td>"+data[index].nsrzgmc+"</td><td>"+data[index].yxqq+"</td><td>"
					+data[index].yxqz+"</td></tr>";
					$("#divOne table tbody").append(cona);
				}
				$("#zysOne").html(zys);
				//查询表单slideUp
				$("#questionFormOne ul").slideUp(function(){
				});
				//表格特效
				$("#divOne").stop(true).fadeIn(function(){
					iframeAuto();
				});
				
				$("#pageNoOneShow").val($("#pageNoOne").val());
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
function inilizationPageNoOne(){
	$("#pageNoOne").val("1");
}
/*===============================================*/
/*涉税查询页面初始化执行绑定按钮和页面动画*/
//设置IFRAME高度
/*----------------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
		/*===============================================*/
		/* 一般纳税人资格查询 上一页下一页跳转事件绑定 */
		/* 上一页 */
		$("#upOne").click(function(){
			if($("#pageNoOne").val()!=1){
				$("#pageNoOne").val(parseInt($("#pageNoOne").val())-1);
				formOneSubmit();
			}else{
				alert("已经是第一页了");
			}
		});
		/*===============================================*/
		/* 下一页 */
		$("#downOne").click(function(){
			var a=$("#pageNoOne").val();
			var b=$("#zysOne").html();
			if(parseInt(a)<parseInt(b)){
				$("#pageNoOne").val(parseInt($("#pageNoOne").val())+1);
				formOneSubmit();
			}else{
				alert("已经是最后一页了");
			}
		});
		/*===============================================*/
		/* 跳转 */
		$("#jumpOne").click(function(){
			var a=$("#pageNoOneShow").val();
			var b=$("#zysOne").html();
			if(parseInt(a)<=parseInt(b)&&parseInt(a)>0){
				$("#pageNoOne").val($("#pageNoOneShow").val());
				formOneSubmit();
			}else{
				alert("页数不符合规则");
			}
		});
		/*===============================================*/
		/* 一般纳税人资格查询验证码图片获取 */
		$("#btOne").click(function(){
			upyzm("imgOne");
		});
		/*===============================================*/
});
/*----------------------------------------------------------------------------------------------------------------*/
