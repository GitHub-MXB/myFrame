//通用
function ready(fn) {
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function () {
            document.removeEventListener("DOMContentLoaded", arguments.callee, false);
            fn();
        }, false);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState == 'complete') {
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

var dom_extend = {
    getDom: function (class_name) {
        return this.getElementsByClassName(class_name);
    },
    getCss: function (css) { //返回真实样式,需要优化
        if (getComputedStyle) {
            return getComputedStyle(this, false)[css];
        } else {
            return element.currentStyle[css];
        }
        //    return (getComputedStyle ? getComputedStyle(this, null) : element.currentStyle)[css];
        // if (arguments.length == 1)
        //     return a;
        // this.style.css = arguments[1];
    },
    getStyle: function () {
        if (getComputedStyle) {
            return getComputedStyle(this, false); //ie9+
        } else {
            return this.currentStyle;
        }
    }
};
if (window.HTMLElement) {
    forEach(window.dom_extend, function (value, key) {
        HTMLElement.prototype[key] = value;
    });
}

function dom(dom, cls) {
    function dom_extend_fn(dom) {
        forEach(window.dom_extend, function (value, key) {
            dom[key] = value;
        });
        return dom;
    }
    if (dom.getElementsByClassName)
        return dom.getElementsByClassName(cls);
    var ret = [];
    forEach(dom.getElementsByTagName('*'), function (value, index) {
        if (isClass(value, cls)) {
            dom_extend_fn(value);
            ret.push(value);
        }
    });
    return ret;
}

function isClass(dom, str) {
    return (" " + dom.className + " ").indexOf(" " + str + "") >= 0;
}

function forEach(obj, fn, index, key, exit) {
    if (obj == undefined) return;
    if (obj.length >= 0) {
        for (key = index || 0, len = obj.length; key < len; key++) {
            exit = fn.call(obj, obj[key], key);
            if (exit != undefined) {
                return exit;
            }
        }

    } else {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn.call(obj, obj[key], key);
            }
        }
    }
}