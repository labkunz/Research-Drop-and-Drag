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



    let dragTarget = document.querySelector("#targetDrag");
    dragTarget.addEventListener("dragstart", dragstart);

    let dropTagets = document.querySelectorAll("#container div");
    dropTagets.forEach(item => {
        item.addEventListener("drop", drop);

        item.addEventListener("dragenter", cancelDefault);
        item.addEventListener("dragover", cancelDefault);
        item.addEventListener("dragleave", cancelDefault);
    });

    
})