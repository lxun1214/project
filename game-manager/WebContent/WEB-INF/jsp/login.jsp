<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setAttribute("txt", basePath);
%>
<html>
<head>
<title>登录</title>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="resources/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="resources/jquery.cookie.js"></script>
<script type="text/javascript" src="resources/js/sellersys/login.js"></script>
<script src="static/jquery-jbox/2.3/jquery.jBox-2.3.min.js"
	type="text/javascript"></script>

<script src="static/common/jeesite.min.js" type="text/javascript"></script>
<script src="static/jquery-jbox/jBox-0.3.0/Source/jBox.min.js"></script>
<link href="static/jquery-jbox/jBox-0.3.0/Source/jBox.css"
	rel="stylesheet" />
<link
	href="static/jquery-jbox/jBox-0.3.0/Source/themes/TooltipBorder.css"
	rel="stylesheet" />
<link href="static/jquery-jbox/2.3/Skins/Bootstrap/jbox.min.css"
	rel="stylesheet" />
<script type="text/javascript" src="resources/js/layer/layer.js"></script>
<link href="resources/js/layer/skin/layer.css" type="text/css"
	rel="stylesheet" />
<!--
 <link rel="shortcut icon" type="image/x-icon" href="resources/images/weblogo.ico" /> 
-->
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<script type="text/javascript">
	$(function() {
		isRememberUser();
		inputTipText();
		creartKaptchaImage();
		
		
	})
</script>
<script type="text/javascript">
	$(document).keyup(function(event) {
		if (event.keyCode == 13) {
			$("#_loginbut").trigger("click");
		}
	});
	if (window.parent != window) {
		window.parent.location.reload(true);
	}

	function checklen(obj) {
		if (obj.value.length === 5) {
			document.getElementById('vercode').blur();
		}
	}
</script>
<style type="text/css">
html, body {
	margin: 0;
	height: 100%;
}

.div-bor {
	position: relative;
	width: 200px;
}

.icon-user_1 {
	position: absolute;
	left: 0；z-index:5;
	background-image: url(icon/user_account_icon.png); /*引入图片图片*/
	background-repeat: no-repeat; /*设置图片不重复*/
	background-position: 0px 0px; /*图片显示的位置*/
	width: 27px; /*设置图片显示的宽*/
	height: 27px; /*图片显示的高*/
}

.icon-user_2 {
	position: absolute;
	left: 0；z-index:5;
	background-image: url(icon/user_pwd_icon.png); /*引入图片图片*/
	background-repeat: no-repeat; /*设置图片不重复*/
	background-position: 0px 0px; /*图片显示的位置*/
	width: 27px; /*设置图片显示的宽*/
	height: 27px; /*图片显示的高*/
}

.user {
	padding-left: 32px;
	height: 19px;
}

a {
	text-decoration: none;
}
</style>
</head>
<body>
	<div style="height: 10%; vertical-align: middle;">
		<div style="float: left; margin-left: 10%;    margin-top: 0%;">
			
		</div>
		<div
			style="float: right; margin-right: 10%; font-size: 24px; margin-top: 30px;"></div>
	</div>

	<div
		style="height: 80%; background: url(icon/bss.jpg) no-repeat; width: 100%; ">

		<div
			style="height: 286px; width: 304px; position: absolute; left: 65%; top: 34%; border-radius: 10px 10px 10px 10px; background-color: #1f282d; background: rgba(0, 0, 0, 0.1);">
			<div
				style="border-radius: 5px 5px 5px 5px; height: 266px; width: 288px; background-color: #FFF; margin-top: 7px; margin-left: 7px; filter: alpha(opacity = 50); -moz-opacity: 0.5; -khtml-opacity: 0.5; opacity: 0.7;">
				<div
					style="text-align: center; padding-top: 15px; font-size: 24px; font-weight: bold;">管理员登陆</div>
				<div style="border-bottom: 1px solid #000; margin: 10px 10px;"></div>

				<div class="div-bor" style="margin-top: 20px; margin-left: 40px;">
					<i class="icon-user_1"></i> <label><input name="keyWord"
						id="keyWord" type="text" value="请输入用户名"
						class=" graytips admin_input_style user" size="38"
						style="width: 168px;" /><input type="hidden" id="keyColumn"
						name="keyColumn"></label>
				</div>
				<div class="div-bor" style="margin-top: 16px; margin-left: 40px;">
					<i class="icon-user_2"></i> <label><input type="password"
						id="password" name="password" value="请输入密码"
						class=" graytips admin_input_style user" style="width: 169px;"
						maxlength="15" size="38" /></label>
				</div>
				<div class="members_verificatio"
					style="margin-top: 16px; margin-left: 40px;">
					<div style="margin-top: 7px;">
						<span style="margin-left: -4px;"><input type="checkbox"
							id="_rememberUser">记住密码</span> </span>
					</div>

					<div class="landing_now" style="margin-top:10px;">
						<input type="button" id="_loginbut" tabindex="3" value="立即登陆"
							class="btn btn-primary" style="padding:7px 62px;background-color: #000;color:#fff;font-size:20px;border:none;" />
					</div>
				</div>
			</div>
		</div>

	</div>



	<div style="height: 10%; text-align: center;">
		<div style="margin-top: 30px;"></div>
	</div>
</body>
</html>