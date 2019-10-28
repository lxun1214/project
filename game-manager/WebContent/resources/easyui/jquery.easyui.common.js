 
function addTab(subtitle,url){
	try{ 
		var tab = $('#tabs').tabs('getSelected');
	 	var parentWindowName = (tab.panel('options').title);
		var frameId = 'f_'+getObjectId();
		if(!$('#tabs').tabs('exists',subtitle)){
			$('#tabs').tabs('add',{
				title:subtitle,
				content:createFrame(frameId,subtitle,url),
				closable:true,
			 	width:$('#mainPanle').width()-10,
				height:$('#mainPanle').height()-26,
				parentWindowName:parentWindowName 
			 	,frameId:frameId
			});
		}else{
			//tabClose(subtitle,-1);
			//addTab(subtitle,url);
			$('#tabs').tabs('select',subtitle);
			
		}
		//getUrl(tab);
			
		 tabDbClose();
	} catch(err) { 
		window.open (url, subtitle, 'height=800, width=900, top=0, left=0, toolbar=no, menubar=no, scrollbars=yes,resizable=no,location=no, status=no');
	} 
	
	//setTimeout("$('#"+frameId+"').height($('#"+frameId+"').height()-30)",1000);
}

var objectId = -1;
function getObjectId(){
	var curObjectId = (new Date()).getTime();
	while(objectId == curObjectId){
		curObjectId = (new Date()).getTime();
	};
	objectId = curObjectId
	return objectId;
}

//针对 tabs的变更，用于保证标签关闭时的
var lastTabs = new Array();
$(function() {
		
			$('#tabs').tabs({
						onSelect : function(tt) {
							// 移除 tt grep是数组筛选
							lastTabs = $.grep(lastTabs, function(n, i) {
										return n != tt;
									});
							// 重新压入，保证 最新的在最上面
							lastTabs.push(tt);
							// 更新当前
							currentTabTitle = tt;

							var tab = $('#tabs').tabs('getSelected');

							if(tab.panel("options").frameId){
								$("#"+tab.panel("options").frameId).height($("#"+tab.panel("options").frameId).height()+1);
								$("#"+tab.panel("options").frameId).height($("#"+tab.panel("options").frameId).height()-1);
 
								if($("#"+tab.panel("options").frameId)[0].contentWindow.myTable1){
								//  alert("query");
								  var _myTable1 = $("#"+tab.panel("options").frameId)[0].contentWindow.myTable1;
								  if(_myTable1.opts.width){
						 				_myTable1.resize({width:_myTable1.opts.width});
							 		}else{
							 			_myTable1.resize({});
							 		}
	 		
									 
								}
							}else{
							//希望frame重新调用 resize方法
								$("#rFrame").height($("#rFrame").height()+1);
								$("#rFrame").height($("#rFrame").height()-1);
							};
						},
						onClose : function(tt) {
							// 移除 tt
							lastTabs = $.grep(lastTabs, function(n, i) {
										return n != tt;
									});
							//alert(lastTabs);
							//重新选择
							$('#tabs').tabs('select',
									lastTabs[lastTabs.length - 1]);
						}
					});
		}); 
function getUrl(tab){
	alert(tab.panel('options').content);
}
function createFrame(frameId,subtitle,url)
{	
	url+=(url.indexOf("?")==-1)?"?":"&";
	var frid = frameId;
	url+="_frid="+frid+"&subtitle="+encodeURI(encodeURI(subtitle));
	var s = '<iframe id="'+frid+'" name="'+frid+'" scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}

function tabDbClose()
{
	/*双击关闭TAB选项卡*/
	$(".tabs-inner").dblclick(function(){
		var subtitle = $(this).children("span").text();
		$('#tabs').tabs('close',subtitle);
	})

	$(".tabs-inner").bind('contextmenu',function(e){
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});
		
		var subtitle =$(this).children("span").text();
		$('#mm').data("currtab",subtitle);
		
		return false;
	});
}
//关闭指定标签，refresh是需要刷新的ifrmae索引
function tabClose(subtitle,refresh)
{
	if(subtitle ==''){
		window.returnValue = "1";
		window.close();
	}else{
		$('#tabs').tabs('close',subtitle);
	}
	if(refresh!=""){
		if(refresh == null){
			refresh="rFrame";
		}
 		if(window.frames[refresh].query){
 			window.parent.parent.frames[refresh].query();
 		}else{
			window.frames[refresh].location.reload();
 		}
	}
}
function freshFrame(refresh){
	if(window.frames[refresh].query){
 			window.frames[refresh].query();
 		}else{
			window.frames[refresh].location.reload();
 		}
}
//绑定右键菜单事件
function tabCloseEven()
{
	//关闭当前
	$('#mm-tabclose').click(function(){
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close',currtab_title);
	})
	//全部关闭
	$('#mm-tabcloseall').click(function(){
		$('.tabs-inner span').each(function(i,n){
			var t = $(n).text();
			$('#tabs').tabs('close',t);
		});	
	});
	//关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function(){
		var currtab_title = $('#mm').data("currtab");
		$('.tabs-inner span').each(function(i,n){
			var t = $(n).text();
			if(t!=currtab_title)
				$('#tabs').tabs('close',t);
		});	
	});
	//关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function(){
		var nextall = $('.tabs-selected').nextAll();
		if(nextall.length==0){
			//msgShow('系统提示','后边没有啦~~','error');
			alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			$('#tabs').tabs('close',t);
		});
		return false;
	});
	//关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function(){
		var prevall = $('.tabs-selected').prevAll();
		if(prevall.length==0){
			alert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			$('#tabs').tabs('close',t);
		});
		return false;
	});

	//退出
	$("#mm-exit").click(function(){
		$('#mm').menu('hide');
	})
}

//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}

function clockon() {
    var now = new Date();
    var year = now.getFullYear(); //getFullYear getYear
    var month = now.getMonth();
    var date = now.getDate();
    var day = now.getDay();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var sec = now.getSeconds();
    var week;
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    week = arr_week[day];
    var time = "";
    time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu + ":" + sec + " " + week;

    $("#bgclock").html(time);

    var timer = setTimeout("clockon()", 200);
}