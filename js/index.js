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
    // var dom_data = {}; //ast树
    // var ast_arr_each = [];
    Ajax("GET", "img/download.jpg", "", function (e) {
        console.log(e);
    });
    console.log(data, data_dom, dom_data);
    console.time("time");
    // React();
    AST(data, dom_data); //得到ast树    注：for只能用在子标示上
    console.timeEnd("time");
    setData(function () { //用户的操作写这里       1、需要对单个值的设置优化
        this.link.setData(function () {
            this.map.value = 50;
            this.map.fn = function () {
                return new Date().toLocaleTimeString();
            };
        });
    });

});