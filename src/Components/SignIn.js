import firebase from 'firebase/app';
import 'firebase/auth';

function SignIn(props) {
    const auth = props.auth;
    const [user] = props.user;

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <button className="sign-in" onClick = {signInWithGoogle}>Sign in with Google</button>
    )
}

export default SignIn;