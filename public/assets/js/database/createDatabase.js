const firebaseConfig = {
    apiKey: "AIzaSyBK5wSILhdm5-Avr8r9HuWuuS5tMWISJq4",
    authDomain: "mywallet-f4264.firebaseapp.com",
    databaseURL: "https://mywallet-f4264-default-rtdb.firebaseio.com",
    projectId: "mywallet-f4264",
    storageBucket: "mywallet-f4264.appspot.com",
    messagingSenderId: "1004715828550",
    appId: "1:1004715828550:web:e6075c099781ff18923147"
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database();
firebase.auth().onAuthStateChanged((user) => {
    let currentUser = user;
    if (user) {
        sessionStorage.setItem('currentUserId', user.uid);
    } else {
        sessionStorage.removeItem('currentUserId');
    }
});