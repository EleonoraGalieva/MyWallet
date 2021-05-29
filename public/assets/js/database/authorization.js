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
                    console.error(error.message);
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
                console.error(error.message);
            })
    }

    signInWithGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                window.location.hash = '/wallet';
            })
            .catch((error) => {
                console.error(error.message);
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
                console.error(error.message);
            });
    }

    signInWithFacebook() {
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                window.location.hash = '/wallet';
            })
            .catch((error) => {
                console.error(error.message);
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
                console.error(error.message);
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
        localStorage.setItem('currentUserId', user.uid);
    } else {
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('currentUserId');
    }
});

let authorization = new Authorization();

export default authorization;