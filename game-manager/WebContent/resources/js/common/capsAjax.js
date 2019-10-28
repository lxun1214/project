if (!this.caps) {
	caps = {};
}
if (!this.caps.config) {
	caps.config = {};
}


/**
 * 同步
 * JqueryAjax，application/x-www-form-urlencoded;charset=utf-8
 * @param url 请求url
 * @param data 数据
 * @param success 请求成功回调函数
 * @param errback 请求失败回调函数
 */
caps.post = function(url, data, callback, errback) {
	caps.ajaxPost(url, data, callback, errback, false);
};

/**
 * 异步,无返回值
 * JqueryAjax，application/x-www-form-urlencoded;charset=utf-8
 * @param url 请求url
 * @param data 数据
 * @param success 请求成功回调函数
 * @param errback 请求失败回调函数
 */
caps.asyncPost = function(url, data, callback, errback) {
	caps.ajaxPost(url, data, callback, errback, true);
};

/**
 * 同步
 * JqueryAjax，contentType : "application/json"
 * @param url 请求url
 * @param data 数据
 * @param success 请求成功回调函数
 * @param errback 请求失败回调函数
 */
caps.postJson = function(url, data, callback, errback) {
	caps.ajaxPostJson(url, data, callback, errback, false);
};
/**
 * 同步
 * JqueryAjax，contentType : "application/json"
 * @param url 请求url
 * @param data 数据
 * @param success 请求成功回调函数
 * @param errback 请求失败回调函数
 */
caps.rquestJson = function(url, data, callback, errback) {
	caps.ajaxResponseJson(url, data, callback, errback, false);
};

/**
 * 异步
 * JqueryAjax，contentType : "application/json"
 * @param url 请求url
 * @param data 数据
 * @param success 请求成功回调函数
 * @param errback 请求失败回调函数
 */
caps.asyncPostJson = function(url, data, callback, errback) {
	caps.ajaxPostJson(url, data, callback, errback, true);
};

/**
 * JqueryAjax，"application/x-www-form-urlencoded;charset=utf-8"
 * @param url 请求url
 * @param data 数据
 * @param success 请求成功回调函数
 * @param errback 请求失败回调函数,如果发生了错误，错误信息（第二个参数）textStatus 除了得到 null 之外，还可能是 "timeout", "error", "notmodified" 和 "parsererror"。
 * @param async 是否异步
 */
caps.ajaxPost = function(url, data, success, errback, async) {
	$.ajax({
		type : "post",
		url : url,
		//dataType : "json",
		async : async,
		contentType:"application/x-www-form-urlencoded;charset=utf-8",
		data : data,
		beforeSend : loading("正在努力加载数据..."),// 发送请求前打开进度条
		success : function(list){
			closeTip();//任务执行成功，关闭进度条
			success(list);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			closeTip();//任务执行成功，关闭进度条
			if(errback){
				errback(XMLHttpRequest, textStatus, errorThrown);
			} else{
				alertx("系统发生错误，请联系管理员！");
			}
		}
	});
};

/**
 * JqueryAjax，"application/x-www-form-urlencoded;charset=utf-8"
 * @param url 请求url
 * @param data 数据
 * @param success 请求成功回调函数
 * @param errback 请求失败回调函数,如果发生了错误，错误信息（第二个参数）textStatus 除了得到 null 之外，还可能是 "timeout", "error", "notmodified" 和 "parsererror"。
 * @param async 是否异步
 */
caps.ajaxPost1 = function(url, data, success, errback, async) {
	$.ajax({
		type : "post",
		url : url,
		dataType : "json",
		async : async,
		contentType:"application/x-www-form-urlencoded;charset=utf-8",
		data : data,
		beforeSend : loading("正在努力加载数据..."),// 发送请求前打开进度条
		success : function(list){
			closeTip();//任务执行成功，关闭进度条
			success(list);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			closeTip();//任务执行成功，关闭进度条
			if(errback){
				errback(XMLHttpRequest, textStatus, errorThrown);
			} else{
				alertx("系统发生错误，请联系管理员！");
			}
		}
	});
};

/**
 * JqueryAjax，contentType : "application/json",
 * @param url 请求url
 * @param data 数据
 * @param success 请求成功回调函数
 * @param errback 请求失败回调函数
 * @param async 是否异步
 */
caps.ajaxPostJson = function(url, data, callback, errback, async) {
	$.ajax({
		type : "post",
		url : url,
		dataType : "json",
		async : async,
		contentType : "application/json",
		data : JSON.stringify(data),
		beforeSend : loading("正在努力加载数据..."),// 发送请求前打开进度条
		success : function(list){
			closeTip();//任务执行成功，关闭进度条
			callback(list);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			closeTip();//任务执行成功，关闭进度条
			if(errback){
				errback(XMLHttpRequest, textStatus);
			} else{
				//XMLHttpRequest.responseText
				alert("系统发生错误，请联系管理员！");
			}
		}
	});
};
/**
 * JqueryAjax，contentType : "application/json",
 * @param url 请求url
 * @param data 数据
 * @param success 请求成功回调函数
 * @param errback 请求失败回调函数
 * @param async 是否异步
 */
caps.ajaxResponseJson = function(url, data, callback, errback, async) {
	$.ajax({
		type : "post",
		url : url,
		dataType : "json",
		async : async,
		contentType : "application/json",
		data : JSON.stringify(data),
		//	beforeSend : loading("正在努力加载数据..."),// 发送请求前打开进度条
		success : function(list){
			//		closeTip();//任务执行成功，关闭进度条
			callback(list);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//		closeTip();//任务执行成功，关闭进度条
			if(errback){
				errback(XMLHttpRequest, textStatus);
			} else{
				//XMLHttpRequest.responseText
				alert("系统发生错误，请联系管理员！");
			}
		}
	});
};