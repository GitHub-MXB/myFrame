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