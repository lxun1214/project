<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	request.setAttribute("cxt",basePath);
%>
<html style="overflow-x:auto;overflow-y:auto;">
<head>
<title>新增用户</title><!--  - Powered By JSJY -->
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" /><meta name="author" content="http://www.jsy86.com/"/>
<meta name="renderer" content="webkit"><meta http-equiv="X-UA-Compatible" content="IE=8,IE=9,IE=10" />
<script src="static/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
<script type="text/javascript" src="resources/js/plugns/ajaxfileupload.js"></script>
<script type="text/javascript" src="resources/js/plugns/jquery.ui.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/smoothness/jquery.ui.css" />

<link rel="stylesheet" type="text/css" href="static/js/uploadify/uploadify.css"/>  
<script type="text/javascript" src="static/js/uploadify/swfobject.js"></script>  
<script type="text/javascript" src="static/js/uploadify/jquery.uploadify.v2.1.4.js"></script>

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
<script src="static/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
<script src="static/common/mustache.min.js" type="text/javascript"></script>
<link href="static/common/jeesite.min.css" type="text/css" rel="stylesheet" />
<script src="static/common/jeesite.min.js" type="text/javascript"></script>
<!-- <script src="static/ueditor/ueditor.config.js" charset="utf-8" type="text/javascript"></script>
<script src="static/ueditor/ueditor.all.min.js" charset="utf-8" type="text/javascript"></script>
<script src="static/ueditor/lang/zh-cn/zh-cn.js" charset="utf-8" type="text/javascript"></script> -->
<script type="text/javascript">var ctx = 'a', ctxStatic='static';</script>
<meta name="decorator" content="default"/>
<link href="static/css/maxlength.css" type="text/css" rel="stylesheet" />
<script src="static/js/jquery.maxlength-min.js" type="text/javascript"></script>
<script type="text/javascript" src="static/js/date-zh-CN.js"></script>



