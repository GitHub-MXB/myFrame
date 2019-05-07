var data = {
    link: {
        href: "https://www.baidu.com",
        content: "百度一下，你就知道",
        'class': {
            "abc": false
        }
    }
};

function DomName(nodeName) {
    this.node = {};
    this.attr = {};
}
console.log(new DomName());
var dataDom = {
    link: {
        node: {
            "1": "123{link.content}",
            setDom: function () { //设置dom的值，常用
                return "123" + data.link['class'];
            },
            getDom: function () { //读取dom的值，
                return "123" + data.link.content;
            }
        },
        attr: {
            "href": {
                value: "{link.href}",
                fn: function () {
                    return data.link.href;
                }
            },
            "class": {
                value: "link {link.class}",
                set: function (str) {
                    return "link " + data.link['class'][str] ? str : "";
                },
                get: function () {

                }
            }
        }
    }
};
var arr = {
    1: {
        dom: "link",
        type: "node",
        index: "1"
    }
};