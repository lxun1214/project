<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="elf" uri="/eltag"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html style="overflow-x: auto; overflow-y: auto;">
<head>
<base href="<%=basePath%>">
<title>修改密码</title>
<!--  - Powered By JeeSite -->
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta name="author" content="http://www.jsy86.com/" />
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9,IE=10" />
<script src="static/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
<link href="static/bootstrap/2.3.1/css_cerulean/bootstrap.min.css"
	type="text/css" rel="stylesheet" />
<script src="static/bootstrap/2.3.1/js/bootstrap.min.js"
	type="text/javascript"></script>
<!--[if lte IE 7]><link href="static/bootstrap/2.3.1/awesome/font-awesome-ie7.min.css" type="text/css" rel="stylesheet" /><![endif]-->
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
<script src="static/jquery-jbox/2.3/jquery.jBox-2.3.js"
	type="text/javascript"></script>
<script src="static/My97DatePicker/WdatePicker.js"
	type="text/javascript"></script>
<script src="static/common/mustache.min.js" type="text/javascript"></script>
<link href="static/common/jeesite.css" type="text/css" rel="stylesheet" />
<script src="static/common/jeesite.js" type="text/javascript"></script>
<script type="text/javascript">
	top.$.jBox.closeTip();
</script>

<script type="text/javascript">
	$(document).ready(function() {
		$('#finishSubmit').on('click', function() {
			$("#inputForm").submit();
		});

		$("#inputForm").validate({
			submitHandler : function(form) {
				updateJurisdiction();
			}
		});
		function updateJurisdiction() {
			var ids="0#";
			var  resourceIds= $("input:checkbox[name=parent]:checked");
			$("input:checkbox[name=parent]:checked").each(function(i) {
				ids=ids+$(this).val()+"#";
			});
			$.ajax({
				type : "POST",
				url : "sellersys/users/updateUserJurisdiction.do",
				data : {
					adminId : $("#adminId").val(),
					resourceIds:ids
				},
				datatype : "json",
				success : function(data) {
					loading('正在提交，请稍等...');
					if ('success' == data) {
						showTip("操作成功");
						window.setTimeout(function() {
							parent.closeJbox();
						}, 500);
					} else if ('error' == data) {
						showTip("操作失败", "error");
					}
				},
				error : function() {
					showTip("操作失败", "error");
				}
			});
		}
	});
</script>

</head>
<body>

	<form id="inputForm" class="form-horizontal" method="post">
		
		<script type="text/javascript">
			function parentClick(obj, id) {
				if ($(obj).attr("checked")) {
					$(".parent_" + id).attr("checked", true);
				} else {
					$(".parent_" + id).attr("checked", false);
				}
			}

			function childrenClick(obj, id) {
				if ($(obj).attr("checked")) {
					$("#parent_id_" + id).attr("checked", true);
				} else {
					var find = false;
					//检查子元素中是否还有被选中的，如果没有，一级菜单设置为false
					$(".children_" + id).each(function() {
						if ($(this).attr("checked")) {
							find = true;
							return;
						}
					});
					if (!find) {
						$("#parent_id_" + id).attr("checked", false);
					}
				}
			}
		</script>

		<dl>
			<c:forEach items="${applicationScope.topPrivilegeList}" var="parent">
					<dt>
						<input type="checkbox" class="parent_${parent.id} parent"
							id="parent_id_${parent.id}"
							onClick="parentClick(this,'${parent.id}');" <c:if test="${elf:hasPrivilege(adminId,parent.id)}"> checked="checked" </c:if> value="${parent.id}" name="parent"/>
						${parent.name}
					</dt>
					<c:forEach items="${parent.children}" var="children">
						<dd  style="  margin-left: 30px;font-size: 10px;">
							<input type="checkbox"
								class="parent_${parent.id} children_${parent.id}"
								onClick="childrenClick(this,'${parent.id}');"
								value="${children.id}" 
								<c:if test="${elf:hasPrivilege(adminId,children.id)}"> checked="checked" </c:if>  name="parent"/> ${children.name}
						</dd>
					</c:forEach>
				
			</c:forEach>
		</dl>
		<div style="float: right; margin-right: 50%;">
				<input id="finishSubmit" class="btn btn-primary" type="button" value="保&nbsp;存" style="width: 100px"/>　　
		          <input type="hidden" id="adminId" name="adminId" value="${adminId}"/>
		</div>
	</form>
</body>
</html>

<script>
	function checkPass(obj) {

	}
</script>