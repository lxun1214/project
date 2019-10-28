<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Insert title here</title>
<base href="<%=basePath%>">
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>resources/css/common.css" />
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>resources/css/main.css" />
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>resources/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>resources/easyui/themes/icon.css">
<script type="text/javascript"
	src="<%=basePath%>resources/easyui/jquery-common.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>resources/jquery-1.7.2.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>resources/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>resources/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"
	src="<%=basePath%>resources/ajaxfileupload.js"></script>
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
function showImg(file, div, img) {
	var docObj = document.getElementById(file);
	var imgObjPreview = document.getElementById(img);
	if (docObj.files && docObj.files[0]) {

		setTimeout(
				function() {// 确保图片加载完成
					var real_width, real_height, max_width, max_height, _im = document
							.getElementById(img), im = document
							.createElement('img');
					im.src = _im.src, real_width = im.width,
							real_height = im.height;
					max_width = parseInt($("#" + file).attr("maxWidth"));
					max_height = parseInt($("#" + file).attr(
							"maxHeiget"));
					if(max_height!=0){
					if (!(isNaN(max_width) && isNaN(max_height))) {
							if (real_width != max_width
									|| real_height != max_height) {
								alert("请选择尺寸为" + max_width + "*"
										+ max_height + "的图片！");
								$("#" + file).attr("value", "");
								$("#" + img).attr("src",
										"resources/images/auth.jpg");
								return false;
							}
						}
					}else{
						if (!(isNaN(max_width))) {
							if (real_width != max_width) {
								alert("请选择尺寸宽为" + max_width + "的图片！");
								$("#" + file).attr("value", "");
								$("#" + img).attr("src",
										"resources/images/auth.jpg");
								return false;
							}
						}
					}
				}, 500);

		//火狐下，直接设img属性 
		imgObjPreview.style.display = 'block';
		imgObjPreview.style.width = '118px';
		imgObjPreview.style.height = '90px';
		//imgObjPreview.src = docObj.files[0].getAsDataURL(); 
		//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式 
		imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
	} else {

		//IE下，使用滤镜 
		docObj.select();
		var imgSrc = document.selection.createRange().text;
		var localImagId = document.getElementById(div);
		//必须设置初始大小 
		localImagId.style.width = "118px";
		localImagId.style.height = "90px";
		//图片异常的捕捉，防止用户修改后缀来伪造图片 
		try {
			localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			localImagId.filters
					.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		} catch (e) {
			alert("您上传的图片格式不正确，请重新选择!");
			return false;
		}
		imgObjPreview.style.display = 'none';
		document.selection.empty();
	}
	return true;
}

</script>
</head>
<body>
	<!-- 新增用-->
	<c:if test="${type==2}">
		<form id="myForm" action="sellersys/mall/insertMenu.do" method="post" enctype="multipart/form-data">
			<table class="insert-tab" width="100%">
				<tbody>
					<tr>
					    <th >地址名称:</th>
						<td ><input value="" type="text"
							id="kindname" class="common-text" name="kindname">*<input
							type="hidden" id="fid" name="fid" value="${dictionary.fid }">
								<input type="hidden" name="orderId" value="0">
							</td>
					</tr>
					<tr>
					    <th></th>
						<td align="center"><input type="submit" value="添加"
							 class="btn btn-primary btn6 mr10"></td>
					</tr>
				</tbody>
			</table>
		</form>
	</c:if>
	<!--编辑用户 -->
	<c:if test="${type==1}">
		<form id="myForm1" action="sellersys/mall/updateMenu.do" method="post" enctype="multipart/form-data">
			<table class="insert-tab" width="100%">
				<tbody>
					<tr>
						<td>地址名称:</td>
						<td><input value="${dictionary.kindname }" type="text"
							id="kindname" name="kindname">*<input type="hidden"
							id="fid" name="fid" value="${dictionary.fid}"><input
							type="hidden" id="id" name="id" value="${dictionary.id }">
							<input
							type="hidden" id="img" name="img" value="${dictionary.img}">
							<input type="hidden" name="orderId" value="0">
							</td>
					</tr>
					
					<tr>
						<td colspan="2" align="center"><input type="submit"
							value="确定修改" class="btn btn-primary btn6 mr10"
							 /></td>
					</tr>
				</tbody>
			</table>
		</form>
	</c:if>
	

	<script type="text/javascript">
/* 	function checkForm(){
		if($("#kindname").val()==""){
			alert("名称不能为空");
			return ;
		}
		$.ajax({
		         cache: true,
		               type: "POST",
		                url:"insert.do",
		                data:$('#myform').serialize(),// 你的formid
		                async: false,
		                dataType : "text",
		                error: function(data) {
		                	alert("出现错误，请联系管理员");
		                },
		                success: function(data) {
		                	if(data == "1"){
		                		alert("出现错误，请联系管理员");
		                	}else if(data == "0"){
		                		alert("保存成功");
		                		window.parent.frames[getUrlParam("_pfrid")].refresh();
		                		parent.closeTab(decodeURI(getUrlParam("subtitle")),"");
		                	}
		                }
		            });
	} */
	

	$('#myForm').form({
				onSubmit : function() {
					if($("#kindname").val()==""){
						alert("名称不能为空");
						return false;
					}
					return $(this).form('validate');
				},
				success : function(data) {
					if (data == 0) {
						alert("保存成功");
						window.setTimeout(function() {
	        				parent.closeJbox();
	        			}, 500);
					}else {
						alert("出现错误");
						$('#upPass').dialog('close');
					}

				},
				error : function(response) {
					alert("出现错误");
					$('#upPass').dialog('close');
				}
			});
	
	$('#myForm1').form({
		onSubmit : function() {
			if($("#kindname").val()==""){
				alert("名称不能为空");
				return false;
			}
			return $(this).form('validate');
		},
		success : function(data) {
			if (data == 0) {
				alert("修改成功");
				window.setTimeout(function() {
    				parent.closeJbox();
    			}, 500);
			} else {
				alert("出现错误");
				$('#upPass').dialog('close');
			}

		},
		error : function(response) {
			alert("出现错误");
			$('#upPass').dialog('close');
		}
	});



</script>
</body>
</html>