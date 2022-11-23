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
            message: message,
            superUserRoom: props.superUserRoom || 'none'
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
        const mySuperUser = m.user === props.userEmail && props.isSuperUser && props.superUserRoom === props.selectedRoom;
        const superUser = props.selectedRoom === m.super;
        const messageDivClasses = `message-div ${m.user === props.userEmail ? 'my-message-div' : ''} `;
        const messageClasses = `message ${m.user === props.userEmail ? 'my-message' : ''} ${superUser ? 'super-user-message' : ''} ${mySuperUser? 'my-super-user-message': ''}`;
        return (
            <div className={messageDivClasses}>
                <p className='message-user'>{m.username} :</p>
                <p key={idx + 'message'} className={messageClasses}>{m.message}</p>
            </div>
            
        )
    })

    return (
        <div className="chatscreen">
            <div className="chatscreen-header">
                <div className="chatscreen-header-name">{chatroomName}'s Chatroom</div>
                <button className="exit-btn" onClick={() => {props.switchToRoomMode()}}>Exit</button>
            </div>
            
            <div className="message-screen">
                   <ScrollToBottom className="message-container">
                    {messagesDisplay}
                    </ScrollToBottom>
            </div>
            <div className="send-screen">
                <input onChange={inputChangeHandler} type="text" placeholder="Type something..." value={message}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}