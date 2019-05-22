Vue({
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
Vue({
    el: "el",
    data: {
        html2: "<h1>{wap}</h1>",
        wap: 123
    }
});
ready(function () {
    Ajax("GET", "ajax.txt", "", function (e) {
        console.log(e);
    });
    console.log(data, data_dom, dom_data);
    console.time("time");
    React();
    setData(function () { //用户的操作写这里
        this.link.setData(function () {
            this.map.value = 50;
            this.map.fn = function () {
                return new Date().toLocaleTimeString();
            };
        });
    });
    console.timeEnd("time");
    console.log(JSON.stringify(data_dom));
    console.log(JSON.stringify(dom_data));
});