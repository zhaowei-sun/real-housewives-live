import { useEffect, useState, useContext } from 'react'
import {SocketContext} from './context/socket.jsx';

export default function Profile(props) {

    const favoritesDisplay = props.favorites.map((f, idx) => {
        return <div onClick={() => {props.joinRoom(f)}} key={idx + 'fav'}>{f}</div>
    })

    return (
        <div className="profile">
            <h2>Name: {props.username}</h2>
            <h2>Favorites:</h2>
            {favoritesDisplay}
        </div>
    )
}