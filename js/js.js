function ready(fn) {
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function () {
            document.removeEventListener("DOMContentLoaded", arguments.callee, false);
            fn();
        }, false);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState == 'complete') {
                // complete  interactive
                document.detachEvent('onreadystatechange', arguments.callee);
                fn(); //函数执行
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
    if (method == 'GET') { //路径与数据分开
        url = url + '?' + data;
    }
    xhr.open(method, url, true); //默认是异步true
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
    xhr.onreadystatechange = function () { //异步获取的
        if (xhr.readyState == 4 && xhr.status == 200) {
            fun(xhr.responseText);
        }
    };
}
window.getElementsByClassName = function (dom, cls) {
    var ret = [];
    forEach(dom.getElementsByTagName('*'), function (value, index) {
        if ((" " + value.className).indexOf(" " + cls) >= 0) {
            ret.push(value);
        }
    });
    return ret;
};

function forEach(obj, fn, index) {
    if (obj.length >= 0) {
        for (var key = index || 0, len = obj.length; key < len; key++)
            fn(obj[key], key);
    } else {
        for (var key1 in obj) {
            if (obj.hasOwnProperty(key1)) {
                fn(obj[key1], key1);
            }
        }
    }
}

function dom(str) {
    return document.getElementById(str);
}