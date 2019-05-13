//用时，即赋值时就完成处理，赋值一次只处理一个，不要取的时候处理
console.time("time");
var dom_data = { //自动生成的
    link: {
        text: {
            1: "123{link.content}"
        },
        attr: {
            "href": "{link.href}"
        },
        'class': "link {link.class1}123{link.class2}",
        el: { //局部的，这玩意不变
            3: "{html1}"
        }
    },
    el: { //全局的
        el: "{html2}",
        text: {
            'wap': {
                key: 1,
                value: "{wap}"
            }
        }
    }
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
Object.prototype.setData = function (fn) {
    console.time("setData");
    fn.call(this);
    this.setData1(this, this._addr[0]);
    console.timeEnd("setData");
};
data = {};
data_dom = {};

function node_array(dom, arr) {
    if (!dom)
        return;
    arr = [dom];
    forEach(dom.getElementsByTagName("*"), function (value) {
        arr.push(value);
    });
    return arr;
}

function Vue(obj) {
    data[obj.el] = obj.data;
    data_dom[obj.el] = {};
    dom_data[obj.el] = dom_data[obj.el] || {};
    data[obj.el]._addr = [data_dom[obj.el], dom_data[obj.el]];
    data[obj.el].setData(function () {});
}
dom_data = {};

function React(arr, This) {
    console.log(dom_data);
    forEach(dom_data, function (value, key) {
        This = value;
        arr = node_array(dom(document.body, key)[0]);
        forEach(arr, function (value, key) {
            This[key] = 1;
            console.log(value);
        });
    });
}

function Node(node, attr) {
    forEach(node.attributes, function (value, key) {
        // value.nodeValue;
        //遍历完，转移class和element
    });
    forEach(node.childNodes, function (value, key) {
        if (value.nodeType !== 3) {
            return;
        }
        // value.nodeValue判断是否有{}
    });
}
new Vue({
    el: 'link',
    data: {
        href: "https://www.baidu.com",
        content: "百度一下，你就知道",
        'class': true,
        'class2': false,
        map: {
            value: 100,
            fn: function () {
                return this.content + "abc";
            }
        },
        map2: function () {
            return this.content + "abc";
        },
        Nul: null,
        arr: [1, 2],
        html1: "<h1>html</h1>"
    }
});
new Vue({
    el: "el",
    data: {
        html2: "<h1>{wap}</h1>",
        wap: 123
    }
});
fn = function (obj) { //先用这个，以后换成fn2
    return obj.replace(/[^{}]+|{([^}]+)}/g, function (a, b) { //   
        if (b) {
            a = data_dom;
            forEach(b.split("."), function (value, key) {
                a = a[value];
            });
        }
        return a;
    });
};