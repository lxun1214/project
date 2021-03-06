<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>  
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="elf" uri="/eltag"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	request.setAttribute("cxt", basePath);
%>
<html style="overflow-x:auto;overflow-y:auto;">
<head>
<base href="<%=basePath%>">
<title>投放前</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" /><meta name="author" content="http://www.jsy86.com/"/>
<meta name="renderer" content="webkit"><meta http-equiv="X-UA-Compatible" content="IE=8,IE=9,IE=10" />
<script src="static/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
<script  src="resources/js/plugns/jquery.ui.js" type="text/javascript"></script>
<script  src="resources/js/common/capsAjax.js" type="text/javascript"></script>
<script type="text/javascript" src="resources/js/plugns/ajaxfileupload.js"></script>
<link href="static/bootstrap/2.3.1/css_cerulean/bootstrap.min.css" type="text/css" rel="stylesheet" />
<script src="static/bootstrap/2.3.1/js/bootstrap.min.js" type="text/javascript"></script>
<!--[if lte IE 6]><link href="static/bootstrap/bsie/css/bootstrap-ie6.min.css" type="text/css" rel="stylesheet" />
<script src="static/bootstrap/bsie/js/bootstrap-ie.min.js" type="text/javascript"></script><![endif]-->
<link href="static/jquery-select2/3.4/select2.min.css" rel="stylesheet" />
<script src="static/jquery-select2/3.4/select2.min.js" type="text/javascript"></script>
<link href="static/jquery-validation/1.11.0/jquery.validate.min.css" type="text/css" rel="stylesheet" />
<script src="static/jquery-validation/1.11.0/jquery.validate.min.js" type="text/javascript"></script>
<link href="static/jquery-jbox/2.3/Skins/Bootstrap/jbox.min.css" rel="stylesheet" />
<script src="static/jquery-jbox/2.3/jquery.jBox-2.3.min.js" type="text/javascript"></script>
<script src="<%=basePath%>static/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
<script src="static/common/mustache.min.js" type="text/javascript"></script>
<link href="static/common/jeesite.min.css" type="text/css" rel="stylesheet" />
<script src="static/common/jeesite.min.js" type="text/javascript"></script>
<script type="text/javascript">var ctx = 'a', ctxStatic='static';</script>
<meta name="decorator" content="default" />
<script type="text/javascript" src="static/daterangepicker/moment.min.js"></script>
<script type="text/javascript" src="static/daterangepicker/daterangepicker.js"></script>
<link rel="stylesheet" type="text/css" href="static/daterangepicker/daterangepicker-bs2.css" />
<script type="text/javascript" src="static/js/date-zh-CN.js"></script>
<script type="text/javascript" src="static/js/jquery.ellipsis.js"></script>
<script src="static/jquery-jbox/jBox-0.3.0/Source/jBox.min.js"></script>
<link href="static/jquery-jbox/jBox-0.3.0/Source/jBox.css" rel="stylesheet"/>
<link href="static/jquery-jbox/jBox-0.3.0/Source/themes/TooltipBorder.css" rel="stylesheet"/>
<script type="text/javascript">top.$.jBox.closeTip();</script>
<script type="text/javascript">
	
$(document).ready(function() {
	findThrowPosterAgo();
	$('#starttime').focus(function() {
		WdatePicker({
			startDate: '%y-%M-01',
			dateFmt: 'yyyy-MM-dd',
			isShowClear: true
		})
	});
	$('#endtime').focus(function() {
		var tb = $("#starttime").val();
		if (tb === '') {
			alertx("请先选择开始时间");
			return
		} else {
			WdatePicker({
				dateFmt: 'yyyy-MM-dd',
				minDate: tb,
				isShowClear: true
			});
		}
	});
	$("#searchForm").submit(function() {
		findThrowPosterAgo();
		return false;
	});
	
	$("#batchDel").click(function() {
		if ($("input[name='ids']:checked").size() == 0) {
	        alertx("请选择一条数据进行操作");
	        return;
	    }
	    confirmx("确定要删除所选数据吗？",
	    function() {
	        var idsArray = new Array();
	        $("input[name='ids']:checked").each(function() {
	            idsArray.push($(this).val());
	        });
	        top.$.jBox.tip("数据交互中请稍后...", 'loading'); 
	        $.ajax({
	            type: "POST",
	            url: "sellersys/poster/deletebatchbyids.do",
	            data: {
	                ids: idsArray.join('-')
	            },
	            datatype: "json",
	            success: function(data) {
	                if ('success' == data) {
	                    showTip("删除操作成功");
	                    window.setTimeout(function() {
	                    	findThrowPosterAgo(); 
	                    },
	                    2000);
	                }
	            },
	            error: function(data) {
	                showTip("删除操作失败", "error");
	            }
	        });
	    });
	});
});
function page(n, s) {
	$("#pageNo").val(n);
	$("#pageSize").val(s);
	loading("正在努力加载数据...");
	window.setTimeout(function() {
		$("#searchForm").submit();
	}, 800);				
	return false;
}

