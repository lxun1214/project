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
<!DOCTYPE html>
<html>
<head>
    <base href="<%=basePath%>">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <link rel="shortcut icon" href="favicon.ico"> <link href="css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="<%=path %>/css/font-awesome.css?v=4.4.0" rel="stylesheet">
    <link href="<%=path %>/css/bootstrap.min.css" rel="stylesheet">
    <link href="<%=path %>/css/animate.css" rel="stylesheet">
    <link href="<%=path %>/css/style.css?v=4.1.0" rel="stylesheet">
     <script>
		var myVar=setInterval(function(){myTimer()},1000);
		function myTimer(){
			var d=new Date();
			var t=d.toLocaleTimeString();
			document.getElementById("time").innerHTML=t;
		}
	</script>
</head>
<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
            <div class="col-sm-12">
              <div class="jumbotron">
              	<div style="margin-left: 250px">
                    <p>&nbsp;</p>
					<h1> ${userWarp.admin.name}</h1>
					<p>&nbsp;</p>
					<p>欢迎登录仙侠传后台系统</p>
					<p>系统关系重大</p>
					<p>请三思而后行！！！</p>
					<p id="time">&nbsp;</p>
					<p>&nbsp;</p>
					<p>&nbsp;</p>
					<p>&nbsp;</p>
                </div>
            </div>
            </div>
         </div>
     </div>
	<!-- 全局js -->
    
</body>
</html>
