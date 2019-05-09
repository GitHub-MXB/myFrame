ready(function () {
    Ajax("GET", "ajax.txt", "", function (e) {
        console.log(e);
    });
    // var typ = document.createAttribute("isMould");
    // typ.nodeValue = "";
    // attr.setNamedItem(typ);
    var a = getElementsByClassName(document.body, "link")[0];
    console.time("time");
    var b = document.createElement("div");
    b.innerHTML = "<h1>{wap}</h1>";
    b = b.childNodes[0];
    // var str = fn(dataDom.link['class']['value']);
    // console.log(str);
    // a.innerHTML = b.tagName;
    console.timeEnd("time");
    console.log(b);
});

function getNode(dom) {
    var let1 = dom.childNodes[2].nodeValue;
    return let1;
}

function getAttr(dom) {
    var let1 = dom.attributes;
    var let2 = {};
    forEach(let1, function (i, node) {
        let2[node.nodeName] = node.nodeValue; //将dom的值转化为data
        //到时只需一次就可以获取数据
    });
    return let2;
}