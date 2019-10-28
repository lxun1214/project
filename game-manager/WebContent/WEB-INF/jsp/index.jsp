<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="elf" uri="/eltag"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", -10);
%>
<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">
<meta charset="utf-8">
<link href="css/public.css" type="text/css" rel="stylesheet">
<link href="css/houtai.css" type="text/css" rel="stylesheet">
<link href="css/smartMenu.css" type="text/css" rel="stylesheet">
<script src="static/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
<script type="text/javascript" src="js/contabs.js"></script>
<script type="text/javascript" src="js/maintabs.js"></script>
<script type="text/javascript" src="js/jquery-smartMenu-min.js"></script>
<script type="text/javascript" src="js/jquery.nicescroll.min.js"></script>
<script type="text/javascript"
	src="resources/js/plugns/ajaxfileupload.js"></script>

<link href="static/jquery-jbox/2.3/Skins/Bootstrap/jbox.min.css"
	rel="stylesheet" />
<script src="static/jquery-jbox/2.3/jquery.jBox-2.3.min.js"
	type="text/javascript"></script>
<link href="static/common/jeesite.min.css" type="text/css"
	rel="stylesheet" />

<link href="layui/css/layui.css" rel="stylesheet" />

<style type="text/css">
.tab_height {
	height: 92%;
}

