Vue({
    el: 'link',
    data: {
        href: "http://www.baidu.com",
        content: "百度一下，你就知道",
        'class': true,
        bool: true,
        'class2': function () {
            if (!this.bool) {
                return "hidden";
            }
        },
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
        arr: ['a', 'b', 'c', 'd'],
        html1: "<h1>html</h1>"
    }
});
Vue({
    el: "el",
    data: {
        html2: "<h1>{wap}</h1>",
        wap: 123
    }
});
ready(function () {
    var ast_arr = [];
    var for_arr = [];
    var data_node = [];
    Ajax("GET", "img/download.jpg", "", function (e) {
        console.log(e);
    });
    console.log(data, data_dom, dom_data);
    console.time("time");
    // React();
    AST(data_node, ast_arr);
    AST2(data_node, ast_arr, for_arr, data_node);
    console.timeEnd("time");
    // console.log(JSON.stringify(ast_arr));
    console.log(ast_arr, for_arr);
    setData(function () { //用户的操作写这里
        this.link.setData(function () {
            this.map.value = 50;
            this.map.fn = function () {
                return new Date().toLocaleTimeString();
            };
        });
    });
});