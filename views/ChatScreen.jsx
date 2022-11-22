import { useEffect, useState, useContext } from 'react'
import {SocketContext} from './context/socket.jsx';


export default function ChatScreen(props) {

    const socket = useContext(SocketContext);

    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);

    function sendMessage() {
        console.log(message);
        setMessage('');
        socket.emit("send_message", {
            room: 1,
            user: props.user,
            message: message
        })
    }

    function inputChangeHandler(e) {
        setMessage(e.target.value);
    }

    useEffect(() => {
        socket.on('send_message_confirmation', (data) => {
            console.log(data);
            setMessages(data.messages);
        })
    }, [socket])

    const messagesDisplay = messages.map((m, idx) => {
        return (
            <p key={idx + 'message'}>{m.message}</p>
        )
    })

    return (
        <div>
            <div className="screen">
                {messagesDisplay}
            </div>
            <input onChange={inputChangeHandler} type="text" placeholder="Type something..." value={message}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}