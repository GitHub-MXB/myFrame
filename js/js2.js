function ready(fn) {
    document.addEventListener("DOMContentLoaded", function () {
        document.removeEventListener("DOMContentLoaded", arguments.callee, false);
        fn();
    }, false);
    document.attachEvent('onreadystatechange', function () {
        if (document.readyState == 'complete') {
            document.detachEvent('onreadystatechange', arguments.callee);
            fn(); //函数执行
        }
    });
}

function Ajax(method, url, data, fun) { //不管跨域
    xhr = new XMLHttpRequest();
    (method == 'GET') ? url = url + '?' + data: null; //路径与数据分开
    xhr.open(method, url, true); //默认是异步true
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
    xhr.onreadystatechange = function () { //异步获取的
        (xhr.readyState == 4 && xhr.status == 200) ? fun(xhr.responseText): null;
    }
}
var eventAll = {}; //事件核心,向其添加函数即可
$ = event = function (str) {
    return String(str);
}

function on(event, className, fun) {
    if (!eventAll[event])
        eventAll[event] = {};
    if (!eventAll[event][className]) {
        eventAll[event][className] = [];
    }
    eventAll[event][className].push(function (e, parentsClass, This) {
        if (parentsClass.indexOf(className.toLowerCase()) > -1) {
            fun(e.target, This, e);
        }
    });
}
String.prototype.on = function (event, fun) {
    on(event, this.toString(), fun);
}
String.prototype.classNameArr = function () {
    return this.toLowerCase().split(" ");
}
Element.prototype.classNameArr = function () {
    return this.className.toLowerCase().split(" ");
}

function map(num, fn) { //数据映射
    return fn(num);
}

function iniEvent() {
    for (var i = 0, keys = Object.keys(eventAll), len = keys.length; i < len; i++)
        inievent(keys[i]);
}

function inievent(on) {
    document.addEventListener(on, function (e) {
        var target = e.target;
        var parentsClass = target.parentsClass();
        for (var i = 0, keys = Object.keys(eventAll[on]), len = keys.length; i < len; i++) {
            forEach(eventAll[on][keys[i]], function (j, fn) {
                fn(e, parentsClass, target.parents().This(keys[i]));
            })
        }
    });
}

function getDom(class_name) {
    return document.getElementsByClassName(class_name);
}
// Element.prototype.data = {};
Element.prototype.getDom = function (class_name) {
    return this.getElementsByClassName(class_name);
}
Element.prototype.addClass = function (str) { //仅限一个
    var dom = this;
    forEach(str.classNameArr(), function (i, a) {
        if (!dom.isClass(a))
            dom.className += " " + a;
    })
}
Array.prototype.This = function (str) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i].classNameArr().indexOf(str) > -1) {
            return this[i];
        }
    }
}
Element.prototype.removeClass = function (str) { //仅限一个
    var dom = this;
    var name = dom.className;
    forEach(str.classNameArr(), function (i, a) {
        dom.className = name.replace(RegExp("\(\?\:\^\|\\s\)" + a + "\\b"), "");
    });
}
Element.prototype.isClass = function (str) {
    return this.className.search("\(\?\:\^\|\\s)" + str + "\\b") >= 0;
}
Element.prototype.getCss = function (css) { //返回真实样式,需要优化
    if (getComputedStyle) {
        return getComputedStyle(this, false)[css];
    } else {
        return element.currentStyle[css];
    }
    //    return (getComputedStyle ? getComputedStyle(this, null) : element.currentStyle)[css];
    // if (arguments.length == 1)
    //     return a;
    // this.style.css = arguments[1];
}
Element.prototype.getStyle = function () {
    if (getComputedStyle) {
        return getComputedStyle(this, false); //ie9+
    } else {
        return this.currentStyle;
    }
}
Element.prototype.setCss = function (css, value) {
    this.style[css] = value;
}
Element.prototype.indexOf = function () {
    [].indexOf.call(this.parentElement.children, this);
}
Element.prototype.index = -1;
Element.prototype.parents = function () {
    function parents(dom, arr) {
        node = dom.parentNode;
        if (node = dom.parentNode) {

        } else {
            return [];
        }
        if (node == document.body) {
            return arr;
        }
        arr.push(node);
        return parents(node, arr);
    }
    return parents(this, [this]);
}

Element.prototype.parentsClass = function () { //返回所有父元素的class ，.li.content都返回
    function parentsClass(dom, arr, str) {
        node = dom.parentNode;
        //获取this
        if (name = node.className) {
            return parentsClass(node, arr.concat(name.classNameArr()));
        } else {
            return arr;
        }
    }
    return parentsClass(this, this.classNameArr());
}
Element.prototype.deP = function (key, value) { //defineProperty
    if (!this.hasOwnProperty('data')) {
        this.data = {};
    }
    if (!this.data.hasOwnProperty(key)) {
        this.data[key] = {};
    }

    this.data[key] = value;
    fn = dataFn[key][value];
    if (isFunction(fn)) {
        fn(this, key);
    }
}

function isFunction(fun) {
    return typeof fun === "function";
}

function index(parent, dom) {
    return [].indexOf.call(parent, dom);
}

function addTab(tab, content) {
    getEl(tab)[0].onclick = function (event) {
        event.stopPropagation();
        alert(
            [].indexOf.call(this.getEl(tab)[0].children, event.target)
        );
    };
}

function forEach(obj, fun) {
    for (var i = 0, len = obj.length; i < len; i++)
        fun(i, obj[i]);
}
String.prototype.to_num = function () {
    return Number(this.match(/\d+/));
}

function getRatio(key) {
    switch (key) {
        // case 20:
        //     return 1 / 1;
        case 21:
            return 3 / 4;
        case 22:
            return 2 / 3;
        case 23:
            return 9 / 16;
        default:
            return 1 / 1;
    }
}

function img_auto(ratio, dom) {
    var style = dom.getStyle();
    img_h = parseFloat(style.height); //图片真实高度
    img_w = parseFloat(style.width);
    ratio = getRatio(ratio); //图片目标比率
    img_ratio = img_h / img_w; //图片实际比率
    if (ratio < img_ratio) {
        a = (img_w - img_w / img_ratio) / 2;
        dom.setCss("padding", 0 + "px " + a + "px");
    } else {
        b = (img_w * ratio - img_h) / 2;
        dom.setCss("padding", b + "px " + 0 + "px");
    }
}
//console.log(document.styleSheets[1].cssRules[0].style.fontSize)
//直接操作css样式表