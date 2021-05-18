var modalCategory = document.getElementById("addCategory");
var addCategoryBtn = document.getElementById("addCategoryBtn");
var closeCategoryOwerflow = document.getElementById("closeCategoryOwerflow");

addCategoryBtn.onclick = function() {
    modalCategory.style.display = "block";
}

closeCategoryOwerflow.onclick = function() {
    modalCategory.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalCategory) {
        modalCategory.style.display = "none";
    }
}