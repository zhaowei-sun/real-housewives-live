import { useState } from 'react';
import Main from './Main.jsx';
import LogIn from './LogIn.jsx';

export default function App(props) {
    const [isLoggedIn, setIsLoggesIn] = useState(false);
    return (
        <>
         {isLoggedIn ? <Main /> : <LogIn />}
        </>
    )
}