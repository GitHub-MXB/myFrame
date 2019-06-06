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
        if (value == null || undefined) {
            addr[key] = " ";
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
                addr[key] = value ? key : " ";
                break;
            case "function":
                addr[key] = value.call(_addr) || " ";
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
    data[obj.el]._addr = [data_dom[obj.el], obj.el];
    setData(function () {});
}

function updata(node, data, attr, text) { //更新数据
    attr = node.addr.attributes;
    text = node.addr.childNodes;
    forEach(node.attr, function (value, key) {
        attr[key].nodeValue = getData(value, data);
    });
    forEach(node.text, function (value, key) {
        text[key].nodeValue = getData(value, data);
    });
}

function ast_for_str(str, arr) { // for转具体值
    if (!str) return;
    arr = str.split(" in ");
    arr.push(arr[0].split(","));
    arr[0] = {};
    arr[0][arr[2][0]] = 0;
    arr[0][arr[2][1]] = 0;
    return arr;
}

function setNode(node, data, stack, bool) { //更新dom    ast_arr,需要的data_dom
    if (!node) return;
    updata(node, data);
    bool = ast_for_str(node['for']); //虚拟堆
    stack = bool ? bool : stack;
    var theory = 0; //理论个数
    var fact = node.len; //实际个数
    var remove;
    if (bool) {
        stack[1] = str_obj(stack[1], data);
        theory = stack[1].length;
        remove = theory - fact;
        if (remove >= 1) {
            forEach(node.child, function (value, key) {
                setNode(value, data, stack);
            });
            var node_fragment = document.createDocumentFragment();
            var replace_node;
            forEach(4, function (value, key) {
                node_fragment.appendChild(node.addr.cloneNode(true));
            });
            replace_node = node_fragment.firstChild;
            node.addr.parentNode.replaceChild(node_fragment, node.addr);
            node.addr = replace_node;
        }
        if (remove <= -1) {
            forEach(-remove, function (value, key) {
                node_fragment.removeChild();
            });
        }
    } else {
        forEach(node.child, function (value, key) {
            setNode(value, data, stack);
        });
    }
}

function setNode_for() {

}

function setData(fn, data_dom, arr, node) { //设置值到dom
    fn.call(data);
    forEach(update_list, function (value, key) { //这里更新dom，即update_list
        data_dom = value._addr[0];
        node = dom_data[value._addr[1]];
        console.log(data_dom, node);
        arr = node_array(dom(document.body, value._addr[2])[0], []);
        console.time();
        setNode(node, data_dom);
        console.timeEnd();
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
            obj = obj[value] || " ";
        });
        return obj;
    }
}

function node_array(node, arr) { //获取节点的数组
    if (!node)
        return;
    arr = [node];
    forEach(node.getElementsByTagName("*"), function (value, key) {
        arr.push(value);
    });
    return arr;
}

function AST(data, obj, node) {
    forEach(data, function (value, key) { //这个可以提前生成,加个index即可
        node = dom(document.body, key)[0];
        ast(node, obj, key, node);
    });
}

function ast(node, array, key, parent, obj, str_for, str) { //保存key与value的值，将来可优化，只保存node不能
    if (!node || node.nodeType != 1) return;
    if (node.getAttribute('for_li')) { //所有for的循环体添加for_li
        return this.len++;
    }
    obj = {};
    node.obj = obj;
    obj.addr = node; //仅这一个是动态的,可优化
    obj.parent = node;
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
            ast.call(obj, value, obj.child, "", parent);
        }
    });
    if (array instanceof Array) { //是child
        array.push(obj);
    } else {
        ast.call(obj, node.nextSibling, array, "", parent);
        array[key] = obj;
    }
}