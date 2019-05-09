var data = {
    link: {
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
            return this.href + "abc";
        },
        html1: "<h1>html</h1>"
    },
    el: {
        html2: "<h1>{wap}</h1>",
        wap: 123
    }
};
//用时，即赋值时就完成处理，赋值一次只处理一个，不要取的时候处理
var data2 = {
    link: {
        href: "https://www.baidu.com",
        content: "百度一下，你就知道",
        'class1': "class1", //class一体化
        'class2': "class2",
        map: "100abc",
        map2: "https://www.baidu.comabc"
    },
    el: {
        wap: 123
    }
};
var dataDom = { //自动生成的
    link: {
        text: {
            1: "123{link.content}"
        },
        attr: {
            "href": "{link.href}"
        },
        "class": "link {link.class1}123{link.class2}",
        element: { //局部的，这玩意不变
            key: 3,
            value: "{html1}"
        }
    },
    el: { //全局的
        element: "{html2}",
        text: {
            'wap': {
                key: 1,
                value: "{wap}"
            }
        }
    }
};
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
// fn2 = function () {
//     return "link " + data2['link']['class1'] + "123" + data2['link']['class2'];
// }