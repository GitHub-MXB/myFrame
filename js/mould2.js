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

function setData(fn, data_dom, arr) { //设置值到dom
    fn.call(data);
    forEach(update_list, function (value, key) { //这里更新dom，即update_list
        data_dom = value._addr[0];
        arr = node_array(dom(document.body, value._addr[2])[0], []);
        forEach(value._addr[1], function (value, key) {
            updata(arr[key], value, data_dom);
        });
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
        return obj;
    }
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

function AST(data_node, array, node) {
    forEach(data, function (value, key) {
        data_node.push(key);
    });
    forEach(data_node, function (value, key) { //这个可以提前生成
        node = dom(document.body, value)[0];
        ast(node, array, 0, node);
    });

}

function AST2(data_node, ast_arr, array) {
    forEach(data_node, function (value, key) { //这个可以提前生成
        node = dom(document.body, value)[0];
        array.push([]);
        ast2(ast_arr[key], node, array[key]);
    });
}

function ast(node, array, index, end, obj, str_for) { //保存key与value的值，将来可优化，只保存node不能
    if (!node || node.nodeType != 1) return;
    obj = {};
    obj.addr = index; //仅这一个是动态的，json生成的是obj.addr = index;这个值避免地址是mould
    obj.len = 1;
    obj.attr = {};
    obj.text = {};
    obj.child = [];
    obj.data = {};
    forEach(node.attributes, function (value, key) {
        str = value.nodeValue + ""; //ie迷之错误,||出错
        if (str.indexOf("{") >= 0) {
            obj.attr[value.nodeName] = str;
        }
    });
    str_for = node.getAttribute('for');
    if (str_for) {
        obj['for'] = str_for;
    }
    forEach(node.childNodes, function (value, key) {
        if (value.nodeType == 3) {
            str = value.nodeValue + "";
            if (str.indexOf("{") >= 0) {
                obj.text[key] = str;
            }
        }
        if (value.nodeType == 1) {
            ast(value, obj.child, key);
        }
    });
    array.push(obj);
    if (node == end)
        ast(node.nextSibling, array);
}

function ast2(ast_arr, node, array, child, len) {
    len = array.length - 1;
    if (!ast_arr) return;
    ast_arr.addr = node;
    if (ast_arr['for']) {
        array[len].push(ast_arr);
    }
    if (ast_arr.child.length) {
        child = node.childNodes;
        forEach(ast_arr.child, function (value, key) {
            ast2(value, child[value.addr], array);
        });
    } else {
        array.push([]);
    }
}

function AST3(array, arr1, arr2, arr3) {
    arr1 = [];
    forEach(array, function (value, key) {
        arr2 = [];
        forEach(value, function (value, key) {
            arr3 = [];
            forEach(value, function (value, key) {
                arr3.push(ast_for_str(value['for']));
            });
            arr2.push(arr3);
        });
        arr1.push(arr2);
    });
    return arr1;
}

function ast_for_str(str, arr) {
    arr = str.split(" in ");
    arr.push(arr[0].split(","));
    arr[0] = {};
    arr[0][arr[2][0]] = 0;
    arr[0][arr[2][1]] = 0;
    return arr;
}

function React() { //更新dom

}