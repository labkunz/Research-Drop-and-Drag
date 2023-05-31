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
        const dx = e.x - m_pos;
        m_pos = e.x;
        dragTarget3.style.width = `${(parseInt(getComputedStyle(dragTarget3, null).width) + dx)}px`;
    }
    const resizeV2 = (e) => {
        console.log(`e.currentTarget : ${e.currentTarget.classList}`);
        const dx = e.x - m_pos;
        m_pos = e.x;
        e.currentTarget.style.width = `${(parseInt(getComputedStyle(e.currentTarget, null).width) + dx)}px`;
    }

    let dropTagets3 = document.querySelectorAll("#container3 div");
    let containerPart3 = document.querySelector(".container.part3");

    resizeField.addEventListener("mousedown", (e) => {
        m_pos = e.x;
        containerPart3.addEventListener("mousemove", resizeV2);
        // containerPart3.addEventListener("mousemove", resize);
    });

    containerPart3.addEventListener("mouseup", (e) => {
        containerPart3.removeEventListener("mousemove", resizeV2);
        // containerPart3.removeEventListener("mousemove", resize);
    });

    //Part 4

    // let dragTarget4 = document.querySelector("#targetDrag4");
    // let resizeField4 = document.querySelector("#targetDrag4 .resizeField");

    // let dropX;
    // const setDropX = () => {

    // }

    // let m_pos_4;
    // const resize4 = (e) => {
    //     const dx = e.x - m_pos4;
    //     m_pos4 = e.x;
    //     dragTarget4.style.width = `${(parseInt(getComputedStyle(dragTarget4, null).width) + dx)}px`;
    // }

    // let containerPart4 = document.querySelector(".container.part4");
    // let dropTagets4 = document.querySelectorAll("#container4 div");

    // const addTarget = (target) => {
    //     target.classList.add("active");
    // }
    // const removeTarget = (target) => {
    //     target.classList.remove("active");
    // }

    // dropTagets4.forEach(item => {
    //     item.addEventListener("mouseover", addTarget(item));
    //     item.addEventListener("mouseout", removeTarget(item));
    // });

    // resizeField4.addEventListener("mousedown", (e) => {
    //     m_pos_4 = e.x;
    //     containerPart4.addEventListener("mousemove", );
    // });

    // containerPart4.addEventListener("mouseup", (e) => {
    //     containerPart4.removeEventListener("mousemove", );
    // });

    //Part 4-1
    let dragTarget4_1 = document.querySelector("#targetDrag4-1");
    dragTarget4_1.draggable = true;
    dragTarget4_1.addEventListener("dragstart", dragstart);

    const resizeFor4_1 = (e) => {

    }

    let resizeField4_1 = document.querySelector("#targetDrag4-1 .resizeField");

    let containerPart4_1 = document.querySelector(".container.part4-1");
    let dropTagets4_1 = document.querySelectorAll("#container4-1 div");
    dropTagets4_1.forEach(item => {
        item.addEventListener("drop", drop);

        item.addEventListener("dragenter", cancelDefault);
        item.addEventListener("dragover", cancelDefault);
        item.addEventListener("dragleave", cancelDefault);
    });
})