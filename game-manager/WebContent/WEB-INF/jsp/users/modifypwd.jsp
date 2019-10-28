<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html  style="overflow-x:auto;overflow-y:auto;">
<head>
<base href="<%=basePath%>">
<title>修改密码</title><!--  - Powered By JeeSite -->
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" /><meta name="author" content="http://www.jsy86.com/"/>
<meta name="renderer" content="webkit"><meta http-equiv="X-UA-Compatible" content="IE=8,IE=9,IE=10" />
<script src="static/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
<link href="static/bootstrap/2.3.1/css_cerulean/bootstrap.min.css" type="text/css" rel="stylesheet" />
<script src="static/bootstrap/2.3.1/js/bootstrap.min.js" type="text/javascript"></script>
<!--[if lte IE 7]><link href="static/bootstrap/2.3.1/awesome/font-awesome-ie7.min.css" type="text/css" rel="stylesheet" /><![endif]-->
<!--[if lte IE 6]><link href="static/bootstrap/bsie/css/bootstrap-ie6.min.css" type="text/css" rel="stylesheet" />
<script src="static/bootstrap/bsie/js/bootstrap-ie.min.js" type="text/javascript"></script><![endif]-->
<link href="static/jquery-select2/3.4/select2.min.css" rel="stylesheet" />
<script src="static/jquery-select2/3.4/select2.min.js" type="text/javascript"></script>
<link href="static/jquery-validation/1.11.0/jquery.validate.min.css" type="text/css" rel="stylesheet" />
<script src="static/jquery-validation/1.11.0/jquery.validate.min.js" type="text/javascript"></script>
<link href="static/jquery-jbox/2.3/Skins/Bootstrap/jbox.min.css" rel="stylesheet" />
<script src="static/jquery-jbox/2.3/jquery.jBox-2.3.js" type="text/javascript"></script>
<script src="static/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
<script src="static/common/mustache.min.js" type="text/javascript"></script>
<link href="static/common/jeesite.css" type="text/css" rel="stylesheet" />
<script src="static/common/jeesite.js" type="text/javascript"></script>
<script type="text/javascript">top.$.jBox.closeTip();</script>

<script type="text/javascript">
$(document).ready(function() {
	 $("#oldPass").focus();
	$('#finishSubmit').on('click',function(){
		$("#inputForm").submit();
	});
	
	$("#inputForm").validate({
		 rules: {  
			    newPass: "required",  
			    repeatpass: {  
			      equalTo: "#newPass"  
			    }  
			  }  ,
		submitHandler: function(form){
			updatePass();
		}
	});
	function updatePass(){
		if(!pwdJudge()){
		    return;	
		}
		$.ajax({
			type : "POST",
			url : "sellersys/users/updatePwd.do",
			data :{ 
				adminId:$("#adminId").val(),
				password:$("#newPass").val()
			},
			datatype : "json",
			success : function(data) {
					loading('正在提交，请稍等...');
				if('success'==data){
         			showTip("重置密码成功");
        			window.setTimeout(function() {
        				parent.closeJbox();
        			}, 500);
				  }else if('error'==data){
	           		 showTip("重置密码失败","error");
			      }else if('ren'==data){
			    	  showTip("请刷新页面重试","error");
			      }
			},
			error : function() {
          		 showTip("服务器出错","error");
			}
		});
	}
});
function pwdJudge(){
	var pwd = $("#newPass").val();
	if(pwd.length<6){
		alertx("请输入密码长度在6-15位之间!",function(){
			$("#newPass").focus();
		});
		return false;
	}
	return  true;
}
</script>

</head>
<body>

	<form id="inputForm" class="form-horizontal" method="post">
		<table class="table-form">
			<tr>
				<td class="tit" height="43px" width="60px">设置新密码<font color="red">*</font>：</td><td>
					<input id="newPass" style="height: 35px" name="newPass"  data-msg-required="请填写新密码" class="input-xlarge required" value="" maxlength="15" type="password" />
				</td>
			</tr>
			<tr>
				<td class="tit"  height="43px" width="60px">重复新密码<font color="red">*</font>：</td><td>
					<input id="repeatpass" name="repeatpass"  style="height: 35px"  data-msg-required="请重复密码" class="equalTo input-xlarge required"  rows="2" type="password" value="" maxlength="15"/>
				    <input type="hidden" id="adminId" name="adminId" value="${userId}"/>
				</td>
			</tr>
			 <tr id="dfnr">
			<td height="53" align="right" valign="top" style="text-align: right;"></td>
			<td colspan="5">
			<div style="float: right; margin-right: 50%;">
				<input id="finishSubmit" class="btn btn-primary" type="button" value="保&nbsp;存" style="width: 100px"/>　　
			</div>
			</td>
		  </tr>
			
		</table>

	</form>
</body>
</html>

<script>
function checkPass(obj){
	
}

</script>