import { Avatar } from '@material-ui/core'
import React from 'react'
import Linkify from 'react-linkify';
import "./Message.css"

function Message({ timestamp, message, user, file, fileType }) {
    function verifyFile() {
        let el = null;
        if(file){
            switch(fileType){
                case("image/bmp"):
                case("image/gif"):
                case("image/jpeg"):
                case("image/png"):
                    el = <img src={file} className="attached__image message__attachment" />
                    break;
                case("audio/mpeg"):
                    el = <audio className="message__attachment" controls><source src={file}/>Audio tag unsupported</audio>
                    break;
                default:
                    break;
            }
        }
        return el;
    }
    return (
        <div className="message">
            <Avatar className="message__avatar" src={user.photo}/>
            <div className="message__info">
                <h4>
                    { user.displayName }
                    <span className="message__timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>

                <p><Linkify>{ message }</Linkify></p>
                {verifyFile()}
            </div>
        </div>
    )
}

export default Message;
