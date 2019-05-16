//次要的
function getRatio(key) {
    switch (key) {
        // case 20:
        //     return 1 / 1;
        case 21:
            return 3 / 4;
        case 22:
            return 2 / 3;
        case 23:
            return 9 / 16;
        default:
            return 1 / 1;
    }
}

function img_auto(ratio, dom) {
    var style = dom.getStyle();
    img_h = parseFloat(style.height); //图片真实高度
    img_w = parseFloat(style.width);
    ratio = getRatio(ratio); //图片目标比率
    img_ratio = img_h / img_w; //图片实际比率
    if (ratio < img_ratio) {
        a = (img_w - img_w / img_ratio) / 2;
        dom.setCss("padding", 0 + "px " + a + "px");
    } else {
        b = (img_w * ratio - img_h) / 2;
        dom.setCss("padding", b + "px " + 0 + "px");
    }
}