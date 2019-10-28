function confirmDialog(text, callback) {
	var popupDialogId = 'popupDialog';
	$('<div data-role="popup" id="' + popupDialogId + '" data-confirmed="no" data-transition="pop" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:500px;"> \
			<div data-role="header" class="ui-content myInfo">\
			提示\
	      </div>\
			<div data-role="content " id="myInfoContent" class="ui-content">\
			' + text + '\
	      </div>\
	      <div data-role="footer" data-theme="a">\
			 <div data-role="navbar">\
		      <ul>\
		        <li><a href="#" class="optionCancel" data-rel="back" data-transition="flow">取消</a></li>\
				<li><a href="#" class="optionConfirm" data-rel="back">确定</a></li>\
		      </ul>\
		    </div>\
	      </div>\
	  </div>')
    .appendTo($.mobile.pageContainer);
	var popupDialogObj = $('#' + popupDialogId);
	popupDialogObj.trigger('create');
	popupDialogObj.popup({
	    afterclose: function (event, ui) {
	        popupDialogObj.find(".optionConfirm").first().off('click');
	        var isConfirmed = popupDialogObj.attr('data-confirmed') === 'yes' ? true : false;
	        $(event.target).remove();
	        if (isConfirmed && callback) {
	            callback();
	        }
	    }
	});
	popupDialogObj.popup('open');
	popupDialogObj.find(".optionConfirm").first().on('click', function () {
	    popupDialogObj.attr('data-confirmed', 'yes');
	});
}
function loadCss(id, url) {
	if (!document.getElementById(id)){
	    var elem = document.createElement("link");
	    elem.id = id
	    elem.rel = "stylesheet";
	    elem.type = "text/css";
	    elem.href = url;
	    document.body.appendChild(elem);
	}
}
function loadJs(id, url) {
	if (!document.getElementById(id)){
	    var elem = document.createElement("script");
	    elem.id = id;
	    elem.src = url;
	    document.body.appendChild(elem);
	}
}