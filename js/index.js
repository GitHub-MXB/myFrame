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
var dataArr = [];

function setData(cls, key, value) {
    var let1 = data[cls];
    switch (typeof let1[key]) {
        case "object":
            let1[key].value = value;
            break;
        case "boolean":
            if (value) {
                let1[key] = key;
            } else {
                let1[key] = "";
            }
            break;
        default:
            let1[key] = value;
            break;
    }
    dataArr.push(cls, key);
}
var arr = ["link", "href"];
setData("link", "href", "百度");

function addr(arr) {
    return data2[arr[0]][arr[1]];
}
console.time("time");
var a = addr(arr);
console.timeEnd("time");
console.log(a, typeof true);

function getNode(dom) {
    var let1 = dom.childNodes[2].nodeValue;
    return let1;
}

function set(fn1) {
    fn1();
    fn2(); //处理给data2
}
set(function (self) { //用户的操作写这里
    self.href = "a"; //setData
});

function getAttr(dom) {
    var let1 = dom.attributes;
    var let2 = {};
    forEach(let1, function (i, node) {
        let2[node.nodeName] = node.nodeValue; //将dom的值转化为data
        //到时只需一次就可以获取数据
    });
    return let2;
}