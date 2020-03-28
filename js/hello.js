function hello() {
    now = new Date(), hour = now.getHours()
    if (hour < 6) {
        document.getElementById("hellotext").innerHTML = "凌晨好！";
    } else if (hour < 9) {
        document.getElementById("hellotext").innerHTML = "早上好！"
    } else if (hour < 12) {
        document.getElementById("hellotext").innerHTML = "上午好！"
    } else if (hour < 14) {
        document.getElementById("hellotext").innerHTML = "中午好！"
    } else if (hour < 17) {
        document.getElementById("hellotext").innerHTML = "下午好！"
    } else if (hour < 19) {
        document.getElementById("hellotext").innerHTML = "傍晚好！"
    } else if (hour < 22) {
        document.getElementById("hellotext").innerHTML = "晚上好！"
    } else {
        document.getElementById("hellotext").innerHTML = "夜里好！"
    }
}
