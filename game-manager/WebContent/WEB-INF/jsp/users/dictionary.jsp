<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
<link rel="stylesheet" type="text/css"
	href="resources/easyui/themes/default/easyui.css">
<script type="text/javascript"
	src="resources/easyui/jquery.easyui.min.js"></script>

	
</head>
<body>
	<div style="margin: 20px 0;">
		<a href="javaScript:void(0);" class="easyui-linkbutton" onclick="getSelected(1)">添加子节点</a>
		<a href="javaScript:void(0);" class="easyui-linkbutton" onclick="getSelected(2)">编辑该节点</a>
		<a href="javaScript:void(0);" class="easyui-linkbutton" onclick="getSelected(3)">删除该节点</a>
	</div>
	<div class="easyui-panel" style="padding: 5px">
		<ul id="tt" class="easyui-tree"
			data-options="url:'sellersys/mall/listTree.do?id=${id}',method:'get',animate:true,lines:true"></ul>
	</div>
	<p>
	<p>
	<p>
	<p>
		&nbsp;
		<script type="text/javascript">
		parent.closeTip();
		
		function closeJbox(){
			refresh();
			$.jBox.close();
		}
		
	function refresh(){
		window.location.reload();
	}
	function editMenu(id){
		  $.jBox.open("iframe:sellersys/mall/toDictionary.do?id="+id+"&parent_id=0&type=1&toUrlType="+'${id}',
			"编辑信息", 600, 200, {
				buttons : {
					'关闭' : true
		   }
	   });
	//location.href="toDictionary.do?id="+id+"&parent_id=0&type=1&toUrlType="+'${id}';
	}
    function addMenu(parentId){
    	 $.jBox.open("iframe:sellersys/mall/toDictionary.do?id=0&parent_id="+parentId+"&type=2&toUrlType="+'${id}',
    				"添加节点", 600, 200, {
    					buttons : {
    						'关闭' : true
    			   }
    	 });
    	
    }
function updateForm(){
	if($("#true_name").val()==""){
		alert("姓名不能为空");
		return ;
	}
	$.ajax({
	         cache: true,
	               type: "POST",
	                url:"updateUser.do",
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
	                		//window.parent.frames[getUrlParam("_pfrid")].refresh();
	                		parent.closeTab(decodeURI(getUrlParam("subtitle")),"");
	                	}
	                }
	            });
}
function deleteMenu(id){
	var str="确定删除该节点及其子节点吗";
	if(confirm(str)){
		$.ajax({
	         cache: true,
	         type: "get",
	         url:"sellersys/mall/delete.do?id="+id,
	         data:{},// 你的formid
	         async: false,
	         dataType : "text",
	         error: function(data) {
	             alert("出现错误，请联系管理员");
	         },
	         success: function(data) {
	                	if(data == "1"){
	                		alert("出现错误，请联系管理员");
	                	}else if(data == "0"){
	                		alert("操作成功");
	                		refresh();
	                	}
	                }
	            });
		
	}
}
	function getSelected(num){
		var node = $('#tt').tree('getSelected');
		var s="";
		if (node){
			s = node.id;
		}
		if(s==""){
			alert("请选择节点进行操作");
			return ;
		}
		if(num ==1){
			addMenu(s);
		}else if(num ==2){
			editMenu(s);
		}else if(num ==3){
			deleteMenu(s);
		}
	}
</script>
</body>
</html>