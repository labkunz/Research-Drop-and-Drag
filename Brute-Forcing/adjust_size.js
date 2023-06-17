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

    //宣告間隔變數
    let firstItem = rangeArray[0];
    let secondItem = rangeArray[1];
    const gapDistance = secondItem.getStart() - firstItem.getEnd(); 

    let startIndex = 0;
    let finalWidth = 0;

    let testArray = [...rangeArray];
    testArray.forEach(item => {
        console.log(`testArray item ${item.getIndex()} : start = ${item.getStart()} / end = ${item.getEnd()}`);
    });

    const cancelDefault = (e) => {
        e.preventDefault();
    }

    //對需要調整的目標加上active
    const markTarget = (e) => {
        let target = e.target.parentElement;  //follow the html structure
        target.classList.add("darg-resize-active");
    }
    const dismarkTarget = () => {
        let target = document.querySelector(".darg-resize-active");
        target.classList.remove("darg-resize-active");
    }

    //需要加上初始進入點的紀錄
    const recordEntry = (e) => {
        let card = e.currentTarget.previousElementSibling;
        let rect = card.getBoundingClientRect();
        let cardX = rect["x"];

        let checkArray = [...rangeArray];
        let getCurrentItem = checkArray.find(item => {
            return (item.getStart() <= cardX && cardX <= item.getEnd());
        });

        startIndex = getCurrentItem.getIndex();
    }

    //參考FullCalendar
    //需要一個mirror element去展示出寬度的變化
    //等待滑鼠放開後再去對原element做設定

    //插入Mirror元素
    const insertMirrorElement = (e) => {
        let insertElement = e.currentTarget.parentElement.parentElement;
        let becopyTarget = e.currentTarget.parentElement;
        let clone = becopyTarget.cloneNode(true);

        //加入Mirror元素標示
        clone.classList.add("mirror-item");
        insertElement.append(clone);
        //設定visibility：
        becopyTarget.style.visibility = "hidden";
    }
    const setFinalWidth = () => {
        let mirrorItem = document.querySelector(".mirror-item");
        finalWidth = parseInt(getComputedStyle(mirrorItem, null).width);
    }
    const deleteMirrorElement = () => {
        let mirrorItem = document.querySelector(".mirror-item");
        let target = document.querySelector(".darg-resize-active");

        target.style.visibility = "visible";
        mirrorItem.remove();
    }

    //調整Mirror元素寬度
    const adjustMirrorWidth = (e) => {
        let current_page_x = e.pageX;
        let checkArray = [...rangeArray];
        let varietyWidth = 0;

        //確認目前在哪段區域
        let getCurrentItem = checkArray.find(item => {
            return (item.getStart() <= current_page_x && current_page_x <= item.getEnd()) || 
                   (item.getEnd() <= current_page_x && current_page_x <= (item.getEnd() + gapDistance));
        });

        let currentIndex = getCurrentItem.getIndex();
        
        currentIndex = currentIndex < startIndex ? startIndex : currentIndex;

        //把該段區域以前的長度加總起來
        //注意getIndex格式與陣列關係
        let getCurrentArray = checkArray.slice(startIndex - 1, currentIndex);;
        let partPoint = 0;
        
        getCurrentArray.forEach(item => {
            let partWidth = item.getEnd() - item.getStart();
            let partGap = item.getStart() - partPoint;

            //判斷是否為第一格開始計算
            partGap = partGap == item.getStart() ? 0 : partGap;

            varietyWidth += (partGap + partWidth);
            partPoint = item.getEnd();
        });

        let cardClone = document.querySelector(".mirror-item");
        cardClone.style.width = `${varietyWidth}px`;
    }

    //建立resize區域並且增加相關事件
    const adjustWidth = (e) => {

        console.log(e.pageX);

        let current_page_x = e.pageX;
        let checkArray = [...rangeArray];
        let varietyWidth = 0;

        //確認目前在哪段區域
        let getCurrentItem = checkArray.find(item => {
            return (item.getStart() <= current_page_x && current_page_x <= item.getEnd()) || 
                   (item.getEnd() <= current_page_x && current_page_x <= (item.getEnd() + gapDistance));
        });

        let currentIndex = getCurrentItem.getIndex();

        //把該段區域以前的長度加總起來
        let getCurrentArray = checkArray.slice(startIndex, currentIndex);
        let partPoint = 0;
        getCurrentArray.forEach(item => {
            let partWidth = item.getEnd() - item.getStart();
            let partGap = item.getStart() - partPoint;
            varietyWidth += (partGap + partWidth);
            partPoint = item.getEnd();
        });

        let card = document.querySelector(".darg-resize-active");
        card.style.width = `${parseInt(getComputedStyle(card, null).width) + varietyWidth}px`;
    }
    const adjustWidthV2 = () => {
        let target = document.querySelector(".darg-resize-active");

        target.style.width = `${finalWidth}px`;
        finalWidth = 0;
    }

    //問題：要如何對到要調整寬度的目標？
    //思路一：用老招加上active class------------先用這招
    //思路二：放入工作佇列or陣列之類的當作紀錄

    let panel = document.querySelector(".container");

    let resizeField = document.querySelector(".resize_field");
    resizeField.addEventListener("pointerdown", function(e) {
        
        //取消選取文字預設和右鍵開啟選單
        panel.addEventListener("selectstart", cancelDefault);
        panel.addEventListener("contextmenu", cancelDefault);

        recordEntry(e);
        markTarget(e);
        insertMirrorElement(e);

        panel.addEventListener("pointermove", adjustMirrorWidth);
    });

    //從resizeField觸發更改成panel--可接受的拖曳範圍
    panel.addEventListener("pointerup", function() {

        panel.removeEventListener("pointermove", adjustMirrorWidth);

        setFinalWidth();
        adjustWidthV2();
        deleteMirrorElement();
        dismarkTarget();

        //回復選取文字預設和右鍵開啟選單
        panel.removeEventListener("selectstart", cancelDefault);
        panel.removeEventListener("contextmenu", cancelDefault);
    })

});