function postersOnline(id,pn) {
	if(pn!=0){
		alertx("固定位置广告，请联系客服人员进行上线...");
		return;
	}
	confirmx("确认要上线所选广告吗？",function() {
		if (checkDrawCash()) {
			$("a .link-onlian .use").removeAttr('href');
			$("a .link-onlian .use").removeAttr('onclick');
			$.ajax({
				type: "POST",
				url: "sellersys/poster/postersonline.do",
				data: {id: id,
					   userId:'${userId}'},
				beforeSubmit: top.$.jBox.tip("数据交互中请稍后...", 'loading'), 
				async: false,
				datatype: "json",
				success: function(data) {
					if (data === 'success') {
						showTip("上线操作成功");
						window.setTimeout(function() {
							findThrowPosterAgo(); 
						}, 1000);
					} else if (data === 'lacking') {
						top.$.jBox.closeTip();
						alertx("账户余额不足，无法进行上线操作！");
						return;
					} else if (data === 'reviewfail') {
						top.$.jBox.closeTip();
						alertx("企业资质尚未通过审核，无法进行上线操作！");
						return;
					}else{
						showTip("上线操作失败,请刷新页面后重试", "error");
					}
				},
				error: function() {
					showTip("上线操作失败", "error");
				}
			});
		}else{
			alertx("您当前有一笔提现未完成，无法进行此操作！");return;
		}

	});
	

}


function checkDrawCash(){
	var returnMess=false;  
	$.ajax({
		type: "POST",
		url: "account/checkDrawCashState.do",
		async: false,
		datatype: "json",
		complete:function(XMLHttpRequest,textStatus){   
		    var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头,sessionstatus， 
		    if(sessionstatus=='timeout'){   
		       //如果超时就处理 ，指定要跳转的页面  
		       //var top = getTopWinow(); //获取当前页面的顶层窗口对象
		       if(confirm('登录超时, 请重新登录!')){
			       location.href="${cxt}login.jsp"; //跳转到登陆页面
		       } 
		    }   
		},
		success: function(data) {
			if (data === 'success') { returnMess=true;}
		},
		error: function() {alert("请求超时"); }
	});
	return returnMess;
} 



function deleteUser(id) {
	confirmx("确定要删除当前账号吗？",function() {
		$.ajax({
			type: "POST",
			url: "sellersys/users/delUser.do",
			data: {
				adminId: id
			},
			beforeSubmit: top.$.jBox.tip("数据交互中请稍后...", 'loading'), 
			async: false,
			datatype: "json",
			success: function(data) {
				if (data === 'success') {
					showTip("操作成功");
					window.setTimeout(function() {
						findThrowPosterAgo(); 
					}, 1000);
				} else{
					showTip("操作失败,请刷新页面后重试", "error");
				}
			},
			error: function() {
				showTip("操作失败", "error");
			}
		});
	});
}

function paint() {
	$('tr', $('#contentTable')).bind('click', function() {
		$('tr', $('#contentTable')).removeClass('selected');
		$(this).addClass('selected');
	});
	$('#select-native-2').change();
	$(".tooltip_gdts").wordLimit(15);

	$('.tooltip_gdts').jBox('Tooltip', {
		getTitle: 'data-jbox-title',
		getContent: 'data-jbox-content',
		theme: 'TooltipBorder',
		width: 200,
		position: {
			x: 'left',
			y: 'center'
		},
		outside: 'x',
		pointer: 'top:15',
		zIndex: 8000,
		animation: 'move'
	});
	$("tr:odd").css("background-color", "#c6fd60");
	$("tr:even").css("background-color", "#fff9aa");
}


function findThrowPosterAgo() {
	caps.asyncPostJson("sellersys/users/listLogExplain.do", {
		pageNo: $("#pageNo").val(),
		pageSize: $("#pageSize").val(),
		adminName:$("#adminName").val()
	}, function(result) {
		getResultPageThrowPosterAgo(result);
	}, function() {
		alert("请求超时，请重试！");
	});
}

function getResultPageThrowPosterAgo(result) {
	var tbody = $("<tbody></tbody>");
	$("#tbody").empty();
	$.each(result.list, function(index, one) {
		var tr = $("<tr></tr>");
		$(tr).append("<td style='text-align: center;width:5%;'><nob0.32r>" + (index + 1) + "</nobr></td>");
		$(tr).append("<td style='text-align: center;width:13%;'><nobr><span class=''>" + one.adminId + "</span ></nobr></td>");
		$(tr).append("<td style='text-align: center;width:13%;'><nobr><span class=''>" + one.adminName + "</span ></nobr></td>");
		$(tr).append("<td style='text-align: center;width:30%;'><nobr><span class=''>" + one.explainContent + "</span ></nobr></td>");
		$(tr).append("<td style='text-align: center;width:9%;'><nobr><span class='label label-info'>" + new Date(one.createTime).format('yyyy-MM-dd hh:mm:ss') + "</span></nobr></td>");
		$("#tbody").append(tr);
	});
	$(".pagination").empty();
	$(".pagination").append(result.pageInfo);
	paint();
}

