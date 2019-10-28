<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setAttribute("tx", basePath);
%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>

<!DOCTYPE html>



<html style="overflow-x: auto; overflow-y: auto;">
<head>
<title>完善房间信息</title>
<!--  - Powered By JSJY -->
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<meta name="author" content="http://www.jsy86.com/" />
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9,IE=10" />
<script src="static/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
<script type="text/javascript"
	src="resources/js/plugns/ajaxfileupload.js"></script>
<script type="text/javascript" src="resources/js/plugns/jquery.ui.js"></script>
<link rel="stylesheet" type="text/css"
	href="resources/css/smoothness/jquery.ui.css" />

<link rel="stylesheet" type="text/css"
	href="static/js/uploadify/uploadify.css" />
<script type="text/javascript" src="static/js/uploadify/swfobject.js"></script>
<script type="text/javascript"
	src="static/js/uploadify/jquery.uploadify.v2.1.4.js"></script>

<link href="static/bootstrap/2.3.1/css_cerulean/bootstrap.min.css"
	type="text/css" rel="stylesheet" />
<script src="static/bootstrap/2.3.1/js/bootstrap.min.js"
	type="text/javascript"></script>
<!--[if lte IE 6]><link href="static/bootstrap/bsie/css/bootstrap-ie6.min.css" type="text/css" rel="stylesheet" />
<script src="static/bootstrap/bsie/js/bootstrap-ie.min.js" type="text/javascript"></script><![endif]-->
<link href="static/jquery-select2/3.4/select2.min.css" rel="stylesheet" />
<script src="static/jquery-select2/3.4/select2.min.js"
	type="text/javascript"></script>
<link href="static/jquery-validation/1.11.0/jquery.validate.min.css"
	type="text/css" rel="stylesheet" />
<script src="static/jquery-validation/1.11.0/jquery.validate.min.js"
	type="text/javascript"></script>
<link href="static/jquery-jbox/2.3/Skins/Bootstrap/jbox.min.css"
	rel="stylesheet" />
<script src="static/jquery-jbox/2.3/jquery.jBox-2.3.min.js"
	type="text/javascript"></script>
<script
	src="static/My97DatePicker/WdatePicker.js"
	type="text/javascript"></script>
<script src="static/common/mustache.min.js" type="text/javascript"></script>
<link href="static/common/jeesite.min.css" type="text/css"
	rel="stylesheet" />
<script src="static/common/jeesite.min.js" type="text/javascript"></script>
<!-- <script src="static/ueditor/ueditor.config.js" charset="utf-8" type="text/javascript"></script>
<script src="static/ueditor/ueditor.all.min.js" charset="utf-8" type="text/javascript"></script>
<script src="static/ueditor/lang/zh-cn/zh-cn.js" charset="utf-8" type="text/javascript"></script> -->
<script type="text/javascript">
	var ctx = 'a', ctxStatic = 'static';
</script>
<meta name="decorator" content="default" />
<link href="static/css/maxlength.css" type="text/css" rel="stylesheet" />
<script src="static/js/jquery.maxlength-min.js" type="text/javascript"></script>
<script type="text/javascript" src="static/js/date-zh-CN.js"></script>
<script src="resources/js/plugns/uploadPreview.js"
	type="text/javascript"></script>



<style type="text/css">
.input-xxlarge {
	width: 640px;
}

.form-actions {
	margin: 0px;
	padding: 10px 20px 10px;
}

.form-actions .btn-primary, .form-actions .btn {
	float: right;
	margin-left: 10px;
}

.table th, .table td {
	padding: 0px;
	width: 90px;
}

.table td input {
	margin-left: 5px;
}

.box {
	float: left;
}

.img-thumbnail {
	display: inline-block;
	height: auto;
	max-width: 100%;
	padding: 4px;
	line-height: 1.428571429;
	background-color: #ffffff;
	border: 1px solid #dddddd;
	border-radius: 4px;
	-webkit-transition: all 0.2s ease-in-out;
	transition: all 0.2s ease-in-out;
}

label.hintts {
	background: url("images/unchecked.gif") no-repeat 0px 0px;
	padding-left: 18px;
	padding-bottom: 2px;
	font-weight: bold;
	color: #EA5200;
	margin-left: 10px;
}
</style>
<style type="text/css">
* {
	margin: 0;
	padding: 0;
}

a {
	text-decoration: none;
	color: #fff;
}

.closeed {
	width: 128px;
	height: 100px;
	position: relative;
	overflow: hidden;
}

.closeBtn {
	height: 15px;
	width: 100%;
	position: absolute;
	left: 0;
	top: -15;
	font-size: 10px;
	text-align: right;
	background: rgba(101, 101, 101, 1);
}

.modal-backdrop {
	background-color: #000000;
}
</style>

<script type="text/javascript">
	$(function() {
		parent.closeTip();
		$("#upPass").click(
				function() {
					$.jBox.open("iframe:sellersys/centred/loadUpdatePass.do",
							"修改登录密码", 600, 280, {
								buttons : {
									'关闭' : true
								}
							});
				});
	
	})
</script>
</head>
<body style="height: 400px;">

	<form id="inputForm" class="form-horizontal" style="margin-top: 10%;">
		<table class="table-form" style="width: 50%; margin: 0 auto;">
			<tr>
				<td class="tit" height="43" colspan="4" align="center"
					valign="middle" style="text-align: center;">
					<div
						style=" float: right; font-size: 24px; font-weight: bold;margin-right: 46%;">
						<h3>个人信息</h3>
					</div>
				</td>
			</tr>
			<tr>
				<td class="tit">姓名<font color="red">*</font>：
				</td>
				<td colspan="3">${user.name}</td>
			</tr>
			<tr>
				<td class="tit">部门<font color="red">*</font>：
				</td>
				<td colspan="3">${user.department}</td>
			</tr>
			<tr>
				<td class="tit">渠道<font color="red">*</font>：
				</td>
				<td colspan="3">
				 <c:if test="${user.channelId==0}">
				    所有渠道
				 </c:if>
				 <c:if test="${user.channelId==1}">
				    官方渠道
				 </c:if>
				 <c:if test="${user.channelId==2}">
				 甲壳虫渠道
				 </c:if>
				</td>
			</tr>
			<tr>
				<td class="tit">联系电话<font color="red">*</font>：
				</td>
				<td colspan="3">${user.mobile}(如需修改资料，请联系超级管理员)</td>
			</tr>

			<tr>
				<td class="tit" height="43" colspan="4" align="center"
					valign="middle" style="text-align: center;">
					<div style="float: right; margin-right: 46%;">
						<input id="upPass" class="btn btn-primary" type="button"
							value="修改密码" />
					</div>
				</td>
			</tr>
		</table>

	</form>



</body>
</html>