<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setAttribute("cxt", basePath);
%>
<html style="overflow-x: auto; overflow-y: auto;">
<head>
<title>新增H5广告</title>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<meta name="author" content="http://www.jsy86.com/" />
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=8,IE=9,IE=10" />
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
 $(function(){
	 var mallImg='${mall.mallImg}';
	 if(mallImg!=""&&mallImg!=null){
         var mallimgs=mallImg.split("#");
         for(var i=1;i<mallimgs.length+1;i++){
        	 $("#home_page_show"+i).attr("src",mallimgs[i-1]);
         }
	 }

	 var detailsImg='${mall.detailsImg}';
	 if(detailsImg!=""&&detailsImg!=null){
         var detailsImgs=detailsImg.split("#");
         for(var i=9;i<detailsImgs.length+9;i++){
        	 $("#home_page_show"+i).attr("src",detailsImgs[i-9]);
         }
	 }
	 
	 
	 $("#goodsType1").change(function () {
         $.get("sellersys/mall/getJsjyDict/"+$("#goodsType1").val()+".do",function(data){
             if(data.status){
                 var result = "<option value='0'>请选择</option>";
                 $.each(data.obj,function(n,value){
                     result +="<option value='"+value.id+"'>"+value.kindname+"</option>";
                 });
                 $("#s2id_goodsType2").find(".select2-chosen").html('请选择');
                 $("#goodsType2").html('');
                 $("#goodsType2").append(result);
                 
                 $("#s2id_goodsType3").find(".select2-chosen").html('请选择');
                 $("#goodsType3").html('');
                 
                 $("#s2id_goodsType4").find(".select2-chosen").html('请选择');
                 $("#goodsType4").html('');
             }
         },"json");
     });
	 
	 
	 
	 $("#goodsType2").change(function () {
         $.get("sellersys/mall/getJsjyDict/"+$("#goodsType2").val()+".do",function(data){
             if(data.status){
                 var result = "<option value='0'>请选择</option>";
                 $.each(data.obj,function(n,value){
                     result +="<option value='"+value.id+"'>"+value.kindname+"</option>";
                 });
                 $("#s2id_goodsType3").find(".select2-chosen").html('请选择');
                 $("#goodsType3").html('');
                 $("#goodsType3").append(result);
                 
                 $("#s2id_goodsType4").find(".select2-chosen").html('请选择');
                 $("#goodsType4").html('');
             }
         },"json");
     });
	 
	 
	 $("#goodsType3").change(function () {
         $.get("sellersys/mall/getJsjyDict/"+$("#goodsType3").val()+".do",function(data){
             if(data.status){
                 var result = "<option value='0'>请选择</option>";
                 $.each(data.obj,function(n,value){
                     result +="<option value='"+value.id+"'>"+value.kindname+"</option>";
                 });
                 $("#s2id_goodsType4").find(".select2-chosen").html('请选择');
                 $("#goodsType4").html('');
                 $("#goodsType4").append(result);
             }
         },"json");
     });
	 
 })
</script>
</head>
<body id="insertPosterBody">
	<form id="myForm" class="form-horizontal"
		action="sellersys/poster/launchPoster.do" method="post">
		<script type="text/javascript">
			top.$.jBox.closeTip();
		</script>
		<table class="table-form"
			style="width: 100%; margin: 0 auto; margin-top: 0%;">
			   <%--  <tr>
			    <td  class="tit">请选择投放地址<font color="red">*</font>：
			   
			    </td>
			    <td colspan="3">
			      	<select id="goodsType1" name="goodsType1" style="width:130px;margin-left: 5px;" class="input-xlarge">
                     <option value="0" >请选择</option>
                     <c:forEach var="gc" items="${childList }">
                      <option value="${gc.id}" >${gc.kindname}</option>
                     </c:forEach>
	                  
				</select>
				 <select id="goodsType2" name="goodsType2" style="width:135px;margin-left: 5px;"  class="input-xlarge required" >
					   <option value="0" >请选择</option>
				</select>
				
				 <select id="goodsType3" name="goodsType3" style="width:135px;margin-left: 5px;"  class="input-xlarge required" >
					   <option value="0" >请选择</option>
				</select>
				
				 <select id="goodsType4" name="goodsType4" style="width:135px;margin-left: 5px;"  class="input-xlarge required" >
					   <option value="0" >请选择</option>
				</select>
			   </td>
			  </tr> --%>
			  
			 
			 <tr>
			    <td  class="tit">选择投放位置<font color="red">*</font>：
			     <input type="hidden" name="posterId" value="${posterId}">
			    </td>
			    <td colspan="3">
			     <select id="launchType" name="launchType" style="width:200px;margin-left: 5px;"  class="input-xlarge required" >
					   <option value="1" >首页banner</option>
					   <option value="2" >首页头条</option>
					    <option value="3" >栏目banner</option>
					    <option value="4" >栏目推荐</option>
				</select>
			   </td>
			  </tr>
			  
			 <tr>
			    <td  class="tit">选择投放日期<font color="red">*</font>：</td>
			    <td colspan="3">
			        <c:forEach items="${dataList}" var="da" varStatus="status">
			                  <c:if test="${status.index % 4 == 0}">
			                     <br />
			                  </c:if>
							  <input type="checkbox" class="server_all"  value="${da}" name="launchData">${da} &nbsp;&nbsp;
						</c:forEach>		
			   </td>
			  </tr> 
			<tr id="dfnr">
				<td colspan="5">
					<div style="float: right; margin-right: 50%;">
						<input id="finishSubmit" class="btn btn-primary" type="submit"
							value="保存" />
					</div>
				</td>
			</tr>
		</table>
	</form>

	<script type="text/javascript">
	 $(function () {
         var editor = new wangEditor('div1');
         editor.create();
     });
	
		function readFile_1() {
			var file = this.files[0];
			if (parseInt(file.size) > 1024 * 2048) {
				showTip("图片大小不能超过2048KB");
				$(this).val('');
				$("#home_page_show").attr("src", "resources/images/auth.jpg");
			}
		}

		$(function() {
			
			var sft='${mall.specifications}';
			if(sft!=""){
				var sfts=sft.split("#");
				var i=0;
				$('input[name="sft"]').each(function() {
					if(i<sfts.length){
						$(this).val(sfts[i]);
					}
					 i++;
				});
				
			}
			
			/**判断上传文件大小*/
			var inv_1 = document.getElementById("home_page_img");
			inv_1.addEventListener('change', readFile_1, false);
		})

		$('#myForm').form(
				{
					onSubmit : function() {//
						/* if($("#goodsType4").val()==""||$("#goodsType4").val()==0||$("#goodsType4").val()==null){
							alert("请选择地址");
							return false;
						} */
						 var isFind = false;
							$(".server_all").each(function() {
								if ($(this).attr("checked")) {
									isFind = true;
								}
							});
							if(!isFind){
								alert("请最少选择一个投放日期");
								return false;
							}
				     	loading('玩命投放中，请稍等...');
						return $(this).form('validate');
					},
					success : function(data) {
						if (data == "success") {
							showTip("操作成功");
							window.setTimeout(function() {
		        				parent.closeJbox();
		        			}, 1000);
						} else if(data == "max_error"){
							showTip("有日期广告位置上限，请重新选择日期", "error");
						}else{
							showTip("投放失败，请刷新后操作", "error");
						}
					},
					error : function(response) {
						alert("网络连接失败");
					}
				});

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
</body>
</html>

