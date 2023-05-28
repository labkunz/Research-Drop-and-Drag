document.addEventListener("DOMContentLoaded", function() {
    // Drag Source
    let dragSources_multiple = document.querySelectorAll('#drag_drop_multiple #drag_source_multiple');
    dragSources_multiple.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });
    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        this.classList.add('dragging'); // 加入 dragging 自定義樣式
    }
    function dragEnd(e) {
        this.classList.remove('dragging'); // 移除 dragging 自定義樣式
    }

    // Drop Target
    let dropTargets_multiple = document.querySelectorAll('[data-role="drag_drop_container"]');
    dropTargets_multiple.forEach(item => {
        item.addEventListener('drop', droped);
        item.addEventListener('dragenter', cancelDefault);
        item.addEventListener('dragover', dragover);
        item.addEventListener('dragleave', dragLeave);
    });
    function droped(e) {
        cancelDefault(e);
        let id = e.dataTransfer.getData('text/plain');
        e.target.appendChild(document.querySelector(`#${id}`));
        this.classList.remove('hover'); // 移除 hover 自定義樣式
    }
    function dragover(e) {
        cancelDefault(e);
        this.classList.add('hover'); // 加入 hover 自定義樣式
    }
    function dragLeave(e) {
        this.classList.remove('hover'); // 移除 hover 自定義樣式
    }
    // 元素預設行為是不能被放置拖曳物的，因此在拖曳對象出現在放置目標上時，取消預設行為，讓放置目標可以被放置
    function cancelDefault(e) {
        e.preventDefault();
        e.stopPropagation();
        return false; // 可加可不加
    }
});