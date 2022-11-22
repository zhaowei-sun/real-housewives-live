import { useState, useEffect } from 'react';
import {SocketContext, socket} from './context/socket.jsx';
import Main from './Main.jsx';
import LogIn from './LogIn.jsx';

export default function App(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState('');

    function logIn(email) {
        setIsLoggedIn(true);
        setUser(user);
    }
    return (
        <SocketContext.Provider value={socket}>
            {isLoggedIn ? <Main user={user} /> : <LogIn logIn={(name) => logIn(name)} />}
        </SocketContext.Provider>
    )
}