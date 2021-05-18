firebase.initializeApp(firebaseConfig);

let email = document.getElementById('emailLogin').value;
let password = document.getElementById('passwordLogin').value;

firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        alert('Success!!!')
    })
    .catch((error) => {
        alert('Something went wrong! Maybe the email is already used.')
    });