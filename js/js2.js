function ready(fn) {
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function () {
            document.removeEventListener("DOMContentLoaded", arguments.callee, false);
            fn && fn();
        }, false);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState == 'complete') {
                // complete  interactive
                document.detachEvent('onreadystatechange', arguments.callee);
                fn && fn(); //函数执行
            }
        });
    }
}

function Ajax(method, url, data, fun) { //不管跨域，可优化
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    (method == 'GET') ? url = url + '?' + data: null; //路径与数据分开
    xhr.open(method, url, true); //默认是异步true
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
    xhr.onreadystatechange = function () { //异步获取的
        (xhr.readyState == 4 && xhr.status == 200) ? fun(xhr.responseText): null;
    }
}

function forEach(obj, fn, index) {
    if (obj.length >= 0) {
        for (var key = index || 0, len = obj.length; key < len; key++)
            fn(obj[key], key);
    } else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(obj[key], key);
            }
        }
    }
}

function dom(str) {
    return document.getElementById(str);
}