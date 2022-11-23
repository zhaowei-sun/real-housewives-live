import { useState, useEffect } from 'react';
import {SocketContext, socket} from './context/socket.jsx';
import Main from './Main.jsx';
import LogIn from './LogIn.jsx';

export default function App(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSuperUser, setIsSuperUser] = useState(false);
    const [superUserRoom, setSuperUserRoom] = useState();
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState('');

    function logIn() {
        setIsLoggedIn(true);
    }

    function setUser(userEmail, username) {
        setUserEmail(userEmail);
        setUsername(username);
    }

    function setSuperUser(room) {
        setIsSuperUser(true);
        setSuperUserRoom(room);
    }

    return (
        <div className="main-border">
            <SocketContext.Provider value={socket}>
                {isLoggedIn ? 
                <Main userEmail={userEmail} username={username} isSuperUser={isSuperUser} superUserRoom={superUserRoom}/> 
                : 
                <LogIn 
                logIn={(name) => logIn(name)} 
                setUser={(userEmail, username) => setUser(userEmail, username)} 
                setSuperUser={setSuperUser}
                />}
            </SocketContext.Provider>
        </div>
        
    )
}