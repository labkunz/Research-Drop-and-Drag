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
})