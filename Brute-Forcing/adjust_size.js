function RangeItem(start, end, index) {
    this.start = start;
    this.end = end;
    this.index = index;

    this.getStart = function () {
        return this.start;
    }

    this.getEnd = function () {
        return this.end;
    }

    this.getIndex = function () {
        return this.index;
    }
}

document.addEventListener("DOMContentLoaded", function() {

    //建立寬度矩陣
    let rangeArray = [];

    let grids = document.querySelectorAll(".grid_mark");
    let index = 1;
    grids.forEach(item => {
        let rect = item.getBoundingClientRect();
        let start = rect["x"];
        let end = start + rect["width"];
        let obj = new RangeItem(start, end, index);
        index++;
        rangeArray.push(obj);
    });

    //測試：console rangeArray item
    rangeArray.forEach(item => {
        console.log(`item ${item.getIndex()} : start = ${item.getStart()} / end = ${item.getEnd()}`);
    });

    //測試：確認滑鼠可以抓到所在空間
    let panel = document.querySelector(".container");
    panel.addEventListener("pointermove", function(e) {

        let current_page_x = e.pageX;
        let checkArray = [...rangeArray];

        checkArray.forEach(item => {
            if (item.getStart() <= current_page_x && current_page_x <= item.getEnd()) {
                console.log(`postion : fake_grid index = ${item.getIndex()}`);
            }
        })
    })

});