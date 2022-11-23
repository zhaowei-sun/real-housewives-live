import { useEffect, useState, useContext } from 'react'
import {SocketContext} from './context/socket.jsx';
import ScrollToBottom from 'react-scroll-to-bottom';

export default function ChatScreen(props) {

    const socket = useContext(SocketContext);

    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const [ chatroomName, setChatroomName ] = useState('');

    function sendMessage() {
        console.log(message);
        setMessage('');
        console.log(props.selectedRoom);
        socket.emit("send_message", {
            room: props.selectedRoom,
            email: props.userEmail,
            username: props.username,
            message: message
        })
    }

    function inputChangeHandler(e) {
        setMessage(e.target.value);
    }

    useEffect(() => {
        socket.on('send_message_confirmation', (data) => {
            console.log('send_message_confirmation', data);
            setMessages(data.messages);
        })

        socket.on('load_messages_confirmation', (data) => {
            setMessages(data.messages);
            setChatroomName(data.roomName);
        })
    }, [socket])

    useEffect(() => {
        socket.emit('load_messages', {
            room: props.selectedRoom,
            user: props.user
        });
    }, [])

    const messagesDisplay = messages.map((m, idx) => {
        return (
            <p key={idx + 'message'}>{m.message}</p>
        )
    })

    return (
        <div>
            <div>{chatroomName}</div>
            <button onClick={() => {props.switchToRoomMode()}}>Exit</button>
                <div className="screen">
                   <ScrollToBottom className="message-container">
                    {messagesDisplay}
                    </ScrollToBottom>
                </div>
            <input onChange={inputChangeHandler} type="text" placeholder="Type something..." value={message}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}