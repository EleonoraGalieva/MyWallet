// Opening modal window to add/edit a transaction
var modalTransaction = document.getElementById("addTransaction");
var addTransactionBtn = document.getElementById("addTransactionBtn");
var closeTransactionOwerflow = document.getElementById("closeTransactionOwerflow");

addTransactionBtn.onclick = function() {
    modalTransaction.style.display = "block";
}

closeTransactionOwerflow.onclick = function() {
    modalTransaction.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalTransaction) {
        modalTransaction.style.display = "none";
    }
}