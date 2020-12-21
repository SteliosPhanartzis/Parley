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
    const [input, setInput] = useState(() => {return ""});
    const [messages, setMessages] = useState(() => {return []});
    const [file, setFile] = useState(null);
    const [placeholder, setPlaceholder] = useState(() => {return null});
    const [emojiDisplay, setEmojiDisplay] = useState(() => {return "none"});
    const fileSizeCap = 2097152; //Should also verify limit on backend
    const storageRef = firebase.storage().ref();

    function toggleEmojiPicker() {
        (channelId && emojiDisplay == "none")?
            setEmojiDisplay("flex"):
            setEmojiDisplay("none");
    }

    useEffect(() => {	
        if (channelId) {	
            db.collection("servers/" + serverId + "/channels/" + channelId + "/messages")	
                .orderBy("timestamp", "asc")	
                .onSnapshot((snapshot) =>	
                setMessages(snapshot.docs.map((doc) => doc.data()))	
                );
            dummy.current.scrollIntoView({ behavior: 'smooth' });	
        }	
    }, [channelId]);
    const sendMessage = (e) => {
        e.preventDefault();
        let fileRef = null;
        let fileURL = null;
        // Handle file attachment here
        if(file){
            if(file.size > fileSizeCap){
                alert("File is over 2MB limit!");
                setFile(null);
            }
            else {
                storageRef.child(user.displayName + "-" + file.name).getDownloadURL().then(onResolve, onReject);
                function onReject() {
                    fileRef = storageRef.child(user.displayName + "-" + file.name);
                    console.log(file.size);
                    fileRef.put(file)
                    .then(async() => {
                        fileURL = await fileRef.getDownloadURL();
                        console.log("File has been uploaded");
                    })
                    .then(async () => {
                        await db.collection("servers/" + serverId + "/channels/" + channelId + "/messages").add({	
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),	
                            message: input,	
                            user: user,	
                            file: fileURL,
                            fileType: file.type
                        })	
                    })
                    .then(() => {
                        setFile(null);
                    })
                }
            }

            async function onResolve(foundURL) {
                db.collection("servers/" + serverId + "/channels").doc(channelId).collection("messages").add({	
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),	
                    message: input,	
                    user: user,	
                    file: await foundURL,
                    fileType: file.type
                })	
                setFile(null);
            }
        }
        // Otherwise, just send text
        else if(!file && input && input.split(" ").join("") != ""){
            db.collection("servers/" + serverId + "/channels").doc(channelId).collection("messages").add({	
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),	
                message: input,	
                user: user,	
                file: null
            });	
            setFile(null);
        }
        setInput("");
        setPlaceholder(null);
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
                        file={message.file}
                        fileType={message.fileType}
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
                        accept="image/x-png,image/gif,image/jpeg,image/bmp,audio/mpeg"
                        disabled = { !channelId } 
                        files={ file }
                        value={() => {return (file)? file.name :"" }} 
                        onChange={e => {
                            if (e.target.files[0]){
                                setFile(e.target.files[0])
                                setPlaceholder(e.target.files[0].name)
                            } else {
                                console.log("File action cancelled")
                            }
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
                        placeholder={(placeholder)? placeholder: "#Message " + channelName} 
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
