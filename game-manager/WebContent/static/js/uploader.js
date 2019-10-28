/**
 * uploadify上传公用方法
 * 
 * 如何使用这个插件：页面只需引用uploader.js
 * 调用Uploader({element:'',sessionId:''})方法
 * <input type="file" id="attachments"/>
	<div id="files"></div>
	<div id="fileQueue"></div>
 */
function Uploader(config){
	this.element = config.element;
	this.sessionId = config.sessionId;
	this.uploader();
}

Uploader.prototype = {
		uploader:function(){
			var self = this;
			$(self.element).uploadify({
				'uploader': ctxStatic + '/js/uploadify/uploadify.swf',
		        'script': ctx+'/file/uploadAndAdd.do;jsessionid='+self.sessionId,	//指定服务端处理类的入口
		 		'cancelImg' : ctxStatic + '/js/uploadify/cancel.png', //关闭的图标小图片
		        'queueID': 'fileQueue',
		        'fileDataName': 'fileInput',//和input的name属性值保持一致
		        'auto': true,//是否选取文件后自动上传   
		        'multi': true,//是否支持多文件上传
		        'simUploadLimit' : 10,//每次最大上传文件数
		       	'removeCompleted' : false,
				'buttonImg':ctxStatic + '/images/upload.png', //“附件上传”按钮是一个小图片
				'wmode': 'transparent',
			    'width': 75,
			    'height': 20,
			    'displayData': 'speed', //有speed和percentage两种，一个显示速度，一个显示完成百分比
			    //上传文件
			    'onComplete': function(event, ID, fileObj, response, data) {
		       		$('#files').append('<input type="hidden" id="'+ID+'" name="files" value="'+response+'"/>');
		         },
		         //删除文件
		       	 'onCancel': function(event,ID,fileObj,data) {
		       		 if($('#'+ID).length > 0){
		       			 $.post(ctx + '/file/deleteFile.do',{id:$('#'+ID).val()},function(){$('#'+ID).remove();});
		       		 }else{
		       			 $.post(ctx + '/file/deleteFile.do',{id:ID},function(){});
		       		 }
		         }
			});
		}
};




