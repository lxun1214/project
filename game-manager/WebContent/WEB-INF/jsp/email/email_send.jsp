<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<% 
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ path + "/";
%>
<!DOCTYPE>
<html>
<head>
    <base href="<%=basePath%>">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>邮件发放</title>
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
						<h5>发放邮件</h5>
					</div>
					
					
					<script type="text/javascript">

			function childrenClick(obj,id) {
				if(parseInt(id)==0){
					if ($(obj).attr("checked")) {
						$(".server_all").attr("checked", true);
					} else {
						$(".server_all").attr("checked", false);
					}
				}else{
					if ($(obj).attr("checked")) {
					} else {
						$(".server_0").attr("checked", false);
					}
				}
				
			}
		</script>
					
					<div class="ibox-content">
						<form method="post" class="form-horizontal" id="commentForm" action="email/saveEmail.do">
						
						
							<div class="form-group">
									<label class="col-sm-3 control-label">选择服务器</label>
									<div class="col-sm-7">
									
									<input type="checkbox" class="server_0 server_all" value="0"  onClick="childrenClick(this,'0');">全选&nbsp;&nbsp;
									 <c:forEach items="${servers}" var="server">
							             <input type="checkbox"  class="server_${server.serverId} server_all" name="serverArray" onClick="childrenClick(this,'${server.serverId}');" value="${server.serverId}">${server.name} &nbsp;&nbsp;
							        </c:forEach>				
						
									</div>
					       </div>
					         
							<div class="form-group">
								<label class="col-sm-3 control-label">邮件标题</label>
								<div class="col-sm-7">
									<input type="text" class="form-control" placeholder="" required name="emailTitle" style="width: 500px; ">
								</div>
							</div>
							
							<div class="form-group">
								<label class="col-sm-3 control-label">邮件内容</label>
								<div class="col-sm-7">
									 <textarea name="emailContent"  rows="15" cols="80" required id="emailContent" style="width: 500px; height: 150px; margin-top: 8px"
						         maxlength="500" placeholder="最多可输入250个字符"></textarea>
								</div>
							</div>
					       
					       <script src="static/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
					       <script type="text/javascript">
					        $(function(){
					    	   $("#userType").change(function () {
						    	   var val = parseInt($("#userType").val());
						    	   if(val==1){ 
						    		   $("#targetPlayer").hide();
						    	   }else{
						    		   $("#targetPlayer").show();
						    		 
						    	   }
						       });
					       })
					       
					     
					       </script>
					       
					       
					       <div class="form-group">
								<label class="col-sm-3 control-label">用户类型</label>
								<div class="col-sm-7">
									<select class="form-control m-b" name="userType" id="userType" size="1" required style="width: 500px; ">
										<option value="1">全体用户</option>
										<option value="2">具体用户</option>
									</select>
								</div>
						  </div>
					        
					       
					       
					       
					       
					       <div class="form-group" id="targetPlayer"  style="display:none;">
								<label class="col-sm-3 control-label">具体用户</label>
								<div class="col-sm-7">
								  <textarea name="userIdAll"  rows="15" cols="80"   id="userIdAll" style="width: 500px; height: 150px; margin-top: 8px"
						         maxlength="1000" placeholder="角色名称，以#号隔开。示例：天行者#金刚狼"></textarea>
								</div>
						  </div>
							
							
							<div class="form-group">
								<label class="col-sm-3 control-label">邮件物品</label>
								<div class="col-sm-7">
								    <textarea name="itemAll"  rows="15" cols="80"  id="itemAll" style="width: 500px; height: 150px; margin-top: 8px"
						         maxlength="1000" placeholder="物品ID_数量，以英文输入法分号隔开。示例：1000_1;1001_2"></textarea>
								    
								</div>
							</div>
							
							
							<div class="form-group">
								<label class="col-sm-3 control-label">开始时间</label>
								<div class="col-sm-7">
									<input type="datetime-local" value="YYYY-MM-DD HH:mm:ss" required class="form-control" placeholder="" name="starTime_1" style="width: 500px; ">
								</div>
							</div>
							
							<div class="form-group">
								<label class="col-sm-3 control-label">结束时间</label>
								<div class="col-sm-7">
									<input type="datetime-local"  value="YYYY-MM-DD HH:mm:ss"  required class  ="form-control" placeholder="" name="endTime_1" style="width: 500px; ">
								</div>
							</div>
							
							
							<div class="hr-line-dashed"></div>
							<div class="form-group">
								<div class="col-sm-4 col-sm-offset-8" style="margin-left: 41%;">
									<button class="btn btn-success" type="submit">保存发送</button>&nbsp;&nbsp;&nbsp;&nbsp;
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
	<script src="js/bootstrap.min.js?v=3.3.6"></script>
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
                    var isFind = false;
					$(".server_all").each(function() {
						if ($(this).attr("checked")) {
							isFind = true;
						}
					});
					if(!isFind){
						layer.alert('请选择一个服务器', {
							  icon: 2,
							  title:'幸存者的提示',
							  skin: 'layer-ext-moon' 
						})
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
					} else{
						layer.alert('哦豁，保存失败了', {
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
