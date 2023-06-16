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
        return Number(this.index);
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
    // let panel = document.querySelector(".container");
    // panel.addEventListener("pointermove", function(e) {

    //     let current_page_x = e.pageX;
    //     let checkArray = [...rangeArray];

    //     checkArray.forEach(item => {
    //         if (item.getStart() <= current_page_x && current_page_x <= item.getEnd()) {
    //             console.log(`postion : fake_grid index = ${item.getIndex()}`);
    //         }
    //     });
    // });

    let startIndex = 0;

    let testArray = [...rangeArray];
    testArray.forEach(item => {
        console.log(`testArray item ${item.getIndex()} : start = ${item.getStart()} / end = ${item.getEnd()}`);
    });

    //需要加上初始進入點的紀錄
    const recordEntry = (e) => {
        let card = e.currentTarget.previousElementSibling;
        let rect = card.getBoundingClientRect();
        let cardX = rect["x"];

        let checkArray = [...rangeArray];
        let getCurrentItem = checkArray.find(item => {
            return item.getStart() <= cardX && cardX <= item.getEnd();
        });

        startIndex = getCurrentItem.getIndex();
    }

    //建立resize區域並且增加相關事件
    const adjustWidth = (e) => {

        console.log(e.pageX);

        let current_page_x = e.pageX;
        let checkArray = [...rangeArray];
        let varietyWidth = 0;

        //確認目前在哪段區域
        let getCurrentItem = checkArray.find(item => {
            return item.getStart() <= current_page_x && current_page_x <= item.getEnd();
        });

        let currentIndex = getCurrentItem.getIndex();
        console.log(`currentIndex : ${currentIndex}`);
        //把該段區域以前的長度加總起來
        let getCurrentArray = checkArray.slice(startIndex, currentIndex);
        let partPoint = 0;
        getCurrentArray.forEach(item => {
            let partWidth = item.getEnd() - item.getStart();
            let partGap = item.getStart() - partPoint;
            varietyWidth += (partGap + partWidth);
            partPoint = item.getEnd();
        });

        let card = e.currentTarget.previousElementSibling;

        card.style.width = `${getComputedStyle(card, null).width + varietyWidth}px`;
    }

    let panel = document.querySelector(".container");
    
    let resizeField = document.querySelector(".resize_field");
    resizeField.addEventListener("pointerdown", function(e) {
        
        recordEntry(e);
        console.log(`startIndex : ${startIndex}`);
        console.log("input the pointerdown event");

        //resizeField.addEventListener("pointermove", adjustWidth);
        panel.addEventListener("pointermove", adjustWidth);
    });

    //當觸發pointup事件時,解除adjustWidth
    resizeField.addEventListener("pointerup", function(e) {

        console.log("input the pointerup event");

        //resizeField.removeEventListener("pointermove", adjustWidth);
        panel.removeEventListener("pointermove", adjustWidth);
    });

});