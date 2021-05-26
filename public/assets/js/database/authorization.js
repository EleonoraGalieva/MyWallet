class Authorization {
    addToDatabase(email) {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
            username: email,
            email,
            transactions: [],
            categories: ['food', 'fun', 'groceries', 'home', 'salary', 'shop', 'transport', 'travel']
        })
    }

    signUpWithEmailAndPassword(email, password, confirmPassword) {
        if (password !== confirmPassword) {
            alert('Please, check entered passwords!');
        } else if (password.length < 6) {
            alert('Password must be at least 6 characters');
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    window.location.hash = '/wallet';
                    this.addToDatabase(email);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }

    signUpWithGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                this.addToDatabase(result.user.email);
                window.location.hash = '/wallet';
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    signInWithGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                window.location.hash = '/wallet';
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    signUpWithFacebook() {
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                this.addToDatabase(result.user.email);
                window.location.hash = '/wallet';
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    signInWithFacebook() {
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                window.location.hash = '/wallet';
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    signInWithEmailAndPassword(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                window.location.hash = '/wallet';
            })
            .catch((error) => {
                let errorCode = error.code;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password!');
                }
                console.log(error.message);
            });
    }

    logOut() {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('currentUserId');
                window.location.hash = '/';
            });
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        localStorage.setItem('currentUserEmail', user.email);
    } else {
        localStorage.removeItem('currentUserEmail');
    }
});

let authorization = new Authorization();

export default authorization;