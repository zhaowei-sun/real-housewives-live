import { useEffect, useState, useContext } from 'react'
import {SocketContext} from './context/socket.jsx';
import roomIcons from './roomIcons.jsx';

export default function Rooms(props) {

    const socket = useContext(SocketContext);

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        socket.emit('request_rooms', {});
    }, []);

    useEffect(() => {
        socket.on('load_rooms', (data) => {
            console.log(data);
            setRooms(data);
        });
    }, [socket]);

    function addToFavorites(room) {
        socket.emit('add_to_favorites', {
            room: room,
            email: props.userEmail
        });
    }

    function removeFromFavorites(room) {
        socket.emit('remove_from_favorites', {
            room: room,
            email: props.userEmail
        });
    }

    const roomsDisplay = rooms.map((r, idx) => {
        return (<div key={idx + 'roomdiv'}>
        <div key={idx + 'room'} onClick={() => {props.joinRoom(r.room)}} className='room-div'>
            <img className="room-icon" src={roomIcons[r.roomFranchise][r.roomIcon]}/>
        </div>
        <p>{r.roomName}</p>
        <button key={idx + 'joinroom'} onClick={() => {props.joinRoom(r.room)}}>Join Room</button>
        {props.favorites.includes(r.room) 
        ? 
        <button key={idx + 'rmfav'} onClick={() => {removeFromFavorites(r.room)}}>Remove from Favorites</button> 
        :
        <button key={idx + 'addfav'} onClick={() => {addToFavorites(r.room)}}>Add to Favorites</button>
        }
        </div>)
    })
    return (
        <div>
            <h1>Rooms</h1>
            <div className="rooms">
                {roomsDisplay}
            </div>
        </div>
    )
}