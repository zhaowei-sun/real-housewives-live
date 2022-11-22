import { useEffect, useState, useContext } from 'react'
import {SocketContext} from './context/socket.jsx';


export default function LogIn(props) {

    const socket = useContext(SocketContext);

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
        else setLogInPassword(e.target.value);
    }

    function signUpToLogIn() {
        setSignUpMode(prev => !prev);
    }

    function logInClickHandler() {
        try {
            socket.emit("log_in", {
                email: logInEmail,
                password: logInPassword,
            });
        } catch (err) {
            console.log(err);
        }
    }

    function signUpClickHandler() {
        try {
            socket.emit("sign_up", {
                username: signUpUsername,
                email: signUpEmail,
                password: signUpPassword,
            });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        socket.on("sign_up_confirmation", (arg) => {
            if (arg.error) {
                //Try again!
            } else if (arg.success) {
                signUpToLogIn();
            }
        });

        socket.on("log_in_confirmation", (arg) => {
            if (arg.error) {
                //Try again!
            } else if (arg.success) {
                props.logIn(logInEmail);
            }
        });

    }, [socket])

    console.log(signUpEmail, signUpPassword, signUpUsername);
    console.log(logInEmail, logInPassword);
    return (
    <div>
        {
            signUpMode ?
            <div className="signin-page">
                <h1>SignUp Page</h1>
                <input onChange={usernameChangeHandler} type="text" placeholder="Username" value={signUpUsername}/>
                <input onChange={emailChangeHandler} type="email" placeholder="Email" value={signUpEmail}/>
                <input onChange={passwordChangeHandler} type="password" placeholder="Password" value={signUpPassword}/>
                <button onClick={signUpClickHandler}>Sign Up</button>
                <button onClick={signUpToLogIn}>Log In</button>
            </div>
            :
            <div className="login-page">
                <h1>Login Page</h1>
                <input onChange={emailChangeHandler} type="email" placeholder="Email" value={logInEmail}/>
                <input onChange={passwordChangeHandler} type="password" placeholder="Password" value={logInPassword}/>
                <button onClick={logInClickHandler}>Log In</button>
                <button onClick={signUpToLogIn}>Sign Up</button>
            </div>
        }
    </div>
    )
}