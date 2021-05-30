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

    static convertToDollars(amount, currency) {
        let res;
        switch (currency) {
            case 'dollars':
                res = amount;
                break;
            case 'euro':
                res = amount * 1.22;
                break;
            case 'byRubles':
                res = amount * 0.4;
                break;
            case 'ruRubles':
                res = amount * 28.92;
                break;
        }
        return res;
    }

    static getTotalSpendingsAndIcome(fromDate, toDate) {
        let totalIcome = 0;
        let totalSpendings = 0;
        return new Promise((resolve, reject) => {
            let transactionsRef = firebase.database().ref('users/' + localStorage.getItem('currentUserId') + '/transactions/');
            transactionsRef.get().then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach(function(childSnapshot) {
                        let transaction = childSnapshot.val();
                        let date = transaction.date;
                        console.log(fromDate, toDate, date)
                        if (fromDate == null || toDate == null || date <= toDate && date >= fromDate) {
                            let res = Transaction.convertToDollars(Number(transaction.amount), transaction.currency);
                            if (transaction.type === 'income') {
                                totalIcome += res;
                            } else {
                                totalSpendings += res;
                            }
                        }
                    });
                    return resolve([totalSpendings, totalIcome]);
                } else {
                    return reject(new Error('Snapshot does not exist.'));
                }
            }).catch((error) => {
                return reject(error);
            });
        });
    }

    static getTotalSpendingsAndIncomePerCategory(categoryName, fromDate = null, toDate = null) {
        let totalIcome = 0;
        let totalSpendings = 0;
        return new Promise((resolve, reject) => {
            let transactionsRef = firebase.database().ref('users/' + localStorage.getItem('currentUserId') + '/transactions/');
            transactionsRef.get().then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach(function(childSnapshot) {
                        let transaction = childSnapshot.val();
                        let date = transaction.date;
                        if (toDate == null || fromDate == null || date <= toDate && date >= fromDate) {
                            if (transaction.category === categoryName) {
                                let res = Transaction.convertToDollars(Number(transaction.amount), transaction.currency);
                                if (transaction.type === 'income') {
                                    totalIcome += res;
                                } else {
                                    totalSpendings += res;
                                }
                            }
                        }
                    });
                    return resolve([categoryName, Number(totalSpendings), Number(totalIcome)]);
                } else {
                    return reject(new Error('Snapshot does not exist.'));
                }
            }).catch((error) => {
                return reject(error);
            });
        });
    }
}

export default Transaction