function updatePwd(id){
	$.jBox.open("iframe:sellersys/users/loadUpdateUserPwd/"+id+".do",
			"修改登录密码", 600, 230, {
				buttons : {
					'关闭' : true
				}
	});
}

function updateUserInfo(id){
	$.jBox.open("iframe:sellersys/users/loadUpdateUserInfo/"+id+".do",
			"编辑信息", 600, 270, {
				buttons : {
					'关闭' : true
				}
	});
}


function updateUserJurisdiction(id){
	$.jBox.open("iframe:sellersys/users/loadUpdateUserJurisdiction/"+id+".do",
			"配置权限", 300, 400, {
				buttons : {
					'关闭' : true
				}
	});
}

function closeJbox(){
	$.jBox.close();
}

function totalCanTask(money, price) {
	return parseInt((money / 100) / (price / 100));
}

function dayCanTask(money, price, atime, btime) {

	if (dateDiff(atime, btime) == 0) return totalCanTask(money, price);

	return (parseInt((totalCanTask(money, price)) / (dateDiff(atime, btime))));

}

function oDateDiff(oDate1, oDate2) {
	var iDays;
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
	return iDays;
}

function dateDiff(sDate1, sDate2) {

	var aDate, oDate1, oDate2, iDays;

  	aDate = sDate1.split("-");
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0) {
		oDate1 = new Date(aDate[0],aDate[1]-1,aDate[2],"","",""); // 转为MM-dd-yyyy  
	}else{
		oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); // 转为MM-dd-yyyy  
	}
  	aDate = sDate2.split('-');
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0) {
		oDate2 = new Date(aDate[0], aDate[1]-1, aDate[2], "", "", ""); // 转为MM-dd-yyyy  
	}else{
		oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); // 转为MM-dd-yyyy  
	}
  	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数  
  	return iDays;

  } 


Date.prototype.format = function(fmt) {    
	var o = {
		"M+": this.getMonth() + 1,
		//月份   
		"d+": this.getDate(),
		//日   
		"h+": this.getHours(),
		//小时   
		"m+": this.getMinutes(),
		//分   
		"s+": this.getSeconds(),
		//秒   
		"q+": Math.floor((this.getMonth() + 3) / 3),
		//季度   
		"S": this.getMilliseconds() //毫秒   
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}


/**
 * 强制保留两位小数
 */

function changeTwoDecimal(x) {
	var f_x = (parseFloat(x))/100;
	if (isNaN(f_x)) {
		alert('function:changeTwoDecimal->parameter error');
		return false;
	}
	f_x = Math.round(f_x * 100) / 100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}


</script>

<style type="text/css">
.breadcrumb {padding: 2px 15px;margin-bottom: 3px;}
.searchDiv{background-image: url(static/images/railline.png);height: 28px;background-repeat: no-repeat;}
.searchText{color:white;font-size: 14px;padding: 3px 10px;}
.jbox-title-panel,.jbox-button-panel{background-color: #f3f3f3;}
.countCon{width:70px;height:30px;line-height:38px;text-align:center;cursor:pointer;font-weight:bold;};
.ctCount{border:1px solid #E0E0E0;border-radius:6px;}
.ctCount .typeCount{float:right;}
.ctCount .statusCount{float:left;width:85px;border-right:1px dashed #666666;line-height:1.5}
.statustd,.typetd{float:left;}
.label-red {
	background-color: red;
}
.label-green {
	background-color: green;
}
.label-gray {
	background-color: gray;
}
.pagination ul>li>input {
	vertical-align: top;
	-webkit-border-radius: 0;
	-moz-border-radius: 0;
	border-radius: 0;
	height: auto;
	*height: 20px;
	margin-bottom: 0px;
	background-color: #fff;
	border-left-width: 0;
	width: 40px;
	float: left;
	min-height: auto;
	*min-height: 20px;
}
</style>
</head>
<body>
<div class="searchHead">
	<form id="searchForm" class="breadcrumb form-search" action="#" method="post">
	    <input id="pageNo" name="pageNo" type="hidden"  />
		<input id="pageSize" name="pageSize" type="hidden"  />
	<ul class="ul-form" style="width: 1200px;">
				<li><label style="width: 85px; margin-left: 10px">姓名：</label>
					<input id="adminName" name="adminName" style="width: 160px;"
					type="text" value="" maxlength="200" /></li>
				<li class="btns"><input id="btnSubmit" class="btn btn-primary"
					type="submit" value="查询" /></li>
				<li class="clearfix"></li>
			</ul>
</form>
</div>
<script type="text/javascript">top.$.jBox.closeTip();</script>
<div class="searchDiv"><div class="searchText">列表</div></div>
<table id="contentTable" class="table table-striped table-bordered table-condensed" style="width: 86%">
		<thead>
			<tr>
			  
				<th style="text-align: center;">编号</th>
				<th style="text-align: center;">操作人员ID</th>
				<th style="text-align: center;">姓名</th>
				<th style="text-align: center;">说明</th>
				<th style="text-align: center;">操作时间</th>
			</tr>
		</thead>
		<tbody id="tbody">
		</tbody>
	</table>
<div class="pagination"></div>
</body>
</html>