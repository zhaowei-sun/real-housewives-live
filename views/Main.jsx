import { useEffect, useState, useContext } from 'react'
import {SocketContext} from './context/socket.jsx';
import Rooms from './Rooms.jsx';
import ChatScreen from './ChatScreen.jsx';
import Nav from './Nav.jsx';
import Profile from './Profile.jsx';

export default function Main(props) {

    const [roomMode, setRoomMode] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState();
    const [favorites, setFavorites] = useState([]);

    const socket = useContext(SocketContext);

    useEffect(() => {
        
        if (props.isSuperUser) {
            socket.emit('super_request_favorites', {username: props.username, email: props.userEmail});
        } else {
            socket.emit('request_favorites', {username: props.username, email: props.userEmail});
        }
        
        socket.on('join_room_confirmation', (data) => {
            setRoomMode(false);
            setSelectedRoom(data.selectedRoom);
        });
    }, [])

    useEffect(() => {
        socket.on('load_favorites', (data) => {
            setFavorites(data.favorites.map(r => r.room));
        })

        socket.on('add_to_favorites_confirmation', (data) => {
            console.log(data);
            setFavorites(data.favorites.map(r => r.room));
        })

        socket.on('remove_from_favorites_confirmation', (data) => {
            console.log(data);
            setFavorites(data.favorites.map(r => r.room));
        })

    }, [socket])

    function roomClickHandler(room) {
        socket.emit('join_room', {room: room});
        socket.emit('load_messages', {
            room: selectedRoom,
            user: props.userEmail
        });
    }

    return (
        <div>
            <Nav />
            <h1>Main Room</h1> 
            <div className="main">
            <Profile 
            userEmail={props.userEmail} 
            username={props.username} 
            favorites={favorites}
            joinRoom={roomClickHandler}
            />
            {
                roomMode
                ?
                <Rooms 
                userEmail={props.userEmail} 
                username={props.username} 
                joinRoom={roomClickHandler}
                favorites={favorites}/>
                :
                <ChatScreen 
                userEmail={props.userEmail} 
                username={props.username}
                selectedRoom={selectedRoom}
                switchToRoomMode={() => setRoomMode(true)}/>
            }
            </div>
            
            
        </div>
    )
}