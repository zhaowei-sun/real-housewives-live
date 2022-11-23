import { useEffect, useState, useContext } from 'react'
import {SocketContext} from './context/socket.jsx';
import roomIcons from './roomIcons.jsx';

export default function Rooms(props) {

    const socket = useContext(SocketContext);

    const [rooms, setRooms] = useState([]);
    const [franchise, setFranchise] = useState('RHOBH');

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
        if (props.isSuperUser) {
            socket.emit('super_add_to_favorites', {
                room: room,
                email: props.userEmail
            });
        } else {
            socket.emit('add_to_favorites', {
                room: room,
                email: props.userEmail
            });
        }
    }

    function removeFromFavorites(room) {
        if (props.isSuperUser) {
            socket.emit('super_remove_from_favorites', {
                room: room,
                email: props.userEmail
            });
        } else {
            socket.emit('remove_from_favorites', {
                room: room,
                email: props.userEmail
            });
        }
    }

    const roomsPreDisplay = rooms.filter((r) => {
        return r.roomFranchise === franchise;
    })

    const roomsDisplay = roomsPreDisplay.map((r, idx) => {
        return (<div key={idx + 'roomdiv'} className="room-present">
        <div key={idx + 'room'} onClick={() => {props.joinRoom(r.room)}} className='room-div'>
            <img className="room-icon" src={roomIcons[r.roomFranchise][r.roomIcon]}/>
        </div>
        <p>{r.roomName}</p>
        <div className="room-buttons">
        <button key={idx + 'joinroom'} onClick={() => {props.joinRoom(r.room)}}>Join Room</button>
        {props.favorites.includes(r.room) 
        ? 
        <img key={idx + 'rmfav'} onClick={() => {removeFromFavorites(r.room)}} className="fav-icon" src={roomIcons.favs.fav}/>
        :
        <img key={idx + 'addfav'} onClick={() => {addToFavorites(r.room)}} className="fav-icon" src={roomIcons.favs.unfav}/>
        }
        </div>
        </div>)
    })
    return (
        <div className="rooms">
            <h1 className="rooms-title">Rooms</h1>
            <div className="franchises">
            <div className="franchise" onClick={() => setFranchise('RHOBH')}>Real Housewives of Beverly Hills</div>
            <p className="franchise">|</p>
            <div className="franchise" onClick={() => setFranchise('RHOSLC')}>Real Housewives of Salt Lake City</div>
            </div>
            <div className="rooms-display">
                {roomsDisplay}
            </div>
        </div>
    )
}