class Authorization {
    signUpWithEmailAndPassword(email, password, confirmPassword) {
        if (password !== confirmPassword) {
            alert('Please, check entered passwords!');
        } else if (password.length < 6) {
            alert('Password must be at least 6 characters');
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    window.location.hash = '/wallet';
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
                window.location.hash = '/';
            });
    }
}

let authorization = new Authorization();

export default authorization;