//用时，即赋值时就完成处理，赋值一次只处理一个，不要取的时候处理
var dataDom = { //自动生成的
    link: {
        text: {
            1: "123{link.content}"
        },
        attr: {
            "href": "{link.href}"
        },
        "class": "link {link.class1}123{link.class2}",
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
Object.prototype.setData1 = function (key, value) {
    switch (typeof value) {
        case "object":
            this[key].value = value;
            break;
        default:
            this[key] = value;
            break;
    }
};
Object.prototype.setData2 = function (key, value) {
    var addr = this._addr[0];
    switch (typeof value) {
        case "object":
            addr[key] = value.fn && value.fn();
            break;
        case "boolean":
            addr[key] = value ? key : "";
            break;
        case "function":
            addr[key] = value.call(this);
            break;
        default:
            addr[key] = value;
            break;
    }
};
Object.prototype.setData = function (fn) {
    // console.time("setData");
    fn.call(this);
    forEach(this, function (value, key) {
        this.setData2(key, value);
    });
    // console.log(this._addr[1]);
    // console.timeEnd("setData");
};
data1 = {};
data2 = {};

function Vue(obj) {
    data1[obj.el] = obj.data;
    data2[obj.el] = {};
    data1[obj.el]._addr = [data2[obj.el], dataDom[obj.el]];
    data1[obj.el].setData(function () {});
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
                return this.value + "abc";
            }
        },
        map2: function () {
            return this.content + "abc";
        },
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
            a = data2;
            forEach(b.split("."), function (value, key) {
                a = a[value];
            });
        }
        return a;
    });
};