class MyTools extends egret.Shape {

    public getDataXHR = function (url, cb, param = null, contenttype = null) {
        var param = param || {};
        var type = param.type || "get";
        var data = param.data || null;
        try {
            var xhr = new XMLHttpRequest();
            xhr.open(type, url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {

                    var responseData = JSON.parse(xhr.responseText);
                    if (responseData.c < 0) {
                        // toastMsg(responseData.m);
                        return
                    }
                    if (xhr.responseText == "error") {
                        alert("请求" + url + "返回error");
                        return
                    }
                    cb && cb(responseData);
                }
            };
            if (contenttype) {
                try {
                    xhr.setRequestHeader("Content-Type", contenttype)
                } catch (e) {
                    alert(e)
                }
            }
            xhr.send(data)
        } catch (e) {
            console.error("xhr出错", e);
            return false
        }
    }
}