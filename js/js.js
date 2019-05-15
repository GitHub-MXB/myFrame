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
    isClass: function (str) {
        return (" " + this.className).indexOf(" " + str) >= 0;
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
//框架主体
//用时，即赋值时就完成处理，赋值一次只处理一个，不要取的时候处理
data = {};
data_dom = {};
dom_data = {};
var domArr = [];
Object.prototype.setData = function (fn) {
    fn.call(this);
    this.setData1(this, this._addr[0]);
    domArr.push(this);
};
Object.prototype.setData1 = function (value, addr, _addr) {
    _addr = this;
    forEach(value, function (value, key) {
        if (String(key).charAt(0) == "_") {
            return;
        }
        if (value === null) {
            addr[key] = "";
            return;
        }
        switch (typeof value) {
            case "object":
                if (value instanceof Array) {
                    addr[key] = value;
                    break;
                }
                addr[key] = {};
                this.setData1(value, addr[key]);
                break;
            case "boolean":
                addr[key] = value ? key : "";
                break;
            case "function":
                addr[key] = value.call(_addr);
                break;
            default:
                addr[key] = value;
                break;
        }
    });
};

function Vue(obj) { //创建初始数据
    data[obj.el] = obj.data;
    data_dom[obj.el] = {};
    dom_data[obj.el] = dom_data[obj.el] || {};
    data[obj.el]._addr = [data_dom[obj.el], dom_data[obj.el], obj.el];
    setData(function () {});
}

function setData(fn, data_dom, dom_data, dom, attr, text, str) { //设置值到dom
    fn.call(data);
    forEach(domArr, function (value, key) { //这里更新dom，即domArr
        data_dom = value._addr[0];
        dom_data = value._addr[1];
        dom = window.dom(document.body, value._addr[2])[0];
        forEach(dom_data, function (value, key) {
            attr = dom.attributes;
            text = dom.childNodes;
            forEach(value.attr, function (value, key) {
                str = getData(value, data_dom);
                if (attr[key].nodeValue != str) {
                    attr[key].nodeValue = str;
                }
            });
            forEach(value.text, function (value, key) {
                str = getData(value, data_dom);
                if (text[key].nodeValue != str) {
                    text[key].nodeValue = str;
                }
            });
            str = value['class'];
            if (str) {
                str = getData(str, data_dom);
                if (dom.className != str) {
                    dom.className = str;
                }
            }
        });
    });
    domArr = [];
}

function getData(obj, c) { //将a.b这种的替换成实际值
    return obj.replace(/{([^}]+)}/g, function (a, b) { //   
        if (b && c) {
            forEach(b.split("."), function (value, key) {
                c = c[value] || "";
            });
        }
        return c;
    });
}

function React(arr, This, This2, str) { //获取dom的信息
    function node_array(dom, arr) { //获取节点的数组
        function allNode(node, arr) {
            if (node.attributes.mould) {
                return;
            }
            forEach(node.children, function (value, key) {
                arr.push(value);
                allNode(value, arr);
            });
        }
        if (!dom)
            return;
        arr = [dom];
        allNode(dom, arr);
        return arr;
    }
    forEach(dom_data, function (value, key) {
        This = value;
        arr = node_array(dom(document.body, key)[0]);
        forEach(arr, function (value, key) {
            This[key] = {};
            This2 = This[key];
            This2.attr = {};
            forEach(value.attributes, function (value, key) {
                // value.nodeValue;
                //遍历完，转移class和mould
                str = value.nodeValue + ""; //ie迷之错误,||出错
                if (str.indexOf("{") >= 0) {
                    This2.attr[value.nodeName] = str;
                }
            });
            This2.text = {};
            forEach(value.childNodes, function (value, key) {
                if (value.nodeType == 3) {
                    str = value.nodeValue + "";
                    if (str.indexOf("{") >= 0) {
                        This2.text[key] = str;
                    }
                }
            });
            str = This2.attr['class'];
            if (str) {
                This2['class'] = str;
                delete This2.attr['class'];
            }
            str = This2.attr.mould;
            if (str) {
                This2.mould = str;
                delete This2.attr.mould;
            }
        });
    });
}
//事件处理器