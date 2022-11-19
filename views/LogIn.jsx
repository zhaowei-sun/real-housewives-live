import { useState } from 'react'

export default function LogIn(props) {

    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpMode, setSignUpMode] = useState(false);

    const [logInEmail, setLogInEmail] = useState('');
    const [logInPassword, setLogInPassword] = useState('');

    function usernameChangeHandler(e) {
        setSignUpUsername(e.target.value);
    }

    function emailChangeHandler(e) {
        if (signUpMode) setSignUpEmail(e.target.value);
        else setLogInEmail(e.target.value);
        
    }

    function passwordChangeHandler(e) {
        if (signUpMode) setSignUpPassword(e.target.value);
        else setLogInEmail(e.target.value);
    }

    function signUpToLogIn() {
        setSignUpMode(prev => !prev);
    }

    async function 

    async function signUpClickHandler() {
        try {
            const response = await fetch('/signup', {
              method: 'POST',
              body: JSON.stringify({
                username: signUpUsername,
                email: signUpEmail,
                password: signUpPassword,
              }),
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }

    console.log(signUpEmail, signUpPassword, signUpUsername);
    console.log(logInEmail, logInPassword);
    return (
    <div>
        {
            signUpMode ?
            <div className="signin-page">
                <h1>Sign-Up Page</h1>
                <input onChange={usernameChangeHandler} type="text" placeholder="Username"/>
                <input onChange={emailChangeHandler} type="email" placeholder="Email"/>
                <input onChange={passwordChangeHandler} type="password" placeholder="Password" />
                <button onClick={signUpClickHandler}>Sign Up</button>
                <button onClick={signUpToLogIn}>Log In</button>
            </div>
            :
            <div className="login-page">
                <h1>Login Page</h1>
                <input onChange={emailChangeHandler} type="email" placeholder="Email"/>
                <input onChange={passwordChangeHandler} type="password" placeholder="Password" />
                <button>Log In</button>
                <button onClick={signUpToLogIn}>Sign Up</button>
            </div>
        }
        
        
        
    </div>
    )
}