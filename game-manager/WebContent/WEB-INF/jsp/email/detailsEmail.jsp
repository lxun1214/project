<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html  style="overflow-x:auto;overflow-y:auto;">
<head>
<base href="<%=basePath%>">
<title>修改公告</title><!--  - Powered By JeeSite -->
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" /><meta name="author" content="http://www.jsy86.com/"/>
<meta name="renderer" content="webkit"><meta http-equiv="X-UA-Compatible" content="IE=8,IE=9,IE=10" />
<script src="static/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
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
<script src="<%=basePath%>static/My97DatePicker/WdatePicker.js"
	type="text/javascript"></script>
<script src="static/common/mustache.min.js" type="text/javascript"></script>
<link href="static/common/jeesite.min.css" type="text/css"
	rel="stylesheet" />
<script src="static/common/jeesite.min.js" type="text/javascript"></script>
<script src="static/js/uploadify/swfobject.js" type="text/javascript"></script>
<script type="text/javascript">
	var ctx = 'a', ctxStatic = 'static';
</script>
<meta name="decorator" content="default" />
<link href="static/css/maxlength.css" type="text/css" rel="stylesheet" />
<script src="static/js/jquery.maxlength-min.js" type="text/javascript"></script>
<script src="static/js/date-zh-CN.js" type="text/javascript"></script>
<script src="resources/js/plugns/ajaxfileupload.js"
	type="text/javascript"></script>
<script src="resources/js/plugns/uploadPreview.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="resources/easyui/jquery-common.min.js"></script>
<script type="text/javascript"
	src="resources/easyui/jquery.easyui.min.js"></script>
	
<link rel="stylesheet" href="dist/css/wangEditor.min.css">
<script type="text/javascript" src="dist/js/wangEditor.min.js"></script>
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
$(document).ready(function() {
	
	$('#starTime_1').focus(function() {
		WdatePicker({
			startDate: '%y-%M-%d',
			dateFmt: 'yyyy-MM-dd HH:mm:ss',
			minDate: Date.today().toString('yyyy-MM-dd'),
			isShowClear: true
		})
	});
	
	$('#endTime_1').focus(function() {
		WdatePicker({
			startDate: '%y-%M-%d',
			dateFmt: 'yyyy-MM-dd HH:mm:ss',
			minDate: Date.today().toString('yyyy-MM-dd'),
			isShowClear: true
		})
	});
	
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
		$.ajax({
			type : "POST",
			url : "sellersys/users/updateUserInfo.do",
			data :{ 
				id:$("#adminId").val(),
				name:$("#userName").val(),
				department:$("#department").val(),
				mobile:$("#mobile").val(),
				email:$("#email").val()
			},
			datatype : "json",
			success : function(data) {
					loading('正在提交，请稍等...');
				if('success'==data){
         			showTip("操作成功");
        			window.setTimeout(function() {
        				parent.location.reload();
        			}, 2000);
				  }else if('error'==data){
	           		 showTip("操作失败","error");
			      }
			},
			error : function() {
          		 showTip("修改密码失败","error");
			}
		});
	}
});

</script>

</head>
<body>

	<form id="myForm" class="form-horizontal" method="post" action="notice/sendNotice.do">
		<table class="table-form">
		 
		     <tr>
				<td class="tit"  height="43px" width="60px">目标服务器：</td>
				<td>
				  <c:forEach items="${serverNameList}" var="serverName">
				  ${serverName }&nbsp;&nbsp;&nbsp;&nbsp;
				  </c:forEach>
				  
				</td>
			</tr>
		 
		     <tr>
				<td class="tit"  height="43px" width="60px">标题：</td>
				<td>
				  ${email.emailTitle}
				</td>
			</tr>
		    
		    
			 <tr>
				<td class="tit"  height="43px" width="60px">内容：</td>
				<td>
				  ${email.emailContent}
				</td>
			</tr>
			
			 <tr>
				<td class="tit"  height="43px" width="60px">用户类型：</td>
				<td>
				  <c:if test="${email.userType==1}">
				 所有用户
				  </c:if>
				  <c:if test="${email.userType==2}">
				  具体用户
				  </c:if>
				</td>
			</tr>
			
			
			
			 
			 <c:if test="${email.userType==2}">
				 <tr>
				<td class="tit"  height="43px" width="60px">用户角色：</td>
				<td>
				${email.userIdAll}
				</td>
			    </tr>
			 </c:if>
			
			
			<tr>
				<td class="tit"  height="43px" width="60px">开始时间：</td>
				<td>
				  <fmt:formatDate value="${email.starTime}" pattern="yyyy-MM-dd HH:mm:ss" var="timeStar" />
				  ${timeStar}
				</td>
			</tr>
			
			<tr>
				<td class="tit"  height="43px" width="60px">结束时间：</td>
				<td>
				  <fmt:formatDate value="${email.endTime}" pattern="yyyy-MM-dd HH:mm:ss" var="timeEnd" />
				  ${timeEnd}
				</td>
			</tr>
			
			<tr>
				<td class="tit"  height="43px" width="60px">提交人：</td>
				<td>
				  ${email.createAdminName}
				</td>
			</tr>
			
			
			<tr>
				<td class="tit"  height="43px" width="60px">提交时间：</td>
				<td>
				  <fmt:formatDate value="${email.createTime}" pattern="yyyy-MM-dd HH:mm:ss" var="createTime" />
				  ${createTime}
				</td>
			</tr>
			
			
			
			 <tr>
				<td class="tit"  height="43px" width="60px">邮件里的道具：</td>
				<td style="font-size:14px;">
				    <c:forEach items="${baseItems}" var="baseItem">
				       道具ID:[${baseItem.itemId}],&nbsp;&nbsp;道具数量：${baseItem.itemNum},&nbsp;&nbsp;  <br><hr>
				    </c:forEach>
				    
				</td>
			 </tr>
			
		</table>

	</form>
</body>
</html>

