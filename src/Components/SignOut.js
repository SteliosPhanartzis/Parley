function SignOut(props) {
    const auth = props.auth;
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    );
  }

export default SignOut;