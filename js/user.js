var urlpath = 'http://localhost:8080/QCSWebServer/UserServlet';
var xmlhttp;
if (window.XMLHttpRequest) {
    //code for IE7/chrome/firefox/safari...
    xmlhttp = new XMLHttpRequest()
} else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
}
document.onkeyup = function (e) {
    if (window.event)//如果window.event对象存在，就以此事件对象为准
        e = window.event;
    var code = e.charCode || e.keyCode;
    if (code == 13) {
        $('.submit').click();
    }
}

function login() {
    $.cookie('userid', null, {expires: 7, path: '/'});
    $.cookie('loginstats', null, {expires: 7, path: '/'});
    $.cookie('username', null, {expires: 7, path: '/'});
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
                    console.log("连接服务器成功")
                    if (xmlhttp.responseText == "usernamefalse") {
                        $('#loginhint').text("登陆失败，用户名不存在")
                    } else if (xmlhttp.responseText == "pwdfalse") {
                        $('#loginhint').text("登陆失败，密码错误")
                    } else {
                        $('.submit p').text('登陆成功');
                        userid = xmlhttp.responseText;
                        $.cookie('userid', userid, {expires: 7, path: '/'});
                        $.cookie('loginstats', 'isLogin', {expires: 7, path: '/'});
                        getusername();
                        $(this).toggleClass('active');
                        setTimeout(
                            () => {
                                $('#loginhint').text("欢迎你，" + $.cookie('username'));
                            }, 500
                        );
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
    $.cookie('userid', null, {expires: 7, path: '/'});
    $.cookie('loginstats', null, {expires: 7, path: '/'});
    $.cookie('username', null, {expires: 7, path: '/'});
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
            var url = urlpath + "?method=regist&userid=" + userid + "&username=" + username + "&userpwd=" + userpwd + "&registdate=" + registdate;
            if (xmlhttp != null) {
                xmlhttp.open("GET", url, true)
                xmlhttp.onreadystatechange = function (msg) {
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

function getusername() {
    var userid = $.cookie('userid');
    console.log(userid);
    var url = urlpath + "?method=getusername&userid=" + userid;
    if (xmlhttp != null) {
        xmlhttp.open("GET", url, true)
        xmlhttp.onreadystatechange = function (msg) {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log("连接服务器成功");
                var username = xmlhttp.responseText;
                $.cookie('username', username, {expires: 7, path: '/'});
            }
        }
        xmlhttp.send();
    }
}