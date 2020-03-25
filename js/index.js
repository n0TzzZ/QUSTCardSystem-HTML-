onload = function() {
    var oList = document.querySelectorAll('.list h2'),
        oHide = document.querySelectorAll('.hide'),
        oIcon = document.querySelectorAll('.list i'),
        lastIndex = 0;
    for (var i = 0; i < oList.length; i++) {
        oList[i].index = i; //自定义属性
        oList[i].isClick = false;
        oList[i].initHeight = oHide[i].clientHeight;
        oHide[i].style.height = '0';
        oList[i].onclick = function() {
            if (this.isClick) {
                oHide[this.index].style.height = '0';
                oIcon[this.index].className = '';
                oList[this.index].className = '';
                oList[this.index].isClick = false;
            } else {
                oHide[lastIndex].style.height = '0';
                oIcon[lastIndex].className = '';
                oList[lastIndex].className = '';
                oHide[this.index].style.height = '150px';
                oIcon[this.index].className = 'on';
                oList[this.index].className = 'on';
                oList[lastIndex].isClick = false;
                oList[this.index].isClick = true;
                lastIndex = this.index;
            }
        }
    }
}


function check(form) {
    var accountName = $("#accountName"),
        password = $("#password");
    var accountName = accountName.val(),
        password = $password.val();
    if (!accountName || accountName == "") {
        showMsg("请输入用户名");
        form.accountName.focus();
        return false;
    }
    if (!password || password == "") {
        showMsg("请输入密码");
        form.password.focus();
        return false;
    }
    //这里为用ajax获取用户信息并进行验证，如果账户密码不匹配则登录失败，如不需要验证用户信息，这段可不写
    $.ajax({
        url: systemURL, // 获取自己系统后台用户信息接口
        data: { "password": password, "accountName": accountName },
        type: "GET",
        dataType: "json",
        success: function(data) {
            if (data) {
                if (data.code == "123456") { //判断返回值，这里根据的业务内容可做调整
                    setTimeout(function() { //做延时以便显示登录状态值
                        showMsg("正在登录中...");
                        console.log(data);
                        window.location.href = url; //指向登录的页面地址
                    }, 100)
                } else {
                    showMsg(data.message); //显示登录失败的原因
                    return false;
                }
            }
        },
        error: function(data) {
            showMsg(data.message);
        }
    });
}

//错误信息提醒
function showMsg(msg) {
    $("#CheckMsg").text(msg);
}


//监听回车键提交
$(function() {
    document.onkeydown = keyDownSearch;

    function keyDownSearch(e) {
        // 兼容FF和IE和Opera
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            $('#submit').click(); //具体处理函数
            return false;
        }
        return true;
    }
});

function logout() {
    localStorage.removeItem("username");
    //刷新部分
    load_data();
}

function load_data() {
    var theme = localStorage.getItem("username");
    if (theme == null || theme == "") {
        $("#cue").show();
        $("#uname").html('');
    } else {
        $("#cue").hide();
        $("#uname").html(theme);
    }
}