import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message'
import ChatHeader from './ChatHeader'
import { selectUser } from '../features/userSlice'
import { selectChannelId, selectChannelName, selectServerId, selectServerName } from '../features/appSlice'
import './Chat.css'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard'
import GifIcon from '@material-ui/icons/Gif'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import db from '../firebase'
import firebase from 'firebase'

function Chat() {
    const dummy = useRef();
    const user = useSelector(selectUser);
    const serverId = useSelector(selectServerId);
    const serverName = useSelector(selectServerName);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {	
        if (channelId) {	
        db.collection("channels")	
            .doc(channelId)	
            .collection("messages")	
            .orderBy("timestamp", "asc")	
            .onSnapshot((snapshot) =>	
            setMessages(snapshot.docs.map((doc) => doc.data()))	
            );
        dummy.current.scrollIntoView({ behavior: 'smooth' });	
        }	
    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if(input && input.split(" ").join("") != ""){
            db.collection("channels").doc(channelId).collection("messages").add({	
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),	
                message: input,	
                user: user,	
            });	
        }
        setInput("");	
        dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

    return (
        <div className="chat">
            <ChatHeader channelName={ channelName }/>

            <div className="chat__messages">
                {
                messages.map((message) => (
                    <Message	
                        timestamp={message.timestamp}	
                        message={message.message}	
                        user={message.user}	
                    />
                ))}
                <div ref={dummy}></div>
            </div>

            <div className="chat__input">
                <AddCircleIcon fontSize="large" />
                <form>
                    <input 
                        value={ input }
                        disabled={ !channelId } 
                        onChange={ (e) => setInput(e.target.value) }
                        placeholder={`Message #${channelName}`} 
                    />
                    <button 
                        disabled={ !channelId } 
                        className="chat__inputButton" 
                        type="submit"
                        onClick={sendMessage}
                    >
                        Send Message
                    </button>
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
