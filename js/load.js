var userurlpath = $.cookie('userurl');
console.log(userurlpath);

var xmlhttp;
if (window.XMLHttpRequest) {
	//code for IE7/chrome/firefox/safari...
	xmlhttp = new XMLHttpRequest()
} else {
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
}

// loadLog方法
loadLog = function() {
	if (xmlhttp != null) {
		url = userurlpath + "?method=loadlog";
		xmlhttp.open("GET", url, true);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var value = JSON.parse(xmlhttp.responseText);
				for (var i = 0; i < value.length; i++) {
					createLog(value[i]);
				}
			}
			if (xmlhttp.status == 404 || xmlhttp.status == 500) {
				alert("加载日志失败");
			}
		}
		xmlhttp.send();
	}
}

function createLog(data) {
	var tr_log = document.createElement("tr");
	tr_log.className = "tr_log";
	
	var td1 = document.createElement("td")
	td1.className = "td1"
	td1.innerHTML = data.logdate;
	
	var td2 = document.createElement("td")
	td2.className = "td2"
	td2.innerHTML = data.loguserid;
	
	var td3 = document.createElement("td")
	td3.className = "td3"
	td3.innerHTML = data.logmethod;
	
	var td4 = document.createElement("td")
	td4.className = "td4"
	td4.innerHTML = data.logthing;
	
	var td5 = document.createElement("td")
	td5.className = "td5"
	td5.innerHTML = data.logdata;
	
	var td6 = document.createElement("td")
	td6.className = "td6"
	td6.innerHTML = data.logresult;


	$(".logtr")[0].insertAdjacentElement("afterEnd",tr_log);
	$(".tr_log")[0].insertAdjacentElement("afterBegin",td6);
	$(".tr_log")[0].insertAdjacentElement("afterBegin",td5);
	$(".tr_log")[0].insertAdjacentElement("afterBegin",td4);
	$(".tr_log")[0].insertAdjacentElement("afterBegin",td3);
	$(".tr_log")[0].insertAdjacentElement("afterBegin",td2);
	$(".tr_log")[0].insertAdjacentElement("afterBegin",td1);
	// document.getElementsByClassName("+")[0]
	// 	.insertAdjacentElement("beforeBegin", a_nav)
}
