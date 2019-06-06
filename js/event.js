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

function iniEvent(int_key, int_value) {
    document.addEventListener = document.addEventListener || document.attachEvent;
    forEach(eventAll, function (value, key, This, relatedTarget) {
        if (old_browser) {
            key = "on" + key; //attachEvent需要event前面加on
        }
        if (old_browser && !(key != "onfocus" || "onblur" || "onload" || "unload")) { //不可冒泡并且不可捕获，主要是ie9-
            int_key = key;
            // (key == "onfocus" || "onblur" || "onload" || "unload")返回错误
            forEach(value, function (value, key) {
                int_value = value;
                forEach(dom(document.body, key), function (value) {
                    value.attachEvent(int_key, function (e) {
                        e.target = e.srcElement;
                        forEach(int_value, function (value) {
                            value.call(e.target, e);
                        });
                    });
                });
            });
            return;
        }
        document.addEventListener(key, function (event) { //事件为捕获类型
            if (old_browser) {
                event.target = event.srcElement;
            }
            forEach(value, function (value, key) {
                This = targetNode(event.target, key);
                //event.relatedTarget属性在mouseover中相当于IE浏览器的event.fromElement属性，在mouseout中相当于IE浏览器的event.toElement
                if (event.type == "mouseover") {
                    relatedTarget = event.relatedTarget || event.fromElement;
                } else if (event.type == "mouseout") {
                    relatedTarget = event.relatedTarget || event.toElement;
                }
                if (relatedTarget && targetNode(relatedTarget, key)) {
                    return;
                }
                event.relatedTarget = relatedTarget;
                if (This) {
                    var child = getElements(This.obj.parent);
                    var node_arr = node_filter(child, key);
                    var index = node_arr.indexOf(This);
                    var obj = {
                        child: child,
                        className: key,
                        node_arr: node_arr,
                        index: index,
                        get_node_arr: function (cls) {
                            return node_filter(child, cls);
                        },
                        get_node: function (cls, i) {
                            return this.get_node_arr(cls)[i == undefined ? index : i];
                        }
                    };
                    forEach(value, function (value) {
                        value.call(This, event, obj);
                    });
                }
            });
        }, true);
    });

    function targetNode(node, str) { //判断是否有父元素符合要求，有，返回这个元素
        if (node) {
            if (isClass(node, str)) {
                return node;
            } else {
                return targetNode(node.parentNode, str);
            }
        } else {
            return false;
        }
    }
}