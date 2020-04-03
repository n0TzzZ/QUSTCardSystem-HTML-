var cardurlpath = $.cookie('cardurl');
console.log(cardurlpath);

var xmlhttp;
if (window.XMLHttpRequest) {
	//code for IE7/chrome/firefox/safari...
	xmlhttp = new XMLHttpRequest()
} else {
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
}

// 创建卡
function createcard() {
	var userid = $.cookie('userid');
	var cardid = $('#cardid').val();
	var stuname = $('#stuname').val();
	var stuid = $('#stuid').val();

	var url = cardurlpath + "?method=creatCard&userid=" + userid + "&cardusername=" + stuname + "&carduserid=" + stuid +
		"&cardid=" + cardid;
	if (xmlhttp != null) {
		xmlhttp.open("GET", url, true)
		xmlhttp.onreadystatechange = function(msg) {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				console.log("连接服务器成功");
				if (xmlhttp.responseText == "true") {
					$('#formhint').text("创建卡成功")
				} else {
					$('#formhint').text("创建卡失败,请检查填写信息是否正确");
				}

			}
		}
		xmlhttp.send();
	}
}

// 注销卡
function deletecard() {
	var userid = $.cookie('userid');
	var cardid = $('#cardid').val();
	var recardid = $('#recardid').val();

	var url = cardurlpath + "?method=deleteCard&userid=" + userid +
		"&cardid=" + cardid;

	if (checkcardid() == 1) {
		if (xmlhttp != null) {
			xmlhttp.open("GET", url, true)
			xmlhttp.onreadystatechange = function(msg) {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					console.log("连接服务器成功");
					if (xmlhttp.responseText == "true") {
						$('#formhint').text("注销卡成功")
					} else {
						$('#formhint').text("注销卡失败,请检查填写信息是否正确");
					}

				}
			}
			xmlhttp.send();
		}
	}
}

// 检查两次输入
function checkcardid() {
	var cardid = $('#cardid').val();
	var recardid = $('#recardid').val();
	if (cardid == recardid) {
		$('#formhint').text(" ");
		return 1;
	} else {
		$('#formhint').text("两次输入不一致！");
		return 2;
	}
}

// 检查两次输入
function checkmoney() {
	var money = $('#money').val();
	var remoney = $('#remoney').val();
	if (money == remoney) {
		$('#formhint').text(" ");
		return 1;
	} else {
		$('#formhint').text("两次输入不一致！");
		return 2;
	}
}

// 充值卡
function rechargecard() {
	var userid = $.cookie('userid');
	var cardid = $('#cardid').val();
	var rechargenum = $('#money').val();

	var url = cardurlpath + "?method=rechargeCard&userid=" + userid + "&cardid=" + cardid + "&rechargenum=" + rechargenum;

	if (checkmoney() == 1) {
		if (xmlhttp != null) {
			xmlhttp.open("GET", url, true)
			xmlhttp.onreadystatechange = function(msg) {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					console.log("连接服务器成功");
					if (xmlhttp.responseText != "false") {
						$('#formhint').text("充值卡成功，余额为："+xmlhttp.responseText);
					} else {
						$('#formhint').text("充值卡失败,请检查填写信息是否正确");
					}

				}
			}
			xmlhttp.send();
		}
	}
}