</style>
<title>仙侠传</title>
</head>
<body style="padding: 0px 0px;">
	<div id="admin">
		<div class="ad-menu" id="ad-menu">
			<div class="ad-logo" style="padding-top: 20px;">
				<!-- <img src="image/shanping_logo02.png" height="86" width="147"> -->
				<h1 style="font-size:36px;">仙侠传</h1>
			</div>
			<div class="ad-list">
				<ul>

					<c:forEach items="${applicationScope.topPrivilegeList}"
						var="parent">
						<c:if test="${elf:hasPrivilege(userWarp.admin.id,parent.id)}">
							<li>
								<div class="li-item" data-id="data-id_${parent.id}">
									<em class="scm li-ico ic1"
										style="background:url(icon/${parent.id}.png) no-repeat;"></em>${parent.name}
									<span style="position: absolute; left: 180px; top: 0px;"><img
										src="icon/left_j.png" style="padding-top: 0px;"></span>
								</div>

								<dl>
									<c:forEach items="${parent.children}" var="children">
										<c:if
											test="${elf:hasPrivilege(userWarp.admin.id,children.id)}">
											<dd>
												<a href="javaScript:void(0);"
													class="dd-item site-demo-active" data-type="tabAdd">${children.name}</a>
												<input type="hidden" value="${children.url}" />
											</dd>
										</c:if>
									</c:forEach>
								</dl>

							</li>
						</c:if>
					</c:forEach>

				</ul>
			</div>
		</div>
		<div class="ad-comment-box" id="ad-comment"
			style="background-color: #FFF;">
			<!--头部部分1. -->
			<div class="ad-top-comment"
				style="height: 60px; background-color: #343E43; line-height: 60px; color: #FFF; font-weight: bold;">
				<div style="padding-left: 2%; float: left; font-size: 15px;">仙侠传管理系统</div>
				<div
					style="float: right; padding-right: 2%; font-size: 16px; vertical-align: middle;">
					<div style="float: left; margin-top: -1px; margin-right: 16px;">
						<img alt="安全退出" src="icon/exit.png">
					</div>
					<div style="float: left;">
						<a href="javascript:void(0);" style="color: #FFF;" id="logOut"
							onclick="logOut();">安全退出</a>
						<script type="text/javascript">
						  function logOut(){
							  layer.confirm('确认要退出吗?', {
								  btn: ['是的是的','等哈再说'] //按钮
								  ,title:'提示 '
								}, function(){
								    location.href="login.do";
								}, function(){
								  
							 });
						  }
						</script>
					</div>


				</div>
			</div>


			<div
				style="border-bottom: 2px solid #36beef; height: 3px; line-height: 3px; background-color: #FFF;">
			</div>



			<!-- 主题部分 -->
			<div class="ad-main-comment J_mainContent"
				style="border-top: 1px solid #CFCFCF; border-right: 1px solid #CFCFCF; border-left: 1px solid #CFCFCF; margin-top: 10px; margin-left: 15px; margin-right: 15px; padding-top: 3px; padding_bottom: 3px; padding-left: 10px; border-radius: 15px 15px 0px 0px; height: 87%;">

				<div
					style="height: 40px; background-color: #CFCFCF; border-radius: 15px 15px 0px 0px; margin-left: -10px; margin-top: -4px; line-height: 40px;">

					<marquee scrollAmount=10 width="100%" behavior=slide
						onmouseover=stop() onmouseout=start()>&nbsp;&nbsp;&nbsp;欢迎使用仙侠传管理系统，亲爱的管理员，祝您工作愉快!
						 
						</marquee>
				</div>

				<div class="layui-tab" lay-allowClose="true"
					lay-filter="iframe_show" style="height: 92%;">
					<ul class="layui-tab-title">
						<li class="layui-this">主页</li>
					</ul>
					<div class="layui-tab-content" style="height: 100%">
						<div class="layui-tab-item layui-show" style="height: 92%;">
							<iframe class="J_iframe" name="iframe0" width="100%"
								height="100%" id="iframe_src" src="sellersys/toIndex.do"
								frameborder="0" seamless></iframe>
						</div>

					</div>
				</div>

			</div>
		</div>
	</div>
	<script type="text/javascript">
		
		//页面加载出来后调用
		function closeTip() {
			top.$.jBox.closeTip();
		}
		
		

		

		$(function() {
			$(".ad-menu").niceScroll({
				cursorborder : "0 none",
				cursorcolor : "#1a1a19",
				cursoropacitymin : "0",
				boxzoom : false
			});
		})
	</script>


	<script src="layui/lay/dest/layui.all.js"></script>
	<button style="display: none;" class="site-demo-active del_layerui_tab"
		data-type="tabDelete"></button>
	<script>
	var iframeSt = '';
	var tabName = '';
	 function removeTab(name){
		 var count=0;
		 ;!function() {
			 var $ = layui.jquery, element = layui.element(); //Tab的切换功能，切换事件监听等，需要依赖element模块
			 var active = {
						tabDelete: function(){
						      //删除指定Tab项
						   element.tabDelete('iframe_show', count); //删除第3项（注意序号是从0开始计算）
						}
			};
			 $(".layui-tab-title")
				.find("li")
				.each(function() {
							if (name
									+ '<i class="layui-icon layui-unselect layui-tab-close">ဆ</i>' == $(
									this).html()) {
								var type = $('.del_layerui_tab').data('type');
								active[type] ? active[type].call(this) : '';
								return;
							}
							count++;
						});
			}();
	 }
	 

		;
		!function() {
			var $ = layui.jquery, element = layui.element(); //Tab的切换功能，切换事件监听等，需要依赖element模块
			//触发事件
			var active = {
				tabAdd : function() {
					//新增一个Tab项
					element.tabAdd('iframe_show', {
						title : tabName,
						content : iframeSt
					})
				}
			};
			
			

			$('.site-demo-active')
					.on('click',function() {
						
						

								tabName = $(this).html();
								var url = $(this).next().val();
								//先遍历，查询是否有当前table
								var find = false;
								
								$(".layui-tab-title")
										.find("li")
										.each(function() {
													if (tabName
															+ '<i class="layui-icon layui-unselect layui-tab-close">ဆ</i>' == $(
															this).html()) {
														//如果有
														find = true;
														$(".layui-tab-title")
																.find("li")
																.removeClass(
																		'layui-this');
														$(this).addClass(
																'layui-this');
													}
								});

								//如果已经有当前选项卡，显示内容
								if (find) {
									$(".layui-tab-item").each(
											function() {
												var iframe_src = $(this)
														.children(".J_iframe")
														.attr("src");
											
												if (iframe_src == url) {
													$('.layui-tab-item')
													.removeClass(
															'layui-show');
													$(this).addClass(
															'layui-show');
												}
											});
								} else {
									iframeSt = '<iframe class="J_iframe" name="iframe0" width="100%" height="100%"  src="'
											+ url
											+ '" frameborder="0" seamless></iframe>';

									var type = $(this).data('type');
									active[type] ? active[type].call(this) : '';
									$(".layui-tab-title")
									.find("li")
									.each(
											function() {
												if (tabName
														+ '<i class="layui-icon layui-unselect layui-tab-close">ဆ</i>' == $(
														this).html()) {
													$(".layui-tab-title")
															.find("li")
															.removeClass(
																	'layui-this');
													$(this).addClass(
															'layui-this');
												}
								    });
									
									
									$(".layui-tab-item").each(
											function() {
												var iframe_src = $(this)
														.children(".J_iframe")
														.attr("src");
												$('.layui-tab-item')
														.removeClass(
																'layui-show');
												if (iframe_src == url) {//
													$(this).addClass(
															'layui-show');
													$(this).addClass(
													'tab_height');
												}
									});
								}

							});
			//…
		}();
	</script>


	<button style="display: none;" data-method="offset" data-type="rb"
		class="layui-btn layui-btn-normal"></button>

	<div id="login_data" style="display: none;">
		<c:if test="${userWarp.admin.first_login!=100}">
	         ${userWarp.admin.name},您好 <br /> 上次登录时间：
			<fmt:formatDate value='${userWarp.admin.lastLoginTime_}'
				pattern='yyyy-MM-dd HH:mm:ss' />
			<br /> 上次登录IP：${userWarp.admin.lastLoginIp_} <br />
		</c:if>

		<c:if test="${userWarp.admin.first_login==100}">
	         ${userWarp.admin.name},您好 <br />
			<br /> 
	                            检测到您是第一次登录平台，建议您尽快修改密码
	     </c:if>

	</div>
	<script>
	
	var st=$("#login_data").html();
	
	;!function() { //独立版的layer无需执行这一句
  var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
  //触发事件
  var active = {
    offset: function(othis){
      var type = othis.data('type')
      ,text = st;
      
      layer.open({
        type: 1
        ,offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
        ,id: 'LAY_demo'+type //防止重复弹出
        ,content: '<div style="width: 260px;padding:20px 20px;">'+ text +'</div>'
        ,btn: '关闭'
        ,btnAlign: 'c' //按钮居中
        ,shade: 0 //不显示遮罩
        ,title :'登录提示 '
        ,yes: function(){
          layer.closeAll();
        }
      });
    }
  };
  //一秒后弹出登录提示
 setTimeout(function(){
	 var othis = $('.layui-btn'), method = othis.data('method');
	  active[method] ? active[method].call(this, othis) : '';
 },1500);
 
}();
</script>

</body>
</html>
