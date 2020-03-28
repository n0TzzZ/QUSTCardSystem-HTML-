var urlpath = '';
var xmlhttp;
if (window.XMLHttpRequest) {
    //code for IE7/chrome/firefox/safari...
    xmlhttp = new XMLHttpRequest()
} else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
}

function login() {
    var username = $("#username").val();
    var userpwd = $("#userpwd").val();
    if (username != null && userpwd != null) {
        console.log(username);
        console.log(userpwd);
        var url = urlpath + "?method=login&username=" + username + "&userpwd=" + userpwd;
        if (xmlhttp != null) {
            xmlhttp.open("GET", url, true)
            xmlhttp.onreadystatechange = function (msg) {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log("上传登陆数据成功")
                    if (xmlhttp.responseText == "usernamefalse") {
                        $('#loginhint').text("登陆失败，用户名不存在")
                    } else if (xmlhttp.responseText == "pwdfalse") {
                        $('#loginhint').text("登陆失败，密码错误")
                    } else {
                        userid = xmlhttp.responseText;
                        $.cookie('userid', userid, {expires: 7, path: '/'});
                        $.cookie('loginstats', 'isLogin', {expires: 7, path: '/'});
                        var username = getusername(userid);
                        $.cookie('username', username, {expires: 7, path: '/'});
                        $('.submit p').text('登陆成功');
                        $(this).toggleClass('active');
                    }
                }
            }
            xmlhttp.send();
        }
    } else {
        //    TO-DO
    }
}

function regist() {
    var userid = Math.floor(Math.random() * 9999999 + 1) + new Date().getDay() + new Date().getHours() + new Date().getMinutes();
    var username = $("#username").val();
    var userpwd = $("#userpwd").val();
    var reuserpwd = $("#reuserpwd").val();

    if (username != null && userpwd != null && reuserpwd != null) {
        if (checkpwd() == 1) {
            console.log('用户名：' + username);
            console.log('密码：' + userpwd);
            console.log('ID：' + userid);
            var url = urlpath + "?method=regist&userid=" + userid + "&username=" + username + "&userpwd=" + userpwd;
            if (xmlhttp != null) {
                xmlhttp.open("GET", url, true)
                xmlhttp.onreadystatechange = function (msg) {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        console.log("上传注册数据成功")
                        if (xmlhttp.responseText == "true") {
                            $('.submit p').text("注册成功")
                        } else if (xmlhttp.responseText == "false") {
                            $('#loginhint').text("注册失败")
                        }
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