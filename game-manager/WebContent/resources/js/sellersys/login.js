$(function() {

	$("#_loginbut").click(function() {
		if ($("#keyWord").val() == "" || $("#keyWord").val() == "请输入用户名") {
			alert("请输入用户名");
			return;
		}

		var nickname = $("#keyWord").val();
		// var b = /^[0-9a-zA-Z]*$/g;
		var b = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
		if (nickname == "" || nickname == null) {
			return false;
		} else if (!(b.test(nickname)) && nickname) {
			$("#keyWord").val("");
			$("#keyWord").focus();
			alert("用户名由英文字母和数字组成,且不能以数字开头");
			return false;
		}

		if ($("#password").val() == "" || $("#password").val() == "请输入密码") {
			alert("请输入密码");
			return;
		}

		if ($("#_rememberUser").is(':checked')) {
			$.cookie('_rememberUser', true, {
				expires : 7
			});
			$.cookie('keyWord', $.trim($("#keyWord").val()), {
				expires : 7
			});
			$.cookie('password', $.trim($("#password").val()), {
				expires : 7
			});
		} else {
			$.cookie('_rememberUser', false, {
				expires : -1
			});
			$.cookie('keyWord', '', {
				expires : -1
			});
			$.cookie('password', '', {
				expires : -1
			});
		}

		var keyColumn = '_nikename';
		if (is_Mobile($.trim($("#keyWord").val()))) {
			keyColumn = '_mobile';
		}
		$.ajax({
			type : "POST",
			url : "sellersys/login.do",
			data : {
				keyColumn : keyColumn,
				keyWord : $.trim($("#keyWord").val()),
				password : $.trim($("#password").val())
			},
			datatype : "json",
			success : function(data) {
				if ('error' == data) {
					alert("用户名或密码错误");
					$('#kaptchaImage').trigger("click");
				}
				if ('fail' == data) {
					alert("登录失败");
					$('#kaptchaImage').trigger("click");
				}
				if ('success' == data) {
					loading('正在登录，请稍等...');
					window.setTimeout(function() {
						location.href = "index.html";
					}, 1000);
				}
				if ('codeerror' == data) {
					alert("请输入正确的验证码");
					$('#kaptchaImage').trigger("click");
				}
			},
			error : function() {
				alert("登录失败");
				$('#kaptchaImage').trigger("click");
			}
		});
	});

	$("#_awayreg").click(function() {
		location.href = "sellersys/getIntoregPage.do";
	});

});

function inputTipText() {
	$("input[class*=graytips]").each(function() {
		var oldVal = $(this).val();
		$(this).css({
			"color" : "#888"
		}).focus(function() {
			if ($(this).val() != oldVal) {
				$(this).css({
					"color" : "#000"
				});
			} else {
				$(this).val("").css({
					"color" : "#888"
				});
			}
		}).blur(function() {
			if ($(this).val() == "") {
				$(this).val(oldVal).css({
					"color" : "#888"
				});
			}
		}).keydown(function() {
			$(this).css({
				"color" : "#000"
			});
		})
	})
}

function creartKaptchaImage() {
	$("#kaptchaImage,#vercode").css("vertical-align", "middle");
	$('#kaptchaImage').click(
			function() {
				$(this).attr('src',
						'validate.code?' + Math.floor(Math.random() * 100));
			}).css({"width" : "74","height": "31"});
}

/** *验证手机号码** */
function is_Mobile(kw) {
	var r = /^\+?[1-9][0-9]*$/;
	return (r.test($.trim(kw)));
}
function rememberUser() {
	if ($("_rememberUser").attr('checked') == true) {
		$.cookie('_rememberUser', 'true', {
			expires : 7
		});
		$.cookie('keyWord', $.trim($("#keyWord").val()), {
			expires : 7
		});
		$.cookie('password', $.trim($("#password").val()), {
			expires : 7
		});
	} else {
		$.cookie('_rememberUser', false, {
			expires : -1
		});
		$.cookie('keyWord', '', {
			expires : -1
		});
		$.cookie('password', '', {
			expires : -1
		});
	}
}
function isRememberUser() {
	if ($.cookie('_rememberUser') == 'true') {
		$("#_rememberUser").attr('checked', true);
		$.trim($("#keyWord").val($.cookie('keyWord')));
		$.trim($("#password").val($.cookie('password')));
	}
}

function goMP() {
	if ((navigator.userAgent
			.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		return false;
	} else {
		return true;
	}
}
