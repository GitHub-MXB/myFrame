var eventAll = {}; //事件核心,向其添加函数即可
var event = function (str) {
    return String(str);
};

function key(event, className, fn) {
    eventAll[event] = eventAll[event] || {};
    eventAll[event][className] = eventAll[event][className] || [];
    eventAll[event][className].push(fn);
}
String.prototype.on = function (event, fn) {
    key(event, this.toString(), fn);
};

function iniEvent() {
    console.time("iniEvent");
    forEach(eventAll, function (value, key, This, addEventListener, target) {
        target = "target";
        addEventListener = "addEventListener";
        if (!document.addEventListener) {
            addEventListener = "attachEvent";
            key = "on" + key;
            target = "srcElement";
        }
        document[addEventListener](key, function (e) {
            forEach(value, function (value, key) {
                This = targetNode(e[target], key);
                if (This) {
                    forEach(value, function (value) {
                        value.call(This, e);
                    });
                }
            });
        });
    });
    console.timeEnd("iniEvent");
}

function addEvent(key, value) {

}

function targetNode(dom, str) { //判断是否有父元素符合要求，有，返回这个元素
    if (dom) {
        if (isClass(dom, str)) {
            return dom;
        } else {
            return targetNode(dom.parentNode, str);
        }
    }
    return false;
}
// Element.prototype.indexOf = function () {
//     [].indexOf.call(this.parentNode.children, this);
// };