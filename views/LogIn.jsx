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

    const [superLoginMode, setSuperLoginMode] = useState(false);
    const [superLogInEmail, setSuperLogInEmail] = useState('');
    const [superLogInPassword, setSuperLogInPassword] = useState('');

    function usernameChangeHandler(e) {
        setSignUpUsername(e.target.value);
    }

    function emailChangeHandler(e) {
        if (signUpMode) setSignUpEmail(e.target.value);
        else setLogInEmail(e.target.value);
    }

    function superEmailChangeHandler(e) {
        setSuperLogInEmail(e.target.value)
    }

    function passwordChangeHandler(e) {
        if (signUpMode) setSignUpPassword(e.target.value);
        else setLogInPassword(e.target.value);
    }

    function superPasswordChangeHandler(e) {
        setSuperLogInPassword(e.target.value)
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

    function superlogInClickHandler() {
        try {
            socket.emit("super_log_in", {
                email: superLogInEmail,
                password: superLogInPassword,
            });
        } catch (err) {
            console.log(err);
        }
    }

    function superModeClickHandler() {
        setSuperLoginMode(true);
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
                props.logIn();
                props.setUser(arg.email, arg.name);
            }
        });

        socket.on("super_log_in_confirmation", (arg) => {
            if (arg.error) {
                //Try again!
            } else if (arg.success) {
                props.logIn();
                props.setUser(arg.email, arg.name);
                props.setSuperUser(arg.room);
            }
        });

    }, [socket])

    return (
    <div className="login-wrapper">
        <div className="login-title-div">
            <h1 className="login-title">REAL</h1>
            <h1 className="login-title">HOUSEWIVES</h1>
            <h1 className="login-title login-title-decor">LIVE</h1>
        </div>
        <div className="login-main-div">
        {   superLoginMode ?
            <div className="super-login-page">
                <h1 className="login-sign">Login as a Housewife</h1>
                <input onChange={superEmailChangeHandler} type="email" placeholder="Email" value={superLogInEmail}/>
                <input onChange={superPasswordChangeHandler} type="password" placeholder="Password" value={superLogInPassword}/>
                <button onClick={superlogInClickHandler} className="hl-btn">Log In</button>
            </div>
           :
            (signUpMode ?
            <div className="signin-page">
                <h1 className="login-sign">Sign-Up</h1>
                <input onChange={usernameChangeHandler} type="text" placeholder="Username" value={signUpUsername}/>
                <input onChange={emailChangeHandler} type="email" placeholder="Email" value={signUpEmail}/>
                <input onChange={passwordChangeHandler} type="password" placeholder="Password" value={signUpPassword}/>
                <button onClick={signUpClickHandler} className="hl-btn">Sign Up</button>
                <button onClick={signUpToLogIn} className="reg-btn">Log In</button>
            </div>
            :
            <div className="login-page">
                <h1 className="login-sign">Login</h1>
                <input onChange={emailChangeHandler} type="email" placeholder="Email" value={logInEmail}/>
                <input onChange={passwordChangeHandler} type="password" placeholder="Password" value={logInPassword}/>
                <button onClick={logInClickHandler} className="hl-btn">Log In</button>
                <button onClick={signUpToLogIn} className="reg-btn">Sign Up</button>
                <button onClick={superModeClickHandler} className="special-btn">Log In as a Housewife</button>
            </div>)
        }
        </div>
        
    </div>
    )
}