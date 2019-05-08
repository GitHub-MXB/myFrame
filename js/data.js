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
        html1: "<h1>html</h1>",
        html2: {
            value: "<h1>{wap}</h1>",
            obj: {

            }
        },
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
    }
};
var dataDom = { //自动生成的
    link: {
        text: {
            'content': {
                key: 1,
                value: "123{link.content}"
            }
        },
        attr: {
            "href": {
                value: "{link.href}"
            }
        },
        "class": "link {link.class1}123{link.class2}",
        element: "{link.html}"
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
}
// fn2 = function () {
//     return "link " + data2['link']['class1'] + "123" + data2['link']['class2'];
// }