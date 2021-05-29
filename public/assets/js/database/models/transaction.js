class Transaction {
    constructor(type, amount, currency, date, place, category, comment, image, receiver) {
        this.id = null,
            this.type = type,
            this.amount = amount,
            this.date = date,
            this.currency = currency,
            this.place = place,
            this.category = category,
            this.comment = comment,
            this.image = image,
            this.receiver = receiver
    };

    static addTransaction(transaction) {
        let transactionsListRef = firebase.database().ref('users/' + localStorage.getItem('currentUserId') + '/transactions/');
        let newTransactionsRef = transactionsListRef.push();
        transaction.id = newTransactionsRef.key;
        newTransactionsRef.set(transaction)
    }

    static updateTransaction(transaction) {
        let updates = {}
        updates['users/' + localStorage.getItem('currentUserId') + '/transactions/' + transaction.id] = transaction;
        return firebase.database().ref().update(updates);
    }

    static deleteTransaction(transaction) {
        let transactionsListRef = firebase.database().ref('users/' + localStorage.getItem('currentUserId') + '/transactions/' + transaction.id);
        transactionsListRef.remove();
    }

    static readTransactions() {
        return new Promise((resolve, reject) => {
            let transactionsRef = firebase.database().ref('users/' + localStorage.getItem('currentUserId') + '/transactions/');
            transactionsRef.get().then((snapshot) => {
                if (snapshot.exists()) {
                    return resolve(Object.values(snapshot.val()));
                } else {
                    return [];
                }
            }).catch((error) => {
                console.error(error);
            });
        })
    }
}

export default Transaction