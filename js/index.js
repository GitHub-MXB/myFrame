ready(function () {
    Ajax("GET", "ajax.txt", "", function (e) {
        console.log(e);
    });
    // var typ = document.createAttribute("isMould");
    // typ.nodeValue = "";
    // attr.setNamedItem(typ);
    // console.time("time");
    // var b = document.createElement("div");
    // b.innerHTML = "<h1>{wap}</h1>";
    // b = b.childNodes[0];
    // var str = fn(dataDom.link['class']['value']);
    // console.log(str);
    // a.innerHTML = b.tagName;
    // console.timeEnd("time");
    // console.log(b);
    forEach(dom(document.body, "link"), function (value, key) {
        console.log(value);
    });
});
var dataArr = [];

function getNode(dom) {
    var let1 = dom.childNodes[2].nodeValue;
    return let1;
}

data1.link.setData(function () { //用户的操作写这里
    this.setData1("href", "abcd");
    this.setData1("map2", function () {
        return this.href + "a";
    });
    //setData1是建议操作，可直接赋值
    this.href = "abcde";
});
console.log(data1, data2);
console.log(dataDom.link.el);

function getAttr(dom) {
    var let1 = dom.attributes;
    var let2 = {};
    forEach(let1, function (i, node) {
        let2[node.nodeName] = node.nodeValue; //将dom的值转化为data
        //到时只需一次就可以获取数据
    });
    return let2;
}