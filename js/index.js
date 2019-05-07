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
    var fn = function (a) {
        return a + 10;
    };
    Ajax("GET", "ajax.txt", "", function (e) {
        console.log(e);
    })
    // var typ = document.createAttribute("isMould");
    // typ.nodeValue = "";
    // attr.setNamedItem(typ);
    // />[ }\n]+</ 可以取消所有空白节点
    var a = getElementsByClassName(document.body, "link")[0];

    forEach(document.body.childNodes, function (value, index) {
        console.log(value.tagName);
    });
    // console.log(JSON.parse(a.attributes["attr"].nodeValue));
    console.log(dataDom.link.node.setDom());
    data.link.content = "hello";
    console.log(data.link.content, dataDom.link.node.setDom());
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