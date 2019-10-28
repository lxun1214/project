var version = "?v=" + "20151123";
In.add('bootstrap-css', {
	path : 'static/bootstrap/2.3.1/css_cerulean/bootstrap.min.css' + version,
	type : 'css',
	charset : 'utf-8'
});
In.add('select2-css', {
	path : 'static/jquery-select2/3.4/select2.min.css' + version,
	type : 'css',
	charset : 'utf-8'
});
In.add('jquery-validate-css', {
	path : 'static/jquery-validation/1.11.0/jquery.validate.min.css' + version,
	type : 'css',
	charset : 'utf-8'
});
In.add('jbox-css', {
	path : 'static/jquery-jbox/2.3/Skins/Bootstrap/jbox.min.css' + version,
	type : 'css',
	charset : 'utf-8'
});
In.add('jeesite-css', {
	path : 'static/common/jeesite.min.css' + version,
	type : 'css',
	charset : 'utf-8'
});
In.add('daterangepicker-css', {
	path : 'static/daterangepicker/daterangepicker-bs2.css' + version,
	type : 'css',
	charset : 'utf-8'
});
In.add('source-jbox-css', {
	path : 'static/jquery-jbox/jBox-0.3.0/Source/jBox.css' + version,
	type : 'css',
	charset : 'utf-8'
});
In.add('tooltipborder', {
	path : 'static/jquery-jbox/jBox-0.3.0/Source/themes/TooltipBorder.css' + version,
	type : 'css',
	charset : 'utf-8'
});


//JQuery
In.add('jquery', {
	path : 'static/jquery/jquery-1.8.3.min.js' + version,
	type : 'js',
	charset : 'utf-8'
});
In.add('capsAjax', {
	path : 'resources/js/common/capsAjax.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('ajaxfileupload', {
	path : 'resources/js/plugns/ajaxfileupload.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('jquery-ui-js', {
	path : 'resources/js/plugns/ajaxfileupload.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('select2', {
	path : 'static/jquery-select2/3.4/select2.min.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('jquery-validate-js', {
	path : 'static/jquery-validation/1.11.0/jquery.validate.min.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('jquery-jbox-js', {
	path : 'static/jquery-jbox/2.3/jquery.jBox-2.3.min.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('wdatepicker', {
	path : 'static/My97DatePicker/WdatePicker.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('moment', {
	path : 'static/daterangepicker/moment.min.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('daterangepicker', {
	path : 'static/daterangepicker/daterangepicker.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('bootstrap-js', {
	path : 'static/bootstrap/2.3.1/js/bootstrap.min.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('date-zh-cn', {
	path : 'static/js/date-zh-CN.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('ellipsis', {
	path : 'static/js/jquery.ellipsis.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('jbox-js', {
	path : 'static/jquery-jbox/jBox-0.3.0/Source/jBox.min.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('mustache', {
	path : 'static/common/mustache.min.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery']
});
In.add('poster', {
	path : 'resources/js/sellersys/poster.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery','jquery-ui-js']
});
In.add('jeesite-js', {
	path : 'static/common/jeesite.min.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery','jbox-js','jquery-jbox-js']
});
In.add('addScriptPosterafter', {
	path : 'resources/js/sellersys/listposterafter.js' + version,
	type : 'js',
	charset : 'utf-8',
	rely : [ 'jquery','jbox-js','jquery-jbox-js','capsAjax','ajaxfileupload','jquery-ui-js','select2','jquery-validate-js','wdatepicker','moment','daterangepicker','bootstrap-js','date-zh-cn','ellipsis','mustache','poster','jeesite-js','bootstrap-css','select2-css','jquery-validate-css','jbox-css','jeesite-css','daterangepicker-css','source-jbox-css','tooltipborder']
});












