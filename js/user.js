var userurlpath = $.cookie('userurl');
console.log(userurlpath)
var xmlhttp;
if (window.XMLHttpRequest) {
	//code for IE7/chrome/firefox/safari...
	xmlhttp = new XMLHttpRequest()
} else {
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
}

document.onkeyup = function(e) {
	if (window.event) //如果window.event对象存在，就以此事件对象为准
		e = window.event;
	var code = e.charCode || e.keyCode;
	if (code == 13) {
		$('.submit').click();
	}
}

function login() {
	$.cookie('userid', null, {
		expires: 7,
		path: '/'
	});
	$.cookie('loginstats', null, {
		expires: 7,
		path: '/'
	});
	$.cookie('username', null, {
		expires: 7,
		path: '/'
	});
	var username = $("#username").val();
	var userpwd = $("#userpwd").val();
	if (username != null && userpwd != null) {
		console.log(username);
		console.log(userpwd);
		var url = userurlpath + "?method=login&username=" + username + "&userpwd=" + userpwd;
		if (xmlhttp != null) {
			xmlhttp.open("GET", url, true)
			xmlhttp.onreadystatechange = function(msg) {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					console.log("连接服务器成功");
					if (xmlhttp.responseText == "usernamefalse") {
						$('#loginhint').text("登陆失败，用户名不存在");
					} else if (xmlhttp.responseText == "pwdfalse") {
						$('#loginhint').text("登陆失败，密码错误");
					} else {
						
						if (xmlhttp.responseText != null) {
							$('.submit p').text('登陆成功');
							userid = xmlhttp.responseText;
							$.cookie('userid', userid, {
								expires: 7,
								path: '/'
							});
							$.cookie('loginstats', 'isLogin', {
								expires: 7,
								path: '/'
							});
							getusername();
							$(this).toggleClass('active');
							setTimeout(
								() => {
									$('#loginhint').text("欢迎你，" + $.cookie('username'));
								}, 200
							);
							setTimeout(
								() => {
									window.location.href = "./index.html";
								}, 500
							)
						}else{
							console.log(xmlhttp.responseText);
						}
					}
				}
				if (xmlhttp.status == 404 || xmlhttp.status == 500 || xmlhttp.status == 0) {
					$('#loginhint').text("服务器连接异常")
				}
			}
			xmlhttp.send();
		}
	}
}

function regist() {
	$.cookie('userid', null, {
		expires: 7,
		path: '/'
	});
	$.cookie('loginstats', null, {
		expires: 7,
		path: '/'
	});
	$.cookie('username', null, {
		expires: 7,
		path: '/'
	});
	var userid = Math.floor(Math.random() * 9999999 + 1) + new Date().getDay() + new Date().getHours() + new Date().getMinutes();
	var username = $("#username").val();
	var userpwd = $("#userpwd").val();
	var reuserpwd = $("#reuserpwd").val();
	var registdate = new Date().toLocaleDateString();

	if (username != null && userpwd != null && reuserpwd != null) {
		if (checkpwd() == 1) {
			console.log('用户名：' + username);
			console.log('密码：' + userpwd);
			console.log('ID：' + userid);
			console.log('注册时间：' + registdate);
			var url = userurlpath + "?method=regist&userid=" + userid + "&username=" + username + "&userpwd=" + userpwd +
				"&registdate=" + registdate;
			if (xmlhttp != null) {
				xmlhttp.open("GET", url, true)
				xmlhttp.onreadystatechange = function(msg) {
					console.log(xmlhttp.readyState);
					console.log(xmlhttp.status);
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						console.log("连接服务器成功")
						if (xmlhttp.responseText == "true") {
							$('.submit p').text("注册成功")
						} else if (xmlhttp.responseText == "false") {
							$('#loginhint').text("注册失败")
						} else if (xmlhttp.responseText == "usernamefalse") {
							$('#loginhint').text("用户名已被注册")
						}
					}
					if (xmlhttp.status == 404 || xmlhttp.status == 500 || xmlhttp.status == 0) {
						$('#loginhint').text("服务器连接异常")
					}
				}
				xmlhttp.send();
			}
		} else {
			$('#loginhint').text('两次密码输入不一致！')
		}
	} else {
		$('#loginhint').text('输入框不能为空！');
	}
}

function checkpwd() {
	var userpwd = $("#userpwd").val();
	var reuserpwd = $("#reuserpwd").val();
	if (userpwd == reuserpwd) {
		$('#loginhint').text(' ');
		return 1;
	} else {
		$('#loginhint').text('两次密码输入不一致');
		return 2;
	}
}

function checkuppwd() {
	var userpwd = $("#newpwd").val();
	var reuserpwd = $("#repwd").val();
	if (userpwd == reuserpwd) {
		$('#formhint').text(' ');
		return 1;
	} else {
		$('#formhint').text('两次密码输入不一致');
		return 2;
	}
}

function updatepwd() {
	var userid = $.cookie('userid');
	var oldpwd = $('#oldpwd').val();
	var newpwd = $('#newpwd').val();
	var repwd = $('#repwd').val();
	console.log(userid);
	if (oldpwd != '' && repwd != '') {
		console.log(userid);
		if (checkuppwd() == 1) {
			var url = userurlpath + "?method=updatepwd&userid=" + userid + "&oldpwd=" + oldpwd + "&newpwd=" + newpwd;
			if (xmlhttp != null) {
				xmlhttp.open("GET", url, true);
				console.log(xmlhttp.readyState);
				console.log(xmlhttp.status);
				xmlhttp.onreadystatechange = function(msg) {
					console.log(xmlhttp.readyState);
					console.log(xmlhttp.status);
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						console.log(xmlhttp.readyState);
						console.log(xmlhttp.status);
						console.log("连接服务器成功");
						if (xmlhttp.responseText == "true") {
							$('#formhint').text("修改密码成功")
							alert('修改密码成功，请重新登陆');
							$.cookie('userid', null, {
								expires: 7,
								path: '/'
							});
							$.cookie('loginstats', null, {
								expires: 7,
								path: '/'
							});
							$.cookie('username', null, {
								expires: 7,
								path: '/'
							});
							setTimeout(
								() => {
									window.open('../login.html', '_parent')
								}, 500
							)
						} else if (xmlhttp.responseText == "oldpwdfalse") {
							$('#formhint').text("旧密码错误")
						} else if (xmlhttp.responseText == "updatepwdfalse") {
							$('#formhint').text("修改密码异常")
						}
					}
				}
				xmlhttp.send();
			}
		}
	}

}

function getusername() {
	var userid = $.cookie('userid');
	console.log(userid);
	var url = userurlpath + "?method=getusername&userid=" + userid;
	if (xmlhttp != null) {
		xmlhttp.open("GET", url, true)
		xmlhttp.onreadystatechange = function(msg) {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				console.log("连接服务器成功");
				var username = xmlhttp.responseText;
				$.cookie('username', username, {
					expires: 7,
					path: '/'
				});
			}
		}
		xmlhttp.send();
	}
}

function quit() {
	$.cookie('userid', null, {
		expires: 7,
		path: '/'
	});
	$.cookie('loginstats', null, {
		expires: 7,
		path: '/'
	});
	$.cookie('username', null, {
		expires: 7,
		path: '/'
	});
	location.reload(true);

}