<script type="text/javascript">
parent.closeTip();
$(document).ready(function() {
	$('#finishSubmit').on('click', function() {
		var loginName=$('#loginName').val();
	    if(loginName==''||loginName==null){
	      showTip("用户账号不能为空","error");
	      $('#finishSubmit').removeAttr("disabled");
	      return;
	    }
	    
	    
	    var newPass=$('#newPass').val();
	    if(newPass==''||newPass==null){
	      showTip("请设置密码","error");
	      $('#finishSubmit').removeAttr("disabled");
	      return;
	    }
	    
	    var repeatpass=$('#repeatpass').val();
	    if(repeatpass==''||repeatpass==null){
	      showTip("请重复密码","error");
	      $('#finishSubmit').removeAttr("disabled");
	      return;
	    }
	    
	    
	    if(newPass.length<6||newPass.length>15){
			alertx("请输入密码长度在6-15位之间!",function(){
				$("#newPass").focus();
			});
			 $('#finishSubmit').removeAttr("disabled");
			return;
		}
	    
	    if(newPass!=repeatpass){
	    	alertx("两次密码输入不一致",function(){
				$("#newPass").focus();
			});
			 $('#finishSubmit').removeAttr("disabled");
			return;
	    }
	    
	    var userName=$('#userName').val();
	    if(userName==''||userName==null){
	      showTip("请输入用户姓名","error");
	      $('#finishSubmit').removeAttr("disabled");
	      return;
	    }
	    
	    
	    var mobile=$('#mobile').val();
	    if(mobile==''||mobile==null){
	      showTip("请输入联系方式","error");
	      $('#finishSubmit').removeAttr("disabled");
	      return;
	    }
	    

	    
	    
	    var department=$('#department').val();
	    if(department==''||department==null){
	      showTip("请输入部门名称","error");
	      $('#finishSubmit').removeAttr("disabled");
	      return;
	    }
		$("#inputForm").submit();
		
	});
	
	$("#inputForm").validate({
		submitHandler: function(form) {
			$("#finishSubmit").attr({
				disabled: "disabled"
			});
			top.$.jBox.tip("数据交互中请稍后...", 'loading'); 
			updatePass();
		}
	});
	
	
	function updatePass(){
		$.ajax({
			type : "POST",
			url : "sellersys/users/insertUser.do",
			data :{ 
				loginName:$("#loginName").val(),
				password:$("#newPass").val(),
				mobile:$("#mobile").val(),
				department:$("#department").val(),
				name:$("#userName").val(),
				email:$("#email").val(),
				channelId:$("#channelId").val()
			},
			datatype : "json",
			success : function(data) {
					loading('正在提交，请稍等...');
				if('success'==data){
         			showTip("操作成功");
        			window.setTimeout(function() {
        				parent.removeTab('添加管理员');
        			}, 2000);
				  }else if('ly'==data){
	           		 showTip("登录账号已存在，请重新填写","error");
	           	  $('#finishSubmit').removeAttr("disabled");
			      }else if('error'==data){
	           		 showTip("操作失败，请刷新重试","error");
			      }
			},
			error : function() {
          		 showTip("服务器出错","error");
			}
		});
	}
	
});
</script>
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
a:link{
	text-decoration: none;
	color: #2fa4e7;
	font-weight: bold;
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
</style>
</head>
	<body id="insertUser">
		<form id="inputForm" class="form-horizontal" action="#" method="post" style="margin-top:3%;">
			<table class="table-form" style="width: 66%;margin: 0 auto;">
			  <tr>
				<td class="tit" height="45" colspan="4" align="center" valign="middle" style="text-align: center;">
				 <div style="margin-left:23%; float: left;font-size: 25px;font-weight: bold;text-align: right;"><h3>新增管理员</h3></div>
		&nbsp;</td>
			  </tr>
			  
			  <tr>
			    <td  class="tit">用户账号<font color="red">*</font>：</td>
			    <td colspan="3">
					<input id="loginName" name="loginName" style="width:300px;height: 26px" type="text"   class="input-xlarge required" value="" maxlength="20"  placeholder="请输入用户登录账号"/>
			   		<span id="error"></span>
			   </td>
			  </tr>
			  
			   <tr>
			    <td  class="tit">设置密码<font color="red">*</font>：</td>
			    <td colspan="3">
					<input id="newPass"  name="newPass" style="width:300px;"  data-msg-required="请填写新密码" class="input-xlarge required" value="" maxlength="15" type="password" />
			        <br><font style="color:#d21414;    font-size: 10px;">提示：建议其中包含大小写字母以及特殊字符，如：a123456A@_0</font>
			   </td>
			  </tr>
			  
			  <tr>
			    <td  class="tit">重复密码<font color="red">*</font>：</td>
			    <td colspan="3">
					<input id="repeatpass" name="repeatpass"  style="width:300px;"  data-msg-required="请重复密码" class="equalTo input-xlarge required"  rows="2" type="password" value="" maxlength="15"/>
			   </td>
			  </tr>
			
			  
			  
			  <tr>
			    <td  class="tit">用户姓名<font color="red">*</font>：</td>
			    <td colspan="3">
					<input id="userName" name="name" style="width:300px;height: 26px" type="text" tip-message="您可以输入8个字符" data-msg-required="请填写用户姓名" class="input-xlarge required" value="" maxlength="8"  placeholder="您可以输入8个字符"/>
			   		<span id="error"></span>
			   </td>
			  </tr>
			  
			  
			  <tr>
			    <td  class="tit">联系方式<font color="red">*</font>：</td>
			    <td colspan="3">
					<input id="mobile" name="mobile" style="width:300px;height: 26px" type="text"   value="" maxlength="30" placeholder="请输入联系方式" class="input-xlarge required" data-msg-required="请输入联系方式"/>
			       <span id="error"></span>
			   </td>
			  </tr>
			  
			   <tr>
			    <td  class="tit">部门名称 <font color="red">*</font>：</td>
			    <td colspan="3">
					<input id="department" name="department" style="width:300px;height: 26px" type="text" tip-message="您可以输入20个字符" data-msg-required="请填写部门名称" class="input-xlarge required" value="" maxlength="20"  placeholder="您可以输入20个字符"/>
			   		<span id="error"></span>
			   		<input type="hidden"  name="channelId"  value="0" id="channelId" />
			   </td>
			  </tr>
			  
			  
			  <tr id="dfnr">
				<td height="53" align="right" valign="top" style="text-align: right;"></td>
				<td colspan="3">
					<div>
						<input id="finishSubmit" style='margin-left:37px;' class="btn btn-primary" type="button" value="保存"/>
						<!--  
						<input id="btnSubmit" class="btn btn-primary" type="button" value="返回" onclick="javascript:history.go(-1);"/>
						 -->
					</div>
				</td>
			  </tr>
			</table>
			
			
		</form>
	</body>
</html>