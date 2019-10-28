<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>  
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	request.setAttribute("cxt", basePath);
%>
<html style="overflow-x:auto;overflow-y:auto;">
<head>
<base href="<%=basePath%>">
<title>商家列表</title>
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
	
	$("#searchForm").submit(function() {
		findThrowPosterAgo();
		return false;
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
	caps.asyncPostJson("sellersys/poster/listPoster.do", {
		pageNo: $("#pageNo").val(),
		pageSize: $("#pageSize").val(),
		content: $("#content").val()
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
		$(tr).append("<td style='text-align: center;width:6%;'><nobr>"+one.categoryName+"</nobr></td>");
		$(tr).append("<td style='text-align: center;width:13%;'><nobr> <span class='tooltip_gdts' data-jbox-title='内容' data-jbox-content='"+one.content+"' >"+one.content+"</span ></nobr></td>");
		one.images = one.images.replace(",", "#")
		$(tr).append("<td style='text-align: center;width:6%;'><nobr><img alt='加载失败' src='" + one.images + "' style='width: 35px;height: 30px'></nobr></td>");
		
		$(tr).append("<td style='text-align: center;width:6%;'><nobr>"+one.phone+"</nobr></td>");
		$(tr).append("<td style='text-align: center;width:6%;'><nobr>"+one.address+"</nobr></td>");
		$(tr).append("<td style='text-align: center;width:6%;'><nobr>"+one.browseNum+"</nobr></td>");
		
		$(tr).append("<td style='text-align: center;width:9%;'><nobr><span class='label label-info'>" + new Date(one.createDate).format('yyyy-MM-dd hh:mm:ss') + "</span></nobr></td>");
		if(one.launchData!=null){
			var reg = new RegExp('#', "g" )
			one.launchData = one.launchData.replace(reg, " , ")
		}
		if(one.launchType == 0){
			$(tr).append("<td style='text-align: center;width:6%;'><nobr>未投放</nobr></td>");
			$(tr).append("<td style='text-align: center;width:6%;'><nobr>无</nobr></td>");
		}else if(one.launchType == 1){
			$(tr).append("<td style='text-align: center;width:6%;'><nobr>投放首页ban</nobr></td>");
			$(tr).append("<td style='text-align: center;width:13%;'><nobr> <span class='tooltip_gdts' data-jbox-title='投放日期' data-jbox-content='"+one.launchData+"' >"+one.launchData+"</span ></nobr></td>");
		}else if(one.launchType ==2){
			$(tr).append("<td style='text-align: center;width:6%;'><nobr>首页头条</nobr></td>");
			$(tr).append("<td style='text-align: center;width:13%;'><nobr> <span class='tooltip_gdts' data-jbox-title='投放日期' data-jbox-content='"+one.launchData+"' >"+one.launchData+"</span ></nobr></td>");
		}else if(one.launchType == 3){
			$(tr).append("<td style='text-align: center;width:6%;'><nobr>栏目页图片banner</nobr></td>");
			$(tr).append("<td style='text-align: center;width:13%;'><nobr> <span class='tooltip_gdts' data-jbox-title='投放日期' data-jbox-content='"+one.launchData+"' >"+one.launchData+"</span ></nobr></td>");
		}else if(one.launchType == 4){
			$(tr).append("<td style='text-align: center;width:6%;'><nobr>相关推荐</nobr></td>");
			$(tr).append("<td style='text-align: center;width:13%;'><nobr> <span class='tooltip_gdts' data-jbox-title='投放日期' data-jbox-content='"+one.launchData+"' >"+one.launchData+"</span ></nobr></td>");
		}
		
		if(one.launchType == 0){
			$(tr).append("<td style='text-align: center;width:20%;'><nobr><a class='link-onlian' id='link-onlian' href='Javascript:delPoster(" + one.inforId + ");'  >　删除　</a><a class='link-onlian' id='link-onlian' href='Javascript:toLaunch(" + one.inforId + ");'  >　设置为广告　</a></td>");
			
		}else{
			$(tr).append("<td style='text-align: center;width:20%;'><nobr><a class='link-onlian' id='link-onlian' href='Javascript:delPoster(" + one.inforId + ");'  >　删除　</a><a class='link-onlian' id='link-onlian' href='Javascript:delLaunch(" + one.inforId + ");'  >　取消广告　</a></td>");
		}
		
		
		$("#tbody").append(tr);
	});
	$(".pagination").empty();
	$(".pagination").append(result.pageInfo);
	paint();
}



function delLaunch(id) {
	confirmx("确定要取消当前投放吗？",function() {
		$.ajax({
			type: "POST",
			url: "sellersys/poster/delLaunch.do",
			data: {
				id: id
			},
			beforeSubmit: top.$.jBox.tip("玩命取消中...", 'loading'), 
			async: true,
			datatype: "json",
			success: function(data) {
				if (data === 'success') {
					showTip("操作成功");
					window.setTimeout(function() {
						findThrowPosterAgo(); 
					}, 1000);
				} else{
					showTip("操作失败,请联系 开发人员", "error");
				}
			},
			error: function() {
				showTip("未知错误", "error");
			}
		});
	});
}


function delPoster(id) {
	confirmx("确定要删除当前广告吗？",function() {
		$.ajax({
			type: "POST",
			url: "sellersys/poster/delPoster.do",
			data: {
				id: id
			},
			beforeSubmit: top.$.jBox.tip("玩命删除中...", 'loading'), 
			async: true,
			datatype: "json",
			success: function(data) {
				if (data === 'success') {
					showTip("操作成功");
					window.setTimeout(function() {
						findThrowPosterAgo(); 
					}, 1000);
				} else{
					showTip("操作失败,请联系 开发人员", "error");
				}
			},
			error: function() {
				showTip("未知错误", "error");
			}
		});
	});
}

function toLaunch(id){
	$.jBox.open("iframe:sellersys/poster/toLaunchType/"+id+".do","设为广告",800,350,{ buttons: { '关闭': true} });
}


function toUpdateCompany(id){
	$.jBox.open("iframe:sellersys/mall/toUpdateCompany/"+id+".do","修改商户",600,500,{ buttons: { '关闭': true} });
}


function closeJbox(){
	$.jBox.close();
	findThrowPosterAgo();
}

function closeJbox1(){
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

function toAddCompany(){
	$.jBox.open("iframe:sellersys/mall/toAddCompany.do","添加商户",600,500,{ buttons: { '关闭': true} });
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
		<ul class="ul-form" >
				<li><label style="width: 125px;">发布内容：</label>
					<input id="content" name="content" style="width: 300px;"
					type="text" value="" maxlength="200" placeholder="可输入匹配字"/></li>
				<li class="btns"><input id="btnSubmit" class="btn btn-primary"
					type="submit" value="查询" /></li>
				<li class="clearfix"></li>
			</ul>
		
</form>
</div>
<script type="text/javascript">top.$.jBox.closeTip();</script>
<div class="searchDiv"><div class="searchText">列表</div></div>
<table id="contentTable" class="table table-striped table-bordered table-condensed" >
		<thead>
			<tr>
			    <th style="text-align: center;">类别</th>
				<th style="text-align: center;">内容</th>
				<th style="text-align: center;">图片</th>
				<th style="text-align: center;">联系人手机号</th>
				<th style="text-align: center;">发布地区</th>
			    <th style="text-align: center;">浏览量</th>
			    <th style="text-align: center;">发布时间</th>
			    <th style="text-align: center;">投放状态</th>
			    <th style="text-align: center;">投放选择日期</th>
			    <th style="text-align: center;">操作</th>
			</tr>
		</thead>
		<tbody id="tbody">
		</tbody>
	</table>
<div class="pagination"></div>
</body>
</html>