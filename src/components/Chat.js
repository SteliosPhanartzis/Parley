import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message'
import ChatHeader from './ChatHeader'
import { selectUser } from '../features/userSlice'
import { selectChannelId, selectChannelName, selectServerId, selectServerName } from '../features/appSlice'
import Picker from 'emoji-picker-react';
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
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [placeholder, setPlaceholder] = useState("#Message " + channelName);
    const [emojiDisplay, setEmojiDisplay] = useState("none");

    function toggleEmojiPicker() {
        if(emojiDisplay == "none")
            setEmojiDisplay("flex");
        else
            setEmojiDisplay("none");

    }

    useEffect(() => {	
        if (channelId) {	
            db.collection("servers/" + serverId + "/channels")	
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
        // Handle file attachment here
        // if(file){
        //     db.collection("servers/" + serverId + "/channels").doc(channelId).collection("messages").add({	
        //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),	
        //         message: file,	
        //         user: user,	
        //     });	
        // }
        // Otherwise, just send text
        if(input && input.split(" ").join("") != ""){
            db.collection("servers/" + serverId + "/channels").doc(channelId).collection("messages").add({	
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),	
                message: input,	
                user: user,	
            });	
        }
        setInput("");
        setFile(null);
        setPlaceholder("#Message " + channelName);	
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
            <div id="emoji_picker" style={{display: emojiDisplay}}>
                <Picker onEmojiClick={(event, emojiObject) => { setInput(input + emojiObject.emoji)}} />
            </div>

            <div className="chat__input">
                <input type="file" 
                        id="att_file"
                        name="att_file" 
                        accept="image/x-png,image/gif,image/jpeg"
                        files={file} onChange={e => {
                            setFile(e.target.files[0])
                            setPlaceholder(e.target.files[0].name)
                        }} />
                {
                    React.createElement(
                        'label',
                        {htmlFor: 'att_file'},
                        <AddCircleIcon fontSize="large" />
                    )
                }
                <form>
                    <input 
                        value={ input }
                        disabled={ !channelId } 
                        onChange={ (e) => setInput(e.target.value) }
                        placeholder={placeholder} 
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
                    <EmojiEmotionsIcon onClick={toggleEmojiPicker} fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
