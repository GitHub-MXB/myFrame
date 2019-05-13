ready(function () {
    Ajax("GET", "ajax.txt", "", function (e) {
        console.log(e);
    });
    // var typ = document.createAttribute("isMould");
    // typ.nodeValue = "";
    // attr.setNamedItem(typ);
    console.time("a");
    dom1 = dom(document.body, "link")[0];
    dom2 = dom1.cloneNode(true);
    attr = dom2.attributes;
    attr.href.nodeValue = data_dom.link.href;
    console.timeEnd("a");
    console.log(dom1, dom2);

    arr = node_array(dom1);
    console.log(arr, dom(document.body, "link")[0]);
    React();
});
var dataArr = [];

function getNode(dom) {
    var let1 = dom.childNodes[2].nodeValue;
    return let1;
}

data.link.setData(function () { //用户的操作写这里
    this.map.value = 50;
    this.map.fn = function () {
        return this.map.value + 50;
    };
});
console.log(data, data_dom);


function getAttr(dom) {
    var let1 = dom.attributes;
    var let2 = {};
    forEach(let1, function (i, node) {
        let2[node.nodeName] = node.nodeValue; //将dom的值转化为data
        //到时只需一次就可以获取数据
    });
    return let2;
}
console.timeEnd("time");