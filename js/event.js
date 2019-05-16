//框架目前模块：模板模块，事件模块，兼容ie5+
//事件处理器
var eventAll = {}; //事件核心,提前添加所有可能的事件
function event(str) {
    return String(str);
}
String.prototype.on = function (event, fn) {
    key(event, this.toString(), fn);

    function key(event, className, fn) {
        eventAll[event] = eventAll[event] || {};
        eventAll[event][className] = eventAll[event][className] || [];
        eventAll[event][className].push(fn);
    }
};

function iniEvent(addEventListener) {
    addEventListener = !document.addEventListener;
    document.addEventListener = document.addEventListener || document.attachEvent;
    forEach(eventAll, function (value, key, This) {
        if (addEventListener) {
            key = "on" + key; //attachEvent需要event前面加on
        }
        if (document.attachEvent && (key == "focus" || "blur" || "onload" || "unload")) { //不可冒泡并且不可捕获，主要是ie9-
            key1 = key;
            forEach(value, function (value, key) {
                value1 = value;
                forEach(dom(document.body, key), function (value) {
                    value.attachEvent(key1, function (e) {
                        e.target = e.srcElement;
                        forEach(value1, function (value) {
                            value.call(e.target, e);
                        });
                    });
                });
            });
            return;
        }
        document.addEventListener(key, function (e) { //事件为捕获类型
            if (addEventListener) {
                e.target = e.srcElement;
            }
            forEach(value, function (value, key) {
                This = targetNode(e.target, key);
                //event.relatedTarget属性在mouseover中相当于IE浏览器的event.fromElement属性，在mouseout中相当于IE浏览器的event.toElement
                if (e.type == "mouseover") {
                    e.relatedTarget = e.relatedTarget || e.fromElement;
                } else if (e.type == "mouseout") {
                    e.relatedTarget = e.relatedTarget || e.toElement;
                }
                if (e.relatedTarget && targetNode(e.relatedTarget, key)) {
                    return;
                }
                if (This) {
                    forEach(value, function (value) {
                        value.call(This, e);
                    });
                }
            });
        }, true);
    });

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
}