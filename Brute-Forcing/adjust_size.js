function RangeItem(start, end) {
    this.start = start;
    this.end = end;

    this.getStart = function () {
        return this.start;
    }

    this.getEnd = function () {
        return this.end;
    }
}

document.addEventListener("DOMContentLoaded", function() {

    //建立寬度矩陣
    let rangeArray = [];

    let grids = document.querySelectorAll(".grid_mark");
    grids.forEach(item => {
        let rect = item.getBoundingClientRect();
        let start = rect["x"];
        let end = start + rect["width"];
        let obj = new RangeItem(start, end);
        rangeArray.push(obj);
    });

    //測試：console rangeArray item
    rangeArray.forEach(item => {
        console.log(`item : start = ${item.start} / end = ${item.end}`);
    });

});