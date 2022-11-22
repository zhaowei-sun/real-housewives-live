import { useState } from 'react';
import Nav from './Nav.jsx';
import Profile from './Profile.jsx';
import Rooms from './Rooms.jsx';
import ChatScreen from './ChatScreen.jsx';

export default function Main(props) {
    return (
        <div>
            <h1>Main Room</h1>
            <ChatScreen user={props.user}/>
        </div>
    )
}