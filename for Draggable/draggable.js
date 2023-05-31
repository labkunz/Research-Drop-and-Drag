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

    const addTarget = (target) => {
        // target.classList.add("active");
    }
    const removeTarget = (target) => {
        // target.classList.remove("active");
    }

    dropTagets4.forEach(item => {
        // item.addEventListener("mouseover", addTarget(item));
        // item.addEventListener("mouseout", removeTarget(item));
        item.addEventListener("mouseover", () => {
            console.log("check into item-mouseover");
        });
    });

    resizeField4.addEventListener("mousedown", (e) => {
        m_pos_4 = e.x;
        containerPart4.addEventListener("mousemove", );
    });

    containerPart4.addEventListener("mouseup", (e) => {
        containerPart4.removeEventListener("mousemove", );
    });

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