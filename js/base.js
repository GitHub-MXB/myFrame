//通用
var old_browser = !document.getElementsByClassName;
var new_browser = !old_browser;
console.log("new_browser:", new_browser);

function ready(fn) {
    if (new_browser) {
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

function Ajax(method, url, data, fun, xhr) { //不管跨域，可优化
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
            fun(xhr);
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
if (new_browser) {
    forEach(dom_extend, function (value, key) {
        HTMLElement.prototype[key] = value;
    });
}

function dom(node, cls) {
    return node_filter(getElements(node), cls);
}

function dom_extend_fn(node) { //ie9-添加原型函数
    forEach(dom_extend, function (value, key) {
        node[key] = value;
    });
    return node;
}

function node_filter(node_arr, cls, array) {
    array = [];
    forEach(node_arr, function (value, index) {
        if (isClass(value, cls)) {
            array.push(value);
        }
    });
    return array;
}

function getElements(node, array) {
    array = [node]; //[ret]迷之错误
    forEach(node.getElementsByTagName('*'), function (value, key) {
        if (old_browser)
            dom_extend_fn(value);
        array.push(value);
    });
    return array;
}

function isClass(node, str) {
    return (" " + node.className + " ").indexOf(" " + str + " ") >= 0;
}

function forEach(object, fn, index, key, len, exit) {
    if (object == undefined) return;
    if (object.length >= 0 || typeof object == "number") {
        for (key = index || 0, len = object.length || object; key < len; key++) {
            exit = fn.call(object, object[key], key);
            if (exit != undefined) {
                return exit;
            }
        }
        return;
    }
    if (typeof object == "object") {
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                exit = fn.call(object, object[key], key);
                if (exit != undefined) {
                    return exit;
                }
            }
        }
    }
}
if (old_browser) {
    Array.prototype.indexOf = function (object) {
        return forEach(this, function (value, key) {
            if (value == object) {
                return key;
            }
        });
    };
}