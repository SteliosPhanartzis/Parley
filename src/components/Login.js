import { Button } from '@material-ui/core';
import { auth, provider } from "../firebase";
import React from 'react';
import './Login.css';
function Login() {
    const signIn = () => {
        // google login
        auth.signInWithPopup(provider)
        .catch(error => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img src={process.env.PUBLIC_URL + "/main_logo.png"} alt="app logo"/>
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
