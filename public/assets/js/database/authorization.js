import walletDatabase from './createDatabase'
import 'firebase/auth'

class Authorization {
    signUp(email, password) {
        walletDatabase.auth().createUserWithEmailAndPassword(email, password)
            .then(function() {
                onNavigate('/#/wallet');
            }).catch(function(error) {
                alert('Something went wrong, please try again!');
            })
    }
}

let authorization = Authorization();

export default authorization;