//框架主体
//用时，即赋值时就完成处理，赋值一次只处理一个，不要取的时候处理
var data = {};
var data_dom = {};
var dom_data = {};
var update_list = [];
Object.prototype.setData = function (fn) {
    fn.call(this);
    this.data_type(this, this._addr[0]);
    update_list.push(this);
};
Object.prototype.data_type = function (value, addr, _addr) {
    _addr = this;
    forEach(value, function (value, key) {
        if (String(key).charAt(0) == "_") {
            return;
        }
        if (value === null || undefined) {
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
                this.data_type(value, addr[key]);
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

function updata(node, dom_data, data_dom, attr, text) {
    attr = node.attributes;
    text = node.childNodes;
    forEach(dom_data.attr, function (value, key) {
        attr[key].nodeValue = getData(value, data_dom);
    });
    forEach(dom_data.text, function (value, key) {
        text[key].nodeValue = getData(value, data_dom);
    });

}

function setData(fn, data_dom, arr, dom) { //设置值到dom
    fn.call(data);
    forEach(update_list, function (value, key) { //这里更新dom，即update_list
        data_dom = value._addr[0];
        console.log(value._addr[1]);
        arr = node_array(window.dom(document.body, value._addr[2])[0], []);
        console.time("updata");
        forEach(value._addr[1], function (value, key) {
            updata(arr[key], value, data_dom);
        });
        console.timeEnd("updata");
    });
    update_list = [];
}

function getData(str, obj) { //将{模板}提取并替换
    str = str.replace(/{([^}]+)}/g, function (a, str) { //加一个判断是否
        return str_obj(str, obj);
    });
    return str;
}

function str_obj(str, obj) { //字符转对象
    if (str && obj) {
        forEach(str.split("."), function (value, key) {
            obj = obj[value] || "";
        });
    }
    return obj;
}

function node_array(dom, arr) { //获取节点的数组
    if (!dom)
        return;
    arr = [dom];
    forEach(dom.getElementsByTagName("*"), function (value, key) {
        arr.push(value);
    });
    return arr;
}

function React(arr, This, This2, str) { //获取dom的信息
    forEach(dom_data, function (value, key, arr) {
        This = value;
        forEach(node_array(dom(document.body, key)[0]), function (value, key, str) {
            This[key] = {};
            This2 = This[key];
            This2.attr = {};
            This2.text = {};
            forEach(value.attributes, function (value, key) {
                //value.nodeValue;
                //遍历完， 转移class和mould
                str = value.nodeValue + ""; //ie迷之错误,||出错
                if (str.indexOf("{") >= 0) {
                    This2.attr[value.nodeName] = str;
                }
            });
            forEach(value.childNodes, function (value, key) {
                if (value.nodeType == 3) {
                    str = value.nodeValue + "";
                    if (str.indexOf("{") >= 0) {
                        This2.text[key] = str;
                    }
                }
            });
            str = This2.attr.mould;
            if (str) {
                This2.mould = str;
                delete This2.attr.mould;
            }
            str = This2.attr['for'];
            if (str) {
                This2['for'] = str;
                delete This2.attr['for'];
            }
        });
    });
}