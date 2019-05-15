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
var eventAll = {}; //事件核心,向其添加函数即可
var event = function (str) {
    return String(str);
};

function key(event, className, fun) {
    eventAll[event] = eventAll[event] || {};
    eventAll[event][className] = eventAll[event][className] || [];
    eventAll[event][className].push(function (e, parentsClass, This) {
        if (parentsClass.indexOf(className.toLowerCase()) > -1) {
            fun(e.target, This, e);
        }
    });
}
String.prototype.on = function (event, fn) {
    key(event, this.toString(), fn);
};
String.prototype.classNameArr = function () {
    return this.toLowerCase().split(" ");
};
Element.prototype.classNameArr = function () {
    return this.className.toLowerCase().split(" ");
};

function iniEvent() {
    console.time("iniEvent");
    forEach(eventAll, function (value, key) {
        document.addEventListener(key, function (e, target, parentsClass) {
            target = e.target;
            parentsClass = target.parentsClass();
            forEach(value, function (value, key) {
                forEach(value, function (value) {
                    value(e, parentsClass, target.parents().This(key));
                });
            });
        });
    });
    console.timeEnd("iniEvent");
}
// Element.prototype.data = {};
Array.prototype.This = function (str) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i].classNameArr().indexOf(str) > -1) {
            return this[i];
        }
    }
};
Element.prototype.isClass = function (str) {
    return (" " + this.className).indexOf(" " + str) >= 0;
};

// Element.prototype.index = -1;
Element.prototype.parents = function () {
    return parents(this, [this]);

    function parents(dom, arr) {
        node = dom.parentNode;
        if (!node) {
            return [];
        }
        if (node == document.body) {
            return arr;
        }
        arr.push(node);
        return parents(node, arr);
    }
};

Element.prototype.parentsClass = function () { //返回所有父元素的class ，.li.content都返回
    return parentsClass(this, this.classNameArr());

    function parentsClass(dom, arr, str) {
        node = dom.parentNode;
        //获取this
        if (node instanceof String) {
            return parentsClass(node, arr.concat(name.classNameArr()));
        } else {
            return arr;
        }
    }
};
//次要的
Element.prototype.addClass = function (str) { //仅限一个
    var dom = this;
    forEach(str.classNameArr(), function (value, key) {
        if (!dom.isClass(value))
            dom.className += " " + value;
    });
};
Element.prototype.removeClass = function (str) { //仅限一个
    var dom = this;
    var name = dom.className;
    forEach(str.classNameArr(), function (value) {
        dom.className = name.replace(RegExp("\(\?\:\^\|\\s\)" + value + "\\b"), "");
    });
};
// Element.prototype.deP = function (key, value) { //defineProperty
//     if (!this.hasOwnProperty('data')) {
//         this.data = {};
//     }
//     if (!this.data.hasOwnProperty(key)) {
//         this.data[key] = {};
//     }
//     this.data[key] = value;
//     fn = dataFn[key][value];
//     if (typeof fun == "function") {
//         fn(this, key);
//     }
// };
//其他的
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
};
Element.prototype.getStyle = function () {
    if (getComputedStyle) {
        return getComputedStyle(this, false); //ie9+
    } else {
        return this.currentStyle;
    }
};
Element.prototype.setCss = function (css, value) {
    this.style[css] = value;
};

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