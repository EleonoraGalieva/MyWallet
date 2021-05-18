import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyBK5wSILhdm5-Avr8r9HuWuuS5tMWISJq4',
    authDomain: 'mywallet-f4264.firebaseapp.com',
    databaseURL: 'https://mywallet-f4264.firebaseio.com',
    projectId: 'mywallet-f4264',
    storageBucket: 'mywallet-f4264.appspot.com'
};

class MyWalletDatabase {
    constructor() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
    }
}