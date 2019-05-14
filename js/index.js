ready(function () {
    Ajax("GET", "ajax.txt", "", function (e) {
        console.log(e);
    });
    console.log(data, data_dom, dom_data);
    console.time("time");
    React();
    setData(function () { //用户的操作写这里
        this.link.setData(function () {
            this.map.value = 50;
            this.map.fn = function () {
                return this.map.value + 50;
            };
        });
    });
    console.timeEnd("time");
});