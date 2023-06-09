document.addEventListener("DOMContentLoaded", function() {
    const dragstart = (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
    }

    const drop = (e) => {
        cancelDefault(e);
        let id = e.dataTransfer.getData("text/plain");
        e.target.appendChild(document.querySelector(`#${id}`));
    }

    const cancelDefault = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }


    //Part 1
    let dragTarget = document.querySelector("#targetDrag1");
    dragTarget.addEventListener("dragstart", dragstart);

    let dropTagets = document.querySelectorAll("#container1 div");
    dropTagets.forEach(item => {
        item.addEventListener("drop", drop);

        item.addEventListener("dragenter", cancelDefault);
        item.addEventListener("dragover", cancelDefault);
        item.addEventListener("dragleave", cancelDefault);
    });

    //Part 2
    let dragTarget2 = document.querySelector("#targetDrag2");
    dragTarget2.draggable = true;
    dragTarget2.addEventListener("dragstart", dragstart);
    //or : dragTarget2.setAttribute('draggable', true);
    let dropTagets2 = document.querySelectorAll("#container2 div");
    dropTagets2.forEach(item => {
        item.addEventListener("drop", drop);

        item.addEventListener("dragenter", cancelDefault);
        item.addEventListener("dragover", cancelDefault);
        item.addEventListener("dragleave", cancelDefault);
    });

    //Part 3
    let dragTarget3 = document.querySelector("#targetDrag3");
    let resizeField = document.querySelector("#targetDrag3 .resizeField");

    let m_pos;
    const resize = (e) => {
        //在滑鼠按住拖曳時都會在這裡進行更新
        const dx = e.x - m_pos;
        console.log(`in resize() dx : ${dx}`);
        m_pos = e.x;
        console.log(`in resize() m_pos : ${m_pos}`);
        console.log(`in resize() e.x : ${e.x}`);
        dragTarget3.style.width = `${(parseInt(getComputedStyle(dragTarget3, null).width) + dx)}px`;
        console.log(`result : ${(parseInt(getComputedStyle(dragTarget3, null).width) + dx)}`);
    }
    const resizeV2 = (e) => {
        console.log(`e.currentTarget : ${e.currentTarget.classList}`);
        const dx = e.x - m_pos;
        m_pos = e.x;
        e.currentTarget.style.width = `${(parseInt(getComputedStyle(e.currentTarget, null).width) + dx)}px`;
    }
    //*筆記：event有個currentTarget可以使用

    let dropTagets3 = document.querySelectorAll("#container3 div");
    let containerPart3 = document.querySelector(".container.part3");

    resizeField.addEventListener("mousedown", (e) => {
        m_pos = e.x;    //初始紀錄,直到mousedown重新觸發才會進來,之後轉交給resize()
        console.log(`in addEventListener m_pos : ${m_pos}`);
        console.log(`in addEventListener e.x : ${e.x}`);

        // containerPart3.addEventListener("mousemove", resizeV2);
        containerPart3.addEventListener("mousemove", resize);
    });

    containerPart3.addEventListener("mouseup", (e) => {
        // containerPart3.removeEventListener("mousemove", resizeV2);
        containerPart3.removeEventListener("mousemove", resize);
    });

    //Part 4

    let dragTarget4 = document.querySelector("#targetDrag4");
    let resizeField4 = document.querySelector("#targetDrag4 .resizeField");

    let dropX;
    const setDropX = () => {

    }

    let m_pos_4;
    let dt_Unit_Width;
    const resize4 = (dt) => {  //This value dt equal to dt_Unit_Width
        const dx = dt - m_pos_4;
        m_pos_4 = e.x;
        dragTarget4.style.width = `${(parseInt(getComputedStyle(dragTarget4, null).width) + dx)}px`;
    }

    let containerPart4 = document.querySelector(".container.part4");
    let dropTagets4 = document.querySelectorAll("#container4 div");


    //加上dataset property來方便計算
    //預想: 
    //      data-index: 序列,根據DOC結構給從1開始的漸增數字
    //      data-point: 定位點,表示此dropTarget裡有某專案的定位點
    const settingDataTag = () => {

        let grids = document.querySelectorAll(".container.part4 > .dropTarget");
        //let unit = grids[0].getBoundingClientRect().width;
        
        let index = 1;
        grids.forEach(item => {
            //定位點判斷:
            let children = item.children;
            if (children.lenth > 0) {
                item.dataset.point = 1;
            } else {
                item.dataset.point = 0;
            }

            //序列設定
            item.dataset.index = index;
            index++;
        });

        resizeField4.dataset.pos = 1;
        resizeField4.dataset.basic = parseInt(dragTarget4.getBoundingClientRect().width);
    }

    //應該要把Move和Resize分開來寫,這樣不用引入switch的方式
    const dragMove = () => {

    }

    const dragResize = (target) => {
        //需要算出與目前targetDrag相隔多少個droptarget
        //target: 觸發mouseover的元素,預想是droptarget
        //point: 為targetDrag所在的droptarget
    }

    //測試：在此執行settingDataTag()
    settingDataTag();

    //結果：樣式 => hover就好 / 事件 => mouseover
    // dropTagets4.forEach(item => {
    //     item.addEventListener("mouseenter", (e) => {
    //         // console.log("test mouseenter");
    //         e.target.classList.add("dropTarget_hover");
    //     });
    //     item.addEventListener("mouseleave", (e) => {
    //         // console.log("test mouseleave");
    //         e.target.classList.remove("dropTarget_hover");
    //     });
    //     item.addEventListener("mouseover", (e) => {
    //         // console.log("arrive another element...");
    //         if (e.target.dataset.name === "dropTarget") {
    //             console.log(`dropTaget index: ${e.target.dataset.index}`);
    //             console.log(`dropTaget index: ${e.target.dataset.point}`);
    //         }
    //     });
    // });
    //上面改：用事件捕獲套用試試
    //結果：沒辦法分開偵測
    // containerPart4.addEventListener("mouseover", (e) => {
    //     if (e.target.dataset.name === "dropTarget") {
    //         console.log(`dropTarget index: ${e.target.dataset.index}`);
    //         console.log(`dropTarget index: ${e.target.dataset.point}`);
    //     }
    //     if (e.target.dataset.name === "targetDrag") {
    //         console.log(`targetDrag id: ${e.target.dataset.id}`);
    //         console.log(`targetDrag point pos: ${e.target.dataset.pos}`);
    //     }
    // });
    //修改：要把addEventListener裡在用.on___系列的事件另外開出來
    //結果：只能增不能減
    containerPart4.addEventListener("mousedown", (e) => {
        if (e.target.dataset.name === "resizeField") {
            // console.log(`e.target.dataset.pos = ${e.target.dataset.pos}`);
            let targetPoint = e.target.dataset.pos;
            let basicWidth = Number(e.target.dataset.basic);
            let targetMain = e.target.parentElement;

            containerPart4.onmouseover = (f) => {
                if (f.target.dataset.name === "dropTarget") {
                    // console.log(`dropTarget index: ${e.target.dataset.index}`);
                    // console.log(`dropTarget point: ${e.target.dataset.point}`);

                    let currentZone = f.target.dataset.index;
                    let distanceIndex = currentZone - targetPoint;
                    if (distanceIndex > 0) {
                        let widthUnit = parseInt(f.target.getBoundingClientRect().width);
                        let addWidth = distanceIndex * widthUnit;
                        
                        // console.log(`basicWidth : ${basicWidth}`);
                        // console.log(`basicWidth typeof : ${typeof(basicWidth)}`);
                        // console.log(`addWidth : ${addWidth}`);
                        // console.log(`addWidth typeof : ${typeof(addWidth)}`);
                        targetMain.style.width = `${(basicWidth + addWidth)}px`;
                    }
                }
            }
        }
    });

    //修改：多個addEventListener跟外部參數試試

    let targetPoint;
    let basicWidth;
    let targetMain;



    // ======> OK!

    //下一步：把這個值帶入進去改變寬度

    //使用事件捕獲概念進行測試
    // containerPart4.addEventListener("mousedown", (e) => {
    //     console.log("trigger mousedonw");
    //     if (e.target.dataset.name === "resizeField") {
    //         // console.log(`e.target.tagName : ${e.target.dataset.name} --- mousedown event`);
    //     }
    // });
    // containerPart4.addEventListener("mouseenter", (e) => {
    //     console.log("trigger mouseenter");
    //     if (e.target.dataset.name === "dropTarget") {
    //         // console.log(`e.target.tagName : ${e.target.dataset.name} --- mouseenter event`);
    //     }
    // });
    // containerPart4.addEventListener("mouseover", (e) => {
    //     console.log("trigger mouseover");
    //     if (e.target.dataset.name === "dropTarget") {
    //         // console.log(`e.target.tagName : ${e.target.dataset.name} --- mouseover event`);
    //     }
    // })
    // containerPart4.addEventListener("mouseup", (e) => {
    //     console.log("trigger mouseup");
    //     if (e.target.dataset.name === "resizeField") {
    //         // console.log(`e.target.tagName : ${e.target.dataset.name} --- mouseup event`);
    //     }
    // });



    //ChatGPT Part
    const dragElement = document.getElementById('dragElement');
    const otherElements = document.getElementsByClassName('otherElement');
    const dropZone = document.getElementById('dropZone');

    dragElement.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
    });

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();

        // 獲取滑鼠位置
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // 遍歷每個 otherElement
        for (let i = 0; i < otherElements.length; i++) {
            const otherElement = otherElements[i];
            const otherElementRect = otherElement.getBoundingClientRect();
            const otherElementWidth = otherElementRect.width;

            // 檢查滑鼠是否在該 otherElement 上
            if (
                mouseX >= otherElementRect.left &&
                mouseX <= otherElementRect.left + otherElementWidth &&
                mouseY >= otherElementRect.top &&
                mouseY <= otherElementRect.bottom
            ) {
                // 滑鼠經過該 otherElement 時觸發事件並獲取寬度
                console.log(`滑鼠經過 otherElement ${i + 1}，寬度：`, otherElementWidth);
            }
        }
    });

    //Part 4-1
    // let dragTarget4_1 = document.querySelector("#targetDrag4-1");
    // dragTarget4_1.draggable = true;
    // dragTarget4_1.addEventListener("dragstart", dragstart);

    // const resizeFor4_1 = (e) => {

    // }

    // let resizeField4_1 = document.querySelector("#targetDrag4-1 .resizeField");

    // let containerPart4_1 = document.querySelector(".container.part4-1");
    // let dropTagets4_1 = document.querySelectorAll("#container4-1 div");
    // dropTagets4_1.forEach(item => {
    //     item.addEventListener("drop", drop);

    //     item.addEventListener("dragenter", cancelDefault);
    //     item.addEventListener("dragover", cancelDefault);
    //     item.addEventListener("dragleave", cancelDefault);
    // });
})