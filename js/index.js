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
    var ast_arr = []; //ast树
    // var ast_arr_each = [];
    var ast_for = []; //ast的for树
    var data_node = []; //data的节点名字，防止顺序出问题
    var ast_for_arr = [];
    var obj = {
        a: 0,
        b: 1
    };
    Ajax("GET", "img/download.jpg", "", function (e) {
        console.log(e);
    });
    console.log(data, data_dom, dom_data);
    console.time("time");
    // React();
    AST(data_node, ast_arr); //得到ast树
    AST2(data_node, ast_arr, ast_for); //得到for的ast树
    // ast_for_arr = AST3(ast_for);
    forEach(obj, function (value, key) {
        this[key] = 10;
    });
    console.timeEnd("time");
    // console.log(JSON.stringify(ast_arr));
    console.log(ast_arr, ast_for, data_node, ast_for_arr);
    setData(function () { //用户的操作写这里
        this.link.setData(function () {
            this.map.value = 50;
            this.map.fn = function () {
                return new Date().toLocaleTimeString();
            };
        });
    });
});