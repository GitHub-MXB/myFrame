ready(function () {
    window.getElementsByClassName = function (dom, cls) {
        var ret = [];
        forEach(dom.getElementsByTagName('*'), function (value, index) {
            if ((" " + value.className).indexOf(" " + cls) >= 0) {
                ret.push(value);
            }
        });
        return ret;
    }
    Ajax("GET", "ajax.txt", "", function (e) {
        console.log(e);
    })
    // var typ = document.createAttribute("isMould");
    // typ.nodeValue = "";
    // attr.setNamedItem(typ);
    var a = getElementsByClassName(document.body, "link")[0];
    console.time("time");
    var b = document.createElement("div");
    b.innerHTML = a.outerHTML;
    b = b.children[0];
    var str = fn(dataDom.link['class']['value']);
    console.timeEnd("time");
    console.log(str);
    a.innerHTML = b.tagName;
    arr = [];
    arr.unshift("a")
    console.log(arr, index)
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