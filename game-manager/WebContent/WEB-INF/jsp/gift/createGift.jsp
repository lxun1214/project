<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE>
<html>
<head>
    <base href="<%=basePath%>">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>公告添加</title>
	<meta name="keywords" content="">
	<meta name="description" content="">
	<link rel="shortcut icon" href="favicon.ico">
	<link href="css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
	<link href="css/font-awesome.css?v=4.4.0" rel="stylesheet">
	<!-- Data Tables -->
	<link href="css/plugins/dataTables/dataTables.bootstrap.css"
		rel="stylesheet">
	<link href="css/animate.css" rel="stylesheet">
	<link href="css/style.css?v=4.1.0" rel="stylesheet">
</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
		<div class="row">
			<div class="col-sm-12">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<h5>发放公告</h5>
					</div>
					<div class="ibox-content">
				 <form method="post" class="form-horizontal" id="commentForm" action="gift/createGift.do">
					<div class="form-group">
						    <label class="col-sm-3 control-label">选择服务器</label>
					   <div class="col-sm-7">
							<select class="form-control m-b" name="serverId" size="1" required style="width: 400px; ">
							    <c:forEach items="${servers}" var="server">
							         <option value="${server.serverId}">${server.name}</option>
							    </c:forEach>				
							</select>
					  </div>
					</div>
					
					<div class="form-group">
								<label class="col-sm-3 control-label">礼品包名称</label>
								<div class="col-sm-7">
									<input type="text" class="form-control" name="giftName" id="giftName"  required style="width: 400px;">
								</div>
					</div>
							
						
					 <div class="form-group">
								<label class="col-sm-3 control-label">礼包物品</label>
								<div class="col-sm-7">
								    <textarea name="itemId"  rows="15" cols="80"  id="itemId" required style="width: 400px; height: 150px; margin-top: 8px"
						         maxlength="1000" placeholder="物品ID;数量  以英文输入法冒号隔开。示例：1000;1:1001;2"></textarea>
								</div>
						</div>
						
						<div class="form-group">
								<label class="col-sm-3 control-label">生产个数</label>
								<div class="col-sm-7">
									<input type="text" class="form-control" name="codeCount" id="codeCount" required style="width: 400px;">
								    <label style="color:red;">最大10000条</label>
								</div>
						</div>
					
					  
							
						<div class="form-group">
								<label class="col-sm-3 control-label">开始时间</label>
								<div class="col-sm-7">
									<input type="datetime-local" class="form-control" name="starTime_1" id="starTime_1" required style="width: 400px;">
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-3 control-label">结束时间</label>
								<div class="col-sm-7">
									<input type="datetime-local" class="form-control" name="endTime_1" id="endTime_1" required style="width: 400px;">
								</div>
							</div>
							
							<div class="hr-line-dashed"></div>
							<div class="form-group">
								<div class="col-sm-4 col-sm-offset-8" style="margin-left: 41%;">
									<button class="btn btn-success" type="submit">提&nbsp;&nbsp;交</button>&nbsp;&nbsp;&nbsp;&nbsp;
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 全局js -->
	<script src="js/jquery.min.js?v=2.1.4"></script>
	<script src="js/plugins/jeditable/jquery.jeditable.js"></script>
	
	<!-- Data Tables -->
	<script src="js/plugins/dataTables/jquery.dataTables.js"></script>
	<script src="js/plugins/dataTables/dataTables.bootstrap.js"></script>

	<!-- 自定义js -->
	<script src="js/content.js?v=1.0.0"></script>
	
	<!-- 表单验证 -->
	<script src="js/plugins/validate/jquery.validate.min.js"></script>
	<script src="js/plugins/validate/messages_zh.min.js"></script>
	
	<!-- layer javascript -->
    <script src="js/plugins/layer/layer.min.js"></script>
    
    <script src="static/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
    <script type="text/javascript"
	src="resources/easyui/jquery-common.min.js"></script>
    <script type="text/javascript"
	src="resources/easyui/jquery.easyui.min.js"></script>
    <script src="layer/layer.js"
	type="text/javascript"></script>
	<script>
	
	$('#commentForm').form({
				onSubmit : function() {
					if($("#giftName")==""||$("#starTime_1")==""||$("#endTime_1")==""||$("#codeCount")==""||$("#itemId")==""){
						alert("请完善页面信息");
						return false;
					}
					layer.msg('正在提交，勇士请稍后...', {
						   icon: 16
						  ,shade: 0.01,
						  time:30000
					});
					return $(this).form('validate');
				},
				success : function(data) {
					layer.msg('正在提交，勇士请稍后...', {
						   icon: 16
						  ,shade: 0.01,
						  time:1
					});
					if (data == "success") {
						layer.msg("操作成功");
						window.setTimeout(function() {
							location.reload();
	        			}, 2000);
					} else if(data=="count_error"){
						layer.alert('生产个数有误哦', {
							  icon: 2,
							  title:'幸存者的提示',
							  skin: 'layer-ext-moon' 
						})
					} else if(data=="item_error"){
						layer.alert('礼包道具填写有误哦，请检查', {
							  icon: 2,
							  title:'幸存者的提示',
							  skin: 'layer-ext-moon' 
						})
					} else if(data=="item_max"){
						layer.alert('有道具数量给的太多哦', {
							  icon: 2,
							  title:'幸存者的提示',
							  skin: 'layer-ext-moon' 
						})
					}else{
						layer.alert('哦豁，保存失败了'+data, {
							  icon: 2,
							  title:'幸存者的提示',
							  skin: 'layer-ext-moon' 
						})
					}
				},
				error : function(response) {
					alert("网络连接失败");
				}
			});
	
	</script>
</body>
</html>
